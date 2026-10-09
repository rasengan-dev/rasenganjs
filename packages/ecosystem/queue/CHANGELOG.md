## Unreleased

## 1.0.0-beta.2 (2026-10-09)

### Features

- **queue:** capacity-gated reservation, leases, FIFO drain, release on shutdown (RFC-0017) 9e30fce

### Bug Fixes

- **queue:** keep one reserve() in flight per worker loop a1abf01

* Behavior change (RFC-0017): a worker reserves only while it has room to run what it reserves (`inFlight + buffered < Σ concurrency`). One process no longer drains a whole queue into memory, several processes on one adapter share the work, and a queue with no handler never reserves.
* Behavior change (RFC-0017): leases. While a job is buffered or running, the worker renews its stall deadline every `stallTimeout / 3` through the new optional `QueueAdapter.extend()` (implemented by both built-in adapters). A long job is no longer reclaimed and run twice; `stallTimeout` is now how long a dead worker's jobs stay stuck. Apps that raised it to cover long jobs can lower it back.
* Behavior change (RFC-0017): buffered jobs dispatch oldest first.
* Behavior change (RFC-0017): on `app.close()`, a worker puts the jobs it reserved but never started (and one reserved after the close began, which it no longer runs) back at the head of the queue, `attempt` unchanged, through the new optional `QueueAdapter.release()`, before waiting for its running jobs. Before, they waited `stallTimeout` for the sweeper and lost an attempt.
* Fix (RFC-0017): no adapter call made by the worker loop or the sweeper becomes an unhandled rejection. A `reserve()` that fails (Redis down, or the connection closed at shutdown) used to crash the process. A `complete()` that fails after a successful handler no longer reschedules the job as if the handler had failed. Failures are logged once, then at most every 10 s, then once on recovery.
* Custom adapters: implement `extend()` and `release()` to get leases and release on shutdown. Without them the plugin warns once and keeps the previous behavior for each.
* Fix: the worker loop no longer starts a `reserve()` while the previous one is still pending, and the sweeper no longer starts a sweep while the previous one is still running. Before, several queues sharing one `RedisQueueAdapter` piled up `BLMOVE`s on its blocking connection faster than it could serve them, and the process eventually ran out of heap. A failed sweep is now logged instead of surfacing as an unhandled rejection.

## 1.0.0-beta.1 (2026-07-24)

## 1.0.0-beta.0 (2026-07-21)
