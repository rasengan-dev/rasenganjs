# RFC 0011: `@rasenganjs/sitemap`, Sitemap Generation for Rasengan Frontend Apps

**Status:** Draft
**Author:** Rasengan.js Core Team
**Date:** 2026-08-14

## Executive Summary

`@rasenganjs/sitemap` has already been publicly teased in a blog post ("Sitemap, automatic sitemap generation, coming soon") and has a disabled nav entry in docs-v2's Packages section, but no design exists beyond that one-line mention. This RFC scopes it to the `rasengan` frontend framework exclusively: Futon and `@rasenganjs/server` are backend frameworks with no concept of a "page," so a sitemap (a list of indexable HTML URLs for search engines) does not apply to them. `_api/` routes, which do exist on the frontend side too, are JSON endpoints and must never appear in a sitemap either, they are naturally excluded by construction (see Detailed Design §1).

The core design decision this RFC makes: generate the sitemap as a **separate CLI step run after `rasengan build` finishes** (`rasengan build && rasengan-sitemap`), not as a Vite plugin racing inside the same build. Rollup's `closeBundle` hook is documented as an async parallel hook, plugins are started in array order but not necessarily awaited before the next one starts, so a sitemap Vite plugin listed after `rasengan()` in `vite.plugins` has no hard guarantee it observes `rasengan()`'s finished output. A genuinely separate post-build process sidesteps that hazard entirely, and matches `next-sitemap`'s proven approach for the closest comparable framework (file-based-routing React meta-framework with SSR/SSG/SPA modes).

The actual route enumeration work is almost entirely already built: `getAllRoutesPath()` (`routing/utils/generate-routes.tsx`) already walks a built route tree and resolves every dynamic segment via each page's `generatePaths()`, exactly what prerendering itself uses. This RFC's main framework-side change is small and additive: export `generateRoutes`/`getAllRoutesPath` from `rasengan`'s public API so `@rasenganjs/sitemap` can consume them as a real dependency instead of reaching into internal build paths.

---

# Motivation

## What already exists (and is directly reusable)

- **`getAllRoutesPath(routes: RouteObject[])`** (`packages/framework/rasengan/src/routing/utils/generate-routes.tsx:644-704`) returns `{ paths: string[], error: Set<string> }`, a flat, deduplicated list of every concrete URL the app can produce, dynamic segments already resolved via each page's `generatePaths()`. This is exactly a sitemap's input.
- **`generateRoutes(router: RouterComponent)`** builds the `RouteObject[]` tree `getAllRoutesPath()` consumes, uniformly for both file-based and config-based routing (`defineRouter()` produces the same `RouterComponent` shape flat-file routing does, confirmed by tracing both through the same `generateRoutes()` call).
- **`preRenderApp()`** (`server/node/pre-render.tsx:144-154`) already calls exactly this pair (`generateRoutes` then `getAllRoutesPath`) today, to know what to prerender. A sitemap generator's route-collection step is a near-verbatim copy of code that already exists and already ships.
- **`@rasenganjs/vercel`/`@rasenganjs/netlify`** already establish the precedent for a post-build tool that reads `config.json` off disk and picks the right output directory based on `ssr`/`prerender` mode (`config.prerender ? 'static' : config.ssr ? 'dist/client' : 'dist'`). `@rasenganjs/sitemap` reuses that exact selection logic rather than inventing new rules.

## What's missing

- **No base URL concept anywhere in the framework.** `AppConfig`, `BuildOptions`, and `OptimizedAppConfig` have no `baseUrl`/`siteUrl`/`host` field. The only "canonical URL" concept in the whole framework is `Metadata.openGraph.url`, a required, per-page, author-supplied absolute string with no framework-level default to fall back on. A sitemap cannot exist without absolute URLs, so this RFC necessarily introduces a new, small, package-scoped config surface (not a core `AppConfig` change, see Non-goals).
- **`getAllRoutesPath`/`generateRoutes` are not part of `rasengan`'s public exports** (`export * from './routing/index.js'` in the main entry does not include them; `rasengan/server`'s entry only exports `createRequestHandler` and friends). `@rasenganjs/sitemap` needs a stable, public way to call them.
- **Redirect-awareness.** `AppConfig.redirects` exists and is checked during prerendering (`isStaticRedirectFromConfig()`), but nothing today cross-references it against the route list for anything else. A sitemap listing a URL that immediately redirects elsewhere is a well-known low-quality signal to search engines; the source path should be excluded.

---

# Goals

- A `@rasenganjs/sitemap` package, installed as a dev dependency, that generates a spec-compliant `sitemap.xml` for a `rasengan` app in `ssr`, `spa`, or `prerender` mode.
- Zero risk of build-hook race conditions: runs as a genuinely separate process after `rasengan build` fully exits (`"build": "rasengan build && rasengan-sitemap"` in `package.json`, or a `postbuild` script).
- Correctly writes into whichever output directory the app actually produced (`static/`, `dist/client/`, or `dist/`), mirroring the exact directory-selection logic `@rasenganjs/vercel`/`@rasenganjs/netlify` already use.
- Automatically excludes what should never appear in a sitemap: the catch-all `*`/404 route, `_api/` endpoints (excluded by construction, see Detailed Design §1), and redirect source paths (cross-referenced against `AppConfig.redirects`).
- A small, dedicated `rasengan-sitemap.config.js` (mirroring `next-sitemap`'s config file convention) with a required `siteUrl`, optional per-route `changefreq`/`priority` (static defaults plus an override function), and `exclude` glob patterns.
- Optional `robots.txt` generation/patching (append a `Sitemap:` line to an existing file, or generate a minimal one), a common pairing, gated behind an explicit option, off by default so it never silently overwrites a hand-written `robots.txt`.
- Small, additive export of `generateRoutes`/`getAllRoutesPath` from `rasengan`'s public API (exact surface TBD in Detailed Design §1), zero behavior change for every existing caller, since it's a pure addition.

## Non-goals

- **Futon and `@rasenganjs/server`.** Explicitly out of scope per this RFC's own framing: both are backend frameworks with no "page" concept. `_api/` routes on the frontend side are JSON endpoints, not indexable HTML, and are excluded from the sitemap by construction rather than by a special case (see §1).
- **A new `AppConfig.baseUrl` field.** The missing base-URL concept is real, but it's scoped to `@rasenganjs/sitemap`'s own config file, not a change to core's `AppConfig`. Nothing else in the framework needs a site-wide base URL today (each page's `metadata.openGraph.url` is already fully author-supplied), so adding one to core for this single consumer isn't justified.
- **Sitemap index files** (the `<sitemapindex>` wrapper format required once a site exceeds the 50,000-URL/50MB single-file limit). Real, but deferred to a later phase, most Rasengan sites are far under that limit at launch.
- **i18n hreflang annotations** (`<xhtml:link rel="alternate" hreflang="...">` for `@rasenganjs/i18n`-driven locale-prefixed routes). Valuable, genuinely more complex (needs to understand the i18n package's routing convention), deferred, tracked as an Open Question below rather than blocking v1.
- **Image/video sitemap extensions.** Rarely needed, high complexity for the value delivered, not planned at all (not even a later phase) unless real demand shows up.
- **Automatic wiring into `rasengan build` itself** (i.e., making `rasengan()`'s own Vite plugin aware of and invoke the sitemap step inline). Explicitly deferred, see Open Questions, the CLI-after-build approach is the whole point of sidestepping the hook-ordering hazard; revisiting this would need a real reason to accept that tradeoff back.

---

# Proposed Architecture

```
rasengan build (any mode: ssr / prerender / spa)
  → completes fully, process exits
  → dist/ (or static/) contains the final output, config.json is final

rasengan-sitemap (separate CLI, @rasenganjs/sitemap)
  1. Load rasengan-sitemap.config.js (siteUrl required)
  2. Read config.json off disk (same file @rasenganjs/vercel/@rasenganjs/netlify
     already read) → know ssr/prerender/spa mode
  3. Dynamically import the built app.router.js (same path preRenderApp() uses:
     dist/{serverPathDirectory}/app.router.js) → AppRouter
  4. generateRoutes(AppRouter) → getAllRoutesPath(routes)
     → flat list of concrete URL paths, dynamic segments already resolved
  5. Filter: drop '*' (catch-all/404), drop any path matching a redirect
     source in AppConfig.redirects, apply user-configured `exclude` patterns
  6. Map remaining paths → <url><loc>{siteUrl}{path}</loc>...</url>,
     applying changefreq/priority defaults or the user's override function
  7. Write sitemap.xml into the same directory @rasenganjs/vercel's
     copyStaticFiles() already selects:
       config.prerender ? staticDirectory
       : config.ssr ? clientPathDirectory
       : buildDirectory
  8. If robots.txt generation is enabled, write/patch it alongside
```

For SPA mode specifically: there is no server-rendered route tree to speak of at request time, but `generateRoutes()`/`getAllRoutesPath()` operate on the _build-time_ route tree regardless of `ssr`, so step 3-4 work identically; only the output directory in step 7 differs (`buildDirectory` i.e. plain `dist/`, no `client/` subdirectory).

---

# Detailed Design

## 1. `_api/` routes are excluded by construction, not by filtering

`_api/` routes are dispatched through a completely separate `Router` (Futon's own router, exposed as the `virtual:rasengan/api-router` module), never through `RouterComponent`/`generateRoutes()`. `AppRouter` (the object `generateRoutes()` walks) has no knowledge of `_api/` at all. This means step 4 above structurally cannot produce an `_api/` URL; no special-case filter is needed, and this RFC doesn't add one, an explicit test in Phase 1 asserts this rather than trusting it silently.

## 2. Additive public exports from `rasengan`

`generateRoutes` and `getAllRoutesPath` currently live in `routing/utils/generate-routes.tsx` and are not re-exported from either the main `rasengan` entry (`export * from './routing/index.js'`, which omits them) or `rasengan/server`. Proposed: add both to `routing/index.ts`'s existing named-export block (next to `defineRouter`/`flatRoutes`), so they become part of `rasengan`'s main entry point. Purely additive, every existing import path is untouched, this is a new export, not a moved one.

## 3. `rasengan-sitemap.config.js`

```ts
// rasengan-sitemap.config.js
import { defineSitemapConfig } from '@rasenganjs/sitemap';

export default defineSitemapConfig({
  siteUrl: 'https://rasengan.dev', // required, no framework default exists
  exclude: ['/admin/*'], // optional, glob against the route path
  changefreq: 'weekly', // optional static default
  priority: 0.7, // optional static default
  transform: async (path) => ({
    // optional per-route override
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
  }),
  generateRobotsTxt: false, // optional, off by default
});
```

Mirrors `next-sitemap`'s config file convention deliberately, most developers touching this package will already have seen that shape once.

## 4. CLI entry (`rasengan-sitemap`)

A single-purpose bin script, no `dev`/`watch` mode (sitemaps are a build-output concern only). Reads `rasengan-sitemap.config.js` from the project root the same way `rasengan.config.js` is read (`loadModuleSSR`-style dynamic import), then runs the pipeline in Proposed Architecture above. Exits non-zero with a clear message if `config.json` doesn't exist yet (i.e., `rasengan build` hasn't run), preventing a confusing failure deeper in the pipeline.

## 5. Package layout

`packages/ecosystem/sitemap/`, matching `@rasenganjs/theme`'s established ecosystem-package shape (`package.json` with `exports["."]` for `defineSitemapConfig`, a separate `bin` entry for the CLI, `tsup.config.ts`, `CHANGELOG.md`, `README.md`). `rasengan` becomes a `peerDependency` (needed for the new exports from §2), not a `dependency`, matching how `@rasenganjs/vercel`/`@rasenganjs/netlify` already declare it.

## 6. Redirect cross-referencing

`AppConfig.redirects` returns `Promise<Redirect[]>` (`{ source, destination, permanent }`). Step 5 loads this the same way `rasengan.config.js` itself is loaded (already required to read `config.json`'s equivalents during the build; the redirects function itself isn't serialized into `config.json` today, so this needs `rasengan.config.js` to also be dynamically imported by the CLI, a detail to confirm feasible in Phase 1 rather than assumed).

---

# Migration Phases

**Phase 1: Core additive export + package scaffold**
Add `generateRoutes`/`getAllRoutesPath` to `rasengan`'s public exports (§2). Scaffold `packages/ecosystem/sitemap/` with the CLI, config loader, and the core pipeline (Proposed Architecture steps 1-7), for `prerender` mode first (the mode where `getAllRoutesPath()` is already proven correct via `preRenderApp()`'s own usage). Verification: a real playground app (SSG mode), `rasengan build && rasengan-sitemap`, assert the generated `sitemap.xml` matches the actual `static/` output's URL set exactly, and that no `_api/` or `*` path leaks in.

**Phase 2: SSR and SPA modes, redirect exclusion**
Extend to `ssr`/`spa` output-directory selection (step 7's other two branches). Add the redirect cross-referencing (§6). Verification: same playground, `ssr: true` and `prerender: false`, plus a redirect entry, confirm the redirect's source path is absent from the sitemap.

**Phase 3: `robots.txt` generation, docs, and un-flagging the "coming soon" nav entry**
`generateRobotsTxt` option. Docs-v2 gets a real page (replacing the `isComingSoon: true`/`link: '#'` nav placeholder in `packages.tsx`), and the "coming soon" blog post line becomes an actual working link. Dogfood on docs-v2 itself, replacing the manually-generated `public/sitemap.xml` (currently produced by a third-party online tool per its own header comment) with the real package's output.

**Phase 4 (tracked, not scheduled): sitemap index files, i18n hreflang**
Only taken up if a real site actually needs the 50k-URL sitemap index format, or if `@rasenganjs/i18n` adoption creates real demand for hreflang annotations. No design work here yet, intentionally.

---

# Open Questions

- **Where does `rasengan.config.js`'s `redirects()` get safely re-invoked from the CLI** (§6)? It's an async function, potentially with side effects if written carelessly by a user; confirm the same dynamic-import mechanism `rasengan build` itself uses is safe to reuse from a separate post-build process, or whether redirects need to be serialized into `config.json` at build time instead (a small, separate additive change to `rasengan()`'s own `closeBundle` if so, worth deciding before Phase 2 rather than during it).
- **Should Phase 4's automatic `rasengan()` inline hook ever happen?** This RFC deliberately avoids it (Non-goals) for the hook-ordering reason, but if enough users find `&& rasengan-sitemap` friction-y, revisiting is fair, tracked here rather than silently reconsidered later.
- **i18n hreflang** (deferred, Non-goals): needs research into `@rasenganjs/i18n`'s actual URL convention (locale prefix shape, default-locale handling) before any design is possible. Not blocking v1, but worth a dedicated follow-up RFC if `@rasenganjs/i18n` adoption grows.
- **Exact npm package name for the CLI bin** (`rasengan-sitemap` assumed throughout this RFC, matching `rasengan-serve`'s naming convention). Confirm no collision, no strong reason to expect one.
