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

/**
 * End-to-end tests over a real `ServerApp` + DI container — no fakes.
 * The worker loop polls every 25ms (`WORKER_POLL_INTERVAL_MS` in
 * plugin.ts), so waits below are generous relative to that.
 */
describe('@rasenganjs/queue — end-to-end', () => {
  it('enqueue → process → completes; handler receives the correct Job shape', async () => {
    let received: Job<{ userId: string }> | undefined;

    class EmailQueue extends Queue {
      name = 'emails';
      jobs(router: JobRouter) {
        router.process('welcome', async (job: Job<{ userId: string }>) => {
          received = job;
        });
      }
    }

    let capturedEmailQueue: EmailQueue | undefined;
    class ProducerController extends Controller {
      constructor(emailQueue: EmailQueue) {
        super();
        capturedEmailQueue = emailQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({
        name: 'M',
        queues: [EmailQueue],
        controllers: [ProducerController],
      })
    );
    app.compile();

    const id = await capturedEmailQueue!.add('welcome', { userId: '42' });
    await new Promise((r) => setTimeout(r, 60));

    expect(received).toEqual({
      id,
      name: 'welcome',
      data: { userId: '42' },
      attempt: 1,
      enqueuedAt: expect.any(Number),
    });

    await app.close();
  });

  it('enqueue → handler throws → retried with exponential backoff → eventually completes', async () => {
    const attempts: number[] = [];

    class FlakyQueue extends Queue {
      name = 'flaky';
      jobs(router: JobRouter) {
        router.process(
          'task',
          async (job: Job) => {
            attempts.push(job.attempt);
            if (job.attempt < 3) throw new Error('fail');
          },
          { attempts: 3, backoff: 20 }
        );
      }
    }

    let capturedFlakyQueue: FlakyQueue | undefined;
    class C extends Controller {
      constructor(flakyQueue: FlakyQueue) {
        super();
        capturedFlakyQueue = flakyQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({ name: 'M', queues: [FlakyQueue], controllers: [C] })
    );
    app.compile();

    await capturedFlakyQueue!.add('task', {});
    // Backoff: 20ms then 40ms, plus poll overhead — 400ms is generous.
    await new Promise((r) => setTimeout(r, 400));

    expect(attempts).toEqual([1, 2, 3]);
    await app.close();
  });

  it('enqueue → handler throws until attempts exhausted → appears in getDead()', async () => {
    class FailQueue extends Queue {
      name = 'fails';
      jobs(router: JobRouter) {
        router.process(
          'task',
          async () => {
            throw new Error('always fails');
          },
          { attempts: 2, backoff: 10 }
        );
      }
    }

    let capturedFailQueue: FailQueue | undefined;
    class C extends Controller {
      constructor(failQueue: FailQueue) {
        super();
        capturedFailQueue = failQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({ name: 'M', queues: [FailQueue], controllers: [C] })
    );
    app.compile();

    const id = await capturedFailQueue!.add('task', {});
    await new Promise((r) => setTimeout(r, 200));

    const dead = await capturedFailQueue!.getDead();
    expect(dead.map((job) => job.id)).toContain(id);

    await app.close();
  });

  it('worker: false — .add() still enqueues, nothing processes until a separate worker: true instance drains the same adapter', async () => {
    const sharedAdapter = new MemoryQueueAdapter();
    const processed: string[] = [];

    class WorkQueue extends Queue {
      name = 'work';
      jobs(router: JobRouter) {
        router.process('task', async (job: Job) => {
          processed.push(job.id);
        });
      }
    }

    let producerQueue: WorkQueue | undefined;
    class ProducerController extends Controller {
      constructor(workQueue: WorkQueue) {
        super();
        producerQueue = workQueue;
      }
      routes(_router: Router) {}
    }

    const producerApp = new ServerApp();
    producerApp.registerPlugin(
      createQueuePlugin({ adapter: sharedAdapter, worker: false })
    );
    producerApp.registerModule(
      defineModule({
        name: 'Producer',
        queues: [WorkQueue],
        controllers: [ProducerController],
      })
    );
    producerApp.compile();

    const id = await producerQueue!.add('task', {});
    await new Promise((r) => setTimeout(r, 60));
    expect(processed).toEqual([]);

    const consumerApp = new ServerApp();
    consumerApp.registerPlugin(
      createQueuePlugin({ adapter: sharedAdapter, worker: true })
    );
    consumerApp.registerModule(
      defineModule({ name: 'Consumer', queues: [WorkQueue] })
    );
    consumerApp.compile();

    await new Promise((r) => setTimeout(r, 60));
    expect(processed).toEqual([id]);

    await producerApp.close();
    await consumerApp.close();
  });

  it('concurrency caps in-flight handler calls per job name', async () => {
    let concurrent = 0;
    let maxConcurrent = 0;

    class ConcurrentQueue extends Queue {
      name = 'concurrent';
      jobs(router: JobRouter) {
        router.process(
          'task',
          async () => {
            concurrent++;
            maxConcurrent = Math.max(maxConcurrent, concurrent);
            await new Promise((r) => setTimeout(r, 50));
            concurrent--;
          },
          { concurrency: 2 }
        );
      }
    }

    let capturedConcurrentQueue: ConcurrentQueue | undefined;
    class C extends Controller {
      constructor(concurrentQueue: ConcurrentQueue) {
        super();
        capturedConcurrentQueue = concurrentQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({ name: 'M', queues: [ConcurrentQueue], controllers: [C] })
    );
    app.compile();

    await Promise.all([
      capturedConcurrentQueue!.add('task', {}),
      capturedConcurrentQueue!.add('task', {}),
      capturedConcurrentQueue!.add('task', {}),
      capturedConcurrentQueue!.add('task', {}),
    ]);

    // 4 jobs, concurrency 2, 50ms each — 2 sequential batches (~100ms)
    // plus poll overhead. 400ms is a generous margin.
    await new Promise((r) => setTimeout(r, 400));

    expect(maxConcurrent).toBeLessThanOrEqual(2);
    expect(concurrent).toBe(0);

    await app.close();
  });

  it('add(name, data, { delay }) — job is not processed until the delay elapses', async () => {
    const runs: number[] = [];

    class DelayedQueue extends Queue {
      name = 'delayed';
      jobs(router: JobRouter) {
        router.process('task', async () => {
          runs.push(Date.now());
        });
      }
    }

    let capturedQueue: DelayedQueue | undefined;
    class C extends Controller {
      constructor(delayedQueue: DelayedQueue) {
        super();
        capturedQueue = delayedQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ sweepInterval: 15 }));
    app.registerModule(
      defineModule({ name: 'M', queues: [DelayedQueue], controllers: [C] })
    );
    app.compile();

    await capturedQueue!.add('task', {}, { delay: 60 });

    await new Promise((r) => setTimeout(r, 30));
    expect(runs).toEqual([]);

    await new Promise((r) => setTimeout(r, 80));
    expect(runs).toHaveLength(1);

    await app.close();
  });

  it('add(name, data, { repeat: { every } }) — handler runs repeatedly on the configured cadence', async () => {
    const runs: number[] = [];

    class DigestQueue extends Queue {
      name = 'digest';
      jobs(router: JobRouter) {
        router.process('run', async () => {
          runs.push(Date.now());
        });
      }
    }

    let capturedQueue: DigestQueue | undefined;
    class C extends Controller {
      constructor(digestQueue: DigestQueue) {
        super();
        capturedQueue = digestQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ sweepInterval: 15 }));
    app.registerModule(
      defineModule({ name: 'M', queues: [DigestQueue], controllers: [C] })
    );
    app.compile();

    await capturedQueue!.add('run', {}, { repeat: { every: 30 } });

    await new Promise((r) => setTimeout(r, 150));

    expect(runs.length).toBeGreaterThanOrEqual(2);

    await app.close();
  });

  it('calling add() twice at boot with the same repeat spec does not double the processing rate', async () => {
    const runs: number[] = [];

    class DigestQueue extends Queue {
      name = 'digest-idempotent';
      jobs(router: JobRouter) {
        router.process('run', async () => {
          runs.push(Date.now());
        });
      }
    }

    let capturedQueue: DigestQueue | undefined;
    class C extends Controller {
      constructor(digestQueue: DigestQueue) {
        super();
        capturedQueue = digestQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ sweepInterval: 15 }));
    app.registerModule(
      defineModule({ name: 'M', queues: [DigestQueue], controllers: [C] })
    );
    app.compile();

    // Same name + data (empty object both times) → same default jobKey.
    await capturedQueue!.add('run', {}, { repeat: { every: 30 } });
    await capturedQueue!.add('run', {}, { repeat: { every: 30 } });

    await new Promise((r) => setTimeout(r, 100));

    // ~3 fires expected at this cadence/window if registered once;
    // a doubled registration would show roughly twice that.
    expect(runs.length).toBeGreaterThanOrEqual(2);
    expect(runs.length).toBeLessThanOrEqual(4);

    await app.close();
  });

  it('add() throws when both delay and repeat are passed', async () => {
    class BadQueue extends Queue {
      name = 'bad-options';
      jobs(router: JobRouter) {
        router.process('task', async () => {});
      }
    }

    let capturedQueue: BadQueue | undefined;
    class C extends Controller {
      constructor(badQueue: BadQueue) {
        super();
        capturedQueue = badQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({ name: 'M', queues: [BadQueue], controllers: [C] })
    );
    app.compile();

    await expect(
      capturedQueue!.add('task', {}, { delay: 10, repeat: { every: 10 } })
    ).rejects.toThrow(/cannot combine/);

    await app.close();
  });

  it('a job whose handler outlives stallTimeout is reclaimed by the sweeper and reprocessed (attempt 2)', async () => {
    const attempts: number[] = [];

    class SlowOnceQueue extends Queue {
      name = 'slow-once';
      jobs(router: JobRouter) {
        router.process(
          'task',
          async (job: Job) => {
            attempts.push(job.attempt);
            if (job.attempt === 1) {
              // Simulates a worker that "died": outlives the stall
              // deadline below, but still resolves eventually so
              // app.close()'s Promise.all(inFlight) never hangs.
              await new Promise((r) => setTimeout(r, 200));
            }
          },
          { attempts: 2, concurrency: 2 }
        );
      }
    }

    let capturedQueue: SlowOnceQueue | undefined;
    class C extends Controller {
      constructor(slowOnceQueue: SlowOnceQueue) {
        super();
        capturedQueue = slowOnceQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(
      createQueuePlugin({ stallTimeout: 30, sweepInterval: 15 })
    );
    app.registerModule(
      defineModule({ name: 'M', queues: [SlowOnceQueue], controllers: [C] })
    );
    app.compile();

    await capturedQueue!.add('task', {});

    // attempt 1 is reserved (~25ms tick) and starts its 200ms sleep;
    // the 30ms stall deadline passes well before that, so the sweeper
    // reclaims it and attempt 2 dispatches and resolves quickly.
    await new Promise((r) => setTimeout(r, 300));

    expect(attempts).toContain(1);
    expect(attempts).toContain(2);

    await app.close();
  });
});
