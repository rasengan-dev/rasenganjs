// src/context/index.ts
function createContext(request, params = {}, runtime = {}) {
  const state = {};
  const ctx = {
    request,
    params,
    runtime,
    state,
    set(key, value) {
      state[key] = value;
    },
    get(key) {
      return state[key];
    }
  };
  return ctx;
}

// src/middlewares/compose.ts
function compose(middlewares) {
  return async (ctx, next) => {
    let index = -1;
    const dispatch = async (i) => {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      const handler = i < middlewares.length ? middlewares[i] : next;
      if (!handler) {
        throw new Error("No handler found for request");
      }
      return handler(ctx, () => dispatch(i + 1));
    };
    return dispatch(0);
  };
}

// src/router/utils.ts
function matchPath(pattern, pathname) {
  const paramNames = [];
  let isCatchAll = false;
  const regexStr = pattern.replace(
    /\/:([a-zA-Z_][a-zA-Z0-9_]*)(\?|\*)?/g,
    (_, name, modifier) => {
      if (modifier === "?") {
        paramNames.push(name);
        return "(?:/([^/]+))?";
      }
      if (modifier === "*") {
        paramNames.push(name);
        return "(?:/(.*))?";
      }
      paramNames.push(name);
      return "/([^/]+)";
    }
  ).replace(/\*/g, () => {
    isCatchAll = true;
    return "(.*)";
  });
  const normalizedPath = normalizeSlashes(pathname);
  const normalizedPattern = normalizeSlashes(regexStr);
  const regex = new RegExp(`^${normalizedPattern}$`);
  const match = normalizedPath.match(regex);
  if (!match) return null;
  const params = {};
  paramNames.forEach((name, i) => {
    const value = match[i + 1];
    if (value !== void 0) {
      params[name] = decodeURIComponent(value);
    }
  });
  if (isCatchAll && paramNames.length === 0) {
    params["_"] = match[1] ? decodeURIComponent(match[1]) : "";
  }
  return params;
}
function parseQueryString(url) {
  const queryStart = url.indexOf("?");
  if (queryStart === -1) return {};
  const search = url.slice(queryStart + 1);
  const params = {};
  if (!search) return params;
  for (const part of search.split("&")) {
    const eqIndex = part.indexOf("=");
    if (eqIndex === -1) {
      params[decodeURIComponent(part)] = "";
    } else {
      const key = decodeURIComponent(part.slice(0, eqIndex));
      const value = decodeURIComponent(part.slice(eqIndex + 1));
      params[key] = value;
    }
  }
  return params;
}
function normalizeSlashes(input) {
  if (input.length > 1 && input.endsWith("/")) {
    return input.slice(0, -1);
  }
  return input;
}

// src/router/index.ts
var Router = class {
  routes = [];
  /**
   * Register route-level middleware.
   *
   * Middleware registered here only applies to routes defined
   * **after** the `.use()` call on this Router instance.
   * They run in the onion model just like app-level middleware.
   */
  stack = [];
  /**
   * Register route-level middleware.
   * All routes defined after this call will go through these
   * middlewares first.
   */
  use(...middlewares) {
    this.stack.push(...middlewares);
    return this;
  }
  // ── HTTP method shortcuts ───────────────────────────────────
  get(pattern, handler) {
    return this.add("GET", pattern, handler);
  }
  post(pattern, handler) {
    return this.add("POST", pattern, handler);
  }
  put(pattern, handler) {
    return this.add("PUT", pattern, handler);
  }
  patch(pattern, handler) {
    return this.add("PATCH", pattern, handler);
  }
  delete(pattern, handler) {
    return this.add("DELETE", pattern, handler);
  }
  head(pattern, handler) {
    return this.add("HEAD", pattern, handler);
  }
  options(pattern, handler) {
    return this.add("OPTIONS", pattern, handler);
  }
  // ── Groups ──────────────────────────────────────────────────
  /**
   * Create a scoped route group.
   *
   * All routes registered inside the callback are prefixed with
   * `prefix` and share any middleware passed via `middlewares`
   * or `options`.
   *
   * Groups can be nested.
   *
   * @example
   * ```ts
   * router.group("/api/v1", { middlewares: [auth] }, (api) => {
   *   api.get("/users", listUsers);      // → GET /api/v1/users
   *   api.post("/users", createUser);    // → POST /api/v1/users
   * });
   * ```
   */
  group(prefixOrOptions, ...rest) {
    let prefix;
    let options;
    let callback;
    if (typeof prefixOrOptions === "string") {
      prefix = prefixOrOptions;
      if (rest.length === 2) {
        options = rest[0];
        callback = rest[1];
      } else {
        options = {};
        callback = rest[0];
      }
    } else {
      prefix = prefixOrOptions.prefix ?? "";
      options = prefixOrOptions;
      callback = rest[0];
    }
    const outerDepth = this.stack.length;
    if (options.middlewares) {
      this.stack.push(...options.middlewares);
    }
    const subRouter = new SubRouter(
      this,
      prefix,
      outerDepth,
      this.stack.length
    );
    callback(subRouter);
    this.stack.length = outerDepth;
    return this;
  }
  // ── Internal ────────────────────────────────────────────────
  add(method, pattern, handler) {
    const middlewares = [...this.stack];
    this.routes.push({ method, pattern, handler, middlewares });
    return this;
  }
  /**
   * Produce a Middleware that dispatches to matching routes.
   *
   * Call `.middleware()` once and pass it to `app.use()`.
   */
  middleware() {
    const routes = [...this.routes];
    return async (ctx, next) => {
      const method = ctx.request.method.toUpperCase();
      const pathname = new URL(ctx.request.url).pathname;
      for (const route of routes) {
        if (route.method !== method) continue;
        const params = matchPath(route.pattern, pathname);
        if (params !== null) {
          ctx.params = params;
          if (route.middlewares.length > 0) {
            return runWithMiddlewares(
              ctx,
              route.middlewares,
              () => route.handler(ctx)
            );
          }
          return route.handler(ctx);
        }
      }
      return next();
    };
  }
  /** Number of registered routes (useful for debugging) */
  routesCount() {
    return this.routes.length;
  }
};
var SubRouter = class _SubRouter extends Router {
  constructor(parent, prefix, outerDepth, innerDepth) {
    super();
    this.parent = parent;
    this.prefix = prefix;
    this.outerDepth = outerDepth;
    this.innerDepth = innerDepth;
  }
  /** Prepend the group prefix to a route pattern */
  applyPrefix(pattern) {
    const base = this.prefix.endsWith("/") ? this.prefix.slice(0, -1) : this.prefix;
    const path = pattern.startsWith("/") ? pattern : `/${pattern}`;
    return `${base}${path}`;
  }
  /**
   * Route-level middleware: delegates to the parent so the
   * middleware stack stays in sync.
   */
  use(...middlewares) {
    this.parent.use(...middlewares);
    return this;
  }
  /**
   * Override add() — the single point of route registration.
   * Every method shortcut (get, post, put, ...) ultimately
   * calls add() on the parent with the prefixed pattern.
   */
  add(method, pattern, handler) {
    this.parent.add(method, this.applyPrefix(pattern), handler);
    return this;
  }
  /**
   * Nested group support: combine prefixes and delegate to parent.
   */
  group(prefixOrOptions, ...rest) {
    let subPrefix;
    let subOptions;
    let callback;
    if (typeof prefixOrOptions === "string") {
      subPrefix = prefixOrOptions;
      if (rest.length === 2) {
        subOptions = rest[0];
        callback = rest[1];
      } else {
        subOptions = {};
        callback = rest[0];
      }
    } else {
      subPrefix = prefixOrOptions.prefix ?? "";
      subOptions = prefixOrOptions;
      callback = rest[0];
    }
    const combinedPrefix = `${this.prefix}${subPrefix}`;
    if (subOptions.middlewares) {
      for (const mw of subOptions.middlewares) {
        this.parent.use(mw);
      }
    }
    const child = new _SubRouter(
      this.parent,
      combinedPrefix,
      this.outerDepth,
      this.parent["stack"].length
    );
    callback(child);
    this.parent["stack"].length = this.outerDepth;
    return this;
  }
};
async function runWithMiddlewares(ctx, middlewares, handler) {
  let index = -1;
  const dispatch = async (i) => {
    if (i <= index) throw new Error("next() called multiple times");
    index = i;
    if (i < middlewares.length) {
      return middlewares[i](ctx, () => dispatch(i + 1));
    }
    return handler();
  };
  return dispatch(0);
}

// src/response/utils.ts
function json(data, init) {
  return Response.json(data, init);
}
function text(value, init) {
  return new Response(value, init);
}
function html(value, init) {
  return new Response(value, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "text/html; charset=utf-8"
    }
  });
}
function redirect(url, status2 = 302) {
  const headers = new Headers();
  headers.set("Location", url);
  return new Response(null, { status: status2, headers });
}
function status(code, body) {
  return new Response(body, { status: code });
}
function notFound(body) {
  return status(404, body || "Not Found");
}
function streamResponse(stream, init) {
  return new Response(stream, {
    ...init,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Transfer-Encoding": "chunked",
      ...init?.headers
    }
  });
}
function nodeStreamToResponse(nodeStream, init) {
  const { readable, writable } = new TransformStream();
  nodeStream.pipe(writable);
  return streamResponse(readable, init);
}

// src/hooks/index.ts
var HookSystem = class {
  handlers = /* @__PURE__ */ new Map();
  /**
   * Register a handler for a lifecycle hook.
   *
   * Handlers are called in registration order.
   * They may be async; `emit()` awaits all of them.
   */
  on(name, handler) {
    let set = this.handlers.get(name);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      this.handlers.set(name, set);
    }
    set.add(handler);
  }
  /**
   * Remove a previously registered handler.
   */
  off(name, handler) {
    this.handlers.get(name)?.delete(handler);
  }
  /**
   * Fire all handlers registered for `name`.
   *
   * Each handler receives `args` spread as its arguments.
   * If any handler throws, subsequent handlers still run
   * (fire-and-forget within the hook scope).  The caller
   * is responsible for error reporting.
   */
  async emit(name, ...args) {
    const set = this.handlers.get(name);
    if (!set) return;
    const results = [];
    for (const handler of set) {
      try {
        const result = handler(...args);
        if (result instanceof Promise) {
          results.push(result);
        }
      } catch {
      }
    }
    await Promise.allSettled(results);
  }
  /** Remove all hook handlers (useful for testing / clean-up) */
  clear() {
    this.handlers.clear();
  }
};

// src/app/index.ts
var Application = class {
  middlewares = [];
  router;
  /** Lifecycle hook registry */
  hooks;
  constructor() {
    this.router = new Router();
    this.hooks = new HookSystem();
  }
  use(pathOrMiddleware, middleware) {
    if (typeof pathOrMiddleware === "string" && middleware) {
      const path = pathOrMiddleware;
      this.middlewares.push(async (ctx, next) => {
        const url = new URL(ctx.request.url);
        if (url.pathname.startsWith(path)) {
          return middleware(ctx, next);
        }
        return next();
      });
    } else {
      this.middlewares.push(pathOrMiddleware);
    }
    return this;
  }
  // ── Route shortcuts (delegate to internal Router) ──────────
  get(pattern, handler) {
    this.router.get(pattern, handler);
    return this;
  }
  post(pattern, handler) {
    this.router.post(pattern, handler);
    return this;
  }
  put(pattern, handler) {
    this.router.put(pattern, handler);
    return this;
  }
  patch(pattern, handler) {
    this.router.patch(pattern, handler);
    return this;
  }
  delete(pattern, handler) {
    this.router.delete(pattern, handler);
    return this;
  }
  head(pattern, handler) {
    this.router.head(pattern, handler);
    return this;
  }
  options(pattern, handler) {
    this.router.options(pattern, handler);
    return this;
  }
  // ── Groups ─────────────────────────────────────────────────
  /**
   * Create a scoped route group with shared prefix and middleware.
   *
   * Delegates to the internal Router's group method.
   *
   * @example
   * ```ts
   * app.group("/api/v1", { middlewares: [auth] }, (api) => {
   *   api.get("/users", listUsers);
   * });
   * ```
   */
  group(prefix, optionsOrCallback, maybeCallback) {
    if (typeof optionsOrCallback === "function") {
      this.router.group(prefix, optionsOrCallback);
    } else {
      this.router.group(prefix, optionsOrCallback, maybeCallback);
    }
    return this;
  }
  // ── Router access ──────────────────────────────────────────
  /**
   * Get the internal Router instance for direct manipulation.
   * Useful when you want to build routes programmatically.
   */
  getRouter() {
    return this.router;
  }
  // ── Error / 404 handlers ───────────────────────────────────
  notFoundHandler;
  errorHandler;
  /**
   * Register a custom 404 handler for unmatched routes.
   *
   * If not set, returns a plain-text "Not Found" response.
   */
  notFound(handler) {
    this.notFoundHandler = handler;
    return this;
  }
  /**
   * Register a global error handler for uncaught exceptions.
   *
   * If not set, returns a plain-text "Internal Server Error"
   * response with status 500.
   */
  onError(handler) {
    this.errorHandler = handler;
    return this;
  }
  // ── Request entry point ────────────────────────────────────
  /**
   * Main entry point — process a Request through the full
   * middleware + router pipeline.
   *
   * This is the WinterCG `fetch` handler signature.
   *
   * Lifecycle:
   *   1. Emit `beforeRequest` hook
   *   2. Create Context
   *   3. Run composed middleware chain (including Router)
   *   4. Catch errors → emit `onError` hook → error handler
   *   5. Emit `afterResponse` hook
   *   6. Return Response
   */
  async fetch(request, runtime = {}) {
    const ctx = createContext(request, {}, runtime);
    await this.hooks.emit("beforeRequest", ctx);
    const chain = compose([...this.middlewares, this.router.middleware()]);
    const finalHandler = async () => {
      if (this.notFoundHandler) {
        const res = await this.notFoundHandler(ctx);
        if (res.status === 200) {
          return new Response(res.body, {
            status: 404,
            headers: res.headers
          });
        }
        return res;
      }
      return text("Not Found", { status: 404 });
    };
    let response;
    try {
      response = await chain(ctx, finalHandler);
    } catch (error) {
      if (error instanceof Error) {
        await this.hooks.emit("onError", error, ctx);
      }
      if (this.errorHandler && error instanceof Error) {
        response = await this.errorHandler(error, ctx);
      } else {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        response = text(message, { status: 500 });
      }
    }
    await this.hooks.emit("afterResponse", ctx, response);
    return response;
  }
};

// src/request/body.ts
async function parseJson(request) {
  const text2 = await request.text();
  if (!text2) return void 0;
  return JSON.parse(text2);
}
async function parseUrlEncoded(request) {
  const text2 = await request.text();
  if (!text2) return {};
  const params = {};
  for (const part of text2.split("&")) {
    const eqIndex = part.indexOf("=");
    if (eqIndex === -1) {
      params[decodeURIComponent(part)] = "";
    } else {
      const key = decodeURIComponent(part.slice(0, eqIndex));
      const value = decodeURIComponent(part.slice(eqIndex + 1));
      params[key] = value;
    }
  }
  return params;
}
async function parseFormData(request) {
  return request.formData();
}
async function parseText(request) {
  return request.text();
}
async function parseBody(request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    return parseJson(request);
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return parseUrlEncoded(request);
  }
  if (contentType.includes("multipart/form-data")) {
    return parseFormData(request);
  }
  return parseText(request);
}

// src/middlewares/body.ts
function bodyParser(options = {}) {
  const key = options.key ?? "parsedBody";
  return async (ctx, next) => {
    const method = ctx.request.method;
    if (method === "GET" || method === "HEAD" || method === "DELETE") {
      return next();
    }
    const contentType = ctx.request.headers.get("content-type")?.toLowerCase() ?? "";
    if (options.allowedTypes) {
      const allowed = options.allowedTypes.some((t) => contentType.includes(t));
      if (!allowed) {
        return next();
      }
    }
    if (options.maxSize !== void 0) {
      const contentLength = parseInt(
        ctx.request.headers.get("content-length") ?? "0",
        10
      );
      if (contentLength > options.maxSize) {
        return new Response("Payload Too Large", { status: 413 });
      }
    }
    try {
      ctx.state[key] = await parseBody(ctx.request);
    } catch {
      ctx.state[key] = void 0;
    }
    return next();
  };
}

// src/middlewares/cors.ts
var DEFAULT_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";
var DEFAULT_ALLOWED_HEADERS = "Content-Type, Authorization";
function cors(options = {}) {
  return async (ctx, next) => {
    const origin = ctx.request.headers.get("origin") ?? "";
    let allowOrigin;
    if (options.origin === void 0 || options.origin === "*") {
      allowOrigin = options.credentials ? origin || "*" : "*";
    } else if (Array.isArray(options.origin)) {
      allowOrigin = options.origin.includes(origin) ? origin : "null";
    } else {
      allowOrigin = options.origin;
    }
    if (ctx.request.method === "OPTIONS") {
      const headers = new Headers();
      headers.set("Access-Control-Allow-Origin", allowOrigin);
      headers.set(
        "Access-Control-Allow-Methods",
        options.methods || DEFAULT_METHODS
      );
      headers.set(
        "Access-Control-Allow-Headers",
        options.allowedHeaders || DEFAULT_ALLOWED_HEADERS
      );
      if (options.credentials) {
        headers.set("Access-Control-Allow-Credentials", "true");
      }
      if (options.maxAge !== void 0) {
        headers.set("Access-Control-Max-Age", String(options.maxAge));
      }
      if (options.exposedHeaders) {
        headers.set("Access-Control-Expose-Headers", options.exposedHeaders);
      }
      return new Response(null, {
        status: options.optionsStatus ?? 204,
        headers
      });
    }
    const response = await next();
    const resHeaders = new Headers(response.headers);
    if (!resHeaders.has("Access-Control-Allow-Origin")) {
      resHeaders.set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (options.credentials && !resHeaders.has("Access-Control-Allow-Credentials")) {
      resHeaders.set("Access-Control-Allow-Credentials", "true");
    }
    if (options.exposedHeaders && !resHeaders.has("Access-Control-Expose-Headers")) {
      resHeaders.set("Access-Control-Expose-Headers", options.exposedHeaders);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders
    });
  };
}

// src/middlewares/logger.ts
function logger(options = {}) {
  const logFn = options.log ?? ((msg) => console.log(msg));
  const showSize = options.showSize ?? true;
  return async (ctx, next) => {
    const method = ctx.request.method;
    const url = new URL(ctx.request.url);
    const pathname = url.pathname;
    if (options.skip?.some((prefix) => pathname.startsWith(prefix))) {
      return next();
    }
    logFn(`\u2192 ${method} ${pathname}${url.search}`);
    const start = Date.now();
    let response;
    try {
      response = await next();
    } catch (error) {
      const ms2 = Date.now() - start;
      logFn(`\u2190 ${method} ${pathname} \u2014 ERROR ${ms2}ms`);
      throw error;
    }
    const ms = Date.now() - start;
    const size = showSize && response.body ? " \u2014 ?B" : "";
    logFn(`\u2190 ${method} ${pathname} \u2014 ${response.status}${size} ${ms}ms`);
    return response;
  };
}

// src/middlewares/request-id.ts
function defaultId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function requestId(options = {}) {
  const headerName = options.header ?? "X-Request-Id";
  const stateKey = options.stateKey ?? "requestId";
  const generate = options.generator ?? defaultId;
  return async (ctx, next) => {
    const incoming = ctx.request.headers.get(headerName);
    const id = incoming ?? generate();
    ctx.set(stateKey, id);
    const response = await next();
    const headers = new Headers(response.headers);
    if (!headers.has(headerName)) {
      headers.set(headerName, id);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  };
}

// src/middlewares/compress.ts
var MIN_THRESHOLD = 1024;
function compress(options = {}) {
  const threshold = options.threshold ?? MIN_THRESHOLD;
  const encodings = options.encodings ?? ["br", "gzip", "deflate"];
  return async (ctx, next) => {
    const response = await next();
    if (response.headers.get("Content-Encoding")) return response;
    if (response.body === null) return response;
    const contentLength = parseInt(
      response.headers.get("content-length") ?? "0",
      10
    );
    if (contentLength > 0 && contentLength < threshold) return response;
    const acceptEncoding = ctx.request.headers.get("accept-encoding") ?? "";
    let chosenEncoding = null;
    for (const enc of encodings) {
      if (acceptEncoding.includes(enc)) {
        chosenEncoding = enc;
        break;
      }
    }
    if (!chosenEncoding) return response;
    try {
      const compressed = await compressBody(response.body, chosenEncoding);
      const headers = new Headers(response.headers);
      headers.set("Content-Encoding", chosenEncoding);
      headers.delete("Content-Length");
      return new Response(compressed, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    } catch {
      return response;
    }
  };
}
async function compressBody(body, encoding) {
  if (typeof CompressionStream === "undefined") {
    throw new Error("CompressionStream not available");
  }
  const cs = new CompressionStream(encoding);
  const { readable, writable } = cs;
  const writer = writable.getWriter();
  const reader = body.getReader();
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          await writer.close();
          break;
        }
        await writer.write(value);
      }
    } catch (err) {
      await writer.abort(err);
    }
  })();
  return readable;
}

// src/response/cookies.ts
function serializeCookie(name, value, options = {}) {
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  ];
  if (options.maxAge !== void 0) {
    parts.push(`Max-Age=${Math.floor(options.maxAge)}`);
  }
  if (options.domain) {
    parts.push(`Domain=${options.domain}`);
  }
  if (options.path !== void 0) {
    parts.push(`Path=${options.path}`);
  } else {
    parts.push("Path=/");
  }
  if (options.expires) {
    parts.push(`Expires=${options.expires.toUTCString()}`);
  }
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }
  if (options.secure) {
    parts.push("Secure");
  }
  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }
  return parts.join("; ");
}
function setCookie(response, name, value, options = {}) {
  const header = serializeCookie(name, value, options);
  const headers = new Headers(response.headers);
  headers.append("Set-Cookie", header);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
function clearCookie(response, name, options = {}) {
  return setCookie(response, name, "", { ...options, maxAge: 0 });
}

// src/request/index.ts
function getPathname(request) {
  return new URL(request.url).pathname;
}
function getQueryParams(request) {
  const params = {};
  new URL(request.url).searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
function getQueryParam(request, key) {
  return new URL(request.url).searchParams.get(key);
}

// src/request/cookies.ts
function parseCookies(request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return {};
  const cookies = {};
  for (const part of cookieHeader.split(";")) {
    const eqIndex = part.indexOf("=");
    if (eqIndex === -1) continue;
    const name = part.slice(0, eqIndex).trim();
    const value = part.slice(eqIndex + 1).trim();
    if (!name) continue;
    cookies[decodeURIComponent(name)] = decodeURIComponent(value);
  }
  return cookies;
}
function getCookie(request, name) {
  return parseCookies(request)[name];
}

// src/adapters/express.ts
function toExpressHandler(app, runtime) {
  return async (req, res, next) => {
    try {
      const request = await createWebRequest(req);
      const mergedRuntime = {
        ...runtime,
        env: {
          ...runtime?.env
        }
      };
      const response = await app.fetch(request, mergedRuntime);
      await sendWebResponse(res, response);
    } catch (error) {
      next(error);
    }
  };
}
async function createWebRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] ?? "http";
  const host = req.headers["host"] ?? "localhost";
  const url = `${protocol}://${host}${req.url}`;
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === void 0) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }
  let body = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    if (req.body !== void 0 && req.body !== null) {
      body = new Blob([
        JSON.stringify(req.body)
      ]).stream();
    } else if (typeof req.on === "function") {
      body = nodeReadableToWebStream(req);
    }
  }
  return new Request(url, {
    method: req.method,
    headers,
    body
    // Express connections don't have a signal, but we keep the
    // default which is no abort.
  });
}
async function sendWebResponse(res, response) {
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (response.body) {
    const reader = response.body.getReader();
    const pump = async () => {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        return;
      }
      res.write(value);
      await pump();
    };
    await pump();
  } else {
    res.end();
  }
}
function nodeReadableToWebStream(readable) {
  return new ReadableStream({
    start(controller) {
      readable.on("data", (chunk) => {
        controller.enqueue(
          typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
      });
      readable.on("end", () => controller.close());
      readable.on("error", (err) => controller.error(err));
    }
  });
}

// src/adapters/wintercg.ts
function toWinterCgHandler(app, defaultRuntime) {
  return async (request, envOrCtx, platformCtx) => {
    let env;
    let waitUntil;
    if (platformCtx) {
      env = envOrCtx;
      waitUntil = platformCtx.ctx?.waitUntil;
    } else if (envOrCtx && "env" in envOrCtx) {
      env = envOrCtx.env;
      waitUntil = envOrCtx.ctx?.waitUntil;
    } else {
      env = envOrCtx;
    }
    const runtime = {
      ...defaultRuntime,
      env: {
        ...defaultRuntime?.env,
        ...Object.fromEntries(
          Object.entries(env ?? {}).map(([k, v]) => [k, String(v)])
        )
      }
    };
    const response = await app.fetch(request, runtime);
    if (waitUntil && response.headers.get("X-Rasengan-Background")) {
      waitUntil(Promise.resolve());
    }
    return response;
  };
}

// src/errors/index.ts
var HttpError = class extends Error {
  /** The HTTP status code (e.g. 404, 500) */
  status;
  constructor(status2, message) {
    super(message || STATUS_MESSAGES[status2] || "Unknown Error");
    this.name = "HttpError";
    this.status = status2;
  }
};
var NotFoundError = class extends HttpError {
  constructor(message = "Not Found") {
    super(404, message);
    this.name = "NotFoundError";
  }
};
var MethodNotAllowedError = class extends HttpError {
  constructor(message = "Method Not Allowed") {
    super(405, message);
    this.name = "MethodNotAllowedError";
  }
};
var InternalServerError = class extends HttpError {
  constructor(message = "Internal Server Error") {
    super(500, message);
    this.name = "InternalServerError";
  }
};
var STATUS_MESSAGES = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  413: "Payload Too Large",
  415: "Unsupported Media Type",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout"
};
export {
  Application,
  HookSystem,
  HttpError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  Router,
  bodyParser,
  clearCookie,
  compose,
  compress,
  cors,
  createContext,
  getCookie,
  getPathname,
  getQueryParam,
  getQueryParams,
  html,
  json,
  logger,
  matchPath,
  nodeStreamToResponse,
  notFound,
  parseBody,
  parseCookies,
  parseFormData,
  parseJson,
  parseQueryString,
  parseText,
  parseUrlEncoded,
  redirect,
  requestId,
  serializeCookie,
  setCookie,
  status,
  streamResponse,
  text,
  toExpressHandler,
  toWinterCgHandler
};
