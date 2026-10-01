## Unreleased

- Fix: the worker loop no longer starts a `reserve()` while the previous one is still pending, and the sweeper no longer starts a sweep while the previous one is still running. Before, several queues sharing one `RedisQueueAdapter` piled up `BLMOVE`s on its blocking connection faster than it could serve them, and the process eventually ran out of heap. A failed sweep is now logged instead of surfacing as an unhandled rejection.

## 1.0.0-beta.1 (2026-07-24)

## 1.0.0-beta.0 (2026-07-21)
