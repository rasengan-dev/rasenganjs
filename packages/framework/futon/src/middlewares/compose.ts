import type { Context } from '../context/types.js';
import type { Middleware } from './index.js';

/**
 * compose() chains an array of Middleware functions into a
 * single Middleware using the classic Koa-style onion model.
 *
 * Each middleware calls `next()` to pass control downstream.
 * The returned Promise resolves when the entire chain — both
 * the downstream run and the upstream unwind — completes.
 *
 * Invariants enforced:
 *   - `next()` may only be called once per middleware
 *     (double-call throws an error)
 *   - If the array is empty, it returns the `next` fallback
 *     immediately
 *
 * @param middlewares — Ordered list of middleware functions
 * @returns A single Middleware that runs the full chain
 */
export function compose(middlewares: Middleware[]): Middleware {
  return async (
    ctx: Context,
    next?: () => Promise<Response>
  ): Promise<Response> => {
    let index = -1;

    const dispatch = async (i: number): Promise<Response> => {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      index = i;

      const handler: Middleware | undefined =
        i < middlewares.length
          ? middlewares[i]
          : (next as Middleware | undefined);

      if (!handler) {
        // Final fallback — no route matched and no next provided.
        // The Futon instance wraps this with a 404 handler so this
        // should never surface in normal operation.
        throw new Error('No handler found for request');
      }

      return handler(ctx, () => dispatch(i + 1));
    };

    return dispatch(0);
  };
}
