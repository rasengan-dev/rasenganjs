import type { QueueAdapter, StoredJob } from '../types.js';
import {
  ADD_REPEAT_SCRIPT,
  ADD_DELAYED_SCRIPT,
  ADD_IMMEDIATE_SCRIPT,
  STAMP_DEADLINE_SCRIPT,
  COMPLETE_SCRIPT,
  FAIL_SCRIPT,
  PROMOTE_DELAYED_SCRIPT,
  SPAWN_REPEAT_SCRIPT,
  RECLAIM_STALLED_SCRIPT,
  RETRY_DEAD_SCRIPT,
} from './redis-scripts.js';

/**
 * Structural interface over the ~4 Redis commands `RedisQueueAdapter`
 * actually needs at the JS level. Every mutating operation runs as a
 * Lua script for atomicity (see `redis-scripts.ts`), so commands like
 * `zadd`/`hset`/`hget`/`hdel`/`lrem`/`zrem`/`zrangebyscore` are only
 * ever called *inside* those scripts via `redis.call(...)` — never as
 * direct JS-level bindings. A real `ioredis.Redis` (or Bun's
 * `Bun.redis`, where it implements the same command surface) satisfies
 * this structurally, with zero adapter-specific glue — no `import type
 * { Redis } from 'ioredis'` anywhere in this file, deliberately: the
 * portability goal here (any Redis-command-compatible client on any
 * runtime) is broader than `@rasenganjs/ws`'s Node/ioredis-only
 * `RedisGatewayAdapter` needed to solve.
 */
export interface RedisLike {
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

export interface RedisQueueAdapterOptions {
  /** Client used for every `EVAL` call, plus `getDead()`'s `lrange`/`hmget`. */
  client: RedisLike;
  /**
   * A *separate* client used only for `BLMOVE` inside `reserve()` — kept
   * apart so a blocking call in flight never makes an unrelated `eval()`
   * (another queue's sweep, a producer's `add()`) wait behind it.
   */
  blockingClient: RedisLike;
  /**
   * `BLMOVE` timeout, in seconds. Must stay short — `plugin.ts`'s worker
   * loop is a fixed 25ms poll tick, unmodified by this adapter; a long
   * block would let queued `BLMOVE` calls pile up on the blocking
   * connection faster than they drain. Default `0.02` (20ms). Never
   * pass `0` — that blocks forever.
   */
  blockTimeoutSeconds?: number;
  /**
   * Cap on delayed/repeat/stalled entries processed per `sweep()` pass —
   * bounds single-threaded Lua script runtime under a thundering herd of
   * simultaneously-due jobs. Default `1000`.
   */
  sweepBatchSize?: number;
  /** Redis key prefix. Default `'queue:'`. */
  keyPrefix?: string;
}

const DEFAULT_BLOCK_TIMEOUT_SECONDS = 0.02;
const DEFAULT_SWEEP_BATCH_SIZE = 1000;
const DEFAULT_KEY_PREFIX = 'queue:';

/**
 * Per-queue Redis key layout. The `jobs` hash is the single source of
 * truth for a `StoredJob`'s content; every list/zset below stores only
 * an id (or `jobKey`, for repeat descriptors) as a pointer into it.
 * `reservedAt` is never persisted in the hash — it's a stall deadline,
 * held only in `activeDeadline`, read back and attached to the object
 * `reserve()` returns.
 */
function keysFor(prefix: string, queue: string) {
  const base = `${prefix}${queue}:`;
  return {
    waiting: `${base}waiting`,
    active: `${base}active`,
    activeDeadline: `${base}active:deadline`,
    delayed: `${base}delayed`,
    repeats: `${base}repeats`,
    repeatsSchedule: `${base}repeats:schedule`,
    dead: `${base}dead`,
    jobs: `${base}jobs`,
  };
}

/**
 * Production `QueueAdapter` backed by Redis. Every state transition
 * (`add`/`complete`/`fail`/`sweep`) is a single Lua script, so it's
 * atomic even across multiple processes sharing the same queue.
 *
 * Retry-backoff (`fail({ retryAt })`) and producer-facing delayed jobs
 * (`add(..., { delay })`) share one `delayed` zset here — unlike
 * `MemoryQueueAdapter`, which keeps them on two mechanisms because a
 * bare `setTimeout` was available and the adapter already discards
 * everything on restart regardless. Neither premise applies to Redis:
 * there is no `setTimeout`-equivalent here, so retry-backoff must be a
 * durable, polled structure regardless of the unification question —
 * once both are the same shape, two zsets would buy nothing.
 */
export class RedisQueueAdapter implements QueueAdapter {
  private client: RedisLike;
  private blockingClient: RedisLike;
  private blockTimeoutSeconds: number;
  private sweepBatchSize: number;
  private keyPrefix: string;

  constructor(options: RedisQueueAdapterOptions) {
    this.client = options.client;
    this.blockingClient = options.blockingClient;
    this.blockTimeoutSeconds =
      options.blockTimeoutSeconds ?? DEFAULT_BLOCK_TIMEOUT_SECONDS;
    this.sweepBatchSize = options.sweepBatchSize ?? DEFAULT_SWEEP_BATCH_SIZE;
    this.keyPrefix = options.keyPrefix ?? DEFAULT_KEY_PREFIX;
  }

  private keys(queue: string) {
    return keysFor(this.keyPrefix, queue);
  }

  async add(queue: string, job: StoredJob): Promise<void> {
    const k = this.keys(queue);

    if (job.repeat) {
      const descriptorJSON = JSON.stringify({
        name: job.name,
        data: job.data,
        every: job.repeat.every,
      });
      await this.client.eval(
        ADD_REPEAT_SCRIPT,
        2,
        k.repeats,
        k.repeatsSchedule,
        job.repeat.jobKey,
        job.repeat.every,
        Date.now(),
        descriptorJSON
      );
      return;
    }

    const jobJSON = JSON.stringify(job);

    if (job.readyAt !== undefined && job.readyAt > Date.now()) {
      await this.client.eval(
        ADD_DELAYED_SCRIPT,
        2,
        k.jobs,
        k.delayed,
        job.id,
        jobJSON,
        job.readyAt
      );
      return;
    }

    await this.client.eval(
      ADD_IMMEDIATE_SCRIPT,
      2,
      k.jobs,
      k.waiting,
      job.id,
      jobJSON
    );
  }

  async reserve(
    queue: string,
    stallTimeout: number
  ): Promise<StoredJob | null> {
    const k = this.keys(queue);

    // Redis disallows blocking commands inside EVAL, so the deadline
    // stamp genuinely can't be fused into one atomic unit with the
    // move — see RECLAIM_STALLED_SCRIPT's self-heal for the crash
    // window this opens.
    const id = await this.blockingClient.blmove(
      k.waiting,
      k.active,
      'LEFT',
      'RIGHT',
      this.blockTimeoutSeconds
    );
    if (!id) return null;

    const deadline = Date.now() + stallTimeout;
    const raw = await this.client.eval(
      STAMP_DEADLINE_SCRIPT,
      3,
      k.activeDeadline,
      k.jobs,
      k.active,
      id,
      deadline
    );
    if (!raw) return null;

    const job = JSON.parse(raw as string) as StoredJob;
    job.reservedAt = deadline;
    return job;
  }

  async complete(queue: string, id: string): Promise<void> {
    const k = this.keys(queue);
    await this.client.eval(
      COMPLETE_SCRIPT,
      3,
      k.active,
      k.activeDeadline,
      k.jobs,
      id
    );
  }

  async fail(
    queue: string,
    id: string,
    opts: { retryAt?: number }
  ): Promise<void> {
    const k = this.keys(queue);
    await this.client.eval(
      FAIL_SCRIPT,
      5,
      k.active,
      k.activeDeadline,
      k.jobs,
      k.delayed,
      k.dead,
      id,
      opts.retryAt === undefined ? '' : opts.retryAt
    );
  }

  async sweep(queue: string, now: number): Promise<void> {
    const k = this.keys(queue);

    await this.client.eval(
      PROMOTE_DELAYED_SCRIPT,
      2,
      k.delayed,
      k.waiting,
      now,
      this.sweepBatchSize
    );
    await this.client.eval(
      SPAWN_REPEAT_SCRIPT,
      4,
      k.repeatsSchedule,
      k.repeats,
      k.jobs,
      k.waiting,
      now,
      this.sweepBatchSize
    );
    await this.client.eval(
      RECLAIM_STALLED_SCRIPT,
      4,
      k.activeDeadline,
      k.active,
      k.jobs,
      k.waiting,
      now,
      this.sweepBatchSize
    );
  }

  async getDead(queue: string): Promise<StoredJob[]> {
    const k = this.keys(queue);
    const ids = await this.client.lrange(k.dead, 0, -1);
    if (ids.length === 0) return [];

    const raws = await this.client.hmget(k.jobs, ...ids);
    return raws
      .filter((raw): raw is string => raw !== null)
      .map((raw) => JSON.parse(raw) as StoredJob);
  }

  async retryDead(queue: string, id: string): Promise<void> {
    const k = this.keys(queue);
    await this.client.eval(RETRY_DEAD_SCRIPT, 3, k.dead, k.jobs, k.waiting, id);
  }
}
