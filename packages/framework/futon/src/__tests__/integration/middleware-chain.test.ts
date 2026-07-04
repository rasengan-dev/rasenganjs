import { describe, it, expect, vi } from 'vitest';
import { compose } from '../../middlewares/compose.js';
import { createContext } from '../../context/index.js';
import type { Context } from '../../context/types.js';

function createCtx(): Context {
  return createContext(new Request('http://localhost'));
}

describe('middleware chain (integration)', () => {
  it('empty chain calls next directly', async () => {
    const chain = compose([]);
    const ctx = createCtx();
    const res = await chain(ctx, () => Promise.resolve(new Response('empty')));
    expect(await res.text()).toBe('empty');
  });

  it('single middleware can modify the response on the way back', async () => {
    const chain = compose([
      async (ctx, next) => {
        const res = await next();
        return new Response(res.body, {
          ...res,
          headers: { 'x-modified': 'true' },
        });
      },
    ]);
    const ctx = createCtx();
    const res = await chain(ctx, () =>
      Promise.resolve(new Response('original'))
    );
    expect(res.headers.get('x-modified')).toBe('true');
    expect(await res.text()).toBe('original');
  });

  it('middleware can short-circuit the chain', async () => {
    const chain = compose([
      async () => new Response('short-circuit', { status: 403 }),
      async () => {
        throw new Error('should not reach');
      },
    ]);
    const ctx = createCtx();
    const res = await chain(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.status).toBe(403);
    expect(await res.text()).toBe('short-circuit');
  });

  it('middleware can set values on ctx.state for downstream', async () => {
    const chain = compose([
      async (ctx, next) => {
        ctx.set('user', { role: 'admin' });
        return next();
      },
      async (ctx, next) => {
        const user = ctx.get<{ role: string }>('user');
        if (user?.role !== 'admin') {
          return new Response('forbidden', { status: 403 });
        }
        return next();
      },
    ]);
    const ctx = createCtx();
    const res = await chain(ctx, () =>
      Promise.resolve(new Response('welcome'))
    );
    expect(await res.text()).toBe('welcome');
  });

  it('error in middleware propagates and can be caught by outer middleware', async () => {
    const chain = compose([
      async (ctx, next) => {
        try {
          return await next();
        } catch (err) {
          return new Response(`caught: ${(err as Error).message}`, {
            status: 500,
          });
        }
      },
      async () => {
        throw new Error('inner crash');
      },
    ]);
    const ctx = createCtx();
    const res = await chain(ctx);
    expect(res.status).toBe(500);
    expect(await res.text()).toBe('caught: inner crash');
  });

  it('handles many middlewares without stack overflow', async () => {
    const count = 100;
    const mws = Array.from({ length: count }, (_, i) => {
      return async (ctx: Context, next: () => Promise<Response>) => {
        ctx.set(`mw${i}`, i);
        return next();
      };
    });

    const chain = compose(mws);
    const ctx = createCtx();
    const res = await chain(ctx, () => Promise.resolve(new Response('ok')));
    expect(await res.text()).toBe('ok');

    for (let i = 0; i < count; i++) {
      expect(ctx.get(`mw${i}`)).toBe(i);
    }
  });

  it('throws if next() is called more than once', async () => {
    const chain = compose([
      async (ctx, next) => {
        const first = await next();
        await expect(next()).rejects.toThrow('next() called multiple times');
        return first;
      },
    ]);
    const ctx = createCtx();
    const res = await chain(ctx, () => Promise.resolve(new Response('ok')));
    expect(await res.text()).toBe('ok');
  });

  it('throws if no handler and no next fallback', async () => {
    const chain = compose([async (ctx, next) => next()]);
    const ctx = createCtx();
    await expect(chain(ctx)).rejects.toThrow('No handler found for request');
  });
});
