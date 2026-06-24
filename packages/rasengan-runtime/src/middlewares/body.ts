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
import { bodyLimit } from './body-limit.js';

export interface BodyParserOptions {
  /** Key under which parsed body is stored in ctx.state (default "parsedBody") */
  key?: string;

  /** Maximum body size in bytes (default unlimited).
   *  When set, uses streaming byte-count enforcement (body-limit). */
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
 *
 * When `maxSize` is specified, delegates to `bodyLimit()` internally
 * for streaming byte-count enforcement.
 */
export function bodyParser(options: BodyParserOptions = {}): Middleware {
  const key = options.key ?? 'parsedBody';

  return async (ctx, next) => {
    const method = ctx.request.method;

    if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
      return next();
    }

    const contentType =
      ctx.request.headers.get('content-type')?.toLowerCase() ?? '';

    if (options.allowedTypes) {
      const allowed = options.allowedTypes.some((t) => contentType.includes(t));
      if (!allowed) {
        return next();
      }
    }

    if (options.maxSize !== undefined) {
      const limitMw = bodyLimit({ maxSize: options.maxSize });
      return limitMw(ctx, async () => {
        try {
          ctx.state[key] = await parseBody(ctx.request);
        } catch {
          ctx.state[key] = undefined;
        }
        return next();
      });
    }

    try {
      ctx.state[key] = await parseBody(ctx.request);
    } catch {
      ctx.state[key] = undefined;
    }

    return next();
  };
}
