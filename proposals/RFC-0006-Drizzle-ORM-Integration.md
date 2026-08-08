# RFC 0006 — Drizzle ORM Integration (`@rasenganjs/drizzle`)

**Status:** Draft
**Author:** Rasengan.js Core Team
**Date:** 2026-07-21

## Executive Summary

This RFC proposes `@rasenganjs/drizzle`, an ecosystem package binding [Drizzle ORM](https://orm.drizzle.team) onto a Rasengan Server module the same way any other cross-cutting concern is bound: `imports: [DrizzleModule.forRoot({...})]`, then inject `DataSource` anywhere by constructor parameter, exactly like injecting any other provider.

This is not a from-scratch design. It is the extraction of `@byakugan/db`, a package built, shipped, and verified inside a real production SaaS application (`byakugan`) built on Rasengan Server. That package went through two implementation passes — a working v1, and a same-day v2 amendment after a design review surfaced a strictly better shape — and both are informed by a real, confirmed `@rasenganjs/server` limitation (§6). The goal here is a near-verbatim port of that already-proven design: same public API, same adapter boundary, same singleton-state rationale, ported into the monorepo's ecosystem conventions (vitest instead of `node:test`, dual ESM/CJS output, workspace peer-dependency discipline).

## Motivation

Rasengan has no database/ORM story today. Every app wiring up Drizzle does what `byakugan` originally did: hand-roll a `pg.Pool`, construct `drizzle(pool, { schema })` at module-load time, expose it through an app-specific provider, and write a bespoke migration script — all hardcoded to one driver, with the connection's lifecycle (pool creation, graceful close, migration running) tangled into app-specific bootstrapping code that isn't reusable, isn't testable in isolation from Postgres, and doesn't compose with `defineModule()`/DI the way the rest of the framework does.

This has already been solved once, for real, with real constraints:

- A production app needed it working correctly under DI, with graceful shutdown actually closing the pool (not leaking connections on every restart).
- The design was deliberately kept free of any app-specific code from day one — schema, migrations, and business tables never entered the package — specifically so it could become this RFC without stripping anything out first.
- It surfaced and worked around a genuine `@rasenganjs/server` gap along the way (§6) rather than hitting it in production.

## Goals

- `DataSource` is a real, single, top-level `class` exported directly from the package — `import { DataSource } from "@rasenganjs/drizzle"`, usable immediately as both a value and a type, no per-consumer workaround. Modeled directly on `import { DataSource } from "typeorm"`.
- `DrizzleModule.forRoot({ adapter, connection, schema })` — a static factory mirroring `TypeOrmModule.forRoot()` — connects eagerly and returns a `ModuleConfig` ready to drop into `imports: [...]`.
- A driver-agnostic adapter interface (`DrizzleAdapter<TConfig, TSchema, TDb>`) is the package's genericity boundary. One concrete adapter ships in v1: `node-postgres` (`pg`). Adding another driver later is "write one more file matching the interface," not a design change.
- Driver adapters are separate subpath exports (`@rasenganjs/drizzle/drivers/node-postgres`) so importing the package core never pulls in a specific driver's client package or its types.
- A generic `runMigrations()` helper for standalone migration scripts — a deliberately _separate_, short-lived connection from the module's long-lived one, so running `db:migrate` never opens (and forgets to close) the server's pool.
- Full type-safety end to end — `TConfig` (driver connection options), `TSchema` (the consumer's Drizzle schema), `TDb` (the driver's typed Drizzle database, e.g. `NodePgDatabase<TSchema>`) are threaded through every layer, so a consumer's `dataSource.db.select().from(table)` stays fully typed.
- Loud failure modes by construction: `forRoot()` called a second time in the same process throws immediately (not a silent reconnect); resolving `DataSource` before any `forRoot()` has run throws a directed error instead of a broken `.db`.
- `global: true` by default, matching the common case (most apps want DB access from anywhere), overridable per app.

## Non-goals

- **Multiple simultaneous `DataSource` configurations in one process** (a primary + analytics DB, per-tenant databases). The singleton design (§ Detailed Design) explicitly doesn't support this. A future need would be a real design revisit — most likely keying the module-level state by a name/token — not a config flag bolted on; it would cost the zero-argument `DataSource` construction this design relies on.
- **Every Drizzle driver.** Only `node-postgres` ships in v1. `postgres-js`, `better-sqlite3`, `libsql`, `mysql2`, etc. are real future subpath exports, added as real consumers need them — not speculative work now.
- **A `withTransaction()`-style cross-cutting helper.** Not needed by the reference implementation; consumers needing transactions call `dataSource.db.transaction(...)` directly.
- **Connection pooling strategy** (pool size, retry/backoff, read replicas) — driver defaults carry over unchanged.
- **Schema authoring / `drizzle-kit` CLI wiring.** `drizzle.config.ts`, schema files, and `db:generate` stay entirely the consumer's own, untouched by this package — it only wires the _runtime_ connection and the module/DI system around it.

## Proposed API

```ts
// schema.ts — the ONLY app-specific piece this package ever sees
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
});
export const schema = { users };
```

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

// Configure the singleton ONCE. Connects eagerly; registers DataSource as
// a normal, container-constructed provider (global: true by default).
export const dbModule = DrizzleModule.forRoot({ adapter, connection, schema });

// A local type alias pins DataSource's generic to THIS app's schema once —
// every consumer below writes bare `DataSource`, fully typed, zero type
// arguments, exactly like importing `DataSource` from `typeorm`.
export type DataSource = GenericDataSource<NodePgDatabase<typeof schema>>;
```

```ts
// user.repository.ts — inject it anywhere, by name, like any other Provider
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

```ts
// app.module.ts
import { defineModule } from '@rasenganjs/server';
import { dbModule } from './db.module.js';
import { UserRepository } from './user.repository.js';

export const appModule = defineModule({
  name: 'AppModule',
  imports: [dbModule /* , ...other feature modules */],
  providers: [UserRepository],
});
```

```ts
// migrate.ts — a standalone script, own short-lived connection
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

## Detailed Design

### Package layout

```
packages/ecosystem/drizzle/
├── package.json          # peer deps: @rasenganjs/server, drizzle-orm (hard);
│                          #   pg (optional, only for the node-postgres subpath)
├── tsup.config.ts         # two entries, ESM+CJS (see "Porting notes")
├── tsconfig.json
└── src/
    ├── index.ts                    # DataSource, DrizzleModule, adapter types, runMigrations
    ├── adapter.ts                  # DrizzleAdapter<TConfig, TSchema, TDb> interface
    ├── data-source.ts              # DataSource<TDb> class + module-level connection state
    ├── drizzle.module.ts           # DrizzleModule — static forRoot()
    ├── migrate.ts                  # runMigrations() generic helper
    ├── drivers/
    │   └── node-postgres.ts        # nodePostgresAdapter() — the only v1 concrete adapter
    └── __tests__/
        ├── drizzle-module.test.ts
        └── migrate.test.ts
```

Importing `@rasenganjs/drizzle` alone never pulls in `pg`'s types or client — only code that imports the `/drivers/node-postgres` subpath needs `pg` installed at all. Every future adapter gets its own subpath the same way.

### The adapter interface — the genericity boundary

```ts
// src/adapter.ts
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

Everything else in the package — `DrizzleModule`, `runMigrations` — is written entirely against this interface and knows nothing about any specific driver. `node-postgres.ts` is the only file that imports `pg`/`drizzle-orm/node-postgres`.

### `DataSource` — a real top-level class, singleton connection state

```ts
// src/data-source.ts
let activeConnection: ConnectResult<unknown> | null = null;

export function __setActiveConnection(conn: ConnectResult<unknown>): void {
  if (activeConnection) {
    throw new Error(
      'DrizzleModule.forRoot() was called more than once in this process...'
    );
  }
  activeConnection = conn;
}

export class DataSource<TDb = unknown> extends Provider {
  get db(): TDb {
    if (!activeConnection) {
      throw new Error(
        'DataSource resolved before DrizzleModule.forRoot() ran...'
      );
    }
    return activeConnection.db as TDb;
  }

  async onDestroy(): Promise<void> {
    await activeConnection?.close();
  }
}
```

`DataSource` is declared **once**, at the package's top level, as a real `class` — not manufactured inside a factory call. Only an actual `class` declaration dual-binds a name to both a value and a type in TypeScript; a destructured/returned constructor from a factory function does not, which forces every consumer into an `InstanceType<typeof X>` workaround. This is not a hypothetical concern — it is exactly what the reference implementation's v1 got wrong and had to amend the same day (see "History" below).

Its connection is deliberately **not** a constructor argument and **not** registered via `{ provide: DataSource, useValue: instance }` — it is private module-level state that `DrizzleModule.forRoot()` sets before the container ever constructs a `DataSource`. §6 explains why `useValue` specifically was ruled out, not just judged less elegant.

### `DrizzleModule.forRoot()`

```ts
// src/drizzle.module.ts
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
```

Never instantiated — a static-method namespace, the same shape as `TypeOrmModule`. Connects **eagerly** inside `forRoot()`, not lazily on first `.db` access: this matches how a hand-rolled `pg.Pool` behaves today (created at module-load time) and keeps `DataSource` a trivial wrapper — the pool/client lifecycle lives entirely in `data-source.ts`'s module state; `onDestroy()` just delegates to it.

### `runMigrations()` — a deliberately separate connection

```ts
// src/migrate.ts
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
```

Migration scripts run standalone, outside the DI container entirely (`node migrate.ts` / `tsx migrate.ts`), so they need their own short-lived connection that closes when done — reusing `DrizzleModule`'s long-lived pool here would be a scoping mistake, not a shortcut.

### `node-postgres` adapter (v1's only concrete driver)

```ts
// src/drivers/node-postgres.ts
export function nodePostgresAdapter<
  TSchema extends Record<string, unknown>,
>(): DrizzleAdapter<NodePostgresConfig, TSchema, NodePgDatabase<TSchema>> {
  return {
    name: 'node-postgres',
    connect(config, schema) {
      const pool = new pg.Pool(config);

      // An idle client hitting a network-level error emits 'error' on the
      // pool — with no listener, that's an unhandled event that crashes
      // the process instead of just logging.
      pool.on('error', (err) =>
        console.error('[drizzle:node-postgres] pool error:', err)
      );

      // pg.Pool is lazy — `new pg.Pool()` never opens a socket, so a
      // database that's down at boot fails silently until the first real
      // query. Probe once here so a down DB fails fast and loudly instead
      // of surfacing later as an opaque error on someone's first request.
      pool
        .connect()
        .then((c) => c.release())
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
```

The fail-fast-on-unreachable-DB behavior (killing the process with `SIGINT` rather than limping along) is a deliberate, carried-over design choice: a server that boots successfully against a database it can't actually reach is a worse failure mode than one that exits immediately with a clear log line.

## Dependency on a known `@rasenganjs/server` constraint

This design is shaped by a real, confirmed limitation in the current DI container, not a hypothetical one: **`{ provide, useValue }`-registered providers never receive `onInit()`/`onDestroy()` lifecycle callbacks.** `Container.instantiate()`'s `useValue` branch returns before the `instanceof Provider` → `lifecycleInstances.push()` check ever runs, for every resolution of that entry, permanently. A `DataSource` registered via `useValue` would silently leak its connection pool on every graceful shutdown — no error, no warning, just accumulating open connections until something else notices.

This is exactly why `DataSource` is designed as a plain, zero-argument, container-constructed provider with its connection reachable through `forRoot()`-set module state, rather than the more obviously TypeORM-like `useValue` registration. **Fixing the underlying container gap is out of scope for this RFC** (it's a `rasengan-server` core issue, not a `@rasenganjs/drizzle` one) but is a natural, low-risk follow-up that would let a future version simplify this package's internals — noted here so the workaround doesn't quietly calcify into "just how the package works" once the actual constraint is gone.

A second, related constraint worth naming explicitly rather than discovering by surprise: `@rasenganjs/server`'s DI resolves constructor parameters **by name** against a provider class's runtime `.name`. `DataSource`'s exported name is therefore part of this package's real public contract — renaming or wrapping the class would compile cleanly and break every consumer's injection at boot, in a different file from the one that changed. Mitigated the same way the reference implementation mitigates it: a unit test asserting `DataSource.name === 'DataSource'`, turning a silent runtime footgun into a loud, pre-release test failure.

## Alternatives considered

- **Ship the consumer's schema inside the package too** (one package, `@rasenganjs/drizzle/schema` alongside `/module`) — rejected: couples a package meant to be schema-agnostic to one consumer's tables; defeats the entire point of extracting it.
- **`DataSource` connects lazily on first `.db` access** instead of eagerly inside `forRoot()` — rejected: changes observable behavior from what every existing hand-rolled bootstrap already does (pool created at load time), and complicates `onDestroy()` semantics for a never-connected instance.
- **`DataSource` manufactured fresh inside a `createDrizzleModule()` factory, one independent class per call** (the reference implementation's actual v1) — superseded. It supports multiple independent `DataSource` configurations in one process, a capability nothing needs yet, at the cost of `DataSource` never being importable directly as a type — every consumer needs an `InstanceType<typeof DataSource>` workaround. Rejected in favor of the top-level-class + `forRoot()` design once the ergonomic cost was clear.
- **`{ provide: DataSource, useValue: preBuiltInstance }`** (closer to how TypeORM's app-constructed `DataSource` is registered in Nest) — rejected: the confirmed `useValue`-lifecycle gap above. Would silently leak the connection pool on every shutdown.
- **Implement every Drizzle driver now** — rejected: 15-20+ adapters, most unverifiable without provisioning test infrastructure nobody would exercise. The adapter interface proves genericity architecturally; concrete adapters get added as real consumers need them.

## Risks & failure modes

- **By-name DI is a silent footgun for this specific class** — see "Dependency on a known constraint" above. Mitigated by a `DataSource.name` assertion test, not eliminated.
- **Singleton module state — one `forRoot()` per process** — mitigated, not just accepted: a second call throws immediately instead of silently redirecting every existing `DataSource` instance to a different connection; resolving `DataSource` before any `forRoot()` has run throws a directed error instead of returning a broken `.db`. Both are unit-tested.
- **Adapter type parameters may not generalize cleanly** to a driver whose Drizzle types don't separate config/schema/db as neatly as `node-postgres` does (serverless/edge drivers with unusual connection objects). Accepted as a "cross that bridge with the second adapter" risk — speculative to solve before a second adapter actually needs it.
- **Peer dependency drift** — `drizzle-orm` (and each driver's client package) must stay a peer dependency, never a direct one, so the consuming app's own installed version is the one actually used. Single-instance discipline, same reasoning as this monorepo's own `@rasenganjs/futon`/`@rasenganjs/runtime` peer-dependency fix.

## Out of scope

- Multiple simultaneous `DataSource` configurations in one process (§ Non-goals).
- Any adapter beyond `node-postgres` in this pass.
- Fixing the underlying `@rasenganjs/server` `useValue`-lifecycle gap (see "Dependency on a known constraint") — a separate, core-framework RFC/fix, not this package.
- Connection pooling strategy changes, transaction-helper abstractions (§ Non-goals).
- `drizzle-kit` config/CLI authoring — remains entirely the consumer's own `drizzle.config.ts`.

## Porting notes (byakugan → ecosystem package)

The source implementation is ESM-only, tested with `node:test`/`bun test`, and consumed as raw TypeScript source (no build step) inside its monorepo. Bringing it into `packages/ecosystem/drizzle` needs these adjustments — everything else ports file-for-file, unchanged:

- **Package name & scope**: `@byakugan/db` → `@rasenganjs/drizzle`. Directory `packages/ecosystem/drizzle`, matching sibling packages (`ws`, `io`, `validators`, ...).
- **Build output**: add CJS alongside ESM (`tsup.config.ts`'s `format: ['esm', 'cjs']`, `dts: true`, `clean: true`) to match every other published ecosystem package's dual-format convention — the source package only ships ESM since it's never published standalone.
- **Peer dependencies**: `@rasenganjs/server` and `drizzle-orm` as peers (already the case); `pg` stays an optional peer scoped to the `node-postgres` subpath. No change to the dependency _shape_, just re-pointing versions at the monorepo's own workspace packages instead of local `.tgz` files.
- **Tests**: port `drizzle.module.test.ts` and `migrate.test.ts` from `node:test`/`bun test` to `vitest`, matching every other ecosystem package's test runner. Assertions carry over unchanged — this is a runner swap, not a rewrite (`describe`/`test`/`beforeEach` → `describe`/`it`/`beforeEach`, `assert.equal` → `expect().toBe()`).
- **Everything else — `adapter.ts`, `data-source.ts`, `drizzle.module.ts`, `migrate.ts`, `drivers/node-postgres.ts`** — ports verbatim. No design changes; this RFC documents the port, not a redesign.

## Delivery phases

1. **Package scaffold + verbatim port** — directory, `package.json`/`tsup.config.ts`/`tsconfig.json` matching ecosystem conventions, all five source files ported unchanged, tests ported to vitest and passing.
2. **Verification** — the reference implementation's own test list (DI-by-name contract, `.db` delegation, `onDestroy()` → `close()`, double-`forRoot()` throws, pre-`forRoot()` resolution throws, `runMigrations()` connects/migrates/always-closes including on throw) plus a real build+boot smoke test (this repo's existing `rasengan-server build` dry-run + `dev`/`start` boot cycle) against a small example app wired the way the "Proposed API" section shows.
3. **Docs + example** — a minimal example app under `apps/playground` (or `apps/examples`) demonstrating the full chain: schema → adapter → `DrizzleModule.forRoot()` → `app.module`'s `imports` → `DataSource` injected in a repository.
4. **Publish** — `@rasenganjs/drizzle` joins the existing release/publish pipeline (`scripts/release.ts`), same as any other ecosystem package.

## Verification (for the eventual implementation PR)

- Full test suite ported and green (vitest).
- `rasengan-server build` dry-run against the example app succeeds — proves `DrizzleModule.forRoot()` + `nodePostgresAdapter` produce a working, correctly-typed connection through the module/DI system end to end, not just in isolated unit tests.
- Manual smoke: boot the example app, hit a route backed by a `DataSource`-injecting repository, send `SIGINT`, confirm the process exits promptly (pool closed, not hung) — the concrete outcome the `useValue`-avoidance design exists for.
- Workspace typecheck clean.
