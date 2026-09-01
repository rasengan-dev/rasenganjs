import { defineModule, type ModuleConfig } from '@rasenganjs/server';
import type { DrizzleAdapter } from './adapter.js';
import { createConnection, type ConnectionSource } from './connection.js';
import { DataSource, __setActiveConnection } from './data-source.js';

export interface DrizzleModuleOptions<
  TConfig,
  TSchema extends Record<string, unknown>,
  TDb,
  TCtx = unknown,
> {
  adapter: DrizzleAdapter<TConfig, TSchema, TDb>;
  /**
   * A static config (today's behavior, connects eagerly inside
   * forRoot()) or a resolver run against the first request that reaches
   * the app (RFC-0014, e.g. a Cloudflare D1 binding, which does not
   * exist at forRoot() time). See the "drizzleConnection" module key
   * below for how the resolver case actually gets its per-request ctx.
   */
  connection: ConnectionSource<TConfig, TCtx>;
  schema: TSchema;
  /** Defaults true, most apps want database access from anywhere. */
  global?: boolean;
}

/**
 * Never instantiated, a static-method namespace, same shape as
 * TypeORM's `TypeOrmModule` (RFC-0006). Binds a Drizzle connection onto
 * a Rasengan Server module: `imports: [DrizzleModule.forRoot({...})]`,
 * inject `DataSource`.
 *
 * Built on connection.ts's createConnection() (RFC-0014), the same
 * primitive the Futon-native `drizzle()` helper uses, so eager vs.
 * lazy connection handling exists in exactly one place.
 */
export class DrizzleModule {
  static forRoot<
    TConfig,
    TSchema extends Record<string, unknown>,
    TDb,
    TCtx = unknown,
  >(opts: DrizzleModuleOptions<TConfig, TSchema, TDb, TCtx>): ModuleConfig {
    const core = __setActiveConnection(
      createConnection(opts.adapter, opts.connection, opts.schema)
    );

    return defineModule({
      name: 'DrizzleModule',
      providers: [DataSource],
      exports: [DataSource],
      global: opts.global ?? true,
      // Declared only when the source needs a per-request resolve
      // (dispatchPlugins() in rasengan-server skips keys whose value is
      // undefined), a static/pg config needs no plugin registered at
      // all. See plugin.ts's createDrizzlePlugin(), which claims this
      // key and feeds it the request ctx via app.use().
      drizzleConnection:
        typeof opts.connection === 'function' ? core : undefined,
    });
  }
}
