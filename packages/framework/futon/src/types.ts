import type { Context, QueryParams } from './context/types.js';

/**
 * A FetchHandler is the fundamental request handler primitive.
 * It accepts a Request and a optional Runtime Adapter and
 * returns a Promise<Response>.
 *
 * This is the lowest-level building block — every middleware,
 * route handler, and error handler ultimately conforms to this
 * shape (though middleware additionally calls next()).
 */
export type FetchHandler = (
  request: Request,
  runtime?: any
) => Promise<Response>;

/**
 * A typed route handler (RFC-0013 Phase 2).
 *
 * `Env` is the shape of `ctx.runtime.env` — declare a project's own
 * `Bindings` type and pass it to `new Futon<Bindings>()` to get full
 * autocomplete here, the same ergonomics as Hono's `c.env`. Defaults
 * to `Record<string, unknown>` so an untyped `new Futon()` needs no
 * changes.
 *
 * @example
 * ```ts
 * type Bindings = { DB: D1Database };
 * const app = new Futon<Bindings>();
 *
 * app.get("/products", async (ctx) => {
 *   const rows = await ctx.runtime.env.DB.prepare("select * from products").all();
 *   return json(rows);
 * });
 * ```
 */
export type Handler<
  Env = Record<string, unknown>,
  Params = Record<string, string>,
> = (ctx: Context<any, Params, QueryParams, Env>) => Promise<Response>;

/** Signature accepted by `Futon.onError()` (RFC-0013 Phase 2). */
export type ErrorHandler<Env = Record<string, unknown>> = (
  error: Error,
  ctx: Context<any, Record<string, string>, QueryParams, Env>
) => Promise<Response>;
