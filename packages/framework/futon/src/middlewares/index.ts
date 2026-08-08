import type { Context } from '../context/types.js';

/**
 * Middleware is the core abstraction for the request pipeline.
 *
 * Each middleware receives:
 *   - `ctx` — the request Context (mutable)
 *   - `next` — a thunk that resumes the downstream chain
 *
 * It MUST return the Promise<Response> that eventually
 * bubbles back up.  The canonical onion pattern:
 *
 * ```
 * Request → M1 → M2 → Handler → M2 → M1 → Response
 * ```
 *
 * @example
 * ```ts
 * const logger: Middleware = async (ctx, next) => {
 *   const start = Date.now();
 *   const response = await next();
 *   const ms = Date.now() - start;
 *   console.log(`${ctx.request.method} ${ctx.request.url} — ${ms}ms`);
 *   return response;
 * };
 * ```
 */
export type Middleware = (
  ctx: Context,
  next: () => Promise<Response>
) => Promise<Response>;
