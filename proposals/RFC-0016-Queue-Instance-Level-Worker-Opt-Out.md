# RFC 0016 - Per-`Queue` Worker Opt-Out (`@rasenganjs/queue`)

**Status:** Draft
**Author:** Rasengan.js Core Team (drafted from a downstream incident report — Hiraiship, RFC-0005)
**Date:** 2026-09-25

## Executive Summary

`createQueuePlugin({ worker })`'s `worker` flag is process-wide: the moment it's `true`, `registerQueue()` calls `startWorkerLoop()` for **every** `Queue` class listed under any module's `queues:` array in that process — including one whose `jobs(router)` registers zero handlers. `startWorkerLoop`'s `dispatch()` then reserves jobs for that queue name exactly like a real consumer would, and on finding no handler for a reserved job, dead-letters it immediately (`packages/ecosystem/queue/src/plugin.ts`, `dispatch()`, the `if (!entry)` branch) rather than leaving it for another process that might actually handle it.

This makes a "producer-only `Queue`" — a class registered purely to get a `.add()` handle via DI, with an intentionally empty `jobs(router)` — a live competitor for its own enqueued jobs whenever the process is otherwise `worker: true` for a _different_ queue. It doesn't sit inert; it races the real consumer to reserve, and if it wins, it permanently destroys the job.

The fix is small and localized to the same file: an instance-level `worker?: boolean = true` on `Queue`, checked in `registerQueue()` alongside the existing process-level flag. A subclass sets `worker = false` to declare "resolve me for DI, never start a worker loop for me in this process" — independent of whatever the plugin's own `worker` option says, and with zero effect on any existing registration (default `true` preserves current behavior exactly).

---

# Motivation

## The bug, traced to its root

`registerQueue()` (`packages/ecosystem/queue/src/plugin.ts`) does this today:

```ts
// current
const router = new JobRouter();
instance.jobs(router);
const jobs = router.getJobs();

const queueName = instance.name;
instance.handle = createQueueHandle(queueName, adapter);

if (worker) {
  startWorkerLoop(queueName, jobs, adapter, app, stallTimeout);
}
```

`worker` here is the single boolean passed to `createQueuePlugin()` — a property of the _plugin instance_, not of the individual `Queue` being registered. If it's `true`, every `Queue` class in every module this plugin instance serves gets a worker loop, whether or not `jobs()` populated anything into `jobs`.

`startWorkerLoop`'s `dispatch()` already documents, in its own `hasCapacity()` comment, what happens next:

```ts
// current, startWorkerLoop() → hasCapacity()
function hasCapacity(name: string): boolean {
  const entry = jobs.get(name);
  // No handler registered — always "has capacity": dispatch()
  // immediately routes it to dead-letter instead of buffering forever.
  if (!entry) return true;
  return (inFlightCount.get(name) ?? 0) < entry.options.concurrency;
}

function dispatch(stored: StoredJob): void {
  const entry = jobs.get(stored.name);
  if (!entry) {
    console.error(
      `[rasengan-queue] Queue "${queueName}" has no handler for job ` +
        `"${stored.name}" — moving to dead-letter.`
    );
    void adapter.fail(queueName, stored.id, {});
    return;
  }
  // ...
}
```

This is a deliberate, documented design choice — and a correct one _for a single-process queue_, where a job with no handler really is a bug (a typo'd job name, a handler that was removed without updating the caller). It stops being correct the moment two different processes register a `Queue` under the **same queue name**, one with real handlers and one without, both `worker: true`: `reserve()` operates at the queue-name level (`QueueAdapter.reserve(queue, stallTimeout)`, queue-wide, not job-name-aware), so both processes' worker loops are equally eligible to grab any job posted to that name. Whichever one wins the race decides the job's fate — process correctly, or dead-letter it on the spot — with no coordination between the two.

## This is exactly the shape RFC-0004 already anticipated, but only at the whole-process granularity

RFC-0004 (`proposals/RFC-0004-Background-Job-Queues.md`) lists as an explicit goal: _"Producer/consumer split: a process can enqueue without consuming (`worker: false`)."_ This works today, and is tested (`integration.test.ts`, `'worker: false — .add() still enqueues, nothing processes until a separate worker: true instance drains the same adapter'`): a producer app registers the _same_ `Queue` class (real handlers included) with `worker: false`, so nothing in that process ever polls, for _any_ queue it holds.

That's whole-process producer/consumer split. It has no answer for a process that needs to be `worker: true` — a genuine consumer — for queue A, while remaining a pure producer for a _different_ queue B. There is currently no way to say "start real worker loops for my queues, except this one" within one `createQueuePlugin()` instance; `worker` is all-or-nothing across every `Queue` that instance's `register()` sees.

## The downstream incident this RFC is drafted from

Hiraiship (a separate, local project, same author — its own `proposals/RFC-0005-Build-Runner.md`, "Build runner") needed exactly the mixed shape above: `apps/control-plane` is the real consumer of a `hiraiship-build-results` queue and only a producer for `hiraiship-builds`; `apps/build-runner` is the mirror image. Both processes need `worker: true` for their own queue.

The design that fell out naturally — a `BuildQueue` class with an empty `jobs(router)`, registered under `queues:` purely so `.add('run', ...)` could be injected via DI — is precisely the footgun described above. It worked in isolated smoke testing (two processes, a fresh boot each, the real consumer's `reserve()` call happened to win the race before the stub's own loop got a turn) and then failed the first time it ran end to end against a real, long-running Redis-backed pair of processes: `apps/build-runner`'s own stub `BuildResultQueue` won the race for its own just-enqueued `"record"` job and dead-lettered it, permanently, before `apps/control-plane` ever saw it. The reverse happened too, independently, for the `"run"` queue. Neither failure raised an exception anywhere the application code could catch — the only signal was a `console.error` line and a job silently gone.

The workaround landed in Hiraiship's own code: skip `Queue`/`queues:` entirely for the producer side, construct the shared `RedisQueueAdapter` once, expose it through DI (`{ provide: RedisQueueAdapter, useValue: adapter }`), and call `adapter.add(queueName, job)` directly, replicating the job shape `Queue.add()`'s own handle builds internally. That works, but it means reaching past this package's own primary abstraction (`Queue`) and duplicating a few lines of its internals by hand — exactly the kind of thing a library should make unnecessary.

## No test in this package's own suite currently exercises the failure mode

`plugin-registration.test.ts` and `integration.test.ts` both cover `worker: false` at the plugin level thoroughly, and cover a `Queue` with real handlers extensively. Nothing exercises two `Queue` registrations under one shared queue name where one has genuinely zero handlers and both processes are `worker: true` — which is the exact configuration that dead-letters silently. See "Testing" below for the regression case this RFC adds.

---

# Goals

- Let a `Queue` subclass declare, per instance, that it should never get a worker loop in the process registering it — regardless of that plugin instance's own `worker` option.
- `.add()` (and `getDead()`/`retryDead()`) keep working normally on such an instance; only `startWorkerLoop` is skipped.
- Zero behavior change for any existing `Queue` registration. The new property defaults to preserving today's behavior exactly.
- Make the safe pattern (a queue registered somewhere purely to produce into it) expressible with the existing `Queue`/`queues:` primitives, so a caller never has to reach for the raw `QueueAdapter` by hand.

# Non-goals

- Job-name-aware reservation across two `Queue` registrations that **share** a queue name and each handle a _different subset_ of job names within it. That's a real, deeper feature (it needs `QueueAdapter.reserve()` itself to filter by job name, which touches the Redis adapter's Lua scripts too), but it's not what caused this bug and not required to fix it — see Alternatives.
- Any change to how `worker: false` at the plugin level behaves. That mechanism is correct and unaffected; this RFC adds a second, finer-grained lever underneath it.

---

# Detailed design

## The fix

Add an instance property to `Queue`:

```ts
// packages/ecosystem/queue/src/queue.ts
export abstract class Queue extends Provider {
  abstract name: string;

  /**
   * Set to `false` to register this queue for DI (`.add()`,
   * `getDead()`, `retryDead()`) only — never start a worker loop for
   * it in this process, regardless of the plugin's own `worker`
   * option. Use this for a queue this process only ever produces
   * into, when a *different* queue in the same process needs
   * `worker: true` for real consumption (the two can't be expressed
   * with the plugin-level `worker` option alone, which is
   * process-wide). Defaults to `true`.
   */
  worker?: boolean = true;

  handle!: QueueHandle;
  abstract jobs(router: JobRouter): void;
  // ...unchanged
}
```

And check it in `registerQueue()`:

```ts
// packages/ecosystem/queue/src/plugin.ts
if (worker && instance.worker !== false) {
  startWorkerLoop(queueName, jobs, adapter, app, stallTimeout);
}
```

`queueNames.add(queueName)` (feeding the sweeper) stays unconditional — sweeping a queue this process never reserves for is a harmless no-op (there's nothing of this process's own to reclaim or promote), and the real consumer elsewhere already sweeps the same adapter-backed queue for its own reservations.

## Usage

```ts
class BuildQueue extends Queue {
  name = 'hiraiship-builds';
  worker = false; // this process only ever calls .add() on it

  jobs(_router: JobRouter): void {
    // Never invoked — no worker loop starts for this instance.
  }
}
```

`jobs(router)` is still required (an abstract method), still called once at registration (existing behavior — needed so `registerQueue`'s validation and the type system stay consistent), it's just guaranteed never to be _polled against_ when `worker === false`. A subclass that truly has nothing to declare can leave the method body empty, exactly like Hiraiship's original (broken-without-this-fix) attempt — the fix is that doing so is now actually safe.

## Why this is safe

- Default `true` means every `Queue` subclass that doesn't set this explicitly behaves bit-for-bit as it does today. This is purely additive.
- The plugin-level `worker: false` already fully suppresses every queue in a process; this is the missing per-queue granularity underneath it, not a competing mechanism. The two compose by AND: a worker loop starts only if the plugin says `worker` and the instance doesn't say `worker: false`.
- `.add()`/`getDead()`/`retryDead()` go through `instance.handle`, assigned unconditionally in `registerQueue()` before the (now-conditional) `startWorkerLoop` call — untouched by this change.

---

# Alternatives considered

**Job-name-aware reservation** (`QueueAdapter.reserve(queue, handledNames, stallTimeout)`), letting two `Queue` registrations under the _same_ queue name safely split handling by job name, with no instance flag needed. This is the more general fix, and worth having eventually if a real use case needs to partition one queue name's job names across multiple consumer roles. Rejected for _this_ RFC: it changes the `QueueAdapter` interface (a breaking change for any custom adapter implementation), needs the Redis adapter's Lua scripts rewritten to filter by name during `BLMOVE`/reservation, and is strictly more machinery than the bug that motivated this RFC needs — Hiraiship's actual queues never share a name between roles; the two queues involved are simply different queue _names_ whose registrations happened to fall into the process/plugin-wide `worker` trap. A follow-up RFC if the narrower need above ever materializes.

**Document the footgun instead of fixing it** (a warning in the `Queue`/`jobs(router)` docs: "an empty `jobs(router)` still starts a worker loop and will dead-letter anything it reserves"). Rejected: it doesn't prevent the mistake, it just names it after the fact. The fix here is a two-line change to `plugin.ts` plus one property on `Queue` — cheaper than a documentation-only fix that still leaves the unsafe pattern constructible.

**Throw at registration time when `worker: true` and `jobs(router)` produced zero handlers**, forcing every producer-only case through an explicit escape hatch. Rejected as the _sole_ fix: it would make the very pattern this RFC is adding (a legitimate, intentional zero-handler registration) impossible to express, since a real mistake and a deliberate producer-only queue look identical to `registerQueue()` — a router with nothing in it. Worth layering _on top of_ this RFC as a nice-to-have fast-fail (throw only when `worker` is true, `instance.worker` is not explicitly `false`, and `jobs.size === 0`) — a separate, smaller follow-up, not blocking this one.

---

# Breaking change and migration

None. `worker` defaults to `true` on `Queue`, matching every existing subclass's current, unannotated behavior exactly. No migration needed for any existing code; the new property is opt-in.

---

# Testing

Add a regression test to `integration.test.ts` reproducing the exact failure mode, alongside the existing `'worker: false — ...'` test:

```ts
it("a producer-only Queue (worker: false, empty jobs()) never dead-letters a job meant for a different process's real consumer", async () => {
  const sharedAdapter = new MemoryQueueAdapter();
  const processed: string[] = [];

  // The real consumer, in "process B".
  class RealQueue extends Queue {
    name = 'shared-name';
    jobs(router: JobRouter) {
      router.process('task', async (job: Job) => {
        processed.push(job.id);
      });
    }
  }

  // The producer-only registration, in "process A" — worker: true at
  // the PLUGIN level (process A is a real consumer of some OTHER
  // queue not shown here), worker: false on THIS instance.
  class ProducerOnlyQueue extends Queue {
    name = 'shared-name';
    worker = false;
    jobs(_router: JobRouter): void {}
  }

  let producerQueue: ProducerOnlyQueue | undefined;
  class ProducerController extends Controller {
    constructor(q: ProducerOnlyQueue) {
      super();
      producerQueue = q;
    }
    routes(_router: Router) {}
  }

  const processA = new ServerApp();
  processA.registerPlugin(
    createQueuePlugin({ adapter: sharedAdapter, worker: true })
  );
  processA.registerModule(
    defineModule({
      name: 'ProcessA',
      queues: [ProducerOnlyQueue],
      controllers: [ProducerController],
    })
  );
  processA.compile();

  const processB = new ServerApp();
  processB.registerPlugin(
    createQueuePlugin({ adapter: sharedAdapter, worker: true })
  );
  processB.registerModule(
    defineModule({ name: 'ProcessB', queues: [RealQueue] })
  );
  processB.compile();

  const id = await producerQueue!.add('task', {});
  await new Promise((r) => setTimeout(r, 60));

  expect(processed).toEqual([id]); // delivered to the real handler
  expect(await sharedAdapter.getDead('shared-name')).toEqual([]); // never dead-lettered

  await processA.close();
  await processB.close();
});
```

Run without this RFC's fix (i.e. against current `main`), this test is flaky-to-failing depending on reservation timing — sometimes `processed` is empty and `getDead()` has one entry instead, reproducing Hiraiship's exact incident. With the fix, it's deterministic: `ProducerOnlyQueue`'s `worker = false` means `processA` never starts a loop for `"shared-name"` at all, so only `processB`'s real consumer ever reserves from it.

Also add a small unit test to `plugin-registration.test.ts`: a `Queue` with `worker = false` and a plugin-level `worker: true`, asserting (via a spy on the adapter's `reserve()`, or simply that a manually-added job is never processed after a wait) that no worker loop was started for it.

---

# Open questions

- **Naming.** `Queue.worker` and `QueuePluginOptions.worker` are two different-scoped booleans with the same name, composed by AND. It's accurate (both answer "does a worker loop run here"), but a reader skimming a `Queue` subclass next to `createQueuePlugin({ worker: true })` may read them as redundant or conflicting at a glance. An alternative name for the instance property (`consumes`, `startWorkerLoop`, `local` — something that reads distinctly from the plugin option) might be clearer; not resolved here, deferred to implementation review.
- **Whether `jobs(router)` should still be required (non-optional) on a `worker = false` queue**, given it's now provably dead code for that instance. This RFC keeps it required (simplest, no change to the abstract contract, and a future `worker = true` flip on the same class costs nothing extra), but an optional-when-`worker-is-false` variant is a small ergonomic improvement worth considering if this pattern turns out to be common.
