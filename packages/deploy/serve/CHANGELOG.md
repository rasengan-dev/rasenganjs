## Unreleased

## 2.0.0-beta.2 (2026-08-10)

### Features

- implement RFC-0010 automatic server-side env var loading 946b3c3

### Features

- the startup banner now shows an `Env:` line listing which `.env*` files were actually loaded from the build directory, right below `Runtime:` (RFC-0010)

## 2.0.0-beta.1 (2026-08-07)

### Features

- wire _api routes into dev, serve, and Vercel (RFC-0008 Phase 2) 1e08a46

### Features

- support `_api/` file-based API routes (RFC-0008) — mounts `createApiRouterMiddleware` ahead of the SSR fallback, a no-op when the app has none

### Bug Fixes

- **`rasengan-serve` crashed with `ReferenceError: Bun is not defined` when `rasengan.config.js` sets `runtime: "bun"`** — the `rasengan-serve` bin script always launches under `#!/usr/bin/env node` (`pnpm serve` / `rasengan-serve ./dist` runs through the normal `node`-shebang shim), so `BunProdAdapter.serve()`'s call into `Bun.serve()` had no real Bun process to run in. `rasengan-serve` now detects this mismatch and automatically re-execs itself under `bun` (same arguments, forwarded exit code) before starting the server — the `bun <path>/bin.js ./dist` manual invocation documented in 2.0.0-beta.0 below is no longer necessary. If `bun` isn't installed, a clear error is printed instead of the bare `ReferenceError`

### Refactors

- the startup banner now matches `rasengan`'s and `@rasenganjs/server`'s format — same wording ("Rasengan v{version} running", "running" in green), `→`-prefixed `Local:`/`Network:`/`Runtime:` lines

## 2.0.0-beta.0 (2026-08-06)

### Features

- add Bun support to @rasenganjs/serve (RFC-0007 Phase 4a) 29358be
- add production structural-404 route guard (RFC-0007 §3) 7993572
- rewrite @rasenganjs/serve on Futon + NodeProdAdapter (RFC-0007 Phase 2b) 91d8949

### BREAKING CHANGES

- rewritten on `@rasenganjs/futon` + `@rasenganjs/runtime`'s `NodeProdAdapter`, dropping `express`/`compression`/`morgan` entirely (RFC-0007 Phase 2b) — the four `express.static(...)` mounts are now `staticFiles()` calls (same roots/prefixes), and `app.all('*', ...)` is now `app.fallback(...)`. No CLI/usage changes for consumers (`rasengan-serve <build-path>`), but anything relying on Express-specific request/response behavior at this layer (e.g. custom middleware patched onto the Express app) needs to move to futon middleware instead

### Features

- add Bun support — the production adapter (`NodeProdAdapter` vs `BunProdAdapter`) is now picked from the build's `AppConfig.runtime` (set in `rasengan.config.js`) instead of being hard-coded to Node. Run the built app with `bun <path-to>/rasengan-serve/bin.js ./dist` when `runtime: 'bun'` is set (pnpm's `.bin` shell shim isn't parseable by `bun <file>` directly — invoke `bin.js` itself)
- adds a structural `404` for SSR requests whose path doesn't match the app's route tree at all, via the new `createMatchRoutesGuard` from `rasengan/server` (SPA mode is unaffected — it intentionally serves the same shell for every path)

### Refactors

- `config.json` is now read once at startup instead of on every request inside the fallback handler
- drop the `chalk` dependency — the startup banner's bold/blue text now uses a small built-in ANSI helper (`ansi.ts`, `NO_COLOR`/non-TTY aware, same as `chalk`'s own default behavior)

### Bug Fixes

- React Router client-side navigation requests (`Accept: application/json` or a `.data`-suffixed URL, e.g. `/pricing.data`) previously got back a full HTML document instead of the matched route's loader/action JSON — `rasengan-serve` consumes `createRequestHandler` from `rasengan/server`, which now correctly branches on these requests (fixed at the source, see `rasengan`'s own changelog)

## 1.2.1 (2026-02-05)

## 1.2.0 (2026-01-03)

## 1.1.0 (2025-08-30)

## 1.0.1 (2025-04-26)

- Style: Properly display server information in build output [a2c833b](https://github.com/rasengan-dev/rasenganjs/a2c833ba29f8976929baf4a35b06f530a9355d5e)
- feat: Refactoring the flow and add logo into the terminal [039ba62](https://github.com/rasengan-dev/rasenganjs/039ba629b1190524fcea1ff738271fde9f5304f2)

## 1.0.0 (2025-04-26)

## 1.0.0-beta.55 (2025-03-16)

## 1.0.0-beta.54 (2025-02-25)

## 1.0.0-beta.53 (2025-02-18)
