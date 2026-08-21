import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ServerApp } from '../server/app.js';
import { defineModule } from '../server/module.js';
import { Provider } from '../di/provider.js';
import type { ModulePlugin } from '../plugin/index.js';

describe('ServerApp — module plugins', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('forwards a module extension key to the plugin that claims it', () => {
    const received: unknown[] = [];
    const plugin: ModulePlugin = {
      key: 'gateways',
      register(_app, _container, _mod, value) {
        received.push(value);
      },
    };

    const app = new ServerApp();
    app.registerPlugin(plugin);
    app.registerModule(
      defineModule({
        gateways: ['ChatGateway'],
      })
    );

    app.compile();

    expect(received).toEqual([['ChatGateway']]);
  });

  it('resolves plugin-registered providers from the same container as controllers', async () => {
    const { Controller } = await import('../controller/index.js');

    class Service extends Provider {
      value = 'shared';
    }

    let seenValue: string | undefined;
    const plugin: ModulePlugin = {
      key: 'gateways',
      register(_app, container, _mod, value) {
        for (const _ of value as unknown[]) {
          seenValue = container.resolve(Service).value;
        }
      },
    };

    class NoopController extends Controller {
      routes() {}
    }

    const app = new ServerApp();
    app.registerPlugin(plugin);
    app.registerModule(
      defineModule({
        controllers: [NoopController],
        providers: [Service],
        gateways: ['whatever'],
      })
    );

    app.compile();

    expect(seenValue).toBe('shared');
  });

  it('throws at compile() time when a module declares a key with no matching plugin', () => {
    const app = new ServerApp();
    app.registerModule(
      defineModule({
        gateways: ['ChatGateway'],
      })
    );

    expect(() => app.compile()).toThrow(/unknown key "gateways"/);
  });

  it('throws when registering two plugins for the same key', () => {
    const app = new ServerApp();
    const pluginA: ModulePlugin = { key: 'gateways', register: () => {} };
    const pluginB: ModulePlugin = { key: 'gateways', register: () => {} };

    app.registerPlugin(pluginA);
    expect(() => app.registerPlugin(pluginB)).toThrow(/already registered/);
  });

  it('does not forward reserved ModuleConfig keys to any plugin', async () => {
    const { Controller } = await import('../controller/index.js');

    const calls: string[] = [];
    const plugin: ModulePlugin = {
      key: 'controllers',
      register() {
        calls.push('called');
      },
    };

    class NoopController extends Controller {
      routes() {}
    }

    const app = new ServerApp();
    app.registerPlugin(plugin);
    app.registerModule(
      defineModule({
        controllers: [NoopController],
      })
    );

    app.compile();

    expect(calls).toEqual([]);
  });

  it('runs middleware a plugin registers via app.use() during register(), ahead of a matched controller route', async () => {
    const { Controller } = await import('../controller/index.js');

    const order: string[] = [];

    const plugin: ModulePlugin = {
      key: 'gateways',
      register(app) {
        // register() runs during dispatchPlugins(), after compile() has
        // already created the real Futon instance — this is exactly the
        // call ServerApp.compile()'s middlewareList drain used to make
        // dead on arrival.
        app.use(async (_ctx, next) => {
          order.push('plugin-middleware');
          return next();
        });
      },
    };

    class NoopController extends Controller {
      routes(router: any) {
        router.get('/test', (_ctx: any) => {
          order.push('handler');
          return new Response('ok');
        });
      }
    }

    const app = new ServerApp();
    app.registerPlugin(plugin);
    app.registerModule(
      defineModule({
        controllers: [NoopController],
        gateways: ['whatever'],
      })
    );

    const runtime = app.compile();
    const response = await runtime.fetch(new Request('http://localhost/test'));

    expect(response.status).toBe(200);
    expect(order).toEqual(['plugin-middleware', 'handler']);
  });

  it('forwards extension keys from nested (imported) modules too', () => {
    const received: unknown[] = [];
    const plugin: ModulePlugin = {
      key: 'gateways',
      register(_app, _container, _mod, value) {
        received.push(value);
      },
    };

    const child = defineModule({ gateways: ['ChildGateway'] });
    const parent = defineModule({ imports: [child] });

    const app = new ServerApp();
    app.registerPlugin(plugin);
    app.registerModule(parent);

    app.compile();

    expect(received).toEqual([['ChildGateway']]);
  });
});
