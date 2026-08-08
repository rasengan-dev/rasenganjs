import { describe, it, expect, vi } from 'vitest';
import { flatApiRoutes } from '../../../routing/utils/flat-api-routes.js';

function ctx(method: string, url: string): any {
  return { request: new Request(url, { method }), params: {} };
}

const fallback = () =>
  Promise.resolve(new Response('fallthrough', { status: 404 }));

describe('flatApiRoutes', () => {
  it('mounts a static route under the given prefix', async () => {
    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/health.route.ts': async () => ({
          GET: async () => new Response('ok'),
        }),
      }),
      { prefix: '/api' }
    );

    const res = await router.middleware()(
      ctx('GET', 'http://x/api/health'),
      fallback
    );

    expect(res.status).toBe(200);
    expect(await res.text()).toBe('ok');
  });

  it('defaults to the /api prefix when none is given', async () => {
    const router = await flatApiRoutes(() => ({
      '/src/app/_api/health.route.ts': async () => ({
        GET: async () => new Response('ok'),
      }),
    }));

    const res = await router.middleware()(
      ctx('GET', 'http://x/api/health'),
      fallback
    );
    expect(res.status).toBe(200);
  });

  it('binds index.route.ts to its own folder path', async () => {
    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/users/index.route.ts': async () => ({
          GET: async () => new Response('list'),
        }),
      }),
      { prefix: '/api' }
    );

    const res = await router.middleware()(
      ctx('GET', 'http://x/api/users'),
      fallback
    );
    expect(await res.text()).toBe('list');
  });

  it('resolves a dynamic [param] segment into ctx.params', async () => {
    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/users/[id].route.ts': async () => ({
          GET: async (c: any) => new Response('user:' + c.params.id),
        }),
      }),
      { prefix: '/api' }
    );

    const res = await router.middleware()(
      ctx('GET', 'http://x/api/users/42'),
      fallback
    );
    expect(await res.text()).toBe('user:42');
  });

  it('a route group folder contributes no URL segment but still scopes its middleware', async () => {
    const calls: string[] = [];

    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/webhooks/(stripe)/middleware.ts': async () => ({
          default: [
            async (_c: any, next: any) => {
              calls.push('stripe-mw');
              return next();
            },
          ],
        }),
        '/src/app/_api/webhooks/(stripe)/payment.route.ts': async () => ({
          POST: async () => new Response('paid'),
        }),
      }),
      { prefix: '/api' }
    );

    const res = await router.middleware()(
      ctx('POST', 'http://x/api/webhooks/payment'),
      fallback
    );

    expect(await res.text()).toBe('paid');
    expect(calls).toEqual(['stripe-mw']);
  });

  it('composes ancestor middleware with a nested folder middleware, in order', async () => {
    const order: string[] = [];

    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/middleware.ts': async () => ({
          default: [
            async (_c: any, next: any) => {
              order.push('root');
              return next();
            },
          ],
        }),
        '/src/app/_api/users/middleware.ts': async () => ({
          default: async (_c: any, next: any) => {
            order.push('users');
            return next();
          },
        }),
        '/src/app/_api/users/index.route.ts': async () => ({
          GET: async () => new Response('ok'),
        }),
      }),
      { prefix: '/api' }
    );

    await router.middleware()(ctx('GET', 'http://x/api/users'), fallback);

    expect(order).toEqual(['root', 'users']);
  });

  it('two different route-group folders stay distinct despite both contributing "" to the URL', async () => {
    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/(a)/one.route.ts': async () => ({
          GET: async () => new Response('one'),
        }),
        '/src/app/_api/(b)/two.route.ts': async () => ({
          GET: async () => new Response('two'),
        }),
      }),
      { prefix: '/api' }
    );

    const one = await router.middleware()(
      ctx('GET', 'http://x/api/one'),
      fallback
    );
    const two = await router.middleware()(
      ctx('GET', 'http://x/api/two'),
      fallback
    );

    expect(await one.text()).toBe('one');
    expect(await two.text()).toBe('two');
  });

  it('responds 405 (not next()) for a matched path with an unregistered method', async () => {
    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/health.route.ts': async () => ({
          GET: async () => new Response('ok'),
        }),
      }),
      { prefix: '/api' }
    );

    const res = await router.middleware()(
      ctx('POST', 'http://x/api/health'),
      fallback
    );
    expect(res.status).toBe(405);
  });

  it('falls through to next() for a genuinely unmatched path', async () => {
    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/health.route.ts': async () => ({
          GET: async () => new Response('ok'),
        }),
      }),
      { prefix: '/api' }
    );

    const res = await router.middleware()(
      ctx('GET', 'http://x/api/does-not-exist'),
      fallback
    );
    expect(res.status).toBe(404);
    expect(await res.text()).toBe('fallthrough');
  });

  it('warns and ignores an export that is not a recognized HTTP method', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const router = await flatApiRoutes(
      () => ({
        '/src/app/_api/health.route.ts': async () => ({
          GET: async () => new Response('ok'),
          NOTAMETHOD: async () => new Response('should be ignored'),
        }),
      }),
      { prefix: '/api' }
    );

    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][0]).toContain('NOTAMETHOD');

    warn.mockRestore();
  });
});
