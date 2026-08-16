## Unreleased

### Features

- `WorkerdProdAdapter.fetchHandler` now forwards `env` and `ctx` (`ExecutionContext`) into Futon's `RuntimeContext` on every request, and defaults `passthrough` to `true` — the Service Worker registration format (`self.addEventListener('fetch', ...)`) never receives `env` from workerd by platform design, so Module Worker format (`export default { fetch }`) is now the default rather than an opt-in, otherwise a deployed Futon app could not read a single binding (D1, R2, KV, service bindings, secrets) (RFC-0013 Phase 1) 2b790f9
- Node and Bun adapters (dev + prod) now pass a `RuntimeContext.executionCtx` stub into every `app.fetch()` call — a fire-and-forget `waitUntil` that runs the promise to completion and logs rejections instead of leaving them unhandled, so `ctx.runtime.executionCtx?.waitUntil(...)` is safe to call the same way on every runtime (RFC-0013 Phase 1) 2b790f9

## 1.0.0-beta.5 (2026-08-10)

## 1.0.0-beta.4 (2026-08-10)

### Features

- implement RFC-0010 automatic server-side env var loading 946b3c3

### Features

- `loadNodeEnvFiles`/`loadBunEnvFiles` now also assign every loaded key into `process.env`/`Bun.env`, skipping any key already set there (RFC-0010) — previously they only fed `Futon.loadEnv()`'s own `app.env` bag, so the standard `process.env.X` idiom (app code and third-party libraries alike) never saw a loaded `.env*` value regardless of when loading ran
- new `getLoadedEnvFiles(rootDir, mode)` export on both Node and Bun adapters — a display-only existence check (not a second parse) listing which of the standard `.env*` files actually exist, in load-priority order, for callers that want to show what was loaded (RFC-0010)

## 1.0.0-beta.3 (2026-08-06)

### Features

- migrate rasengan rendering + dev server onto Futon (RFC-0007 Phase 0-2) c09f8bc
- rewrite @rasenganjs/serve on Futon + NodeProdAdapter (RFC-0007 Phase 2b) 91d8949

### Features

- export `incomingToRequest` and `writeNodeResponse` from `@rasenganjs/runtime/adapters/node` — the Node request/response conversion helpers `startNodeServer` already used internally, now reusable by a caller that owns its own `http.createServer` (RFC-0007's rasengan dev server, which needs to give Vite's Connect-style dev middleware first crack at a request before converting to/from Web API types)
- all five adapters (Node/Bun dev+prod, Workerd prod) now call `app.configureAssets(this.assets)` at the same setup moment they already call `app.configureServer(...)`, populating `@rasenganjs/futon`'s new `ctx.runtime.assets`

### Refactors

- extract `writeNodeResponse` out of `startNodeServer`'s inline body (pure extraction, no behavior change)

## 1.0.0-beta.2 (2026-07-24)

## 1.0.0-beta.1 (2026-07-24)

### Features

- add app-level lifecycle to Futon, propagate through adapters 1a1844e
- adding drizzle package to address the RFC 0006 80220fe
- **runtime:** add Bun WebSocket support (RFC-0001) 507eaa4
- **runtime:** add Node WebSocket upgrade handling (RFC-0001) 7d4906b

### Bug Fixes

- **runtime:** reuse the same WebSocketConnection across a Bun connection d44ec6f
- **runtime:** stop utf8-decoding Node request bodies bf60e3a

### Performance Improvements

- implement RFC-0005 HTTP hot-path phase 3b 3e2f29a
- implement RFC-0005 HTTP hot-path phases 1-3a 37d77e7

## 1.0.0-beta.0 (2026-06-25)
