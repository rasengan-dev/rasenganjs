/**
 * Request ID middleware — assigns a unique ID to every request.
 *
 * If the client sends an `X-Request-Id` header, that value is
 * used (useful for distributed tracing).  Otherwise a UUID v4
 * is generated.
 *
 * The ID is available at `ctx.state.requestId` and is also set
 * on the `X-Request-Id` response header.
 */

import type { Middleware } from './index.js';

export interface RequestIdOptions {
  /** Header name to read/write (default "X-Request-Id") */
  header?: string;

  /** Key on ctx.state (default "requestId") */
  stateKey?: string;

  /**
   * Custom ID generator.  Default uses `crypto.randomUUID()`
   * with a fallback to `Date.now().toString(36)` for
   * environments without Web Crypto.
   */
  generator?: () => string;
}

function defaultId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Create a Request ID middleware.
 *
 * @example
 * ```ts
 * import { requestId } from "@rasenganjs/runtime";
 *
 * app.use(requestId());
 * // Later:
 * app.use(async (ctx, next) => {
 *   console.log("Handling request", ctx.get("requestId"));
 *   return next();
 * });
 * ```
 */
export function requestId(options: RequestIdOptions = {}): Middleware {
  const headerName = options.header ?? 'X-Request-Id';
  const stateKey = options.stateKey ?? 'requestId';
  const generate = options.generator ?? defaultId;

  return async (ctx, next) => {
    const incoming = ctx.request.headers.get(headerName);
    const id = incoming ?? generate();

    ctx.set(stateKey, id);

    const response = await next();

    const headers = new Headers(response.headers);
    if (!headers.has(headerName)) {
      headers.set(headerName, id);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };
}
