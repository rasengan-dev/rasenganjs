# RFC 0004 — Background Job Queues (@rasenganjs/queue)

**Status:** Partially Implemented — Phase 1 (Core) landed 2026-07-21, Phases 2-4 outstanding  
**Author:** Rasengan.js Core Team  
**Date:** 2026-07-14

## Executive Summary

This RFC proposes `@rasenganjs/queue`, an ecosystem package for background job processing: enqueue work from any controller, gateway or provider, and process it in workers — with retries, backoff, delayed jobs, repeatable (cron-like) jobs, stalled-job recovery and graceful shutdown.

It follows the pattern `@rasenganjs/ws` established: a `ModulePlugin` claiming a `queues:` key on `defineModule()`, class-based declaration resolved through the shared DI container, and a pluggable storage adapter. Runtime portability (Node, Bun, Deno) is achieved by **not bundling any Redis client**: the Redis adapter types against a minimal structural interface and the caller supplies whichever client their runtime prefers.

Repeatable jobs deliberately subsume the "scheduler/cron module" question — one primitive instead of two.

---

# Motivation

Rasengan Server has no background-work story. Everything runs inside a request or a WebSocket message handler, which forces bad patterns:

- Slow work (emails, thumbnails, webhooks, exports) blocks responses or gets fire-and-forgotten with no retry.
- Scheduled work has no home. The current workaround is a `Provider` starting a `setInterval` in `onInit()` — which, before RFC-0003's eager resolution, additionally required a dummy injection to even instantiate.
- Failures are invisible: no retries, no backoff, no dead-letter, no recovery when a process dies mid-task.

The `ModulePlugin` system was built precisely so capabilities like this can join `defineModule()` without touching core. Queues are its second consumer and the strongest validation of that design.

---

# Goals

- `defineModule({ queues: [EmailQueue] })` via `createQueuePlugin()` — same registration, DI and ergonomics as gateways.
- Producer API injectable anywhere: `this.emailQueue.add('welcome', data, options)`.
- At-least-once processing with configurable `attempts` + backoff, dead-letter after exhaustion.
- Delayed jobs (`{ delay }`) and repeatable jobs (`{ repeat: { every } }`).
- Stalled-job recovery: work reserved by a dead worker returns to the queue after a visibility timeout.
- Producer/consumer split: a process can enqueue without consuming (`worker: false`).
- Graceful shutdown: stop reserving, await in-flight jobs (`app.onDestroy`).
- Runtime-agnostic worker loop: Node, Bun and Deno with identical behavior.
- Pluggable `QueueAdapter`: `MemoryQueueAdapter` (dev) and `RedisQueueAdapter` (production) shipped.

## Non-goals

- Cron _expressions_ — v1 repeats are `{ every: ms }` only (no cron-parser dependency; expressions can layer on later without breaking).
- Priorities, rate limiting, per-job progress events, a dashboard UI.
- Sandboxed processors (BullMQ's child-process model — Node-only by nature).
- Exactly-once delivery. The contract is at-least-once; handlers should be idempotent.
- Running _workers_ on workerd — no long-running loop exists there. Producing from workerd remains possible through an adapter.
- Bundling a Redis client (see Runtime Portability).

---

# Proposed API

```ts
// email.queue.ts
import { Queue, JobRouter, type JobHandler } from '@rasenganjs/queue';

export class EmailQueue extends Queue {
  name = 'emails';

  constructor(private mailer: MailerService) {
    super();
  }

  jobs(router: JobRouter) {
    router.process('welcome', this.sendWelcome, {
      attempts: 3, // total tries before dead-letter
      backoff: 5_000, // base delay, doubles per retry
      concurrency: 5, // parallel jobs of this type per worker
    });
  }

  sendWelcome: JobHandler<{ userId: string }> = async (job) => {
    // job: { id, name, data, attempt, enqueuedAt }
    await this.mailer.sendWelcome(job.data.userId);
    // resolve → completed; throw → retry per policy → dead-letter
  };
}

// email.module.ts
export default defineModule({
  queues: [EmailQueue],
  providers: [MailerService, EmailQueue], // injectable by this module (RFC-0003 scoping applies)
  exports: [EmailQueue], // ...and by importers
});

// main.ts
bootstrap((app) => {
  app.registerPlugin(createQueuePlugin({ adapter: redisAdapter }));
  app.registerModule(appModule);
});
```

Producing, from anywhere DI reaches:

```ts
class SignupController extends Controller {
  constructor(private emailQueue: EmailQueue) {
    super();
  }

  register: RouteHandler = async (ctx) => {
    const user = await this.users.create(ctx.body);
    await this.emailQueue.add('welcome', { userId: user.id });
    // Phase 2 (not yet implemented): a delayed followUp job.
    // await this.emailQueue.add('followUp', { userId: user.id }, { delay: 86_400_000 });
    return ctx.res.json({ ok: true });
  };
}
```

> **Phase 1 note:** `.add()` ships with no options parameter at all
> (`add(name, data): Promise<string>`) rather than accepting-and-ignoring
> `{ delay }`/`{ repeat }` — an ignored option would silently turn a
> caller's intended recurring digest into a single one-off job. Dropping
> the parameter makes any Phase-2-only call an arity error today; adding
> it back as optional in Phase 2 is non-breaking for every Phase-1 call
> site.

Repeatable jobs replace the scheduler-module idea:

```ts
// registered once at startup (idempotent by jobKey)
await this.statsQueue.add('digest', {}, { repeat: { every: 3_600_000 } });
```

## Handler semantics

Mirrors the ack contract from the ws heartbeat/ack work: **resolve = complete, throw = fail**. A failed job with remaining attempts is re-scheduled with exponential backoff; after the last attempt it moves to the dead-letter list, inspectable via `queue.getDead()` / re-enqueueable via `queue.retryDead(id)`.

## Plugin options

```ts
createQueuePlugin({
  adapter?: QueueAdapter;     // default MemoryQueueAdapter (dev only)
  worker?: boolean;           // default true; false = produce-only process
  stallTimeout?: number;      // default 30_000 — reclaim reserved jobs after this
  sweepInterval?: number;     // default 5_000 — delayed/repeat/stall housekeeping
});
```

The same module code runs as a web process (`worker: false`) and a worker
process (`worker: true`) — deployment topology is a bootstrap flag, not a
code change.

---

# Job Lifecycle

```
add() ──────────────► waiting ──reserve──► active ──resolve──► completed
        (delay?) ▲                    │
delayed ─────────┘                    ├─throw, attempts left──► delayed (backoff)
repeat ──every──▲                     │
                                      └─throw, exhausted─────► dead
        stalled (worker died) ────────► back to waiting (attempt++)
```

At-least-once: a job whose worker dies after finishing the work but before
acknowledging completes twice. Handlers must be idempotent — the docs say
this in bold, because no queue can honestly promise otherwise.

---

# Adapter Design

## The contract

```ts
interface QueueAdapter {
  add(queue: string, job: StoredJob): Promise<void>;
  /** Blocking-or-polling reserve of the next ready job; visibility deadline recorded. */
  reserve(queue: string, stallTimeout: number): Promise<StoredJob | null>;
  complete(queue: string, id: string): Promise<void>;
  /** Re-schedule with delay (retry) or move to dead-letter. */
  fail(queue: string, id: string, opts: { retryAt?: number }): Promise<void>;
  /** Housekeeping tick: promote due delayed/repeat jobs, reclaim stalled ones. */
  sweep(queue: string, now: number): Promise<void>;
  getDead(queue: string): Promise<StoredJob[]>;
}
```

Deliberately small — no priorities, no rate limiting, no events. Anything a
fancier backend offers (BullMQ, SQS, Cloudflare Queues) fits behind this
contract as a community adapter.

## MemoryQueueAdapter (default, dev)

Timer-based, in-process, volatile. Perfect for development and tests;
prominently documented as **losing jobs on restart** — unlike ws, where the
memory adapter is production-legitimate for single-process apps, a queue's
whole value is surviving the process.

## RedisQueueAdapter (production)

Per queue: a `waiting` list, an `active` list with a deadline zset, a
`delayed` zset (score = readyAt), a `repeat` zset, a `jobs` hash and a
`dead` list. Reserve is `BLMOVE` on a **dedicated blocking connection**
(same two-connection discipline the ws Redis adapter enforces for
SUBSCRIBE); completion, retry scheduling, delayed promotion and stall
reclaim are single Lua scripts, so every state transition is atomic.

---

# Runtime Portability (Node, Bun, Deno)

The answer to "which Redis package works on all three runtimes" is **none —
by design**. Mirroring `RedisGatewayAdapter` (type-only `ioredis` import,
caller-supplied clients), the adapter types against a structural interface
of the ~8 commands it uses:

```ts
interface RedisLike {
  eval(script: string, numKeys: number, ...args: (string | number)[]): Promise<unknown>;
  lmove(...): Promise<string | null>;
  blmove(...): Promise<string | null>;
  zadd(...): Promise<unknown>;
  hset(...) / hget(...) / hdel(...): Promise<unknown>;
}

new RedisQueueAdapter({ client, blockingClient });
```

| Runtime | Client                            | Notes                                      |
| ------- | --------------------------------- | ------------------------------------------ |
| Node    | `ioredis`                         | documented default                         |
| Bun     | `ioredis` or built-in `Bun.redis` | both satisfy `RedisLike`                   |
| Deno    | `npm:ioredis` or a native client  | works via Node-compat; least battle-tested |

The worker loop itself uses only portable primitives: `setTimeout` /
`setInterval`, `Promise`, `crypto.randomUUID`, and the injected client.
Forbidden inside the package: `node:child_process`, `node:worker_threads`,
`process.on(...)` — shutdown hooks exclusively through `app.onDestroy`,
which every runtime adapter already drives.

---

# Ecosystem Fit

- **ModulePlugin**: second consumer of the extension system (`queues:` after
  `gateways:`) — proving the "core never learns what a gateway/queue is"
  design.
- **RFC-0003**: queues are providers; module scoping decides who may
  enqueue (`exports: [EmailQueue]`), and eager resolution guarantees worker
  registration and repeat-job setup happen at boot.
- **RFC-0001/ws**: same adapter philosophy, same Redis connection
  discipline, and workers can broadcast results over `gateway.server`
  (thumbnail ready → notify the room).
- **Retires the cron-module idea**: repeatable jobs are the durable,
  multi-process-safe version of `setInterval`-in-`onInit`.
- **Dogfood target**: a `MediaQueue` in rasengan-chat-demo generating image
  thumbnails after upload (RFC-0002's `fileUpload`), announcing completion
  over the chat gateway — one demo exercising three RFCs together.

---

# Delivery Phases

1. **Core — IMPLEMENTED 2026-07-21** — `Queue`/`JobRouter`/`JobHandler`
   contracts, `createQueuePlugin()` (DI, `queues:` key, worker loop,
   retries/backoff, dead-letter, graceful shutdown), `MemoryQueueAdapter`.
   26 unit + integration tests, package `@rasenganjs/queue` builds clean
   (ESM/CJS/DTS). Implementation notes:
   - Mirrors `@rasenganjs/ws`'s `Gateway`/`GatewayRouter`/`ModulePlugin`
     pattern file-for-file: `Queue extends Provider`, `asProviders()` is
     a one-liner, validation errors use the same `[rasengan-queue] ...`
     format as ws's `[rasengan-ws] ...`.
   - **Worker loop lifecycle**: started synchronously inside
     `plugin.register()` (during `dispatchPlugins()`, at boot) and
     stopped via `app.onDestroy()` — exactly ws's heartbeat pattern, not
     a `Queue`-owned `onInit()`/`onDestroy()`. This is deliberate:
     `app.onDestroy()` handlers run in forward order and are fully
     awaited _before_ any `Provider.onDestroy()` fires, which is the
     only place "stop reserving, await in-flight jobs" (this RFC's own
     wording) can run deterministically ahead of other providers'
     cleanup.
   - **`QueueAdapter` ships its full shape now**, including `sweep()`,
     with `MemoryQueueAdapter.sweep()` a documented no-op — avoids a
     breaking interface change when Phase 2 adds real sweeping.
   - **Concurrency is enforced by the worker loop, above the adapter**
     (a per-job-name in-flight counter + a local buffer for
     over-reserved jobs) — `reserve()` stays queue-wide, matching this
     RFC's "no priorities, no rate limiting" adapter philosophy, so
     Phase 3's `RedisQueueAdapter` can satisfy the identical contract.
   - **`.add()` has no options parameter in Phase 1** — see the note
     under Proposed API above.
   - Retry/backoff in `MemoryQueueAdapter.fail()` uses a bare
     `setTimeout` — in-scope per this doc's own description of the
     adapter as "timer-based", and distinct from Phase 2's producer-facing
     `{ delay }` (which needs the `delayed`/`sweep()` machinery this
     phase doesn't build).
2. **Time** — delayed jobs, repeatable jobs (`every`), stalled-job reclaim,
   the sweeper. Millisecond-scale timer tests like the heartbeat suite.
3. **Redis** — `RedisQueueAdapter` over `RedisLike`, Lua transition scripts,
   tests against a faked client (same approach as the ws Redis adapter —
   live-Redis verification flagged as outstanding).
4. **Ship** — README/CHANGELOG, chat-demo thumbnail dogfood, produce-only
   mode exercised (web process enqueues, separate worker consumes).

---

# Trade-offs

- **Hand-rolled Redis semantics** are the hard part of this RFC — stalls,
  atomicity and clock skew are exactly where queue bugs live. Mitigation:
  every transition is one Lua script, the contract is deliberately tiny,
  and BullMQ remains available behind the public `QueueAdapter` for teams
  who want its maturity.
- **At-least-once only**: honest and documented, not a limitation to fix.
- **`every`-only repeats** in v1: cron expressions need a parser dependency
  and timezone opinions; deferring them keeps the core dependency-free.

---

# Conclusion

`@rasenganjs/queue` gives Rasengan Server its background-work story using
the shapes the framework has already proven: module-native declaration,
constructor DI, imperative routers, resolve/throw semantics, and pluggable
storage with caller-supplied clients. By owning a minimal job protocol over
a structural Redis interface instead of bundling a driver, the same worker
runs unchanged on Node, Bun and Deno — and by making repeats a job option
rather than a separate scheduler module, the framework answers two needs
with one primitive.
