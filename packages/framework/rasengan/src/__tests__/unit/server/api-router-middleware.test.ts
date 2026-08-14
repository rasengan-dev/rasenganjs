import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Router, json } from '@rasenganjs/futon';
import {
  createApiRouterMiddleware,
  isHttpErrorLike,
} from '../../../server/node/api-router-middleware.js';
import { resolveBuildOptions } from '../../../server/build/index.js';

function ctx(method: string, url: string): any {
  return { request: new Request(url, { method }), params: {} };
}

const fallback = () =>
  Promise.resolve(new Response('fallthrough', { status: 404 }));

describe('isHttpErrorLike', () => {
  it('is true for an Error with a numeric status property', () => {
    const err = Object.assign(new Error('nope'), { status: 404 });
    expect(isHttpErrorLike(err)).toBe(true);
  });

  it('is false for a plain Error with no status', () => {
    expect(isHttpErrorLike(new Error('boom'))).toBe(false);
  });

  it('is false for a non-Error value, even with a status field', () => {
    expect(isHttpErrorLike({ status: 404 })).toBe(false);
  });
});

describe('createApiRouterMiddleware', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rasengan-api-router-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function writeApiRouter(body: string) {
    const serverDir = path.join(tmpDir, 'server');
    fs.mkdirSync(serverDir, { recursive: true });

    const futonEntry = import.meta.resolve('@rasenganjs/futon');

    fs.writeFileSync(
      path.join(serverDir, 'api-router.js'),
      `import { Router, json, NotFoundError } from '${futonEntry}';\n${body}`,
      'utf-8'
    );
  }

  it('is a no-op passthrough when the app has no built api-router.js', async () => {
    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
    });

    const res = await middleware(ctx('GET', 'http://x/api/health'), fallback);

    expect(await res.text()).toBe('fallthrough');
  });

  it('passes through requests outside the configured prefix, even with a built router', async () => {
    writeApiRouter(`
      const router = new Router();
      router.get('/api/health', async () => json({ status: 'ok' }));
      export default router;
    `);

    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      prefix: '/api',
    });

    const res = await middleware(ctx('GET', 'http://x/pricing'), fallback);
    expect(await res.text()).toBe('fallthrough');
  });

  it('dispatches a matched route from the built router', async () => {
    writeApiRouter(`
      const router = new Router();
      router.get('/api/health', async () => json({ status: 'ok' }));
      export default router;
    `);

    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      prefix: '/api',
    });

    const res = await middleware(ctx('GET', 'http://x/api/health'), fallback);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: 'ok' });
  });

  it('responds 404 in JSON for an unmatched path under the prefix, not next()', async () => {
    writeApiRouter(`
      const router = new Router();
      router.get('/api/health', async () => json({ status: 'ok' }));
      export default router;
    `);

    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      prefix: '/api',
    });

    const res = await middleware(
      ctx('GET', 'http://x/api/does-not-exist'),
      fallback
    );

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      error: { message: 'Not Found', status: 404 },
    });
  });

  it('formats a thrown HttpError subclass as JSON with its own status/message', async () => {
    writeApiRouter(`
      const router = new Router();
      router.get('/api/boom', async () => {
        throw new NotFoundError('User 42 not found');
      });
      export default router;
    `);

    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      prefix: '/api',
    });

    const res = await middleware(ctx('GET', 'http://x/api/boom'), fallback);

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      error: { message: 'User 42 not found', status: 404 },
    });
  });

  it('hides the real message for a plain thrown Error in production', async () => {
    writeApiRouter(`
      const router = new Router();
      router.get('/api/boom', async () => {
        throw new Error('leaked internal detail');
      });
      export default router;
    `);

    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      prefix: '/api',
    });

    const previousEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    try {
      const res = await middleware(ctx('GET', 'http://x/api/boom'), fallback);
      const body = await res.json();

      expect(res.status).toBe(500);
      expect(body.error.message).toBe('Internal Server Error');
      expect(body.error.message).not.toContain('leaked internal detail');
    } finally {
      process.env.NODE_ENV = previousEnv;
    }
  });

  it('shows the real message for a plain thrown Error outside production', async () => {
    writeApiRouter(`
      const router = new Router();
      router.get('/api/boom', async () => {
        throw new Error('a helpful dev-only detail');
      });
      export default router;
    `);

    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      prefix: '/api',
    });

    const previousEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    try {
      const res = await middleware(ctx('GET', 'http://x/api/boom'), fallback);
      const body = await res.json();

      expect(res.status).toBe(500);
      expect(body.error.message).toBe('a helpful dev-only detail');
    } finally {
      process.env.NODE_ENV = previousEnv;
    }
  });

  it('uses a pre-loaded router from `modules` instead of fs.existsSync + dynamic import (RFC-0009)', async () => {
    const apiRouter = new Router();
    apiRouter.get('/api/health', async () => json({ status: 'ok' }));

    // Points at an empty directory with no api-router.js at all — proves
    // the middleware never touches the filesystem when `modules` is set.
    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      prefix: '/api',
      modules: { apiRouter },
    });

    const matched = await middleware(
      ctx('GET', 'http://x/api/health'),
      fallback
    );
    expect(matched.status).toBe(200);
    expect(await matched.json()).toEqual({ status: 'ok' });

    const outsidePrefix = await middleware(
      ctx('GET', 'http://x/pricing'),
      fallback
    );
    expect(await outsidePrefix.text()).toBe('fallthrough');
  });

  it('is a no-op passthrough when `modules.apiRouter` is omitted, even with `modules` set', async () => {
    const middleware = createApiRouterMiddleware({
      build: resolveBuildOptions({ buildDirectory: tmpDir }),
      modules: { apiRouter: undefined as any },
    });

    const res = await middleware(ctx('GET', 'http://x/api/health'), fallback);
    expect(await res.text()).toBe('fallthrough');
  });
});
