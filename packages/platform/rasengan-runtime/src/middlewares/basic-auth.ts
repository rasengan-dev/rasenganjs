/**
 * Basic Auth middleware — parses `Authorization: Basic` headers
 * and makes the credentials available on `ctx.state`.
 *
 * When a `verify` callback is provided, invalid credentials
 * result in a 401 response with a `WWW-Authenticate` header.
 * Without a verify callback, the credentials are decoded and
 * stored without validation so downstream handlers can decide.
 *
 * @example
 * ```ts
 * import { basicAuth } from "@rasenganjs/runtime";
 *
 * app.use(basicAuth({ verify: (username, password) =>
 *   username === "admin" && password === "secret"
 * }));
 *
 * app.get("/protected", async (ctx) => {
 *   const { username } = ctx.get("auth");
 *   return json({ user: username });
 * });
 * ```
 */

import type { Middleware } from './index.js';
import { text } from '../response/utils.js';

export interface BasicAuthOptions {
  /** Key on ctx.state (default "auth") */
  stateKey?: string;

  /** Auth realm sent in WWW-Authenticate header (default "Protected") */
  realm?: string;

  /**
   * Optional credential validator.  If provided, requests with
   * invalid credentials receive a 401 response immediately.
   * If omitted, decoded credentials are stored without validation.
   */
  verify?: (username: string, password: string) => boolean | Promise<boolean>;
}

function decodeBase64(str: string): string {
  if (typeof atob !== 'undefined') {
    return atob(str);
  }
  return Buffer.from(str, 'base64').toString('utf-8');
}

function unauthorized(realm: string): Response {
  const headers = new Headers();
  headers.set('WWW-Authenticate', `Basic realm="${realm}", charset="UTF-8"`);
  return new Response('Unauthorized', { status: 401, headers });
}

export function basicAuth(options: BasicAuthOptions = {}): Middleware {
  const stateKey = options.stateKey ?? 'auth';
  const realm = options.realm ?? 'Protected';

  return async (ctx, next) => {
    const authHeader = ctx.request.headers.get('authorization');

    if (!authHeader || !authHeader.toLowerCase().startsWith('basic ')) {
      if (options.verify) {
        return unauthorized(realm);
      }
      return next();
    }

    const encoded = authHeader.slice(6).trim();

    let decoded: string;
    try {
      decoded = decodeBase64(encoded);
    } catch {
      if (options.verify) {
        return unauthorized(realm);
      }
      return next();
    }

    const colonIndex = decoded.indexOf(':');
    const username = colonIndex === -1 ? decoded : decoded.slice(0, colonIndex);
    const password = colonIndex === -1 ? '' : decoded.slice(colonIndex + 1);

    if (options.verify) {
      let valid: boolean;
      try {
        valid = await options.verify(username, password);
      } catch {
        valid = false;
      }

      if (!valid) {
        return unauthorized(realm);
      }
    }

    ctx.set(stateKey, { username, password });

    return next();
  };
}
