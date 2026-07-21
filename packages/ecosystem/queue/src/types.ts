/**
 * @module Types — Job, adapter, and handler contracts
 *
 * Design note on `QueueAdapter`: `reserve()` is deliberately queue-wide,
 * not scoped to a single job name — this mirrors `GatewayAdapter`'s
 * "deliberately minimal" philosophy (no priorities, no rate limiting) and
 * keeps the contract something a Redis-backed adapter (Phase 3) can also
 * satisfy with one `BLMOVE`. Per-job-name `concurrency` is therefore
 * enforced by the worker loop *above* the adapter, not by the adapter
 * itself — see `plugin.ts`.
 *
 * `sweep()` is part of the contract from Phase 1 onward even though
 * nothing calls it yet (`MemoryQueueAdapter.sweep()` is a documented
 * no-op): widening the interface later, once Phase 2 adds delayed/repeat
 * jobs and stalled-job reclaim, would be a breaking change for anyone who
 * implemented a custom adapter against a narrower Phase-1 shape.
 */

/**
 * A job as stored by a `QueueAdapter` — includes bookkeeping fields
 * (`attempt`, `reservedAt`) a handler never needs to see directly.
 */
export interface StoredJob {
  id: string;
  name: string;
  data: unknown;
  /** 1-based. Incremented on each retry. */
  attempt: number;
  enqueuedAt: number;
  /**
   * Set when a job is reserved. Bookkeeping only in Phase 1 — nothing
   * reads it yet, since stalled-job reclaim is a Phase 2 addition.
   */
  reservedAt?: number;
}

/** The handler-facing view of a job — drops adapter-only bookkeeping. */
export type Job<T = unknown> = Omit<StoredJob, 'reservedAt' | 'data'> & {
  data: T;
};

/** A handler for one named job, registered via `JobRouter.process()`. */
export type JobHandler<T = unknown> = (job: Job<T>) => void | Promise<void>;

/**
 * Options for `JobRouter.process()`. All optional — Phase 1 defaults are
 * `attempts: 1` (no retry), `backoff: 0` (retry immediately), and
 * `concurrency: 1` (one in-flight handler call at a time for this name).
 */
export interface ProcessOptions {
  /** Total attempts before a job moves to the dead-letter list. */
  attempts?: number;
  /** Base retry delay in ms — doubles per attempt (exponential backoff). */
  backoff?: number;
  /** Max in-flight handler calls for this job name, per worker. */
  concurrency?: number;
}

/**
 * Pluggable job storage a `Queue` producer/consumer goes through.
 * `MemoryQueueAdapter` (Phase 1) is the only implementation today;
 * `RedisQueueAdapter` (Phase 3) will satisfy the same contract.
 */
export interface QueueAdapter {
  add(queue: string, job: StoredJob): Promise<void>;
  /** Reserve the next ready job, if any. Queue-wide — see module doc. */
  reserve(queue: string, stallTimeout: number): Promise<StoredJob | null>;
  complete(queue: string, id: string): Promise<void>;
  /**
   * Re-schedule with a delay (`retryAt` present) or move straight to the
   * dead-letter list (`retryAt` omitted — attempts exhausted, or no
   * handler was registered for the job's name).
   */
  fail(queue: string, id: string, opts: { retryAt?: number }): Promise<void>;
  /**
   * Housekeeping tick: promote due delayed/repeat jobs, reclaim stalled
   * ones. Phase 1 has neither, so every Phase-1 adapter no-ops this.
   */
  sweep(queue: string, now: number): Promise<void>;
  getDead(queue: string): Promise<StoredJob[]>;
  /** Move a dead-lettered job back to waiting, with `attempt` reset to 1. */
  retryDead(queue: string, id: string): Promise<void>;
}

/** A `Queue` subclass constructor, as passed to `defineModule({ queues })`. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueueClass = new (...args: any[]) => import('./queue.js').Queue;
