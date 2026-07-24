import { describe, it, expect } from 'vitest';
import {
  ServerApp,
  defineModule,
  Controller,
  Provider,
  type Router,
} from '@rasenganjs/server';
import { Queue, JobRouter, createQueuePlugin } from '../index.js';

/**
 * Queue extends Provider, and createQueuePlugin() implements
 * ModulePlugin.asProviders() — so a queue declared via
 * `defineModule({ queues: [...] })` alone (no `providers` entry) is a
 * real DI provider: onInit()/onDestroy() fire, and it can be exported
 * for another module to inject and call `.add()` on.
 */

describe('Queue as a real DI provider', () => {
  it('onInit()/onDestroy() fire for a queue declared only via `queues`', async () => {
    const events: string[] = [];
    class InitQueue extends Queue {
      name = 'init';
      async onInit() {
        events.push('init');
      }
      async onDestroy() {
        events.push('destroy');
      }
      jobs(_router: JobRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(defineModule({ name: 'M', queues: [InitQueue] }));
    app.compile();

    // compile() fires initAll() without awaiting it (fire-and-forget).
    await new Promise((r) => setTimeout(r, 10));
    expect(events).toEqual(['init']);

    await app.close();
    expect(events).toEqual(['init', 'destroy']);
  });

  it('a queue is exportable — another module can inject the same instance and call .add()', async () => {
    class SharedQueue extends Queue {
      name = 'shared';
      jobs(router: JobRouter) {
        router.process('ping', async () => {});
      }
    }

    const queueModule = defineModule({
      name: 'QueueModule',
      queues: [SharedQueue],
      exports: [SharedQueue],
    });

    let injected: SharedQueue | undefined;
    class ProducerController extends Controller {
      constructor(sharedQueue: SharedQueue) {
        super();
        injected = sharedQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({
        name: 'HttpModule',
        imports: [queueModule],
        controllers: [ProducerController],
      })
    );
    app.compile();

    expect(injected).toBeInstanceOf(SharedQueue);
    // Same singleton the plugin wired a handle onto, not a second,
    // disconnected instance.
    await expect(injected!.add('ping', {})).resolves.toEqual(
      expect.any(String)
    );

    await app.close();
  });

  it("app.close() awaits in-flight jobs before an unrelated provider's onDestroy runs", async () => {
    const events: string[] = [];

    class SlowQueue extends Queue {
      name = 'slow';
      jobs(router: JobRouter) {
        router.process('slow-job', async () => {
          events.push('job-start');
          await new Promise((r) => setTimeout(r, 30));
          events.push('job-end');
        });
      }
    }

    class OtherProvider extends Provider {
      async onDestroy() {
        events.push('other-destroy');
      }
    }

    // The container resolves constructor params by lowercased class
    // name, not by type — the param names below must match `SlowQueue`/
    // `OtherProvider` (case-insensitively) for name-based resolution.
    let capturedSlowQueue: SlowQueue | undefined;
    class ProducerController extends Controller {
      constructor(slowQueue: SlowQueue, otherProvider: OtherProvider) {
        super();
        void otherProvider;
        capturedSlowQueue = slowQueue;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createQueuePlugin());
    app.registerModule(
      defineModule({
        name: 'M',
        queues: [SlowQueue],
        providers: [OtherProvider],
        controllers: [ProducerController],
      })
    );
    app.compile();

    await capturedSlowQueue!.add('slow-job', {});
    // Worker loop polls every 25ms — give it a chance to pick the job up
    // and start it, but not enough to let the 30ms handler finish.
    await new Promise((r) => setTimeout(r, 40));
    expect(events).toEqual(['job-start']);

    await app.close();

    expect(events).toEqual(['job-start', 'job-end', 'other-destroy']);
  });
});
