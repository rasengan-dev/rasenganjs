import type { QueueAdapter, StoredJob } from '../types.js';

interface RepeatDescriptor {
  jobKey: string;
  name: string;
  data: unknown;
  every: number;
  nextRunAt: number;
}

interface QueueState {
  waiting: StoredJob[];
  /** Phase 2: `{ delay }` jobs not yet due — promoted by `sweep()`. */
  delayed: StoredJob[];
  active: Map<string, StoredJob>;
  dead: StoredJob[];
  /** Phase 2: recurring-job registrations, keyed by `jobKey`. */
  repeats: Map<string, RepeatDescriptor>;
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
      state = {
        waiting: [],
        delayed: [],
        active: new Map(),
        dead: [],
        repeats: new Map(),
      };
      this.queues.set(queue, state);
    }
    return state;
  }

  async add(queue: string, job: StoredJob): Promise<void> {
    const state = this.state(queue);

    if (job.repeat) {
      // Idempotent by jobKey — a second registration with the same key
      // (e.g. re-running `.add()` with a repeat spec on every boot) is
      // a no-op, not a second recurring schedule.
      if (state.repeats.has(job.repeat.jobKey)) return;
      state.repeats.set(job.repeat.jobKey, {
        jobKey: job.repeat.jobKey,
        name: job.name,
        data: job.data,
        every: job.repeat.every,
        nextRunAt: Date.now() + job.repeat.every,
      });
      return;
    }

    if (job.readyAt !== undefined && job.readyAt > Date.now()) {
      state.delayed.push(job);
      return;
    }

    state.waiting.push(job);
  }

  async reserve(
    queue: string,
    stallTimeout: number
  ): Promise<StoredJob | null> {
    const state = this.state(queue);
    const job = state.waiting.shift();
    if (!job) return null;

    // Stall deadline (Phase 2), not a reservation instant — sweep()
    // reclaims this job if nothing calls complete()/fail() by then.
    job.reservedAt = Date.now() + stallTimeout;
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
    // producer-facing `{ delay }` (a separate `delayed`/`sweep()` path
    // below). Kept on its own timer rather than folded into `delayed`:
    // this adapter already discards everything on restart regardless,
    // so unifying them would cost real complexity for no durability
    // gain at this layer — a persisted adapter (Phase 3) is free to
    // unify the two under one durable mechanism internally.
    const delay = Math.max(0, opts.retryAt - Date.now());
    setTimeout(() => {
      state.waiting.push(job);
    }, delay);
  }

  async sweep(queue: string, now: number): Promise<void> {
    const state = this.state(queue);

    // 1. Promote due delayed jobs into waiting.
    for (let i = state.delayed.length - 1; i >= 0; i--) {
      if ((state.delayed[i].readyAt ?? 0) <= now) {
        const [job] = state.delayed.splice(i, 1);
        state.waiting.push(job);
      }
    }

    // 2. Spawn due repeat-job instances, and reschedule (fixed cadence
    // — advance by `every` rather than `now + every`, so a late sweep
    // tick doesn't push the whole schedule back).
    for (const descriptor of state.repeats.values()) {
      if (descriptor.nextRunAt <= now) {
        state.waiting.push({
          id: crypto.randomUUID(),
          name: descriptor.name,
          data: descriptor.data,
          attempt: 1,
          enqueuedAt: now,
          repeat: { every: descriptor.every, jobKey: descriptor.jobKey },
        });
        // Jump straight to the next tick strictly after `now` instead
        // of advancing by a single `every` — a large gap since the
        // last sweep (process downtime with a persisted adapter, or a
        // long pause) would otherwise re-fire on every subsequent
        // sweep tick until the schedule catches up, replaying every
        // missed occurrence as a burst instead of just resuming.
        const periods =
          Math.floor((now - descriptor.nextRunAt) / descriptor.every) + 1;
        descriptor.nextRunAt += periods * descriptor.every;
      }
    }

    // 3. Reclaim active jobs whose stall deadline has passed — the
    // worker that reserved them is presumed dead. No `attempts` check
    // here: stalls are an infrastructure signal, not an
    // application-level failure the retry policy governs (matches the
    // RFC's lifecycle diagram, which has no stalled-to-dead path).
    for (const [id, job] of state.active) {
      if (job.reservedAt !== undefined && job.reservedAt <= now) {
        state.active.delete(id);
        job.attempt++;
        job.reservedAt = undefined;
        state.waiting.push(job);
      }
    }
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
