import { describe, it, expect, vi } from 'vitest';
import { compress } from '../../../middlewares/compress.js';
import type { Context } from '../../../context/types.js';

function createCtx(acceptEncoding?: string, method: string = 'GET'): Context {
  const headers = new Headers();
  if (acceptEncoding) headers.set('accept-encoding', acceptEncoding);
  const state: Record<string, unknown> = {};
  return {
    request: new Request('http://localhost', { method, headers }),
    params: {},
    runtime: {},
    state,
    set: (key, value) => {
      state[key] = value;
    },
    get: (key) => state[key] as any,
  };
}

const hasBrotli =
  typeof CompressionStream !== 'undefined' &&
  (() => {
    try {
      new CompressionStream('br');
      return true;
    } catch {
      return false;
    }
  })();

describe('compress', () => {
  it('skips when Content-Encoding is already set', async () => {
    const mw = compress();
    const ctx = createCtx('gzip');
    const downstreamRes = new Response('data', {
      headers: { 'Content-Encoding': 'gzip' },
    });
    const res = await mw(ctx, () => Promise.resolve(downstreamRes));
    expect(res).toBe(downstreamRes);
  });

  it('skips when response body is null', async () => {
    const mw = compress();
    const ctx = createCtx('gzip');
    const downstreamRes = new Response(null, { status: 204 });
    const res = await mw(ctx, () => Promise.resolve(downstreamRes));
    expect(res).toBe(downstreamRes);
  });

  it('skips when body is below threshold', async () => {
    const mw = compress({ threshold: 10000 });
    const ctx = createCtx('gzip');
    const downstreamRes = new Response('small', {
      headers: { 'Content-Length': '5' },
    });
    const res = await mw(ctx, () => Promise.resolve(downstreamRes));
    expect(res).toBe(downstreamRes);
  });

  it('skips when client does not support accepted encodings', async () => {
    const mw = compress();
    const ctx = createCtx('identity');
    const downstreamRes = new Response('x'.repeat(2000));
    const res = await mw(ctx, () => Promise.resolve(downstreamRes));
    expect(res).toBe(downstreamRes);
  });

  it('compresses with gzip when CompressionStream is available', async () => {
    if (typeof CompressionStream === 'undefined') return;

    const mw = compress();
    const ctx = createCtx('gzip');
    const body = 'x'.repeat(2000);
    const downstreamRes = new Response(body, {
      headers: { 'Content-Length': String(body.length) },
    });
    const res = await mw(ctx, () => Promise.resolve(downstreamRes));

    expect(res.headers.get('Content-Encoding')).toBe('gzip');
    expect(res.headers.has('Content-Length')).toBe(false);

    const ds = new DecompressionStream('gzip');
    const decompressed = new Response(res.body!.pipeThrough(ds));
    expect(await decompressed.text()).toBe(body);
  });

  it('compresses with brotli when accepted', async () => {
    if (!hasBrotli) return;

    const mw = compress();
    const ctx = createCtx('br');
    const body = 'x'.repeat(2000);
    const downstreamRes = new Response(body, {
      headers: { 'Content-Length': String(body.length) },
    });
    const res = await mw(ctx, () => Promise.resolve(downstreamRes));

    expect(res.headers.get('Content-Encoding')).toBe('br');
  });

  it('prefers brotli over gzip when both are accepted', async () => {
    if (!hasBrotli) return;

    const mw = compress();
    const ctx = createCtx('gzip, br');
    const body = 'x'.repeat(2000);
    const downstreamRes = new Response(body, {
      headers: { 'Content-Length': String(body.length) },
    });
    const res = await mw(ctx, () => Promise.resolve(downstreamRes));

    expect(res.headers.get('Content-Encoding')).toBe('br');
  });

  it('returns original response if compression fails', async () => {
    const mw = compress();
    const ctx = createCtx('gzip');
    const downstreamRes = new Response('x'.repeat(2000), {
      headers: { 'Content-Length': '2000' },
    });

    const origCompressionStream = globalThis.CompressionStream;
    globalThis.CompressionStream = undefined as any;

    const res = await mw(ctx, () => Promise.resolve(downstreamRes));

    expect(res).toBe(downstreamRes);

    globalThis.CompressionStream = origCompressionStream;
  });
});
