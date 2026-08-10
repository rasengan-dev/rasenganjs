# RFC 0010 — Automatic Server-Side Environment Variable Loading

**Status:** Draft
**Author:** Rasengan.js Core Team
**Date:** 2026-08-10

## Executive Summary

`.env*` file loading already exists in the ecosystem — a zero-dependency parser in `@rasenganjs/futon` (`src/env/index.ts`) and Node/Bun-specific file loaders in `@rasenganjs/runtime` (`loadNodeEnvFiles`/`loadBunEnvFiles`) — but it doesn't actually solve the problem it looks like it solves. Two bugs compound:

1. **Wrong bag.** `Futon.loadEnv(vars)` (`futon/src/app/index.ts:107-108`) only merges into the app instance's own `env` property (`app.env` / `ctx.runtime.env`). It never touches `process.env`. Any code using the standard `process.env.X` idiom — the user's own code, and every third-party library (`pg`, `mysql2`, Stripe/AWS SDKs, ...) — sees `undefined` regardless of whether `.env` files were loaded.
2. **Wrong timing.** Even where `app.loadEnv()` runs, it happens inside `adapter.serve()`, called from `bootstrap()` — after the user's entire module graph has already been imported and evaluated by Node's ESM loader. Module-scope reads of `process.env` (a very common pattern, e.g. `const url = process.env.DATABASE_URL` in a provider) never see the loaded values no matter when loading happens later.

On top of both bugs, one surface has **no loading at all**: `rasengan dev`'s in-process dev server (`packages/framework/rasengan/src/server/dev/server.ts`) never calls any env loader, so `_api/` routes (RFC-0008) get nothing.

This RFC proposes fixing both bugs at their root — writing into `process.env`/`Bun.env` directly, and moving the loading point earlier than any user code — reusing the existing Futon/`@rasenganjs/runtime` parser exclusively. Per author decision: **no new configuration surface**, and **client-side env exposure is explicitly out of scope** — `rasengan`'s Vite config already handles that via `envPrefix: 'RASENGAN_'` (`core/config/vite/defaults.ts:188`) and is untouched by this RFC.

---

# Motivation

## Bug 1 — `app.loadEnv()` never reaches `process.env`

```ts
// futon/src/app/index.ts
loadEnv(vars: EnvironmentMap): this {
  this.env = { ...this.env, ...vars };
  return this;
}
```

This is by design at the Futon layer — Futon is zero-dependency and WinterCG-portable, so it deliberately knows nothing about `process`/`Bun.env`/filesystems. That's correct for Futon itself. But nothing _above_ Futon currently bridges `app.env` back into the real process environment on runtimes that have one (Node, Bun), so the bridge is simply missing.

## Bug 2 — even when it runs, it runs too late

- `packages/platform/runtime/src/adapters/node/dev.ts:81` and `prod.ts:117` call `app.loadEnv(await loadNodeEnvFiles(...))` inside `serve(app, options)` — which receives an **already-constructed** `Futon` app. Building that app means the user's `main.ts`/modules/providers were already imported by the time `serve()` runs.
- Bun's `dev.ts`/`prod.ts` mirror this exactly.
- Workerd's adapter never calls `loadEnv` at all (no filesystem at runtime — see Non-goals).

## The uncovered surface — `rasengan dev`'s `_api/` routes

`packages/framework/rasengan/src/server/dev/server.ts` builds its own `http.createServer` by hand to integrate with Vite's middleware (explicitly _not_ routed through `NodeDevAdapter.serve()`, per its own comments). It never calls `loadNodeEnvFiles`/`app.loadEnv()` at all — this is the exact gap the reporting conversation hit: `_api/` route handlers in dev have zero env, full stop, not even into the wrong bag.

## Why this matters more than it looks

This fails **silently**. There's no thrown error, no warning — just `undefined` where a string was expected, which then surfaces three or four layers away (a DB client rejecting a connection, a fetch call hitting the wrong URL) with no obvious link back to the cause. This is exactly the kind of failure that's hardest for newcomers to debug, which matters given Rasengan's audience includes students and first-time full-stack developers.

---

# Goals

- `process.env` (Node) / `Bun.env` (Bun) populated from `.env*` files **before any user application code is imported or evaluated**, on every surface: `rasengan dev` (including `_api/`), `rasengan build`'s prerender/SSG step, `rasengan-server` (`dev`/`start`/`build --dry-run`, both `node` and `bun` presets), and `rasengan-serve`.
- Real, already-set environment variables (shell, CI, platform dashboard secrets on Vercel/Netlify) **always win** over `.env*` file values — files only fill gaps, never override.
- Reuse the existing Futon/`@rasenganjs/runtime` parser and file-precedence convention (`.env` → `.env.local` → `.env.{mode}` → `.env.{mode}.local`) exclusively. **Do not** introduce Vite's `loadEnv` into this path — that's a separate, already-solved mechanism for client-exposed (`RASENGAN_`-prefixed) variables.
- **Zero new configuration surface.** No `envDir`, `envMode`, or any other new field on `AppConfig`/`RasenganServerConfig`. Convention only: project root (`process.cwd()`), same four filenames, same precedence order already implemented.
- Keep `Futon.env`/`ctx.runtime.env` exactly as it is today, as a secondary, runtime-portable access point (useful for ecosystem library code like `@rasenganjs/drizzle`, and the only mechanism available at all on Workerd). This RFC does not change that API — it fixes what feeds `process.env` alongside it.

## Non-goals

- **Client-side env exposure** (`import.meta.env`, the `RASENGAN_` prefix convention) — already solved by Vite's own `envPrefix`, explicitly out of scope per author direction.
- **Cloudflare Workers / bindings-based env** — no filesystem, no `.env` files, a fundamentally different mechanism (`wrangler.toml` bindings → the `env` argument of `fetch(request, env, ctx)`). Tracked separately under RFC-0009 (whose Workerd adapter doesn't currently wire `env` into `RuntimeContext` at all — a related but distinct gap).
- **Any new config field.** Explicitly rejected by the author.
- **Rewriting the Futon/`@rasenganjs/runtime` parser.** The existing hand-rolled `.env` parser stays as the single source of parsing logic; this RFC only changes _what happens with_ its output and _when_ it runs.

---

# Proposed Architecture

The fix has two independent halves that apply together everywhere:

```
Half A — write into process.env/Bun.env, not just app.env
  loadNodeEnvFiles()/loadBunEnvFiles() (existing, @rasenganjs/runtime)
    → merge in precedence order (existing behavior, unchanged)
    → NEW: assign each key into process.env/Bun.env, skipping any key
      already present (real env always wins)
    → return the merged map, same as today, still fed into app.loadEnv()

Half B — move the call site earlier than user code, per surface
  Child-process surfaces (rasengan-server dev/start/build --dry-run):
    parent CLI process loads env BEFORE spawn() → forwarded via the
    `env` object already passed to spawn() → child's process.env is
    correct from its very first evaluated line, no reordering needed
    inside the child at all.

  In-process surfaces (rasengan dev, rasengan build):
    load env at the top of the CLI command handler, before Vite's dev
    server / prerender pipeline is created — i.e. before anything
    could lazily import a user route/_api module.

  Already-lazy surfaces (rasengan-serve):
    createRequestHandler()'s dynamic import() only runs on the FIRST
    incoming request, well after adapter.serve() → app.loadEnv() has
    already run. Ordering is already correct here — this surface only
    needed Half A.
```

---

# Detailed Design

## 1. Centralize the `process.env`/`Bun.env` write in the existing loaders

`loadNodeEnvFiles(rootDir, mode)` (`packages/platform/runtime/src/adapters/node/env.ts`) and `loadBunEnvFiles` (Bun equivalent) already parse and merge the four files in the correct precedence order. Extend both, in one place each, to also assign into the real environment object as a side effect before returning:

```ts
// packages/platform/runtime/src/adapters/node/env.ts
export async function loadNodeEnvFiles(
  rootDir: string,
  mode: string
): Promise<EnvironmentMap> {
  const merged = /* existing parse + merge logic, unchanged */;

  for (const [key, value] of Object.entries(merged)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return merged; // unchanged return shape — app.loadEnv(merged) still works
}
```

Same shape for `loadBunEnvFiles`, writing into `Bun.env` (Bun aliases `process.env`, but being explicit matches the existing Node/Bun split already present in every other adapter file). This is the single change that fixes Bug 1 everywhere the loaders are already called — no call-site changes needed for that half.

## 2. `rasengan-server`'s child-spawning CLI commands (dev / start / build --dry-run)

All three commands (`packages/framework/rasengan-server/src/cli/{dev,start,build}.ts`) already build one shared `env`/`opts.env` object passed identically to every `spawn()` branch (`node`/`bun`/`tsx`/`npx`). This is the ideal, already-existing insertion point — the fix is purely additive to that object, no new spawn logic:

```ts
// dev.ts / start.ts — same shape, illustrative
const loadedEnv = await loadNodeEnvFiles(process.cwd(), mode);

const env = {
  ...loadedEnv,      // lowest precedence — file values fill gaps only
  ...process.env,    // real env (shell, CI) always wins
  NODE_ENV: '...',   // existing explicit overrides, unchanged
  RASENGAN_SERVER_PORT: ...,
  // ...
};
```

Because this runs in the **parent** process before `spawn()`, and `spawn()`'s `env` option becomes the child's _entire_ environment from its first line of code, this resolves Bug 2 for all three commands — Node and Bun presets alike, since (per current code) both branches already share the same `env` object.

`mode` here: `'development'` for `dev.ts`, `'production'` for `start.ts` and `build.ts`'s dry-run — matching the modes those loaders already use today inside the runtime adapters, no new mode concept introduced.

## 3. `rasengan dev` — the currently-uncovered surface

In `packages/framework/rasengan/src/server/dev/server.ts` (or the CLI `dev` command that constructs it — exact placement is an implementation detail to confirm during review), call `loadNodeEnvFiles(process.cwd(), 'development')` once, at the very top, **before** the Vite dev server is created. `rasengan` already depends on `@rasenganjs/runtime` (it already imports `incomingToRequest`/`writeNodeResponse` from `@rasenganjs/runtime/adapters/node`), so this is a new import from an existing dependency, not a new package dependency.

Because Vite's SSR module graph (`_routes/`, `_api/`) is only ever loaded lazily, per-request, via `ssrLoadModule`, loading env before the dev server is constructed guarantees it's in place before any user route or `_api` handler is ever imported — this directly closes the gap the motivating report described.

## 4. `rasengan build`'s prerender/SSG step

`preRenderApp()` renders every static route at build time, potentially executing `generatePaths()`/`loader()` functions that call external APIs needing secrets (e.g. a CMS API key). Load env with mode `'production'` at the start of the build pipeline, before prerendering begins — `rasengan build` has no `--mode` flag today, so this is unconditional, matching Vite's own default behavior for `vite build`.

## 5. `rasengan-serve` — no call-site change needed

`packages/deploy/serve/cli.ts` already calls `createRequestHandler()` once at startup (returns a closure; the dynamic `import()` of the user's built router happens _inside_ that closure, on first invocation) and calls `adapter.serve(app, ...)` — which runs `app.loadEnv()` — before any request can arrive. Once Half A (§1) is in place, this surface is fixed automatically: no code here needs to change.

## 6. Precedence rule

Implemented once, inside the centralized loaders (§1): `process.env[key] === undefined` guards every assignment. A value already present in the real process environment — whether set by the shell, CI, or injected by the hosting platform (Vercel/Netlify inject configured secrets directly into `process.env` for their Node functions) — is never overwritten by a `.env*` file's value.

## 7. Verification checkpoint, not a new mechanism

Confirm (via a build-output inspection test, not new production code) that `.env*` files are never copied into `dist/`, `.vercel/output/`, or `.netlify/`'s function bundles by any of `copyStaticFiles`/`copyServerFiles` in `@rasenganjs/vercel`/`@rasenganjs/netlify`. These already only copy already-built `dist/client`/`dist/server` directories, not the raw project root, so this is expected to already be safe — worth an explicit regression test rather than new code, precisely because a silent regression here would leak secrets.

---

# Migration Phases

**Phase 1 — Centralize the `process.env`/`Bun.env` write (Bug 1)**
Extend `loadNodeEnvFiles`/`loadBunEnvFiles` per §1. This alone fixes `rasengan-serve` and (partially — still subject to Bug 2) `rasengan-server`'s existing `app.loadEnv()` call sites, with no other code changes. Verification: unit tests on the loaders asserting `process.env`/`Bun.env` gets populated, real-env-wins precedence, and that the returned map shape is unchanged (no regression for existing `app.loadEnv(merged)` callers).

**Phase 2 — Fix ordering for `rasengan-server`'s spawning commands (Bug 2, part 1)**
Wire the parent-process load into `dev.ts`/`start.ts`/`build.ts`'s existing shared `env` object per §2. Verification: a playground app (`rasengan-server`, node and bun presets) with a provider reading `process.env.X` at module scope, confirmed working in `dev`, `start`, and `build --dry-run`.

**Phase 3 — Cover `rasengan dev`'s `_api/` gap and `rasengan build`'s prerender step (Bug 2, part 2 + the uncovered surface)**
§3 and §4. This is the change that directly fixes the motivating report. Verification: an `_api/` route in `apps/playground/api-routes-demo` (or a new minimal playground) reading `process.env.X`, confirmed working under `rasengan dev` with no manual `dotenv` usage.

**Phase 4 — Verification + docs**
The security regression test from §7, plus a new subsection under docs-v2's Configuring section documenting the convention (file precedence, "real env always wins," and the explicit non-goal that this doesn't touch client-side `RASENGAN_`-prefixed variables, which stay under Vite's existing mechanism).

---

# Open Questions

- **Exact insertion point in `rasengan dev`** — inside `server/dev/server.ts` itself, or in the CLI `dev` command that constructs it (`packages/framework/rasengan/src/cli/index.ts`)? Both work given Vite's lazy SSR loading; the choice is about keeping the loading point visible/testable rather than buried, and should be settled during implementation review rather than guessed here.
- **Do the runtime adapters' own `app.loadEnv()` calls become redundant once §2's parent-process forwarding is in place for `rasengan-server`?** Proposal: keep them — they're harmless once real env already wins (§6 skip-if-set applies there too), and they remain the _only_ mechanism for anyone using `@rasenganjs/runtime`'s adapters directly, without going through the `rasengan-server` CLI at all.
- **Bun's `Bun.env` vs `process.env`** — Bun aliases `process.env` to the same underlying object, so writing to one should be visible via the other; worth an explicit test rather than an assumption before Phase 1 is considered done.
