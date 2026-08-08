import { describe, it, expect } from 'vitest';
import { ServerApp } from '../server/app.js';
import { defineModule } from '../server/module.js';
import { Controller } from '../controller/index.js';
import { Provider } from '../di/provider.js';
import type { ModulePlugin } from '../plugin/index.js';
import type { ProviderLike } from '../di/container.js';
import type { Router } from '../router/index.js';

/**
 * `ModulePlugin.asProviders()` — plugin-declared classes (e.g.
 * `@rasenganjs/ws` gateways) becoming real DI providers instead of only
 * being reachable through the private auto-register-on-first-resolve
 * fallback. Exercised here with a generic fake plugin so this stays a
 * core-only test; `@rasenganjs/ws` covers the Gateway-specific behavior
 * (onInit firing, exportability) with the real classes.
 */

function fakePlugin(key: string): ModulePlugin {
  return {
    key,
    register() {
      // no-op — only asProviders() matters for these tests
    },
    asProviders(value) {
      return value as ProviderLike[];
    },
  };
}

describe('ModulePlugin.asProviders — plugin-declared providers', () => {
  it('a provider declared only via a plugin key still gets onInit()', async () => {
    let initialized = false;
    class LoneWorker extends Provider {
      async onInit() {
        initialized = true;
      }
    }

    const app = new ServerApp();
    app.registerPlugin(fakePlugin('workers'));
    app.registerModule(
      defineModule({ name: 'WorkModule', workers: [LoneWorker] })
    );
    app.compile();

    // compile() fires initAll() without awaiting it (fire-and-forget).
    await new Promise((r) => setTimeout(r, 10));
    expect(initialized).toBe(true);
  });

  it('a plugin-derived provider is exportable and importable like a hand-declared one', () => {
    class Worker extends Provider {
      who() {
        return 'worker';
      }
    }

    let injected: any;
    class ConsumerController extends Controller {
      constructor(worker: any) {
        super();
        injected = worker;
      }
      routes(_router: Router) {}
    }

    const workerModule = defineModule({
      name: 'WorkerModule',
      workers: [Worker],
      exports: [Worker],
    });

    const app = new ServerApp();
    app.registerPlugin(fakePlugin('workers'));
    app.registerModule(
      defineModule({
        name: 'AppModule',
        imports: [workerModule],
        controllers: [ConsumerController],
      })
    );
    app.compile();

    expect(injected).toBeInstanceOf(Worker);
  });

  it('a plugin-derived provider is INVISIBLE without an import, same as a hand-declared one', () => {
    class Worker extends Provider {}
    class ConsumerController extends Controller {
      constructor(worker: any) {
        super();
        void worker;
      }
      routes(_router: Router) {}
    }

    const workerModule = defineModule({
      name: 'WorkerModule',
      workers: [Worker],
      exports: [Worker],
    });

    const app = new ServerApp();
    app.registerPlugin(fakePlugin('workers'));
    // No imports relationship — same violation scoped-di.test.ts covers
    // for hand-declared providers.
    expect(() => {
      app.registerModule(workerModule);
      app.registerModule(
        defineModule({ name: 'AppModule', controllers: [ConsumerController] })
      );
      app.compile();
    }).toThrow(/not visible/);
  });

  it('an explicit `providers` entry wins over the plugin-derived one for the same token', () => {
    class Worker extends Provider {
      tag = 'default';
    }
    const marker = new Worker();
    marker.tag = 'explicit-override';

    let injected: any;
    class ConsumerController extends Controller {
      constructor(worker: any) {
        super();
        injected = worker;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(fakePlugin('workers'));
    app.registerModule(
      defineModule({
        name: 'M',
        providers: [{ provide: Worker, useValue: marker }],
        workers: [Worker],
        controllers: [ConsumerController],
      })
    );
    app.compile();

    expect(injected).toBe(marker);
    expect(injected.tag).toBe('explicit-override');
  });
});
