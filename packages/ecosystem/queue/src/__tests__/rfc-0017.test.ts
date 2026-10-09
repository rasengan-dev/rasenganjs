import { describe, it, expect, vi, afterEach } from 'vitest';
import { ServerApp, defineModule } from '@rasenganjs/server';
import {
  Queue,
  JobRouter,
  createQueuePlugin,
  MemoryQueueAdapter,
  type Job,
} from '../index.js';
import { createAdapterErrorLog } from '../plugin.js';
import type { QueueAdapter, StoredJob } from '../types.js';

/**
 * RFC-0017: capacity-gated reservation, lease renewal, FIFO drain,
 * release on shutdown and contained adapter errors. Real `ServerApp`s
 * over a real `MemoryQueueAdapter` (wrapped where a test needs one call
 * to be slow or to fail), real timers: the worker loop polls every 25ms.
 */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => (resolve = r));
  return { promise, resolve };
}

/** What the memory adapter holds for `queue`, by job `data`. */
function inspect(adapter: MemoryQueueAdapter, queue: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = (adapter as any).queues.get(queue) as
    { waiting: StoredJob[]; active: Map<string, StoredJob> } | undefined;
  return {
    waiting: state?.waiting.map((job) => job.data) ?? [],
    waitingAttempts: state?.waiting.map((job) => job.attempt) ?? [],
    active: state ? [...state.active.values()].map((job) => job.data) : [],
  };
}

/** Every method of `inner`, bound, so a test can override some. */
function wrap(
  inner: MemoryQueueAdapter,
  overrides: Partial<QueueAdapter> = {}
): QueueAdapter {
  return {
    add: inner.add.bind(inner),
    reserve: inner.reserve.bind(inner),
    complete: inner.complete.bind(inner),
    fail: inner.fail.bind(inner),
    sweep: inner.sweep.bind(inner),
    getDead: inner.getDead.bind(inner),
    retryDead: inner.retryDead.bind(inner),
    extend: inner.extend.bind(inner),
    release: inner.release.bind(inner),
    ...overrides,
  };
}

/** Boots an app consuming one queue. */
function startApp(
  queueClass: new () => Queue,
  options: Parameters<typeof createQueuePlugin>[0]
): ServerApp {
  const app = new ServerApp();
  app.registerPlugin(createQueuePlugin(options));
  app.registerModule(defineModule({ name: 'M', queues: [queueClass] }));
  app.compile();
  return app;
}

/** Enqueues straight through the adapter, as `Queue.add()` does. */
async function enqueue(
  adapter: QueueAdapter,
  queue: string,
  name: string,
  data: unknown
): Promise<string> {
  const id = crypto.randomUUID();
  await adapter.add(queue, {
    id,
    name,
    data,
    attempt: 1,
    enqueuedAt: Date.now(),
  });
  return id;
}

const unhandled: unknown[] = [];
process.on('unhandledRejection', (reason) => unhandled.push(reason));

afterEach(() => {
  vi.restoreAllMocks();
  unhandled.length = 0;
});

describe('RFC-0017 §1 — capacity-gated reservation', () => {
  it('a single-name queue at concurrency 1 holds exactly one reservation', async () => {
    const adapter = new MemoryQueueAdapter();
    const gate = deferred();
    class Work extends Queue {
      name = 'work';
      jobs(router: JobRouter) {
        router.process('task', () => gate.promise);
      }
    }
    const app = startApp(Work, { adapter });
    for (const n of ['1', '2', '3', '4', '5'])
      await enqueue(adapter, 'work', 'task', n);

    await sleep(100);
    expect(inspect(adapter, 'work').active).toEqual(['1']);
    expect(inspect(adapter, 'work').waiting).toEqual(['2', '3', '4', '5']);

    gate.resolve();
    await app.close();
  });

  it('two workers on one adapter share the work instead of one taking it all', async () => {
    const adapter = new MemoryQueueAdapter();
    const ranOn: Record<string, string> = {};
    const makeQueue = (label: string) =>
      class Shared extends Queue {
        name = 'shared';
        jobs(router: JobRouter) {
          router.process('task', async (job: Job<string>) => {
            ranOn[job.data] = label;
            await sleep(150);
          });
        }
      };
    const first = startApp(makeQueue('first'), { adapter });
    const second = startApp(makeQueue('second'), { adapter });
    await enqueue(adapter, 'shared', 'task', 'a');
    await enqueue(adapter, 'shared', 'task', 'b');

    await sleep(250);
    expect(new Set(Object.values(ranOn))).toEqual(new Set(['first', 'second']));

    await first.close();
    await second.close();
  });

  it('a queue with no handler never reserves (the RFC-0016 scenario)', async () => {
    const inner = new MemoryQueueAdapter();
    const reserve = vi.fn<QueueAdapter['reserve']>(inner.reserve.bind(inner));
    class ProducerOnly extends Queue {
      name = 'producer-only';
      jobs(_router: JobRouter) {}
    }
    const app = startApp(ProducerOnly, { adapter: wrap(inner, { reserve }) });
    await enqueue(inner, 'producer-only', 'task', 'x');

    await sleep(100);
    expect(reserve).not.toHaveBeenCalled();
    expect(inspect(inner, 'producer-only').waiting).toEqual(['x']);

    await app.close();
  });
});

describe('RFC-0017 §2 — lease renewal', () => {
  it('a handler running far longer than stallTimeout runs once, at attempt 1', async () => {
    const adapter = new MemoryQueueAdapter();
    const attempts: number[] = [];
    class Slow extends Queue {
      name = 'slow';
      jobs(router: JobRouter) {
        router.process(
          'task',
          async (job: Job) => {
            attempts.push(job.attempt);
            await sleep(300);
          },
          { attempts: 3, concurrency: 2 }
        );
      }
    }
    const app = startApp(Slow, {
      adapter,
      stallTimeout: 60,
      sweepInterval: 15,
    });
    await enqueue(adapter, 'slow', 'task', {});

    await sleep(450);
    expect(attempts).toEqual([1]);

    await app.close();
  });

  it('a buffered job whose lease was lost is dropped, not run by this worker', async () => {
    const inner = new MemoryQueueAdapter();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const ran: string[] = [];
    const gate = deferred();
    class TwoNames extends Queue {
      name = 'two-names';
      jobs(router: JobRouter) {
        router.process('a', async (job: Job<string>) => {
          ran.push(job.data);
          await gate.promise;
        });
        router.process('b', async () => {});
      }
    }
    let lost: string | undefined;
    const app = startApp(TwoNames, {
      stallTimeout: 60,
      sweepInterval: 10_000,
      adapter: wrap(inner, {
        // Pretends the sweeper reclaimed `a2` while it was buffered.
        extend: async (q, ids, stallTimeout) =>
          (await inner.extend(q, ids, stallTimeout)).filter(
            (id) => id !== lost
          ),
      }),
    });
    await enqueue(inner, 'two-names', 'a', 'a1');
    lost = await enqueue(inner, 'two-names', 'a', 'a2');

    await sleep(100); // a1 running, a2 buffered, then dropped at a beat
    gate.resolve();
    await sleep(100);

    expect(ran).toEqual(['a1']);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('dropped'));

    await app.close();
  });

  it('app.close() during a long handler keeps renewing until it settles', async () => {
    const adapter = new MemoryQueueAdapter();
    const attempts: number[] = [];
    const makeQueue = () =>
      class Closing extends Queue {
        name = 'closing';
        jobs(router: JobRouter) {
          router.process(
            'task',
            async (job: Job) => {
              attempts.push(job.attempt);
              await sleep(300);
            },
            { attempts: 3 }
          );
        }
      };
    const options = { adapter, stallTimeout: 60, sweepInterval: 15 };
    const closing = startApp(makeQueue(), options);
    // A second worker would take the job if the first one's lease lapsed.
    const other = startApp(makeQueue(), options);
    await enqueue(adapter, 'closing', 'task', {});

    await sleep(50);
    await closing.close();
    await sleep(50);

    expect(attempts).toEqual([1]);
    await other.close();
  });
});

describe('RFC-0017 §3 — FIFO drain', () => {
  it('buffered jobs of one name dispatch in reservation order', async () => {
    const adapter = new MemoryQueueAdapter();
    const order: string[] = [];
    const gates = [deferred(), deferred(), deferred(), deferred()];
    class Ordered extends Queue {
      name = 'ordered';
      jobs(router: JobRouter) {
        router.process('a', async (job: Job<string>) => {
          order.push(job.data);
          await gates[order.length - 1].promise;
        });
        // Spare capacity, so `a` jobs get buffered behind the running one.
        router.process('b', async () => {}, { concurrency: 5 });
      }
    }
    const app = startApp(Ordered, { adapter });
    for (const n of ['a1', 'a2', 'a3', 'a4'])
      await enqueue(adapter, 'ordered', 'a', n);

    await sleep(150);
    for (const gate of gates) {
      gate.resolve();
      await sleep(60);
    }

    expect(order).toEqual(['a1', 'a2', 'a3', 'a4']);
    await app.close();
  });
});

describe('RFC-0017 §4 — release on shutdown', () => {
  it('unstarted jobs go back to waiting, in order and at attempt 1, before the running one finishes', async () => {
    const adapter = new MemoryQueueAdapter();
    const gate = deferred();
    const ran: string[] = [];
    const makeQueue = () =>
      class Release extends Queue {
        name = 'release';
        jobs(router: JobRouter) {
          router.process('a', async (job: Job<string>) => {
            ran.push(job.data);
            if (job.data === 'a1') await gate.promise;
          });
          router.process('b', async () => {}, { concurrency: 5 });
        }
      };
    const first = startApp(makeQueue(), { adapter });
    for (const n of ['a1', 'a2', 'a3'])
      await enqueue(adapter, 'release', 'a', n);
    await sleep(100); // a1 running, a2 and a3 buffered

    const closed = first.close();
    await sleep(20);
    expect(inspect(adapter, 'release').waiting).toEqual(['a2', 'a3']);
    expect(inspect(adapter, 'release').waitingAttempts).toEqual([1, 1]);

    const second = startApp(makeQueue(), { adapter });
    await sleep(100);
    expect(ran).toEqual(['a1', 'a2', 'a3']);

    gate.resolve();
    await closed;
    await second.close();
  });

  it('a reserve() that resolves after close() began is released, not run', async () => {
    const inner = new MemoryQueueAdapter();
    const ran: string[] = [];
    const reserveGate = deferred();
    let blockReserve = false;
    class Late extends Queue {
      name = 'late';
      jobs(router: JobRouter) {
        router.process('task', async (job: Job<string>) => {
          ran.push(job.data);
        });
      }
    }
    const app = startApp(Late, {
      adapter: wrap(inner, {
        reserve: async (q, stallTimeout) => {
          if (blockReserve) await reserveGate.promise;
          return inner.reserve(q, stallTimeout);
        },
      }),
    });
    blockReserve = true;
    await sleep(40); // a reserve() is now pending
    await enqueue(inner, 'late', 'task', 'x');

    const closed = app.close();
    reserveGate.resolve();
    await closed;

    expect(ran).toEqual([]);
    expect(inspect(inner, 'late').waiting).toEqual(['x']);
    expect(inspect(inner, 'late').active).toEqual([]);
  });

  it('without release(), unstarted jobs stay active for the sweeper, and the plugin warns once', async () => {
    const inner = new MemoryQueueAdapter();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const gate = deferred();
    class NoRelease extends Queue {
      name = 'no-release';
      jobs(router: JobRouter) {
        router.process('a', () => gate.promise);
        router.process('b', async () => {}, { concurrency: 5 });
      }
    }
    const adapter = wrap(inner);
    delete adapter.release;
    const app = startApp(NoRelease, { adapter });
    await enqueue(inner, 'no-release', 'a', 'a1');
    await enqueue(inner, 'no-release', 'a', 'a2');
    await sleep(100);

    const closed = app.close();
    await sleep(20);
    expect(inspect(inner, 'no-release').active.sort()).toEqual(['a1', 'a2']);
    expect(
      warn.mock.calls.filter(([line]) => String(line).includes('release()'))
    ).toHaveLength(1);

    gate.resolve();
    await closed;
  });
});

describe('RFC-0017 §5 — adapter failures', () => {
  it('a failing reserve() logs once, then once more when it works again, with no unhandled rejection', async () => {
    const inner = new MemoryQueueAdapter();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    let down = true;
    class Flaky extends Queue {
      name = 'flaky-reserve';
      jobs(router: JobRouter) {
        router.process('task', async () => {});
      }
    }
    const app = startApp(Flaky, {
      adapter: wrap(inner, {
        reserve: async (q, stallTimeout) => {
          if (down) throw new Error('Connection is closed.');
          return inner.reserve(q, stallTimeout);
        },
      }),
    });

    await sleep(300);
    down = false;
    await sleep(60);
    await app.close();

    const reserveErrors = error.mock.calls.filter(([line]) =>
      String(line).includes('reserve()')
    );
    expect(reserveErrors).toHaveLength(1);
    expect(info).toHaveBeenCalledWith(expect.stringContaining('works again'));
    expect(unhandled).toEqual([]);
  });

  it('a reserve() failing during close() logs nothing', async () => {
    const inner = new MemoryQueueAdapter();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const gate = deferred();
    let closing = false;
    class Closing extends Queue {
      name = 'closing-reserve';
      jobs(router: JobRouter) {
        router.process('task', async () => {});
      }
    }
    const app = startApp(Closing, {
      adapter: wrap(inner, {
        reserve: async (q, stallTimeout) => {
          if (closing) {
            await gate.promise;
            throw new Error('Connection is closed.');
          }
          return inner.reserve(q, stallTimeout);
        },
      }),
    });
    await sleep(40);
    closing = true;
    await sleep(40); // a reserve() is pending on the "connection"

    const closed = app.close();
    gate.resolve();
    await closed;

    expect(error).not.toHaveBeenCalled();
    expect(unhandled).toEqual([]);
  });

  it('a failing complete() after a successful handler is not retried as a failure', async () => {
    const inner = new MemoryQueueAdapter();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    const fail = vi.fn<QueueAdapter['fail']>(inner.fail.bind(inner));
    const attempts: number[] = [];
    class AckFails extends Queue {
      name = 'ack-fails';
      jobs(router: JobRouter) {
        router.process(
          'task',
          async (job: Job) => {
            attempts.push(job.attempt);
          },
          { attempts: 3 }
        );
      }
    }
    const app = startApp(AckFails, {
      stallTimeout: 60,
      sweepInterval: 15,
      adapter: wrap(inner, {
        fail,
        complete: async (q, id) => {
          if (attempts.length === 1) throw new Error('Connection is closed.');
          return inner.complete(q, id);
        },
      }),
    });
    await enqueue(inner, 'ack-fails', 'task', {});

    await sleep(250);
    await app.close();

    // Not rescheduled through fail(). No longer renewed, so the sweeper
    // reclaimed it once (at-least-once), and the second ack worked.
    expect(fail).not.toHaveBeenCalled();
    expect(attempts).toEqual([1, 2]);
    expect(unhandled).toEqual([]);
  });

  it('a failing fail(), for a retry or a missing handler, is not an unhandled rejection', async () => {
    const inner = new MemoryQueueAdapter();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    class Failing extends Queue {
      name = 'fail-fails';
      jobs(router: JobRouter) {
        router.process('throws', async () => {
          throw new Error('handler failed');
        });
      }
    }
    const app = startApp(Failing, {
      adapter: wrap(inner, {
        fail: async () => {
          throw new Error('Connection is closed.');
        },
      }),
    });
    await enqueue(inner, 'fail-fails', 'throws', {});
    await enqueue(inner, 'fail-fails', 'no-handler', {});

    await sleep(150);
    await app.close();

    expect(unhandled).toEqual([]);
  });
});

describe('createAdapterErrorLog', () => {
  it('logs the first failure, then at most one line per interval with the count suppressed', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const log = createAdapterErrorLog(50);

    for (let i = 0; i < 5; i++) log.failed('q', 'reserve', new Error('down'));
    expect(error).toHaveBeenCalledTimes(1);
    await sleep(60);
    log.failed('q', 'reserve', new Error('down'));
    expect(error).toHaveBeenCalledTimes(2);
    expect(error.mock.calls[1][0]).toContain('4 more');

    log.failed('other', 'reserve', new Error('down'));
    expect(error).toHaveBeenCalledTimes(3);

    log.succeeded('q', 'reserve');
    expect(info).toHaveBeenCalledTimes(1);
    log.succeeded('q', 'reserve');
    expect(info).toHaveBeenCalledTimes(1);
  });
});

describe('MemoryQueueAdapter — RFC-0017 methods', () => {
  const job = (id: string): StoredJob => ({
    id,
    name: 'task',
    data: id,
    attempt: 1,
    enqueuedAt: Date.now(),
  });

  it('extend() renews only the ids still active', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('q', job('a'));
    const reserved = await adapter.reserve('q', 10);

    expect(await adapter.extend('q', ['a', 'missing'], 1_000)).toEqual(['a']);
    expect(reserved!.reservedAt).toBeGreaterThan(Date.now() + 500);
  });

  it('release() puts active ids back at the head, first id first, attempt unchanged', async () => {
    const adapter = new MemoryQueueAdapter();
    for (const id of ['a', 'b', 'c']) await adapter.add('q', job(id));
    await adapter.reserve('q', 1_000);
    await adapter.reserve('q', 1_000);
    await adapter.add('q', job('d'));

    expect(await adapter.release('q', ['a', 'b'])).toEqual(['a', 'b']);
    expect(inspect(adapter, 'q').waiting).toEqual(['a', 'b', 'c', 'd']);
    expect(inspect(adapter, 'q').waitingAttempts).toEqual([1, 1, 1, 1]);
  });

  it('release() skips an id the sweeper already reclaimed', async () => {
    const adapter = new MemoryQueueAdapter();
    await adapter.add('q', job('a'));
    await adapter.reserve('q', 10);
    await adapter.sweep('q', Date.now() + 100);

    expect(await adapter.release('q', ['a'])).toEqual([]);
    expect(inspect(adapter, 'q').waiting).toEqual(['a']);
  });
});
