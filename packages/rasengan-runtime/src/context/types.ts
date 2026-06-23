/**
 * Context types — the core types that flow through every
 * middleware and handler.
 *
 * The design follows WinterCG conventions:
 *   - `request` is a standard Web API Request
 *   - `params` holds path parameters extracted by the router
 *   - `runtime` carries environment info (env vars, platform)
 *   - `state` is a mutable bag for passing data between
 *     middlewares (e.g. auth → handler, logger → error handler)
 */

/**
 * Runtime environment information.
 * This is the only platform-specific concept in Context.
 * It lets the same handler code run in Node, Bun, Deno,
 * Cloudflare Workers, etc. by carrying env vars and
 * (optionally) platform bindings.
 */
export interface RuntimeContext {
  env?: Record<string, string>;
}

/**
 * Query parameters — both callable and indexable.
 *
 * Access a single param by key:
 * ```ts
 * ctx.query('page')   // "2"
 * ```
 *
 * Or read it as a property:
 * ```ts
 * ctx.query.page      // "2"
 * ```
 *
 * Iterate all params:
 * ```ts
 * Object.keys(ctx.query)  // ["page", "limit", ...]
 * ```
 */
export interface QueryParams {
  (key: string): string | undefined;
  [key: string]: string | undefined;
}

/**
 * Request-scoped context that every middleware and handler
 * receives.
 *
 * `state` replaces the ad-hoc pattern of decorating the
 * request object.  Middlewares write to it (auth sets
 * `state.user`), handlers and later middlewares read it.
 *
 * `query` provides lazy access to URL query parameters:
 * parsed on first access via a getter, then cached.
 */
export interface Context {
  /** The incoming Web API Request */
  request: Request;

  /** URL path parameters extracted by the Router */
  params: Record<string, string>;

  /**
   * Parsed URL query parameters.
   *
   * Accessible as both an object property and a callable:
   * ```ts
   * ctx.query.page        // "2"
   * ctx.query('page')     // "2"
   * ```
   *
   * Parsed lazily on first access and cached thereafter.
   * Returns `undefined` for missing keys.
   */
  query: QueryParams;

  /** Runtime environment info */
  runtime: RuntimeContext;

  /**
   * Shared mutable state — the primary channel for
   * middleware-to-middleware and middleware-to-handler
   * communication.
   *
   * @example
   * ```ts
   * // auth middleware
   * app.use(async (ctx, next) => {
   *   ctx.set('user', await authenticate(ctx.request));
   *   return next();
   * });
   *
   * // handler
   * app.get('/me', async (ctx) => {
   *   const user = ctx.get('user');
   *   return json(user);
   * });
   * ```
   */
  state: Record<string, unknown>;

  /** Store a value on the context state bag */
  set<T = unknown>(key: string, value: T): void;

  /** Retrieve a value from the context state bag */
  get<T = unknown>(key: string): T | undefined;
}
