# RFC 0014 - Futon-Native Drizzle Usage, a D1 Adapter, and a Unified Connection Core (`@rasenganjs/drizzle`)

**Status:** Partially Implemented (2026-08-21), Delivery phases 1 to 4 landed, including the `rasengan-server` core fix this RFC depended on, phases 5 (docs and examples) and 6 (publish) still open
**Author:** Rasengan.js Core Team
**Date:** 2026-08-21

## Executive Summary

`@rasenganjs/drizzle` (RFC-0006) only works inside a Rasengan Server app: `DrizzleModule.forRoot()` plus DI-injected `DataSource`. Every driver adapter also assumes a connection config that is fully known at boot, which holds for `node-postgres` but not for Cloudflare D1, whose binding (`env.DB`) only exists per request.

This RFC extends the package in three connected ways:

1. A Futon-native entry point (`@rasenganjs/drizzle/futon`), usable in any `@rasenganjs/futon` app with no `@rasenganjs/server`, no Module, no Provider. It returns a typed, zero-argument accessor callable from anywhere in the process, not only inside a request handler.
2. A `d1Adapter()` driver (`@rasenganjs/drizzle/drivers/d1`), the first adapter whose connection config can only be resolved per request rather than at boot.
3. A single connection core shared by both the Futon-native path and the existing `DrizzleModule.forRoot()` path, so both entry points are two thin wrappers around one connection-lifecycle engine instead of two implementations that could drift apart over time.

## Motivation

Two gaps surfaced while extending RFC-0006 towards Cloudflare Workers and D1:

**Gap 1: everything requires Rasengan Server.** `DataSource`, `DrizzleModule.forRoot()`, and the DI container are the only way to reach a Drizzle connection today. An app built directly on `@rasenganjs/futon` (no `@rasenganjs/server`, which is itself built on Futon) has no supported way to use `@rasenganjs/drizzle` at all, even though the adapter interface itself (`DrizzleAdapter<TConfig, TSchema, TDb>`) never depended on the DI container in the first place. It only ever needed a place to store the connection and a place to close it, both of which Futon already provides (`app.use()` for per-request middleware, `app.onDestroy()` for graceful shutdown).

**Gap 2: `connect()` assumes a boot-time config.** `DrizzleAdapter.connect(config, schema)` is called synchronously and eagerly inside `forRoot()`. That is correct for `node-postgres`, whose config (host, port, connection string) is available the moment the process starts. It is not correct for D1: `env.DB` is injected per request through the Workers `fetch(request, env, ctx)` signature and is not reachable at module load time, confirmed by tracing `packages/platform/runtime/src/adapters/workerd/prod.ts` and RFC-0013. `rasengan-server`'s DI container has no request-scoped provider concept either; RFC-0003 explicitly rules that out, so a D1-backed `DataSource` cannot simply be "resolved later" through the container.

Both gaps point at the same underlying fix: a connection needs to support being resolved either eagerly (static config, known at boot) or lazily (a resolver function run against the first request that reaches the app), and that resolution logic should exist exactly once, used by both the Futon-native path and the DI path.

## Goals

- `@rasenganjs/drizzle/futon`: a `drizzle(app, adapter, source, schema)` function that wires any `DrizzleAdapter` onto a Futon app with no DI, no Module, no Provider, and returns a typed accessor `() => TDb` closed over module-level state, usable from a request handler, a background job, or any other file in the process.
- Support connection sources that can only be resolved per request. `source` accepts either a static `TConfig` (today's behavior, unchanged) or a resolver `(ctx: Context) => TConfig | Promise<TConfig>`, connected once on the first request that reaches the app and cached from then on.
- One connection core (`src/connection.ts`) that both `futon.ts` and `drizzle.module.ts` are built on, so there is one place that knows how to go from "adapter + source + schema" to "a live, cached, closable connection", not two.
- `d1Adapter()` (`@rasenganjs/drizzle/drivers/d1`), a concrete adapter for `drizzle-orm/d1`, usable from both the new Futon-native path and from `DrizzleModule.forRoot()` on Rasengan Server.
- Preserve every loud-failure guarantee from RFC-0006: a second `forRoot()` in the same process still throws immediately, and resolving a connection before it is ready still throws a directed error rather than returning a broken `.db`. The error now distinguishes two states instead of one: "forRoot() never ran" versus "forRoot() ran, but the adapter is still waiting for its first request to resolve a lazy source".

## Non-goals

- Multiple simultaneous `DataSource` configurations in one process on the DI path. Unchanged from RFC-0006; the by-name DI constraint that motivates it is untouched by this RFC. The Futon-native path does not share this limit: each call to `drizzle()` returns its own independent accessor, so multiple databases in one Futon app already work without any further design here.
- Request-scoped or per-tenant database routing. A resolver function can technically return a different config on different calls, but this RFC ships no selection/routing logic on top of it, D1's own binding-per-worker model is the only case being solved.
- Any Workers binding-based driver beyond D1 (Hyperdrive, Durable Objects SQLite, KV-backed stores). The resolver mechanism should generalize to them, but no other driver ships in this pass.
- `drizzle-kit` / migration tooling changes for D1. `wrangler d1 migrations apply` remains the only supported path; `runMigrations()` and `d1Adapter().migrate()` explicitly refuse to run rather than pretending to support it.
- Fixing anything inside `rasengan-server`'s DI container or module system itself. If Phase 1's verification (see Delivery phases) finds a real timing bug in `ModulePlugin`/`app.use()` ordering, that is a `rasengan-server` core fix tracked separately, the same way RFC-0006 tracked the `useValue`-lifecycle gap as a follow-up rather than folding it into that RFC.

## Proposed API

### Futon, Postgres, accessible from anywhere

```ts
// db.ts
import { Futon } from '@rasenganjs/futon';
import { drizzle } from '@rasenganjs/drizzle/futon';
import { nodePostgresAdapter } from '@rasenganjs/drizzle/drivers/node-postgres';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
});
const schema = { users };

export const app = new Futon();

export const getDb = drizzle(
  app,
  nodePostgresAdapter<typeof schema>(),
  {
    connectionString: process.env.DATABASE_URL,
  },
  schema
);
```

```ts
// jobs/cleanup.ts, no ctx, no request, works because the source was static
import { getDb, users } from '../db.js';
import { lt } from 'drizzle-orm';

export async function cleanupStaleUsers() {
  await getDb().delete(users).where(lt(users.createdAt, thirtyDaysAgo()));
}
```

### Futon, D1, resolved from the first request

```ts
// db.ts
import { Futon } from '@rasenganjs/futon';
import { drizzle } from '@rasenganjs/drizzle/futon';
import { d1Adapter } from '@rasenganjs/drizzle/drivers/d1';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
});
const schema = { users };

export const app = new Futon();

// env.DB only exists per request, so `source` is a resolver instead of
// a static value. Connects once, on the first request, cached after that.
export const getDb = drizzle(
  app,
  d1Adapter<typeof schema>(),
  (ctx) => ctx.runtime.env.DB,
  schema
);
```

### Rasengan Server, D1, via `forRoot()`

```ts
// db.module.ts
import {
  DrizzleModule,
  DataSource as GenericDataSource,
} from '@rasenganjs/drizzle';
import { d1Adapter } from '@rasenganjs/drizzle/drivers/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { schema } from './schema.js';

export const dbModule = DrizzleModule.forRoot({
  adapter: d1Adapter<typeof schema>(),
  connection: (ctx) => ctx.runtime.env.DB,
  schema,
});

export type DataSource = GenericDataSource<DrizzleD1Database<typeof schema>>;
```

```ts
// user.repository.ts, unchanged from RFC-0006, but dataSource.db now
// throws a distinct message if called before the first request has run
import { Provider } from '@rasenganjs/server';
import type { DataSource } from './db.module.js';

export class UserRepository extends Provider {
  constructor(private readonly dataSource: DataSource) {
    super();
  }
}
```

`connection` on `DrizzleModuleOptions` now accepts either shape, `TConfig` (unchanged) or `(ctx: Context) => TConfig | Promise<TConfig>` (new). Every existing `node-postgres` app keeps passing a plain object and observes no behavior change.

## Detailed Design

### Package layout

```
packages/ecosystem/drizzle/
└── src/
    ├── adapter.ts                  # DrizzleAdapter<TConfig, TSchema, TDb>, unchanged
    ├── connection.ts               # NEW, shared connection core
    ├── data-source.ts              # DataSource class, now delegates to connection.ts
    ├── drizzle.module.ts           # forRoot(), now built on connection.ts
    ├── futon.ts                    # NEW, Futon-native drizzle() helper
    ├── migrate.ts                  # runMigrations(), unchanged shape
    ├── drivers/
    │   ├── node-postgres.ts        # unchanged
    │   └── d1.ts                   # NEW
    └── __tests__/
        ├── connection.test.ts      # NEW
        ├── futon.test.ts           # NEW
        ├── drizzle-module.test.ts  # extended: lazy/D1 case
        └── migrate.test.ts         # unchanged
```

`futon.ts` becomes a third subpath export (`@rasenganjs/drizzle/futon`), with `@rasenganjs/futon` added as an optional peer dependency, the same treatment `pg` already gets for the `node-postgres` subpath. A Rasengan Server app never needs `@rasenganjs/futon` directly today, but it is already a transitive dependency of `@rasenganjs/server`, so this adds no new install for that path.

### `connection.ts`, the shared core

```ts
export type ConnectionSource<TConfig, TCtx> =
  TConfig | ((ctx: TCtx) => TConfig | Promise<TConfig>);

export interface ConnectionCore<TDb> {
  /** Throws if not connected yet. Distinguishes "never started" from
   * "waiting on the first request" via the message, not the type. */
  getOrThrow(): TDb;
  isReady(): boolean;
  /** No-op if the source was static (already connected at creation). */
  resolve<TCtx>(ctx: TCtx): Promise<void>;
  onClose(cb: () => Promise<void> | void): void;
  close(): Promise<void>;
}

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
  let db: TDb | null = null;
  let closeFn: (() => Promise<void>) | null = null;
  let inFlight: Promise<void> | null = null;
  const closeHooks: Array<() => Promise<void> | void> = [];

  const connectWith = (config: TConfig) => {
    const result = adapter.connect(config, schema);
    db = result.db;
    closeFn = result.close;
  };

  if (typeof source !== 'function') {
    connectWith(source);
  }

  return {
    getOrThrow() {
      if (db === null) {
        throw new Error(
          typeof source === 'function'
            ? `[drizzle:${adapter.name}] not connected yet, waiting for the first request to resolve its connection source`
            : `[drizzle:${adapter.name}] not connected, this should be unreachable for a static source`
        );
      }
      return db;
    },
    isReady: () => db !== null,
    async resolve(ctx) {
      if (db !== null || typeof source !== 'function') return;
      inFlight ??= (async () => {
        const config = await (
          source as (ctx: unknown) => TConfig | Promise<TConfig>
        )(ctx);
        connectWith(config);
      })();
      await inFlight;
    },
    onClose(cb) {
      closeHooks.push(cb);
    },
    async close() {
      await closeFn?.();
      for (const hook of closeHooks) await hook();
    },
  };
}
```

`resolve()` is the only place that has to guard against concurrent first requests racing to connect at once, `inFlight` makes every caller after the first one await the same in-progress connect instead of opening a second connection. Everything above this function is oblivious to Futon or to `rasengan-server`, it only knows about `DrizzleAdapter` and a source.

### `futon.ts`

```ts
export function drizzle<TConfig, TSchema extends Record<string, unknown>, TDb>(
  app: Futon,
  adapter: DrizzleAdapter<TConfig, TSchema, TDb>,
  source: ConnectionSource<TConfig, Context>,
  schema: TSchema
): () => TDb {
  const core = createConnection(adapter, source, schema);
  app.onDestroy(() => core.close());

  if (typeof source === 'function') {
    app.use(async (ctx, next) => {
      await core.resolve(ctx);
      return next();
    });
  }

  return () => core.getOrThrow();
}
```

Everything discussed earlier in this conversation carries over unchanged in behavior, the static path connects immediately and the returned accessor works from anywhere right away, the resolver path connects on the first request and the accessor throws a clear error before that point.

### `drivers/d1.ts`

```ts
import { drizzle as toD1 } from 'drizzle-orm/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { DrizzleAdapter } from '../adapter.js';

export function d1Adapter<
  TSchema extends Record<string, unknown>,
>(): DrizzleAdapter<D1Database, TSchema, DrizzleD1Database<TSchema>> {
  return {
    name: 'd1',
    connect(binding, schema) {
      const db = toD1(binding, { schema });
      return {
        db,
        close: async () => {},
        migrate: async () => {
          throw new Error(
            '[drizzle:d1] use `wrangler d1 migrations apply`, D1 does not support a live drizzle-kit migration connection'
          );
        },
      };
    },
  };
}
```

`TConfig` for this adapter is the `D1Database` binding itself, there is no pool or client object to build, `connect()` stays synchronous like every other adapter, the only thing that changed is what the caller passes in and when.

### `drizzle.module.ts`, rewritten on the core

`ModuleConfig` has no `plugins` field. It has an open extension-key index signature instead, `[extensionKey: string]: unknown` (`packages/framework/rasengan-server/src/server/module.ts:49`), a key is claimed by a `ModulePlugin` (`packages/framework/rasengan-server/src/plugin/index.ts`) that the app registers once via `app.registerPlugin(...)` in `bootstrap()`, the same pattern `@rasenganjs/ws` already uses for its `gateways` key (`packages/ecosystem/ws/src/plugin.ts:78-98`). `compile()` throws if a module declares a key with no matching registered plugin (`app.ts:659-667`), so a forgotten registration fails loudly at boot rather than silently doing nothing.

```ts
// drizzle.module.ts
export class DrizzleModule {
  static forRoot<TConfig, TSchema extends Record<string, unknown>, TDb>(
    opts: DrizzleModuleOptions<TConfig, TSchema, TDb>
  ): ModuleConfig {
    const core = __setActiveConnection(
      createConnection(opts.adapter, opts.connection, opts.schema)
    );

    return defineModule({
      name: 'DrizzleModule',
      providers: [DataSource],
      exports: [DataSource],
      global: opts.global ?? true,
      // Declared only when the source needs a per-request resolve.
      // dispatchPlugins() skips keys whose value is undefined
      // (app.ts:657), so a static/pg config needs no plugin at all.
      drizzleConnection:
        typeof opts.connection === 'function' ? core : undefined,
    });
  }
}
```

```ts
// plugin.ts, a new file, mirrors packages/ecosystem/ws/src/plugin.ts
import type { ModulePlugin } from '@rasenganjs/server';
import type { ConnectionCore } from './connection.js';

export function createDrizzlePlugin(): ModulePlugin {
  return {
    key: 'drizzleConnection',
    register(app, _container, _mod, value) {
      const core = value as ConnectionCore<unknown>;
      app.use(async (ctx, next) => {
        await core.resolve(ctx);
        return next();
      });
    },
  };
}
```

```ts
// bootstrap.ts, only required for a resolver-based source (D1);
// a static/pg-backed forRoot() needs neither this call nor the key above
import { createDrizzlePlugin } from '@rasenganjs/drizzle';

bootstrap((app) => {
  app.registerPlugin(createDrizzlePlugin());
  app.registerModule(appModule); // imports dbModule from DrizzleModule.forRoot({...})
});
```

`__setActiveConnection` keeps its existing double-`forRoot()` guard, it now stores a `ConnectionCore<unknown>` instead of a raw `ConnectResult<unknown>`. `DataSource.db` becomes `get db(): TDb { return activeConnection.getOrThrow() as TDb; }`, and `onDestroy()` becomes `await activeConnection?.close()`, both one-line changes since `connection.ts` already carries the logic that used to live directly in `data-source.ts`.

This is the corrected version of an earlier draft of this RFC, which had `defineModule()` accept a `plugins: [...]` array directly. That field does not exist on `ModuleConfig`, `defineModule()` is a pass-through (`module.ts:71-73`) with no special handling for a `plugins` key, so that earlier sketch would have been silently ignored rather than doing anything. The corrected version above reuses the real extension-key mechanism, but see the next section, the `register()` callback calling `app.use()` from inside a `ModulePlugin` does not actually work yet, for a separate, confirmed reason.

### Two distinct "not ready" states

RFC-0006 had one failure mode for `DataSource.db`: called before any `forRoot()` ran. This RFC adds a second, real one: `forRoot()` ran, a resolver source was configured, but no request has reached the app yet. Both throw, both are directed, but the message must tell them apart, since the fix for the first is "call `forRoot()` before this code runs" and the fix for the second is "this code cannot run before the first request, move it into a handler or accept that D1-backed background work has to wait."

### Migration story for D1

`runMigrations()` keeps its current signature and behavior unchanged for adapters with a real standalone connection (`node-postgres`). For `d1Adapter()`, `adapter.connect()` on a script would need a real `D1Database` binding that does not exist outside a Worker, so `runMigrations()` is simply not usable for D1 in practice, the same way `d1Adapter().migrate()` above refuses to run inside a live app. Consumers use `drizzle-kit generate` for SQL files and `wrangler d1 migrations apply` for applying them, exactly as they would outside Rasengan entirely.

## Dependency on a confirmed `rasengan-server` core constraint

This is not a hypothetical risk, it is a bug traced directly in the current `compile()` implementation, the same way RFC-0006 documented the `useValue`-lifecycle gap it depended on (later fixed by RFC-0012).

`ServerApp.compile()` (`packages/framework/rasengan-server/src/server/app.ts:340-427`) does, in order:

1. Line 345-347: drains `this.middlewareList`, the buffer `ServerApp.use()` pushes into (`app.ts:190-191`), into the real `Futon` instance's own `app.use()`. This runs exactly once.
2. Line 419-423: `registerControllers()`, wiring each module's routes onto the same `Futon` instance.
3. Line 425-427: `dispatchPlugins()`, calling `plugin.register(this, container, mod, value)` for every module key a registered `ModulePlugin` claims.

A `ModulePlugin.register()` callback that calls `app.use(middleware)` (where `app` is the `ServerApp`, per the `ModulePlugin.register` signature) only pushes into `this.middlewareList`, the same buffer already drained at step 1, three steps earlier in the same `compile()` call. Nothing reads `middlewareList` again afterward. The middleware never reaches the real `Futon` instance. This is confirmed by reading `compile()` directly, not inferred from behavior.

Futon itself has no such problem, its composed request chain is always built as `[...middlewares, router.middleware()]` (`packages/framework/futon/src/app/index.ts:392`), the router is always last regardless of registration order, and the chain is rebuilt lazily whenever `use()` invalidates it. `.websocket()` also works correctly from a plugin, because it stages into `this.websocketRoutes` (`app.ts:261-262`), an array only consumed into a registry after `dispatchPlugins()` runs, unlike `middlewareList`. The bug is specific to `ServerApp.use()`'s single early drain, not a general property of the framework.

**Consequence for this RFC:** `createDrizzlePlugin()` as sketched above is correct in shape, matches the same pattern `@rasenganjs/ws` already uses, but its `register()` callback's `app.use()` call was a no-op against `rasengan-server` as it stood when this RFC was drafted. The D1-via-`forRoot()` path (and any future resolver-based adapter used through the DI path) could not ship until this was fixed upstream. **Fixing it was scoped out of this RFC** at draft time, the same way RFC-0006 scoped the `useValue` fix to what became RFC-0012, on the grounds that it is a `rasengan-server` core issue, not a `@rasenganjs/drizzle` one. Two candidate fixes were noted for that follow-up:

- Move the `middlewareList` drain (step 1) to run after `dispatchPlugins()` (step 3) instead of before it. Would need a careful check of whatever else in `compile()` currently assumes global middleware is attached before routes are registered, a real behavior change to `compile()`'s sequencing, not a one-line move.
- Give `ModulePlugin.register()` a dedicated way to add middleware that writes directly onto `this.futon` (already assigned at line 343, before `dispatchPlugins()` runs), instead of going through the `ServerApp.use()`/`middlewareList` path built for pre-`compile()` calls from `bootstrap()`.

**Update, same day:** the second option shipped. `ServerApp.use()` (`packages/framework/rasengan-server/src/server/app.ts`) now attaches directly to `this.futon` when it already exists, falling back to the original `middlewareList` buffering only before `compile()` has created it, covering both the `dispatchPlugins()` case and any `app.use()` call made after `compile()` has already returned. No change to `compile()`'s sequencing itself. Verified by a new regression test in `rasengan-server`'s `plugin.test.ts` (a plugin-registered middleware now runs ahead of a matched controller route, not only ahead of the 404 fallback) and by `createDrizzlePlugin()`'s own end-to-end test in `plugin.test.ts` here, exercising the full `ServerApp.compile()` → `dispatchPlugins()` → `app.use()` → request path. The D1-via-`forRoot()` path is unblocked.

Everything else in this RFC (`connection.ts`, `futon.ts`, `drivers/d1.ts`) never depended on this constraint and was buildable and shippable independently of it, per the phased delivery below.

## Alternatives considered

- **Keep the Futon-native path and the DI path as two independent implementations** instead of sharing `connection.ts`. Rejected, the whole point of this RFC is that D1's lazy-resolve behavior needs to exist once, not be reimplemented twice and risk drifting apart the next time either path changes.
- **Solve D1 access with `import { env } from 'cloudflare:workers'`** instead of a per-request resolver function, avoiding the first-request-capture step entirely. Set aside for this pass, it is unverified whether that binding is reachable outside a request's `AsyncLocalStorage`-tracked execution, which would mean it still needs the same first-request capture underneath, and it would pull a Workers-specific global into an otherwise portable adapter interface. Worth revisiting narrowly inside `drivers/d1.ts` later, it does not change the resolver mechanism the rest of this RFC depends on.
- **Add request-scoped providers to `rasengan-server`'s DI container** so `DataSource` could be resolved fresh per request instead of cached after the first one. Rejected as far larger than this problem needs, RFC-0003 already excludes this deliberately, and the D1 binding does not actually change between requests within one Worker instance, so a per-request re-resolve would be pure overhead for a value that is effectively a singleton once captured.
- **Give `DrizzleModuleOptions.connection` a separate field name for the resolver case** (for example `connectionFactory`) instead of widening `connection`'s type to a union. Rejected, it would force every call site to know in advance which driver category it is using, when the whole point of the adapter boundary is that call sites should not need to care.

## Risks & failure modes

- **The D1-via-`forRoot()` path is blocked on a confirmed `rasengan-server` bug, not an open question.** See "Dependency on a confirmed `rasengan-server` core constraint" above. The Futon-native path and the DI path's static/pg case are both unaffected and can ship without waiting on it.
- **A lazy source cannot resolve before the first request, by construction.** Any app code that expects `DataSource.db` or a Futon `getDb()` to work before the first request (a `Provider.onInit()` hook, a startup script) breaks for D1-backed apps specifically. This is a platform constraint, not a bug, but it needs to be documented loudly in both the package README and the error message itself, not discovered by surprise.
- **Concurrent first requests must connect exactly once.** `connection.ts`'s `inFlight` guard is the piece responsible for this, unit tests must cover it directly (two concurrent `resolve()` calls before the first completes should only invoke `adapter.connect()` once).
- **Widening `connection`'s type to a union changes `DrizzleModuleOptions`'s public shape.** Every current `node-postgres` consumer keeps working unchanged since a plain object is still a valid member of the union, but any tooling that inspected `DrizzleModuleOptions['connection']` as a bare `TConfig` needs to account for the function case too.
- **`onDestroy()` firing order.** Both `futon.ts` and `drizzle.module.ts` now register their close logic through `Futon.onDestroy()` (directly, or through the DI path's `ModulePlugin`, once that path is unblocked), consistent with how `app.onDestroy()` already works for anything else registered on the app, no new ordering concern beyond what already exists for other `onDestroy()` consumers.

## Out of scope

- Fixing the confirmed `ServerApp.compile()` `middlewareList`-draining bug itself, tracked as a separate `rasengan-server` core RFC per the "Dependency" section above, not part of this package's implementation.
- Any driver beyond `node-postgres` and `d1`.
- Request-scoped or per-tenant database selection.
- D1 migration tooling beyond documenting the existing `wrangler d1 migrations` flow.
- Multiple simultaneous `DataSource` configurations on the DI path (unchanged Non-goal from RFC-0006).

## Delivery phases

1. **Done.** **`connection.ts` core**: `createConnection()`, the eager path, the lazy path, the concurrent-first-request guard, `onClose()`/`close()` wiring. 7 unit tests, no Futon or DI dependency, mirroring how RFC-0006's own `drizzle.module.test.ts` used a fake adapter.
2. **Done.** **`futon.ts` and `drivers/d1.ts`**: the Futon-native `drizzle()` helper built on the core, `d1Adapter()` (built on `AnyD1Database` from `drizzle-orm/d1` itself, no `@cloudflare/workers-types` dependency needed). Tests against a real, not mocked, `Futon` instance, exercising `app.use()`/`app.onDestroy()`/`app.fetch()` for real.
3. **Done.** **`drizzle.module.ts` and `data-source.ts` rewritten on the core**: `DataSource.db`/`onDestroy()` delegate to a `ConnectionCore`, the two distinct "not ready" error messages, `DrizzleModuleOptions.connection` widened to a `ConnectionSource`. Every existing RFC-0006 test for the `node-postgres`/eager case passes unchanged.
4. **Done.** **The `rasengan-server` core fix, then `createDrizzlePlugin()` and the lazy/D1 path through `forRoot()`**: the fix landed first (see "Dependency" section), then `plugin.ts`'s `createDrizzlePlugin()`, verified end to end through `ServerApp.compile()` → a real request → `DataSource.db` inside an injected repository inside a controller.
5. **Open.** **Docs and examples**: a Futon-only Postgres example, a Futon-only D1 example, and a Rasengan-Server D1 example, under `apps/playground` or `apps/examples`, matching RFC-0006's own example precedent.
6. **Open.** **Publish**: joins the existing `@rasenganjs/drizzle` release cycle.

## Verification (for the eventual implementation PR)

- `connection.ts`: eager source connects immediately at creation, lazy source connects only after the first `resolve()` call, a second concurrent `resolve()` call while the first is in flight does not call `adapter.connect()` a second time, `close()` calls the adapter's `close()` exactly once plus every registered close hook. **Done**, `src/__tests__/connection.test.ts`.
- `futon.ts`: `getDb()` throws before the first request for a lazy source, works immediately for a static source, works after the first request for a lazy source and stays stable across further requests, `app.onDestroy()` closes the underlying connection. **Done**, `src/__tests__/futon.test.ts`.
- `drivers/d1.ts`: `connect()` wraps `drizzle-orm/d1` correctly against a fake `D1Database`, `migrate()` throws the documented pointer to `wrangler d1 migrations apply`. **Done**, `src/__tests__/d1.test.ts`.
- `drizzle.module.ts`: every existing RFC-0006 test (double `forRoot()` throws, DI-by-name contract, `.db` delegation, `onDestroy()` closes) still passes unchanged for the `node-postgres`/eager case, plus new tests for the resolver case (`drizzleConnection` key presence, the distinct "waiting on first request" error). **Done**, `src/__tests__/drizzle-module.test.ts`.
- `createDrizzlePlugin()`: an integration test that a plugin-registered middleware actually runs before a matched controller route handler, not only before the 404 fallback, this is the exact property the `rasengan-server` bug broke, plus a test that compile() still throws its existing "unknown key" error if the plugin is never registered. **Done**, `src/__tests__/plugin.test.ts`, and the matching `rasengan-server`-side regression test in that package's own `plugin.test.ts`.
- Workspace typecheck clean, full vitest suite green (`@rasenganjs/drizzle` 29/29, `@rasenganjs/server` 122/122, `@rasenganjs/ws` 44/44, `@rasenganjs/queue` 73/73, `@rasenganjs/io` 19/19). **Done.**
