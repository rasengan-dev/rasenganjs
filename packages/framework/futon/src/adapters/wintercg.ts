/**
 * WinterCG adapter — produces a standard fetch handler that
 * can be used in any WinterCG-compatible runtime.
 *
 * This is the "export default { fetch }" pattern used by:
 *   - Cloudflare Workers
 *   - Deno (Deno.serve)
 *   - Bun (Bun.serve)
 *   - Service Workers
 *   - Node 18+ (node --experimental-fetch)
 *
 * @example
 * ```ts
 * // wrangler.toml / Cloudflare Worker
 * import { Futon, toWinterCgHandler } from "@rasenganjs/runtime";
 *
 * const app = new Futon();
 * // ... routes
 *
 * export default { fetch: toWinterCgHandler(app) };
 * ```
 *
 * @example
 * ```ts
 * // Bun / Deno
 * import { Futon, toWinterCgHandler } from "@rasenganjs/runtime";
 *
 * const app = new Futon();
 * // ... routes
 *
 * Bun.serve({ fetch: toWinterCgHandler(app) });
 * ```
 */

import type { Futon } from '../app/index.js';
import type { RuntimeContext } from '../context/types.js';

/**
 * Context that WinterCG runtimes pass to the fetch handler.
 *
 * - Cloudflare Workers: `(request, env, ctx)`
 * - Deno: `(request, info)`
 * - Bun: `(request, server)`
 * - Service Workers: `(request)`
 */
interface WinterCgFetchContext {
  /** Platform bindings / environment variables (Workers, Deno) */
  env?: Record<string, unknown>;
  /** Platform-specific context (waitUntil, passThroughOnException) */
  ctx?: {
    waitUntil?: (promise: Promise<unknown>) => void;
    passThroughOnException?: () => void;
  };
}

/**
 * Convert a Futon instance into a WinterCG-compatible
 * fetch handler.
 *
 * The returned function has the signature that WinterCG
 * expects: `(request: Request, env?: object, ctx?: object) => Promise<Response>`.
 */
export function toWinterCgHandler(app: Futon, defaultRuntime?: RuntimeContext) {
  return async (
    request: Request,
    envOrCtx?: Record<string, unknown> | WinterCgFetchContext,
    platformCtx?: WinterCgFetchContext
  ): Promise<Response> => {
    // Normalise arguments — WinterCG runtimes pass them
    // differently depending on the platform.
    let env: Record<string, unknown> | undefined;
    let waitUntil: ((promise: Promise<unknown>) => void) | undefined;

    if (platformCtx) {
      // Cloudflare Workers: (request, env, ctx)
      env = envOrCtx as Record<string, unknown>;
      waitUntil = platformCtx.ctx?.waitUntil;
    } else if (envOrCtx && 'env' in envOrCtx) {
      // Deno / some Workers-like runtimes
      env = (envOrCtx as WinterCgFetchContext).env;
      waitUntil = (envOrCtx as WinterCgFetchContext).ctx?.waitUntil;
    } else {
      // Otherwise treat as env directly
      env = envOrCtx as Record<string, unknown> | undefined;
    }

    const runtime: RuntimeContext = {
      ...defaultRuntime,
      env: {
        ...defaultRuntime?.env,
        ...Object.fromEntries(
          Object.entries(env ?? {}).map(([k, v]) => [k, String(v)])
        ),
      },
    };

    const response = await app.fetch(request, runtime);

    // If the platform supports waitUntil, expose it for background tasks
    if (waitUntil && response.headers.get('X-Rasengan-Background')) {
      waitUntil(Promise.resolve());
    }

    return response;
  };
}
