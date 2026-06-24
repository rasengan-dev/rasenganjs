import { describe, it, expect, vi } from 'vitest';
import { bodyLimit } from '../../../middlewares/body-limit.js';
import { bodyParser } from '../../../middlewares/body.js';
import { Application } from '../../../app/index.js';
import { createContext } from '../../../context/index.js';
import type { Context } from '../../../context/types.js';

function createCtx(req: Request): Context {
  return createContext(req);
}

describe('bodyLimit', () => {
  it('passes through requests with no body', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyLimit({ maxSize: 100 });
    const res = await mw(ctx, next);

    expect(res).toBeDefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it('passes through GET requests', async () => {
    const req = new Request('http://localhost', { method: 'GET' });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyLimit({ maxSize: 100 });
    await mw(ctx, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('returns 413 when Content-Length exceeds maxSize', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'hello',
      headers: { 'Content-Type': 'text/plain', 'Content-Length': '5' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyLimit({ maxSize: 3 });
    const res = await mw(ctx, next);

    expect(res.status).toBe(413);
    expect(await res.text()).toBe('Payload Too Large');
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 413 when streaming body exceeds maxSize', async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array([1, 2, 3, 4, 5]));
        controller.close();
      },
    });
    const req = new Request('http://localhost', {
      method: 'POST',
      body: stream,
      headers: { 'Content-Type': 'application/octet-stream' },
      // @ts-expect-error Node requires duplex for stream bodies
      duplex: 'half',
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyLimit({ maxSize: 3 });
    const res = await mw(ctx, next);

    expect(res.status).toBe(413);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 413 when streaming body exceeds maxSize across multiple chunks', async () => {
    let callCount = 0;
    const stream = new ReadableStream({
      pull(controller) {
        callCount++;
        if (callCount <= 3) {
          controller.enqueue(new Uint8Array([1, 2]));
        } else {
          controller.close();
        }
      },
    });
    const req = new Request('http://localhost', {
      method: 'POST',
      body: stream,
      // @ts-expect-error Node requires duplex for stream bodies
      duplex: 'half',
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = bodyLimit({ maxSize: 4 });
    const res = await mw(ctx, next);

    expect(res.status).toBe(413);
    expect(callCount).toBe(3);
    expect(next).not.toHaveBeenCalled();
  });

  it('passes the body through when under limit', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: 'test' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockImplementation(async () => {
      const body = await ctx.request.json();
      return new Response(JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const mw = bodyLimit({ maxSize: 1024 });
    const res = await mw(ctx, next);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ name: 'test' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('sets content-length header on reconstructed request', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'hello',
      headers: { 'Content-Type': 'text/plain' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockImplementation(async () => {
      expect(ctx.request.headers.get('content-length')).toBe('5');
      return new Response('ok');
    });

    const mw = bodyLimit({ maxSize: 1024 });
    await mw(ctx, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('works before bodyParser in the pipeline', async () => {
    const req = new Request('http://localhost/data', {
      method: 'POST',
      body: JSON.stringify({ key: 'value' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const app = new Application();

    app.use(bodyLimit({ maxSize: 1024 }));
    app.use(bodyParser());

    let parsedBody: unknown;
    app.post('/data', async (ctx) => {
      parsedBody = ctx.get('parsedBody');
      return new Response('ok');
    });

    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    expect(parsedBody).toEqual({ key: 'value' });
  });

  it('returns 413 when body exceeds limit in pipeline with bodyParser', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'this body is too long',
      headers: { 'Content-Type': 'text/plain' },
    });
    const app = new Application();

    app.use(bodyLimit({ maxSize: 5 }));
    app.use(bodyParser());

    app.post('/data', async () => new Response('should not reach'));
    const res = await app.fetch(req);

    expect(res.status).toBe(413);
  });
});
