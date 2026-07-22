# @rasenganjs/queue — Architecture & API Reference

This document describes how the package works internally: every public
class, type, and function, and the mechanics behind them. For "how do I
use this in my app," see [README.md](./README.md) instead.

Status: **Phase 1 (Core)** of RFC-0004. No delayed jobs, no repeatable
jobs, no stalled-job reclaim/sweeper, no Redis adapter — see
`proposals/RFC-0004-Background-Job-Queues.md` in the monorepo root for
the full multi-phase plan.

## 1. Design

`@rasenganjs/queue` mirrors `@rasenganjs/ws`'s architecture exactly: a
`ModulePlugin` claims a key on `defineModule()` (`queues` here,
`gateways` there), the declared classes extend `Provider` so they're
real DI citizens, and a plugin-assigned handle (`Queue.handle`, ws's
`Gateway.server`) is how the class gets its runtime capability without
constructing it itself.

```
defineModule({ queues: [EmailQueue] })
        │
        ▼
createQueuePlugin() — claims key: 'queues'
        │
        ▼
container.resolve(EmailQueue) — real DI instance, constructor-injectable
        │
        ▼
instance.jobs(router) — collects job-name → handler map
        │
        ▼
instance.handle = createQueueHandle(...) — producer surface wired in
        │
        ▼
startWorkerLoop(...) — reserve → dispatch → complete/fail, if worker !== false
```

## 2. `Queue` (`src/queue.ts`)

```ts
abstract class Queue extends Provider {
  abstract name: string;
  handle!: QueueHandle;
  abstract jobs(router: JobRouter): void;

  add(name: string, data: unknown): Promise<string>;
  getDead(): Promise<StoredJob[]>;
  retryDead(id: string): Promise<void>;
}
```

- `name` — the queue's identity, used as the adapter's storage key.
- `jobs(router)` — declare job handlers imperatively, mirroring
  `Gateway.messages(router)` / `Controller.routes(router)`.
- `handle` — assigned by `createQueuePlugin()` after this instance is
  resolved by the container. Never construct it yourself. `add()` /
  `getDead()` / `retryDead()` are thin forwards to `handle` — they exist
  as real methods on the base class (not attached ad hoc) so
  `this.emailQueue.add(...)` type-checks without every subclass having
  to redeclare them.
- Extends `Provider`: `onInit()`/`onDestroy()` fire like any other
  provider, and the instance is exportable
  (`defineModule({ queues: [...], exports: [...] })`).

### `QueueHandle`

```ts
interface QueueHandle {
  add(name: string, data: unknown): Promise<string>;
  getDead(): Promise<StoredJob[]>;
  retryDead(id: string): Promise<void>;
}
```

The producer surface. Structurally identical in spirit to
`@rasenganjs/ws`'s `GatewayServer` — a capability object assigned
post-resolve, never built by the class itself.

## 3. `JobRouter` (`src/queue.ts`)

```ts
class JobRouter {
  process<T = unknown>(
    name: string,
    handler: JobHandler<T>,
    options?: ProcessOptions
  ): void;

  /** @internal */
  getJobs(): Map<string, RegisteredJob>;
}
```

- `process()` registers one handler per job name. Throws
  `[rasengan-queue] Job "<name>" is already registered on this queue.`
  on a duplicate name within the same queue.
- Missing options default to `{ attempts: 1, backoff: 0, concurrency: 1 }`
  — no retry, immediate retry timing (moot with `attempts: 1`), one
  in-flight call per job name.
- `getJobs()` is consumed by `createQueuePlugin()` right after calling
  `instance.jobs(router)` — not part of the public surface a queue
  author needs to touch.

### `RegisteredJob`

```ts
interface RegisteredJob {
  handler: JobHandler;
  options: Required<ProcessOptions>;
}
```

The resolved (defaults-applied) form stored per job name.

## 4. Types (`src/types.ts`)

| Type             | Shape                                                   | Notes                                                                                                                |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `StoredJob`      | `{ id, name, data, attempt, enqueuedAt, reservedAt? }`  | Adapter-facing. `reservedAt` is bookkeeping only in Phase 1 — nothing reads it yet (stalled-job reclaim is Phase 2). |
| `Job<T>`         | `Omit<StoredJob, 'reservedAt' \| 'data'> & { data: T }` | Handler-facing view — drops adapter-only fields.                                                                     |
| `JobHandler<T>`  | `(job: Job<T>) => void \| Promise<void>`                | Resolve = complete; throw = retry-or-dead-letter (see §6).                                                           |
| `ProcessOptions` | `{ attempts?, backoff?, concurrency? }`                 | See §3 for defaults.                                                                                                 |
| `QueueAdapter`   | interface, see below                                    | Pluggable storage contract.                                                                                          |
| `QueueClass`     | `new (...args) => Queue`                                | What `defineModule({ queues: [...] })` accepts.                                                                      |

### `QueueAdapter`

```ts
interface QueueAdapter {
  add(queue: string, job: StoredJob): Promise<void>;
  reserve(queue: string, stallTimeout: number): Promise<StoredJob | null>;
  complete(queue: string, id: string): Promise<void>;
  fail(queue: string, id: string, opts: { retryAt?: number }): Promise<void>;
  sweep(queue: string, now: number): Promise<void>;
  getDead(queue: string): Promise<StoredJob[]>;
  retryDead(queue: string, id: string): Promise<void>;
}
```

Design notes:

- `reserve()` is **queue-wide, not job-name-scoped** — this mirrors
  `GatewayAdapter`'s deliberately minimal philosophy (no priorities, no
  rate limiting) and keeps the contract satisfiable by a Redis-backed
  adapter with a single `BLMOVE`. Per-job-name `concurrency` is
  therefore enforced by the worker loop, _above_ the adapter (§6), not
  by the adapter itself.
- `sweep()` is part of the contract from Phase 1 onward even though
  nothing calls it yet — every Phase-1 adapter no-ops it. Widening the
  interface later (Phase 2 needs it for promoting delayed/repeat jobs
  and reclaiming stalled ones) would otherwise be a breaking change for
  anyone who implemented a custom adapter against a narrower shape.
- `fail()` with `retryAt` present means "re-schedule"; omitted means
  "exhausted or unroutable — dead-letter."

## 5. `MemoryQueueAdapter` (`src/adapters/memory.ts`)

The default, dev-only `QueueAdapter` implementation.

```ts
class MemoryQueueAdapter implements QueueAdapter {
  /* ... */
}
```

Per-queue state: `{ waiting: StoredJob[]; active: Map<string, StoredJob>; dead: StoredJob[] }`, lazily created per queue name.

- `add()` pushes to `waiting`.
- `reserve()` shifts the head of `waiting` (FIFO) into `active`, stamping `reservedAt`.
- `complete()` deletes from `active`.
- `fail()` with `retryAt`: increments `attempt`, schedules a bare
  `setTimeout` to push the job back into `waiting` after the computed
  delay. Without `retryAt`: moves straight to `dead`.
- `sweep()` is a documented no-op.
- `getDead()` returns a shallow copy of `dead`.
- `retryDead()` splices a job out of `dead`, resets `attempt` to `1`, pushes to `waiting`.

**Jobs are lost on restart** — unlike `@rasenganjs/ws`'s memory adapter
(production-legitimate for a single-process app), a queue's entire
value proposition is surviving the process. Use a persisted adapter in
production once one ships (Phase 3: `RedisQueueAdapter`).

## 6. `createQueuePlugin()` (`src/plugin.ts`)

```ts
function createQueuePlugin(options?: QueuePluginOptions): ModulePlugin;

interface QueuePluginOptions {
  adapter?: QueueAdapter; // default: new MemoryQueueAdapter()
  worker?: boolean; // default: true
}
```

Returns a `ModulePlugin` claiming `key: 'queues'`. `asProviders()` is a
one-liner (`return value as QueueClass[]`) because `Queue extends
Provider` — the declared array is already real DI tokens, so
`compile()` registers/exports/eagerly-resolves them exactly like a
hand-declared provider.

### Per-queue registration (`registerQueue`)

For each resolved `Queue` instance:

1. Validates it, throwing on the first failing check (mirrors
   `@rasenganjs/ws`'s validation style and error-message format):
   - Not `instanceof Queue` → `"<Class>" is registered under \`queues\` but does not extend \`Queue\`.`
   - Missing `name` → `Queue "<Class>" is missing a \`name\` (e.g. name = 'emails').`
   - `jobs` not a function → `Queue "<Class>" is missing a \`jobs(router)\` method.`
2. Builds a `JobRouter`, calls `instance.jobs(router)`, reads back the job map.
3. Assigns `instance.handle = createQueueHandle(queueName, adapter)`.
4. If `worker !== false`, starts the worker loop (§7) for this queue.

### `createQueueHandle()`

Builds the `QueueHandle` assigned to `Queue.handle`. `add()` generates
`crypto.randomUUID()`, stamps `attempt: 1` and `enqueuedAt: Date.now()`,
and calls `adapter.add()`. `getDead()`/`retryDead()` forward directly to
the adapter, scoped to this queue's name.

## 7. The worker loop (`startWorkerLoop`)

A poll loop, one per queue, per process (when `worker !== false`):

```
every WORKER_POLL_INTERVAL_MS (25ms):
  1. drainBuffer() — retry dispatching anything held back for lack of
     per-name concurrency, now that capacity may have freed up
  2. reserve() one job from the adapter
  3. if the job's name has free concurrency capacity → dispatch it
     otherwise → push it into a local readyBuffer (already reserved —
     safe, no other worker can double-dispatch it — just executed later)
```

`dispatch()`:

- No handler registered for the job's name → logs and calls
  `adapter.fail(queue, id, {})` (straight to dead-letter) instead of
  leaving the reservation stuck forever.
- Otherwise increments the per-name in-flight counter, runs the
  handler, and decrements the counter in a `finally` once it settles
  (success or failure).

`runJob()` — the resolve/throw contract:

```ts
try {
  await handler(job);
  await adapter.complete(queue, id);
} catch {
  if (job.attempt < options.attempts) {
    const retryAt = Date.now() + options.backoff * 2 ** (job.attempt - 1);
    await adapter.fail(queue, id, { retryAt }); // exponential backoff
  } else {
    await adapter.fail(queue, id, {}); // dead-letter
  }
}
```

### Lifecycle: why `app.onDestroy()`, not `Queue.onInit()`/`onDestroy()`

The loop is started **synchronously inside `plugin.register()`**
(during `dispatchPlugins()`, at boot — before `container.initAll()`
runs) and stopped via **`app.onDestroy()`** — exactly
`@rasenganjs/ws`'s heartbeat-timer pattern. This is deliberate:

- `app.onDestroy()` handlers run in **forward registration order** and
  are **fully awaited** before any `Provider.onDestroy()` fires
  (`ServerApp.close()` runs Futon's own destroy pass first, then the DI
  container's `destroyAll()` in reverse order). That is the only place
  "stop reserving, await in-flight jobs" — this RFC's own stated goal —
  can run deterministically ahead of unrelated providers' cleanup.
- Putting this in `Queue`'s own `onInit()`/`onDestroy()` instead would
  make both start and stop timing depend on unrelated providers' own
  lifecycle hooks (`initAll()` is fire-and-forget and sequential;
  `destroyAll()` runs in reverse resolution order) — neither guarantee
  is what a worker loop needs.

Shutdown sequence for one queue's loop:

```ts
app.onDestroy(async () => {
  stopped = true;
  clearInterval(timer);
  await Promise.all(inFlight); // "await in-flight jobs"
  // Anything still sitting in the local readyBuffer was reserved
  // (visibility deadline ticking) but never dispatched. Phase 1 ships
  // no sweep()/stall-reclaim — recovering it is Phase 2's job.
});
```

## 8. Deliberate Phase 1 scope decisions

- **No `delay`/`repeat` options on `.add()`.** `add(name, data): Promise<string>`
  takes no options parameter at all in Phase 1, rather than
  accepting-and-silently-ignoring `{ delay }`/`{ repeat }` — an ignored
  option would silently turn an intended recurring job into a one-off.
  Dropping the parameter makes a Phase-2-only call site an arity error
  today; adding it back as optional later is non-breaking.
- **Concurrency lives in the worker loop, not the adapter** — see §4's
  note on `reserve()` staying queue-wide, so a future `RedisQueueAdapter`
  satisfies the identical contract.
- **`sweep()` ships now as a no-op** rather than being added to the
  interface later — avoids a breaking change to custom `QueueAdapter`
  implementations when Phase 2 lands.
