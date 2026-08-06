# RFC 0007 — Migrating `rasengan` from Express/Vite 7 to Futon/Vite 8

**Status:** Draft  
**Author:** Rasengan.js Core Team  
**Date:** 2026-08-06

## Executive Summary

`packages/framework/rasengan` (the core meta-framework — SSR/SSG/SPA, file-based routing, Vite plugin) is built on Express 4 and Vite's Environment API (peer `^6.3.0 || ^7.0.0`). Express is not a thin transport detail here: `renderToPipeableStream(...).pipe(res)` is called directly against the Express/Node `Response` object, and an Express↔Fetch adapter pair (`createRasenganRequest`/`sendRasenganResponse`) is hand-rolled to bridge into React Router's Web-API-based `createStaticHandler`. This makes the framework structurally Node-only.

This RFC proposes replacing Express with `@rasenganjs/futon` (zero-dependency, WinterCG-compatible) and `@rasenganjs/runtime` (Node/Bun/Workerd adapters), moving the render pipeline from `renderToPipeableStream` (Node streams) to `renderToReadableStream` (Web Streams), upgrading the Vite peer range to `^8.0.0` (Rolldown-backed — see Motivation), and bumping `react-router` to `^8.3.0`, whose now-baseline middleware/context API (`RouterContextProvider`) is what the middleware and loader/action context design below builds on directly instead of inventing a parallel mechanism. It also folds in five smaller, related surface-API additions that came out of the same investigation: a `middleware.ts`/`middleware.js` convention, a typed `context` parameter on loaders, a new `.action` API mirroring `.loader`, and a `static()` built-in for futon.

**Decision (2026-08-06, revising the original draft's release scope): Express is dropped everywhere in this repo, not just in `packages/framework/rasengan`.** `@rasenganjs/serve` (`packages/deploy/serve`) is rewritten onto `Futon` + `@rasenganjs/runtime`'s `NodeProdAdapter` as part of `v2.0.0-beta.1` itself, instead of keeping its existing Express app and bridging into it via `toExpressHandler`. This supersedes the original draft's "keep `@rasenganjs/serve` on Express for beta.1" compromise (see Release Scope) — see Phase 0 findings below for why the bridge approach was reconsidered and what it pulls into beta.1 scope as a result (the `static()` built-in, §9, and a new `app.fallback()` Futon primitive, §3).

**Explicitly out of scope:** React Server Components. This RFC lays groundwork RSC will need (Web-Streams rendering, Request/Response decoupled from Node, per-runtime Vite environments) but Flight serialization, `"use client"` boundary detection, and a `react-server` build condition are a separate, later RFC.

---

# Motivation

## Where Express is actually load-bearing

Audited exhaustively across `packages/framework/rasengan/src` (not `lib/`, compiled output).

| File                                | Coupling                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server/node/rendering.ts:18-63`    | `renderToStream(Component, res: Express.Response, options)` — calls `res.writeHead(...)` then **`pipe(res)`** on the result of `renderToPipeableStream`. `res` must be a Node `http.ServerResponse`. This is the actual multi-runtime blocker, not Express per se.                                                                                                                      |
| `entries/server/entry.server.tsx:3` | `RenderStreamFunction`'s second parameter is typed as `express.Response`, passed straight through to the function above.                                                                                                                                                                                                                                                                |
| `server/node/utils.ts:17-97`        | `createRasenganRequest`/`sendRasenganResponse` — hand-written Express↔Fetch-API adapter (reads `req.originalUrl`/`req.protocol`/`req.hostname`, streams `req` as a Node `Readable` for the body, writes headers via `res.append`, pipes the Web `Response` body back onto `res` as a `Writable`). Conceptually duplicates what `toExpressHandler` in futon already does, less robustly. |
| `server/node/utils.ts:128-176`      | `createFakeRasenganRequest` — a hand-rolled fake Express req/res (fake `EventEmitter`, fake `.get()`) built purely to satisfy the Express-typed rendering path during **static prerendering**, where no real HTTP server exists at all. Prerendering is already working around this coupling.                                                                                           |
| `server/dev/server.ts:214-257`      | `const app = express()`, `app.use(viteDevServer.middlewares)`, `app.use('*', ...)`, `app.listen(port, ...)` — the literal dev-server assembly.                                                                                                                                                                                                                                          |
| `src/server.ts:4-14`                | `rasengan/server` re-exports raw `express`/`compression` as part of its **public API**, for host apps (`@rasenganjs/serve`) to build their own Express app around `createRequestHandler`.                                                                                                                                                                                               |
| `core/middlewares/logger.ts`        | Custom Express-typed logger (`(req, res, next)`), logs the URL only — **it never logs a response status**, because it runs before `next()` completes.                                                                                                                                                                                                                                   |

No `express.static(...)` call exists anywhere in `src/` — static asset serving happens in `@rasenganjs/serve` (`packages/deploy/serve/cli.ts`), which today builds its own Express app (`express()`, `compression()`, `morgan()`, four `express.static(...)` mounts, `app.all('*', ...)` dispatching to `createRequestHandler`). Since Express is now dropped repo-wide (see Executive Summary), this file is in scope for the same rewrite, not just an unaffected consumer — see §9 and Migration Phases.

## Vite: what's actually relied on

`peerDependencies.vite: "^6.3.0 || ^7.0.0"`. The code depends specifically on Vite's **Environment API** (stabilizing across 6→7, not just incidental usage):

- `environments: { client, ssr, ssg }` and `builder.buildApp` in `core/config/vite/defaults.ts:6-130`.
- `createServerModuleRunner(viteDevServer.environments.ssr)` and the `vite/module-runner` subpath in `server/dev/server.ts:58` / `server/dev/handlers.tsx:22`.
- `vite build --app` (`scripts/build-command.js:9`).

No usage of `ssrLoadModule`, `transformIndexHtml`, or `resolveConfig` — those are already absent, so no migration burden there. Vite 8 is published (`8.0.0`–`8.2.1` at time of writing). **Verified (Phase 0 spike, 2026-08-06):** Environment API stability in 8.x holds — `environments`/`builder.buildApp` (via `rasengan build`) and `createServerModuleRunner`/`viteDevServer.environments.ssr`/`vite/module-runner` (via `rasengan dev`) both work unmodified against `vite@8.2.1`, exercised end-to-end in `apps/playground/file-based-routing` (client+ssr build succeeded; dev server served a fully SSR'd, hydrated document response with correct loader data). Two benign deprecation warnings surfaced (`esbuild`/`optimizeDeps.esbuildOptions` options from `@vitejs/plugin-react`'s `vite:react-babel` plugin are deprecated in favor of `oxc`/`optimizeDeps.rolldownOptions`) — non-blocking, but `@vitejs/plugin-react` may need a bump alongside the Vite 8 cutover in Phase 3 to clear them.

Separately, Vite 8 replaces Rollup with **Rolldown** (Rust-based) as its bundler — not just a version bump for the plugin surface `core/plugins/index.ts` depends on. `build.rollupOptions` is renamed to `build.rolldownOptions` (a compatibility shim keeps the old key working with a deprecation warning, but `core/config/vite/defaults.ts` should move to the new key directly rather than ride the shim — consistent with the hard-cut policy on the Vite peer bump, see Goals). The plugin hooks `rasengan()` actually uses — `config`, `resolveId`, `load`, `configResolved`, `writeBundle`, `closeBundle` — are all confirmed supported by Rolldown; none of the hooks Rolldown dropped (`shouldTransformCachedModule`, `resolveImportMeta`, `renderDynamicImport`, `resolveFileUrl`) are used anywhere in `core/plugins/index.ts`. **Verified (Phase 0 spike, 2026-08-06):** `this.environment.name` inside `closeBundle` (`core/plugins/index.ts:253-273`) resolves correctly under Rolldown — confirmed by running `rasengan build` against `vite@8.2.1` in `apps/playground/file-based-routing` and observing `dist/client/assets/config.json` written exactly once, from the `this.environment.name === 'client'` branch, with correct content (`ssr`, `prerender`, `redirects`). No plugin-hook regressions observed for client or ssr environments.

## No existing runtime abstraction

`server/runtime/detect-runtime.ts` detects **deployment platform** (`vercel`/`netlify`/`local`/`unknown`) via env vars — unrelated to JS runtime (Node/Bun/Workerd). There is no Node/Bun/Workerd abstraction anywhere in `src/` today; everything assumes Node (`fs`, `path`, `stream`, `os`, `execa`). This name will collide with `@rasenganjs/runtime`'s own exported `detectRuntime` once that becomes a direct dependency — needs a rename (proposed: `detectDeploymentPlatform()`).

## React Router 8

`react-router` should be bumped from the currently-pinned `^7.15.0` to `^8.3.0` (latest at time of writing) — also not just a version bump. v8 removes the `future.v8_middleware` flag and makes middleware/context **baseline**: every loader, action, and middleware function now receives a `RouterContextProvider` as its `context` argument, with typed `get(context)`/`set(context, value)` methods keyed by `createContext<T>()`-created context objects rather than strings. This directly supersedes the ad hoc `get`/`set`-shaped `TContext` originally sketched for §6-§8 of this RFC — those sections below reuse React Router's own primitive instead of inventing a parallel one.

---

# Goals

- Replace Express with `@rasenganjs/futon` as the HTTP layer, for both the dev server and the production request handler contract — **repo-wide, including `@rasenganjs/serve`**, not just `packages/framework/rasengan`. No `express`/`compression`/`morgan`/`@types/express` dependency survives anywhere in the migrated packages.
- Move the SSR streaming pipeline to Web Streams (`renderToReadableStream` + futon's `streamResponse()`), decoupling rendering from Node's `http.ServerResponse`.
- Support Node, Bun, and Workerd as production targets via `@rasenganjs/runtime`'s adapters, selected through a new `AppConfig.runtime` field.
- Upgrade the Vite peer range to `^8.0.0` (Rolldown-backed) and migrate `core/config/vite/defaults.ts` off `rollupOptions` onto `rolldownOptions` directly rather than the deprecated compat shim.
- Bump the `react-router` peer/dependency to `^8.3.0`, decoupled from the middleware/context work (§6-§8) — a plain major bump the rendering/routing/error-handling design does not otherwise depend on.
- Add a new Futon primitive, `app.fallback(handler)` (§3), distinct from `app.notFound(handler)` — a true catch-all with no status coercion, which is what rasengan's SSR dispatch actually needs (see §3 for why `notFound()` itself is unsuitable).
- Pull the `static()` built-in (§9) into `v2.0.0-beta.1` scope — `@rasenganjs/serve` needs it immediately once it drops `express.static(...)`, so it can't wait for a later milestone the way it could when `@rasenganjs/serve` was staying on Express.
- Long-term (not necessarily `v2.0.0-beta.1` — see Release Scope): a user-facing `middleware.ts`/`middleware.js` convention on React Router 8's own middleware primitive, a typed `context` parameter on loaders, and an `.action` API.

## Non-goals

- React Server Components (separate future RFC — see Executive Summary).
- A Node-free **dev** server. Vite's dev middleware (`viteDevServer.middlewares`) is Connect/Node-based as of Vite 6, 7, and 8 — this is an upstream constraint, not something this RFC can fix. Dev stays Node-only; only **production** SSR becomes multi-runtime.
- User-facing middleware (§6) and, by extension, loader/action `context` and the `.action` API (§7-§8), which only become meaningful once middleware exists — explicitly deferred past `v2.0.0-beta.1`, see Release Scope. §6 itself is also still an open design question (React Router 8 middleware vs. futon middleware — client-executable vs. server-only) not yet settled.

## Release Scope — `v2.0.0-beta.1`

This RFC's design covers more ground than one release should. `v2.0.0-beta.1` is scoped to the **core transport/rendering migration only** — the part that's a hard architectural dependency for everything else in this document, and that alone is already coherent, testable, and shippable:

**In scope for `v2.0.0-beta.1`:**

- §1 Rendering pipeline (`renderToReadableStream` + `streamResponse`).
- §2 HTTP layer (Express → Futon). Dev server: its own `http.createServer`, not `NodeDevAdapter`'s built-in listener — see Phase 2's architecture note for why (Vite's Connect-style dev middleware needs genuine Node req/res, which `NodeDevAdapter` has no hook to provide ahead of the Futon conversion). Only `@rasenganjs/runtime`'s low-level `incomingToRequest`/`writeNodeResponse` helpers are reused, not the adapter class itself.
- §3 Routing (`app.fallback(ssrHandler)` + `matchRoutes` structural-404 guard — **not** `app.notFound`, see §3 for why).
- §4 Error handling (`app.onError`).
- §5 Config surface additions needed to make §1-§4 work — `AppConfig.runtime` **typed and defaulted to `'node'`**, reserved-key runtime stripping. Bun/Workerd are not required to be _verified_ working in beta.1, only architecturally unblocked.
- §9 `static()` — pulled forward from the original draft's Phase 4, now required for beta.1 because `@rasenganjs/serve` needs it the moment it drops `express.static(...)`. Range-request support stays out of v1.
- Vite → `^8.0.0` / Rolldown migration, `react-router` → `^8.3.0` (as a plain version bump, independent of §6-§8).
- `@rasenganjs/serve`'s own rewrite onto `Futon` + `@rasenganjs/runtime`'s `NodeProdAdapter` — **moved into beta.1 scope** (originally deferred to Phase 4 behind a `toExpressHandler` bridge; see Phase 0 findings for why that compromise was dropped). `compression`/`morgan`/`express.static` are replaced by futon's `compress()`/`logger()` middlewares and the new `static()` built-in; the four `express.static(...)` mounts and the `app.all('*', ...)` dispatch in `packages/deploy/serve/cli.ts` are rewritten on `Futon` + `NodeProdAdapter.serve(app)`.

**Explicitly deferred past beta.1** (own milestone(s) later): §6 middleware, §7 loader `context`, §8 actions, verified Workerd production support (Bun support for `@rasenganjs/serve` landed early — see Phase 4a below — but Workerd is a separate package decision, not scoped here).

- Range-request support in `static()`.

**`@rasenganjs/vercel` (found 2026-08-06, Phase 2c) — decided: fast-follow, not beta.1 scope.** Its generated serverless-function template (`packages/deploy/vercel/index.ts`) also imports `express`/`compression` from `rasengan/server` and calls `createRequestHandler` the old Express way — broken by this same migration, same as `@rasenganjs/serve` was, but never audited in the original draft and not on any phase's list. Decision (2026-08-06): `v2.0.0-beta.1` ships with the Vercel adapter temporarily broken (Vercel deploys non-functional) rather than folding its rewrite into beta.1 scope; fixed in a fast-follow release once beta.1's own scope is done. Keeps beta.1 focused on `packages/framework/rasengan` + `@rasenganjs/serve`.

---

# Proposed Architecture

```
                          rasengan (build-time)
                                  │
                    Vite plugin (environments: client/ssr/ssg,
                    conditions/externals parameterized by
                    AppConfig.runtime)
                                  │
                                  ▼
                     compiled: entry.server.js, app.router.js,
                     middleware.js, main.js, template.js
                                  │
                          rasengan (runtime)
                                  │
                    Futon app  ──────────────────────────
                    ┌─────────────────────────────────┐
                    │ app.use(logger())               │
                    │ app.use(compress())             │
                    │ app.use(userMiddleware)         │  ← virtual:rasengan/middleware
                    │ app.use(matchRoutesGuard)       │  ← cheap structural 404
                    │ app.fallback(ssrHandler)        │  ← renders via React Router
                    │ app.onError(errorHandler)       │
                    └─────────────────────────────────┘
                                  │
                     RuntimeAdapter.serve(app)
                     ┌─────────┬─────────┬─────────┐
                     │  Node   │   Bun   │ Workerd │
                     └─────────┴─────────┴─────────┘
```

`ssrHandler` is a plain `(ctx: Context) => Promise<Response>` — no Express, no Node stream, at any point in this chain.

---

# Detailed Design

## 1. Rendering pipeline

`server/node/rendering.ts`'s `renderToStream` changes signature from `(Component, res: Express.Response, options)` to `(Component, options) => Promise<Response>`, internally using `renderToReadableStream` (from `react-dom/server.edge`, Web Streams, React 19) and futon's `streamResponse(stream, { status, headers })`. `entries/server/entry.server.tsx`'s `RenderStreamFunction` drops the Express `Response` parameter entirely and returns `Promise<Response>`.

`createRasenganRequest`/`sendRasenganResponse`/`createFakeRasenganRequest` (`server/node/utils.ts`) are deleted outright — `ctx.request` (already a Web `Request`) and futon's response helpers replace all three. Prerendering (`preRenderApp`) gets simpler as a side effect: it never needed an HTTP layer at all, and can now construct a `Request` directly instead of faking an Express req/res pair.

`react-dom/server.edge`'s `AbortController`-based cancellation replaces the current `ABORT_DELAY`/`abort()` timeout pattern (`setTimeout(() => controller.abort(), ABORT_DELAY)` passed as the `signal` option, in place of `setTimeout(abort, ABORT_DELAY)`).

**Verified (Phase 0 spike, 2026-08-06):** a standalone comparison of `renderToReadableStream` (react-dom 19.2.8, `react-dom/server.edge`) against the current `renderToPipeableStream` confirmed behavioral parity on all four axes this migration depends on:

- **Shell ready** — the returned `Promise<ReadableStream>` resolves once the shell is ready, mirroring `onShellReady`; the stream's remaining (suspended) content arrives as later chunks as each `Suspense` boundary resolves, same progressive-streaming shape as `pipe()`.
- **Shell error** — a synchronous throw outside any `Suspense` boundary rejects the returned promise, mirroring `onShellError` (`reject(error)` in the current code translates directly).
- **Streamed (post-shell) error** — an error thrown inside a `Suspense` boundary with no error boundary of its own fires `onError` without crashing the response; the boundary's fallback markup ships as final content, same as the pipeable path's `onError` gated behind `shellRendered`. One parity nuance: `stream.allReady` resolves (does not reject) even when a streamed error occurred — `allReady` isn't part of the current implementation's control flow, so this isn't a regression, just worth knowing before anyone reaches for `allReady` later (e.g. for crawler-targeted full-render mode).
- **Abort** — calling `controller.abort()` (in place of the pipeable `abort()` function) ends the stream with the in-flight fallback content intact and fires `onError` with an `AbortError` (`"This operation was aborted"`), directly comparable to the pipeable path's abort message (`"The render was aborted by the server without a reason."`) and identical end-state (fallback shipped, suspended content never resolved into the response).

This resolves the open question on `ABORT_DELAY` parity: `AbortController` + `setTimeout` is a drop-in behavioral replacement, no reimplementation needed beyond swapping the cancellation primitive.

## 2. HTTP layer

`src/server.ts` drops `export { express, compression }` entirely (no escape-hatch re-export — `toExpressHandler`/`toWinterCgHandler` remain available from `@rasenganjs/futon` directly for anyone who needs them, they just aren't re-exported through `rasengan/server`), and instead exports `Futon` and futon's built-in middlewares (`logger`, `compress`, `staticFiles`). `createRequestHandler({ build })` (`server/node/index.tsx`) changes from `(req: Express.Request, res: Express.Response) => Promise<void>` to `(ctx: Context) => Promise<Response>`.

`server/dev/server.ts`: `new express()` + `app.listen()` becomes `new Futon()` + `NodeDevAdapter` from `@rasenganjs/runtime/adapters/node`. Vite's Connect-style dev middleware is the one deliberately-Node-coupled seam that survives: a narrow bridge middleware wraps `viteDevServer.middlewares`, scoped to exactly that purpose (not spread through the render pipeline as it is today). Port-conflict retry (`EADDRINUSE`, the `inquirer` prompt) moves to wrap `adapter.serve()`/`close()`.

**`@rasenganjs/serve` (`packages/deploy/serve/cli.ts`), production, rewritten the same way — no `toExpressHandler` bridge:** `express()` + `compression()` + `morgan()` + four `express.static(...)` mounts + `app.all('*', ...)` becomes a `Futon` instance — `app.use(logger())`, `app.use(compress())`, `app.use('/assets', staticFiles({ root: ..., immutable: true, maxAge: 31536000 }))` (§9) for the client/SPA asset mounts, `app.fallback(...)` (§3) for the existing `app.all('*', ...)` handler (config.json read, redirect handling, `createRequestHandler` for SSR, `spa-fallback.html`/`index.html` read for SPA) — served via `new NodeProdAdapter({ port, host, rootDir: buildPath }).serve(app)` from `@rasenganjs/runtime/adapters/node`. `NodeProdAdapter` already implements exactly the `Assets` interface (`get`/`load`/`write`/`delete`/`list`, path-traversal-protected, filesystem-backed) that `static()` (§9) depends on — confirmed in the Phase 0 spike, no new adapter-side work needed for the Node target.

**Verified (Phase 0 spike, 2026-08-06):** `NodeProdAdapter`'s underlying `startNodeServer` (`packages/platform/runtime/src/adapters/node/server.ts`) streams `Response` bodies chunk-by-chunk with backpressure handling (`res.write()` return value checked, waits on the `drain` event before continuing) — this is a real Node HTTP server driven directly by `app.fetch(request)`, no Express in the loop, and its streaming path is more correct than futon's own `toExpressHandler` bridge (`sendWebResponse` in `packages/framework/futon/src/adapters/express.ts` pumps `res.write()` in a recursive loop without checking for backpressure). This is one more reason the direct `NodeProdAdapter` path is the right target for `@rasenganjs/serve`, not the Express bridge.

## 3. Routing

Two independent layers, not to be conflated:

- **Page routing** (`routing/utils/generate-routes.tsx`, React Router) — unchanged, zero HTTP-framework coupling today or after.
- **HTTP routing** (futon) — rasengan registers **no per-page routes** on futon's own `Router`. A single catch-all handler receives every request regardless of method, which sidesteps a real footgun in futon's router: a path that matches under a _different_ registered HTTP method short-circuits with `405` rather than falling through. Since React Router actions can arrive as `POST`/`PUT`/`PATCH`/`DELETE` against the same path a `GET` document request uses, registering per-page routes via `app.get(...)` would 405 form submissions. Mirroring the full page tree into a second matcher (futon's radix tree) was considered and rejected — two independent matching engines (futon's tree vs. React Router's own scoring) can disagree on edge cases (nested optional segments, splat priority), and a false 404 there is worse than what it fixes.
- **`app.fallback(ssrHandler)`, not `app.notFound(ssrHandler)`.** The original draft proposed reusing futon's existing `app.notFound(handler)` as this catch-all. **Phase 0 finding (2026-08-06): this is wrong and was caught before implementation started.** `app.notFound(handler)`'s finalHandler unconditionally forces any `200` response from the handler down to `404` — this is deliberate, documented behavior in `packages/framework/futon/src/app/index.ts`, covered by an explicit test (`src/__tests__/integration/application.test.ts`: _"enforces 404 status even if custom handler returns 200"_). It exists so `notFound()`'s literal, narrow use case — rendering a "page not found" body without the caller having to remember to set the status — works by default. `ssrHandler` is not that: most requests it handles render real pages that legitimately return `200`, and letting `notFound()`'s coercion anywhere near it would silently 404 every successful page load. **Decision: add a new, distinct Futon primitive, `app.fallback(handler: (ctx: Context) => Promise<Response>): this`** — a true catch-all invoked when no route matches, with no status coercion of any kind, living alongside `notFoundHandler` in `Futon`'s `finalHandler` (`app.fallback` takes priority if registered; `app.notFound` keeps its current, tested, coercing behavior for callers who still want it; if neither is registered, the existing default `text('Not Found', { status: 404 })` stands). This is a `@rasenganjs/futon` API change, not rasengan-specific — it ships as part of the beta.1 futon changes alongside `static()` (§9).
- **Cheap structural 404**: a single middleware ahead of `app.fallback` calls React Router's own `matchRoutes(staticRoutes, pathname)` — the same matcher `createStaticHandler` uses internally, so no drift is possible — and returns `notFound()` immediately, with no loader/render invoked, for URLs that don't correspond to any page pattern at all (bot scans, malformed paths). A page that _matches_ but whose content doesn't exist (e.g. a missing CMS slug) is a content-level decision only the loader can make (`throw new Response(..., { status: 404 })`) — already threaded through today via `context.statusCode` → `render(..., { statusCode })`; the migration must preserve that thread into `streamResponse`.

## 4. Error handling

`app.onError(async (error, ctx) => Response)` becomes the single explicit branch point (futon's default, unregistered behavior returns `text(error.message, { status: 500 })`, which **leaks the raw error message** — registering `onError` is mandatory, not optional, for production). Dev keeps today's behavior (`viteDevServer.ssrFixStacktrace(error)` + the existing custom `renderErrorPage`/`ErrorOverlay` React components, sent as a `Response` instead of via `res.send`); prod returns a generic sanitized 500.

`HttpError`/`NotFoundError` (futon) are a different, orthogonal mechanism from React Router's `throw new Response(...)`/`throw redirect(...)` convention used in loaders — the latter is already intercepted before it would ever reach futon's `onError` (`isRedirectResponse`/`handleRedirectRequest`). `onError` is the safety net for actual rendering bugs, not for normal loader-driven redirects/errors — no user-facing guidance to adopt `HttpError` in loaders.

## 5. Config surface (`rasengan.config.js`)

`AppConfig.vite` today is `Omit<Vite.UserConfig, 'plugins'|'environments'|'appType'|'resolve'|'cacheDir'|'envPrefix'|'builder'|'ssr'|'server'|'build'|'ssrEmitAssets'|'root'|'base'>` — reserved purely at the type level, not enforced at runtime. Two changes:

1. Add a runtime strip step in `define-config.ts` that deletes reserved keys from the merged config after the user-config spread, rather than trusting TypeScript alone.
2. Add `AppConfig.runtime?: 'node' | 'bun' | 'workerd'` (default `'node'`) as a first-class config key — **not** a `vite.*` passthrough, consistent with how `server.development.port/open` already work. `createDefaultViteConfig` parameterizes `resolve.conditions` and `build.rollupOptions.external` for the `ssr`/`ssg` environments from this field (externalize Node builtins only for `node`). The merge semantics between rasengan-computed externals and the existing user-facing `vite.build.external` passthrough are undefined today and must be decided explicitly (proposed: concatenate, don't override) — see Open Questions.

`detectRuntime()` (deployment-platform sniff) renames to `detectDeploymentPlatform()` to free the name for `@rasenganjs/runtime`'s own `detectRuntime`.

## 6. User-facing middleware

New convention-based file, `src/middleware.ts` **or** `src/middleware.js` (the discovery plugin probes both extensions rather than hardcoding `.ts` — Vite's own resolver already handles extensionless resolution, `middlewarePlugin()` just needs to let it fall through), discovered the same way `app.router.ts` is (a new Vite plugin, `middlewarePlugin()`, resolving `virtual:rasengan/middleware` — reexports the file if present, otherwise an identity passthrough so downstream code never branches on its absence).

```ts
// src/context.ts — shared context keys, imported by both middleware and pages
import { createContext } from 'react-router';

export const userContext = createContext<User | null>(null);
```

```ts
// src/middleware.ts
import { defineMiddleware, getCookie, redirect } from 'rasengan/server';
import { userContext } from './context';

export default defineMiddleware(async (ctx, next) => {
  const session = getCookie(ctx.request, 'session');
  if (!session) return redirect('/login');

  ctx.routerContext.set(userContext, await getUserFromSession(session));

  return next();
});
```

`ctx.routerContext` is a react-router 8 `RouterContextProvider` that rasengan — not futon — creates once per request, before the first middleware runs, and threads through the same `Context` object futon already passes around (an addition specific to rasengan's SSR pipeline, not a change to futon's generic `Context` type). This replaces the string-keyed `ctx.set`/`ctx.get` bridge originally sketched here: middleware sets **typed** values via react-router's own `createContext()`/`RouterContextProvider.set()`, and §7/§8 read the same object back in loaders/actions — no copy step, no parallel type system, full inference with zero extra generics at the call site. Futon's own `ctx.set`/`ctx.get` (string-keyed) stays available and is still the right tool for middleware-to-middleware-only concerns (request IDs, timing) that never need to reach a loader.

`defineMiddleware` is polymorphic — one function, normalized internally to a single composed handler so the pipeline-wiring code never branches on which input form was used:

```ts
declare function defineMiddleware(
  handler: RasenganMiddleware
): RasenganMiddleware;
declare function defineMiddleware(
  handlers: RasenganMiddleware[]
): RasenganMiddleware;

type RasenganMiddleware = (
  ctx: Context,
  next: NextFunction
) => Promise<Response>;
```

An array chains multiple middlewares in declaration order (onion model — first declared is outermost, runs first in, last out).

**v1 ships these two overloads only** — single function, and flat array (global, no per-entry scoping). A third overload, `MiddlewareEntry[]` (`{ matcher?, handler }` per entry, for per-path scoping), is a natural additive extension for v2 once there's real usage data — adding an overload later isn't a breaking change, so there's no need to stub it out now. The heavier alternative — middleware colocated per page/layout file, composed against the matched route tree (Remix-style) — stays out of scope entirely for this RFC; it requires running middleware _after_ React Router resolution, a materially different insertion point than everything else here.

Registered in the pipeline as `app.use(userMiddleware)`, ahead of the `matchRoutes` guard and `app.fallback(ssrHandler)` — note this means user middleware also runs for `.data` action requests on matched pages, not just document navigations; worth calling out in docs since it's easy to assume otherwise.

## 7. Loader signature — additive, typed `context`

Current: `LoaderFunction = (args: { params: Params; request: Request }) => Promise<LoaderResult> | LoaderResult`, attached as `Component.loader`.

Proposed:

```ts
import type { RouterContextProvider } from 'react-router';

type LoaderFunction = (args: {
  params: Params;
  request: Request;
  context: RouterContextProvider; // new — react-router 8's own typed context container
}) => Promise<LoaderResult> | LoaderResult;
```

```ts
import { userContext } from '../context';

Posts.loader = async ({ params, context }) => {
  const user = context.get(userContext); // typed as User | null, no manual generics
  // ...
};
```

No rasengan-invented context type: this is react-router 8's `RouterContextProvider`, the same instance `ctx.routerContext` in §6 refers to, forwarded unchanged into the static handler. The context primitive itself (`RouterContextProvider`/`createContext()`, baseline in v8, every loader/action receives one) is confirmed; the exact call to hand a pre-built instance into `createStaticHandler().query()`/`.queryRoute()` on the server side still needs a final check against `react-router@8.3.0`'s actual API surface (Open Questions).

Non-breaking: existing loaders that destructure only `{ params, request }` are unaffected. `generatePaths` (build-time SSG) intentionally does **not** gain a `context` parameter — there is no live request/middleware at build time.

## 8. Actions — new API surface

No `.action` exists today; `handleDataRequest` already dispatches `POST` through `handler.queryRoute(...)`, but nothing is exposed on `PageComponent`. Proposed, mirroring `.loader` exactly:

```ts
import type { RouterContextProvider } from 'react-router';

type ActionFunction = (args: {
  params: Params;
  request: Request;
  context: RouterContextProvider; // same instance as the loader's — see §7
}) => Promise<ActionResult> | ActionResult;

type ActionResult = {
  data?: Record<string, unknown>;
  redirect?: string;
  errors?: Record<string, unknown>;
};
```

```tsx
import { userContext } from '../context';

Posts.action = async ({ request, context }) => {
  const formData = await request.formData();
  const errors = validate(formData);
  if (errors) return { errors };
  await createPost(formData, context.get(userContext));
  return { redirect: '/posts' };
};
```

One `action` per page (branches internally on `request.method`/an intent field if multiple mutations are needed), matching React Router convention. No transport-layer change required — `app.fallback(ssrHandler)` already receives every method (§3). **Companion gap:** `Form` and `useActionData` are not currently re-exported from `src/index.ts` (only `useFetcher`/`useNavigation`/etc. are) — must ship alongside `.action`, otherwise there's no ergonomic way to trigger one.

## 9. New futon built-in: `static()`

**In scope for beta.1** (moved up from the original draft's Phase 4 — see Executive Summary and Release Scope: once `@rasenganjs/serve` drops Express as part of this same release, it loses `express.static(...)` and needs a replacement immediately, not on a later milestone).

**✅ Implemented (Phase 2b, 2026-08-06)** — `packages/framework/futon/src/middlewares/static.ts`. Matches the design below, plus one addition the original sketch didn't account for: a `prefix` option, needed because `Futon.use(path, middleware)` doesn't strip the mount path before invoking the middleware. See the Phase 2b entry in Migration Phases for the full list of implementation notes/deviations (path-traversal handling without `node:path`, `RuntimeContext.assets`/`configureAssets()`, the `public/` mount that couldn't go through it).

Futon has no `express.static()` equivalent today. Constraint: `@rasenganjs/futon` has zero runtime dependencies and never imports `node:fs` — this middleware cannot read the filesystem directly.

```ts
import { staticFiles } from '@rasenganjs/futon';

app.use(
  '/assets',
  staticFiles({
    root: './dist/client/assets',
    immutable: true,
    maxAge: 31536000,
  })
);
```

```ts
interface StaticOptions {
  root: string;
  index?: string | false; // default 'index.html'
  maxAge?: number; // seconds
  immutable?: boolean;
  etag?: boolean; // default true — If-None-Match → 304
  fallthrough?: boolean; // default true — miss → next(), not a terminal 404
}
```

Delegates all reads to `ctx.runtime.assets.get(...)` (the `Assets` interface already defined per-`RuntimeAdapter`: `NodeAssets`/`BunAssets` read the filesystem, `WorkerdProdAdapter`'s is a no-op stub). **Verified (Phase 0 spike, 2026-08-06):** `NodeProdAdapter` (`packages/platform/runtime/src/adapters/node/prod.ts`) already implements this exact shape today — `get`/`load`/`write`/`delete`/`list`, filesystem-backed, with `resolvePath()` rejecting path traversal outside `rootDir` before any read. The only missing piece is wiring `this.assets` into the per-request `ctx.runtime` (currently it's an adapter-instance property, not threaded into `RuntimeContext`) — a small, additive change, not new groundwork.

**Recommendation: populate `ctx.runtime.assets` in the same `app.configureServer({ preset, mode, port, host, rootDir })` call each adapter's `serve()` already makes** — not lazily on first access, and not at `RuntimeAdapter` construction time.

1. It's the one existing, documented injection point for everything an adapter contributes to `ctx.runtime` (`env`, `server`) — a second mechanism just for `assets` would be an inconsistent extra seam.
2. `Assets` is a static, process-lifetime object keyed off `rootDir`, which never changes per request — lazy construction buys nothing and just adds a null-check every call site would have to repeat.
3. Routing it through the one call every adapter (including `WorkerdProdAdapter`) already implements guarantees `ctx.runtime.assets` is _always_ present — `static()` can call `.get()` unconditionally and get an empty/no-op result back on Workerd, instead of needing a defensive `undefined` check.

This does require extending `RuntimeContext`/`ctx.runtime`'s documented shape (currently only `env`/`server`) to add `assets` — a small, additive change to `@rasenganjs/runtime`, not a redesign.

Design requirements: path resolution must reject traversal outside `root` before calling `assets.get()`; Content-Type via a small internal extension→MIME table (no external dependency); `fallthrough: true` by default so a miss under `/assets/*` doesn't shadow the SSR fallback for actual pages. On Workerd, since `assets` is currently a no-op, the middleware should log an explicit startup warning rather than silently 404 everything — static assets on that target need Workers KV/R2 or a native Cloudflare assets binding, out of scope here. Range requests are explicitly not supported in v1.

Lives in `packages/framework/futon` (a generic built-in, not rasengan-specific); `@rasenganjs/serve`'s production request-handler assembly is the consumer:

```ts
app.use(
  '/assets',
  staticFiles({
    root: buildOptions.assetPathDirectory,
    immutable: true,
    maxAge: 31536000,
  })
);
app.fallback(ssrHandler);
```

---

# Migration Phases

Phases 0-3 are the `v2.0.0-beta.1` release plan (see Release Scope). Phase 4 is post-beta.1 — listed here so the full picture stays in one document, not because it blocks the beta.

**Phase 0 — Spike / de-risking**

- ✅ **Done (2026-08-06).** Verify Vite 8.x stability of `environments`, `builder.buildApp`, `createServerModuleRunner`, `viteDevServer.environments.ssr`, `vite/module-runner` — and specifically, under Rolldown, that `this.environment.name` still resolves correctly inside `closeBundle` (`core/plugins/index.ts:253-273`). Verified against `vite@8.2.1` in `apps/playground/file-based-routing` (build + dev, see Motivation for details).
- ✅ **Done (2026-08-06).** Prototype `renderToReadableStream` in isolation (no HTTP-layer change yet) to validate Suspense/streaming/abort parity with `renderToPipeableStream`. Confirmed on all four axes (shell ready, shell error, streamed error, `AbortController`-based abort) — see Detailed Design → §1.
- ✅ **Done (2026-08-06), scope revised mid-spike.** Originally: confirm `toExpressHandler(app)` can host the new futon-based `createRequestHandler` inside `@rasenganjs/serve`'s existing Express app. **Superseded by an explicit decision to drop Express from `@rasenganjs/serve` too** (see Executive Summary) — the spike instead confirmed the no-Express path directly: `NodeProdAdapter` already implements the `Assets` interface §9 needs (get/load/write/delete/list, path-traversal-protected) and its `startNodeServer` streams `Response` bodies with proper backpressure, more correctly than the `toExpressHandler` bridge would have. It also **surfaced a real design bug before implementation started**: reusing `app.notFound(ssrHandler)` as proposed in the original §3 draft would have silently 404'd every successful (`200`) page render, because futon's `notFound()` deliberately coerces any `200` response to `404` (tested, intentional behavior for `notFound()`'s narrow literal use case). Resolved by adding a new `app.fallback(handler)` Futon primitive instead — see §3.

**Phase 1 — Transport-agnostic render core**

- ✅ **Done (2026-08-06), one correction to the original bullet.** `renderToStream` returns `Promise<Response>` (now built on `renderToReadableStream` + futon's `streamResponse`); `entry.server.tsx`'s `render()` returns `Promise<Response>` uniformly for both the streamed (`renderToStream`) and static (`renderToString` wrapped in futon's `html()`) paths — `preRenderApp` now reads the HTML back via `(await render(...)).text()`. `createFakeRasenganRequest` is deleted outright (`preRenderApp` never needed an HTTP layer — it now builds the `Request` directly, exactly as this RFC predicted).
  **Correction:** `createRasenganRequest`/`sendRasenganResponse` are **not** deleted yet, contrary to the original bullet — they're still load-bearing for `server/node/index.tsx` and `server/dev/handlers.tsx`, which still run on Express until Phase 2 lands `Futon`/`NodeDevAdapter`. Deleting them now would leave those two still-Express-based call sites with no way to build a `Request` from `req` or flush the new `Response` onto `res`. Both callers were updated instead to call `render(...)` (now `res`-free) and then explicitly `sendRasenganResponse(res, response)` — moving the Express-bridging responsibility up one layer, out of the render core, without deleting the bridge itself early. Actual deletion of both functions moves to Phase 2, once Express is genuinely gone from these call sites.
  **Verified:** `tsc --noEmit` and the full package build pass cleanly. End-to-end tested in `apps/playground/file-based-routing`: dev-mode SSR (`rasengan dev`) renders full, correctly hydrated pages — byte-identical structure to the pre-Phase-1 baseline. Production SSR (`rasengan-serve` → `createRequestHandler`) was also compared byte-for-byte against a pre-Phase-1 baseline build (via `git stash`) and produces **identical output**, including an **identical pre-existing bug**: production-mode responses render an empty `<div id="root">` (just the hydration-data `<script>`, no actual app markup) — confirmed present before this RFC's changes too, so it's unrelated to this migration and out of scope for Phase 1. Worth a separate investigation later (likely in `entry.server.tsx`'s `buildOptions`-truthy `App`/`Template` loading path, or how `asChild`/`AppContent` resolve in the production `TemplateLayout` render) — not filed as part of this RFC.

**Phase 2 — Express → Futon (`packages/framework/rasengan`)**

- ✅ **Done (2026-08-06).** `src/server.ts` no longer exports `express`/`compression` — exports `Futon`/`logger`/`compress` from `@rasenganjs/futon` instead (`toExpressHandler`/`toWinterCgHandler` intentionally not re-exported, see §2). Deleted `core/middlewares/` (superseded by futon's `logger()`, which also fixes the pre-existing "never logs a response status" bug flagged in Motivation). `createRequestHandler` (`server/node/index.tsx`) is now `(ctx: Context) => Promise<Response>`, with its own top-level try/catch → sanitized 500 (independent of any futon `app.onError`, since it may be called standalone). `server/dev/server.ts` rebuilt: a `Futon` instance owns the SSR pipeline (`app.use(logger())`, `app.fallback(ssrHandler)`, `app.onError(...)`), served by rasengan's own `http.createServer` rather than `NodeDevAdapter`'s built-in listener — see the architecture note below for why. Port-retry (`EADDRINUSE`/inquirer) logic ported onto the raw `http.Server`'s `'error'` event, unchanged in behavior. `createRasenganRequest`/`sendRasenganResponse`/`createRasenganHeaders` (deferred from Phase 1) and the now-fully-dead `server/node/stream.ts` are deleted.
  **Architecture note, resolving an open question from Phase 0 planning:** Vite's dev middleware (`viteDevServer.middlewares`) is Connect-style and needs genuine Node `req`/`res` — it can't run as a Futon middleware (Futon only exposes Web API `Request`/`Response` via `ctx`), and `NodeDevAdapter`'s built-in `startNodeServer` has no hook to give Vite's middleware first crack at a request before the Futon conversion. Resolved (user-directed) by **not** routing the dev server through `NodeDevAdapter.serve()` at all: `server/dev/server.ts` owns its own `http.createServer`, hands every request to `viteDevServer.middlewares(req, res, ...)` first with unmodified real req/res (zero fidelity risk for HMR/asset/source-map handling), and only requests Vite's middleware doesn't handle (`next()` with nothing written) are converted to a Web `Request` and passed to `futonApp.fetch()`. The Futon-facing half of that bridge reuses `@rasenganjs/runtime`'s own Node conversion logic rather than reimplementing it: `incomingToRequest` (already existed, now additionally exported from `@rasenganjs/runtime/adapters/node`) and a newly extracted `writeNodeResponse` (pulled out of `startNodeServer`'s inline body, now shared by both `startNodeServer` and this dev server — pure extraction, no behavior change, confirmed by `@rasenganjs/runtime`'s test suite staying green). `NodeDevAdapter` itself ends up unused in dev — only these two low-level Node↔Web conversion helpers are.
  **§3 implementation note:** the `matchRoutes` structural-404 guard is folded directly into `ssrHandler`, right after `staticRoutes` is computed and before `preloadMatches`/`handler.query()` — not a fully separate Futon middleware ahead of `app.fallback()` as originally sketched. A truly separate middleware would need its own `AppRouter`/`staticRoutes` load (dev mode reloads them per-request through Vite's SSR module runner for HMR correctness), doubling that cost and risking the two loads disagreeing across an HMR invalidation between them. Same net effect (no loader/render invoked for a structurally unmatched path), one route-loading pass instead of two.
  **Production gap closed (2026-08-06):** the dev-mode guard above had no production equivalent — `createRequestHandler` (`server/node/index.tsx`) called `handler.query(request)` unconditionally, with no structural-404 check at all. Added `createMatchRoutesGuard({ build })` (`server/node/match-routes-guard.ts`, exported from `rasengan/server`) as a **real, standalone futon `Middleware`** this time — production's `AppRouter` load is a plain Node `import()` of the compiled `app.router.js` (not Vite's SSR module runner), so there's no HMR-correctness reason to fold it into the handler the way dev's version is. `@rasenganjs/serve`'s `cli.ts` composes it directly around `createRequestHandler` in the SSR branch of `app.fallback(...)`: `matchRoutesGuard(ctx, () => requestHandler(ctx))` — deliberately **not** registered as a blanket `app.use(...)` ahead of the fallback, since SPA mode's fallback branch (the `else` alongside `config.ssr`) intentionally serves the same shell for every path regardless of route-tree membership, letting the client router take over; a blanket guard would incorrectly 404 valid client-side routes there.
  **Verified:** `tsc --noEmit` and full build clean (required bumping `packages/framework/rasengan/tsconfig.json`'s `moduleResolution` from `"Node"` to `"bundler"` — the legacy setting can't resolve `@rasenganjs/runtime`'s conditional `exports` map at all; `bundler` is already used successfully by the sibling `@rasenganjs/server` package). End-to-end in `apps/playground/file-based-routing` dev mode: document SSR (full hydrated content, byte-identical to pre-Phase-2 baseline), Vite asset passthrough (`/@vite/client`), `.data`/`Accept: application/json` requests, dynamic-param routes, MDX pages, and pages with loaders all verified working via `curl`. `logger()`'s output now correctly shows status + duration per request (confirms the Motivation-table bug fix). The `matchRoutes` guard's "no match at all" branch wasn't independently exercisable in this playground (its `[locale]` + catch-all `*` route structure matches virtually every path), but the guard calls React Router's own `matchRoutes` directly, so its correctness rests on that well-tested function, not on new logic.
  **Known gap surfaced by this phase, not yet resolved:** `createRequestHandler`'s new `(ctx) => Promise<Response>` signature breaks every downstream consumer still calling it the old Express way — confirmed live (see Phase 2b/2c below).

**Phase 2b — Express → Futon (`@rasenganjs/serve`)**

- ✅ **Done (2026-08-06).** Was confirmed broken immediately after Phase 2 (`requestHandler(req, res)` called Express-style, hanging every request since `createRequestHandler` now returns a `Response` nothing ever wrote to `res`) — now fixed.
- **§9 `static()` landed in `@rasenganjs/futon`** as `staticFiles(options: StaticOptions)` (`packages/framework/futon/src/middlewares/static.ts`). Reads exclusively through `ctx.runtime.assets` (no `node:fs`, portable to Workerd). Design deviations from the original sketch, both additive:
  - Added a `prefix` option (not in the original `StaticOptions` listing) — required to make the RFC's own `app.use('/assets', staticFiles({ root }))` example actually work: `Futon.use(path, middleware)` doesn't strip the mount path before calling the middleware, so `staticFiles` needs to know its own prefix to compute the file path relative to `root` and to decide when to fall through untouched (independent of the `fallthrough` option, which only governs in-prefix misses).
  - `ctx.runtime.assets` itself needed a place to live: added `Assets`/`RuntimeContext.assets` to `@rasenganjs/futon` (a local, structurally-matching interface — futon has zero dependencies and can't import `@rasenganjs/runtime`'s `Assets` type, since the dependency runs the other way) and a `Futon.configureAssets(assets)` method mirroring `configureServer()`/`loadEnv()`. All 5 `@rasenganjs/runtime` adapters (Node/Bun dev+prod, Workerd prod) now call `app.configureAssets(this.assets)` alongside their existing `app.configureServer({...})` call — not literally _inside_ the same call as the original text suggested (`ServerInfo` and `Assets` are different concerns), but at the same one-time setup moment.
  - Path traversal: resolved by hand (no `node:path`, must run on Workerd) — decode the pathname, reject any `..` segment that would climb above `root` before ever calling `assets.get()`. Verified against both a literal `..` (which the `URL` parser normalizes away before the middleware even sees it — not a useful test) and an encoded-slash `..%2F` variant (single opaque segment through URL parsing, decoded and split by the middleware itself, correctly rejected).
  - Content-Type via a small internal extension→MIME table, ETag (weak, content-hash-derived) with `If-None-Match` → 304, `Cache-Control` from `maxAge`/`immutable`, `fallthrough: true` default. Range requests: not implemented, per the RFC's own v1 scope.
  - 9 unit tests added (`__tests__/unit/middlewares/static.test.ts`); full futon suite green (345/345).
- **`packages/deploy/serve/cli.ts` rewritten**: `express()`/`compression()`/`morgan()`/`express.static(...)`×4/`app.all('*', ...)` → `Futon` + `logger()` + `compress()` + four `staticFiles(...)` mounts (mirroring the original four `express.static` mounts' roots/prefixes exactly) + `app.fallback(...)` for the SSR/SPA/redirect dispatch, served via `new NodeProdAdapter({ port, host, rootDir: buildPath }).serve(app)`. One mount — `public/` — could **not** go through `ctx.runtime.assets`: the original `express.static('public', ...)` resolves relative to `process.cwd()`, not `buildOptions.buildDirectory` (`NodeProdAdapter`'s `rootDir`), and Futon has exactly one shared `assets` provider per app. Kept as a small dedicated `node:fs`-based middleware (`publicFiles()`) instead of overengineering a multi-root asset abstraction — `packages/deploy/serve` is a Node-only CLI, not something that needs to run on Workerd, so this doesn't compromise portability of anything that actually needs it.
- `express`/`compression`/`morgan`/`@types/express`/`@types/compression`/`@types/morgan` removed from `packages/deploy/serve/package.json`; `@rasenganjs/futon`/`@rasenganjs/runtime` added.
- **Verified:** `tsc --noEmit` clean, `tsup` build clean. End-to-end in `apps/playground/file-based-routing`: `pnpm run build && pnpm run serve`, then live `curl` against the served port confirmed — document SSR (200, same known pre-existing empty-`#root` content bug as before, unrelated to this phase), static assets (200, correct `Cache-Control: public, max-age=31536000, immutable` and `ETag`), a conditional request with a matching `If-None-Match` (304), `public/` file serving (200), a missing asset correctly falling through to the SSR handler (200, not a raw 404), a `.data`/`Accept: application/json` request (200), and response compression (`Content-Encoding: gzip` on the SSR document). `logger()` correctly showed status + duration for every request.

**Phase 2c — Express → Futon (`@rasenganjs/vercel`) — post-beta.1 fast-follow, not in beta.1 scope**

- **Found during Phase 2 verification (2026-08-06):** `packages/deploy/vercel/index.ts`'s `generateServerlessHandler()` emits a **string template** of serverless-function source that itself does `import { createRequestHandler, resolveBuildOptions, express, compression } from 'rasengan/server'` and builds an Express app around `createRequestHandler(req, res)` — the exact same two problems as `@rasenganjs/serve` (Express import that no longer exists, Express-style handler call), just inside generated code rather than hand-written code. The original RFC scoped only `packages/framework/rasengan` and `@rasenganjs/serve` for the Express-removal work (Executive Summary, Release Scope) — `@rasenganjs/vercel` wasn't audited and isn't currently in any phase.
- **Decided (2026-08-06): fast-follow after beta.1, not folded into beta.1 scope** — see Release Scope. `v2.0.0-beta.1` ships with Vercel deploys non-functional; fixed in a follow-up release. When it is picked up, needs the same treatment as Phase 2b once Futon's serverless-friendly serving story is worked out (the generated code runs as a Vercel Node serverless function, not a long-lived server — closer to `NodeProdAdapter`'s one-shot `fetch`-per-invocation model than `NodeDevAdapter`'s, but this hasn't been designed yet).

**Phase 3 — Config, dependency bumps, beta.1 cutover**

- ✅ **Done (2026-08-06):** `express`/`compression`/`@types/express`/`@types/compression` removal from both `packages/framework/rasengan/package.json` and `packages/deploy/serve/package.json` — already landed in Phase 2/2b, nothing left to do here.
- ✅ **Done (2026-08-06):** `apps/examples/*` and playgrounds audited for stray `express`/`compression` imports from `rasengan/server` — none found (only unrelated prose/blog content matched the grep).
- ✅ **Done (2026-08-06): `AppConfig.runtime` field.** Added `runtime?: 'node' | 'bun' | 'workerd'` (default `'node'`) to `AppConfig` (`core/config/type.ts`). `createDefaultViteConfig` (`core/config/vite/defaults.ts`) now parameterizes the `ssr`/`ssg` environments' `resolve.conditions` (`bun`→`['bun']`, `workerd`→`['workerd','edge-light','worker']`, `node`→unset) and their `rolldownOptions.external` (Node builtins, via `node:module`'s `builtinModules`, only when `runtime === 'node'`) from this field — concatenated with user-provided externals, not overriding them (resolves the RFC's own Open Question on merge semantics). Deliberately **not** applied to the top-level `build`/client environment, which must never externalize `node:fs` et al. for a browser bundle.
- ✅ **Done: reserved-key runtime stripping.** `define-config.ts` now deletes `environments`/`cacheDir`/`envPrefix`/`builder`/`ssr`/`server`/`ssrEmitAssets`/`root`/`base` from the user's `vite` config object at runtime (`stripReservedViteKeys`), not just relying on `ViteConfig`'s `Omit<...>` at the type level — a `rasengan.config.js` bypassing TypeScript (plain JS, `// @ts-ignore`, ...) can no longer clobber rasengan's own Vite setup with one of these keys.
- ✅ **Done: `detectDeploymentPlatform()` rename**, freeing `detectRuntime` for `@rasenganjs/runtime`'s own export (confirmed a real, live naming collision — `@rasenganjs/runtime` already exports its own `detectRuntime`). Renamed in `server/runtime/detect-runtime.ts`, `src/server.ts`'s export, and the one call site in `core/plugins/index.ts` (which also renamed its local `runtime` variable to `platform` for clarity, matching the "deployment platform, not JS runtime" distinction the rename exists to make).
- ✅ **Done: Vite peer bump + Rolldown migration.** `peerDependencies.vite` hard-cut to `^8.0.0`. `core/config/vite/defaults.ts` migrated all four `rollupOptions` keys (top-level `build` + `client`/`ssr`/`ssg` environments) to `rolldownOptions`. Added `vite: ^8.2.1` as an explicit **devDependency** on `packages/framework/rasengan` itself — without it, `rasengan`'s own `tsc` resolved a stale `vite@7.3.6` hoisted from elsewhere in the workspace (no other package pinned exactly what rasengan's build needed) and failed to type-check `rolldownOptions` as a result.
  - **`@vitejs/plugin-react` bumped `^5.0.0` → `^6.0.0`** (Rolldown-native rewrite; peer-requires `vite: ^8.0.0`), which cleared the two benign deprecation warnings Phase 0 first flagged, plus a further Rolldown "Invalid input options — jsx" warning that surfaced once `rollupOptions`→`rolldownOptions` landed (both traced to the _old_ plugin-react version, not to rasengan's own code). This required updating a **workspace-wide** pin — `pnpm-workspace.yaml`'s `overrides['@vitejs/plugin-react']` and the root `package.json`'s `resolutions['@vitejs/plugin-react']`, both previously `^4.2.1` — since neither pnpm mechanism supports a per-package override, and `apps/examples/shadcn-js`, `apps/examples/shadcn-ts`, and `apps/playground/chidori-docs` (all still on `vite@^7.x`, all out of RFC-0007's scope) transitively depend on `rasengan`'s `@vitejs/plugin-react`. **Decided (2026-08-06, user-directed): bump the workspace override now** rather than leave the warnings — these three apps are now confirmed broken (`@vitejs/plugin-react@6.0.5` peer-requires `vite@^8.0.0`, they only have `7.3.6`) until they're migrated to Vite 8 separately, which is not part of this RFC.
  - **Verified:** `tsc --noEmit` and full build clean for `rasengan`. End-to-end in `apps/playground/file-based-routing`: `rasengan build` and `rasengan dev` both produce **zero warnings** (previously two-plus deprecation warnings per run) and correct SSR output (200, byte-identical structure to prior phases). Full futon (345/345) and runtime (98 passed|36 skipped, baseline) suites green.
- ✅ **Done (2026-08-06):** `react-router` bumped from `^7.15.0` to `^8.3.0`. See Phase 3b below for the spike and the one real fix it required.
- **Cut `2.0.0-beta.1`:** left for explicit user action — a release/publish/tag step, not something to do as part of implementation work.

**Phase 3b — react-router 7→8 spike (added 2026-08-06, not in the original phase list)**

React Router 8 is a major version bump the RFC's Motivation section flagged as "not just a version bump" but that Phase 0's spikes never actually exercised — Phase 0 covered Vite 8/Rolldown and the rendering pipeline, not react-router.

**✅ Done (2026-08-06).** Bumped `react-router` in `packages/framework/rasengan/package.json` to `^8.3.0` and ran the same rigor Phase 0 applied to Vite 8: `tsc --noEmit`, full build, then live `curl` against both `rasengan dev` and `rasengan build && rasengan serve` in `apps/playground/file-based-routing` — document SSR (home, a dynamic-param route, an MDX page, a page with a loader, the signin page, a wildcard/not-found route), `.data`/JSON requests, and production asset serving, all 200 with correct content and correctly-embedded `window.__staticRouterHydrationData`.

**One real, load-bearing break found and fixed:** `routing/providers/metadata.tsx`'s `MetadataProvider` read `route.loaderData ?? route.data` off `useMatches()`'s results — `route.data` was already flagged in the code's own comment as "deprecated... but in some cases route.loaderData is undefined and I don't know why, that's why we are using route.data instead". React Router 8's `UIMatch` type **removes `.data` entirely** (confirmed against the installed package's own `.d.ts`, not just inferred from the type error) — not deprecated-but-present, gone. Fixed by reading `route.loaderData` only; the existing downstream `.filter(Boolean)` (already there to drop `undefined` entries) absorbs the same "loader had no data" case the `.data` fallback was originally reaching for. The original fallback's root cause was never diagnosed (per the removed comment) and this fix doesn't resurrect it — flagged here rather than silently assumed safe, since it's the one place this bump changed actual runtime behavior, not just types.

**Also bumped:** `peerDependencies.react`/`react-dom` from `^19.2.0` to `^19.2.7`, matching `react-router@8.3.0`'s own actual peer requirement (`>=19.2.7`) — the old `^19.2.0` range would have let an incompatible React 19.2.0–19.2.6 install satisfy rasengan's own peer check while still failing react-router's.

No other API usage in rasengan's SSR/routing pipeline (`createStaticHandler`, `createStaticRouter`, `StaticRouterProvider`, `matchRoutes`, `preloadMatches`, `redirect`, `useFetcher`/`useNavigation`/etc.) needed changes — everything else type-checked and ran unmodified against v8.3.0. The RFC's Open Question about the exact `RouterContextProvider`/static-handler wiring for a pre-built context remains open but doesn't block this bump — that's specifically §6-§8 (middleware/context) territory, explicitly deferred past beta.1.

**Phase 4a — `@rasenganjs/serve` Bun support (added 2026-08-06, ahead of the rest of Phase 4)**

**✅ Done.** `@rasenganjs/serve` now picks its `@rasenganjs/runtime` production adapter (`NodeProdAdapter` vs `BunProdAdapter`) from `AppConfig.runtime` (§5) instead of being hard-coded to Node — the mechanism the user chose over auto-detecting the invoking process (`typeof Bun`/`typeof Deno`): the target runtime is a build-time decision baked into `config.json`, not something to infer from whatever binary happens to invoke `rasengan-serve`.

- `AppConfig.runtime` is now threaded all the way to `config.json` — `OptimizedAppConfig` gained a `runtime` field (previously computed but never persisted, since nothing downstream needed it yet), written by `core/plugins/index.ts`'s `closeBundle` hook alongside `ssr`/`prerender`/`redirects`.
- `packages/deploy/serve/cli.ts` reads `config.json` **once at startup** now (previously read fresh on every request inside `app.fallback(...)` — that per-request re-read/re-parse was redundant once the value is needed at startup anyway, so the fallback handler was simplified to reuse the same parsed `config`). The adapter is chosen via a new `createProdAdapter(runtime, options)` helper that dynamically `import()`s either `@rasenganjs/runtime/adapters/node` or `.../adapters/bun` — dynamic, not a static top-level import of both, so a Node deployment never pulls in Bun-specific module code and vice versa.
- **Verified end-to-end**, both directions, in `apps/playground/file-based-routing`: default (`runtime` unset → `'node'`) build + `pnpm run serve` unchanged (200s across document/asset/data requests, no regression). Then `runtime: 'bun'` set, rebuilt, and run directly via `bun packages/deploy/serve/bin.js ./dist` (pnpm's `.bin/rasengan-serve` shell shim isn't parseable by `bun <file>` — it treats the argument as a JS/TS entry point, not a shell script to exec; Bun users need to invoke the real `bin.js` directly, or pnpm's shim needs a Bun-aware wrapper later, out of scope here) — document SSR, static assets (`staticFiles()`, unmodified), the CWD-rooted `public/` mount, `.data` JSON requests, and gzip compression (`compress()`, unmodified) all verified working, all through the exact same `Futon` app and middleware stack as Node, only the adapter class differing.
- **Deno**: intentionally not touched. `@rasenganjs/runtime` has no Deno adapter yet (`packages/platform/runtime/src/adapters/` currently only has `node`, `bun`, `workerd`) — that's its own prerequisite, not a `@rasenganjs/serve` gap. `createProdAdapter`'s `if (runtime === 'bun') { ... } else { NodeProdAdapter }` shape is intentionally a plain if/else, not a switch with a `'node'` fallthrough case — adding Deno later is a one-branch addition once `@rasenganjs/runtime` has the adapter to import, not a restructure.
- **Workerd**: deliberately out of scope for `@rasenganjs/serve` — see the "Recommendation" note in Executive Summary/Motivation discussion above. `@rasenganjs/serve` is architecturally a long-running CLI server process (parses argv, binds a port, reads `process.env`); Workerd has no equivalent (no port, often no filesystem, `export default { fetch }` packaged via `wrangler`, not an npm-installed binary you run). Recommendation given to the user: Workerd support belongs in its own package (`@rasenganjs/workerd` or similar), architecturally closer to `@rasenganjs/vercel` (a build-time adapter generating the right entry-point shape) than to `@rasenganjs/serve`. Not started, no decision finalized — flagged here as the recommendation made, not as something committed to.

**Phase 4 — Post-beta.1 (own milestone, not scoped/ordered yet)**

- §6 middleware (design still open — React Router 8 native middleware vs. futon, see the middleware design discussion), §7 loader `context`, §8 actions + `Form`/`useActionData` re-exports, a Deno adapter for `@rasenganjs/runtime` (prerequisite for Deno support in `@rasenganjs/serve`), a decision + implementation for Workerd (own package vs. folded in — see Phase 4a), range-request support in `static()`.

## Validation

`apps/playground/rasengan-runtime-node-demo`, `rasengan-runtime-bun-demo`, `rasengan-runtime-demo` (Deno), and `rasengan-server-workerd` already exist and should be extended/reused as the per-target validation harness rather than building new ones.

---

# Open Questions

- Exact static-handler call signature for handing react-router 8.3.0 a pre-built `RouterContextProvider` (`createStaticHandler().query(request, { requestContext })`, or whatever the v8-equivalent option is named) — the context primitive itself is confirmed, the precise server-side wiring call isn't yet. Blocks Phase 0 sign-off on §6-§8.
- Merge semantics between rasengan-computed `build.rolldownOptions.external` (per `AppConfig.runtime`) and the existing user-facing `vite.build.external`/`rolldownOptions` passthrough — concatenate vs. override, needs an explicit decision before Phase 3.
- Per-entry `matcher` richness and colocated per-layout middleware (§6) — deferred to v2 pending real usage patterns.

# Resolved since first draft

- **Typed `context`** — no longer needs a rasengan-invented mechanism (module augmentation, `declare module` interfaces). React Router 8's baseline `RouterContextProvider`/`createContext()` (see Motivation → React Router 8) is reused directly across middleware (§6), loaders (§7), and actions (§8) — full type inference, no generics at call sites, no declaration merging.
- **Moment to populate `ctx.runtime.assets`** — resolved in favor of `app.configureServer(...)`, the same one-time call every `RuntimeAdapter` already uses to populate `ctx.runtime.env`/`ctx.runtime.server` (§9).
- **Vite 8 Environment API stability, incl. `this.environment.name` under Rolldown** — confirmed working via Phase 0 spike (2026-08-06) against `vite@8.2.1`; see Motivation → "Vite: what's actually relied on" for details. No longer blocks Phase 0 sign-off on the Vite bump itself (§6-§8's static-handler question below is unrelated and still open).
- **`renderToReadableStream`/`AbortController` parity with `renderToPipeableStream`/`ABORT_DELAY`** — confirmed via Phase 0 spike (2026-08-06), isolated from the HTTP layer; see Detailed Design → §1 Rendering pipeline for the four verified behaviors (shell ready, shell error, streamed error, abort).
- **Whether `@rasenganjs/serve` stays on Express for beta.1** — resolved 2026-08-06: no, it's rewritten onto `Futon` + `NodeProdAdapter` as part of beta.1 itself. See Executive Summary, Release Scope, and §2/§9 for the full rewrite plan.
- **Whether `app.notFound(ssrHandler)` is the right catch-all primitive for §3** — resolved 2026-08-06: no, it silently coerces every `200` response to `404` (deliberate, tested futon behavior for `notFound()`'s narrow use case). A new `app.fallback(handler)` Futon primitive is added instead, with no status coercion. See §3 and the Phase 0 entry in Migration Phases.
