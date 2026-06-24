import { describe, it, expect, vi } from 'vitest';
import { basicAuth } from '../../../middlewares/basic-auth.js';
import { createContext } from '../../../context/index.js';
import type { Context } from '../../../context/types.js';

function createCtx(req: Request): Context {
  return createContext(req);
}

describe('basicAuth', () => {
  it('passes through requests without Authorization header', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = basicAuth();
    await mw(ctx, next);

    expect(ctx.state.auth).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('passes through non-Basic Authorization header', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer xyz' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = basicAuth();
    await mw(ctx, next);

    expect(ctx.state.auth).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('decodes Basic auth and stores credentials', async () => {
    const encoded = btoa('alice:secret');
    const req = new Request('http://localhost', {
      headers: { Authorization: `Basic ${encoded}` },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = basicAuth();
    await mw(ctx, next);

    expect(ctx.state.auth).toEqual({ username: 'alice', password: 'secret' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('handles username without password', async () => {
    const encoded = btoa('alice');
    const req = new Request('http://localhost', {
      headers: { Authorization: `Basic ${encoded}` },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = basicAuth();
    await mw(ctx, next);

    expect(ctx.state.auth).toEqual({ username: 'alice', password: '' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('uses custom state key', async () => {
    const encoded = btoa('admin:pass');
    const req = new Request('http://localhost', {
      headers: { Authorization: `Basic ${encoded}` },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = basicAuth({ stateKey: 'credentials' });
    await mw(ctx, next);

    expect(ctx.state.credentials).toEqual({
      username: 'admin',
      password: 'pass',
    });
    expect(ctx.state.auth).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('returns 401 when verify rejects credentials', async () => {
    const encoded = btoa('alice:wrong');
    const req = new Request('http://localhost', {
      headers: { Authorization: `Basic ${encoded}` },
    });
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = basicAuth({
      verify: (username, password) =>
        username === 'alice' && password === 'correct',
    });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(res.headers.get('WWW-Authenticate')).toContain('Basic');
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when verify throws', async () => {
    const encoded = btoa('alice:pass');
    const req = new Request('http://localhost', {
      headers: { Authorization: `Basic ${encoded}` },
    });
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = basicAuth({
      verify: () => {
        throw new Error('oops');
      },
    });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when no auth header and verify is set', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = basicAuth({ verify: () => true });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(res.headers.get('WWW-Authenticate')).toContain('Basic');
    expect(next).not.toHaveBeenCalled();
  });

  it('stores credentials when verify passes', async () => {
    const encoded = btoa('alice:secret');
    const req = new Request('http://localhost', {
      headers: { Authorization: `Basic ${encoded}` },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = basicAuth({
      verify: (username, password) =>
        username === 'alice' && password === 'secret',
    });
    await mw(ctx, next);

    expect(ctx.state.auth).toEqual({ username: 'alice', password: 'secret' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('supports async verify function', async () => {
    const encoded = btoa('admin:123');
    const req = new Request('http://localhost', {
      headers: { Authorization: `Basic ${encoded}` },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = basicAuth({
      verify: async (username, password) => {
        await Promise.resolve();
        return username === 'admin' && password === '123';
      },
    });
    await mw(ctx, next);

    expect(ctx.state.auth).toEqual({ username: 'admin', password: '123' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('includes realm in WWW-Authenticate header', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = basicAuth({ verify: () => false, realm: 'Admin Area' });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(res.headers.get('WWW-Authenticate')).toBe(
      'Basic realm="Admin Area", charset="UTF-8"'
    );
  });
});
