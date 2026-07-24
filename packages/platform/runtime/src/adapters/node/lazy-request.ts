/**
 * Lazy `Request` shim for GET/HEAD (RFC-0005, Phase 3b).
 *
 * `new Request(url, { method, headers })` is itself the remaining cost on
 * the Node GET hot path (WHATWG URL parse, header-list validation,
 * abort-signal wiring) — paid on every request even though most handlers
 * never touch `headers`/`body`/`clone()`. This shim defers that
 * construction to the first access of any of those, matching the
 * technique `@hono/node-server` uses (`newRequest`/`requestPrototype`).
 *
 * `Object.setPrototypeOf` onto `Request.prototype` (not a Proxy) is what
 * makes `instanceof Request` true. It does NOT make the shim a real
 * `Request` to Node's own `Request` constructor: undici's implementation
 * reads internal slots directly rather than through these getters, so
 * `new Request(shim, init)` throws. Anything that needs to hand the
 * request to `new Request()`/`fetch()` must call `materializeRequest()`
 * (or use the `MATERIALIZE` symbol directly) first.
 */

export const MATERIALIZE = Symbol.for('rasenganjs.request.materialize');

const URL_KEY = Symbol('lazyRequest.url');
const METHOD_KEY = Symbol('lazyRequest.method');
const HEADERS_KEY = Symbol('lazyRequest.headers');
const REAL_KEY = Symbol('lazyRequest.real');

interface LazyRequestState {
  [URL_KEY]: string;
  [METHOD_KEY]: string;
  [HEADERS_KEY]: Array<[string, string]>;
  [REAL_KEY]?: Request;
}

function materialize(state: LazyRequestState): Request {
  return (state[REAL_KEY] ??= new Request(state[URL_KEY], {
    method: state[METHOD_KEY],
    headers: state[HEADERS_KEY],
  }));
}

const lazyRequestPrototype: Record<PropertyKey, unknown> = {
  get method(this: LazyRequestState) {
    return this[METHOD_KEY];
  },
  get url(this: LazyRequestState) {
    return this[URL_KEY];
  },
  [MATERIALIZE](this: LazyRequestState) {
    return materialize(this);
  },
};

// Everything else a `Request` exposes is only reachable through the real
// object — touching any of these is exactly the signal that construction
// can no longer be deferred.
const materializedGetters = [
  'headers',
  'body',
  'bodyUsed',
  'cache',
  'credentials',
  'destination',
  'integrity',
  'mode',
  'redirect',
  'referrer',
  'referrerPolicy',
  'signal',
  'keepalive',
] as const;

for (const key of materializedGetters) {
  Object.defineProperty(lazyRequestPrototype, key, {
    get(this: LazyRequestState) {
      return materialize(this)[key];
    },
  });
}

const materializedMethods = [
  'arrayBuffer',
  'blob',
  'clone',
  'formData',
  'json',
  'text',
] as const;

for (const key of materializedMethods) {
  Object.defineProperty(lazyRequestPrototype, key, {
    value(this: LazyRequestState, ...args: unknown[]) {
      const real = materialize(this) as unknown as Record<
        string,
        (...a: unknown[]) => unknown
      >;
      return real[key].apply(real, args);
    },
  });
}

Object.setPrototypeOf(lazyRequestPrototype, Request.prototype);

/**
 * Create a lazy `Request` shim. `method`/`url` are readable without
 * building the real `Request`; anything else materializes it once
 * (memoized) and delegates.
 */
export function createLazyRequest(
  url: string,
  method: string,
  headers: Array<[string, string]>
): Request {
  const state = Object.create(lazyRequestPrototype) as LazyRequestState;
  state[URL_KEY] = url;
  state[METHOD_KEY] = method;
  state[HEADERS_KEY] = headers;
  return state as unknown as Request;
}

/**
 * Resolve a possibly-lazy `Request` into a real one. Safe to call on an
 * already-real `Request` (returned unchanged). Use this before handing a
 * `ctx.request` off to `new Request(input, ...)` or any other API that
 * needs real internal slots rather than duck-typed getters.
 */
export function materializeRequest(request: Request): Request {
  const materializer = (
    request as unknown as { [MATERIALIZE]?: () => Request }
  )[MATERIALIZE];
  return materializer ? materializer.call(request) : request;
}
