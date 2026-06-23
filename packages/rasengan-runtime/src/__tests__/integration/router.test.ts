import { describe, it, expect, vi } from 'vitest';
import { Router } from '../../router/index.js';
import { json, text } from '../../response/utils.js';
import type { Context } from '../../context/types.js';

function createCtx(method: string, path: string): Context {
  return {
    request: new Request(`http://localhost${path}`, { method }),
    params: {},
    runtime: {},
    state: {},
    set: vi.fn(),
    get: vi.fn(),
  };
}

describe('Router (integration)', () => {
  it('dispatches to the correct route by method and path', async () => {
    const router = new Router();
    router.get('/items', async () => json({ items: [] }));
    router.post('/items', async () => json({ created: true }));

    const mw = router.middleware();

    const getCtx = createCtx('GET', '/items');
    const getRes = await mw(getCtx, () => Promise.resolve(text('fallback')));
    expect(await getRes.json()).toEqual({ items: [] });

    const postCtx = createCtx('POST', '/items');
    const postRes = await mw(postCtx, () => Promise.resolve(text('fallback')));
    expect(await postRes.json()).toEqual({ created: true });
  });

  it('falls through to next() when no route matches', async () => {
    const router = new Router();
    router.get('/items', async () => json({}));

    const mw = router.middleware();
    const ctx = createCtx('GET', '/other');
    const next = vi.fn().mockResolvedValue(text('fallback'));

    const res = await mw(ctx, next);
    expect(await res.text()).toBe('fallback');
    expect(next).toHaveBeenCalledOnce();
  });

  it('sets ctx.params on matched routes', async () => {
    const router = new Router();
    router.get('/users/:id', async (ctx) => json({ id: ctx.params.id }));

    const mw = router.middleware();
    const ctx = createCtx('GET', '/users/99');

    const res = await mw(ctx, () => Promise.resolve(text('fallback')));
    expect(ctx.params).toEqual({ id: '99' });
    expect(await res.json()).toEqual({ id: '99' });
  });

  it('runs route-level middleware before handler (onion)', async () => {
    const router = new Router();
    const order: string[] = [];

    router.use(async (ctx, next) => {
      order.push('mw-in');
      const res = await next();
      order.push('mw-out');
      return res;
    });
    router.get('/test', async () => {
      order.push('handler');
      return text('ok');
    });

    const mw = router.middleware();
    const ctx = createCtx('GET', '/test');

    await mw(ctx, () => Promise.resolve(text('fallback')));

    expect(order).toEqual(['mw-in', 'handler', 'mw-out']);
  });

  it('supports route groups with prefix', async () => {
    const router = new Router();
    router.group('/api/v1', (api) => {
      api.get('/users', async () => json({ users: [] }));
    });

    const mw = router.middleware();
    const ctx = createCtx('GET', '/api/v1/users');

    const res = await mw(ctx, () => Promise.resolve(text('fallback')));
    expect(await res.json()).toEqual({ users: [] });
  });

  it('supports nested route groups', async () => {
    const router = new Router();
    router.group('/api', (api) => {
      api.group('/v2', (v2) => {
        v2.get('/status', async () => json({ version: 2 }));
      });
    });

    const mw = router.middleware();
    const ctx = createCtx('GET', '/api/v2/status');

    const res = await mw(ctx, () => Promise.resolve(text('fallback')));
    expect(await res.json()).toEqual({ version: 2 });
  });

  it('applies group-level middleware to all routes in the group', async () => {
    const router = new Router();
    const log: string[] = [];

    router.group(
      '/admin',
      {
        middlewares: [
          async (ctx, next) => {
            log.push('auth');
            return next();
          },
        ],
      },
      (admin) => {
        admin.get('/dashboard', async () => {
          log.push('dashboard');
          return text('admin');
        });
      }
    );

    const mw = router.middleware();
    const ctx = createCtx('GET', '/admin/dashboard');

    await mw(ctx, () => Promise.resolve(text('fallback')));
    expect(log).toEqual(['auth', 'dashboard']);
  });

  it('group middleware does not leak outside the group', async () => {
    const router = new Router();
    const log: string[] = [];

    router.group(
      '/admin',
      {
        middlewares: [
          async (ctx, next) => {
            log.push('auth');
            return next();
          },
        ],
      },
      (admin) => {
        admin.get('/dashboard', async () => {
          log.push('dashboard');
          return text('admin');
        });
      }
    );

    router.get('/public', async () => {
      log.push('public');
      return text('public');
    });

    const mw = router.middleware();

    await mw(createCtx('GET', '/public'), () =>
      Promise.resolve(text('fallback'))
    );
    expect(log).toEqual(['public']);
  });

  it('routesCount returns correct number', () => {
    const router = new Router();
    expect(router.routesCount()).toBe(0);
    router.get('/a', async () => text('a'));
    router.post('/b', async () => text('b'));
    expect(router.routesCount()).toBe(2);
  });
});
