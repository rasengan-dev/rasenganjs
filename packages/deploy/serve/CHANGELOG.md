## Unreleased

### BREAKING CHANGES

- rewritten on `@rasenganjs/futon` + `@rasenganjs/runtime`'s `NodeProdAdapter`, dropping `express`/`compression`/`morgan` entirely (RFC-0007 Phase 2b) — the four `express.static(...)` mounts are now `staticFiles()` calls (same roots/prefixes), and `app.all('*', ...)` is now `app.fallback(...)`. No CLI/usage changes for consumers (`rasengan-serve <build-path>`), but anything relying on Express-specific request/response behavior at this layer (e.g. custom middleware patched onto the Express app) needs to move to futon middleware instead

### Features

- add Bun support — the production adapter (`NodeProdAdapter` vs `BunProdAdapter`) is now picked from the build's `AppConfig.runtime` (set in `rasengan.config.js`) instead of being hard-coded to Node. Run the built app with `bun <path-to>/rasengan-serve/bin.js ./dist` when `runtime: 'bun'` is set (pnpm's `.bin` shell shim isn't parseable by `bun <file>` directly — invoke `bin.js` itself)
- adds a structural `404` for SSR requests whose path doesn't match the app's route tree at all, via the new `createMatchRoutesGuard` from `rasengan/server` (SPA mode is unaffected — it intentionally serves the same shell for every path)

### Refactors

- `config.json` is now read once at startup instead of on every request inside the fallback handler

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
