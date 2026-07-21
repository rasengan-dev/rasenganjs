import type { DrizzleAdapter } from './adapter.js';

/**
 * Generic migration runner (RFC-0006). A *separate* connection from the
 * module's — migration scripts run standalone, outside the running
 * server/DI container, so they need their own short-lived connection
 * that closes when done rather than reusing DrizzleModule's long-lived one.
 */
export async function runMigrations<
  TConfig,
  TSchema extends Record<string, unknown>,
  TDb,
>(
  adapter: DrizzleAdapter<TConfig, TSchema, TDb>,
  connection: TConfig,
  schema: TSchema,
  migrationsFolder: string
): Promise<void> {
  const result = adapter.connect(connection, schema);
  try {
    await result.migrate(migrationsFolder);
  } finally {
    await result.close();
  }
}
