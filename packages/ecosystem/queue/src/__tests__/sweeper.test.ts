import { describe, it, expect } from 'vitest';
import { ServerApp, defineModule } from '@rasenganjs/server';
import {
  Queue,
  JobRouter,
  createQueuePlugin,
  MemoryQueueAdapter,
} from '../index.js';
import type { QueueAdapter } from '../types.js';

/** Wraps a real MemoryQueueAdapter, recording every sweep() call's queue name. */
function spySweepAdapter(): QueueAdapter & { sweepCalls: string[] } {
  const inner = new MemoryQueueAdapter();
  const sweepCalls: string[] = [];
  return {
    sweepCalls,
    add: inner.add.bind(inner),
    reserve: inner.reserve.bind(inner),
    complete: inner.complete.bind(inner),
    fail: inner.fail.bind(inner),
    getDead: inner.getDead.bind(inner),
    retryDead: inner.retryDead.bind(inner),
    async sweep(queue, now) {
      sweepCalls.push(queue);
      return inner.sweep(queue, now);
    },
  };
}

describe('sweeper (RFC-0004 Phase 2)', () => {
  it('calls adapter.sweep() for every registered queue at the configured sweepInterval', async () => {
    const adapter = spySweepAdapter();
    class OneQueue extends Queue {
      name = 'one';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ adapter, sweepInterval: 20 }));
    app.registerModule(defineModule({ name: 'M', queues: [OneQueue] }));
    app.compile();

    await new Promise((r) => setTimeout(r, 50));
    expect(adapter.sweepCalls).toContain('one');

    await app.close();
  });

  it('shares one sweeper across multiple queues registered by the same plugin instance', async () => {
    const adapter = spySweepAdapter();
    class QueueA extends Queue {
      name = 'a';
      jobs(_router: JobRouter) {}
    }
    class QueueB extends Queue {
      name = 'b';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ adapter, sweepInterval: 20 }));
    app.registerModule(defineModule({ name: 'M', queues: [QueueA, QueueB] }));
    app.compile();

    await new Promise((r) => setTimeout(r, 50));
    expect(adapter.sweepCalls).toContain('a');
    expect(adapter.sweepCalls).toContain('b');

    await app.close();
  });

  it('worker: false does not start a sweeper', async () => {
    const adapter = spySweepAdapter();
    class OneQueue extends Queue {
      name = 'one';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(
      createQueuePlugin({ adapter, worker: false, sweepInterval: 20 })
    );
    app.registerModule(defineModule({ name: 'M', queues: [OneQueue] }));
    app.compile();

    await new Promise((r) => setTimeout(r, 50));
    expect(adapter.sweepCalls).toEqual([]);

    await app.close();
  });

  it('stops the sweeper on app.close(), same lifecycle discipline as the worker loop', async () => {
    const adapter = spySweepAdapter();
    class OneQueue extends Queue {
      name = 'one';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin({ adapter, sweepInterval: 15 }));
    app.registerModule(defineModule({ name: 'M', queues: [OneQueue] }));
    app.compile();

    await new Promise((r) => setTimeout(r, 40));
    await app.close();

    const countAfterClose = adapter.sweepCalls.length;
    await new Promise((r) => setTimeout(r, 40));
    expect(adapter.sweepCalls.length).toBe(countAfterClose);
  });
});
