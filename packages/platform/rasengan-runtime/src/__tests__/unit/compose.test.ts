import { describe, it, expect, vi } from 'vitest';
import { compose } from '../../middlewares/compose.js';
import { createContext } from '../../context/index.js';
import type { Context } from '../../context/types.js';

function createCtx(): Context {
  return createContext(new Request('http://localhost'));
}

describe('compose', () => {
  it('calls next when middleware array is empty', async () => {
    const middleware = compose([]);
    const ctx = createCtx();
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const res = await middleware(ctx, next);
    expect(next).toHaveBeenCalledOnce();
    expect(await res.text()).toBe('ok');
  });

  it('calls a single middleware that delegates to next', async () => {
    const middleware = compose([
      async (ctx, next) => {
        const res = await next();
        return res;
      },
    ]);
    const ctx = createCtx();
    const res = await middleware(ctx, () =>
      Promise.resolve(new Response('ok'))
    );
    expect(await res.text()).toBe('ok');
  });

  it('runs middlewares in onion order', async () => {
    const order: string[] = [];
    const middleware = compose([
      async (ctx, next) => {
        order.push('a-in');
        const res = await next();
        order.push('a-out');
        return res;
      },
      async (ctx, next) => {
        order.push('b-in');
        const res = await next();
        order.push('b-out');
        return res;
      },
      async (ctx, next) => {
        order.push('c-in');
        const res = await next();
        order.push('c-out');
        return res;
      },
    ]);

    await middleware(createCtx(), () => {
      order.push('handler');
      return Promise.resolve(new Response('ok'));
    });

    expect(order).toEqual([
      'a-in',
      'b-in',
      'c-in',
      'handler',
      'c-out',
      'b-out',
      'a-out',
    ]);
  });

  it('throws when next() is called multiple times', async () => {
    const middleware = compose([
      async (ctx, next) => {
        const first = await next();
        // Second call should throw
        await expect(next()).rejects.toThrow('next() called multiple times');
        return first;
      },
    ]);

    const res = await middleware(createCtx(), () =>
      Promise.resolve(new Response('ok'))
    );
    expect(await res.text()).toBe('ok');
  });

  it('throws when no handler and no next are provided', async () => {
    const middleware = compose([async (ctx, next) => next()]);

    await expect(middleware(createCtx())).rejects.toThrow(
      'No handler found for request'
    );
  });

  it('awaits async middlewares', async () => {
    const middleware = compose([
      async (ctx, next) => {
        await new Promise((r) => setTimeout(r, 5));
        return next();
      },
    ]);

    const res = await middleware(createCtx(), () =>
      Promise.resolve(new Response('async'))
    );
    expect(await res.text()).toBe('async');
  });

  it('propagates errors thrown by middleware', async () => {
    const middleware = compose([
      async () => {
        throw new Error('mw error');
      },
    ]);

    await expect(middleware(createCtx())).rejects.toThrow('mw error');
  });
});
