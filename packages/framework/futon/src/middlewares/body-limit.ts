import type { Middleware } from './index.js';

export interface BodyLimitOptions {
  maxSize: number;
}

// Registry symbol matching `@rasenganjs/runtime`'s lazy Request shim
// (RFC-0005, Phase 3b). No import edge to runtime is needed: a lazy
// shim's internal slots aren't real, so `new Request(shim, init)` throws
// — this materializes it first. A no-op for an already-real `Request`.
const MATERIALIZE = Symbol.for('rasenganjs.request.materialize');

function materializeRequest(request: Request): Request {
  const materializer = (
    request as unknown as { [MATERIALIZE]?: () => Request }
  )[MATERIALIZE];
  return materializer ? materializer.call(request) : request;
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

    ctx.request = new Request(materializeRequest(ctx.request), {
      body: bodyBuffer,
      headers,
    });

    return next();
  };
}
