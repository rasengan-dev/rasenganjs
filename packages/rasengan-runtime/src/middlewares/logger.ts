/**
 * Logger middleware — logs each request with method, URL, status
 * code, and duration.
 *
 * The default logger writes to `console.log`.  Pass a custom
 * `log` function to integrate with your own logging framework.
 *
 * @example
 * ```ts
 * import { logger } from "@rasenganjs/runtime";
 *
 * app.use(logger());                          // default
 * app.use(logger({ log: (msg) => pino.info(msg) })); // custom
 * ```
 */

import type { Middleware } from './index.js';

export interface LoggerOptions {
  /** Custom log function.  Default `console.log` */
  log?: (message: string) => void;

  /** Include response body size in the log line */
  showSize?: boolean;

  /** Skip logging for certain path prefixes */
  skip?: string[];
}

/**
 * Create a request-logging middleware.
 *
 * Log format:
 * ```
 * → GET /api/users
 * ← 200 12ms
 * ```
 */
export function logger(options: LoggerOptions = {}): Middleware {
  const logFn = options.log ?? ((msg: string) => console.log(msg));
  const showSize = options.showSize ?? true;

  return async (ctx, next) => {
    const method = ctx.request.method;
    const url = new URL(ctx.request.url);
    const pathname = url.pathname;

    // Skip logging for excluded paths
    if (options.skip?.some((prefix) => pathname.startsWith(prefix))) {
      return next();
    }

    logFn(`→ ${method} ${pathname}${url.search}`);

    const start = Date.now();
    let response: Response;

    try {
      response = await next();
    } catch (error) {
      const ms = Date.now() - start;
      logFn(`← ${method} ${pathname} — ERROR ${ms}ms`);
      throw error;
    }

    const ms = Date.now() - start;
    const size = showSize && response.body ? ' — ?B' : '';
    logFn(`← ${method} ${pathname} — ${response.status}${size} ${ms}ms`);

    return response;
  };
}
