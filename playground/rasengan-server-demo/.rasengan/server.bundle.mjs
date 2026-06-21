// ../../packages/rasengan-runtime/dist/index.js
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
function normalizeSlashes(input) {
  if (input.length > 1 && input.endsWith("/")) {
    return input.slice(0, -1);
  }
  return input;
}
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

// ../../packages/rasengan-server/dist/index.js
var Container = class {
  registry = /* @__PURE__ */ new Map();
  register(provider) {
    if (typeof provider === "function") {
      this.registry.set(provider, {});
      return;
    }
    this.registry.set(provider.provide, {
      useClass: provider.useClass ?? provider.provide,
      useValue: provider.useValue,
      deps: provider.deps
    });
  }
  resolve(token) {
    if (typeof token === "string") {
      return this.resolveByName(token);
    }
    return this.resolveByClass(token);
  }
  resolveByClass(token) {
    const entry = this.registry.get(token);
    if (!entry) {
      for (const [key, val] of this.registry) {
        if (typeof key === "function" && key.name === token.name) {
          return this.instantiate(val, token);
        }
      }
      return this.instantiate({}, token);
    }
    return this.instantiate(entry, token);
  }
  resolveByName(name) {
    for (const [key, val] of this.registry) {
      if (typeof key === "function" && key.name.toLowerCase() === name.toLowerCase()) {
        return this.instantiate(val, key);
      }
      if (typeof key === "string" && key === name) {
        return this.instantiate(val, null);
      }
    }
    throw new Error(`Cannot resolve dependency "${name}"`);
  }
  instantiate(entry, fallbackToken) {
    if (entry.instance !== void 0) return entry.instance;
    if ("useValue" in entry && entry.useValue !== void 0) {
      return entry.useValue;
    }
    const target = entry.useClass || fallbackToken;
    if (!target) throw new Error("No class to instantiate");
    if (entry.deps) {
      entry.instance = new target(...entry.deps.map((d) => this.resolve(d)));
    } else {
      const paramNames = getConstructorParamNames(target);
      if (paramNames.length > 0) {
        entry.instance = new target(...paramNames.map((n) => this.resolveByName(n)));
      } else {
        entry.instance = new target();
      }
    }
    return entry.instance;
  }
};
function getConstructorParamNames(fn) {
  const src = fn.toString().replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const match = src.match(/constructor\s*\(([^)]*)\)/);
  if (!match) return [];
  return match[1].split(",").map((s) => s.trim()).filter(Boolean).map((s) => s.split(/[:=]/)[0].trim()).filter(Boolean);
}
function enhanceContext(ctx) {
  return {
    ...ctx,
    json: (data, init) => json(data, init),
    text: (value, init) => text(value, init),
    html: (value, init) => html(value, init),
    redirect: (url, status = 302) => redirect(url, status)
  };
}
var ServerRouter = class {
  constructor(registrar) {
    this.registrar = registrar;
  }
  get(path, handler) {
    this.registrar.get(path, (ctx) => Promise.resolve(handler(enhanceContext(ctx))));
  }
  post(path, handler) {
    this.registrar.post(path, (ctx) => Promise.resolve(handler(enhanceContext(ctx))));
  }
  put(path, handler) {
    this.registrar.put(path, (ctx) => Promise.resolve(handler(enhanceContext(ctx))));
  }
  patch(path, handler) {
    this.registrar.patch(path, (ctx) => Promise.resolve(handler(enhanceContext(ctx))));
  }
  delete(path, handler) {
    this.registrar.delete(path, (ctx) => Promise.resolve(handler(enhanceContext(ctx))));
  }
};
var ServerApp = class {
  modules = [];
  middlewareList = [];
  corsOptions;
  errorHandler;
  notFoundHandler;
  registerModule(mod) {
    this.modules.push(typeof mod === "function" ? mod() : mod);
  }
  use(middleware) {
    this.middlewareList.push({ middleware });
  }
  enableCors(options) {
    this.corsOptions = options ?? {};
  }
  onError(handler) {
    this.errorHandler = handler;
  }
  notFound(handler) {
    this.notFoundHandler = handler;
  }
  compile() {
    const app = new Application();
    for (const { middleware } of this.middlewareList) {
      app.use(middleware);
    }
    if (this.corsOptions !== void 0) {
      app.use(cors(this.corsOptions));
    }
    if (this.errorHandler) app.onError(this.errorHandler);
    if (this.notFoundHandler) app.notFound(this.notFoundHandler);
    const flatModules = flattenModules(this.modules);
    const container = new Container();
    for (const mod of flatModules) {
      for (const provider of mod.providers || []) {
        container.register(provider);
      }
    }
    for (const mod of flatModules) {
      this.registerControllers(app, container, mod);
    }
    return app;
  }
  registerControllers(app, container, mod) {
    for (const ctrl of mod.controllers || []) {
      const instance = container.resolve(ctrl);
      if (!instance.routes || typeof instance.routes !== "function") {
        throw new Error(`Controller ${ctrl.name} must implement routes()`);
      }
      if (mod.prefix) {
        app.group(mod.prefix, (router) => {
          instance.routes(new ServerRouter(router));
        });
      } else {
        instance.routes(new ServerRouter(app));
      }
    }
  }
};
function flattenModules(modules) {
  const result = [];
  for (const mod of modules) {
    result.push(mod);
    if (mod.imports) {
      result.push(...flattenModules(mod.imports));
    }
  }
  return result;
}
async function importPkg(name) {
  return import(name);
}
async function selectAdapter(options) {
  if (options.production) {
    return loadProdAdapter(options);
  }
  return detectDevAdapter(options);
}
async function detectDevAdapter(options) {
  try {
    const isBun = typeof process !== "undefined" && typeof process.versions !== "undefined" && process.versions.bun;
    if (isBun) {
      const mod2 = await importPkg("@rasenganjs/runtime-bun");
      return new mod2.BunDevAdapter({
        port: options.port,
        host: options.host
      });
    }
  } catch {
  }
  const mod = await importPkg("@rasenganjs/runtime-node");
  return new mod.NodeDevAdapter({ port: options.port, host: options.host });
}
async function loadProdAdapter(options) {
  switch (options.preset) {
    case "bun": {
      const mod = await importPkg("@rasenganjs/runtime-bun");
      return new mod.BunProdAdapter({
        port: options.port,
        host: options.host
      });
    }
    case "workerd": {
      const mod = await importPkg("@rasenganjs/runtime-workerd");
      return new mod.WorkerdProdAdapter();
    }
    default: {
      const mod = await importPkg("@rasenganjs/runtime-node");
      return new mod.NodeProdAdapter({
        port: options.port,
        host: options.host
      });
    }
  }
}
async function bootstrap(callback, options = {}) {
  const serverApp = new ServerApp();
  await callback(serverApp);
  const runtimeApp = serverApp.compile();
  const adapter = await selectAdapter(options);
  if (options.serveOptions) {
    await adapter.serve(runtimeApp, options.serveOptions);
  } else {
    await adapter.serve(runtimeApp);
  }
  return {
    close: () => adapter.close(),
    app: serverApp
  };
}
function defineModule(config) {
  return config;
}

// src/user.controller.ts
var UserController = class {
  constructor(userService) {
    this.userService = userService;
  }
  routes(router) {
    router.get("/", this.findAll);
    router.get("/:id", this.findOne);
  }
  findAll = async (ctx) => {
    const list = await this.userService.findAll();
    return ctx.json(list);
  };
  findOne = async (ctx) => {
    const user = await this.userService.findById(ctx.params.id);
    return ctx.json(user);
  };
};

// src/user.service.ts
var UserService = class {
  async findAll() {
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ];
  }
  async findById(id) {
    return { id, name: "Alice" };
  }
};

// src/user.module.ts
var user_module_default = defineModule({
  prefix: "/users",
  controllers: [UserController],
  providers: [UserService]
});

// src/ping.controller.ts
var PingController = class {
  routes(router) {
    router.get("/ping", this.ping);
  }
  ping = async (ctx) => {
    return ctx.json({ ok: true });
  };
};

// src/app.module.ts
var app_module_default = defineModule({
  imports: [user_module_default],
  controllers: [PingController]
});

// src/main.ts
var port = Number(process.env.RASENGAN_SERVER_PORT) || 3e3;
var host = process.env.RASENGAN_SERVER_HOST || "0.0.0.0";
bootstrap(
  async (app) => {
    app.registerModule(app_module_default);
  },
  { port, host }
);
