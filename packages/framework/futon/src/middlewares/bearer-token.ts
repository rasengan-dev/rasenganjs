/**
 * Bearer Token middleware — extracts a Bearer token from the
 * `Authorization` header and stores it on `ctx.state`.
 *
 * When a `verify` callback is provided, invalid tokens result
 * in a 401 response.  Without a verify callback, the token is
 * stored as-is so downstream handlers can validate it themselves.
 *
 * @example
 * ```ts
 * import { bearerToken } from "@rasenganjs/runtime";
 *
 * // Extraction only — validate in handler
 * app.use(bearerToken());
 *
 * // With verification
 * app.use(bearerToken({
 *   verify: async (token) => {
 *     const user = await db.users.findByToken(token);
 *     return user ?? false;
 *   }
 * }));
 *
 * app.get("/me", async (ctx) => {
 *   const token = ctx.get("token");
 *   return json({ token });
 * });
 * ```
 */

import type { Middleware } from './index.js';

export interface BearerTokenOptions {
  /** Key on ctx.state (default "token") */
  stateKey?: string;

  /**
   * Optional token validator.  If provided, the return value is
   * stored on `ctx.state` instead of the raw token string.
   * Return `false` or `null` to reject (sends 401).
   */
  verify?: (token: string) => unknown | Promise<unknown>;
}

function unauthorized(): Response {
  const headers = new Headers();
  headers.set('WWW-Authenticate', 'Bearer');
  return new Response('Unauthorized', { status: 401, headers });
}

export function bearerToken(options: BearerTokenOptions = {}): Middleware {
  const stateKey = options.stateKey ?? 'token';

  return async (ctx, next) => {
    const authHeader = ctx.request.headers.get('authorization');

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
      if (options.verify) {
        return unauthorized();
      }
      return next();
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      if (options.verify) {
        return unauthorized();
      }
      return next();
    }

    if (options.verify) {
      let result: unknown;
      try {
        result = await options.verify(token);
      } catch {
        result = false;
      }

      if (result === false || result === null || result === undefined) {
        return unauthorized();
      }

      ctx.set(stateKey, result);
      return next();
    }

    ctx.set(stateKey, token);
    return next();
  };
}
