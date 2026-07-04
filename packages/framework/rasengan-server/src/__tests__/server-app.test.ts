import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ServerApp } from '../server/app.js';

describe('ServerApp — middleware layering', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('executes module → controller → route middleware in order', async () => {
    const order: string[] = [];

    const moduleMw = async (_ctx: any, next: any) => {
      order.push('module');
      return next();
    };

    const ctrlMw = async (_ctx: any, next: any) => {
      order.push('controller');
      return next();
    };

    const routeMw = async (_ctx: any, next: any) => {
      order.push('route');
      return next();
    };

    const { Controller } = await import('../controller/index.js');

    class TestController extends Controller {
      middlewares = [ctrlMw];

      routes(router: any) {
        router.get('/test', routeMw, (_ctx: any) => {
          order.push('handler');
          return new Response('ok');
        });
      }
    }

    const { defineModule } = await import('../server/module.js');

    const app = new ServerApp();
    app.registerModule(
      defineModule({
        middlewares: [moduleMw],
        controllers: [TestController],
      })
    );

    const runtime = app.compile();
    const response = await runtime.fetch(new Request('http://localhost/test'));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('ok');
    expect(order).toEqual(['module', 'controller', 'route', 'handler']);
  });

  it('passes through module prefix to routes', async () => {
    const order: string[] = [];

    const moduleMw = async (_ctx: any, next: any) => {
      order.push('module');
      return next();
    };

    const { Controller } = await import('../controller/index.js');

    class PrefixedController extends Controller {
      routes(router: any) {
        router.get('/hello', (_ctx: any) => {
          order.push('handler');
          return new Response('prefixed');
        });
      }
    }

    const { defineModule } = await import('../server/module.js');

    const app = new ServerApp();
    app.registerModule(
      defineModule({
        prefix: '/api',
        middlewares: [moduleMw],
        controllers: [PrefixedController],
      })
    );

    const runtime = app.compile();
    const response = await runtime.fetch(
      new Request('http://localhost/api/hello')
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('prefixed');
    expect(order).toEqual(['module', 'handler']);
  });

  it('works with controller-level middleware only', async () => {
    const order: string[] = [];

    const ctrlMw = async (_ctx: any, next: any) => {
      order.push('controller');
      return next();
    };

    const { Controller } = await import('../controller/index.js');

    class CtrlOnlyController extends Controller {
      middlewares = [ctrlMw];

      routes(router: any) {
        router.get('/', (_ctx: any) => {
          order.push('handler');
          return new Response('ctrl-only');
        });
      }
    }

    const { defineModule } = await import('../server/module.js');

    const app = new ServerApp();
    app.registerModule(
      defineModule({
        controllers: [CtrlOnlyController],
      })
    );

    const runtime = app.compile();
    const response = await runtime.fetch(new Request('http://localhost/'));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('ctrl-only');
    expect(order).toEqual(['controller', 'handler']);
  });

  it('works with route-level middleware only', async () => {
    const order: string[] = [];

    const routeMw = async (_ctx: any, next: any) => {
      order.push('route');
      return next();
    };

    const { Controller } = await import('../controller/index.js');

    class RouteOnlyController extends Controller {
      routes(router: any) {
        router.get('/data', routeMw, (_ctx: any) => {
          order.push('handler');
          return new Response('route-only');
        });
      }
    }

    const { defineModule } = await import('../server/module.js');

    const app = new ServerApp();
    app.registerModule(
      defineModule({
        controllers: [RouteOnlyController],
      })
    );

    const runtime = app.compile();
    const response = await runtime.fetch(new Request('http://localhost/data'));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('route-only');
    expect(order).toEqual(['route', 'handler']);
  });
});

describe('ServerApp — module and handler registration', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('compile() returns a Futon instance', async () => {
    const app = new ServerApp();
    const runtime = app.compile();

    expect(runtime).toBeDefined();
    const response = await runtime.fetch(new Request('http://localhost/'));
    expect(response.status).toBe(404);
  });

  it('handles 404 for unknown routes', async () => {
    const app = new ServerApp();
    const runtime = app.compile();

    const response = await runtime.fetch(new Request('http://localhost/nope'));
    expect(response.status).toBe(404);
  });

  it('accepts a module factory function', async () => {
    const { Controller } = await import('../controller/index.js');

    class FactoryController extends Controller {
      routes(router: any) {
        router.get('/factory', () => new Response('factory'));
      }
    }

    const { defineModule } = await import('../server/module.js');

    const app = new ServerApp();
    app.registerModule(() =>
      defineModule({
        controllers: [FactoryController],
      })
    );

    const runtime = app.compile();
    const response = await runtime.fetch(
      new Request('http://localhost/factory')
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('factory');
  });

  it('supports multiple controllers in one module', async () => {
    const { Controller } = await import('../controller/index.js');

    class AlphaController extends Controller {
      routes(router: any) {
        router.get('/alpha', () => new Response('alpha'));
      }
    }

    class BetaController extends Controller {
      routes(router: any) {
        router.get('/beta', () => new Response('beta'));
      }
    }

    const { defineModule } = await import('../server/module.js');

    const app = new ServerApp();
    app.registerModule(
      defineModule({
        controllers: [AlphaController, BetaController],
      })
    );

    const runtime = app.compile();

    const res1 = await runtime.fetch(new Request('http://localhost/alpha'));
    expect(res1.status).toBe(200);
    expect(await res1.text()).toBe('alpha');

    const res2 = await runtime.fetch(new Request('http://localhost/beta'));
    expect(res2.status).toBe(200);
    expect(await res2.text()).toBe('beta');
  });
});
