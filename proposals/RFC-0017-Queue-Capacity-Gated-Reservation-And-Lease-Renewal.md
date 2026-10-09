# RFC 0017 - Capacity-Gated Reservation, Lease Renewal, FIFO Dispatch and Release on Shutdown (`@rasenganjs/queue`)

**Status:** Draft
**Author:** Rasengan.js Core Team (drafted from a downstream production-readiness review — Hiraiship, RFC-0005/RFC-0031)
**Date:** 2026-09-29
**Revised:** 2026-10-09: adds §4 (release on shutdown) and §5 (reserve and ack failures), from Hiraiship's RFC-0063 live test and the shutdown crash it traced to `tick()`

## Executive Summary

`startWorkerLoop()` (`packages/ecosystem/queue/src/plugin.ts`) has three behaviors that are each harmless on their own, but together make a queue unsafe to run under real concurrent load:

1. **It reserves whether or not it has room.** Every 25ms `tick()` calls `adapter.reserve()` unconditionally. If the reserved job's name is at its `concurrency` limit, the job goes into an in-process `readyBuffer`. Redis already counts that job as `active` at that point. So one process drains an entire `waiting` list into its own memory at up to ~40 jobs/s, no matter how few it can actually run.
2. **The stall deadline starts at reservation, and nothing ever pushes it back.** `reserve()` sets `reservedAt = now + stallTimeout` once. Waiting in `readyBuffer` uses up that deadline, and so does running. When it passes, the sweeper puts the job back in `waiting` (`attempt++`, `attempts` ignored), even though the original process still holds it and will run it.
3. **The buffer drains newest-first.** `drainBuffer()` walks `readyBuffer` from its end, so the job reserved last goes out first.
4. **Stopping a worker strands what it reserved.** `onDestroy` leaves buffered jobs, and a `reserve()` still in flight, for the sweeper. Other workers get them only once `stallTimeout` has passed, with `attempt` incremented although they never ran.
5. **Adapter errors escape the loop.** A `reserve()` that rejects inside `tick()`, an ack (`complete()`/`fail()`) that rejects in `runJob()`, and the dead-letter `fail()` in `dispatch()` all end as unhandled rejections, which crash a Node process. A `complete()` that rejects after a successful handler is also treated as a handler failure and retried.

The result: horizontal scaling doesn't work, because the first worker takes every job. Any backlog longer than `stallTimeout` turns into **duplicate executions**, because a buffered job gets reclaimed, re-reserved, and buffered a second time. Old jobs can wait forever while newer ones overtake them. And a downstream app is forced to pick between a short `stallTimeout` (duplicates) and a long one (a crashed worker's jobs sit frozen for that long).

This RFC fixes all five inside `startWorkerLoop()`, plus two new **optional** `QueueAdapter` methods:

- **Capacity-gated reservation:** reserve only while `inFlight + buffered + reservesPending < totalConcurrency`. For a queue with a single job name, that means nothing is ever buffered.
- **Lease renewal:** while a job is buffered or running, extend its stall deadline every `stallTimeout / 3` through a new optional `QueueAdapter.extend()`. `stallTimeout` then means "how long a dead worker's jobs stay stuck", not "the longest a job may run".
- **FIFO drain:** walk `readyBuffer` from the front.
- **Release on shutdown:** on `onDestroy`, put every reserved, never-started job back at the head of `waiting`, in order and with `attempt` unchanged, through a new optional `QueueAdapter.release()`, before waiting for the running ones.
- **Contained adapter errors:** every adapter call the loop makes is caught. Failures are logged at a bounded rate, and an ack failure is never mistaken for a handler failure.

No public API breaks. An adapter that doesn't implement `extend()` or `release()` keeps today's lease and shutdown semantics, and the plugin warns once for each.

---

# Motivation

## The mechanics, traced through `plugin.ts`

```ts
// current — startWorkerLoop()
async function tick(): Promise<void> {
  if (stopped) return;
  drainBuffer();

  const stored = await adapter.reserve(queueName, stallTimeout); // (1) unconditional
  if (!stored) return;

  if (hasCapacity(stored.name)) {
    dispatch(stored);
  } else {
    readyBuffer.push(stored); // reserved, deadline ticking, unbounded
  }
}

const timer = setInterval(() => void tick(), WORKER_POLL_INTERVAL_MS); // not awaited
```

```ts
// current — drainBuffer()
for (let i = readyBuffer.length - 1; i >= 0; i--) {
  // (3) newest-first
  // ...
}
```

The in-code comment on `readyBuffer.push()` says a buffered job is _"Reserved for real (no other worker can double-dispatch it)"_. That's only true until its stall deadline passes, and the loop does nothing to keep a buffered job ahead of that deadline. `ARCHITECTURE.md` §7 makes the same claim ("safe, no other worker can double-dispatch it"). §10 already records that stall-reclaim ignores `attempts`, but not how that combines with an unbounded buffer.

There's a fourth problem, and it turned out not to be the smaller one. `setInterval` doesn't await `tick()`. With `RedisQueueAdapter`, one `reserve()` is a `BLMOVE` blocking up to 20ms plus a round trip, so ticks overlap and several `reserve()` calls are in flight at once.

With one queue that stays bounded: a 20ms block fits in the 25ms poll interval. With several queues it doesn't, because the adapter has one `blockingClient` and a blocking connection runs one command at a time. Three queues ask for 120 `BLMOVE`s a second from a connection that can serve about 50, and the rest wait in ioredis's command queue. Nothing ever drains it. Hiraiship's control plane (three queues: build results, metering, email) died with a V8 heap-out-of-memory error at ~4 GB after 5.4 hours. Against a local Redis, the reproduction grew by ~80 pending commands a second with three queues and stayed at 1 with one.

That part was fixed ahead of this RFC, as a bug fix (`fix/queue-single-in-flight-reserve`): `tick()` skips its `reserve()` while the previous one is still pending, and the sweeper skips a run while the previous sweep is still going. Each queue now has at most one `reserve()` outstanding; the same three-queue reproduction holds at 2 pending commands. The cost is poll latency: queues sharing one blocking connection take turns, so with three idle queues each one polls about every 60ms instead of every 25ms. A blocking connection per queue would remove that; see Open questions.

The capacity check in §1 still has to count a pending reserve (`reservesPending`), or it will over-reserve. With the guard in place that count is only ever 0 or 1.

## What this does under load: a worked example

The situation is Hiraiship's build runner, where it first came up. The queue is `hiraiship-builds` with one job name, `run`, at `concurrency: 1`. `stallTimeout` is 15 min, already raised from the 30s default so a single long build wouldn't be reclaimed mid-run. Each build takes about 8 min.

| t      | Event                                                                                                                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | Users submit A, B, C. Runner 1 reserves all three within ~75ms: A runs, B and C are buffered. Deadlines: all at t=15 min.                                                                     |
| 0      | Runner 2 (added "to scale out") finds `waiting` empty, and keeps finding it empty.                                                                                                            |
| 8 min  | A finishes. `drainBuffer()` takes the **last** entry: C runs, B stays buffered.                                                                                                               |
| 15 min | The sweeper reclaims B (still buffered, not started) and also C (running). Both go back to `waiting` with `attempt: 2`.                                                                       |
| 15 min | Runner 2 takes B and starts it. Runner 1's next tick takes C and buffers a **second copy** of it.                                                                                             |
| 16 min | Runner 1 finishes C and starts C again from its buffer: a second container building the same deployment. Runner 1 also still has the original B in its buffer, which it will run: a second B. |

With just three builds you get one build starving behind a newer one, two duplicate executions, and a second worker that only ever gets work through the duplicate path. None of it throws. The only visible symptoms are interleaved logs and duplicate result jobs.

On the consumer side the same thing happens at a smaller scale. Hiraiship's control plane consumes `hiraiship-build-results` (`record` and `log`, both `concurrency: 1`, default `stallTimeout` 30s). A `record` handler can wait up to 15s for trailing log batches and then publish to Cloudflare. If three or four builds finish together, the buffered `record` jobs go past 30s, get reclaimed and run twice. Hiraiship survives this only because it guards every state transition in its own code. RFC-0031 had to add a reorder buffer because of the newest-first drain.

## Stopping a worker, traced through a rolling deploy

Hiraiship tested its multi-instance control plane (Hiraiship RFC-0063) on 2026-10-09: two processes consuming `hiraiship-build-results` (`record` at `concurrency: 4`, `log` at `concurrency: 1`), and a build streaming 150 numbered log lines. The process holding the build's log stream was sent `SIGTERM` mid-build.

| t (UTC)  | Event                                                                                                                                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11:29:53 | Process A stops. Its `readyBuffer` holds 17 `log` batches it reserved ahead of its single `log` slot. `onDestroy` waits for the running job and leaves the 17 in `active`, deadlines ticking.                               |
| 11:30:14 | Process B runs `record`. Its handler waits up to 15s for the build's log batches, sees 120 of 137, gives up and publishes the build as finished.                                                                            |
| 11:30:25 | B's sweeper reclaims the 17 batches (30s `stallTimeout` plus a sweep interval, 32.7s after the stop), with `attempt: 2`, and B applies them, after the build was reported finished. The live view never showed those lines. |

§1 shrinks the stranded set from 17 to what the free slots of other job names let the worker buffer (`Σ concurrency` minus what's running, here at most 4), but doesn't remove it. Every rolling deploy of a worker process pays up to `stallTimeout` of latency on whatever it had reserved, and one attempt per job: a job declared with `attempts: 1` that is stranded once, then fails, goes to dead-letter without a single retry. Nothing about it is specific to several processes. Restarting the only worker strands the same jobs.

## Adapter errors in the loop

The fix that landed before this RFC (`a1abf01`) wraps `tick()`'s `reserve()` in `try/finally`, not `try/catch`. On shutdown an app typically disconnects the adapter's blocking connection, which rejects the pending `BLMOVE` with `Connection is closed.`. `void tick()` turns that into an unhandled rejection, and Node exits with an error instead of draining. Hiraiship hit it on every restart until it patched a `catch` in. The same rejection happens at any moment Redis drops, every 25ms while it's down.

`runJob()` has the same shape:

```ts
// current — runJob()
try {
  await entry.handler(job);
  await adapter.complete(queueName, stored.id); // (a) inside the handler's try
} catch {
  // ...
  await adapter.fail(queueName, stored.id, { retryAt }); // (b) can reject too
}
```

(a) A `complete()` that rejects after a successful handler lands in the handler's `catch`: the job is scheduled for a retry and runs again although it succeeded. (b) If `fail()` rejects as well, `runJob()` rejects, and its promise (held in `inFlight` with a `.finally`, never a `.catch`) is an unhandled rejection. `dispatch()`'s `void adapter.fail(...)` for a job with no handler is a third one.

## There's no `stallTimeout` value that works

Right now `stallTimeout` has to cover two separate things with one number:

- **The longest time a job can take from reservation to `complete()`**, including time spent waiting in the buffer. It has to be large, or healthy jobs get duplicated.
- **How long jobs stay stuck after their worker dies**, because nothing else notices. It has to be small, or a crash freezes work.

As long as the deadline is only set once, at reservation, those two needs contradict each other. The standard fix is a heartbeat, the same visibility-timeout-plus-extension model SQS, BullMQ locks and Sidekiq Pro use. This package's own `@rasenganjs/ws` heartbeat set the lifecycle pattern the worker loop already follows (RFC-0004).

---

# Goals

- A worker never holds more reservations than it can run within one tick: `inFlight + buffered ≤ Σ concurrency` for the queue.
- A queue with a single job name, or any queue where the reserved job's name has capacity, never buffers anything.
- A job that is buffered or running in a live process is never reclaimed by the sweeper, however long it takes.
- A job held by a dead process is reclaimed within about `stallTimeout`, whatever the handler's own running time.
- Buffered jobs are dispatched in reservation order (FIFO).
- Stopping a worker puts its reserved, never-started jobs back in `waiting` before it waits for its running ones, with `attempt` unchanged.
- No adapter call made by the worker loop or the sweeper can become an unhandled rejection, and a failed ack never re-runs a job whose handler succeeded.
- No breaking change to `Queue`, `JobRouter`, `QueuePluginOptions` or the required part of `QueueAdapter`.

# Non-goals

- **Job-name-aware reservation** (`reserve(queue, names[])`). This is still the real fix for head-of-line blocking between job names that share a queue (see "Trade-offs"), and still rejected for the reasons RFC-0016 gives: it breaks the adapter interface and needs the Lua scripts rewritten. After this RFC the problem is bounded, since at most `Σ concurrency` jobs are ever held, and the consumer-side workaround (one queue per job name) is cheap.
- **Fencing tokens** on `complete()`/`fail()`, which would stop a worker that lost its lease from acking another worker's reservation of the same id. Lease renewal makes lost leases rare (network partition longer than `stallTimeout`) instead of routine. Listed under open questions.
- **Cancelling a handler whose lease was lost** (`job.signal: AbortSignal`). Same reasoning. Open question.
- **Replacing the 25ms poll with a long-blocking reserve.** That's `ARCHITECTURE.md` §9's "known throughput ceiling", a separate change.
- A dead-letter path for stall-reclaimed jobs (poison jobs that crash their worker every time). Open question.

---

# Detailed design

## 1. Capacity-gated reservation

The worker loop tracks one extra counter and gates `reserve()` on total capacity:

```ts
// proposed — startWorkerLoop()
const totalConcurrency = [...jobs.values()].reduce(
  (sum, entry) => sum + entry.options.concurrency,
  0
);
let inFlightTotal = 0; // incremented in dispatch(), decremented in its finally
let reservesPending = 0; // reserve() calls issued but not yet resolved

function hasReserveCapacity(): boolean {
  return (
    inFlightTotal + readyBuffer.length + reservesPending < totalConcurrency
  );
}

async function tick(): Promise<void> {
  if (stopped) return;
  drainBuffer();

  if (!hasReserveCapacity()) return;

  reservesPending++;
  let stored: StoredJob | null;
  try {
    stored = await adapter.reserve(queueName, stallTimeout);
  } finally {
    reservesPending--;
  }
  if (!stored) return;

  if (hasCapacity(stored.name)) {
    dispatch(stored);
  } else {
    readyBuffer.push(stored);
  }
}
```

What this guarantees:

- **Single job name** (the common case, and Hiraiship's build queue): `totalConcurrency === concurrency`, so a reserve happens only when a slot is free and the reserved job always dispatches straight away. `readyBuffer` stays empty.
- **Several job names:** the buffer can hold at most `totalConcurrency - inFlightTotal` jobs, instead of the whole queue. A job is buffered only when its own name is full while another name has room. That's the unavoidable cost of a queue-wide `reserve()`.
- **Horizontal scaling works:** a worker at capacity stops calling `reserve()`, so other workers on the same adapter get the rest of `waiting`.
- **Overlapping ticks** can't happen any more (the single-in-flight guard, see Motivation). The capacity check still counts the one pending reserve as `reservesPending`.

The zero-handler case (RFC-0016's dead-letter-on-no-handler path) stays as it is: `totalConcurrency === 0` means a queue with no handlers never reserves anything. That also makes the RFC-0016 footgun impossible in a process where this RFC is applied. RFC-0016's explicit `worker = false` is still worth having, since it states the intent and skips the timers.

`drainBuffer()` still runs first on every tick, so a slot freed by a finished job goes to a buffered job before a new reservation.

## 2. Lease renewal

### Adapter contract: one new optional method

```ts
// proposed — src/types.ts
export interface QueueAdapter {
  // ...all existing methods unchanged...

  /**
   * Push the stall deadline of each still-active reservation in `ids`
   * to `now + stallTimeout`. An id that is no longer active (completed,
   * failed, or already reclaimed by the sweeper) is skipped, not
   * re-activated. Resolves with the ids that were actually extended.
   *
   * Optional: an adapter without it keeps pre-RFC-0017 semantics, where
   * `stallTimeout` bounds a job's total reserved lifetime.
   */
  extend?(
    queue: string,
    ids: string[],
    stallTimeout: number
  ): Promise<string[]>;
}
```

It's batched (one call per queue per heartbeat, not one per job) so that Redis cost stays one round trip regardless of concurrency.

### `RedisQueueAdapter.extend()`

One script. It only updates ids already in `active:deadline`, so a reservation that was completed, failed or reclaimed since the heartbeat started is never brought back:

```lua
-- EXTEND_SCRIPT
-- KEYS[1] = active:deadline   ARGV[1] = deadline   ARGV[2..n] = ids
local deadline = tonumber(ARGV[1])
local extended = {}
for i = 2, #ARGV do
  if redis.call('ZSCORE', KEYS[1], ARGV[i]) then
    redis.call('ZADD', KEYS[1], deadline, ARGV[i])
    extended[#extended + 1] = ARGV[i]
  end
end
return extended
```

The deadline is computed on the worker (`Date.now() + stallTimeout`), the same way `reserve()` computes it for `STAMP_DEADLINE_SCRIPT` today, so clock handling doesn't change.

`RedisLike` needs nothing new, since it's still `eval`.

### `MemoryQueueAdapter.extend()`

For each id still in `state.active`, set `reservedAt = Date.now() + stallTimeout`.

### Worker loop: the heartbeat

```ts
// proposed — startWorkerLoop()
const held = new Set<string>(); // ids reserved by this loop and not yet completed/failed

// added to held on successful reserve(); removed after complete()/fail() settles in runJob()

const heartbeat = adapter.extend
  ? setInterval(
      () => void renewLeases(),
      Math.max(1_000, Math.floor(stallTimeout / 3))
    )
  : undefined;

async function renewLeases(): Promise<void> {
  if (held.size === 0) return;
  const ids = [...held];
  try {
    const extended = new Set(
      await adapter.extend!(queueName, ids, stallTimeout)
    );
    for (const id of ids) {
      if (!extended.has(id) && held.has(id)) {
        console.warn(
          `[rasengan-queue] Queue "${queueName}" lost its lease on job "${id}" ` +
            `(reclaimed by the sweeper) — it may run again elsewhere.`
        );
        held.delete(id); // stop renewing it; the handler, if running, finishes normally
      }
    }
  } catch {
    // Transient adapter error: skip this beat. Two more remain before the deadline.
  }
}
```

- A renewal interval of `stallTimeout / 3` means two heartbeats can fail in a row before a live worker's job is reclaimed.
- Buffered jobs are renewed as well as running ones. After §1 the buffer is small, but it still exists for multi-name queues.
- A buffered job whose lease was lost gets **removed from `readyBuffer`** and not dispatched: the sweeper has already handed it to someone else. This is the one case where the worker loop knowingly drops a reservation, and it's what stops the duplicate at t=15 min in the example above.
- `onDestroy` clears the heartbeat timer after `await Promise.all(inFlight)`, not before. A job still draining during shutdown keeps its lease until it acks.

### What `stallTimeout` means now

With `extend()` present, `stallTimeout` is **the time a dead worker's reservation stays stuck before reclaim**, detected within `stallTimeout + sweepInterval`. The default stays at 30s and now suits both sides. Hiraiship's build runner can drop its 15-minute override and recover from a runner crash in ~35s instead of ~15 min.

Without `extend()` (a third-party adapter that hasn't been updated), the plugin logs once at registration:

```
[rasengan-queue] Adapter does not implement extend() — stallTimeout bounds each job's total reserved lifetime (pre-RFC-0017 semantics).
```

## 3. FIFO buffer drain

```ts
// proposed — drainBuffer()
function drainBuffer(): void {
  for (let i = 0; i < readyBuffer.length;) {
    const stored = readyBuffer[i];
    if (hasCapacity(stored.name)) {
      readyBuffer.splice(i, 1);
      dispatch(stored);
    } else {
      i++;
    }
  }
}
```

Within one job name, jobs dispatch in reservation order, which (single worker, FIFO `waiting` list) is enqueue order. Across several workers, ordering is still best-effort and the docs should say so. But the "a later job always overtakes an earlier one" pattern RFC-0031 worked around is gone.

## 4. Release on shutdown

### Adapter contract: a second optional method

```ts
// proposed — src/types.ts
export interface QueueAdapter {
  // ...

  /**
   * Put each still-active reservation in `ids` back at the head of
   * `waiting`, in the order given (`ids[0]` is reserved next), with its
   * stall deadline cleared and `attempt` unchanged: these jobs never
   * started. An id that is no longer active (completed, failed, or
   * already reclaimed) is skipped. Resolves with the ids released.
   *
   * Optional: without it, a stopped worker's unstarted reservations
   * wait for the sweeper, as before RFC-0017.
   */
  release?(queue: string, ids: string[]): Promise<string[]>;
}
```

### `RedisQueueAdapter.release()`

One script, guarded by the deadline zset like `EXTEND_SCRIPT`: a reservation the sweeper already reclaimed (no longer in `active:deadline`) is not pushed a second time. It walks the ids backwards and `LPUSH`es, so `ids[0]` ends at the head, where `reserve()`'s `BLMOVE … LEFT` takes it next.

```lua
-- RELEASE_SCRIPT
-- KEYS[1] = active   KEYS[2] = active:deadline   KEYS[3] = waiting
-- ARGV = ids, in reservation order
local released = {}
for i = #ARGV, 1, -1 do
  local id = ARGV[i]
  if redis.call('ZSCORE', KEYS[2], id) then
    redis.call('ZREM', KEYS[2], id)
    redis.call('LREM', KEYS[1], 1, id)
    redis.call('LPUSH', KEYS[3], id)
    table.insert(released, 1, id)
  end
end
return released
```

`attempt` lives in the `jobs` hash and isn't touched. An empty `ids` makes no round trip.

### `MemoryQueueAdapter.release()`

Walking `ids` backwards: for each id still in `state.active`, delete it, clear `reservedAt`, and `unshift` it onto `state.waiting`.

### Worker loop: `onDestroy`

```ts
// proposed — startWorkerLoop()
let pendingReserve: Promise<StoredJob | null> | null = null; // set by tick() around adapter.reserve()

app.onDestroy(async () => {
  stopped = true;
  clearInterval(timer);

  // 1. A reserve() in flight may still hand us a job (one BLMOVE block, 20ms by default).
  const late = await pendingReserve?.catch(() => null);

  // 2. Everything reserved and never started goes back, oldest first.
  const unstarted = [...readyBuffer, ...(late ? [late] : [])];
  readyBuffer.length = 0;
  if (unstarted.length > 0) {
    for (const stored of unstarted) held.delete(stored.id); // stop renewing them
    if (adapter.release) {
      try {
        await adapter.release(
          queueName,
          unstarted.map((stored) => stored.id)
        );
      } catch (error) {
        logAdapterError('release', error); // §5; the sweeper reclaims them after stallTimeout
      }
    }
  }

  // 3. Then wait for the running ones, which keep their lease (§2) until they ack.
  await Promise.all(inFlight);
  clearInterval(heartbeat);
});
```

- `tick()` checks `stopped` after its `reserve()` resolves and doesn't dispatch a job reserved after the stop: `onDestroy` releases it instead. Today that job runs, inside a process that is shutting down.
- Releasing comes **before** waiting for in-flight jobs, so other workers get the work within one poll while this process drains, not after it.
- A reserve that rejects (the app closed the blocking connection first) is caught (§5). If Redis had already moved the job but its reply was lost, the job sits in `active` with no deadline, and `RECLAIM_STALLED_SCRIPT`'s self-heal reclaims it on the next sweep. That path is rare, and it costs one `attempt`, which is the price of not knowing.
- Jobs still running when the process is killed (its own drain timeout passed) are not released: they did start, so the sweeper's reclaim with `attempt++` is the right outcome.
- After §1, `unstarted` is small: at most `Σ concurrency` minus the running jobs, plus the late reserve.

Without `release()`, the plugin logs once at registration, next to the `extend()` warning:

```
[rasengan-queue] Adapter does not implement release() — a stopped worker's unstarted jobs wait stallTimeout for the sweeper (pre-RFC-0017 semantics).
```

## 5. Reserve and ack failures

Every adapter call the worker loop and the sweeper make gets a handler. None changes what the queue does with a job; they only keep an adapter error from becoming an unhandled rejection or a false retry.

- **`tick()`:** `reserve()` in `try/catch/finally`. A failure is logged (below) and the tick returns; the next one retries. Not logged at all once `stopped` is set: at shutdown, a closed connection is expected.
- **`runJob()`:** the handler and the ack get separate `try` blocks.

  ```ts
  // proposed — runJob()
  let handlerError: unknown = null;
  try {
    await entry.handler(job);
  } catch (error) {
    handlerError = error ?? new Error('handler failed');
  }
  try {
    if (handlerError === null) await adapter.complete(queueName, stored.id);
    else await adapter.fail(queueName, stored.id, retryOptions(stored, entry));
  } catch (error) {
    // The job stays active: stop renewing it (§2) so the sweeper reclaims it after stallTimeout.
    held.delete(stored.id);
    logAdapterError(handlerError === null ? 'complete' : 'fail', error);
  }
  ```

  A `complete()` that fails no longer schedules a retry of a job that succeeded. The job runs again only if the sweeper reclaims it, which is the at-least-once guarantee the package already documents, not a new duplicate path.

- **`dispatch()`:** the dead-letter `adapter.fail()` for a job with no handler gets a `.catch(logAdapterError)`.
- **The sweeper:** already catches per queue (`a1abf01`); it moves to the same logger.
- **`renewLeases()`:** already skips a failed beat (§2); it logs through the same logger.

`logAdapterError(operation, error)` logs the first failure of each operation, then at most one line every 10 seconds per queue with a count of what it suppressed, then one line when a call of that operation succeeds again. With Redis down, `reserve()` fails 40 times a second per queue; logging each one would bury everything else.

## Documentation updates

- `ARCHITECTURE.md` §7: rewrite the worker-loop pseudocode. Drop the "no other worker can double-dispatch it" claim, or qualify it with "while its lease is renewed".
- `ARCHITECTURE.md` §7: the shutdown sequence (§4) replaces the "the sweeper reclaims it" comment on `onDestroy`; the error handling of §5.
- `ARCHITECTURE.md` §9: document `EXTEND_SCRIPT` and `RELEASE_SCRIPT`.
- `ARCHITECTURE.md` §10: new "RFC-0017" subsection. Restate that stall-reclaim still ignores `attempts`.
- `README.md`: `stallTimeout`'s description; a "Scaling out" note (run more worker processes; per-name `concurrency` is per process); a "Graceful shutdown" note (close the adapter's clients after `app.close()`, not before, so `release()` can run).
- `CHANGELOG.md`: behavior change entry (see below).

---

# Trade-offs

- **Less prefetch.** A worker at capacity no longer reserves ahead, so a freed slot waits up to one tick (25ms) plus a reserve round trip for its next job. With the existing fixed 25ms poll, that's noise. It's a real cost only for very high-throughput tiny jobs, which the 25ms tick already limits more than this does.
- **Head-of-line blocking across job names is bounded, not gone.** With `record` (1) and `log` (1) on one queue, a buffered second `record` fills the only spare slot, so `log` jobs wait until a `record` finishes. Before, `log` would still have been reserved, but it could just as well have been buffered behind the unbounded pile. The recommended pattern for job names with very different latencies is separate queues, and the README should say that.
- **One more periodic Redis call** per worker per queue (`extend`, every `stallTimeout / 3` = 10s by default, only while something is held). Negligible next to the 40 reserve calls per second the poll loop already makes.
- **Two timers in the worker loop** instead of one. Same lifecycle discipline (`register()` start, `app.onDestroy()` stop) as the existing tick and sweeper.
- **Shutdown waits for the pending reserve** before releasing: one `BLMOVE` block, 20ms by default, plus one `RELEASE_SCRIPT` round trip per queue. Negligible next to draining in-flight handlers.
- **Released jobs go back ahead of newer ones.** They return to the head of `waiting`, before anything enqueued since. That's their original place, since they were reserved first. Ordering across workers stays best-effort, as in §3.

---

# Alternatives considered

**Stamp the stall deadline at dispatch instead of at reservation** (buffered jobs get "no deadline yet"). This fixes the buffered-job case but not a long-running handler, so `stallTimeout` would still have to be larger than the longest job. It also needs a new adapter method (`startLease`) anyway. Lease renewal is the same amount of new interface and solves both cases.

**Hard cap on `readyBuffer` length** (e.g. `maxBuffered` option) instead of gating on total concurrency. A fixed number either over-reserves (and needs the heartbeat anyway) or starves multi-name queues. `Σ concurrency` is the natural bound: it's the most this process could possibly run at once.

**Keep the unbounded buffer, fix duplicates with fencing tokens only.** Correctness improves (a stale ack can't complete someone else's reservation), but horizontal scaling stays broken and reclaim still races every backlog. Fencing is worth adding later as a second layer. It doesn't replace this.

**Release by letting the sweeper do it sooner** (zero the deadline of unstarted jobs on shutdown, then let any sweeper reclaim them). Needs no new adapter method, but reclaim increments `attempt`, appends to the tail of `waiting`, and waits for the next sweep anywhere. `release()` keeps `attempt`, keeps the jobs' place, and takes effect immediately.

**Catch everything with a process-level `unhandledRejection` handler in the app.** Hides the symptom and every other unhandled rejection with it, and still retries a job whose `complete()` failed. The errors belong to the loop, which knows what each call was for.

**Recommend BullMQ behind `QueueAdapter` for production.** RFC-0004 keeps that door open, but the loop that causes these problems is in `plugin.ts`, above any adapter, so a BullMQ adapter behind the same loop would have exactly the same buffering and ordering behavior.

---

# Breaking change and migration

No type-level break: `extend` and `release` are optional and nothing else in the public API changes. Behavior does change, and that goes in the changelog:

- A worker no longer reserves more than its total concurrency. Code that relied on one process hoarding a queue (for example to get global serialization with `concurrency: 1` across several processes) was never guaranteed that. It now gets per-process concurrency, which is what the option always documented.
- With a built-in adapter, `stallTimeout` stops bounding job duration. Apps that raised it to cover long jobs can lower it back to the default for faster crash recovery. Leaving it high is still correct, just slower to recover.
- Custom adapters: implement `extend()` to get lease renewal and `release()` to get release on shutdown. Until then, behavior is unchanged except for §1, §3 and §5.
- A job reserved after `app.close()` started is no longer run by the closing process: it's released (or, without `release()`, left to the sweeper).
- Apps that close the adapter's Redis clients themselves must do it after `app.close()` resolves, or `release()` fails (logged; the sweeper then reclaims the jobs as before).
- Downstream patches that add a `catch` around `reserve()` or a `stopped` check after it (Hiraiship's `patches/@rasenganjs__queue@1.0.0-beta.1.patch`) become redundant and should be dropped on upgrade.

---

# Testing

Unit tests stay adapter-level. Integration tests use `MemoryQueueAdapter` and real timers, like `integration.test.ts` today.

**Capacity gating** (`integration.test.ts`)

- Single-name queue, `concurrency: 1`, 5 jobs enqueued, handler blocked on a deferred: after 100ms, the adapter's `active` holds exactly 1 id and `waiting` holds 4.
- Two `ServerApp`s on one shared `MemoryQueueAdapter`, same queue, `concurrency: 1` each, 2 slow jobs: both apps process one job each. Today one app takes both.
- Spy on `adapter.reserve` with an artificially slow resolution (> 25ms): the number of concurrent pending calls never exceeds `totalConcurrency`.
- Zero-handler queue with `worker: true`: `reserve` is never called (the RFC-0016 scenario can't dead-letter anymore).

**Lease renewal**

- `stallTimeout: 300`, `sweepInterval: 50`, handler runs 1s: the handler runs exactly once, and `attempt` is still 1 when it completes.
- Same, but the adapter's `extend` is deleted (simulating a legacy adapter): the job is reclaimed and runs twice, matching the pre-RFC behavior, and the one-time warning is logged.
- A buffered job whose id `extend()` doesn't return is removed from `readyBuffer` and never dispatched by this worker.
- `app.close()` during a long handler: the heartbeat keeps running until the handler settles.

**Release on shutdown**

- Two job names on one queue, `a` at `concurrency: 1` blocked on a deferred, three `a` jobs enqueued: `app.close()` puts the buffered one back in `waiting` before the running one finishes, with `attempt` still 1, and a second app on the same adapter runs it immediately.
- A `reserve()` that resolves after `app.close()` began: its job isn't dispatched by the closing app, and is back at the head of `waiting`.
- Release order: three unstarted jobs come back so that a new worker reserves them in their original order.
- An id already reclaimed by the sweeper between the stop and the release isn't pushed twice (`waiting` holds it once).
- Adapter without `release()`: jobs stay `active` until the sweeper, as before, and the one-time warning is logged.

**Adapter failures**

- `reserve()` rejecting on every call for 1s: no unhandled rejection (a `process.on('unhandledRejection')` spy stays silent), one log line, then one suppressed-count line; one "recovered" line once it resolves again.
- `reserve()` rejecting after `app.close()`: nothing logged.
- `complete()` rejecting after a successful handler: no `fail()` call, the job isn't rescheduled, and it's no longer renewed (so the sweeper reclaims it).
- `fail()` rejecting: no unhandled rejection.
- No handler for a job, and the dead-letter `fail()` rejects: no unhandled rejection.

**FIFO**

- Two job names; `a` at `concurrency: 1` is blocked; enqueue `a1..a3`; release them one at a time: they dispatch in order `a1, a2, a3` (today `a1, a3, a2`).

**`RedisQueueAdapter`** (`redis-adapter.test.ts`, orchestration-grain like the rest of that file)

- `extend()` evals `EXTEND_SCRIPT` with `KEYS = [active:deadline]` and `ARGV = [deadline, ...ids]`, and returns the parsed array.
- `extend()` with an empty id list makes no round trip.
- `release()` evals `RELEASE_SCRIPT` with `KEYS = [active, active:deadline, waiting]` and `ARGV = ids`, returns the parsed array, and makes no round trip for an empty list.
- Keep the live-Redis `it.todo`, and add ones for "an extended reservation survives `RECLAIM_STALLED_SCRIPT`" and "a released job is reserved next, with its `attempt` unchanged".

**Regression scenarios:**

- The worked example from Motivation, scaled down (`stallTimeout: 200`, three 150ms jobs, two apps). Each job runs exactly once, in enqueue order, split across both apps.
- The rolling deploy from Motivation: two apps, a `log`-like name at `concurrency: 1` with a backlog of slow jobs, the first app closed mid-backlog. Every job completes once, none with `attempt` above 1, and the released ones start on the second app within a few poll intervals of the close, not after `stallTimeout`.
- Downstream, Hiraiship reruns its RFC-0063 live test with the upgraded package and no patch: all 150 lines reach the live view before the build is reported finished.

---

# Open questions

- **Fencing.** Should `reserve()` return a lease token (for example a random value stored next to the deadline) that `complete()`/`fail()`/`extend()` must present? That closes the last duplicate window (a partition longer than `stallTimeout`) and stops a stale worker from deleting a job another worker is running. It changes the signatures of three required adapter methods, so it's probably its own RFC.
- **`job.signal`.** Once a heartbeat detects a lost lease, the loop knows a running handler's work is now duplicated. Exposing an `AbortSignal` on `Job` would let a handler (such as a build) stop early. Cheap to add after this RFC. Is it wanted?
- **Poison jobs.** A job that crashes its worker every time is still reclaimed forever, since stall-reclaim ignores `attempts`. With leases, "reclaimed" really does mean "its worker died", so counting reclaims against `attempts` becomes reasonable. That needs the sweeper to know each job name's `attempts`, which it currently doesn't.
- **The `reserve()` → stamp window.** `RECLAIM_STALLED_SCRIPT`'s self-heal scan picks up any `active` id without a deadline, which includes a job that was just moved by `BLMOVE` and whose `STAMP_DEADLINE_SCRIPT` hasn't run yet. Under load that's a real (if narrow) duplicate path. Maybe the self-heal should only take ids with no deadline that were already seen on the _previous_ sweep pass. Small enough to fold into this RFC's implementation if reviewers agree.
- **One blocking connection per queue.** `RedisQueueAdapter` takes a single `blockingClient`, so every queue's `BLMOVE` waits its turn on it. With the single-in-flight guard that costs latency, not memory. The adapter could `duplicate()` one blocking connection per queue on first `reserve()`, at the price of one Redis connection per queue per process. Opt-in option, or the new default?
