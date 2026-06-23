import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Application } from '../../app/index.js';
import { json, text } from '../../response/utils.js';
import { bodyParser } from '../../middlewares/body.js';
import { cors } from '../../middlewares/cors.js';

describe('Application (integration)', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application();
  });

  it('responds to a registered GET route', async () => {
    app.get('/hello', async () => json({ message: 'world' }));

    const req = new Request('http://localhost/hello');
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: 'world' });
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
      const body = ctx.get('parsedBody');
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

  it('matches routes regardless of HTTP method mismatch (returns 404)', async () => {
    app.get('/item', async () => text('got'));

    const req = new Request('http://localhost/item', { method: 'POST' });
    const res = await app.fetch(req);

    expect(res.status).toBe(404);
  });
});
