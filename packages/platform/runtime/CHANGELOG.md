## Unreleased

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
