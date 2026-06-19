/**
 * Application — the top-level orchestrator for the request pipeline.
 *
 * The Application:
 *   1. Maintains the global middleware stack
 *   2. Owns an internal Router for route registration
 *   3. Provides a `fetch(request, runtime)` entry point
 *      conforming to the WinterCG fetch handler signature
 *   4. Supports lifecycle hooks (beforeRequest, afterResponse, onError)
 *   5. Handles 404 and 500 with configurable handlers
 *
 * @example
 * ```ts
 * import { Application, json } from "@rasenganjs/runtime";
 *
 * const app = new Application();
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
 * const handler = toWinterCgHandler(app);
 * Bun.serve({ fetch: handler });
 * ```
 */

import type { Context, RuntimeContext } from '../context/types.js';
import { createContext } from '../context/index.js';
import { compose } from '../middlewares/compose.js';
import type { Middleware } from '../middlewares/index.js';
import { Router, type HTTPMethod } from '../router/index.js';
import { text } from '../response/utils.js';
import { HookSystem, type HookName } from '../hooks/index.js';

export class Application {
  private middlewares: Middleware[] = [];
  private router: Router;

  /** Lifecycle hook registry */
  readonly hooks: HookSystem;

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
        const url = new URL(ctx.request.url);
        if (url.pathname.startsWith(path)) {
          return middleware(ctx, next);
        }
        return next();
      });
    } else {
      this.middlewares.push(pathOrMiddleware as Middleware);
    }
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
      | { middlewares?: Middleware[] }
      | ((router: Router) => void),
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
  private errorHandler?: (error: Error, ctx: Context) => Promise<Response>;

  /**
   * Register a custom 404 handler for unmatched routes.
   *
   * If not set, returns a plain-text "Not Found" response.
   */
  notFound(handler: (ctx: Context) => Promise<Response>): this {
    this.notFoundHandler = handler;
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
    const ctx = createContext(request, {}, runtime);

    // Fire beforeRequest hook (errors here are swallowed per hook spec)
    await this.hooks.emit('beforeRequest', ctx);

    // Build the middleware chain with the router at the end.
    // The final "next" is the 404 handler.
    const chain = compose([...this.middlewares, this.router.middleware()]);

    const finalHandler: () => Promise<Response> = async () => {
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
      if (error instanceof Error) {
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
    await this.hooks.emit('afterResponse', ctx, response);

    return response;
  }
}
