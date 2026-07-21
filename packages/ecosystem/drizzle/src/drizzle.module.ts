import { defineModule, type ModuleConfig } from '@rasenganjs/server';
import type { DrizzleAdapter } from './adapter.js';
import { DataSource, __setActiveConnection } from './data-source.js';

export interface DrizzleModuleOptions<
  TConfig,
  TSchema extends Record<string, unknown>,
  TDb,
> {
  adapter: DrizzleAdapter<TConfig, TSchema, TDb>;
  connection: TConfig;
  schema: TSchema;
  /** Defaults true — most apps want database access from anywhere. */
  global?: boolean;
}

/**
 * Never instantiated — a static-method namespace, same shape as
 * TypeORM's `TypeOrmModule` (RFC-0006). Binds a Drizzle connection onto
 * a Rasengan Server module: `imports: [DrizzleModule.forRoot({...})]`,
 * inject `DataSource`.
 *
 * Connects eagerly inside forRoot() (not lazily on first `.db` access) —
 * the pool/client lifecycle lives in data-source.ts's module state,
 * `DataSource.onDestroy()` just delegates to it.
 */
export class DrizzleModule {
  static forRoot<TConfig, TSchema extends Record<string, unknown>, TDb>(
    opts: DrizzleModuleOptions<TConfig, TSchema, TDb>
  ): ModuleConfig {
    __setActiveConnection(opts.adapter.connect(opts.connection, opts.schema));
    return defineModule({
      name: 'DrizzleModule',
      providers: [DataSource],
      exports: [DataSource],
      global: opts.global ?? true,
    });
  }
}
