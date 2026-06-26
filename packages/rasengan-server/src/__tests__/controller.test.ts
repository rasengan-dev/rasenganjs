import { describe, it, expect } from 'vitest';
import type { Middleware } from '@rasenganjs/runtime';
import { Controller } from '../controller/index.js';

describe('Controller', () => {
  it('middlewares defaults to empty array', () => {
    class TestController extends Controller {
      routes() {}
    }

    const instance = new TestController();
    expect(instance.middlewares).toEqual([]);
  });

  it('middlewares can be overridden in subclass', () => {
    const mw: Middleware = async (ctx, next) => next();

    class AuthController extends Controller {
      middlewares = [mw];

      routes() {}
    }

    const instance = new AuthController();
    expect(instance.middlewares).toHaveLength(1);
    expect(instance.middlewares[0]).toBe(mw);
  });

  it('retains abstract routes method contract', () => {
    class TestController extends Controller {
      routes() {
        return 'called';
      }
    }

    const instance = new TestController();
    expect(instance.routes()).toBe('called');
  });
});
