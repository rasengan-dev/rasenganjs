## Unreleased

### Features

- add typed `Env` generic on `Context`/`Futon`/`Handler`/`Middleware`: declare a project's own `Bindings` type and pass it to `new Futon<Bindings>()` for full autocomplete on `ctx.runtime.env` in every handler/middleware registered through `get`/`post`/`put`/`patch`/`delete`/`head`/`options`/`use`, matching Hono's `c.env`; defaults to `Record<string, unknown>` so existing untyped apps compile unchanged (RFC-0013 Phase 2) 946c1b5
- add `RuntimeContext.executionCtx` (`ExecutionContext.waitUntil`/`passThroughOnException`) and widen `RuntimeContext.env` from `Record<string, string>` to `Record<string, unknown>`: Workers bindings (D1, R2, KV, service bindings, secrets) and fire-and-forget work are now reachable from `ctx.runtime` on every adapter, with a real `ExecutionContext` on Workerd and a logging stub on Node/Bun (RFC-0013 Phase 1) 2b790f9

### Bug Fixes

- `bodyParser()` now defaults to parsing only json, url-encoded, multipart, and text/plain content types; anything else (binary uploads, unrecognized or missing Content-Type) is left unread by default so its stream stays available for a handler to consume directly bd6d516

## 1.0.0-beta.4 (2026-08-14)

### Bug Fixes

- duplicate Content-Type header breaking SSR on workerd (RFC-0009) 965f861, closes #mergeInit

## 1.0.0-beta.3 (2026-08-06)

## 1.0.0-beta.2 (2026-08-06)

### Features

- migrate rasengan rendering + dev server onto Futon (RFC-0007 Phase 0-2) c09f8bc
- rewrite @rasenganjs/serve on Futon + NodeProdAdapter (RFC-0007 Phase 2b) 91d8949

### Features

- add `app.fallback(handler)` — a catch-all for unmatched routes with no status coercion, for handlers (like an SSR dispatcher) that legitimately return `200` most of the time; `app.notFound()` keeps its existing behavior (coerces any `200` to `404`) for its own narrower use case (RFC-0007 §3)
- add `staticFiles(options)` middleware — serves static files through `ctx.runtime.assets` only, no `node:fs`, portable to every adapter including Workerd's no-op stub (RFC-0007 §9)
- add `RuntimeContext.assets` and `Futon.configureAssets(assets)`, mirroring `configureServer()`/`loadEnv()` — populated by every `@rasenganjs/runtime` adapter at the same one-time setup moment

## 1.0.0-beta.1 (2026-07-24)

## 1.0.0-beta.0 (2026-06-25)
