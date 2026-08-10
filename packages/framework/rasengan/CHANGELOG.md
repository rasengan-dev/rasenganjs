## Unreleased

## 2.0.0-beta.4 (2026-08-10)

### Features

- implement RFC-0010 automatic server-side env var loading 946b3c3

### Bug Fixes

- **`rasengan dev`'s `_api/` routes (and `rasengan.config.js` itself) never had `.env*` files loaded at all** (RFC-0010) — the dev server builds its own `http.createServer` outside `@rasenganjs/runtime`'s adapters and never called any env loader. `.env*` is now loaded into `process.env` at the very top of the dev server's startup, before `rasengan.config.js` is imported and before Vite's dev server (and therefore any lazily-imported `_routes`/`_api` module) is created. `rasengan build` loads it the same way, before spawning `vite build`, so `rasengan.config.js` and any `generatePaths()`/`loader()` run during prerendering see it too. Depends on `@rasenganjs/runtime`'s updated `loadNodeEnvFiles`

### Features

- the dev server's startup banner now shows an `Env:` line listing which `.env*` files were actually loaded, right below `Runtime:`

## 2.0.0-beta.3 (2026-08-08)

### Bug Fixes

- add [@vite-ignore](undefined/vite-ignore) to ignore some warning while loading some modules dynamically 9036757

### Bug Fixes

- **the dev server's startup banner stacked a new `stdin` `keypress` listener every time the console was cleared (pressing `c`)** — `logServerInfo()` called `process.stdin.on('keypress', ...)` again on every re-render instead of reusing one, requiring `setMaxListeners(100)` to suppress Node's own leak warning. The listener setup is now guarded so it's attached exactly once per process, same pattern as `@rasenganjs/server`'s `setupKeypress()`
- **call adapter.prepare() directly instead of passing through a switch case** — the adapter's prepare method is now called directly instead of being passed through a switch case

## 2.0.0-beta.2 (2026-08-07)

### Features

- build-time guard for unreachable _api routes (RFC-0008 Phase 3) 09cf40e
- file-based _api route resolution (RFC-0008 Phase 1) f8b4074
- wire _api routes into dev, serve, and Vercel (RFC-0008 Phase 2) 1e08a46

### Bug Fixes

- catch-all route always returned HTTP 200, and .data 500s on unmatched paths 7db94ee

### Features

- **file-based `_api/` API routes (RFC-0008)** — a `src/app/_api/` folder, same segment conventions as `_routes/` (`[param]`, `[_param]`, `(group)`, `_optional`), resolves to a `@rasenganjs/futon` `Router` instead of a page tree. `*.route.ts` files export `GET`/`POST`/`PUT`/`PATCH`/`DELETE`/`HEAD`/`OPTIONS` handlers with Futon's own `(ctx: Context) => Promise<Response>` signature; `middleware.ts` per folder scopes middleware to that folder and its descendants. No wrapper file needed — `_api/`'s existence alone is enough for the plugin to wire the build entry and mount the router. Self-contained under its prefix (`AppConfig.api.prefix`, default `/api`): an unmatched path or an uncaught handler error responds in JSON there, never falling through to the HTML/SSR catch-all. Wired into the dev server, `createRequestHandler` (via the new `createApiRouterMiddleware`, also consumed by `@rasenganjs/serve` and the `@rasenganjs/vercel`-generated handler), and exported from `rasengan/server` (`flatApiRoutes`, `createApiRouterMiddleware`) — never through the client-facing route barrel, so `_api` code can't reach the client bundle. Builds fail fast with an explicit error if `_api/` exists but the build has no way to serve it (`ssr: true` with `prerender` disabled is required — `dist/server/api-router.js` only exists when the `ssr` environment itself gets built); `rasengan dev` is never affected, since the dev server always has a live process
- **`rasengan/server` now re-exports the full `@rasenganjs/futon` API surface** (all middleware, `Router`, response helpers, error classes, types) — app code, including `_api` handlers, imports Futon primitives from `rasengan/server` instead of depending on `@rasenganjs/futon` directly. `toExpressHandler`/`toWinterCgHandler` stay excluded (RFC-0007 §2)

### Bug Fixes

- **the built-in 404 catch-all route always responded with HTTP `200`**, not `404` — its loader returned a plain object instead of signaling a status, so `context.statusCode` from React Router's static handler never left its default. Fixed by returning `data({ props, meta }, { status: 404 })` (React Router's `data()` helper) instead
- **`.data`/`Accept: application/json` requests to an unmatched path returned `500` instead of `404`** — `handler.queryRoute()` _throws_ the constructed `Response` for any loader result carrying its own status (not just errors — this is documented React Router behavior, not specific to the fix above), and `handleDataRequest` had no `try/catch` around it. Now catches and returns the thrown `Response` directly when it's a genuine `Response`, still rethrowing anything else
- **`ManifestManager.generateMetaTags()` rendered `<script>`/`<link>` asset tags without a `key` prop**, triggering a React "Each child in a list should have a unique key prop" warning on every SSR render with more than one script/style asset

### Refactors

- **package build switched from `tsc -b` to `tsup`, output directory renamed from `lib/esm`/`lib/types` to `dist/`** — matches every other package in the monorepo. `tsup` (esbuild, `bundle: false`) replaces the two-project `tsc -b` build for JS emission and now also generates `.d.ts` declarations directly (previously a separate `tsc -b tsconfig.types.json` step), producing the same file-per-module layout the framework's own runtime code depends on (e.g. `dist/entries/server/entry.server.js`, resolved by `rasengan build`/`rasengan dev`). `tsconfig.esm.json`, `tsconfig.types.json` and the unused `tsconfig.cjs.json` are removed — nothing outside this package's own build script referenced them
- **the dev server's startup banner now matches `@rasenganjs/server`'s and `@rasenganjs/serve`'s format** — same wording ("Rasengan v{version} running", "running" in green), the same `→ Local:`/`→ Network:`/`→ Runtime:` lines, and the same `c`/`ctrl+c` hint wording. Drops the previous spinner and "Starting server in {mode} mode..." message

## 2.0.0-beta.1 (2026-08-06)

### Bug Fixes

- SPA template chunk emission and SSG dynamic-layout crash under Vite 8/Rolldown ab308c6

### Bug Fixes

- **SPA-mode builds (`ssr: false`) were broken under Vite 8/Rolldown** — compiling `src/template.tsx` relied on `this.load({id})` inside an output-phase hook, which Rolldown returns `null` for when the module was never part of the actual bundle's input graph, so `dist/assets/template.js` silently never got written and the build failed at `closeBundle` with `Cannot find module '.../template.js'`. Now emitted as a real chunk via `this.emitFile({type: 'chunk', ...})` in `buildStart` (the supported way to add an out-of-band build entry), with `preserveSignature: 'strict'` so its `export default` isn't tree-shaken away, then written out and removed from the bundle in `generateBundle`
- **SSG builds (`prerender: true`) crashed when the route tree had a layout with a dynamic path segment** (e.g. a `[_locale]/layout.tsx`), throwing `TypeError: route.module is not a function` — `getAllRoutesPath()` was calling `generatePaths()` resolution on any route with a `:param` segment, including layout routes, which (unlike page routes) never carry a `module`. Now only attempted for routes that actually have one; a dynamic layout's children still resolve their own segments (including the parent's) via their own `generatePaths()`

## 2.0.0-beta.0 (2026-08-06)

### Features

- add Bun support to @rasenganjs/serve (RFC-0007 Phase 4a) 29358be
- add production structural-404 route guard (RFC-0007 §3) 7993572
- config surface + dependency bumps for beta.1 (RFC-0007 Phase 3) e887bfd
- migrate rasengan rendering + dev server onto Futon (RFC-0007 Phase 0-2) c09f8bc

### Bug Fixes

- correctly route React Router .data requests, in dev and prod ee806a6

### BREAKING CHANGES

- `rasengan/server` no longer exports `express`/`compression` — the dev server and `createRequestHandler` now run on `@rasenganjs/futon` + `@rasenganjs/runtime` instead of Express (RFC-0007)
- `createRequestHandler({ build })` now returns a WinterCG-style handler, `(ctx: Context) => Promise<Response>`, instead of `(req: Express.Request, res: Express.Response) => Promise<void>`
- `peerDependencies.vite` hard-cut to `^8.0.0` (drops `^6.3.0`/`^7.0.0` support); `core/config/vite/defaults.ts` migrated from `build.rollupOptions` to `build.rolldownOptions`
- `react-router` bumped to `^8.3.0`; `peerDependencies.react`/`react-dom` bumped to `^19.2.7` to match react-router 8.3.0's own requirement
- `detectRuntime()` renamed to `detectDeploymentPlatform()` (frees the name for `@rasenganjs/runtime`'s own `detectRuntime`)

### Features

- SSR rendering moved from `renderToPipeableStream` (Node streams) to `renderToReadableStream` (Web Streams), returning a `Response` directly
- add `AppConfig.runtime?: 'node' | 'bun' | 'workerd'` (default `'node'`), parameterizing `resolve.conditions` and Node-builtin externals for the `ssr`/`ssg` Vite environments, and now also persisted into the build's `config.json` (`OptimizedAppConfig.runtime`) so downstream tools like `@rasenganjs/serve` can pick the matching production adapter
- `rasengan.config.js`'s reserved Vite keys (`environments`, `ssr`, `server`, `builder`, ...) are now stripped at runtime, not just excluded at the type level
- add `createMatchRoutesGuard({ build })`, exported from `rasengan/server` — a futon middleware that returns a structural `404` for any request whose path doesn't match the app's route tree at all, before any loader/render runs (production counterpart to the dev server's existing equivalent check)

### Bug Fixes

- dev/prod request logging now correctly reports the response status (previously logged the URL before the response completed)
- **production had no data-request handling at all** — an `Accept: application/json` or `.data`-suffixed request (React Router's client-side navigation convention) previously got back a full HTML document instead of the matched route's loader/action data; `createRequestHandler` now branches on `isDataRequest` the same way the dev server already did
- the `.data` URL suffix itself was also broken in dev — it was never stripped before matching against the route tree, so a request like `/pricing.data` fell through to the catch-all/404 route instead of `/pricing`'s. Fixed everywhere a pathname is matched against the route tree (`handleDataRequest`, `createMatchRoutesGuard`, both `preloadMatches` call sites) via a new shared `stripDataSuffix()` helper

## 1.2.2 (2026-06-01)

### Features

- add custom ErrorBoundary d419e67

### Bug Fixes

- add error templates and fix flat-routes error regarding the default layout 333414d
- catch error occuring in component definition 62d6d51

## 1.2.1 (2026-04-03)

## 1.2.1-beta.4 (2026-01-11)

## 1.2.1-beta.3 (2026-01-11)

## 1.2.1-beta.2 (2026-01-11)

## 1.2.1-beta.1 (2026-01-11)

## 1.2.1-beta.0 (2026-01-09)

## 1.2.0 (2026-01-03)

## 1.2.0 (2026-01-03)

## 1.2.0-beta.9 (2026-01-03)

## 1.2.0-beta.8 (2026-01-03)

## 1.2.0-beta.7 (2026-01-03)

## 1.2.0-beta.6 (2026-01-03)

## 1.2.0-beta.5 (2026-01-03)

## 1.2.0-beta.4 (2026-01-02)

## 1.2.0-beta.3 (2026-01-02)

## 1.2.0-beta.2 (2026-01-02)

## 1.2.0-beta.1 (2025-09-19)

- fix(rasengan): falling back to route.data if route.loaderData is undefined [3cc418](https://github.com/rasengan-dev/rasenganjs/3cc4186e34a5d115e6ef69e8c8b36538aa8562ed)

## 1.2.0-beta.0 (2025-09-18)

- feat: adding experiment lazyLoadPage function [017b26](https://github.com/rasengan-dev/rasenganjs/017b26a480815ff480a0f99368fa8fc0c094d5ab)
- feat(rasengan): synchronizing metadata on client navigation [75374b](https://github.com/rasengan-dev/rasenganjs/75374b958180ad1f46bb00f91235e22bfa11a321)
- feat(rasengan): adding support for lazy route loading into file-base routing [1161bc](https://github.com/rasengan-dev/rasenganjs/1161bc409679630e293a376536b2e749cbeeaab8)
- feat: start adding support for lazy loading pages into file-based routing [cbcfdb](https://github.com/rasengan-dev/rasenganjs/cbcfdb6a1f4992b6cfacc280c68dc0d8fe42059c)

## 1.1.3 (2025-08-30)

## 1.1.2 (2025-08-16)

## 1.1.1 (2025-08-16)

## 1.1.0 (2025-08-15)

## 1.1.0-beta.2 (2025-07-09)

## 1.1.0-beta.1 (2025-07-09)

## 1.1.0-beta.0 (2025-07-09)

## 1.0.0 (2025-04-26)

- fix: handling metadata on client when navigating between pages [5fbbaca](https://github.com/rasengan-dev/rasenganjs/5fbbaca5ce206d693b5a5d394827a3804838ba5c)
- feat(rasengan): update metadata on client while navigating [1c373ff](https://github.com/rasengan-dev/rasenganjs/1c373ff3e7dacee52dde81f8bb0689856ffe0393)
- fix: fix build issue in ssr mode [6dfde61](https://github.com/rasengan-dev/rasenganjs/6dfde618f4f0e43d801b67afc4f4235e98a3976c)
- feat: generate output inside the ./dist folder in spa mode instead of ./dist/client [cf2b7b2](https://github.com/rasengan-dev/rasenganjs/cf2b7b29133ff4f3256c131fa895fcde4d590e93)
- feat: handling proxy in spa mode [7616f67](https://github.com/rasengan-dev/rasenganjs/7616f670d8f7ae0a02d494b13bbe03efc25cc26e)
- feat: generate template.js, config.json and index.html during build for spa [ed345f2](https://github.com/rasengan-dev/rasenganjs/ed345f2abda7c508a384a16409fc28799085476c)
- feat: Handling client rendering for spa mode [980eefc](https://github.com/rasengan-dev/rasenganjs/980eefc65a17016544c94b323d69a92d24ac149d)
- feat: adding handleSpaModeHandle to render blank html in dev server mode [fe6b79b](https://github.com/rasengan-dev/rasenganjs/fe6b79b370e8626ddc65a6f4142225fd71880a5a)
- feat: adding option 'ssr' into defineConfig to enable spa mode [d2da64d](https://github.com/rasengan-dev/rasenganjs/d2da64d8a372f5ad71ff26196c37658e78e71cc7)
- feat: merge static metadata and dynamic metadata [c979609](https://github.com/rasengan-dev/rasenganjs/c979609e5b45b45f9965a81c34fa73284dce3e09)
- feat: Enabling keypress event capture by using readline built in nodejs package [72422fd](https://github.com/rasengan-dev/rasenganjs/72422fd8f5eee401f0ba0468a51d09097dc3ae8d)
- feat: implement the mergeMetadata function to merge static and dynamic metadata together [29a88dd](https://github.com/rasengan-dev/rasenganjs/29a88ddc727f523d6fedb28b5166501fe48ee275)

## 1.0.0-beta.62 (2025-04-26)

## 1.0.0-beta.61 (2025-03-22)

## 1.0.0-beta.60 (2025-03-16)

## 1.0.0-beta.59 (2025-03-16)

## 1.0.0-beta.58 (2025-03-12)

## 1.0.0-beta.57 (2025-03-04)

## 1.0.0-beta.56 (2025-03-03)

## 1.0.0-beta.55 (2025-02-28)

## 1.0.0-beta.54 (2025-02-28)

## 1.0.0-beta.53 (2025-02-28)

## 1.0.0-beta.53 (2025-02-28)
