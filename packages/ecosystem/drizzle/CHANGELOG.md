## Unreleased

## 1.0.0-beta.3 (2026-09-01)

### Features

- **drizzle:** Futon-native usage, a D1 adapter, and a shared connection core f6d9a35

### Features

- **Futon-native usage, no `@rasenganjs/server` required** (RFC-0014 phases 1-4). `drizzle(app, adapter, source, schema)`, a new `./futon` subpath export, wires a `Drizzle` connection straight onto a plain `Futon` app with no DI container, `Module`, or `Provider` involved, and returns a zero-argument accessor usable from a handler, a background job, or anywhere else in the process
- **A D1 adapter** (`./drivers/d1` subpath export, `d1Adapter()`), built directly on `drizzle-orm/d1`'s own `AnyD1Database` type so it needs no `@cloudflare/workers-types` dependency. `migrate()` refuses on D1 and points at `wrangler d1 migrations` instead, since D1 migrations are a Wrangler-managed concern
- A shared connection core (`connection.ts`, `createConnection()`) resolves a connection either eagerly (a static config, `node-postgres`'s existing behavior) or lazily via a resolver run against the first request, which a D1 binding needs since it doesn't exist yet at boot time. Includes a concurrent-first-request guard and `close()`/`onClose()` wiring. `DrizzleModule.forRoot()`/`data-source.ts` are rewritten on this same core, and `DrizzleModuleOptions.connection` now accepts a resolver too
- `DataSource.db` now distinguishes "`forRoot()` never ran" from "`forRoot()` ran but is still waiting on the first request" with two separate, more actionable error messages
- `createDrizzlePlugin()` wires a lazily-resolved connection into the request pipeline via `app.registerPlugin()`, the same `ModulePlugin` extension mechanism `@rasenganjs/ws` already uses, enabling the D1-via-`forRoot()` path (needs the companion `@rasenganjs/server` fix routing `app.use()` to the live `Futon` instance once compiled, see that package's changelog)
- `@rasenganjs/futon` added as an optional peer dependency, and `@rasenganjs/server` is now optional too, since Futon-only usage no longer needs it

## 1.0.0-beta.2 (2026-07-24)

## 1.0.0-beta.1 (2026-07-24)

## 1.0.0-beta.0 (2026-07-21)
