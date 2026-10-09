import type { DrizzleAdapter } from './adapter.js';

/**
 * Either a static config known at creation time (today's behavior,
 * unchanged), or a resolver invoked against the first request that
 * reaches the app — for connections that don't exist before that (e.g.
 * a Cloudflare D1 binding, only available through `env` per request).
 */
export type ConnectionSource<TConfig, TCtx = unknown> =
  TConfig | ((ctx: TCtx) => TConfig | Promise<TConfig>);

export interface ConnectionCore<TDb> {
  /** Throws a directed error if not connected yet, see createConnection(). */
  getOrThrow(): TDb;
  isReady(): boolean;
  /** No-op for a static source, already connected at creation. */
  resolve(ctx: unknown): Promise<void>;
  onClose(hook: () => Promise<void> | void): void;
  close(): Promise<void>;
}

/**
 * The one place that knows how to go from "adapter + source + schema"
 * to a live, cached, closable connection (RFC-0014). Both the
 * Futon-native `drizzle()` helper (futon.ts) and `DrizzleModule.forRoot()`
 * (drizzle.module.ts) are built on this, neither reimplements eager vs.
 * lazy connection handling on its own.
 */
export function createConnection<
  TConfig,
  TSchema extends Record<string, unknown>,
  TDb,
  TCtx = unknown,
>(
  adapter: DrizzleAdapter<TConfig, TSchema, TDb>,
  source: ConnectionSource<TConfig, TCtx>,
  schema: TSchema
): ConnectionCore<TDb> {
  const isLazy = typeof source === 'function';

  let db: TDb | null = null;
  let closeFn: (() => Promise<void>) | null = null;
  let inFlight: Promise<void> | null = null;
  const closeHooks: Array<() => Promise<void> | void> = [];

  const connectWith = (config: TConfig): void => {
    const result = adapter.connect(config, schema);
    db = result.db;
    closeFn = result.close;
  };

  if (!isLazy) {
    connectWith(source as TConfig);
  }

  return {
    getOrThrow() {
      if (db === null) {
        throw new Error(
          isLazy
            ? `[drizzle:${adapter.name}] not connected yet, this adapter resolves its connection from the first incoming request and none has landed yet`
            : `[drizzle:${adapter.name}] not connected, this should be unreachable for a static connection source`
        );
      }
      return db;
    },
    isReady() {
      return db !== null;
    },
    async resolve(ctx) {
      if (db !== null || !isLazy) return;
      // Guards concurrent first requests: everyone after the first
      // caller awaits the same in-flight connect instead of racing to
      // open a second one.
      inFlight ??= (async () => {
        const config = await (
          source as (ctx: unknown) => TConfig | Promise<TConfig>
        )(ctx);
        connectWith(config);
      })();
      await inFlight;
    },
    onClose(hook) {
      closeHooks.push(hook);
    },
    async close() {
      await closeFn?.();
      for (const hook of closeHooks) {
        await hook();
      }
    },
  };
}
