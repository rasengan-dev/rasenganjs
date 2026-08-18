/**
 * Body parsing middleware — automatically parses request bodies
 * and stores the result on `ctx.state.body` (and `ctx.body` directly).
 *
 * Parses, by default, only content types it can safely turn into a
 * data structure:
 *   - application/json
 *   - application/x-www-form-urlencoded
 *   - multipart/form-data
 *   - text/plain
 *
 * Anything else (binary uploads, unrecognized or missing Content-Type)
 * is left untouched by default — the request's `ReadableStream` is
 * never consumed, so a downstream handler can still read
 * `ctx.request.body` directly (e.g. piping a file upload straight into
 * an R2 bucket). Pass `allowedTypes` to narrow or widen this set.
 *
 * Parsing is eager — the body is consumed before downstream
 * handlers run.  This is the only safe approach because the
 * Request body is a ReadableStream that can only be read once.
 *
 * @example
 * ```ts
 * import { bodyParser } from "@rasenganjs/futon";
 *
 * app.use(bodyParser());
 *
 * app.post("/api/data", async (ctx) => {
 *   return json({ received: ctx.body });
 * });
 * ```
 */

import type { Middleware } from './index.js';
import { parseBody } from '../request/body.js';
import { bodyLimit } from './body-limit.js';

/**
 * Content types `bodyParser()` parses by default when `allowedTypes`
 * isn't passed. Anything outside this set (binary uploads, unknown or
 * missing Content-Type) is left unread so its stream stays available
 * downstream.
 */
const DEFAULT_PARSEABLE_TYPES = [
  'application/json',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
];

export interface BodyParserOptions {
  /** Key under which parsed body is stored in ctx.state (default "body") */
  key?: string;

  /** Maximum body size in bytes (default unlimited).
   *  When set, uses streaming byte-count enforcement (body-limit). */
  maxSize?: number;

  /** Content types to parse (default: json, url-encoded, multipart,
   *  text/plain — see `DEFAULT_PARSEABLE_TYPES`). If the request's
   *  Content-Type does not match any entry, the body is NOT parsed
   *  and its stream is left untouched for a downstream handler. */
  allowedTypes?: string[];

  /** Leave multipart/form-data bodies unread (default false), so a
   *  downstream `fileUpload()` middleware parses them instead. Without
   *  this flag both still cooperate — `fileUpload()` reuses the
   *  FormData this middleware stored — but skipping avoids holding the
   *  parsed form on `ctx.state` for routes that never read it. */
  skipMultipart?: boolean;
}

/**
 * Middleware that parses the request body based on Content-Type
 * and stores it on `ctx.state` (and `ctx.body`).
 *
 * Parsing is eager — the body is consumed immediately when the
 * middleware runs.  This is safe because:
 *   1. The body can only be read once (ReadableStream)
 *   2. Handlers and later middlewares can access it via
 *      `ctx.body` (or `ctx.get(key)`) synchronously
 *
 * When `maxSize` is specified, delegates to `bodyLimit()` internally
 * for streaming byte-count enforcement.
 */
export function bodyParser(options: BodyParserOptions = {}): Middleware {
  const key = options.key ?? 'body';
  const allowedTypes = options.allowedTypes ?? DEFAULT_PARSEABLE_TYPES;

  return async (ctx, next) => {
    const method = ctx.request.method;

    if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
      return next();
    }

    const contentType =
      ctx.request.headers.get('content-type')?.toLowerCase() ?? '';

    if (options.skipMultipart && contentType.includes('multipart/form-data')) {
      return next();
    }

    const allowed = allowedTypes.some((t) => contentType.includes(t));
    if (!allowed) {
      return next();
    }

    if (options.maxSize !== undefined) {
      const limitMw = bodyLimit({ maxSize: options.maxSize });
      return limitMw(ctx, async () => {
        try {
          const parsed = await parseBody(ctx.request);
          ctx.state[key] = parsed;
          ctx.body = parsed;
        } catch {
          ctx.state[key] = undefined;
        }
        return next();
      });
    }

    try {
      const parsed = await parseBody(ctx.request);
      ctx.state[key] = parsed;
      ctx.body = parsed;
    } catch {
      ctx.state[key] = undefined;
    }

    return next();
  };
}
