import type { Context, QueryParams, RuntimeContext } from './types.js';
import { ResponseBuilder } from '../response/builder.js';
import { parseQueryString } from '../router/utils.js';

/**
 * Factory that creates a fresh Context for every incoming request.
 *
 * Each context gets its own `state` bag (empty object) and
 * frozen-ish `set`/`get` accessors so middlewares can pass
 * data without polluting the request object.
 *
 * `query` is lazily parsed on first access — if no handler
 * reads query params, the URL is never parsed.
 *
 * `response` is lazily created on first access — if no handler
 * uses the chainable API, no builder is allocated.
 */
export function createContext(
  request: Request,
  params: Record<string, string> = {},
  runtime: RuntimeContext = {}
): Context {
  const state: Record<string, unknown> = {};
  let _query: QueryParams | undefined;
  let _response: ResponseBuilder | undefined;

  const ctx: Context = {
    request,
    req: request,
    body: undefined,
    params,
    runtime,
    state,

    get query(): QueryParams {
      if (!_query) {
        _query = createQueryParams(request.url);
      }
      return _query;
    },

    get response(): ResponseBuilder {
      if (!_response) {
        _response = new ResponseBuilder();
      }
      return _response;
    },

    get res(): ResponseBuilder {
      if (!_response) {
        _response = new ResponseBuilder();
      }
      return _response;
    },

    set<T = unknown>(key: string, value: T): void {
      state[key] = value;
    },

    get<T = unknown>(key: string): T | undefined {
      return state[key] as T | undefined;
    },
  };

  return ctx;
}

/**
 * Build a QueryParams object from a URL string.
 *
 * Returns a function that also carries every query param as
 * an own property — enabling both `ctx.query('key')` call
 * and `ctx.query.key` property access.
 *
 * Properties are set via defineProperty to avoid conflicts
 * with read-only built-in function properties (e.g. `.name`).
 */
function createQueryParams(url: string): QueryParams {
  const params = parseQueryString(url);
  const fn = (key: string): string | undefined => params[key];

  for (const key of Object.keys(params)) {
    Object.defineProperty(fn, key, {
      value: params[key],
      enumerable: true,
      writable: false,
      configurable: true,
    });
  }

  return fn as QueryParams;
}
