import pg from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { DrizzleAdapter } from '../adapter.js';

export interface NodePostgresConfig extends pg.PoolConfig {}

/**
 * The only concrete adapter shipped in v1 (`pg`, i.e.
 * `drizzle-orm/node-postgres`). Adding another driver is "write one more
 * file matching DrizzleAdapter," no change needed here or in
 * drizzle.module.ts.
 */
export function nodePostgresAdapter<
  TSchema extends Record<string, unknown>,
>(): DrizzleAdapter<NodePostgresConfig, TSchema, NodePgDatabase<TSchema>> {
  return {
    name: 'node-postgres',
    connect(config, schema) {
      const pool = new pg.Pool(config);

      // node-postgres emits 'error' on the pool for any idle client that
      // hits a network-level error (e.g. the server going away after a
      // successful connect) — with no listener, that's an unhandled
      // 'error' event, which crashes the process instead of just logging.
      pool.on('error', (err) => {
        console.error('[drizzle:node-postgres] pool error:', err);
      });

      // pg.Pool is lazy — `new pg.Pool()` never opens a socket, so a
      // database that's down at boot fails silently until the first real
      // query. Probe once here so a down DB is logged immediately instead
      // of surfacing later as an opaque failure on someone's first request.
      pool
        .connect()
        .then((client) => client.release())
        .catch((err) => {
          console.error('[drizzle:node-postgres] failed to connect:', err);
          process.kill(process.pid, 'SIGINT');
        });

      const db = drizzle(pool, { schema });
      return {
        db,
        close: () => pool.end(),
        migrate: (migrationsFolder) => migrate(db, { migrationsFolder }),
      };
    },
  };
}
