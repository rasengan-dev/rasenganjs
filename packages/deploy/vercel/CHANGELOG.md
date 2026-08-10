## Unreleased

### Bug Fixes

- disable Vercel's req.body pre-parsing to stop POST timeouts

- **`shouldAddHelpers: true` made Vercel drain the request stream to populate `req.body` before invoking the handler** — `incomingToRequest()` then streamed the already-empty `req` to build the Request's body, hanging until `maxDuration` on any request with a body (surfacing as `FUNCTION_INVOCATION_TIMEOUT`). GET/HEAD were unaffected since they never touch the body. Fixed by setting `shouldAddHelpers: false` in the generated `.vc-config.json`

## 2.0.0-beta.1 (2026-08-07)

### Features

- wire _api routes into dev, serve, and Vercel (RFC-0008 Phase 2) 1e08a46

### Features

- support `_api/` file-based API routes (RFC-0008) — the generated serverless handler mounts `createApiRouterMiddleware` with the app's configured prefix baked in at `prepare()`-time

## 2.0.0-beta.0 (2026-08-06)

### Bug Fixes

- **vercel:** remove Express from the generated serverless handler (RFC-0007 Phase 2c) e8a7faf

### Bug Fixes

- **the generated serverless function was broken since RFC-0007's Express removal** — `generateServerlessHandler()`'s template still built an Express app around `express`/`compression` imports from `rasengan/server`, both removed. Rewritten on Futon + `@rasenganjs/runtime`'s Node adapter: reuses `NodeProdAdapter`'s filesystem-backed `Assets` implementation without binding a port, and exports a plain `async (req, res) => {...}` — the same calling convention an Express app satisfies, so it drops into Vercel's Node.js launcher unchanged. Also picks up the `createMatchRoutesGuard` structural-404 guard (RFC-0007 §3), matching `@rasenganjs/serve`'s production SSR path

## 1.1.3 (2026-02-05)

## 1.1.2 (2026-02-05)

## 1.1.1 (2026-02-05)

## 1.1.0 (2026-01-03)

## 1.1.0-beta.2 (2026-01-03)

## 1.1.0-beta.1 (2026-01-03)

## 1.1.0-beta.0 (2026-01-03)

## 1.0.0 (2025-04-26)

- fix: fixing build error for vercel adapter [d2536faa](https://github.com/rasengan-dev/rasenganjs/commit/d2536faa6019285b1349f39711dfddd4c5874d47)
- fix: uncomment the preparation script to enable output generation for vercel [b65c39ed](https://github.com/rasengan-dev/rasenganjs/commit/b65c39ed9ce30a0e2d1c9e1d4d195e01e89a034c)
- feat: add support for spa mode into vercel [e911cddb](https://github.com/rasengan-dev/rasenganjs/commit/e911cddb7b3bca73d316f39cbd0ff20fe1328781)
