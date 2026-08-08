import { describe, it, expect, vi } from 'vitest';
import { bearerToken } from '../../../middlewares/bearer-token.js';
import { createContext } from '../../../context/index.js';
import type { Context } from '../../../context/types.js';

function createCtx(req: Request): Context {
  return createContext(req);
}

describe('bearerToken', () => {
  it('passes through requests without Authorization header', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bearerToken();
    await mw(ctx, next);

    expect(ctx.state.token).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('passes through non-Bearer Authorization header', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Basic xyz' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bearerToken();
    await mw(ctx, next);

    expect(ctx.state.token).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('extracts token and stores on state', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer my-token-123' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bearerToken();
    await mw(ctx, next);

    expect(ctx.state.token).toBe('my-token-123');
    expect(next).toHaveBeenCalledOnce();
  });

  it('handles Bearer with lowercase b', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'bearer lower-token' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bearerToken();
    await mw(ctx, next);

    expect(ctx.state.token).toBe('lower-token');
    expect(next).toHaveBeenCalledOnce();
  });

  it('uses custom state key', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer abc' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bearerToken({ stateKey: 'accessToken' });
    await mw(ctx, next);

    expect(ctx.state.accessToken).toBe('abc');
    expect(ctx.state.token).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('trims whitespace around token', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer   spaced-token  ' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bearerToken();
    await mw(ctx, next);

    expect(ctx.state.token).toBe('spaced-token');
    expect(next).toHaveBeenCalledOnce();
  });

  it('returns 401 when verify rejects token', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer bad-token' },
    });
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = bearerToken({ verify: () => false });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(res.headers.get('WWW-Authenticate')).toBe('Bearer');
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when no bearer header and verify is set', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = bearerToken({ verify: () => true });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('stores verify result when verify passes', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer valid-token' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const user = { id: 1, name: 'Alice' };
    const mw = bearerToken({
      verify: (token) => (token === 'valid-token' ? user : false),
    });
    await mw(ctx, next);

    expect(ctx.state.token).toEqual(user);
    expect(next).toHaveBeenCalledOnce();
  });

  it('supports async verify function', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer async-token' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bearerToken({
      verify: async (token) => {
        await Promise.resolve();
        return token === 'async-token' ? { role: 'admin' } : false;
      },
    });
    await mw(ctx, next);

    expect(ctx.state.token).toEqual({ role: 'admin' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('returns 401 when verify throws', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer boom' },
    });
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = bearerToken({
      verify: () => {
        throw new Error('db error');
      },
    });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 for empty Bearer token with verify', async () => {
    const req = new Request('http://localhost', {
      headers: { Authorization: 'Bearer ' },
    });
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = bearerToken({ verify: () => true });
    const res = await mw(ctx, next);

    expect(res.status).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });
});
