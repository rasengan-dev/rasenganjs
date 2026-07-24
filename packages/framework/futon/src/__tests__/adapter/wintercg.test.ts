import { describe, it, expect, vi } from 'vitest';
import { toWinterCgHandler } from '../../adapters/wintercg.js';
import { Futon } from '../../app/index.js';
import { json } from '../../response/utils.js';

describe('toWinterCgHandler', () => {
  it('returns a fetch function', () => {
    const app = new Futon();
    const handler = toWinterCgHandler(app);
    expect(typeof handler).toBe('function');
  });

  it('processes requests and returns responses', async () => {
    const app = new Futon();
    app.get('/ping', async () => json({ pong: true }));

    const handler = toWinterCgHandler(app);
    const req = new Request('http://localhost/ping');
    const res = await handler(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ pong: true });
  });

  it('accepts Cloudflare Workers (request, env, ctx) signature', async () => {
    const app = new Futon();
    app.get('/env', async (ctx) =>
      json({ secret: ctx.runtime.env?.MY_SECRET })
    );

    const handler = toWinterCgHandler(app);
    const req = new Request('http://localhost/env');
    const env = { MY_SECRET: 'supersecret' };
    const platformCtx = { ctx: { waitUntil: vi.fn() } };

    const res = await handler(req, env, platformCtx as any);

    expect(await res.json()).toEqual({ secret: 'supersecret' });
  });

  it('accepts Deno-style (request, { env, ctx }) signature', async () => {
    const app = new Futon();
    app.get('/deno', async (ctx) =>
      json({ hasEnv: !!ctx.runtime.env?.DENO_REGION })
    );

    const handler = toWinterCgHandler(app);
    const req = new Request('http://localhost/deno');
    const denoCtx = {
      env: { DENO_REGION: 'us-east' },
      ctx: { waitUntil: vi.fn() },
    };

    const res = await handler(req, denoCtx as any);

    expect(await res.json()).toEqual({ hasEnv: true });
  });

  it('accepts plain env object', async () => {
    const app = new Futon();
    app.get('/plain', async (ctx) => json({ val: ctx.runtime.env?.SOME_VAR }));

    const handler = toWinterCgHandler(app);
    const req = new Request('http://localhost/plain');

    const res = await handler(req, { SOME_VAR: 'hello' });

    expect(await res.json()).toEqual({ val: 'hello' });
  });

  it('merges defaultRuntime with incoming env', async () => {
    const app = new Futon();
    app.get('/merged', async (ctx) => json(ctx.runtime.env));

    const handler = toWinterCgHandler(app, { env: { DEFAULT: 'yes' } });
    const req = new Request('http://localhost/merged');

    const res = await handler(req, { INCOMING: 'also' });

    const body = await res.json();
    expect(body).toHaveProperty('DEFAULT', 'yes');
    expect(body).toHaveProperty('INCOMING', 'also');
  });

  it('works without runtime argument', async () => {
    const app = new Futon();
    app.get('/', async () => json({ ok: true }));

    const handler = toWinterCgHandler(app);
    const req = new Request('http://localhost/');
    const res = await handler(req);

    expect(res.status).toBe(200);
  });

  it('coerces env values to strings', async () => {
    const app = new Futon();
    app.get('/coerce', async (ctx) => json({ num: ctx.runtime.env?.COUNT }));

    const handler = toWinterCgHandler(app);
    const req = new Request('http://localhost/coerce');

    const res = await handler(req, { COUNT: 42 } as any);

    expect(await res.json()).toEqual({ num: '42' });
  });
});
