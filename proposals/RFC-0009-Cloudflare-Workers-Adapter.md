# RFC 0009 — `@rasenganjs/cloudflare`: a Deploy Adapter for Cloudflare Workers

**Status:** Draft
**Author:** Rasengan.js Core Team
**Date:** 2026-08-08

## Executive Summary

`rasengan` currently ships two deploy adapters, `@rasenganjs/vercel` and `@rasenganjs/netlify` (both rewritten on Futon per RFC-0007, see their own CHANGELOGs), plus a Node/Bun production server (`@rasenganjs/serve`). All three assume a real filesystem and Node-style dynamic `import()` of build artifacts at request time. Cloudflare Workers — the third major serverless target, and one `AppConfig.runtime` already has a name for (`'workerd'`) — has neither: no filesystem at runtime, and no dynamic `import()` of a computed path. A worker must ship as a single, statically-bundled JS module.

This RFC proposes `@rasenganjs/cloudflare`, a new deploy adapter mirroring `@rasenganjs/vercel`'s and `@rasenganjs/netlify`'s shape (a `configure()` export wired into `rasengan.config.js`'s `adapter` option), plus a small, additive, backward-compatible change to three existing `rasengan/server` exports (`createRequestHandler`, `createMatchRoutesGuard`, `createApiRouterMiddleware`) so they can be driven by pre-loaded modules instead of always dynamically importing by path. Static assets are served via Cloudflare's modern **Workers Assets** feature (`wrangler.toml`'s `[assets]` block), the same "CDN serves static files directly, function only handles the rest" split Vercel's `handle: 'filesystem'` route and Netlify's static redirects already establish.

`@rasenganjs/runtime`'s `WorkerdProdAdapter` (`packages/platform/runtime/src/adapters/workerd/`) already exists at the low-level HTTP layer — this RFC is entirely about the deploy-time packaging problem above it, not about talking to workerd's `fetch` event model, which is already solved.

---

# Motivation

## What already exists

- **`WorkerdProdAdapter`** (`@rasenganjs/runtime/adapters/workerd`) — registers a Futon app's `fetch` handler via `self.addEventListener('fetch', ...)` (or exposes it as `fetchHandler` for `export default { fetch }` in `passthrough` mode). Assets are a no-op (no filesystem). No `watch()` — production-only, matching `NodeProdAdapter`/`BunProdAdapter`'s own split. This is a solved problem; nothing here needs to change.
- **`AppConfig.runtime: 'workerd'`** (RFC-0007 §5) — `createDefaultViteConfig()` already sets `resolve.conditions: ['workerd', 'edge-light', 'worker']` for the `ssr`/`ssg` Vite environments when this is set, and skips externalizing Node builtins (workerd has partial Node compat via `nodejs_compat`, but the point of the runtime flag is to let package `exports` maps resolve edge-specific entry points instead).
- **Precedent in the sibling `@rasenganjs/server` package** (the backend framework, not the frontend framework this RFC concerns) — `rasengan-server build --preset workerd` already produces a single bundled `dist/index.js`, deployed via `wrangler deploy` reading a `wrangler.toml` with `main = "dist/index.js"` (see `apps/playground/rasengan-server-workerd`). This RFC's bundling strategy (§ Detailed Design) follows the same "bundle everything into one file" shape, adapted to `rasengan` frontend's multi-artifact SSR build output instead of a single backend entry point.

## The blocker: dynamic `import()` by computed path doesn't work on workerd

`createRequestHandler`, `createMatchRoutesGuard`, and `createApiRouterMiddleware` (`packages/framework/rasengan/src/server/node/{index.tsx,match-routes-guard.ts,api-router-middleware.ts}`) all do some variant of:

```ts
const AppRouter = await (
  await import(
    /* @vite-ignore */
    resolvePath(
      path.posix.join(
        buildOptions.buildDirectory,
        buildOptions.serverPathDirectory,
        'app.router.js'
      )
    )
  )
).default;
```

The path is **constructed at runtime** (`path.posix.join(...)`, then `resolvePath(...)`), not a string literal a bundler can statically resolve. This is precisely why `@rasenganjs/vercel`'s and `@rasenganjs/netlify`'s generated handlers work unmodified on Node's Lambda runtimes (both have a real filesystem to resolve against) and precisely why the same generated-handler approach cannot be reused as-is for a Worker: no filesystem exists to resolve `import()` against at request time, and no bundler can turn a computed path into a static, inlined import without either (a) fragile ahead-of-time interception of these specific call sites, or (b) the functions themselves accepting pre-resolved modules. This RFC picks (b) — see § Detailed Design.

`ManifestManager` (`server/build/manifest.tsx`) has the same problem one layer down: its constructor calls `fs.readFileSync(this._manifestPath, 'utf-8')` synchronously to load `manifest.json`. `createRequestHandler` also does a raw `fs.existsSync`/`fs.readFileSync` on `config.json`. Both need a filesystem-free path too, not just the two `import()` calls.

## Static assets: Workers Assets, not KV/R2

Older Cloudflare tutorials route static files through Workers KV ("Workers Sites") — that mechanism is deprecated in favor of **Workers Assets**, a `wrangler.toml`/`wrangler.json` `[assets]` block (`directory = "..."`) that Cloudflare's own edge CDN serves directly, without invoking the Worker at all for matched paths (conceptually identical to Vercel's `{ handle: 'filesystem' }` route and Netlify's static redirects, which both already exist in `@rasenganjs/vercel`/`@rasenganjs/netlify`). No KV namespace, no R2 bucket, no extra Cloudflare product needed just to ship `dist/client`.

---

# Goals

- A `@rasenganjs/cloudflare` package with the same `configure()`-returns-`AdapterConfig` shape as `@rasenganjs/vercel`/`@rasenganjs/netlify`, wired the same way in `rasengan.config.js`.
- SSR builds (`config.ssr && !config.prerender`) produce a single bundled Worker script plus a generated `wrangler.toml`, deployable via `wrangler deploy` with no manual editing.
- SPA/SSG builds produce **no Worker at all** — pure static hosting through Workers Assets, matching Vercel's/Netlify's own "no function for static-only builds" behavior.
- `createRequestHandler`, `createMatchRoutesGuard`, `createApiRouterMiddleware`, and `ManifestManager` gain an **additive, optional** way to be driven by pre-loaded modules — zero behavior change for every existing caller (`@rasenganjs/vercel`, `@rasenganjs/netlify`, `@rasenganjs/serve`, `server/dev/server.ts`) that doesn't pass the new option.
- `_api/` routes (RFC-0008) work on Cloudflare the same as they do on Vercel/Netlify — the API router is just another statically-imported module in the bundle.

## Non-goals

- **D1/KV/R2 bindings for the app's own data** — out of scope. An app's own database story (e.g. the Turso/libSQL path already used in `apps/playground/api-routes-demo` for Netlify) is unrelated to this adapter; D1 is a fine choice for a Cloudflare-hosted app but isn't this RFC's concern, same as this RFC doesn't pick a database for Vercel/Netlify either.
- **A `workerd` dev server for `rasengan dev`** — `wrangler dev` / Miniflare already exists and is the standard local-dev story for Workers (same reasoning `WorkerdProdAdapter`'s own docstring already gives for why it's production-only). This RFC's adapter is a **build-time** `prepare()` step, same as Vercel/Netlify; local iteration during `rasengan dev` stays on Node, same as it already is for every other runtime target.
- **Durable Objects, Queues, Cron Triggers, or any other Cloudflare-specific product** beyond Workers + Workers Assets.
- **Automatic `wrangler deploy` invocation** from `prepare()` — matches Vercel's/Netlify's own adapters, which generate output but leave the actual `vercel`/`netlify deploy` invocation to the platform's own CI or the user's own CLI call. This RFC's adapter generates `wrangler.toml` + the bundle; running `wrangler deploy` is a separate, explicit step.

---

# Proposed Architecture

```
rasengan build (ssr: true, prerender: false)
  → dist/server/{main,template,app.router,entry.server,api-router}.js   (existing, unchanged)
  → dist/client/**                                                      (existing, unchanged)

@rasenganjs/cloudflare's prepare()
  → generates a Worker entry file that statically imports the dist/server/* artifacts
    above, and constructs the Futon app via createRequestHandler/createMatchRoutesGuard/
    createApiRouterMiddleware's new `modules` option (no dynamic import, no fs)
  → esbuild-bundles that entry file into a single .cloudflare/worker.js
  → copies dist/client → .cloudflare/assets/
  → writes wrangler.toml: main = ".cloudflare/worker.js", [assets] directory = ".cloudflare/assets"

rasengan build (ssr: false, or prerender: true)
  → @rasenganjs/cloudflare's prepare() copies static output → .cloudflare/assets/
    and writes a wrangler.toml with only [assets] — no Worker script, no `main`
```

---

# Detailed Design

## 1. Additive `modules` option on the three `rasengan/server` request-handling exports

```ts
// server/node/index.tsx
interface CreateRequestHandlerOptions {
  build: BuildOptions;
  /**
   * Pre-loaded build artifacts, bypassing every dynamic import() and
   * filesystem read this function would otherwise do. Required on
   * runtimes with no filesystem and no dynamic import-by-path support
   * (Cloudflare Workers) — every other caller (Vercel, Netlify,
   * @rasenganjs/serve, the dev server) omits this and keeps today's
   * exact behavior.
   */
  modules?: {
    entryServer: { render: RenderStreamFunction };
    appRouter: RouterComponent;
    config: OptimizedAppConfig;
    manifest: Record<string, ManifestEntry>; // raw manifest.json content
  };
}
```

Mirrored, scoped down to what each function actually needs:

```ts
// match-routes-guard.ts
interface MatchRoutesGuardOptions {
  build: BuildOptions;
  modules?: { appRouter: RouterComponent };
}

// api-router-middleware.ts
interface ApiRouterMiddlewareOptions {
  build: BuildOptions;
  prefix?: string;
  modules?: { apiRouter: Router };
}
```

Inside each function, the existing dynamic-import/filesystem code path stays exactly as-is; a new branch at the very top short-circuits when `options.modules` is present:

```ts
const AppRouter = options.modules
  ? options.modules.appRouter
  : await (await import(/* @vite-ignore */ resolvePath(...))).default;
```

`createApiRouterMiddleware`'s current setup-time `fs.existsSync(apiRouterPath)` check (deciding whether to return a no-op passthrough) becomes `options.modules ? options.modules.apiRouter != null : fs.existsSync(apiRouterPath)` — a Cloudflare caller that has no `_api/` folder simply omits `apiRouter` from `modules`.

## 2. `ManifestManager` accepts a pre-parsed manifest

```ts
// server/build/manifest.tsx
export class ManifestManager {
  constructor(manifestPathOrData: string | Record<string, ManifestEntry>) {
    this._manifest =
      typeof manifestPathOrData === 'string'
        ? this.loadManifest(manifestPathOrData) // existing fs.readFileSync path, unchanged
        : manifestPathOrData;
  }
  // ...
}
```

Every existing call site keeps passing a path string; `createRequestHandler`'s `modules` branch passes the pre-loaded object instead. `ManifestEntry` is currently a private (unexported) interface in `manifest.tsx` — Phase 1 needs to `export` it for this new constructor overload's public type signature.

## 3. The generated Worker entry (what `@rasenganjs/cloudflare` writes before bundling)

Structurally the same shape `@rasenganjs/vercel`'s and `@rasenganjs/netlify`'s generated handlers already have (Futon app, `compress()`, `staticFiles()` as a defensive fallback, `_api/` middleware, `createRequestHandler` + `createMatchRoutesGuard` in `app.fallback()`), with two differences: static imports instead of dynamic ones, and `WorkerdProdAdapter` instead of `NodeProdAdapter`/the Node req↔Response shim:

```ts
import * as entryServer from './dist-server/entry.server.js';
import appRouter from './dist-server/app.router.js';
import apiRouter from './dist-server/api-router.js'; // omitted entirely when the app has no _api/
import config from './dist-server/config.json' with { type: 'json' };
import manifest from './dist-client/.vite/manifest.json' with { type: 'json' };
import {
  createRequestHandler,
  createMatchRoutesGuard,
  createApiRouterMiddleware,
} from 'rasengan/server';
import { Futon } from '@rasenganjs/futon';
import { WorkerdProdAdapter } from '@rasenganjs/runtime/adapters/workerd';

const build = {
  /* BuildOptions — directory fields become irrelevant, everything is pre-loaded */
};
const modules = { entryServer, appRouter, config, manifest };

const app = new Futon();
const adapter = new WorkerdProdAdapter({ passthrough: true });
app.use(
  createApiRouterMiddleware({
    build,
    prefix: config.api?.prefix,
    modules: { apiRouter },
  })
);

const requestHandler = createRequestHandler({ build, modules });
const matchRoutesGuard = createMatchRoutesGuard({ build, modules });
app.fallback((ctx) => matchRoutesGuard(ctx, () => requestHandler(ctx)));
app.onError((error) => {
  console.error(error);
  return new Response('Internal Server Error', { status: 500 });
});

await adapter.serve(app);
export default { fetch: adapter.fetchHandler };
```

`@rasenganjs/cloudflare`'s `prepare()` writes this as a real `.ts`/`.js` file (same "write a template string to disk" technique `@rasenganjs/vercel`/`@rasenganjs/netlify` already use), then runs **esbuild** (`bundle: true, format: 'esm', platform: 'browser', conditions: ['workerd', 'worker']`) over it to produce one self-contained `.js` file — this bundling step is what makes the _static_ imports above (`rasengan/server`, `@rasenganjs/futon`, `@rasenganjs/runtime`, and the `dist-server/*`/`dist-client/*` artifacts) resolvable without any runtime filesystem access, unlike the dynamic-import approach this RFC replaces.

## 4. Static assets: `wrangler.toml`

```toml
name = "<app-name>"
main = ".cloudflare/worker.js"          # omitted entirely for SPA/SSG builds — assets-only Worker
compatibility_date = "2026-08-08"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = ".cloudflare/assets"
# For SSR builds: dist/client copied here (same source selection logic
# copyStaticFiles() already implements in @rasenganjs/vercel/@rasenganjs/netlify).
# For SPA/SSG builds: dist or static copied here, and `main` above is omitted —
# Cloudflare serves 100% static, no Worker invoked at all.
```

## 5. Package layout

`packages/deploy/cloudflare/` — same file set as `@rasenganjs/netlify`: `index.ts`, `package.json`, `tsconfig.json`, `tsup.config.ts` (`external: ['rasengan']`), `README.md`, `CHANGELOG.md`. New dependency: `esbuild` (already present transitively throughout the monorepo's toolchain, but not currently a direct dependency of any deploy package — this would be the first).

`Adapters.CLOUDFLARE = 'cloudflare'` added to `core/plugins/index.ts`'s `Adapters` const (same enum `VERCEL`/`NETLIFY` already live in), and a matching `case Adapters.CLOUDFLARE` in `prepareToDeploy()`'s switch. `detectDeploymentPlatform()` (`server/runtime/detect-runtime.ts`) gains a Cloudflare-specific env var check — needs research into what Cloudflare's own CI build environment actually sets (Vercel sets `VERCEL=1`, Netlify sets `NETLIFY=true`; Cloudflare Pages/Workers CI env vars need confirming before implementation, see Open Questions).

---

# Migration Phases

**Phase 1 — Core additive `modules` support**
Add the `modules` option to `createRequestHandler`, `createMatchRoutesGuard`, `createApiRouterMiddleware`, and the `ManifestManager` constructor overload. No new package yet. Verification: full existing `rasengan` test suite stays green untouched (proves zero behavior change for the no-`modules` path), plus new unit tests exercising the `modules`-provided path directly (constructing a `RouterComponent`/fake `Router` by hand, same technique the existing `generate-routes.test.ts`/`api-router-middleware.test.ts` suites already use).

**Phase 2 — `@rasenganjs/cloudflare` package**
The `prepare()` pipeline described above: directory setup, `dist/client` → assets copy, Worker entry generation, esbuild bundling, `wrangler.toml` generation. `Adapters.CLOUDFLARE` wired into `core/plugins/index.ts`. Verification target: a real `apps/playground/*-cloudflare` (or a temporary addition to an existing playground, following `@rasenganjs/netlify`'s own precedent of testing against `file-based-routing`) — confirm the bundle is syntactically valid (`node --check`, or an actual `esbuild`/`wrangler`-level check), and, if `wrangler` can run locally in this environment, `wrangler dev` against the generated output for a real end-to-end request.

**Phase 3 — Docs + playground example**
A dedicated playground (mirroring `api-routes-demo`'s role for RFC-0008), `README.md` walking through `wrangler login` / `wrangler deploy` for someone who — like this RFC's own motivating conversation — has never used Cloudflare before. Docs-site content deferred to release time, same call RFC-0008 §Phase 4 already made.

---

# Open Questions

- **`detectDeploymentPlatform()`'s Cloudflare signal**: what environment variable does Cloudflare's own build system actually set (for Pages CI builds specifically, since raw `wrangler deploy` runs locally/from arbitrary CI and has no single reliable env var the way Vercel/Netlify's own hosted build runners do)? May need `detectDeploymentPlatform()` to stay opt-in for Cloudflare (i.e. the adapter's `prepare()` always runs when configured, regardless of platform auto-detection) rather than gated the same way Vercel/Netlify are — needs research before Phase 2.
- **`nodejs_compat` scope**: how much of `rasengan`'s SSR code path (React's own server-rendering internals, `node:path`/`node:stream` usage inside `entry.server.js`'s render pipeline) actually needs Cloudflare's `nodejs_compat` flag versus already being portable? Affects whether the generated `wrangler.toml` can omit it for a leaner Worker.
- **esbuild vs. Rolldown for the bundling step**: `rasengan`'s own build already uses Rolldown (RFC-0007) for the `ssr`/`ssg`/`client` Vite environments — should `@rasenganjs/cloudflare`'s adapter-side bundling pass use Rolldown too (consistency, one fewer toolchain) instead of esbuild? esbuild is the more common choice for this exact "bundle a small entry + its imports into one Worker file" job (matches `rasengan-server`'s own `--preset workerd` precedent, and Wrangler's own internal bundler is esbuild-based), but worth confirming against `rasengan-server`'s actual implementation before deciding.
- **Bundle size**: React's server-rendering runtime plus `react-router` plus `@rasenganjs/futon` bundled into a single Worker file — Cloudflare Workers have a script-size limit (varies by plan). Worth measuring against a real playground build in Phase 2 before considering it a solved problem.
- **`_api`-only apps (no page routes at all)**: does it make sense to support a Cloudflare deploy with `_routes/` entirely absent, API-only? Not blocking — `flatRoutes()`'s `DefaultLayout` fallback already means an app with zero pages still produces a valid (if empty) router, so this likely falls out of the existing design for free, but worth a Phase 2 test case.
