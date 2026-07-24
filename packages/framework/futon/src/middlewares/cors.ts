/**
 * CORS middleware — Cross-Origin Resource Sharing.
 *
 * Handles preflight OPTIONS requests and sets the appropriate
 * CORS headers on every response.
 *
 * @example
 * ```ts
 * import { cors } from "@rasenganjs/runtime";
 *
 * app.use(cors({
 *   origin: "https://myapp.com",
 *   credentials: true,
 * }));
 * ```
 */

import type { Middleware } from './index.js';

export interface CORSOptions {
  /** Allowed origin(s). Default "*" */
  origin?: string | string[];

  /** Allowed methods. Default "GET, POST, PUT, PATCH, DELETE, OPTIONS" */
  methods?: string;

  /** Allowed headers. Default "Content-Type, Authorization" */
  allowedHeaders?: string;

  /** Exposed headers (visible to the browser) */
  exposedHeaders?: string;

  /** Whether to allow credentials (cookies, auth headers) */
  credentials?: boolean;

  /** Max age for preflight cache (seconds) */
  maxAge?: number;

  /** Status code for preflight responses. Default 204 */
  optionsStatus?: number;
}

const DEFAULT_ORIGIN = '*';
const DEFAULT_METHODS = 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
const DEFAULT_ALLOWED_HEADERS = 'Content-Type, Authorization';

/**
 * Create CORS middleware.
 *
 * For each request:
 *   1. If it's an OPTIONS preflight, respond immediately with the
 *      configured CORS headers (no further middleware runs).
 *   2. For all other requests, let the chain proceed, then CORS
 *      headers are appended to the outgoing Response.
 */
export function cors(options: CORSOptions = {}): Middleware {
  return async (ctx, next) => {
    const origin = ctx.request.headers.get('origin') ?? '';

    // ── Determine the Access-Control-Allow-Origin value ─────
    let allowOrigin: string;
    if (options.origin === undefined || options.origin === '*') {
      allowOrigin = options.credentials ? origin || '*' : '*';
    } else if (Array.isArray(options.origin)) {
      allowOrigin = options.origin.includes(origin) ? origin : 'null';
    } else {
      allowOrigin = options.origin;
    }

    // ── Preflight ───────────────────────────────────────────
    if (ctx.request.method === 'OPTIONS') {
      const headers = new Headers();
      headers.set('Access-Control-Allow-Origin', allowOrigin);
      headers.set(
        'Access-Control-Allow-Methods',
        options.methods || DEFAULT_METHODS
      );
      headers.set(
        'Access-Control-Allow-Headers',
        options.allowedHeaders || DEFAULT_ALLOWED_HEADERS
      );

      if (options.credentials) {
        headers.set('Access-Control-Allow-Credentials', 'true');
      }
      if (options.maxAge !== undefined) {
        headers.set('Access-Control-Max-Age', String(options.maxAge));
      }
      if (options.exposedHeaders) {
        headers.set('Access-Control-Expose-Headers', options.exposedHeaders);
      }

      return new Response(null, {
        status: options.optionsStatus ?? 204,
        headers,
      });
    }

    // ── Regular request — let the chain run, then decorate ──
    const response = await next();

    const resHeaders = new Headers(response.headers);

    // Only set if not already present (allows inner handlers to override)
    if (!resHeaders.has('Access-Control-Allow-Origin')) {
      resHeaders.set('Access-Control-Allow-Origin', allowOrigin);
    }
    if (
      options.credentials &&
      !resHeaders.has('Access-Control-Allow-Credentials')
    ) {
      resHeaders.set('Access-Control-Allow-Credentials', 'true');
    }
    if (
      options.exposedHeaders &&
      !resHeaders.has('Access-Control-Expose-Headers')
    ) {
      resHeaders.set('Access-Control-Expose-Headers', options.exposedHeaders);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
    });
  };
}
