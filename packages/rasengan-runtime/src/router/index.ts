import type { Context } from '../context/types.js';
import type { Middleware } from '../middlewares/index.js';
import { matchPath } from './utils.js';

// ── Types ──────────────────────────────────────────────────────

export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export interface Route {
  method: HTTPMethod;
  pattern: string;
  handler: (ctx: Context) => Promise<Response>;
  middlewares: Middleware[];
}

/**
 * Configuration for a scoped route group.
 */
export interface RouterGroupOptions {
  /** URL prefix for all routes in the group */
  prefix?: string;
  /** Middleware applied to every route in the group */
  middlewares?: Middleware[];
}

// ── Router ─────────────────────────────────────────────────────

/**
 * Router — registers typed route handlers by method + pattern
 * and produces a Middleware that dispatches incoming requests.
 *
 * Features:
 *   - 7 HTTP method shortcuts (GET, POST, PUT, PATCH, DELETE,
 *     HEAD, OPTIONS)
 *   - Route-level middleware (applied per route before its handler)
 *   - Scoped `group()` with prefix and shared middleware
 *   - Produces a single `.middleware()` that plugs into the
 *     Application pipeline
 *
 * @example
 * ```ts
 * const router = new Router();
 *
 * router.get("/users", listUsers);
 * router.post("/users", createUser);
 * router.delete("/users/:id", deleteUser);
 *
 * // Scoped group with middleware
 * router.group("/api", (api) => {
 *   api.use(authMiddleware);
 *   api.get("/data", getData);
 * });
 *
 * app.use(router.middleware());
 * ```
 */
export class Router {
  private routes: Route[] = [];

  /**
   * Register route-level middleware.
   *
   * Middleware registered here only applies to routes defined
   * **after** the `.use()` call on this Router instance.
   * They run in the onion model just like app-level middleware.
   */
  private stack: Middleware[] = [];

  /**
   * Register route-level middleware.
   * All routes defined after this call will go through these
   * middlewares first.
   */
  use(...middlewares: Middleware[]): this {
    this.stack.push(...middlewares);
    return this;
  }

  // ── HTTP method shortcuts ───────────────────────────────────

  get(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    return this.add('GET', pattern, handler);
  }

  post(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    return this.add('POST', pattern, handler);
  }

  put(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    return this.add('PUT', pattern, handler);
  }

  patch(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    return this.add('PATCH', pattern, handler);
  }

  delete(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    return this.add('DELETE', pattern, handler);
  }

  head(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    return this.add('HEAD', pattern, handler);
  }

  options(pattern: string, handler: (ctx: Context) => Promise<Response>): this {
    return this.add('OPTIONS', pattern, handler);
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
  group(
    prefixOrOptions: string | RouterGroupOptions,
    ...rest:
      | [RouterGroupOptions, (router: Router) => void]
      | [(router: Router) => void]
  ): this {
    let prefix: string;
    let options: RouterGroupOptions;
    let callback: (router: Router) => void;

    if (typeof prefixOrOptions === 'string') {
      prefix = prefixOrOptions;
      if (rest.length === 2) {
        options = rest[0] as RouterGroupOptions;
        callback = rest[1] as (router: Router) => void;
      } else {
        options = {};
        callback = rest[0] as (router: Router) => void;
      }
    } else {
      prefix = prefixOrOptions.prefix ?? '';
      options = prefixOrOptions;
      callback = rest[0] as (router: Router) => void;
    }

    // Save outer stack depth so we snapshot the middleware scope
    const outerDepth = this.stack.length;

    // If the group has its own middleware, push them onto the stack
    if (options.middlewares) {
      this.stack.push(...options.middlewares);
    }

    // Capture routes + middleware stack depth at group level
    const subRouter = new SubRouter(
      this,
      prefix,
      outerDepth,
      this.stack.length
    );
    callback(subRouter);

    // Restore stack (pop group middleware)
    this.stack.length = outerDepth;

    return this;
  }

  // ── Internal ────────────────────────────────────────────────

  add(
    method: HTTPMethod,
    pattern: string,
    handler: (ctx: Context) => Promise<Response>
  ): this {
    const middlewares = [...this.stack];
    this.routes.push({ method, pattern, handler, middlewares });
    return this;
  }

  /**
   * Produce a Middleware that dispatches to matching routes.
   *
   * Call `.middleware()` once and pass it to `app.use()`.
   */
  middleware(): Middleware {
    const routes = [...this.routes];

    return async (
      ctx: Context,
      next: () => Promise<Response>
    ): Promise<Response> => {
      const method = ctx.request.method.toUpperCase() as HTTPMethod;
      const pathname = new URL(ctx.request.url).pathname;

      for (const route of routes) {
        if (route.method !== method) continue;

        const params = matchPath(route.pattern, pathname);
        if (params !== null) {
          ctx.params = params;

          // If the route has its own middleware, compose them
          // before the handler so the onion model still applies.
          if (route.middlewares.length > 0) {
            return runWithMiddlewares(ctx, route.middlewares, () =>
              route.handler(ctx)
            );
          }

          return route.handler(ctx);
        }
      }

      return next();
    };
  }

  /** Number of registered routes (useful for debugging) */
  routesCount(): number {
    return this.routes.length;
  }
}

// ── SubRouter (for groups) ─────────────────────────────────────

/**
 * SubRouter is returned inside `router.group()` callbacks.
 *
 * It extends Router so it is fully type-compatible with the
 * `Router` type used in callback signatures.  All route
 * registrations are delegated to the parent Router with the
 * group prefix prepended to the pattern.
 */
class SubRouter extends Router {
  constructor(
    private parent: Router,
    private prefix: string,
    private outerDepth: number,
    private innerDepth: number
  ) {
    super();
  }

  /** Prepend the group prefix to a route pattern */
  private applyPrefix(pattern: string): string {
    const base = this.prefix.endsWith('/')
      ? this.prefix.slice(0, -1)
      : this.prefix;
    const path = pattern.startsWith('/') ? pattern : `/${pattern}`;
    return `${base}${path}`;
  }

  /**
   * Route-level middleware: delegates to the parent so the
   * middleware stack stays in sync.
   */
  use(...middlewares: Middleware[]): this {
    this.parent.use(...middlewares);
    return this;
  }

  /**
   * Override add() — the single point of route registration.
   * Every method shortcut (get, post, put, ...) ultimately
   * calls add() on the parent with the prefixed pattern.
   */
  add(
    method: HTTPMethod,
    pattern: string,
    handler: (ctx: Context) => Promise<Response>
  ): this {
    this.parent.add(method, this.applyPrefix(pattern), handler);
    return this;
  }

  /**
   * Nested group support: combine prefixes and delegate to parent.
   */
  group(
    prefixOrOptions: string | RouterGroupOptions,
    ...rest:
      | [RouterGroupOptions, (router: SubRouter) => void]
      | [(router: SubRouter) => void]
  ): this {
    let subPrefix: string;
    let subOptions: RouterGroupOptions;
    let callback: (router: SubRouter) => void;

    if (typeof prefixOrOptions === 'string') {
      subPrefix = prefixOrOptions;
      if (rest.length === 2) {
        subOptions = rest[0] as RouterGroupOptions;
        callback = rest[1] as (router: SubRouter) => void;
      } else {
        subOptions = {};
        callback = rest[0] as (router: SubRouter) => void;
      }
    } else {
      subPrefix = prefixOrOptions.prefix ?? '';
      subOptions = prefixOrOptions;
      callback = rest[0] as (router: SubRouter) => void;
    }

    const combinedPrefix = `${this.prefix}${subPrefix}`;

    if (subOptions.middlewares) {
      for (const mw of subOptions.middlewares) {
        this.parent.use(mw);
      }
    }

    const child = new SubRouter(
      this.parent,
      combinedPrefix,
      this.outerDepth,
      this.parent['stack'].length
    );
    callback(child);

    this.parent['stack'].length = this.outerDepth;

    return this;
  }
}

// ── Route-level middleware runner ──────────────────────────────

/**
 * Run a chain of route-level middlewares before the final handler,
 * preserving the onion model.
 */
async function runWithMiddlewares(
  ctx: Context,
  middlewares: Middleware[],
  handler: () => Promise<Response>
): Promise<Response> {
  let index = -1;

  const dispatch = async (i: number): Promise<Response> => {
    if (i <= index) throw new Error('next() called multiple times');
    index = i;

    if (i < middlewares.length) {
      return middlewares[i](ctx, () => dispatch(i + 1));
    }

    return handler();
  };

  return dispatch(0);
}
