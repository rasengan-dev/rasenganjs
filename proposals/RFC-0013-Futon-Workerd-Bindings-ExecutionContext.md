# RFC 0013 - Workers Bindings and ExecutionContext for Futon on Workerd

**Status:** Implemented (Phase 1: 2026-08-15, Phase 2: 2026-08-15)
**Author:** Rasengan.js Core Team
**Date:** 2026-08-15

## Executive Summary

`WorkerdProdAdapter.fetchHandler` currently forwards only `request` to `Futon.fetch()`. Cloudflare calls an exported Workers handler with three arguments, `fetch(request, env, ctx)`, so `env` (the bindings object: D1, R2, KV, service bindings, secrets) and `ctx` (`ExecutionContext`, `waitUntil`/`passThroughOnException`) are silently dropped today. A Futon app deployed on workerd cannot currently read a single binding.

`Futon.fetch(request, runtime: RuntimeContext)` already has a slot built for exactly this, `RuntimeContext.env`, but it is typed `Record<string, string>`, which fits `process.env` and not a live binding object like a `D1Database` instance. `RuntimeContext` also has no concept of `ExecutionContext` at all, so `ctx.waitUntil(...)` (needed for fire-and-forget work like emitting usage-metering events without delaying the response) has nowhere to live.

This RFC closes both gaps in two phases: Phase 1 wires the adapter correctly and widens the existing types just enough to be functionally correct (untyped `unknown` bindings). Phase 2 makes `Env` a first-class generic threaded through `Context`/`Futon`/`Handler`, the same shape Hono exposes as `c.env`, so a project can declare its own `Bindings` type once and get full autocomplete everywhere `ctx.runtime.env` is read.

---

# Motivation

## The adapter drops two of three arguments Cloudflare gives it

```ts
// packages/platform/runtime/src/adapters/workerd/prod.ts (current)
this.fetchHandler = (request: Request) => app.fetch(request);
```

and the service-worker path:

```ts
private async handleEvent(event: FetchEvent): Promise<Response> {
  if (this.closed || !this.app) return new Response('Server closed', { status: 503 });
  return this.app.fetch(event.request);
}
```

Neither path ever reads `env` or `ctx`. Every binding declared in a deployed script's metadata (the exact mechanism confirmed against Cloudflare's own `workers-for-platforms-example` reference project, where bindings are injected per-script at upload time) is unreachable from inside a Futon handler.

## `RuntimeContext.env` is typed for the wrong shape

```ts
// packages/framework/futon/src/context/types.ts, line 20
export interface RuntimeContext {
  env?: Record<string, string>;
  ...
}
```

A `D1Database`, an `R2Bucket`, a `KVNamespace`, a Workers-for-Platforms dispatcher binding, none of these are strings. Even after Phase 1's adapter fix, this type would reject or silently mistype every real binding.

## `ExecutionContext` has no home in `Context` at all

The Router Worker sketched earlier in this project's architecture work needs `ctx.waitUntil(...)` to emit a usage-metering event without delaying the response to the caller. `RuntimeContext` has no field for this today, on any adapter, not just Workerd.

## The Service Worker format cannot carry bindings by design, not by bug

Cloudflare Workers has two export shapes. The Service Worker format (`addEventListener('fetch', ...)`, `WorkerdProdAdapter`'s current default) predates bindings-as-arguments and never receives `env` as a function parameter. The Module Worker format (`export default { fetch(request, env, ctx) }`, `WorkerdProdAdapter`'s `passthrough: true` mode) is the only shape that receives `env` at all. This means Phase 1's fix is only reachable through `passthrough: true`, fixing the default `addEventListener` path is not an option because the platform itself does not pass bindings that way.

This is not a new problem this RFC introduces. RFC-0009 (`@rasenganjs/cloudflare`) already independently converged on `new WorkerdProdAdapter({ passthrough: true })` for its generated Worker entry point (`proposals/RFC-0009-Cloudflare-Workers-Adapter.md`, "Detailed Design" §3), and separately describes `WorkerdProdAdapter` as "a solved problem; nothing here needs to change" in its Motivation section. Both are consistent: RFC-0009's SSR use case never reads a binding, so the gap this RFC closes was invisible to it. This RFC does not revisit RFC-0009's scope, it closes the gap RFC-0009 didn't need to exercise.

---

# Goals

- `WorkerdProdAdapter` forwards `env` and `ctx` from workerd into Futon's `RuntimeContext` on every request, in both `passthrough` and service-worker registration paths (the latter documented as bindings-incapable rather than silently broken, see Non-goals).
- `passthrough: true` becomes the documented, recommended mode for any Futon app that needs bindings, since it is the only mode workerd supports for this.
- `RuntimeContext.env` accepts arbitrary binding values, not just strings, without breaking existing Node/Bun consumers that only ever put strings in it.
- `ctx.waitUntil(...)` (and `passThroughOnException()`) works uniformly across Node, Bun, and Workerd, backed by the real `ExecutionContext` on Workerd and a fire-and-forget stub elsewhere.
- Phase 2 (opt-in, additive): `Env` becomes a generic parameter on `Context`, `Futon`, and the route handler types, so `new Futon<Bindings>()` gives `ctx.runtime.env` full autocomplete, matching Hono's `c.env` ergonomics.

## Non-goals

- Making the Service Worker (`addEventListener`) registration path bindings-capable. It cannot be, on any Workers project, by platform design. This RFC documents the limitation and steers users to `passthrough: true` instead of trying to work around it.
- Generating a project's `Bindings` type automatically from `wrangler.jsonc` (the equivalent of `wrangler types`) or from a BaaS project's schema. Real, useful, explicitly out of scope for this RFC, a natural follow-up once Phase 2 ships.
- Changing anything about Node/Bun request handling beyond adding the `waitUntil` stub. Their adapters already have no bindings concept and none is being added.
- Retrofitting every existing Futon app to declare a typed `Bindings` type. Phase 2's default (`Env = Record<string, unknown>`) keeps `new Futon()` compiling unchanged.

---

# Detailed design

## Phase 1 - runtime wiring (non-generic, ships first)

**`RuntimeContext` and a new `ExecutionContext` type**, `packages/framework/futon/src/context/types.ts`:

```ts
export interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException?(): void;
}

export interface RuntimeContext {
  env?: Record<string, unknown>; // widened from Record<string, string>
  executionCtx?: ExecutionContext; // new
  server?: ServerInfo;
  assets?: Assets;
}
```

**`WorkerdProdAdapter`**, `packages/platform/runtime/src/adapters/workerd/prod.ts`:

```ts
this.fetchHandler = (
  request: Request,
  env?: unknown,
  ctx?: WorkerdExecutionContext
) =>
  app.fetch(request, {
    env: (env ?? {}) as Record<string, unknown>,
    executionCtx: ctx
      ? {
          waitUntil: (p) => ctx.waitUntil(p),
          passThroughOnException: () => ctx.passThroughOnException?.(),
        }
      : undefined,
  });
```

The service-worker path (`handleEvent`) keeps working exactly as it does today, since `FetchEvent` has its own `waitUntil`/`respondWith` and no `env` to forward, but its doc comment gets an explicit note: bindings are not available here, use `passthrough: true` if the app reads `ctx.runtime.env`.

**`passthrough` becomes the default** (`WorkerdProdAdapterOptions.passthrough` default flips from `false` to `true`). This is the one behavior change existing consumers of `WorkerdProdAdapter` will observe, see "Breaking change and migration."

**Node/Bun adapters** gain the same `executionCtx` field, backed by a stub:

```ts
executionCtx: {
  waitUntil: (p) => { p.catch((err) => console.error('[futon] waitUntil rejected:', err)); },
}
```

so `ctx.waitUntil(...)` is safe to call from portable middleware regardless of which adapter is running underneath.

## Phase 2 - typed `Env` generic (additive, opt-in)

Mirrors Hono's `c.env`, but flatter: Hono splits its generic into `{ Bindings, Variables }`; this RFC proposes only a `Bindings`-equivalent (`Env`), since Futon's `state` bag (the `Variables`-equivalent) is already untyped and orthogonal, adding it to the same generic is a separate, later decision, not bundled here.

```ts
// context/types.ts
export interface RuntimeContext<Env = Record<string, unknown>> {
  env?: Env;
  executionCtx?: ExecutionContext;
  server?: ServerInfo;
  assets?: Assets;
}

export interface Context<
  Env = Record<string, unknown>,
  Body = any,
  Params = Record<string, string>,
  Query = QueryParams,
> {
  ...
  runtime: RuntimeContext<Env>;
  ...
}
```

```ts
// app/index.ts
export class Futon<Env = Record<string, unknown>> {
  async fetch(request: Request, runtime: RuntimeContext<Env> = {}): Promise<Response> { ... }

  get<Path extends string>(path: Path, handler: Handler<Env, Path>): this { ... }
  post<Path extends string>(path: Path, handler: Handler<Env, Path>): this { ... }
  // same pattern for put/patch/delete/use/etc.
}
```

```ts
// types.ts
export type Handler<
  Env = Record<string, unknown>,
  Params = Record<string, string>,
> = (ctx: Context<Env, any, Params>) => Response | Promise<Response>;
```

Every default is `Record<string, unknown>`, so `new Futon()` and untyped handlers keep compiling exactly as they do today. A project that wants typed bindings opts in once:

```ts
type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
};

const app = new Futon<Bindings>();

app.get('/products', async (ctx) => {
  const rows = await ctx.runtime.env.DB.prepare('select * from products').all();
  return ctx.res.json(rows);
});
```

The adapter side does not need its own generic parameter. `WorkerdProdAdapter.serve(app)` can stay as written today, since `app: Futon<Env>` already carries `Env`, TypeScript infers it at the call site through `app.fetch`'s own signature.

---

# Alternatives considered

**Keep the Service Worker format as the default and only document the limitation.** Rejected. It defeats this RFC's stated goal (bindings actually reachable from a deployed Futon app) for the common case, forcing every caller to remember to pass `passthrough: true` themselves.

**Hono's two-slot `{ Bindings, Variables }` Env shape, adopted wholesale.** Rejected as the primary design, noted as a future option. Futon's `state` bag already exists, independently typed (`Record<string, unknown>`), and works today. Bundling it into the same generic as bindings is a bigger, separate API change with its own tradeoffs (every `ctx.set`/`ctx.get` call site would need updating to stay type-safe) that this RFC does not need in order to close the bindings gap.

**Make `WorkerdProdAdapter` itself generic (`WorkerdProdAdapter<Env>`).** Rejected. Adds a type parameter that has to be repeated at the adapter construction site for no benefit, since `serve(app)` already receives a fully-typed `app` and TypeScript infers through it.

---

# Breaking change and migration

**`WorkerdProdAdapterOptions.passthrough` default flips from `false` to `true`.** Anyone constructing `new WorkerdProdAdapter()` today without an explicit `passthrough` option and relying on the `addEventListener` registration behavior will see a change: they now need `export default { fetch: adapter.fetchHandler }` in their entry file instead of relying on the adapter registering the listener itself. Given `@rasenganjs/runtime` is pre-1.0 (matches the versioning stance already taken in RFC-0012) and RFC-0009's own generated Worker entry already hardcodes `passthrough: true`, the only realistic caller affected is a hand-rolled workerd entry point outside `@rasenganjs/cloudflare`. Documented in the CHANGELOG as a beta breaking change, not a major version bump.

**`RuntimeContext.env` type widen from `Record<string, string>` to `Record<string, unknown>` (Phase 1) then to a generic `Env` (Phase 2).** Not breaking for read access (`unknown` is a superset of `string`), existing code that assumed string values without narrowing will need a type guard or cast, which is the correct behavior for code that is about to receive non-string bindings anyway.

---

# Testing

- `WorkerdProdAdapter.fetchHandler(request, env, ctx)`: `env` and `executionCtx.waitUntil` both reach the handler inside `Futon.fetch()`, verified with a mock `env` object and a mock `ExecutionContext`.
- `passthrough: true` is the default: constructing `new WorkerdProdAdapter()` with no options exposes `fetchHandler` without requiring the option.
- Node and Bun adapters: `ctx.waitUntil(promise)` does not throw and does not block the response; a rejected promise passed to `waitUntil` is caught and logged, not thrown.
- Phase 2: a `Futon<Bindings>()` instance's route handler receives `ctx.runtime.env` typed as `Bindings`, verified with a `tsc`-level type test (no `any` leak), alongside a runtime test that the actual bound value passed through the adapter is the exact object handed to `env`.
- Regression: existing Node/Bun `RuntimeContext.env` consumers (currently string-only) keep passing unchanged.

---

# Open questions

- Should Phase 2's `Env` generic eventually also cover `state` (Hono's `Variables` slot), or stay bindings-only indefinitely? Left open, not blocking Phase 1 or Phase 2 as scoped here.
- Should `@rasenganjs/cloudflare` (RFC-0009) or a future BaaS-side CLI own generating a project's `Bindings` type from `wrangler.jsonc` or a schema file, once Phase 2 ships? Noted as a natural follow-up, not decided here.

---

# As implemented

Both phases shipped 2026-08-15, on branch `feat/futon-workerd-bindings`. Two real deviations from this RFC's original sketch, both found while implementing, neither changing the outcome for a caller:

**`Env` is the last type parameter on `Context`, not conceptually "first."** A grep across the repo before touching the signature found a real, existing 3-positional-argument call site: `packages/framework/rasengan-server/src/router/index.ts`'s `Context<InferBody<S>, InferParams<S>, InferQuery<S>>`. Inserting `Env` anywhere before the existing `Body, Params, Query` triplet would have silently rebound that call site's arguments to the wrong parameters, a breaking change this RFC's Goals explicitly rule out ("Zero public API change" in spirit, no existing 3-arg `Context<...>` caller should need to change). `Context<Body = any, Params = Record<string, string>, Query = QueryParams, Env = Record<string, unknown>>` keeps that call site compiling unchanged; `RuntimeContext<Env>` (single parameter) and the new `Handler<Env, Params>` / `ErrorHandler<Env>` types had no such constraint and use `Env` as their first parameter.

**`Router` and `Middleware`'s internal call sites stay untyped for `Env`, only `Futon`'s own `get`/`post`/`put`/`patch`/`delete`/`head`/`options`/`use`/`notFound`/`fallback`/`onError` are typed.** Making `Router<Env>` generic (and `SubRouter<Env> extends Router<Env>`, and `RouteEntry<Env>`, and `compose()`) to thread `Env` all the way into the radix-tree dispatch internals was judged out of proportion to the goal: that machinery has no code path that reads `ctx.runtime.env` itself, only user handlers do. Instead, `Futon<Env>`'s public methods accept `Handler<Env>`/`Middleware<Env>`-typed callbacks and cast once at the boundary into the router's untyped internals (`handler as unknown as (ctx: Context) => Promise<Response>`). This is sound because `Env` only changes what TypeScript infers for `ctx.runtime.env`, never the actual object at runtime: the same value flows through regardless of which type parameter labeled it at any given point. One consequence, called out in a code comment on the `Futon` class itself: routes registered through `app.group()` on the raw `Router` returned by `getRouter()` do not get a typed `ctx.runtime.env` (they fall back to `Record<string, unknown>`), only routes registered directly through `Futon`'s own methods do. Left as a known, explicit gap rather than a silent one, closing it is the natural next step if `group()`-registered routes turn out to need typed bindings too, not attempted here.

**Verification:** `@rasenganjs/futon` 347/347 tests (2 new for Phase 1's `env`/`executionCtx` on `Futon.fetch()`, 1 new proving Phase 2's typed `ctx.runtime.env` compiles with zero casts inside a handler). `@rasenganjs/runtime` 111/151 (40 skipped, Bun/Workerd-gated, not runnable under plain Node/vitest), 7 new tests across the four Node/Bun adapters and Workerd's `WorkerdProdAdapter` covering `env`/`executionCtx` forwarding and the new `passthrough: true` default. `@rasenganjs/server` (downstream consumer, including the `Context<...>` 3-arg call site above) 118/118 tests unchanged, builds clean. `tsc --noEmit` on all three packages shows only errors confirmed pre-existing on the `docs` base branch via `git stash` comparison, no new errors introduced by either phase.
