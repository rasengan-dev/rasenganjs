# @rasenganjs/queue — Architecture & API Reference

This document describes how the package works internally: every public
class, type, and function, and the mechanics behind them. For "how do I
use this in my app," see [README.md](./README.md) instead.

Status: **Phase 1 (Core) + Phase 2 (Time) + Phase 3 (Redis)** of
RFC-0004 — see `proposals/RFC-0004-Background-Job-Queues.md` in the
monorepo root for the full multi-phase plan.

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

  add(name: string, data: unknown, options?: AddJobOptions): Promise<string>;
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
- `options` (Phase 2, optional — omitted entirely in Phase 1, see §8)
  supports `{ delay }` and `{ repeat }`; see `AddJobOptions` in §4.
  **For a `{ repeat }` registration, `add()` resolves with the recurring
  job's `jobKey`, not a fresh random id** — the only channel to hand the
  caller a stable, reusable identity.
- Extends `Provider`: `onInit()`/`onDestroy()` fire like any other
  provider, and the instance is exportable
  (`defineModule({ queues: [...], exports: [...] })`).

### `QueueHandle`

```ts
interface QueueHandle {
  add(name: string, data: unknown, options?: AddJobOptions): Promise<string>;
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

| Type             | Shape                                                                            | Notes                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `StoredJob`      | `{ id, name, data, attempt, enqueuedAt, reservedAt?, readyAt?, repeat? }`        | Adapter-facing. `reservedAt` is a **stall deadline** (§5/§7), `readyAt` gates delayed jobs, `repeat` marks recurring-job instances. |
| `Job<T>`         | `Omit<StoredJob, 'reservedAt' \| 'data' \| 'readyAt' \| 'repeat'> & { data: T }` | Handler-facing view — drops all adapter-only fields, unchanged shape from Phase 1.                                                  |
| `JobHandler<T>`  | `(job: Job<T>) => void \| Promise<void>`                                         | Resolve = complete; throw = retry-or-dead-letter (see §6).                                                                          |
| `ProcessOptions` | `{ attempts?, backoff?, concurrency? }`                                          | See §3 for defaults.                                                                                                                |
| `AddJobOptions`  | `{ delay?: number; repeat?: { every: number; key?: string } }`                   | Mutually exclusive; see §6.                                                                                                         |
| `QueueAdapter`   | interface, see below                                                             | Pluggable storage contract.                                                                                                         |
| `QueueClass`     | `new (...args) => Queue`                                                         | What `defineModule({ queues: [...] })` accepts.                                                                                     |

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
- `sweep()` shipped as a no-op in Phase 1 specifically so its
  responsibilities could widen without a breaking interface change. As
  of Phase 2 it has three real jobs, run once per tick by the plugin's
  sweeper (§8): promote due delayed jobs, spawn due repeat-job
  instances, and reclaim active jobs whose stall deadline has passed.
- `fail()` with `retryAt` present means "re-schedule"; omitted means
  "exhausted or unroutable — dead-letter." Unchanged since Phase 1 —
  retry-backoff still uses its own mechanism, not `sweep()` (see §5).

## 5. `MemoryQueueAdapter` (`src/adapters/memory.ts`)

The default, dev-only `QueueAdapter` implementation.

```ts
class MemoryQueueAdapter implements QueueAdapter {
  /* ... */
}
```

Per-queue state (Phase 2): `{ waiting: StoredJob[]; delayed: StoredJob[]; active: Map<string, StoredJob>; dead: StoredJob[]; repeats: Map<string, RepeatDescriptor> }`, lazily created per queue name. A `RepeatDescriptor` is `{ jobKey, name, data, every, nextRunAt }` — a recurring registration's own bookkeeping, decoupled from any specific job instance.

- `add()`:
  - `job.repeat` present → register (or no-op if `jobKey` already registered — this is the idempotency) a `RepeatDescriptor` with `nextRunAt = Date.now() + every`. Nothing is enqueued yet.
  - `job.readyAt` present and in the future → push to `delayed`.
  - otherwise → push to `waiting` (unchanged from Phase 1).
- `reserve()` shifts the head of `waiting` (FIFO) into `active`, stamping `reservedAt = Date.now() + stallTimeout` — **a deadline, not an instant** (this is the Phase 1 → 2 meaning change; safe because Phase 1 documented the field as unread).
- `complete()` deletes from `active` — unchanged.
- `fail()` with `retryAt`: increments `attempt`, schedules a bare
  `setTimeout` to push the job back into `waiting` after the computed
  delay. Without `retryAt`: moves straight to `dead`. **Unchanged since
  Phase 1** — see the note below on why this stays separate from
  `delayed`/`sweep()`.
- `sweep(queue, now)` — three independent passes:
  1. Promote any `delayed` entry whose `readyAt <= now` into `waiting`.
  2. For each `RepeatDescriptor` with `nextRunAt <= now`, push a fresh job instance into `waiting` (tagged `repeat: { every, jobKey }`) and advance `nextRunAt += every` — fixed cadence, so a late sweep tick doesn't push the whole schedule back.
  3. Reclaim any `active` entry whose `reservedAt <= now`: delete from `active`, increment `attempt`, clear `reservedAt`, push to `waiting`. No `attempts`-exhaustion check here — see the note below.
- `getDead()` returns a shallow copy of `dead`.
- `retryDead()` splices a job out of `dead`, resets `attempt` to `1`, pushes to `waiting`.

**Why retry-backoff stays on its own timer instead of joining `delayed`/`sweep()`:** unifying them would mean the adapter's own `fail()`-then-wait-then-retry test would need to call `sweep()` explicitly instead of just waiting — a real behavior change — for no actual durability gain, since this whole adapter already discards everything on restart regardless (documented since Phase 1). A persisted adapter (Phase 3) is free to unify both under one durable mechanism internally; the shared `QueueAdapter` interface doesn't require today's in-memory implementation to prefigure that.

**Why stall-reclaim ignores per-job-name `attempts`:** the adapter has no visibility into `ProcessOptions` (that lives in `plugin.ts`'s job map, never passed down), and the RFC's own lifecycle diagram has no stalled→dead transition — only "stalled (worker died) → back to waiting (attempt++)". This is a deliberate Phase 2 scope cut: a handler that always outlives the stall deadline can reclaim-loop indefinitely with no dead-letter escape. Documented, not treated as a bug to fix unprompted.

**Jobs are lost on restart** — unlike `@rasenganjs/ws`'s memory adapter
(production-legitimate for a single-process app), a queue's entire
value proposition is surviving the process. Use `RedisQueueAdapter`
(§9) in production.

## 6. `createQueuePlugin()` (`src/plugin.ts`)

```ts
function createQueuePlugin(options?: QueuePluginOptions): ModulePlugin;

interface QueuePluginOptions {
  adapter?: QueueAdapter; // default: new MemoryQueueAdapter()
  worker?: boolean; // default: true
  stallTimeout?: number; // default: 30_000
  sweepInterval?: number; // default: 5_000
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
4. If `worker !== false`, starts the worker loop (§7) for this queue, using the configured `stallTimeout`.
5. Returns the queue's name, which `createQueuePlugin()` accumulates into a `Set<string>` shared across every `register()` call this plugin instance receives (multiple modules may each declare `queues: [...]`) — that set is what the sweeper (§8) iterates.

### `createQueueHandle()`

Builds the `QueueHandle` assigned to `Queue.handle`. `getDead()`/
`retryDead()` forward directly to the adapter, scoped to this queue's
name. `add(name, data, options?)`:

- Throws `[rasengan-queue] ".add()" cannot combine \`delay\` and \`repeat\`.` if both are present.
- **`options.repeat` present**: derives `jobKey = options.repeat.key ?? defaultJobKey(name, data)` (`defaultJobKey`, in `src/job-key.ts`, is `` `${name}:${stableStringify(data)}` `` — a deterministic, key-order-independent derivation not specified by the RFC; the explicit `key` override exists for repeat jobs that would otherwise share a name and data shape, e.g. per-tenant digests). Builds a `StoredJob` tagged `repeat: { every, jobKey }`, calls `adapter.add()`, and **resolves with `jobKey`** — not a fresh id.
- **`options.delay` present**: stamps `readyAt = Date.now() + delay` on a fresh `crypto.randomUUID()`-keyed job, calls `adapter.add()`, resolves with the id.
- **Neither**: identical to Phase 1 — fresh id, `attempt: 1`, `enqueuedAt: Date.now()`, `readyAt` left `undefined`.

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
  // Anything still sitting in the local readyBuffer was reserved (its
  // stall deadline ticking) but never dispatched. The sweeper reclaims
  // it once that deadline passes — same path as any other stalled
  // reservation, whether this process restarts or a separate one
  // shares the adapter.
});
```

## 8. The sweeper (`startSweeper`)

One `setInterval` per **plugin instance** (not per queue), started the
first time `register()` runs with `worker !== false`:

```ts
function startSweeper(
  app: ServerApp,
  adapter: QueueAdapter,
  queueNames: Set<string>,
  sweepInterval: number
): void {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const queueName of queueNames) void adapter.sweep(queueName, now);
  }, sweepInterval);

  app.onDestroy(() => clearInterval(timer));
}
```

- Iterates the `Set<string>` of every queue name this plugin instance
  has registered (populated by `registerQueue()`'s return value, §6) —
  so queues declared across multiple modules under one
  `createQueuePlugin()` call share a single sweeper.
- Gated on `worker !== false`: a produce-only process has nothing local
  to promote or reclaim; the process actually consuming jobs (sharing
  the same adapter) sweeps for it.
- Same lifecycle discipline as the worker loop (§7) and ws's heartbeat:
  started synchronously at boot, stopped via `app.onDestroy()` — for
  the identical ordering reason (forward-order, fully-awaited teardown
  ahead of any `Provider.onDestroy()`).

## 9. `RedisQueueAdapter` (`src/adapters/redis.ts`, `src/adapters/redis-scripts.ts`)

The production `QueueAdapter` — persists across restarts, safe across
multiple processes sharing one queue. Mirrors `@rasenganjs/ws`'s
`RedisGatewayAdapter` in spirit ("caller supplies the client, we don't
bundle a driver"; tested against a faked client, no real Redis server)
but not in mechanism — see below for why.

### Key layout

The `jobs` hash is the single source of truth for a `StoredJob`'s
content; every other structure stores only an id (or `jobKey`, for
repeat descriptors) as a pointer into it. `reservedAt` is never
persisted in the hash — it lives only in `active:deadline`, read back
and attached to the object `reserve()` returns.

```
queue:{name}:waiting             LIST    ids, FIFO (BLMOVE source)
queue:{name}:active              LIST    ids currently reserved (BLMOVE destination)
queue:{name}:active:deadline     ZSET    score=stall deadline, member=id
queue:{name}:delayed             ZSET    score=readyAt, member=id — unified, see below
queue:{name}:repeats             HASH    field=jobKey, value=JSON{name,data,every}
queue:{name}:repeats:schedule    ZSET    score=nextRunAt, member=jobKey
queue:{name}:dead                LIST    ids
queue:{name}:jobs                HASH    field=id, value=JSON StoredJob (minus reservedAt)
```

Default prefix `queue:`, configurable via `keyPrefix`.

### `RedisLike` — 4 methods, not the ~8 the RFC sketched

```ts
interface RedisLike {
  eval(
    script: string,
    numKeys: number,
    ...args: (string | number)[]
  ): Promise<unknown>;
  blmove(
    source: string,
    destination: string,
    sourceDirection: 'LEFT' | 'RIGHT',
    destinationDirection: 'LEFT' | 'RIGHT',
    timeoutSeconds: number
  ): Promise<string | null>;
  lrange(key: string, start: number, stop: number): Promise<string[]>;
  hmget(key: string, ...fields: string[]): Promise<(string | null)[]>;
}
```

Every mutating operation ended up needing Lua for atomicity, so
`zadd`/`hset`/`hget`/`hdel`/`lrem`/`zrem`/`zrangebyscore` are only ever
called _inside_ scripts via `redis.call(...)` — never as direct
JS-level bindings. All four are real `ioredis` method names/signatures
(and match Bun's `Bun.redis` where it implements the same command
surface), so a real client satisfies `RedisLike` with zero glue. No
`import type { Redis } from 'ioredis'` anywhere in `redis.ts` —
deliberate divergence from `RedisGatewayAdapter`: the portability goal
here (any Redis-command-compatible client, any runtime) is broader than
what ws's Node/ioredis-only adapter needed to solve.

### Every `QueueAdapter` method, as one (or two) Redis round trips

- **`add()`** — one of three scripts depending on the branch (repeat /
  delayed / immediate), same three-way split as `MemoryQueueAdapter`.
  The repeat branch's idempotency (`jobKey` already registered → no-op)
  is the one place true cross-process atomicity matters that the
  single-process `Map`-based memory adapter never had to think about:
  `ADD_REPEAT_SCRIPT` does the check-then-set inside one `EVAL`, so two
  processes racing to register the same `jobKey` can't both win.
- **`reserve(queue, stallTimeout)`** — genuinely two round trips, since
  Redis disallows blocking commands inside `EVAL`: `blockingClient.blmove(waiting, active, ...)`
  on the dedicated blocking connection, then `client.eval(STAMP_DEADLINE_SCRIPT, ...)`
  on the primary connection to record the stall deadline and fetch the
  job. The gap between them (a crash mid-way leaves a reservation with
  no deadline entry) is closed by `RECLAIM_STALLED_SCRIPT`'s self-heal
  (below) — worst case, an orphan is caught on the next sweep tick
  instead of leaking forever.
- **`complete()` / `fail()`** — one script each, guarded by
  `ZSCORE(active:deadline, id) == false` → silent no-op (matches
  `MemoryQueueAdapter`'s behavior on an already-completed/failed id).
  `fail()` with no `retryAt` pushes straight to `dead`; with `retryAt`,
  increments `attempt` and adds to `delayed` — **the same zset `{ delay }`
  jobs use.**
- **`sweep(queue, now)`** — three independent scripts, each capped at
  `sweepBatchSize` (default `1000`) entries per pass, to bound
  single-threaded Lua runtime under a thundering herd of due jobs (a
  real concern here the in-memory adapter never faces): promote due
  `delayed` entries, spawn due repeat instances (id = `` `${jobKey}:${nextRunAt}` ``
  — deterministic, since Lua has no `crypto.randomUUID()`) and advance
  `nextRunAt`, and reclaim stalled `active` entries (plus the
  self-healing scan for the `reserve()` crash window above) — no
  `attempts`-exhaustion check, same as `MemoryQueueAdapter`.
- **`getDead()` / `retryDead()`** — plain reads (`lrange` + batched
  `hmget`) and one script, respectively.

### Why retry-backoff and `{ delay }` are unified here, unlike `MemoryQueueAdapter`

`MemoryQueueAdapter` keeps them on two mechanisms (bare `setTimeout` vs.
a `delayed` array) because a timer was cheap and already available, and
the adapter discards everything on restart regardless — unifying would
have bought no durability there. Neither premise survives to Redis:
there is no `setTimeout`-equivalent in Redis at all, so retry-backoff
_must_ become a durable, polled (zset + sweep) structure here regardless
of the unification question. Once both are the same shape, two zsets
would buy nothing. The one honest trade-off: a Redis-backed retry
becomes reservable at the next sweep tick on/after `retryAt` (≤
`sweepInterval` slack), not the instant a bare timer would fire — the
same precision `{ delay }` jobs already have, just applied uniformly.

### A known throughput ceiling

`plugin.ts`'s worker loop is an unmodified, fixed 25ms `setInterval`
tick calling `reserve()`. `blockTimeoutSeconds` therefore defaults short
(`0.02`s) — a long block would let queued `BLMOVE` calls pile up on the
blocking connection faster than they drain. Consequence: this adapter
gets `BLMOVE`-the-primitive (per the RFC's mandate) but not its actual
efficiency win (near-zero-latency wakeup without polling) — throughput
stays bounded by the 25ms tick, same as `MemoryQueueAdapter`. Fixing
that for real needs a `plugin.ts` change (a long-block code path some
adapters opt into) — out of scope here, flagged as future work.

### Testing bar

`src/__tests__/redis-adapter.test.ts` mirrors `RedisGatewayAdapter`'s
test file exactly: no real Redis server anywhere. A real Lua
interpreter is impractical to fake, so tests assert at the
orchestration grain — the right script (by identity to the exported
constant) with the right `KEYS`/`ARGV`, `eval()`'s resolved value
stubbed directly to drive downstream parsing. Live-Redis verification
is explicitly flagged as outstanding (`it.todo(...)`), matching the
RFC's own stated bar for this phase.

## 10. Deliberate scope decisions

**Phase 1:**

- **Concurrency lives in the worker loop, not the adapter** — see §4's
  note on `reserve()` staying queue-wide, so a future `RedisQueueAdapter`
  satisfies the identical contract.
- **`sweep()` shipped as a no-op** rather than being added to the
  interface later — avoided a breaking change to custom `QueueAdapter`
  implementations when Phase 2 landed.

**Phase 2:**

- **No `delay`/`repeat` options on `.add()` in Phase 1** —
  `add(name, data): Promise<string>` took no options parameter at all,
  rather than accepting-and-silently-ignoring `{ delay }`/`{ repeat }`
  (an ignored option would have silently turned an intended recurring
  job into a one-off). Dropping the parameter made a Phase-2-only call
  site an arity error instead; adding it back as optional now (§2/§6)
  is non-breaking for every Phase 1 call site.
- **`jobKey` derivation is not specified by the RFC** — `name` +
  stable-stringified `data` was chosen so distinct repeat jobs sharing a
  name but differing by payload (e.g. per-tenant digests) don't collide
  by default; `repeat.key` is the escape hatch (§6).
- **Repeat rescheduling is `sweep()`-owned**, not tied to any specific
  job instance completing — a `RepeatDescriptor` lives independently in
  adapter state (§5), so `complete()`/`fail()` needed zero changes.
- **`reservedAt`'s meaning changed** from "reservation instant" to
  "stall deadline" (§5) — safe only because Phase 1 documented it as
  unread; an out-of-tree custom adapter that already read it expecting
  an instant would see a silent behavior change, not a compile error.
- **Retry-backoff and delayed jobs deliberately use two different
  mechanisms** in `MemoryQueueAdapter` (§5) — not unified, and not
  expected to be the pattern `RedisQueueAdapter` (Phase 3) necessarily
  follows internally.
- **Stalled-job reclaim ignores per-job-name `attempts`** (§5) — matches
  the RFC's lifecycle diagram exactly, but is a real scope cut worth
  restating: no dead-letter escape exists yet for a handler that always
  outlives its stall deadline.
- **The sweeper is gated on `worker !== false`** (§8) — not explicit in
  the RFC's Plugin Options text, but the only placement that makes sense
  given what `sweep()` actually does.

**Phase 3:**

- **`RedisQueueAdapter` unifies retry-backoff and `{ delay }`** (§9),
  reversing Phase 2's deliberate separation for `MemoryQueueAdapter` —
  both premises behind that separation (a cheap timer already
  available, no durability to gain from unifying) are specific to the
  in-memory adapter and don't survive to Redis, which has no
  `setTimeout`-equivalent at all.
- **`reserve()` is two Redis round trips, not one** (§9) — Redis
  disallows blocking commands inside `EVAL`, so the stall-deadline
  stamp can't be fused with the `BLMOVE`. Closed with a self-healing
  reclaim pass rather than pretending the gap doesn't exist.
- **`RedisLike` ended up smaller than the RFC's own sketch** (4 methods,
  not ~8) — audited from the actual design rather than assumed: every
  mutating command turned out to need Lua, so only `eval`/`blmove`/
  `lrange`/`hmget` are called directly.
- **`blockTimeoutSeconds` defaults to 20ms, not a "real" blocking
  wait** (§9) — a deliberate ceiling on the win `BLMOVE` normally
  provides, imposed by `plugin.ts`'s existing fixed-interval poll loop,
  which this phase does not modify. Flagged as future work, not solved
  here.
- **No live-Redis integration test** — matches the RFC's own explicitly
  stated bar for this phase (same as `RedisGatewayAdapter`), not an
  oversight.
