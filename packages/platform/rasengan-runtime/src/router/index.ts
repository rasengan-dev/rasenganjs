import type { Context } from '../context/types.js';
import type { Middleware } from '../middlewares/index.js';
import { RasenganTreeRouter } from './radix.js';

// ── Types ──────────────────────────────────────────────────────

export type HTTPMethod =
  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/** All supported methods for building method->tree map. */
const ALL_METHODS: HTTPMethod[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
];

/** Value stored in the radix tree for each registered route. */
interface RouteEntry {
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

/**
 * Check whether a pathname exists in any registered http-method's
 * radix tree.
 *
 * Returns a list of HTTP methods for which the path has a handler.
 * Used to generate the `Allow` header on 405 responses.
 */
function getAllowedMethods(
  trees: Map<HTTPMethod, RasenganTreeRouter<RouteEntry>>,
  pathname: string
): HTTPMethod[] {
  const allowed: HTTPMethod[] = [];

  for (const [method, tree] of trees) {
    if (tree.match(pathname).handler) {
      allowed.push(method);
    }
  }

  return allowed;
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
 *   - **Radix-tree dispatch** — O(k) path matching where k = URL
 *     segment count, independent of total route count.
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
  /**
   * One radix tree per HTTP method.
   * Lazy-initialized on first route registration for that method.
   */
  private trees = new Map<HTTPMethod, RasenganTreeRouter<RouteEntry>>();

  /**
   * Total route count across all methods.
   * Incremented on every `add()` call.
   */
  private totalRoutes = 0;

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

  add(
    method: HTTPMethod,
    pattern: string,
    handler: (ctx: Context) => Promise<Response>
  ): this {
    const middlewares = [...this.stack];
    const entry: RouteEntry = { handler, middlewares };

    let tree = this.trees.get(method);
    if (!tree) {
      tree = new RasenganTreeRouter<RouteEntry>();
      this.trees.set(method, tree);
    }
    tree.add(pattern, entry);
    this.totalRoutes++;

    return this;
  }

  /**
   * Produce a Middleware that dispatches to matching routes.
   *
   * Call `.middleware()` once and pass it to `app.use()`.
   * Uses radix-tree dispatch for O(k) path matching.
   */
  middleware(): Middleware {
    // Snapshot the trees so late-registered routes after
    // middleware() is called are NOT picked up (consistent
    // with the previous linear-scan behaviour).
    const snapshot = new Map(this.trees);

    return async (
      ctx: Context,
      next: () => Promise<Response>
    ): Promise<Response> => {
      const method = ctx.request.method.toUpperCase() as HTTPMethod;
      const pathname = new URL(ctx.request.url).pathname;

      const tree = snapshot.get(method);
      if (!tree) {
        const allowed = getAllowedMethods(snapshot, pathname);
        if (allowed.length > 0) {
          return new Response(null, {
            status: 405,
            headers: { Allow: allowed.join(', ') },
          });
        }
        return next();
      }

      const result = tree.match(pathname);
      if (!result.handler) {
        const allowed = getAllowedMethods(snapshot, pathname);
        if (allowed.length > 0) {
          return new Response(null, {
            status: 405,
            headers: { Allow: allowed.join(', ') },
          });
        }
        return next();
      }

      const { handler, middlewares } = result.handler;
      ctx.params = result.params;

      if (middlewares.length > 0) {
        return runWithMiddlewares(ctx, middlewares, () => handler(ctx));
      }

      return handler(ctx);
    };
  }

  /** Number of registered routes (useful for debugging) */
  routesCount(): number {
    return this.totalRoutes;
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
   * Override add() — delegates to the parent with a prefixed
   * pattern, so the parent's radix tree stores the correct
   * full path.
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
