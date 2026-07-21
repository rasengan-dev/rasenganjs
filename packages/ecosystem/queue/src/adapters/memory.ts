import type { QueueAdapter, StoredJob } from '../types.js';

interface QueueState {
  waiting: StoredJob[];
  active: Map<string, StoredJob>;
  dead: StoredJob[];
}

/**
 * Default `QueueAdapter` — in-process, timer-based, volatile. Perfect
 * for development and tests. Unlike `@rasenganjs/ws`'s memory adapter
 * (which is production-legitimate for a single-process app), a queue's
 * whole value is surviving the process — **jobs are lost on restart**.
 * Use a persisted adapter (Redis, Phase 3) in production.
 */
export class MemoryQueueAdapter implements QueueAdapter {
  private queues = new Map<string, QueueState>();

  private state(queue: string): QueueState {
    let state = this.queues.get(queue);
    if (!state) {
      state = { waiting: [], active: new Map(), dead: [] };
      this.queues.set(queue, state);
    }
    return state;
  }

  async add(queue: string, job: StoredJob): Promise<void> {
    this.state(queue).waiting.push(job);
  }

  // `stallTimeout` is part of the contract (Phase 2 will use it for
  // stalled-job reclaim) but unused here — Phase 1 has no reclaim.
  async reserve(
    queue: string,
    _stallTimeout: number
  ): Promise<StoredJob | null> {
    const state = this.state(queue);
    const job = state.waiting.shift();
    if (!job) return null;

    job.reservedAt = Date.now();
    state.active.set(job.id, job);
    return job;
  }

  async complete(queue: string, id: string): Promise<void> {
    this.state(queue).active.delete(id);
  }

  async fail(
    queue: string,
    id: string,
    opts: { retryAt?: number }
  ): Promise<void> {
    const state = this.state(queue);
    const job = state.active.get(id);
    if (!job) return;
    state.active.delete(id);

    if (opts.retryAt === undefined) {
      state.dead.push(job);
      return;
    }

    job.attempt++;
    // Timer-based retry (this adapter is documented as such) — internal
    // bookkeeping on a job it already owns, distinct from Phase 2's
    // producer-facing `{ delay }`, which needs the `delayed`/`sweep()`
    // machinery this adapter doesn't implement yet.
    const delay = Math.max(0, opts.retryAt - Date.now());
    setTimeout(() => {
      state.waiting.push(job);
    }, delay);
  }

  async sweep(_queue: string, _now: number): Promise<void> {
    // No-op in Phase 1 — nothing to promote (no delayed/repeat jobs) or
    // reclaim (no stalled-job tracking) yet. Part of the contract from
    // Phase 1 onward so widening it later isn't a breaking change.
  }

  async getDead(queue: string): Promise<StoredJob[]> {
    return [...this.state(queue).dead];
  }

  async retryDead(queue: string, id: string): Promise<void> {
    const state = this.state(queue);
    const index = state.dead.findIndex((job) => job.id === id);
    if (index === -1) return;

    const [job] = state.dead.splice(index, 1);
    job.attempt = 1;
    state.waiting.push(job);
  }
}
