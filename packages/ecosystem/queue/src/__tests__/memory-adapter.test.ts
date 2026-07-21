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

  it('sweep() resolves without throwing and has no observable effect (Phase 1 no-op)', async () => {
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
});
