import { describe, it, expect, vi } from 'vitest';
import { cors } from '../../../middlewares/cors.js';
import type { Context } from '../../../context/types.js';

function createCtx(method: string, origin?: string): Context {
  const headers = new Headers();
  if (origin) headers.set('origin', origin);
  return {
    request: new Request('http://localhost', { method, headers }),
    params: {},
    runtime: {},
    state: {},
    set: vi.fn(),
    get: vi.fn(),
  };
}

describe('cors', () => {
  it('sets Access-Control-Allow-Origin: * by default', async () => {
    const mw = cors();
    const ctx = createCtx('GET');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
  });

  it('responds to preflight OPTIONS with 204', async () => {
    const mw = cors();
    const ctx = createCtx('OPTIONS');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
    expect(res.headers.get('access-control-allow-methods')).toBe(
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
  });

  it('uses custom origin', async () => {
    const mw = cors({ origin: 'https://app.com' });
    const ctx = createCtx('GET', 'https://app.com');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://app.com'
    );
  });

  it('matches origin from an array', async () => {
    const mw = cors({ origin: ['https://a.com', 'https://b.com'] });
    const ctx = createCtx('GET', 'https://a.com');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://a.com'
    );
  });

  it('sets null when origin is not in the array', async () => {
    const mw = cors({ origin: ['https://a.com'] });
    const ctx = createCtx('GET', 'https://evil.com');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.headers.get('access-control-allow-origin')).toBe('null');
  });

  it('sets credentials header', async () => {
    const mw = cors({ credentials: true });
    const ctx = createCtx('GET', 'https://app.com');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.headers.get('access-control-allow-credentials')).toBe('true');
  });

  it('sets exposed headers', async () => {
    const mw = cors({ exposedHeaders: 'X-Custom' });
    const ctx = createCtx('GET');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.headers.get('access-control-expose-headers')).toBe('X-Custom');
  });

  it('sets max-age on preflight', async () => {
    const mw = cors({ maxAge: 3600 });
    const ctx = createCtx('OPTIONS');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.headers.get('access-control-max-age')).toBe('3600');
  });

  it('uses custom options status code', async () => {
    const mw = cors({ optionsStatus: 200 });
    const ctx = createCtx('OPTIONS');
    const res = await mw(ctx, () => Promise.resolve(new Response('ok')));
    expect(res.status).toBe(200);
  });

  it('does not override existing CORS headers from downstream', async () => {
    const mw = cors({ origin: 'https://fallback.com' });
    const ctx = createCtx('GET', 'https://actual.com');
    const res = await mw(ctx, () =>
      Promise.resolve(
        new Response('ok', {
          headers: { 'access-control-allow-origin': 'https://actual.com' },
        })
      )
    );
    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://actual.com'
    );
  });
});
