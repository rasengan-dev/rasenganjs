import { describe, it, expect, vi } from 'vitest';
import { requestId } from '../../../middlewares/request-id.js';
import { createContext } from '../../../context/index.js';
import type { Context } from '../../../context/types.js';

function createCtx(request: Request): Context {
  return createContext(request);
}

describe('requestId', () => {
  it('generates a UUID and stores on state', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = requestId();
    await mw(ctx, next);

    const id = ctx.get('requestId');
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
  });

  it('uses incoming X-Request-Id header', async () => {
    const req = new Request('http://localhost', {
      headers: { 'X-Request-Id': 'incoming-id' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const mw = requestId();
    await mw(ctx, next);

    expect(ctx.get('requestId')).toBe('incoming-id');
  });

  it('uses custom header name', async () => {
    const req = new Request('http://localhost', {
      headers: { 'X-Trace-Id': 'custom-trace' },
    });
    const ctx = createCtx(req);

    const mw = requestId({ header: 'X-Trace-Id', stateKey: 'traceId' });
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(ctx.get('traceId')).toBe('custom-trace');
  });

  it('uses custom state key', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);

    const mw = requestId({ stateKey: 'reqId' });
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    const id = ctx.get('reqId');
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
  });

  it('uses custom generator', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);

    const mw = requestId({ generator: () => 'custom-id' });
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(ctx.get('requestId')).toBe('custom-id');
    expect(res.headers.get('X-Request-Id')).toBe('custom-id');
  });

  it('sets X-Request-Id on response', async () => {
    const req = new Request('http://localhost', {
      headers: { 'X-Request-Id': 'trace-123' },
    });
    const ctx = createCtx(req);

    const mw = requestId();
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(res.headers.get('X-Request-Id')).toBe('trace-123');
  });

  it('does not override existing response X-Request-Id', async () => {
    const req = new Request('http://localhost');
    const ctx = createCtx(req);

    const mw = requestId();
    const res = await mw(ctx, () =>
      Promise.resolve(
        new Response('ok', {
          headers: { 'X-Request-Id': 'already-set' },
        })
      )
    );

    expect(res.headers.get('X-Request-Id')).toBe('already-set');
  });
});
