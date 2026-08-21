import type { Futon, Context, Middleware } from '@rasenganjs/futon';
import type { DrizzleAdapter } from './adapter.js';
import { createConnection, type ConnectionSource } from './connection.js';

/**
 * Wires a DrizzleAdapter directly onto a Futon app — no DI, no Module,
 * no Provider (RFC-0014). Returns a zero-argument accessor backed by
 * module-level state (the same singleton shape DataSource uses on the
 * Rasengan Server path, both are built on connection.ts), so it works
 * from a request handler, a background job, or any other file in the
 * process, not only from inside a request.
 *
 * `source` is either a static config (connects immediately, accessor
 * usable right away) or a resolver run against the first request that
 * reaches the app (e.g. a Cloudflare D1 binding read from
 * `ctx.runtime.env`), connected once and cached from then on.
 */
export function drizzle<TConfig, TSchema extends Record<string, unknown>, TDb>(
  app: Futon,
  adapter: DrizzleAdapter<TConfig, TSchema, TDb>,
  source: ConnectionSource<TConfig, Context>,
  schema: TSchema
): () => TDb {
  const core = createConnection(adapter, source, schema);
  app.onDestroy(() => core.close());

  if (typeof source === 'function') {
    const resolveOnFirstRequest: Middleware = async (ctx, next) => {
      await core.resolve(ctx);
      return next();
    };
    app.use(resolveOnFirstRequest);
  }

  return () => core.getOrThrow();
}
