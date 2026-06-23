import { describe, it, expect, vi } from 'vitest';
import { bodyParser } from '../../../middlewares/body.js';
import { createContext } from '../../../context/index.js';
import type { Context } from '../../../context/types.js';

function createCtx(req: Request): Context {
  return createContext(req);
}

describe('bodyParser', () => {
  it('parses JSON body and stores on state', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: 'test' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyParser();
    await mw(ctx, next);

    expect(ctx.state.parsedBody).toEqual({ name: 'test' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('skips body parsing for GET requests', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyParser();
    await mw(ctx, next);

    expect(ctx.state.parsedBody).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('skips body parsing for HEAD requests', async () => {
    const req = new Request('http://localhost', { method: 'HEAD' });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyParser();
    await mw(ctx, next);

    expect(ctx.state.parsedBody).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('skips body parsing for DELETE requests', async () => {
    const req = new Request('http://localhost', { method: 'DELETE' });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyParser();
    await mw(ctx, next);

    expect(ctx.state.parsedBody).toBeUndefined();
  });

  it('returns 413 when body exceeds maxSize', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'x'.repeat(200),
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': '200',
      },
    });
    const ctx = createCtx(req);
    const next = vi.fn();

    const mw = bodyParser({ maxSize: 100 });
    const res = await mw(ctx, next);

    expect(res.status).toBe(413);
    expect(next).not.toHaveBeenCalled();
  });

  it('respects allowedTypes filter', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/xml' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyParser({ allowedTypes: ['application/json'] });
    await mw(ctx, next);

    expect(ctx.state.parsedBody).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('handles parse errors gracefully (stores undefined)', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'not-valid-json',
      headers: { 'Content-Type': 'application/json' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyParser();
    await mw(ctx, next);

    expect(ctx.state.parsedBody).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('uses custom key for parsed body', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ x: 1 }),
      headers: { 'Content-Type': 'application/json' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyParser({ key: 'myBody' });
    await mw(ctx, next);

    expect(ctx.state.myBody).toEqual({ x: 1 });
    expect(ctx.state.parsedBody).toBeUndefined();
  });
});
