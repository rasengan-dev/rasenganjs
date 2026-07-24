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

  /**
   * Server info — populated by the adapter when the
   * Futon instance is served.
   *
   * Available at any point during runtime:
   * ```ts
   * ctx.runtime.server?.port     // the bound port
   * ctx.runtime.server?.mode     // 'development' | 'production'
   * ctx.runtime.server?.preset   // 'node' | 'bun' | 'express' | etc.
   * ```
   */
  server?: ServerInfo;
}

/**
 * Information about the running server instance.
 * Set by the adapter before serving, accessible via
 * `ctx.runtime.server` inside handlers/middleware
 * or `app.serverInfo` outside the request lifecycle.
 */
export interface ServerInfo {
  /** Platform adapter name */
  preset: 'node' | 'bun' | 'express' | 'workerd' | 'wintercg' | 'unknown';
  /** Runtime mode */
  mode: 'development' | 'production';
  /** Port the server is listening on */
  port: number;
  /** Host interface the server is bound to */
  host: string;
  /** Project root directory */
  rootDir: string;
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

import type { ResponseBuilder } from '../response/builder.js';

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
 *
 * `res` provides a chainable response builder for constructing
 * responses with a fluent API.
 *
 * @typeParam Body   — Typed request body (set by body parser + validation)
 * @typeParam Params — Typed URL path parameters
 * @typeParam Query  — Typed query parameters (intersected with callable access)
 */
export interface Context<
  Body = any,
  Params = Record<string, string>,
  Query = QueryParams,
> {
  /** The incoming Web API Request */
  request: Request;
  req: Request;

  /**
   * Parsed request body.
   *
   * Set by the body parser middleware after reading the request body.
   * When validation is configured, this contains the validated &
   * coerced data instead of the raw parsed body.
   *
   * Starts as `undefined` — safe to access only after body parser
   * middleware has run.
   */
  body: Body;

  /** URL path parameters extracted by the Router */
  params: Params;

  /**
   * Parsed URL query parameters.
   *
   * Accessible as both an object property and a callable:
   * ```ts
   * ctx.query.page        // "2"
   * ctx.query('page')     // "2"
   * ```
   *
   * When a query schema is provided via the Router, the property
   * access types are narrowed to the Zod-inferred shape. The
   * callable signature always returns `string | undefined`.
   *
   * Parsed lazily on first access and cached thereafter.
   */
  query: Query & QueryParams;

  /** Runtime environment info */
  runtime: RuntimeContext;

  /**
   * Chainable response builder.
   *
   * Provides a fluent API for constructing responses:
   * ```ts
   * return ctx.res.status(201).json({ created: true });
   * return ctx.res.status(404).send("Not found");
   * return ctx.res.redirect("/login");
   * ```
   *
   * Created lazily on first access and cached thereafter.
   */
  response: ResponseBuilder;
  res: ResponseBuilder;

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
