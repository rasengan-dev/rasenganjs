/**
 * Logger middleware — logs each request with method, URL, status
 * code, duration, and (optionally) response size.
 *
 * The default formatter prints a single-line combined log with
 * ANSI colors for method and status.  Pass a custom `log`
 * function to receive a structured `LogEntry` object and format
 * it however you like — plain text, JSON, pino, etc.
 *
 * @example
 * ```ts
 * import { logger } from "@rasenganjs/runtime";
 *
 * app.use(logger());                                    // default with colors
 * app.use(logger({ methodPadding: 8 }));                // wider method column
 * app.use(logger({ log: (e) => pino.info(e) }));       // structured to pino
 * app.use(logger({ log: (e) =>                        // custom formatting
 *   console.log(`${e.method} ${e.pathname} ${e.status} ${e.duration}ms`)
 * }));
 * ```
 */

import type { Middleware } from './index.js';

export interface LogEntry {
  /** HTTP method (GET, POST, PUT, etc.) */
  method: string;

  /** URL pathname (e.g. /api/users) */
  pathname: string;

  /** URL search string including leading ? (empty string if none) */
  search: string;

  /** HTTP response status code (0 if downstream threw) */
  status: number;

  /** Response time in milliseconds */
  duration: number;

  /** Response Content-Length in bytes, or null if unknown */
  size: number | null;
}

export interface LoggerOptions {
  /**
   * Custom log function.  Receives a structured `LogEntry`
   * object instead of a pre-formatted string, so you can
   * control appearance, colors, serialization, etc.
   *
   * Default prints a colored single-line combined log.
   */
  log?: (entry: LogEntry) => void;

  /** Skip logging for certain path prefixes */
  skip?: string[];

  /**
   * Pad HTTP method to this width so paths align vertically.
   * Default is 6 (covers the longest standard method, DELETE).
   */
  methodPadding?: number;
}

// ── ANSI color constants ───────────────────────────────────
const fg = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
} as const;

function colorizeMethod(method: string): string {
  switch (method) {
    case 'GET':
      return `${fg.green}${method}${fg.reset}`;
    case 'POST':
      return `${fg.blue}${method}${fg.reset}`;
    case 'PUT':
      return `${fg.yellow}${method}${fg.reset}`;
    case 'PATCH':
      return `${fg.cyan}${method}${fg.reset}`;
    case 'DELETE':
      return `${fg.red}${method}${fg.reset}`;
    case 'HEAD':
      return `${fg.magenta}${method}${fg.reset}`;
    case 'OPTIONS':
      return `${fg.gray}${method}${fg.reset}`;
    default:
      return method;
  }
}

function colorizeStatus(status: number): string {
  if (status === 0) return `${fg.red}${fg.bold}ERROR${fg.reset}`;

  const group = Math.floor(status / 100);
  switch (group) {
    case 2:
      return `${fg.green}${status}${fg.reset}`;
    case 3:
      return `${fg.cyan}${status}${fg.reset}`;
    case 4:
      return `${fg.yellow}${status}${fg.reset}`;
    case 5:
      return `${fg.red}${status}${fg.reset}`;
    default:
      return String(status);
  }
}

function defaultFormatter(entry: LogEntry, methodPadding: number): string {
  const method = entry.method.padEnd(methodPadding);
  const coloredMethod = colorizeMethod(method);
  const coloredStatus = colorizeStatus(entry.status);
  const search = entry.search || '';
  const size = entry.size !== null ? ` ${entry.size}B` : '';

  return `${new Date().toISOString()} [Futon] ${coloredMethod}: ${entry.pathname}${search} ${coloredStatus} ${entry.duration}ms${size}`;
}

export function logger(options: LoggerOptions = {}): Middleware {
  const methodPadding = options.methodPadding ?? 6;
  const logFn =
    options.log ??
    ((entry: LogEntry) => {
      console.log(defaultFormatter(entry, methodPadding));
    });

  return async (ctx, next) => {
    const method = ctx.request.method;
    const url = new URL(ctx.request.url);
    const pathname = url.pathname;

    if (options.skip?.some((prefix) => pathname.startsWith(prefix))) {
      return next();
    }

    const start = performance.now();
    let response: Response;

    try {
      response = await next();
    } catch (error) {
      const duration = Math.round(performance.now() - start);
      logFn({
        method,
        pathname,
        search: url.search,
        status: 0,
        duration,
        size: null,
      });
      throw error;
    }

    const duration = Math.round(performance.now() - start);
    const contentLength = response.headers.get('content-length');
    const size = contentLength !== null ? parseInt(contentLength, 10) : null;

    logFn({
      method,
      pathname,
      search: url.search,
      status: response.status,
      duration,
      size,
    });

    return response;
  };
}
