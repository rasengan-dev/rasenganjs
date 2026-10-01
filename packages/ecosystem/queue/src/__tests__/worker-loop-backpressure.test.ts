import { describe, it, expect } from 'vitest';
import {
  ServerApp,
  defineModule,
  Controller,
  type Router,
} from '@rasenganjs/server';
import {
  Queue,
  JobRouter,
  createQueuePlugin,
  MemoryQueueAdapter,
  type Job,
} from '../index.js';
import type { QueueAdapter } from '../types.js';

/**
 * Wraps a real MemoryQueueAdapter so reserve() and sweep() take `delayMs`
 * (longer than the 25ms poll interval), recording the peak number of
 * calls in flight at once.
 */
function slowAdapter(delayMs: number) {
  const inner = new MemoryQueueAdapter();
  const pending = { reserve: 0, sweep: 0 };
  const peak = { reserve: 0, sweep: 0 };
  const track = async <T>(kind: 'reserve' | 'sweep', run: () => Promise<T>) => {
    pending[kind]++;
    peak[kind] = Math.max(peak[kind], pending[kind]);
    try {
      await new Promise((r) => setTimeout(r, delayMs));
      return await run();
    } finally {
      pending[kind]--;
    }
  };
  const adapter: QueueAdapter = {
    add: inner.add.bind(inner),
    complete: inner.complete.bind(inner),
    fail: inner.fail.bind(inner),
    getDead: inner.getDead.bind(inner),
    retryDead: inner.retryDead.bind(inner),
    reserve: (queue, stallTimeout) =>
      track('reserve', () => inner.reserve(queue, stallTimeout)),
    sweep: (queue, now) => track('sweep', () => inner.sweep(queue, now)),
  };
  return { adapter, peak };
}

describe('worker loop backpressure', () => {
  it('never has more than one reserve() in flight per queue, even when reserve() outlasts the poll interval', async () => {
    const { adapter, peak } = slowAdapter(100);
    class A extends Queue {
      name = 'a';
      jobs(_router: JobRouter) {}
    }
    class B extends Queue {
      name = 'b';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ adapter }));
    app.registerModule(defineModule({ name: 'M', queues: [A, B] }));
    app.compile();

    await new Promise((r) => setTimeout(r, 400));
    await app.close();

    // One per queue. Without the guard this is ~16 (400ms / 25ms, x2).
    expect(peak.reserve).toBeLessThanOrEqual(2);
  });

  it('still processes jobs when reserve() is slow', async () => {
    const { adapter } = slowAdapter(40);
    const processed: string[] = [];
    class Work extends Queue {
      name = 'work';
      jobs(router: JobRouter) {
        router.process('task', async (job: Job<{ n: string }>) => {
          processed.push(job.data.n);
        });
      }
    }

    let queue: Work | undefined;
    class ProducerController extends Controller {
      constructor(work: Work) {
        super();
        queue = work;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ adapter }));
    app.registerModule(
      defineModule({
        name: 'M',
        queues: [Work],
        controllers: [ProducerController],
      })
    );
    app.compile();

    await queue!.add('task', { n: '1' });
    await queue!.add('task', { n: '2' });
    await new Promise((r) => setTimeout(r, 300));
    await app.close();

    expect(processed.sort()).toEqual(['1', '2']);
  });

  it('does not start a sweep while the previous one is still running', async () => {
    const { adapter, peak } = slowAdapter(100);
    class A extends Queue {
      name = 'a';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ adapter, sweepInterval: 10 }));
    app.registerModule(defineModule({ name: 'M', queues: [A] }));
    app.compile();

    await new Promise((r) => setTimeout(r, 350));
    await app.close();

    expect(peak.sweep).toBe(1);
  });
});
