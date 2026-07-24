import { describe, it, expect } from 'vitest';
import { ServerApp, defineModule } from '@rasenganjs/server';
import { Queue, JobRouter, createQueuePlugin } from '../index.js';

describe('createQueuePlugin — registration validation', () => {
  it('throws when a registered class does not extend Queue', () => {
    class NotAQueue {
      name = 'oops';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({
        name: 'M',
        // @ts-expect-error — deliberately wrong type, exercising the
        // runtime guard for a plugin misuse the type system would
        // normally catch first.
        queues: [NotAQueue],
      })
    );

    expect(() => app.compile()).toThrow(/does not extend `Queue`/);
  });

  it('throws when a Queue subclass is missing `name`', () => {
    class NoName extends Queue {
      // @ts-expect-error — deliberately omitted for the runtime check.
      name = undefined;
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(defineModule({ name: 'M', queues: [NoName] }));

    expect(() => app.compile()).toThrow(/missing a `name`/);
  });

  it('throws when a Queue subclass is missing a `jobs(router)` method', () => {
    class NoJobs extends Queue {
      name = 'no-jobs';
      // @ts-expect-error — deliberately omitted for the runtime check.
      jobs = undefined;
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(defineModule({ name: 'M', queues: [NoJobs] }));

    expect(() => app.compile()).toThrow(/missing a `jobs\(router\)` method/);
  });

  it('Queue.jobs() throwing on a duplicate job name surfaces during registration, not silently swallowed', () => {
    class DuplicateJobs extends Queue {
      name = 'dupes';
      jobs(router: JobRouter) {
        router.process('ping', async () => {});
        router.process('ping', async () => {});
      }
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(defineModule({ name: 'M', queues: [DuplicateJobs] }));

    expect(() => app.compile()).toThrow(/already registered/);
  });

  it('throws when a module declares `queues` without registering createQueuePlugin', () => {
    class SomeQueue extends Queue {
      name = 'some';
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    // No app.registerPlugin(createQueuePlugin()) call.
    app.registerModule(defineModule({ name: 'M', queues: [SomeQueue] }));

    expect(() => app.compile()).toThrow();
  });
});
