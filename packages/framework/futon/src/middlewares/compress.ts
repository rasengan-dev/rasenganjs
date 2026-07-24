/**
 * Compression middleware — gzip/brotli/deflate response bodies
 * based on the client's `Accept-Encoding` header.
 *
 * Uses the Web API `CompressionStream` when available (browsers,
 * Deno, recent Node 22+).  Falls back to no compression in
 * environments without native `CompressionStream`.
 *
 * @example
 * ```ts
 * import { compress } from "@rasenganjs/runtime";
 *
 * app.use(compress()); // Compress everything over 1 KB
 * ```
 */

import type { Middleware } from './index.js';

export interface CompressOptions {
  /** Minimum body size in bytes to compress (default 1024) */
  threshold?: number;

  /** Accepted encodings in priority order (default ["br", "gzip", "deflate"]) */
  encodings?: string[];
}

const MIN_THRESHOLD = 1024;

/**
 * Create a compression middleware.
 */
export function compress(options: CompressOptions = {}): Middleware {
  const threshold = options.threshold ?? MIN_THRESHOLD;
  const encodings = options.encodings ?? ['br', 'gzip', 'deflate'];

  return async (ctx, next) => {
    const response = await next();

    // Skip if already compressed or too small
    if (response.headers.get('Content-Encoding')) return response;
    if (response.body === null) return response;

    const contentLength = parseInt(
      response.headers.get('content-length') ?? '0',
      10
    );
    if (contentLength > 0 && contentLength < threshold) return response;

    const acceptEncoding = ctx.request.headers.get('accept-encoding') ?? '';

    // Choose the best encoding the client supports
    let chosenEncoding: string | null = null;
    for (const enc of encodings) {
      if (acceptEncoding.includes(enc)) {
        chosenEncoding = enc;
        break;
      }
    }

    if (!chosenEncoding) return response;

    // Try to compress — if CompressionStream is unavailable, skip
    try {
      const compressed = await compressBody(response.body, chosenEncoding);

      const headers = new Headers(response.headers);
      headers.set('Content-Encoding', chosenEncoding);
      headers.delete('Content-Length');

      return new Response(compressed, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch {
      return response;
    }
  };
}

/**
 * Compress a ReadableStream using the given encoding.
 */
async function compressBody(
  body: ReadableStream<Uint8Array>,
  encoding: string
): Promise<ReadableStream<Uint8Array>> {
  if (typeof CompressionStream === 'undefined') {
    throw new Error('CompressionStream not available');
  }

  const cs = new CompressionStream(encoding as CompressionFormat);
  const { readable, writable } = cs;

  const writer = writable.getWriter();
  const reader = body.getReader();

  // Pump the original body into the compressor
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          await writer.close();
          break;
        }
        await writer.write(value as BufferSource);
      }
    } catch (err) {
      await writer.abort(err);
    }
  })();

  return readable;
}
