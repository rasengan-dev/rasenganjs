import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  Context,
  Middleware,
  Router as RuntimeRouter,
} from '@rasenganjs/runtime';
import { Router, type RouteHandler } from '../router/index.js';

function mockRuntimeRouter(): RuntimeRouter {
  const subRouter = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  } as unknown as RuntimeRouter;

  const router = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    group: vi.fn((_opts: any, callback: (r: RuntimeRouter) => void) => {
      callback(subRouter);
      return router;
    }),
    use: vi.fn(),
    middleware: vi.fn(),
  } as unknown as RuntimeRouter & { group: ReturnType<typeof vi.fn> };

  return router;
}

describe('Router', () => {
  let runtimeRouter: ReturnType<typeof mockRuntimeRouter>;
  let serverRouter: Router;
  let handler: RouteHandler;

  beforeEach(() => {
    runtimeRouter = mockRuntimeRouter() as any;
    serverRouter = new Router(runtimeRouter as unknown as RuntimeRouter);
    handler = vi.fn() as unknown as RouteHandler;
  });

  describe('without middleware', () => {
    it('delegates GET to runtime router', () => {
      serverRouter.get('/users', handler);
      expect(runtimeRouter.get).toHaveBeenCalledWith(
        '/users',
        expect.any(Function)
      );
    });

    it('delegates POST to runtime router', () => {
      serverRouter.post('/users', handler);
      expect(runtimeRouter.post).toHaveBeenCalledWith(
        '/users',
        expect.any(Function)
      );
    });

    it('delegates PUT to runtime router', () => {
      serverRouter.put('/users/:id', handler);
      expect(runtimeRouter.put).toHaveBeenCalledWith(
        '/users/:id',
        expect.any(Function)
      );
    });

    it('delegates PATCH to runtime router', () => {
      serverRouter.patch('/users/:id', handler);
      expect(runtimeRouter.patch).toHaveBeenCalledWith(
        '/users/:id',
        expect.any(Function)
      );
    });

    it('delegates DELETE to runtime router', () => {
      serverRouter.delete('/users/:id', handler);
      expect(runtimeRouter.delete).toHaveBeenCalledWith(
        '/users/:id',
        expect.any(Function)
      );
    });

    it('wraps handler in Promise.resolve', async () => {
      const syncHandler: RouteHandler = () => new Response('ok');
      serverRouter.get('/test', syncHandler);

      const wrapped = (runtimeRouter.get as any).mock.calls[0][1];
      const result = await wrapped({} as Context);
      expect(result).toBeInstanceOf(Response);
    });
  });

  describe('with single middleware', () => {
    it('calls group with middleware', () => {
      const mw: Middleware = async (ctx, next) => next();
      serverRouter.get('/users', mw, handler);

      expect(runtimeRouter.group).toHaveBeenCalledWith(
        { middlewares: [mw] },
        expect.any(Function)
      );
    });

    it('registers route inside group callback', () => {
      const mw: Middleware = async (ctx, next) => next();
      serverRouter.get('/users', mw, handler);

      const callback = (runtimeRouter.group as any).mock.calls[0][1];
      const subRouter = { get: vi.fn() } as unknown as RuntimeRouter;
      callback(subRouter);

      expect(subRouter.get).toHaveBeenCalledWith(
        '/users',
        expect.any(Function)
      );
    });
  });

  describe('with multiple middleware', () => {
    it('calls group with middleware array', () => {
      const mw1: Middleware = async (ctx, next) => next();
      const mw2: Middleware = async (ctx, next) => next();
      serverRouter.get('/users', [mw1, mw2], handler);

      expect(runtimeRouter.group).toHaveBeenCalledWith(
        { middlewares: [mw1, mw2] },
        expect.any(Function)
      );
    });
  });

  describe('mixed usage across methods', () => {
    it('supports middleware on POST', () => {
      const mw: Middleware = async (ctx, next) => next();
      serverRouter.post('/users', mw, handler);

      expect(runtimeRouter.group).toHaveBeenCalledWith(
        { middlewares: [mw] },
        expect.any(Function)
      );
    });

    it('supports middleware on DELETE', () => {
      const mw: Middleware = async (ctx, next) => next();
      serverRouter.delete('/users/:id', mw, handler);

      expect(runtimeRouter.group).toHaveBeenCalledWith(
        { middlewares: [mw] },
        expect.any(Function)
      );
    });

    it('no middleware on PUT still delegates directly', () => {
      serverRouter.put('/users/:id', handler);
      expect(runtimeRouter.put).toHaveBeenCalled();
      expect(runtimeRouter.group).not.toHaveBeenCalled();
    });
  });
});
