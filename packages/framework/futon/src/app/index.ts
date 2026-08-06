/**
 * Futon — the top-level orchestrator for the request pipeline.
 *
 * Futon:
 *   1. Maintains the global middleware stack
 *   2. Owns an internal Router for route registration
 *   3. Provides a `fetch(request, runtime)` entry point
 *      conforming to the WinterCG fetch handler signature
 *   4. Supports request lifecycle hooks (beforeRequest, afterResponse, onError)
 *   5. Supports app lifecycle hooks (onInit, onDestroy)
 *   6. Handles 404 and 500 with configurable handlers
 *
 * @example
 * ```ts
 * import { Futon, json, logger, cors } from "@rasenganjs/futon";
 *
 * const app = new Futon();
 *
 * // Global middleware
 * app.use(logger());
 * app.use(cors());
 *
 * // Routes
 * app.get("/api/health", (ctx) => json({ status: "ok" }));
 *
 * // Error handling
 * app.onError((error, ctx) => {
 *   console.error(error);
 *   return json({ error: error.message }, { status: 500 });
 * });
 *
 * // Start server
 * Bun.serve({ fetch: app.fetch });
 * ```
 */

import type {
  Assets,
  Context,
  RuntimeContext,
  ServerInfo,
} from '../context/types.js';
import type { EnvironmentMap } from '../env/index.js';
import { createContext } from '../context/index.js';
import { compose } from '../middlewares/compose.js';
import type { Middleware } from '../middlewares/index.js';
import { Router } from '../router/index.js';
import { getPathname } from '../router/utils.js';
import { text } from '../response/utils.js';
import { HookSystem } from '../hooks/index.js';

export class Futon {
  private middlewares: Middleware[] = [];
  private router: Router;

  /** Lifecycle hook registry */
  readonly hooks: HookSystem;

  /**
   * Server configuration — set by the adapter before serving.
   * Accessible outside the request lifecycle (e.g. in setup code).
   */
  serverInfo?: ServerInfo;

  /**
   * Configure server info manually.
   * Called automatically by the adapter's `serve()` method.
   */
  configureServer(info: ServerInfo): this {
    this.serverInfo = info;
    return this;
  }

  /**
   * Static-asset access — set by the adapter before serving, same
   * moment as `configureServer()`. A static, process-lifetime object
   * that never changes per request (see RFC-0007 §9), so built-ins
   * like `staticFiles()` can read `ctx.runtime.assets` unconditionally
   * with no null-check — every adapter (including Workerd's no-op
   * stub) provides one.
   */
  assets?: Assets;

  /**
   * Configure asset access manually.
   * Called automatically by the adapter's `serve()` method,
   * alongside `configureServer()`.
   */
  configureAssets(assets: Assets): this {
    this.assets = assets;
    return this;
  }

  /**
   * Environment variables loaded from .env files.
   * Set by the adapter before serving.
   *
   * Accessible via `ctx.runtime.env` inside handlers/middleware
   * or `app.env` outside the request lifecycle.
   */
  env?: EnvironmentMap;

  /**
   * Load environment variables into Futon.
   * Called automatically by the adapter's `serve()` method.
   */
  loadEnv(vars: EnvironmentMap): this {
    this.env = { ...this.env, ...vars };
    return this;
  }

  constructor() {
    this.router = new Router();
    this.hooks = new HookSystem();
  }

  // ── Middleware ──────────────────────────────────────────────

  /**
   * Register global middleware.
   *
   * If a string is passed as the first argument, the middleware
   * only runs for requests whose path starts with that prefix.
   *
   * @example
   * ```ts
   * app.use(cors());                     // global
   * app.use("/api", authMiddleware);     // scoped to /api/*
   * ```
   */
  use(middleware: Middleware): this;
  use(path: string, middleware: Middleware): this;
  use(pathOrMiddleware: string | Middleware, middleware?: Middleware): this {
    if (typeof pathOrMiddleware === 'string' && middleware) {
      const path = pathOrMiddleware;
      this.middlewares.push(async (ctx, next) => {
        if (getPathname(ctx.request.url).startsWith(path)) {
          return middleware(ctx, next);
        }
        return next();
      });
    } else {
      this.middlewares.push(pathOrMiddleware as Middleware);
    }
    this._chain = null;
    return this;
  }

  // ── Route shortcuts (delegate to internal Router) ──────────

  get(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    this.router.get(pattern, handler);
    return this;
  }

  post(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    this.router.post(pattern, handler);
    return this;
  }

  put(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    this.router.put(pattern, handler);
    return this;
  }

  patch(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    this.router.patch(pattern, handler);
    return this;
  }

  delete(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    this.router.delete(pattern, handler);
    return this;
  }

  head(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    this.router.head(pattern, handler);
    return this;
  }

  options(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
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
  group(
    prefix: string,
    optionsOrCallback:
      { middlewares?: Middleware[] } | ((router: Router) => void),
    maybeCallback?: (router: Router) => void
  ): this {
    if (typeof optionsOrCallback === 'function') {
      this.router.group(prefix, optionsOrCallback);
    } else {
      this.router.group(prefix, optionsOrCallback, maybeCallback!);
    }
    return this;
  }

  // ── Router access ──────────────────────────────────────────

  /**
   * Get the internal Router instance for direct manipulation.
   * Useful when you want to build routes programmatically.
   */
  getRouter(): Router {
    return this.router;
  }

  // ── Error / 404 handlers ───────────────────────────────────

  private notFoundHandler?: (ctx: Context) => Promise<Response>;
  private fallbackHandler?: (ctx: Context) => Promise<Response>;
  private errorHandler?: (error: Error, ctx: Context) => Promise<Response>;

  /**
   * Register a custom 404 handler for unmatched routes.
   *
   * Unlike `fallback()`, any `200` response returned by `handler`
   * is coerced to `404` — this exists so a handler whose whole job
   * is rendering "page not found" markup doesn't need to remember
   * to set the status itself. If both `notFound()` and `fallback()`
   * are registered, `fallback()` takes priority (see `fallback()`
   * for why the two aren't interchangeable).
   *
   * If not set, returns a plain-text "Not Found" response.
   */
  notFound(handler: (ctx: Context) => Promise<Response>): this {
    this.notFoundHandler = handler;
    return this;
  }

  /**
   * Register a catch-all handler for unmatched routes — invoked
   * whenever no registered route matches, with no status coercion
   * of any kind: whatever status `handler` returns (`200`, `404`,
   * a redirect, ...) is sent as-is.
   *
   * This is the primitive to reach for when the catch-all is
   * expected to serve real, successful (`200`) responses some of
   * the time — e.g. an SSR framework dispatching every unmatched
   * path to a page renderer. `notFound()` is unsuitable for that:
   * it unconditionally forces `200` down to `404`, which is correct
   * for its own narrow "render a not-found page" use case but would
   * silently 404 every successful response routed through it here.
   *
   * Takes priority over `notFound()` when both are registered.
   */
  fallback(handler: (ctx: Context) => Promise<Response>): this {
    this.fallbackHandler = handler;
    return this;
  }

  /**
   * Register a global error handler for uncaught exceptions.
   *
   * If not set, returns a plain-text "Internal Server Error"
   * response with status 500.
   */
  onError(handler: (error: Error, ctx: Context) => Promise<Response>): this {
    this.errorHandler = handler;
    return this;
  }

  // ── App lifecycle (onInit / onDestroy) ─────────────────────

  private initHandlers: Array<() => void | Promise<void>> = [];
  private destroyHandlers: Array<() => void | Promise<void>> = [];

  /**
   * Register a handler that runs once before the server starts
   * accepting requests.  Handlers are called in registration order.
   *
   * Useful for async setup (DB connections, warm caches, etc.).
   */
  onInit(handler: () => void | Promise<void>): this {
    this.initHandlers.push(handler);
    return this;
  }

  /**
   * Register a handler that runs during graceful shutdown.
   * Handlers are called in registration order.
   *
   * Useful for cleanup (close DB pools, flush logs, etc.).
   */
  onDestroy(handler: () => void | Promise<void>): this {
    this.destroyHandlers.push(handler);
    return this;
  }

  /**
   * Fire all registered onInit handlers.
   * Called by the runtime adapter before the HTTP server starts.
   */
  async init(): Promise<void> {
    for (const handler of this.initHandlers) {
      await handler();
    }
  }

  /**
   * Fire all registered onDestroy handlers.
   * Called by the runtime adapter during graceful shutdown.
   */
  async destroy(): Promise<void> {
    for (const handler of this.destroyHandlers) {
      await handler();
    }
  }

  // ── Composed chain cache (RFC-0005, Phase 1a) ──────────────

  /**
   * The composed middleware chain, rebuilt lazily instead of per
   * request. Invalidated by `use()` directly and by the router's
   * registration version, so middleware/routes added after the
   * first request are still picked up — matching the previous
   * per-request-rebuild semantics.
   *
   * Safe to share across concurrent requests: `compose()` keeps
   * its double-`next()` guard state inside each invocation.
   */
  private _chain: Middleware | null = null;
  private _chainRouterVersion = -1;

  private chain(): Middleware {
    if (
      this._chain === null ||
      this._chainRouterVersion !== this.router.version
    ) {
      this._chainRouterVersion = this.router.version;
      this._chain = compose([...this.middlewares, this.router.middleware()]);
    }
    return this._chain;
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
  async fetch(
    request: Request,
    runtime: RuntimeContext = {}
  ): Promise<Response> {
    // Merge app-level props into the runtime context so they
    // flow through to every handler and middleware via ctx.runtime.*.
    const mergedRuntime: RuntimeContext = {
      ...runtime,
      env: { ...this.env, ...runtime.env },
      server: runtime.server ?? this.serverInfo,
      assets: runtime.assets ?? this.assets,
    };
    const ctx = createContext(request, {}, mergedRuntime);

    // Fire beforeRequest hook (errors here are swallowed per hook spec).
    // Guarded so hookless apps skip the async-call overhead entirely.
    if (this.hooks.has('beforeRequest')) {
      await this.hooks.emit('beforeRequest', ctx);
    }

    // Middleware chain with the router at the end, cached across
    // requests (see chain()). The final "next" is the 404 handler.
    const chain = this.chain();

    const finalHandler: () => Promise<Response> = async () => {
      if (this.fallbackHandler) {
        return await this.fallbackHandler(ctx);
      }
      if (this.notFoundHandler) {
        const res = await this.notFoundHandler(ctx);
        // Enforce 404 status if the user's handler didn't set it
        if (res.status === 200) {
          return new Response(res.body, {
            status: 404,
            headers: res.headers,
          });
        }
        return res;
      }
      return text('Not Found', { status: 404 });
    };

    let response: Response;

    try {
      response = await chain(ctx, finalHandler);
    } catch (error) {
      // Fire onError hook
      if (error instanceof Error && this.hooks.has('onError')) {
        await this.hooks.emit('onError', error, ctx);
      }

      if (this.errorHandler && error instanceof Error) {
        response = await this.errorHandler(error, ctx);
      } else {
        const message =
          error instanceof Error ? error.message : 'Internal Server Error';
        response = text(message, { status: 500 });
      }
    }

    // Fire afterResponse hook
    if (this.hooks.has('afterResponse')) {
      await this.hooks.emit('afterResponse', ctx, response);
    }

    return response;
  }
}
