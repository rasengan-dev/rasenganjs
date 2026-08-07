# RFC 0008 — File-based API Routes (`_api`)

**Status:** Draft  
**Author:** Rasengan.js Core Team  
**Date:** 2026-08-07

## Executive Summary

Today, a Rasengan app has no dedicated convention for server-only HTTP endpoints (JSON APIs, webhooks, form actions that aren't a full page navigation). The only escape hatches are hand-rolling something inside `rasengan.config.js`'s Vite plugins, or overloading a page's `loader` — neither is a real API surface, and neither is discoverable the way `_routes` file-based pages are.

This RFC proposes `_api`, a file-based convention mirroring `_routes` exactly in its segment rules (`[param]`, `[_param]`, `(group)`, `_optional`), but resolving to a `@rasenganjs/futon` `Router` instead of a React Router page tree — API routes are pure server code, with no React/SSR machinery involved at all. Each `*.route.ts` file exports one function per HTTP method it handles (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`), with the exact `(ctx: Context) => Promise<Response>` signature Futon already uses everywhere else in the framework.

This RFC builds directly on RFC-0007: it only exists because `rasengan` now runs on Futon end-to-end (dev server, production `createRequestHandler`, `@rasenganjs/serve`, the generated Vercel function). API routes are not a new HTTP engine — they're a file-based entry point into the `Router` primitive Futon already ships.

**Groundwork already landed (2026-08-07, ahead of this RFC):** `rasengan/server` now re-exports the full `@rasenganjs/futon` public API (all middleware, `Router`, response helpers, error classes, types), explicitly excluding `toExpressHandler`/`toWinterCgHandler` (kept `@rasenganjs/futon`-only per RFC-0007 §2). App code — including `_api` handlers — imports Futon primitives from `rasengan/server`, never `@rasenganjs/futon` directly. Since ESM has no `export * except X`, this is a manually maintained mirror of futon's own `src/index.ts`, minus those two names.

---

# Motivation

## `_routes` sets the convention-over-configuration bar; there's nothing equivalent for APIs

`flatRoutes()` (`routing/utils/flat-routes.tsx`) already solves "turn a folder of files into a route tree" well: dynamic/optional segments, route groups, layouts, all derived purely from file paths via `import.meta.glob`. There is no reason server-only endpoints should need a different mental model — the segment-normalization logic (`normalizeSegment()`) is directly reusable as-is.

## Rasengan is already a Futon app; API routes should be "just Futon"

Because of RFC-0007, every server surface in this repo (`server/dev/server.ts`, `createRequestHandler`, `@rasenganjs/serve`, the generated Vercel handler) is a `Futon` instance composing middleware. Futon's own `Router` (`packages/framework/futon/src/router/index.ts`) already has everything an API route needs: 7 HTTP-method shortcuts, `:param` dynamic segments, route-level middleware, scoped `.group()`, and O(k) radix-tree dispatch. `_api` doesn't need to invent request/response handling, param parsing, or middleware composition — it needs to invent a **file-to-`Router`-registration** layer, nothing else.

## Prior art in this repo: `app.router.ts`'s wrapper file is more friction than necessary

The existing file-based page convention still requires a hand-authored `src/app/app.router.ts`:

```ts
import Router from 'virtual:rasengan/router';
export default Router;
```

This is boilerplate with no decision in it — the plugin already knows `_routes/` exists and already generates the virtual module; the wrapper file exists only because nothing auto-registers it as a build entry. `_api` has no equivalent backward-compatibility constraint, so this RFC proposes doing it right the first time: **zero wrapper file**. The plugin detects `src/app/_api/` directly and wires the build entry itself.

---

# Goals

- A `_api/` file-based convention, segment rules identical to `_routes/` (`[param]`, `[_param]`, `(group)`, `_optional`).
- `*.route.ts` files exporting named HTTP-method handlers (`GET`/`POST`/`PUT`/`PATCH`/`DELETE`/`HEAD`/`OPTIONS`), signature `(ctx: Context) => Promise<Response>`.
- `middleware.ts` per folder, scoped to that folder's routes and its descendants — the `_api` equivalent of `layout.tsx`.
- No wrapper file required — `_api/`'s existence alone is enough for the plugin to wire the build entry and mount the router.
- API routes fully self-contained under their configured prefix (default `/api`): unmatched paths and unhandled errors under that prefix respond in JSON, never fall through to the HTML/SSR catch-all.
- A build-time guard: `_api/` present with no server available at runtime (`ssr: false`, no serverless adapter) fails the build with an explicit message, rather than silently shipping API routes that can never run.

## Non-goals

- Client-side data-fetching helpers (a `useApi()`-style hook, request caching, etc.) — this RFC is server-side registration and dispatch only.
- Request validation/schema binding (e.g. a `@rasenganjs/validation`-integrated body parser for routes) — worth a follow-up once the base convention ships, not blocking it.
- Rate limiting, CORS presets, or other opinionated middleware bundled by default — `middleware.ts` gives users the hook; picking sane defaults is a separate decision.
- Streaming file uploads through `_api` specifically — `@rasenganjs/futon` already has `fileUpload()` (RFC-0002); this RFC doesn't change or extend it, `_api` handlers can just use it like any other Futon middleware.

---

# Detailed Design

## 1. File convention

```
src/app/_api/
  middleware.ts                    # applies to every route under _api
  health.route.ts                  # GET /api/health
  users/
    middleware.ts                  # applies to every route under /api/users
    index.route.ts                 # GET, POST /api/users
    [id].route.ts                  # GET, PATCH, DELETE /api/users/:id
  webhooks/
    (stripe)/                      # route group — ignored in the URL
      payment.route.ts             # POST /api/webhooks/payment
```

Segment normalization is the exact same algorithm `_routes/` already uses (`normalizeSegment()` in `flat-routes.tsx`) — reused, not reimplemented, against a new base path (`/src/app/_api/`) and a new file suffix (`.route.` instead of `.page.`).

## 2. Handler signature

```ts
// src/app/_api/users/[id].route.ts
import { json, notFound } from 'rasengan/server';
import type { Context } from 'rasengan/server';

export async function GET(ctx: Context) {
  const { id } = ctx.params;
  const user = await db.users.findById(id);
  if (!user) return notFound();
  return json(user);
}

export async function DELETE(ctx: Context) {
  await db.users.delete(ctx.params.id);
  return json({ success: true }, { status: 204 });
}
```

A file may export any subset of the 7 names Futon's own `HTTPMethod` type already enumerates — no translation layer between the file-based convention and the `Router` API. Exporting anything else (a typo, a lowercase `get`, a stray `default` export) produces a build-time warning, mirroring the existing "Page component is not exported by default" warning for `_routes`.

## 3. `middleware.ts`

```ts
// src/app/_api/users/middleware.ts
import type { Middleware } from 'rasengan/server';

const auth: Middleware = async (ctx, next) => {
  /* ... */
};

export default [auth];
```

Maps directly onto `router.group(prefix, (api) => { api.use(...middlewares); ... })` — a folder's `middleware.ts` becomes the middleware array passed to the `.group()` call wrapping everything discovered under that folder.

## 4. Plugin mechanics — no wrapper file

- `routing/utils/flat-api-routes.ts` (new, alongside `flat-routes.tsx`): `flatApiRoutes(globFn)` walks the same kind of `import.meta.glob()` result `flatRoutes()` does, but builds and returns a Futon `Router` directly — no `RouterComponent`, no React involved at any point.
- `flatApiRoutesPlugin()` (new, in `core/plugins/index.ts`, alongside `flatRoutesPlugin()`): registers `virtual:rasengan/api-router` via the existing `createVirtualModule()` helper. `load()` emits:
  ```js
  import { flatApiRoutes } from 'rasengan/server';

  const ApiRouter = await flatApiRoutes(() => {
    return import.meta.glob([
      '/src/app/_api/**/middleware.{js,ts}',
      '/src/app/_api/**/*.route.{js,ts}',
    ]);
  });

  export default ApiRouter;
  ```
- **Auto-detection, no user action required:** `createDefaultViteConfig()` (`core/config/vite/defaults.ts`) checks `fs.existsSync('src/app/_api')` at config-resolution time (same moment/mechanism `isRootLayoutExists` already uses for `_routes`) and, only if present, adds `'api-router': 'virtual:rasengan/api-router'` to the `ssr`/`ssg` environments' `rolldownOptions.input` — producing `dist/server/api-router.js`, built exactly like `app.router.js` is today. If `_api/` doesn't exist, this entry is never added — zero cost for apps not using the feature.

## 5. Runtime wiring

A new `createApiRouterMiddleware({ build })` (exported from `rasengan/server`, mirroring `createMatchRoutesGuard({ build })`'s shape) dynamically `import()`s the built `dist/server/api-router.js`, and returns a single Futon `Middleware` that:

1. Only engages for requests under the configured prefix (`AppConfig.api.prefix`, default `/api`) — a cheap `pathname.startsWith(prefix)` check up front, so it's a no-op for every other request.
2. Dispatches into the loaded `Router`'s own `.middleware()`.
3. If nothing matches, responds `404` in JSON itself — **does not** call `next()` and fall through to the SSR handler (§8).
4. Wraps the dispatch in a try/catch that formats uncaught errors as JSON (§9), independent of the app's own `onError` (which stays HTML/text-oriented for page requests).

Mounted via `app.use(createApiRouterMiddleware({ build }))`, **ahead of** `app.fallback(ssrHandler)`, in the three places that already own a `Futon` instance and already do this same dance for `createMatchRoutesGuard`:

- `server/dev/server.ts` (dev)
- `@rasenganjs/serve`'s `cli.ts` (Node/Bun production)
- the `@rasenganjs/vercel`-generated serverless handler (RFC-0007 Phase 2c)

No changes needed to `createRequestHandler` itself — it stays a leaf handler; API-route dispatch is a sibling concern composed in front of it, not inside it.

## 6. 404 scoped to the API prefix

Requests under `/api/*` (or whatever prefix is configured) that don't match any registered route respond:

```json
{ "error": { "message": "Not Found", "status": 404 } }
```

This is the middleware's own terminal behavior (§5, point 3) — it never delegates to the page router's catch-all, so an API 404 is never accidentally an HTML document.

## 7. Error handling

Reuses Futon's existing `HttpError` hierarchy (`packages/framework/futon/src/errors/index.ts`) instead of inventing a new error shape:

```ts
throw new NotFoundError('User not found'); // → { error: { message: "User not found", status: 404 } }
throw new Error('boom'); // → { error: { message: "Internal Server Error", status: 500 } } in production
// → { error: { message: "boom", status: 500 } } in development
```

A thrown `HttpError` (or subclass) reports its own `status`/`message` directly. A plain `Error` (or anything else thrown) defaults to `500`, and — production only — the response message is the generic `"Internal Server Error"` rather than the raw error message, to avoid leaking internals; development keeps the real message for debuggability. This mirrors the dev-vs-prod error-detail split the SSR error boundary already makes.

## 8. Config surface

```ts
export interface ApiConfig {
  /**
   * Prefix under which all _api routes are mounted.
   * @default '/api'
   */
  prefix?: string;
}

// AppConfig:
api?: ApiConfig;
```

Same shape as the existing `ServerConfig`/`server?: ServerConfig` pattern in `core/config/type.ts` — no new nesting convention introduced.

## 9. Build-time guard for unreachable API routes

If `_api/` exists but the build target has no server at request time — `ssr: false` **and** no serverless adapter configured (`rasengan({ adapter: ... })` unset or `Adapters.DEFAULT`) — the build fails with:

```
Error: src/app/_api/ was found, but this build has no server to run it on
  (ssr: false and no serverless adapter configured). API routes require
  either ssr: true, or a serverless deployment target like @rasenganjs/vercel.
```

Checked at the same point the plugin already detects `_api/`'s existence for the build-entry wiring (§4) — one `fs.existsSync` check gates both. `prerender: true` alone (SSG) hits this same guard unless paired with a serverless adapter, since the SSG build-time server doesn't exist at request time either — only `ssr: true` or an adapter changes that.

---

# Migration Phases

Not started — this RFC is a design document; implementation is future work, phased similarly to RFC-0007:

**Phase 1 — Core file-based resolution**
`flatApiRoutes()`, `flatApiRoutesPlugin()`, the auto-detected build-entry wiring in `core/config/vite/defaults.ts`, segment-convention reuse from `flat-routes.tsx`. No runtime wiring yet — just proves a `_api/` folder correctly becomes a `Router` instance at build time.

**Phase 2 — Runtime wiring**
`createApiRouterMiddleware()`, mounted in `server/dev/server.ts` first (fastest feedback loop), then `createRequestHandler`'s sibling call sites (`@rasenganjs/serve`, the Vercel handler). §6/§7 (scoped 404, JSON errors) land here since they're properties of this middleware, not the file-resolution layer.

**Phase 3 — Config surface + build guard**
`AppConfig.api`, the `ssr:false`-without-adapter build failure (§9).

**Phase 4 — Docs + playground example**
A `_api/` folder in `apps/playground/file-based-routing` (or a new dedicated playground) exercising dynamic segments, nested middleware, and an intentionally-thrown `HttpError`, as the manual + automated validation harness.

---

# Open Questions

- **HMR granularity in dev**: editing a single `.route.ts` file — does the whole `Router` need rebuilding (simple, mirrors `_routes`' current same-cost tradeoff), or can Vite's module graph support a cheaper per-route update? Not blocking Phase 1/2, worth revisiting once the base implementation exists to profile against.
- **`_api` vs `_routes` URL collisions**: if a page route and an API route both resolve to the same path (e.g. a `_routes/api/health.page.tsx` and `_api/health.route.ts` both mapping to `/api/health`), which wins? Current design mounts the API middleware first (§5), so API routes implicitly win — worth stating explicitly as a documented behavior rather than an accident of ordering, and possibly a build-time warning on detected collisions.
- **Should `middleware.ts` support an escape hatch to opt a specific route file out** of an ancestor folder's middleware (some frameworks support per-file overrides)? Deferred — not clearly needed yet, easy to add later without a breaking change.
