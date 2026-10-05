/**
 * The genericity boundary (RFC-0006 §4.2). One adapter per Drizzle
 * driver/dialect — everything else in this package (the module factory,
 * the migration runner) is written entirely against this interface and
 * knows nothing about any specific driver.
 *
 * Three type parameters carried end-to-end so nothing in the public
 * surface degrades to `unknown`/`any`:
 *  - `TConfig` — driver-specific connection options (e.g. a `pg.PoolConfig`)
 *  - `TSchema` — the consuming app's Drizzle schema object
 *  - `TDb`     — the driver's typed Drizzle database (e.g. `NodePgDatabase<TSchema>`)
 */
export interface ConnectResult<TDb> {
  db: TDb;
  close(): Promise<void>;
  migrate(migrationsFolder: string): Promise<void>;
}

export interface DrizzleAdapter<
  TConfig,
  TSchema extends Record<string, unknown>,
  TDb,
> {
  readonly name: string;
  connect(config: TConfig, schema: TSchema): ConnectResult<TDb>;
}
