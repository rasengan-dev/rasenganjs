import { describe, it, expect } from 'vitest';
import { MemoryQueueAdapter } from '../adapters/memory.js';
import type { StoredJob } from '../types.js';

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

describe('MemoryQueueAdapter', () => {
  it('add() then reserve() returns the job and removes it from waiting', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('emails', job());

    const reserved = await adapter.reserve('emails', 30_000);
    expect(reserved?.id).toBe('job-1');

    // Gone from waiting — a second reserve() finds nothing.
    expect(await adapter.reserve('emails', 30_000)).toBeNull();
  });

  it('reserve() on an empty queue returns null', async () => {
    const adapter = new MemoryQueueAdapter();
    expect(await adapter.reserve('emails', 30_000)).toBeNull();
  });

  it('complete() removes an active job permanently', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('emails', job());
    await adapter.reserve('emails', 30_000);

    await adapter.complete('emails', 'job-1');

    expect(await adapter.getDead('emails')).toEqual([]);
    // Failing an already-completed id is a silent no-op, not an error.
    await expect(adapter.fail('emails', 'job-1', {})).resolves.toBeUndefined();
  });

  it('fail() with retryAt re-adds the job to waiting after the delay elapses, with attempt incremented', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('emails', job({ attempt: 1 }));
    const reserved = await adapter.reserve('emails', 30_000);

    await adapter.fail('emails', reserved!.id, { retryAt: Date.now() + 20 });

    // Not yet — still within the delay window.
    expect(await adapter.reserve('emails', 30_000)).toBeNull();

    await new Promise((r) => setTimeout(r, 40));

    const retried = await adapter.reserve('emails', 30_000);
    expect(retried?.id).toBe('job-1');
    expect(retried?.attempt).toBe(2);
  });

  it('fail() without retryAt moves the job straight to the dead list, inspectable via getDead()', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('emails', job());
    const reserved = await adapter.reserve('emails', 30_000);

    await adapter.fail('emails', reserved!.id, {});

    const dead = await adapter.getDead('emails');
    expect(dead).toHaveLength(1);
    expect(dead[0].id).toBe('job-1');
  });

  it('retryDead() moves a dead job back to waiting with attempt reset to 1', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('emails', job({ attempt: 3 }));
    const reserved = await adapter.reserve('emails', 30_000);
    await adapter.fail('emails', reserved!.id, {});

    await adapter.retryDead('emails', 'job-1');

    expect(await adapter.getDead('emails')).toEqual([]);
    const retried = await adapter.reserve('emails', 30_000);
    expect(retried?.id).toBe('job-1');
    expect(retried?.attempt).toBe(1);
  });

  it('sweep() has no effect on a queue with nothing delayed, stalled, or repeating', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('emails', job());

    await expect(adapter.sweep('emails', Date.now())).resolves.toBeUndefined();

    // The waiting job is still there, untouched by sweep().
    const reserved = await adapter.reserve('emails', 30_000);
    expect(reserved?.id).toBe('job-1');
  });

  it('keeps separate queues fully isolated', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('emails', job({ id: 'a' }));
    await adapter.add('sms', job({ id: 'b' }));

    expect((await adapter.reserve('emails', 30_000))?.id).toBe('a');
    expect((await adapter.reserve('sms', 30_000))?.id).toBe('b');
  });

  describe('delayed jobs', () => {
    it('keeps a job with a future readyAt out of waiting until sweep() promotes it', async () => {
      const adapter = new MemoryQueueAdapter();
      await adapter.add('emails', job({ readyAt: Date.now() + 10_000 }));

      expect(await adapter.reserve('emails', 30_000)).toBeNull();
    });

    it('sweep() promotes a delayed job to waiting once its readyAt has passed, not before', async () => {
      const adapter = new MemoryQueueAdapter();
      await adapter.add('emails', job({ readyAt: Date.now() + 20 }));

      await adapter.sweep('emails', Date.now());
      expect(await adapter.reserve('emails', 30_000)).toBeNull(); // not yet due

      await new Promise((r) => setTimeout(r, 30));
      await adapter.sweep('emails', Date.now());

      const promoted = await adapter.reserve('emails', 30_000);
      expect(promoted?.id).toBe('job-1');
    });
  });

  describe('repeat jobs', () => {
    it('add() with repeat registers a descriptor without enqueueing a job immediately', async () => {
      const adapter = new MemoryQueueAdapter();
      await adapter.add(
        'digests',
        job({ repeat: { every: 1_000, jobKey: 'digest' } })
      );

      expect(await adapter.reserve('digests', 30_000)).toBeNull();
    });

    it('calling add() twice with the same repeat spec does not create a second descriptor', async () => {
      const adapter = new MemoryQueueAdapter();
      const repeatJob = job({ repeat: { every: 20, jobKey: 'digest' } });
      await adapter.add('digests', repeatJob);
      await adapter.add('digests', repeatJob);

      await new Promise((r) => setTimeout(r, 30));
      await adapter.sweep('digests', Date.now());

      // Only one instance spawned, not two.
      expect(await adapter.reserve('digests', 30_000)).not.toBeNull();
      expect(await adapter.reserve('digests', 30_000)).toBeNull();
    });

    it('sweep() spawns a new instance once every ms have elapsed and reschedules the next run', async () => {
      const adapter = new MemoryQueueAdapter();
      await adapter.add(
        'digests',
        job({ repeat: { every: 20, jobKey: 'digest' } })
      );

      await new Promise((r) => setTimeout(r, 30));
      await adapter.sweep('digests', Date.now());

      const spawned = await adapter.reserve('digests', 30_000);
      expect(spawned).not.toBeNull();
      expect(spawned?.repeat).toEqual({ every: 20, jobKey: 'digest' });
      expect(spawned?.attempt).toBe(1);

      // Not due again immediately after just running.
      await adapter.sweep('digests', Date.now());
      expect(await adapter.reserve('digests', 30_000)).toBeNull();
    });
  });

  describe('stalled-job reclaim', () => {
    it('sweep() returns an active job to waiting with attempt incremented once its stall deadline passes', async () => {
      const adapter = new MemoryQueueAdapter();
      await adapter.add('emails', job({ attempt: 1 }));
      await adapter.reserve('emails', 20); // deadline in 20ms

      await new Promise((r) => setTimeout(r, 30));
      await adapter.sweep('emails', Date.now());

      const reclaimed = await adapter.reserve('emails', 30_000);
      expect(reclaimed?.id).toBe('job-1');
      expect(reclaimed?.attempt).toBe(2);
    });

    it('sweep() leaves an active job alone before its stall deadline arrives', async () => {
      const adapter = new MemoryQueueAdapter();
      await adapter.add('emails', job());
      await adapter.reserve('emails', 30_000); // long deadline

      await adapter.sweep('emails', Date.now());

      // Still active, not reclaimed — nothing waiting to reserve.
      expect(await adapter.reserve('emails', 30_000)).toBeNull();
    });

    it('a reclaimed job is reservable again like any other waiting job', async () => {
      const adapter = new MemoryQueueAdapter();
      await adapter.add('emails', job());
      await adapter.reserve('emails', 10);

      await new Promise((r) => setTimeout(r, 20));
      await adapter.sweep('emails', Date.now());

      const reclaimed = await adapter.reserve('emails', 30_000);
      expect(reclaimed?.id).toBe('job-1');
      // Gone from waiting once more, like any other reservation.
      expect(await adapter.reserve('emails', 30_000)).toBeNull();
    });
  });
});
