import { describe, it, expect, vi } from 'vitest';
import { staticFiles } from '../../../middlewares/static.js';
import { createContext } from '../../../context/index.js';
import type { Assets, Context } from '../../../context/types.js';

function createMemoryAssets(files: Record<string, string>): Assets {
  const encoder = new TextEncoder();
  return {
    get: async (path: string) =>
      path in files ? encoder.encode(files[path]) : null,
    load: async (path: string) => files[path] ?? null,
    write: async () => {},
    delete: async () => {},
    list: async () => Object.keys(files),
  };
}

function createCtx(
  url: string,
  assets: Assets | undefined,
  headers?: Record<string, string>,
  preset?: 'node' | 'bun' | 'workerd'
): Context {
  return createContext(
    new Request(url, { headers }),
    {},
    {
      assets,
      server: preset
        ? { preset, mode: 'production', port: 0, host: '0.0.0.0', rootDir: '.' }
        : undefined,
    }
  );
}

describe('staticFiles', () => {
  it('serves a matched file with the right content type', async () => {
    const assets = createMemoryAssets({ 'assets/app.js': 'console.log(1)' });
    const mw = staticFiles({ root: 'assets', prefix: '/assets' });
    const ctx = createCtx('http://localhost/assets/app.js', assets);

    const next = vi.fn();
    const res = await mw(ctx, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe(
      'text/javascript; charset=utf-8'
    );
    expect(await res.text()).toBe('console.log(1)');
  });

  it('falls through when the request is outside prefix', async () => {
    const assets = createMemoryAssets({});
    const mw = staticFiles({ root: 'assets', prefix: '/assets' });
    const ctx = createCtx('http://localhost/api/users', assets);

    const next = vi.fn(() => Promise.resolve(new Response('next')));
    const res = await mw(ctx, next);

    expect(next).toHaveBeenCalledOnce();
    expect(await res.text()).toBe('next');
  });

  it('falls through on a miss when fallthrough is true (default)', async () => {
    const assets = createMemoryAssets({});
    const mw = staticFiles({ root: 'assets', prefix: '/assets' });
    const ctx = createCtx('http://localhost/assets/missing.js', assets);

    const next = vi.fn(() => Promise.resolve(new Response('next')));
    const res = await mw(ctx, next);

    expect(next).toHaveBeenCalledOnce();
    expect(await res.text()).toBe('next');
  });

  it('returns a terminal 404 on a miss when fallthrough is false', async () => {
    const assets = createMemoryAssets({});
    const mw = staticFiles({
      root: 'assets',
      prefix: '/assets',
      fallthrough: false,
    });
    const ctx = createCtx('http://localhost/assets/missing.js', assets);

    const next = vi.fn();
    const res = await mw(ctx, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toBe(404);
  });

  it('serves the index file for a directory-like request', async () => {
    const assets = createMemoryAssets({ 'public/index.html': '<h1>hi</h1>' });
    const mw = staticFiles({ root: 'public' });
    const ctx = createCtx('http://localhost/', assets);

    const res = await mw(ctx, vi.fn());

    expect(res.status).toBe(200);
    expect(await res.text()).toBe('<h1>hi</h1>');
  });

  it('rejects path traversal outside root', async () => {
    // A literal ".." segment is normalized away by the URL parser
    // before it ever reaches the middleware (`new URL(...).pathname`
    // collapses it) — encoding the slash (`..%2F`) keeps it as one
    // opaque path segment through URL parsing, so it still reaches
    // staticFiles()'s own decode-then-split traversal check intact.
    const assets = createMemoryAssets({ 'secret.txt': 'nope' });
    const get = vi.spyOn(assets, 'get');
    const mw = staticFiles({
      root: 'assets',
      prefix: '/assets',
      fallthrough: false,
    });
    const ctx = createCtx('http://localhost/assets/..%2Fsecret.txt', assets);

    const res = await mw(ctx, vi.fn());

    expect(res.status).toBe(404);
    expect(get).not.toHaveBeenCalled();
  });

  it('sets Cache-Control from maxAge/immutable', async () => {
    const assets = createMemoryAssets({ 'assets/app.js': 'x' });
    const mw = staticFiles({
      root: 'assets',
      prefix: '/assets',
      maxAge: 31536000,
      immutable: true,
    });
    const ctx = createCtx('http://localhost/assets/app.js', assets);

    const res = await mw(ctx, vi.fn());

    expect(res.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000, immutable'
    );
  });

  it('returns 304 when If-None-Match matches the computed ETag', async () => {
    const assets = createMemoryAssets({ 'assets/app.js': 'x' });
    const mw = staticFiles({ root: 'assets', prefix: '/assets' });

    const first = await mw(
      createCtx('http://localhost/assets/app.js', assets),
      vi.fn()
    );
    const etag = first.headers.get('ETag')!;
    expect(etag).toBeTruthy();

    const second = await mw(
      createCtx('http://localhost/assets/app.js', assets, {
        'if-none-match': etag,
      }),
      vi.fn()
    );

    expect(second.status).toBe(304);
  });

  it('falls through when ctx.runtime.assets is missing', async () => {
    const mw = staticFiles({ root: 'assets', prefix: '/assets' });
    const ctx = createCtx('http://localhost/assets/app.js', undefined);

    const next = vi.fn(() => Promise.resolve(new Response('next')));
    const res = await mw(ctx, next);

    expect(next).toHaveBeenCalledOnce();
    expect(await res.text()).toBe('next');
  });
});
