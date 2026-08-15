import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Futon } from '../../app/index.js';
import { json, text } from '../../response/utils.js';
import { bodyParser } from '../../middlewares/body.js';
import { cors } from '../../middlewares/cors.js';

describe('Futon (integration)', () => {
  let app: Futon;

  beforeEach(() => {
    app = new Futon();
  });

  it('responds to a registered GET route', async () => {
    app.get('/hello', async () => json({ message: 'world' }));

    const req = new Request('http://localhost/hello');
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: 'world' });
  });

  it('exposes non-string bindings via ctx.runtime.env (RFC-0013)', async () => {
    const db = { prepare: () => 'fake-d1-binding' };
    app.get('/binding', async (ctx) =>
      json({ hasDb: ctx.runtime.env?.DB === db })
    );

    const req = new Request('http://localhost/binding');
    const res = await app.fetch(req, { env: { DB: db } });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ hasDb: true });
  });

  it('types ctx.runtime.env from a declared Bindings type (RFC-0013 Phase 2)', async () => {
    type Bindings = { DB: { prepare: (sql: string) => string } };
    const db: Bindings['DB'] = { prepare: (sql) => `prepared: ${sql}` };

    const typedApp = new Futon<Bindings>();
    typedApp.get('/query', async (ctx) => {
      // No cast, no `as`, no `?.` needed — this line is the actual
      // compile-time proof: ctx.runtime.env is typed as `Bindings`,
      // not `Record<string, unknown>`, inside this handler.
      const result = ctx.runtime.env.DB.prepare('select 1');
      return json({ result });
    });

    const req = new Request('http://localhost/query');
    const res = await typedApp.fetch(req, { env: { DB: db } });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ result: 'prepared: select 1' });
  });

  it('exposes ctx.runtime.executionCtx.waitUntil when provided by the adapter (RFC-0013)', async () => {
    const waitUntil = vi.fn();
    app.get('/wait', async (ctx) => {
      ctx.runtime.executionCtx?.waitUntil(Promise.resolve('usage-event'));
      return json({ ok: true });
    });

    const req = new Request('http://localhost/wait');
    const res = await app.fetch(req, { executionCtx: { waitUntil } });

    expect(res.status).toBe(200);
    expect(waitUntil).toHaveBeenCalledTimes(1);
  });

  it('responds to a registered POST route', async () => {
    app.post('/data', async () => json({ created: true }));

    const req = new Request('http://localhost/data', { method: 'POST' });
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ created: true });
  });

  it('extracts path params from the URL', async () => {
    app.get('/users/:id', async (ctx) => json({ userId: ctx.params.id }));

    const req = new Request('http://localhost/users/42');
    const res = await app.fetch(req);

    expect(await res.json()).toEqual({ userId: '42' });
  });

  it('returns 404 for unregistered routes', async () => {
    const req = new Request('http://localhost/nonexistent');
    const res = await app.fetch(req);

    expect(res.status).toBe(404);
    expect(await res.text()).toBe('Not Found');
  });

  it('uses custom 404 handler', async () => {
    app.notFound(async () => json({ error: 'custom 404' }, { status: 404 }));

    const req = new Request('http://localhost/missing');
    const res = await app.fetch(req);

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: 'custom 404' });
  });

  it('enforces 404 status even if custom handler returns 200', async () => {
    app.notFound(async () => json({ nope: 'ok' }));

    const req = new Request('http://localhost/missing');
    const res = await app.fetch(req);

    expect(res.status).toBe(404);
  });

  it('fallback() passes through a 200 response unmodified', async () => {
    app.fallback(async () => json({ page: 'home' }, { status: 200 }));

    const req = new Request('http://localhost/anything');
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ page: 'home' });
  });

  it('fallback() takes priority over notFound() when both are registered', async () => {
    app.notFound(async () => text('from notFound'));
    app.fallback(async () => json({ page: 'home' }, { status: 200 }));

    const req = new Request('http://localhost/anything');
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ page: 'home' });
  });

  it('catches errors and returns 500 by default', async () => {
    app.get('/crash', async () => {
      throw new Error('crash');
    });

    const req = new Request('http://localhost/crash');
    const res = await app.fetch(req);

    expect(res.status).toBe(500);
    expect(await res.text()).toBe('crash');
  });

  it('uses custom error handler', async () => {
    app.get('/crash', async () => {
      throw new Error('crash');
    });
    app.onError(async (error) =>
      json({ error: error.message, status: 'handled' }, { status: 500 })
    );

    const req = new Request('http://localhost/crash');
    const res = await app.fetch(req);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      error: 'crash',
      status: 'handled',
    });
  });

  it('runs global middleware before route handler', async () => {
    const order: string[] = [];
    app.use(async (ctx, next) => {
      order.push('mw');
      return next();
    });
    app.get('/test', async () => {
      order.push('handler');
      return json({ ok: true });
    });

    await app.fetch(new Request('http://localhost/test'));

    expect(order).toEqual(['mw', 'handler']);
  });

  it('runs path-scoped middleware only for matching paths', async () => {
    const log: string[] = [];
    app.use('/api', async (ctx, next) => {
      log.push('api-scoped');
      return next();
    });
    app.get('/api/data', async () => {
      log.push('data');
      return json({ ok: true });
    });
    app.get('/other', async () => {
      log.push('other');
      return json({ ok: true });
    });

    await app.fetch(new Request('http://localhost/api/data'));
    await app.fetch(new Request('http://localhost/other'));

    expect(log).toEqual(['api-scoped', 'data', 'other']);
  });

  it('processes bodyParser middleware', async () => {
    app.use(bodyParser());
    app.post('/submit', async (ctx) => {
      const body = ctx.get('body');
      return json({ received: body });
    });

    const req = new Request('http://localhost/submit', {
      method: 'POST',
      body: JSON.stringify({ name: 'test' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await app.fetch(req);

    expect(await res.json()).toEqual({ received: { name: 'test' } });
  });

  it('processes CORS middleware on regular requests', async () => {
    app.use(cors({ origin: 'https://client.com' }));
    app.get('/data', async () => json({ ok: true }));

    const req = new Request('http://localhost/data', {
      headers: { origin: 'https://client.com' },
    });
    const res = await app.fetch(req);

    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://client.com'
    );
  });

  it('processes CORS preflight', async () => {
    app.use(cors());
    app.get('/data', async () => json({ ok: true }));

    const req = new Request('http://localhost/data', { method: 'OPTIONS' });
    const res = await app.fetch(req);

    expect(res.status).toBe(204);
  });

  it('fires beforeRequest hook', async () => {
    const hook = vi.fn();
    app.hooks.on('beforeRequest', hook);
    app.get('/', async () => text('ok'));

    await app.fetch(new Request('http://localhost/'));

    expect(hook).toHaveBeenCalledOnce();
  });

  it('fires afterResponse hook with the response', async () => {
    const hook = vi.fn();
    app.hooks.on('afterResponse', hook);
    app.get('/', async () => json({ ok: true }));

    const res = await app.fetch(new Request('http://localhost/'));

    expect(hook).toHaveBeenCalledWith(expect.anything(), res);
  });

  it('fires onError hook when an error occurs', async () => {
    const hook = vi.fn();
    app.hooks.on('onError', hook);
    app.get('/crash', async () => {
      throw new Error('boom');
    });

    await app.fetch(new Request('http://localhost/crash'));

    expect(hook).toHaveBeenCalledOnce();
    expect(hook).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'boom' }),
      expect.anything()
    );
  });

  it('supports route-level middleware via getRouter().use()', async () => {
    const log: string[] = [];
    const router = app.getRouter();
    router.use(async (ctx, next) => {
      log.push('route-mw');
      return next();
    });
    app.get('/scoped', async () => {
      log.push('handler');
      return text('ok');
    });

    await app.fetch(new Request('http://localhost/scoped'));
    expect(log).toEqual(['route-mw', 'handler']);
  });

  it('returns 405 with Allow header when path exists but method does not', async () => {
    app.get('/item', async () => text('got'));

    const req = new Request('http://localhost/item', { method: 'POST' });
    const res = await app.fetch(req);

    expect(res.status).toBe(405);
    expect(res.headers.get('Allow')).toBe('GET');
  });

  // ── Query params via ctx.query ─────────────────────────────

  it('exposes query params via ctx.query object', async () => {
    app.get('/search', async (ctx) =>
      json({ q: ctx.query.q, page: ctx.query.page })
    );

    const req = new Request('http://localhost/search?q=hello&page=2');
    const res = await app.fetch(req);

    const body = await res.json();
    expect(body).toEqual({ q: 'hello', page: '2' });
  });

  it('exposes query params via ctx.query callable', async () => {
    app.get('/lookup', async (ctx) =>
      json({ key: ctx.query('key'), limit: ctx.query('limit') })
    );

    const req = new Request('http://localhost/lookup?key=val&limit=10');
    const res = await app.fetch(req);

    const body = await res.json();
    expect(body).toEqual({ key: 'val', limit: '10' });
  });

  it('returns empty query when no query string present', async () => {
    app.get('/noquery', async (ctx) =>
      json({ hasQ: ctx.query.q, keys: Object.keys(ctx.query) })
    );

    const req = new Request('http://localhost/noquery');
    const res = await app.fetch(req);

    const body = await res.json();
    expect(body.hasQ).toBeUndefined();
    expect(body.keys).toHaveLength(0);
  });

  it('decodes URL-encoded query values', async () => {
    app.get('/decode', async (ctx) => json({ name: ctx.query.name }));

    const req = new Request('http://localhost/decode?name=hello%20world');
    const res = await app.fetch(req);

    expect(await res.json()).toEqual({ name: 'hello world' });
  });
});
