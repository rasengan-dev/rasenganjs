import { describe, it, expect, vi } from 'vitest';
import { RedisQueueAdapter } from '../adapters/redis.js';
import type { RedisLike } from '../adapters/redis.js';
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
} from '../adapters/redis-scripts.js';
import type { StoredJob } from '../types.js';

/**
 * A real Lua interpreter is impractical to fake, so these tests assert
 * at the orchestration grain — the right script (compared by identity
 * to the exported constant) with the right KEYS/ARGV — and stub
 * `eval()`'s resolved value directly to drive downstream parsing. Same
 * trade-off `@rasenganjs/ws`'s `redis-adapter.test.ts` makes for
 * `publish`/`subscribe`: no real Redis server anywhere in this suite.
 */
function fakeRedisLike(): RedisLike & {
  eval: ReturnType<typeof vi.fn>;
  blmove: ReturnType<typeof vi.fn>;
  lrange: ReturnType<typeof vi.fn>;
  hmget: ReturnType<typeof vi.fn>;
} {
  return {
    eval: vi.fn(async () => 1),
    blmove: vi.fn(async () => null),
    lrange: vi.fn(async () => []),
    hmget: vi.fn(async () => []),
  };
}

function job(overrides: Partial<StoredJob> = {}): StoredJob {
  return {
    id: 'job-1',
    name: 'welcome',
    data: { userId: '42' },
    attempt: 1,
    enqueuedAt: Date.now(),
    ...overrides,
  };
}

describe('RedisQueueAdapter', () => {
  describe('two-connection discipline', () => {
    it('reserve() calls blmove only on the blocking client, never eval or any method on the primary client', async () => {
      const client = fakeRedisLike();
      const blockingClient = fakeRedisLike();
      const adapter = new RedisQueueAdapter({ client, blockingClient });

      await adapter.reserve('emails', 30_000);

      expect(blockingClient.blmove).toHaveBeenCalledTimes(1);
      expect(client.blmove).not.toHaveBeenCalled();
    });

    it('add()/complete()/fail()/sweep()/getDead()/retryDead() never call blmove, or any method at all, on the blocking client', async () => {
      const client = fakeRedisLike();
      const blockingClient = fakeRedisLike();
      const adapter = new RedisQueueAdapter({ client, blockingClient });

      await adapter.add('emails', job());
      await adapter.complete('emails', 'job-1');
      await adapter.fail('emails', 'job-1', {});
      await adapter.sweep('emails', Date.now());
      await adapter.getDead('emails');
      await adapter.retryDead('emails', 'job-1');

      expect(blockingClient.eval).not.toHaveBeenCalled();
      expect(blockingClient.blmove).not.toHaveBeenCalled();
      expect(blockingClient.lrange).not.toHaveBeenCalled();
      expect(blockingClient.hmget).not.toHaveBeenCalled();
    });
  });

  describe('add()', () => {
    it('immediate job: evals ADD_IMMEDIATE_SCRIPT with [jobsKey, waitingKey] and [id, jobJSON]', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });
      const storedJob = job();

      await adapter.add('emails', storedJob);

      expect(client.eval).toHaveBeenCalledWith(
        ADD_IMMEDIATE_SCRIPT,
        2,
        'queue:emails:jobs',
        'queue:emails:waiting',
        'job-1',
        JSON.stringify(storedJob)
      );
    });

    it('delayed job (readyAt in the future): evals ADD_DELAYED_SCRIPT with readyAt as the numeric score argument', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });
      const readyAt = Date.now() + 10_000;
      const storedJob = job({ readyAt });

      await adapter.add('emails', storedJob);

      expect(client.eval).toHaveBeenCalledWith(
        ADD_DELAYED_SCRIPT,
        2,
        'queue:emails:jobs',
        'queue:emails:delayed',
        'job-1',
        JSON.stringify(storedJob),
        readyAt
      );
    });

    it('job with readyAt in the past behaves like an immediate add', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.add('emails', job({ readyAt: Date.now() - 1000 }));

      expect(client.eval.mock.calls[0][0]).toBe(ADD_IMMEDIATE_SCRIPT);
    });

    it('repeat job: evals ADD_REPEAT_SCRIPT with jobKey/every/descriptor JSON, never touches the jobs hash', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.add(
        'digests',
        job({ repeat: { every: 3_600_000, jobKey: 'digest' } })
      );

      expect(client.eval).toHaveBeenCalledTimes(1);
      const [script, numKeys, key1, key2, jobKey, every, , descriptorJSON] =
        client.eval.mock.calls[0];
      expect(script).toBe(ADD_REPEAT_SCRIPT);
      expect(numKeys).toBe(2);
      expect(key1).toBe('queue:digests:repeats');
      expect(key2).toBe('queue:digests:repeats:schedule');
      expect(jobKey).toBe('digest');
      expect(every).toBe(3_600_000);
      expect(JSON.parse(descriptorJSON as string)).toEqual({
        name: 'welcome',
        data: { userId: '42' },
        every: 3_600_000,
      });
    });

    it('repeat idempotency is a single eval() call — no separate exists-check round trip', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.add(
        'digests',
        job({ repeat: { every: 1_000, jobKey: 'digest' } })
      );

      expect(client.eval).toHaveBeenCalledTimes(1);
    });
  });

  describe('reserve()', () => {
    it('returns null when blmove times out', async () => {
      const client = fakeRedisLike();
      const blockingClient = fakeRedisLike();
      const adapter = new RedisQueueAdapter({ client, blockingClient });

      const result = await adapter.reserve('emails', 30_000);

      expect(result).toBeNull();
      expect(client.eval).not.toHaveBeenCalled();
    });

    it('on a blmove hit, stamps the deadline via eval(STAMP_DEADLINE_SCRIPT, ...) and returns a StoredJob with reservedAt === now + stallTimeout', async () => {
      const blockingClient = fakeRedisLike();
      blockingClient.blmove.mockResolvedValue('job-1');
      const client = fakeRedisLike();
      const storedJob = job();
      client.eval.mockResolvedValue(JSON.stringify(storedJob));
      const adapter = new RedisQueueAdapter({ client, blockingClient });

      const before = Date.now();
      const result = await adapter.reserve('emails', 30_000);
      const after = Date.now();

      expect(client.eval).toHaveBeenCalledWith(
        STAMP_DEADLINE_SCRIPT,
        3,
        'queue:emails:active:deadline',
        'queue:emails:jobs',
        'queue:emails:active',
        'job-1',
        expect.any(Number)
      );
      expect(result?.id).toBe('job-1');
      expect(result?.reservedAt).toBeGreaterThanOrEqual(before + 30_000);
      expect(result?.reservedAt).toBeLessThanOrEqual(after + 30_000);
    });

    it('defaults blockTimeoutSeconds to a value ≤ 0.025s', async () => {
      const blockingClient = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client: fakeRedisLike(),
        blockingClient,
      });

      await adapter.reserve('emails', 1000);

      const timeoutArg = blockingClient.blmove.mock.calls[0][4];
      expect(timeoutArg).toBeLessThanOrEqual(0.025);
    });

    it('returns null, not a partial job, when the stamp script reports the orphan-cleanup path', async () => {
      const blockingClient = fakeRedisLike();
      blockingClient.blmove.mockResolvedValue('job-1');
      const client = fakeRedisLike();
      client.eval.mockResolvedValue(null);
      const adapter = new RedisQueueAdapter({ client, blockingClient });

      const result = await adapter.reserve('emails', 30_000);

      expect(result).toBeNull();
    });
  });

  describe('complete()', () => {
    it('evals COMPLETE_SCRIPT with [activeKey, activeDeadlineKey, jobsKey] and the id', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.complete('emails', 'job-1');

      expect(client.eval).toHaveBeenCalledWith(
        COMPLETE_SCRIPT,
        3,
        'queue:emails:active',
        'queue:emails:active:deadline',
        'queue:emails:jobs',
        'job-1'
      );
    });
  });

  describe('fail()', () => {
    it('with retryAt: evals FAIL_SCRIPT passing retryAt as the delayed-zset score argument', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });
      const retryAt = Date.now() + 5_000;

      await adapter.fail('emails', 'job-1', { retryAt });

      expect(client.eval).toHaveBeenCalledWith(
        FAIL_SCRIPT,
        5,
        'queue:emails:active',
        'queue:emails:active:deadline',
        'queue:emails:jobs',
        'queue:emails:delayed',
        'queue:emails:dead',
        'job-1',
        retryAt
      );
    });

    it('without retryAt: evals FAIL_SCRIPT with an empty-string sentinel signalling dead-letter', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.fail('emails', 'job-1', {});

      const call = client.eval.mock.calls[0];
      expect(call[0]).toBe(FAIL_SCRIPT);
      expect(call.at(-1)).toBe('');
    });

    it('fail({ retryAt }) and add({ delay }) target the identical delayed-zset key', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.fail('emails', 'job-1', { retryAt: Date.now() + 1_000 });
      const failDelayedKey = client.eval.mock.calls[0][5];

      client.eval.mockClear();
      await adapter.add('emails', job({ readyAt: Date.now() + 1_000 }));
      const addDelayedKey = client.eval.mock.calls[0][3];

      expect(failDelayedKey).toBe('queue:emails:delayed');
      expect(addDelayedKey).toBe('queue:emails:delayed');
    });
  });

  describe('sweep()', () => {
    it('issues exactly three eval() calls per tick, one per script', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.sweep('emails', Date.now());

      expect(client.eval).toHaveBeenCalledTimes(3);
      const scripts = client.eval.mock.calls.map((call) => call[0]);
      expect(scripts).toEqual([
        PROMOTE_DELAYED_SCRIPT,
        SPAWN_REPEAT_SCRIPT,
        RECLAIM_STALLED_SCRIPT,
      ]);
    });

    it('passes now and the configured sweepBatchSize as the trailing arguments to every pass', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
        sweepBatchSize: 250,
      });
      const now = Date.now();

      await adapter.sweep('emails', now);

      for (const call of client.eval.mock.calls) {
        expect(call.at(-2)).toBe(now);
        expect(call.at(-1)).toBe(250);
      }
    });
  });

  describe('getDead() / retryDead()', () => {
    it('lranges the dead list then hmgets job data in one batched call, filtering missing entries', async () => {
      const client = fakeRedisLike();
      const storedJob = job({ id: 'job-1' });
      client.lrange.mockResolvedValue(['job-1', 'job-2']);
      client.hmget.mockResolvedValue([JSON.stringify(storedJob), null]);
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      const dead = await adapter.getDead('emails');

      expect(client.lrange).toHaveBeenCalledWith('queue:emails:dead', 0, -1);
      expect(client.hmget).toHaveBeenCalledWith(
        'queue:emails:jobs',
        'job-1',
        'job-2'
      );
      expect(dead).toEqual([storedJob]);
    });

    it('returns [] without calling hmget when the dead list is empty', async () => {
      const client = fakeRedisLike();
      client.lrange.mockResolvedValue([]);
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      const dead = await adapter.getDead('emails');

      expect(dead).toEqual([]);
      expect(client.hmget).not.toHaveBeenCalled();
    });

    it('retryDead() evals RETRY_DEAD_SCRIPT with [deadKey, jobsKey, waitingKey] and the id', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.retryDead('emails', 'job-1');

      expect(client.eval).toHaveBeenCalledWith(
        RETRY_DEAD_SCRIPT,
        3,
        'queue:emails:dead',
        'queue:emails:jobs',
        'queue:emails:waiting',
        'job-1'
      );
    });
  });

  describe('key scheme', () => {
    it('namespaces keys as "queue:{name}:{struct}" by default, e.g. "queue:emails:waiting"', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
      });

      await adapter.add('emails', job());

      expect(client.eval).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number),
        'queue:emails:jobs',
        'queue:emails:waiting',
        expect.any(String),
        expect.any(String)
      );
    });

    it('honors a custom keyPrefix', async () => {
      const client = fakeRedisLike();
      const adapter = new RedisQueueAdapter({
        client,
        blockingClient: fakeRedisLike(),
        keyPrefix: 'myapp:',
      });

      await adapter.add('emails', job());

      expect(client.eval).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number),
        'myapp:emails:jobs',
        'myapp:emails:waiting',
        expect.any(String),
        expect.any(String)
      );
    });
  });

  // Matches the RFC's own bar for this phase — same as RedisGatewayAdapter.
  it.todo(
    'live-Redis integration — flagged as outstanding per RFC-0004 Phase 3'
  );
});
