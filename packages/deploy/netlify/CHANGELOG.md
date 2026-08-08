## Unreleased

### Bug Fixes

- **rewrote the adapter on Futon (RFC-0007) — it was never updated after the Express → Futon migration and would have crashed on the first real request.** The generated SSR handler hand-built a fake Express `req`/`res` and called `createRequestHandler(req, res)`, a signature `rasengan/server` dropped entirely (now `(ctx) => Promise<Response>`). Rewritten to mirror `@rasenganjs/vercel`'s pattern: Futon + `NodeProdAdapter` assets, `compress()`/`staticFiles()`, `_api/` routes via `createApiRouterMiddleware`, `createRequestHandler` + `createMatchRoutesGuard` in `app.fallback()`. Netlify Functions v2 call the default export directly with a Web API `Request` and expect a `Response` back, so unlike Vercel this needs no req/res shim — `app.fetch(request)` is enough
- **`copyServerFiles`/`generateSSRHandler` only checked `config.ssr`, not also excluding `config.prerender`** — would have shipped a broken SSR function for SSG builds, since no `ssr` environment gets built in that case (same guard `@rasenganjs/vercel` already has)

### Refactors

- add `generatePackageJson()`/`runInstall()` (same as `@rasenganjs/vercel`) — the handler imports `@rasenganjs/futon`/`@rasenganjs/runtime` directly, transitive dependencies of `rasengan` itself, not resolvable from the site under pnpm's strict `node_modules` layout without a self-contained install scoped to the function
- add the missing `README.md`; align `tsup.config.ts` with `@rasenganjs/vercel`'s (`external: ['rasengan']`)

## 1.0.0-beta.19 (2026-06-12)

## 1.0.0-beta.18 (2026-06-12)

## 1.0.0-beta.17 (2026-06-11)

### Bug Fixes

- ajust netlify config ca58edc

## 1.0.0-beta.16 (2026-06-11)

### Bug Fixes

- add send(body) and json(body) function to res mocked 4f7dff0

* fix: rewrite SSR handler with Express mock bridge for Netlify Functions v2
* fix: add `send()` and `json()` methods to mock Express `res`
* fix: switch output directory from `.netlify/v1/functions` to `netlify/functions`
* fix: correct build script (`&` → `&&`)
* chore: migrate build from `tsc` to `tsup`
* docs: rewrite CHANGELOG

## 1.0.0-beta.12 (2025-04-26)

- feat: initial Netlify adapter implementation
