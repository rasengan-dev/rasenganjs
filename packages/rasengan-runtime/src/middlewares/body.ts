/**
 * Body parsing middleware — automatically parses request bodies
 * and stores the result on `ctx.state.parsedBody`.
 *
 * Supports:
 *   - application/json
 *   - application/x-www-form-urlencoded
 *   - multipart/form-data
 *   - text/plain and everything else
 *
 * Parsing is eager — the body is consumed before downstream
 * handlers run.  This is the only safe approach because the
 * Request body is a ReadableStream that can only be read once.
 *
 * @example
 * ```ts
 * import { bodyParser } from "@rasenganjs/runtime";
 *
 * app.use(bodyParser());
 *
 * app.post("/api/data", async (ctx) => {
 *   const body = ctx.get("parsedBody");
 *   return json({ received: body });
 * });
 * ```
 */

import type { Middleware } from './index.js';
import { parseBody } from '../request/body.js';

export interface BodyParserOptions {
  /** Key under which parsed body is stored in ctx.state (default "parsedBody") */
  key?: string;

  /** Maximum body size in bytes (default unlimited) */
  maxSize?: number;

  /** Allowed content types (default all).  If the request's
   *  Content-Type does not match any entry, the body is NOT parsed. */
  allowedTypes?: string[];
}

/**
 * Middleware that parses the request body based on Content-Type
 * and stores it on `ctx.state`.
 *
 * Parsing is eager — the body is consumed immediately when the
 * middleware runs.  This is safe because:
 *   1. The body can only be read once (ReadableStream)
 *   2. Handlers and later middlewares can access it via
 *      `ctx.get(key)` synchronously
 */
export function bodyParser(options: BodyParserOptions = {}): Middleware {
  const key = options.key ?? 'parsedBody';

  return async (ctx, next) => {
    const method = ctx.request.method;

    // Skip GET/HEAD/DELETE — these typically have no body
    if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
      return next();
    }

    const contentType =
      ctx.request.headers.get('content-type')?.toLowerCase() ?? '';

    // Optional Content-Type filter
    if (options.allowedTypes) {
      const allowed = options.allowedTypes.some((t) => contentType.includes(t));
      if (!allowed) {
        return next();
      }
    }

    // Max body size guard
    if (options.maxSize !== undefined) {
      const contentLength = parseInt(
        ctx.request.headers.get('content-length') ?? '0',
        10
      );
      if (contentLength > options.maxSize) {
        return new Response('Payload Too Large', { status: 413 });
      }
    }

    // Eager parse — consume the body now
    try {
      ctx.state[key] = await parseBody(ctx.request);
    } catch {
      // If parsing fails, store undefined so handlers can detect it
      ctx.state[key] = undefined;
    }

    return next();
  };
}
