# @rasenganjs/drizzle

Drizzle ORM integration for Rasengan Server: bind a database connection
onto a module with `DrizzleModule.forRoot({...})`, then inject
`DataSource` anywhere the DI container reaches — exactly like injecting
any other provider.

## Installation

```bash
pnpm add @rasenganjs/drizzle
```

`@rasenganjs/server` and `drizzle-orm` are peer dependencies — install
them if your project doesn't already have them:

```bash
pnpm add @rasenganjs/server drizzle-orm
```

Driver adapters live behind their own subpath export so importing the
package core never pulls in a specific driver's client. The only driver
shipped today is `node-postgres` (`pg`):

```bash
pnpm add pg
pnpm add -D @types/pg
```

## 1. Define your schema

The schema is the only app-specific piece `@rasenganjs/drizzle` ever
sees — it's a plain Drizzle schema, nothing framework-specific about it.

```ts
// schema.ts
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
});

export const schema = { users };
```

## 2. Configure the module

Pick a driver adapter, give it a connection config, and call
`DrizzleModule.forRoot()`. It connects **eagerly** (right when this
module is defined) and registers `DataSource` as a normal,
container-constructed provider.

```ts
// db.module.ts
import {
  DrizzleModule,
  DataSource as GenericDataSource,
} from '@rasenganjs/drizzle';
import { nodePostgresAdapter } from '@rasenganjs/drizzle/drivers/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from './schema.js';

const adapter = nodePostgresAdapter<typeof schema>();
const connection = { connectionString: process.env.DATABASE_URL };

export const dbModule = DrizzleModule.forRoot({ adapter, connection, schema });

// A local type alias pins DataSource's generic to THIS app's schema once —
// every consumer below writes bare `DataSource`, fully typed, zero type
// arguments, exactly like importing `DataSource` from `typeorm`.
export type DataSource = GenericDataSource<NodePgDatabase<typeof schema>>;
```

`DrizzleModule.forRoot()` must run **once per process**, before
anything injects `DataSource` — calling it a second time throws
immediately rather than silently redirecting existing `DataSource`
instances to a different connection.

## 3. Register the module in your app

```ts
// app.module.ts
import { defineModule } from '@rasenganjs/server';
import { dbModule } from './db.module.js';
import { UserRepository } from './user.repository.js';

export const appModule = defineModule({
  name: 'AppModule',
  imports: [dbModule /* , ...your other feature modules */],
  providers: [UserRepository],
});
```

`DrizzleModule` exports `DataSource` with `global: true` by default, so
any module in the app can inject it without re-importing `dbModule` —
pass `global: false` to `forRoot()` if you'd rather scope it explicitly.

## 4. Inject `DataSource` anywhere

Constructor injection works exactly like any other `Provider`,
`Controller`, or `Queue` in Rasengan Server:

```ts
// user.repository.ts
import { Provider } from '@rasenganjs/server';
import { eq } from 'drizzle-orm';
import { users } from './schema.js';
import type { DataSource } from './db.module.js';

export class UserRepository extends Provider {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  findByEmail(email: string) {
    return this.dataSource.db
      .select()
      .from(users)
      .where(eq(users.email, email));
  }
}
```

Register `UserRepository` in `db.module.ts`'s or `app.module.ts`'s
`providers` (and `exports`, if another module needs to inject it too).

On graceful shutdown, `DataSource.onDestroy()` closes the underlying
pool automatically — nothing to wire up yourself.

## Running migrations

Migration scripts run standalone, outside the running server, so they
get their own short-lived connection via `runMigrations()` rather than
reusing the module's long-lived pool:

```ts
// migrate.ts
import { runMigrations } from '@rasenganjs/drizzle';
import { nodePostgresAdapter } from '@rasenganjs/drizzle/drivers/node-postgres';
import { schema } from './schema.js';

const adapter = nodePostgresAdapter<typeof schema>();
const connection = { connectionString: process.env.DATABASE_URL };

await runMigrations(
  adapter,
  connection,
  schema,
  new URL('./migrations', import.meta.url).pathname
);
console.log('migrations applied');
```

```bash
tsx migrate.ts
```

Generating the migration files themselves (`drizzle-kit generate`) and
`drizzle.config.ts` stay entirely your own — `@rasenganjs/drizzle` only
wires the runtime connection, not the schema-authoring workflow.

## The `node-postgres` adapter

`nodePostgresAdapter()` wraps `drizzle-orm/node-postgres` with a `pg.Pool`.
Its config is a plain `pg.PoolConfig`:

```ts
const connection = {
  connectionString: process.env.DATABASE_URL,
  // any other pg.PoolConfig option: max, ssl, idleTimeoutMillis, ...
};
```

Two behaviors worth knowing about:

- **Fails fast on an unreachable database.** `pg.Pool` is lazy and
  never opens a socket until first use, so this adapter probes the
  connection once at startup and calls `process.kill(pid, 'SIGINT')`
  if it can't connect — a server that boots against a database it
  can't reach is a worse failure mode than one that exits immediately
  with a clear log line.
- **Logs (doesn't crash on) idle pool errors.** A network-level error on
  an idle client would otherwise be an unhandled `'error'` event that
  crashes the process; this adapter attaches a listener that logs it
  instead.

## Adding another driver

Only `node-postgres` ships today. Any other Drizzle driver
(`postgres-js`, `libsql`, `mysql2`, ...) can be added without touching
`DrizzleModule` or `runMigrations()` — write one more file matching the
adapter interface:

```ts
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
```

## Current limitations

- **One `DataSource` configuration per process.** There's no support
  today for multiple simultaneous connections (a primary + analytics
  DB, per-tenant databases) — `DrizzleModule.forRoot()` is a singleton
  by design. A future need would require a real design revisit, not a
  config flag.
- **Only `node-postgres` ships as a concrete adapter.** Other drivers
  are real future subpath exports, added as consumers need them.
- **DI resolves constructor parameters by name.** Rasengan Server's
  container matches constructor params against a provider class's
  runtime `.name` — inject `DataSource` under that exact name (as
  shown above), not a renamed re-export.

See `proposals/RFC-0006-Drizzle-ORM-Integration.md` in the monorepo for
the full design rationale.

## License

MIT
