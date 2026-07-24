import { describe, it, expect, vi } from 'vitest';
import { JobRouter } from '../queue.js';

describe('JobRouter', () => {
  it('registers and exposes a handler by job name', () => {
    const router = new JobRouter();
    const handler = vi.fn();

    router.process('welcome', handler);

    expect(router.getJobs().get('welcome')?.handler).toBe(handler);
  });

  it('throws when the same job name is registered twice', () => {
    const router = new JobRouter();
    router.process('welcome', vi.fn());

    expect(() => router.process('welcome', vi.fn())).toThrow(
      /already registered/
    );
  });

  it('applies attempts/backoff/concurrency defaults when options are omitted', () => {
    const router = new JobRouter();
    router.process('welcome', vi.fn());

    expect(router.getJobs().get('welcome')?.options).toEqual({
      attempts: 1,
      backoff: 0,
      concurrency: 1,
    });
  });

  it('exposes exactly the options passed to process()', () => {
    const router = new JobRouter();
    router.process('welcome', vi.fn(), {
      attempts: 3,
      backoff: 5_000,
      concurrency: 5,
    });

    expect(router.getJobs().get('welcome')?.options).toEqual({
      attempts: 3,
      backoff: 5_000,
      concurrency: 5,
    });
  });

  it('supports multiple distinct job names', () => {
    const router = new JobRouter();
    router.process('welcome', vi.fn());
    router.process('followUp', vi.fn());

    expect(router.getJobs().size).toBe(2);
  });
});
