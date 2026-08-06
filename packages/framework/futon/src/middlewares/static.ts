/**
 * staticFiles() — serve static files through `ctx.runtime.assets`
 * (RFC-0007 §9).
 *
 * Futon has zero runtime dependencies and never imports `node:fs` —
 * this middleware never touches the filesystem directly. All reads
 * go through `ctx.runtime.assets`, which every `RuntimeAdapter`
 * populates before serving (`NodeAssets`/`BunAssets` read the real
 * filesystem, Workerd's is a no-op stub), so the same middleware
 * runs unmodified on every target.
 *
 * @example
 * ```ts
 * import { staticFiles } from "@rasenganjs/futon";
 *
 * app.use(staticFiles({
 *   root: "dist/client/assets",
 *   prefix: "/assets",
 *   immutable: true,
 *   maxAge: 31536000,
 * }));
 * ```
 */

import type { Middleware } from './index.js';
import { getPathname } from '../router/utils.js';

export interface StaticOptions {
  /** Directory to serve from, relative to the adapter's `rootDir`. */
  root: string;
  /**
   * URL prefix this mount serves — stripped before resolving the
   * remainder against `root`. Requests outside the prefix always
   * fall through to `next()`, independent of `fallthrough` (which
   * only governs in-prefix requests that don't resolve to a file).
   * Default: `''` (serves every request from `root` directly).
   */
  prefix?: string;
  /** Filename to serve for a directory-like request. `false` disables it. Default: `'index.html'`. */
  index?: string | false;
  /** `Cache-Control` max-age in seconds. Default: `0` (no caching directive). */
  maxAge?: number;
  /** Adds `immutable` to `Cache-Control` (only meaningful alongside `maxAge`). Default: `false`. */
  immutable?: boolean;
  /** Compute and honor `ETag`/`If-None-Match` (304 on match). Default: `true`. */
  etag?: boolean;
  /** On a miss within `prefix`, call `next()` instead of returning a terminal 404. Default: `true`. */
  fallthrough?: boolean;
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function contentTypeFor(pathname: string): string {
  const dot = pathname.lastIndexOf('.');
  if (dot === -1) return 'application/octet-stream';
  return (
    MIME_TYPES[pathname.slice(dot).toLowerCase()] ?? 'application/octet-stream'
  );
}

/**
 * Join `root` with a URL-derived relative path, resolving `.`/`..`
 * segments by hand (no `node:path` — this must run on Workerd too).
 * Returns `null` if a `..` would climb above `root`.
 */
function resolveAssetPath(root: string, relative: string): string | null {
  const cleanRoot = root.replace(/\/+$/, '');
  const parts: string[] = [];

  for (const segment of relative.split('/')) {
    if (segment === '' || segment === '.') continue;
    if (segment === '..') {
      if (parts.length === 0) return null;
      parts.pop();
      continue;
    }
    parts.push(segment);
  }

  return [cleanRoot, ...parts].join('/');
}

/** Cheap non-cryptographic content hash — for cache validation, not security. */
function weakEtag(data: Uint8Array): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash * 31 + data[i]) | 0;
  }
  return `W/"${data.length.toString(16)}-${(hash >>> 0).toString(16)}"`;
}

/**
 * Create a static-file-serving middleware.
 */
export function staticFiles(options: StaticOptions): Middleware {
  const {
    root,
    prefix = '',
    index = 'index.html',
    maxAge = 0,
    immutable = false,
    etag = true,
    fallthrough = true,
  } = options;

  let warnedNoAssets = false;

  return async (ctx, next) => {
    const pathname = decodeURIComponent(getPathname(ctx.request.url));

    if (prefix && !pathname.startsWith(prefix)) {
      return next();
    }

    const relative = prefix ? pathname.slice(prefix.length) : pathname;
    const isDirectoryLike = relative === '' || relative.endsWith('/');

    if (isDirectoryLike && index === false) {
      return fallthrough ? next() : new Response('Not Found', { status: 404 });
    }

    const target = isDirectoryLike ? `${relative}${index}` : relative;
    const assetPath = resolveAssetPath(root, target);

    if (assetPath === null) {
      // Path traversal attempt — never fall through to a listing or
      // a sibling directory; just treat it as not found.
      return fallthrough ? next() : new Response('Not Found', { status: 404 });
    }

    const assets = ctx.runtime.assets;
    if (!assets) {
      if (!warnedNoAssets) {
        warnedNoAssets = true;
        console.warn(
          `[futon] staticFiles({ root: "${root}" }) has no ctx.runtime.assets — ` +
            'the current RuntimeAdapter never called app.configureAssets(). ' +
            'Static files will 404 (or fall through) on every request.'
        );
      }
      return fallthrough ? next() : new Response('Not Found', { status: 404 });
    }

    const data = await assets.get(assetPath);

    if (data === null) {
      if (!warnedNoAssets && ctx.runtime.server?.preset === 'workerd') {
        warnedNoAssets = true;
        console.warn(
          `[futon] staticFiles({ root: "${root}" }) is running on Workerd, whose ` +
            'assets are a no-op stub — static files need Workers KV/R2 or a ' +
            'native Cloudflare assets binding on that target.'
        );
      }
      return fallthrough ? next() : new Response('Not Found', { status: 404 });
    }

    const headers = new Headers({ 'Content-Type': contentTypeFor(target) });

    if (maxAge > 0) {
      headers.set(
        'Cache-Control',
        `public, max-age=${maxAge}${immutable ? ', immutable' : ''}`
      );
    }

    if (etag) {
      const tag = weakEtag(data);
      headers.set('ETag', tag);
      if (ctx.request.headers.get('if-none-match') === tag) {
        return new Response(null, { status: 304, headers });
      }
    }

    // `Uint8Array<ArrayBufferLike>` (what `Assets.get()` returns) isn't
    // structurally `BodyInit` under some lib.dom/@types/node combos —
    // the runtime value is a plain Uint8Array either way.
    return new Response(data as BodyInit, { status: 200, headers });
  };
}
