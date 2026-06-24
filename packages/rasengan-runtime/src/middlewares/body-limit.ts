import type { Middleware } from './index.js';

export interface BodyLimitOptions {
  maxSize: number;
}

export function bodyLimit(options: BodyLimitOptions): Middleware {
  const { maxSize } = options;

  return async (ctx, next) => {
    const body = ctx.request.body;

    if (!body) return next();

    const contentLength = ctx.request.headers.get('content-length');
    if (contentLength !== null) {
      const size = parseInt(contentLength, 10);
      if (!isNaN(size) && size > maxSize) {
        return new Response('Payload Too Large', { status: 413 });
      }
    }

    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.byteLength;
        if (totalBytes > maxSize) {
          await reader.cancel();
          return new Response('Payload Too Large', { status: 413 });
        }
        chunks.push(value);
      }
    } catch {
      return next();
    }

    const bodyBuffer = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bodyBuffer.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const headers = new Headers(ctx.request.headers);
    headers.set('content-length', String(totalBytes));

    ctx.request = new Request(ctx.request, {
      body: bodyBuffer,
      headers,
    });

    return next();
  };
}
