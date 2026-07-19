# RFC 0005 — HTTP Hot-Path Performance (futon + Node adapter)

**Status:** Draft  
**Author:** Rasengan.js Core Team  
**Date:** 2026-07-19

## Executive Summary

On Node, futon served through `@rasenganjs/runtime` delivers roughly **0.6x** the throughput of Hono on `@hono/node-server` for GET workloads, while being **at parity on Bun** and **at parity on Node for POST + JSON body**. The benchmark evidence localizes the gap into three independent costs, ordered by measured impact:

1. **Eager `Request` construction** in the Node adapter (`incomingToRequest`) — paid on every request, while Hono's node-server defers it and usually never pays it.
2. **Web-stream response pumping** in `startNodeServer` — promise-per-chunk machinery for bodies that are almost always a single small buffer.
3. **Per-request pipeline assembly** in `Futon.fetch` — the middleware chain, a route-tree Map snapshot and several closures are rebuilt on every request.

This RFC proposes fixes for all three in three phases, none changing public API. The `bench/http` suite (RFC-adjacent, already merged) is the acceptance harness: every phase must move the numbers and pass the existing futon/runtime test suites.

---

# Motivation

## Measured baseline (bench/http, 2026-07-19, Node 22.22 / Bun 1.3.8, i7-class laptop)

**In-process dispatch** (mitata — framework overhead only, no sockets):

| Scenario   | futon (Node) | Hono (Node) | futon (Bun) | Hono (Bun) |
| ---------- | ------------ | ----------- | ----------- | ---------- |
| hello      | 26.2 µs      | **17.9 µs** | —           | —          |
| routing    | 21.2 µs      | 21.1 µs     | —           | —          |
| middleware | 20.9 µs      | 21.3 µs     | —           | —          |
| post-json  | 32.5 µs      | **28.6 µs** | **6.5 µs**  | 11.2 µs    |

**HTTP** (autocannon, 100 connections):

| Scenario   | futon+runtime (Node) | Hono+node-server | futon (Bun) | Hono (Bun) |
| ---------- | -------------------- | ---------------- | ----------- | ---------- |
| hello      | 17.9k req/s          | **30.0k**        | 52.2k       | 50.9k      |
| routing    | 17.7k                | **28.7k**        | 50.5k       | 56.4k      |
| middleware | 16.6k                | **27.9k**        | 55.3k       | 55.5k      |
| post-json  | 13.2k                | 13.2k            | 51.0k       | 52.4k      |

## What the pattern proves

- **The gap is mostly not futon.** In-process, futon is within noise of Hono on routing/middleware and ~8 µs behind on hello. Over HTTP the gap explodes to 1.7x — the delta lives in the adapter.
- **post-json is the control group.** It is the one scenario where Hono's node-server must do everything our adapter does (materialize a real `Request`, read the body) — and there the throughput is identical. The GET gap is therefore dominated by work Hono _avoids_ and we _always do_.
- **Bun is the second control group.** `Bun.serve` hands both frameworks a native `Request` for free, and futon is at parity (and 1.7x faster in-process on post-json). The Node conversion layer is the problem, not the pipeline model.

## Where the cycles go

### A. `incomingToRequest` — packages/platform/runtime/src/adapters/node/request.ts

Every request constructs a full undici `Request`: WHATWG URL parse, header-list validation, abort-signal wiring, plus an `Object.entries().filter().map()` triple pass over headers. For non-GET methods the body is **fully buffered** through event listeners, handed to `Request` (which re-wraps it as a stream), then re-read by `ctx.request.json()` — two copies and extra microtask ticks. `@hono/node-server` instead dispatches on a lazy Request shim and only materializes the real object when a handler touches it; on a typical GET it never does.

### B. Response writing — packages/platform/runtime/src/adapters/node/server.ts

Every body — including the ~20-byte payload from `Response.json()` — goes through `body.getReader()` and a recursive promise-per-chunk pump before `res.end()`. Hono's node-server writes static bodies with a single `res.end(buffer)`. At small payload sizes the stream machinery costs more than the actual I/O.

### C. `Futon.fetch` — packages/framework/futon/src/app/index.ts

Per request, today:

- `compose([...this.middlewares, this.router.middleware()])` — a fresh spread array, a fresh composed closure, and `router.middleware()` is a **factory** that clones the route trees (`new Map(this.trees)`) on every call;
- `new URL(ctx.request.url)` in the router middleware (and again in every path-scoped `use()`) just to read `pathname`;
- two awaited `hooks.emit()` calls even when no hooks are registered.

Hono compiles its matcher once on first dispatch and extracts the path with a string scan. This trio is the ~8 µs in-process hello gap.

---

# Goals

- Close the Node HTTP GET gap from ~0.6x to **≥0.85x Hono** on the bench suite; in-process hello from 26 µs to **≤20 µs**.
- **Zero public API change.** `Futon`, `Context`, `startNodeServer`, `incomingToRequest` keep their signatures. Ships as patch/minor releases of `@rasenganjs/futon` and `@rasenganjs/runtime`.
- **Zero observable behavior change**, including: routes/middleware registered after the first request keep working (today's effective semantics), multipart/binary bodies stay byte-exact (RFC-0002 upload paths), WebSocket upgrade path untouched (RFC-0001).
- No Node version floor change (repo already requires ≥22.12).
- `bench/http` is the regression harness; each phase lands with before/after numbers in its PR description.

## Non-goals

- Rewriting the Node HTTP layer on uWebSockets/llhttp or adding HTTP/2 — different RFC if ever.
- Matching `@hono/node-server` byte-for-byte on its lazy-Request internals in one step (Phase 3b is deliberately last and gated).
- Bun/workerd adapter changes — they are already at parity.
- Optimizing `bodyParser`, upload, compression or other middleware internals.

---

# Detailed design

## Phase 1 — futon pipeline caching (`@rasenganjs/futon`)

### 1a. Cache the composed chain

`Futon` gains a private `_chain: Middleware | null` plus a dirty flag. Every registration path (`use()`, the seven verb methods, `group()`, and `Router.add()` via a version counter the app checks) invalidates the cache; `fetch()` rebuilds lazily:

```ts
private _chain: Middleware | null = null;

private chain(): Middleware {
  if (this._chain && !this.router.changedSince(this._routerVersion)) return this._chain;
  this._routerVersion = this.router.version;
  this._chain = compose([...this.middlewares, this.router.middleware()]);
  return this._chain;
}
```

Safety notes:

- `compose()`'s double-`next()` guard keeps its `index` state **inside the returned function's invocation**, so one composed closure is safe across concurrent requests. Verified — no shared mutable state.
- Today the per-request rebuild means late-registered routes are picked up on the next request. The version counter preserves exactly that; the snapshot comment in `Router.middleware()` becomes true for real (one snapshot per version) instead of vacuously true (one snapshot per request).

### 1b. Pathname without `new URL`

Add a `getPathname(url: string): string` fast path in `router/utils.ts`: scan past `"://"`, find the next `/`, slice to the first `?` or `#`. **Fallback rule:** if the sliced segment contains `%` or the URL shape is unusual (no scheme, IPv6 literal edge), fall back to `new URL().pathname` so percent-encoding normalization matches WHATWG exactly. Router middleware and path-scoped `use()` both switch to it; the computed pathname is stashed once on the context (lazy internal field) so scoped middlewares don't re-derive it.

### 1c. Skip empty hook emits

`HookSystem.emit()` returns synchronously (no awaited tick) when no handler is registered for the hook name; `Futon.fetch` guards `beforeRequest`/`afterResponse` emits with a cheap `hooks.has(name)` check.

**Expected effect:** in-process hello 26 µs → ~20 µs; HTTP Node gains proportionally smaller but real.

## Phase 2 — adapter response fast path (`@rasenganjs/runtime`)

> **Amended at implementation time.** The originally proposed two-read strategy (read twice, `res.end(first)` when the second read reports `done`) has a latent TTFB regression: for a _genuinely streaming_ body (SSE), the first chunk would sit unflushed until the second chunk arrives — potentially seconds later. Replaced by an explicit tag that carries zero streaming risk.

futon's `json()` / `text()` / `html()` helpers serialize once and attach the raw payload to the Response they build under `Symbol.for('rasenganjs.response.rawBody')`. The Node adapter checks that symbol:

```ts
const raw = (response as { [RAW_BODY]?: string | Uint8Array })[RAW_BODY];
if (raw !== undefined) {
  res.end(raw); // single-buffer body → one syscall
} else if (response.body) {
  for await (const chunk of response.body) {
    if (!res.write(chunk)) await drain(res); // flush immediately, honor backpressure
  }
  res.end();
}
```

Properties:

- `Symbol.for` (registry symbol) means no import edge from `@rasenganjs/runtime` to futon — any framework/helper can opt in.
- Responses rebuilt by middleware (e.g. `setCookie` constructs a new Response) lose the tag and take the streaming path — always correct, just not fast-pathed.
- Streaming bodies flush every chunk the moment it arrives (SSE-safe, unlike two-read) and now honor `res.write` backpressure, which the old recursive pump did not.
- Header copying drops the intermediate object: iterate `response.headers` directly into `res.setHeader`, with `set-cookie` written from `getSetCookie()` — incidentally fixing multiple cookies being comma-joined into one header line by the old `forEach` copy.
- Mid-stream errors now reach the handler's catch block (the old pump was fire-and-forget); the catch guards on `res.headersSent` before attempting a 500.

**Expected effect:** the larger share of the HTTP GET gap; benches after Phase 2 should show ≥22k req/s on hello.

## Phase 3 — cheaper request construction (`@rasenganjs/runtime`)

### 3a. Stop pre-buffering bodies; cheaper headers (uncontroversial)

- Non-GET/HEAD: pass the socket stream through instead of buffering — `new Request(url, { method, headers, body: Readable.toWeb(req), duplex: 'half' })`. One copy and one event-listener setup disappear; `ctx.request.json()`/upload streaming read directly. Byte-exactness for multipart is preserved (it is the same bytes, just not double-copied) and covered by the existing RFC-0002 upload tests.
- Headers: build from `req.rawHeaders` (flat `[k1, v1, k2, v2, …]` pairs) in a single loop instead of `Object.entries().filter().map()` over the joined-object view. `Headers` handles duplicate keys per spec, including `set-cookie`.

### 3b. Lazy Request shim (gated, last)

The remaining GET cost is the undici `Request` constructor itself. Proposal: an internal `LazyRequest` that carries `method`/`url` as plain fields and materializes a real `Request` behind a getter the first time `headers`, `body`, `clone()` etc. are touched — the Hono technique. Ships **behind an env flag** (`RASENGAN_LAZY_REQUEST=1`) for one beta cycle before becoming the default.

Known hazards, called out for review:

- `ctx.request instanceof Request` must stay true → shim must be `Object.setPrototypeOf`'d onto `Request.prototype` (Hono's approach), not a Proxy.
- Anything that forwards `ctx.request` to `fetch()` or `Response`-related APIs must receive a fully materialized object — the getters guarantee that, but it needs dedicated tests (futon middleware suite + ws upgrade path both touch the request).
- If review finds the risk/benefit unconvincing, 3b is severable — Phases 1–3a stand alone.

---

# Phasing & deliverables

| Phase | Package               | Risk   | Deliverable                                                  |
| ----- | --------------------- | ------ | ------------------------------------------------------------ |
| 1     | `@rasenganjs/futon`   | Low    | chain cache + `getPathname` + hook guard, bench before/after |
| 2     | `@rasenganjs/runtime` | Low    | two-read response fast path, direct header copy              |
| 3a    | `@rasenganjs/runtime` | Medium | streaming request bodies, rawHeaders loop                    |
| 3b    | `@rasenganjs/runtime` | High   | LazyRequest behind env flag → default after one beta         |

Each phase: green `pnpm test` in both packages, full `bench:micro` + `bench:http` (Node and Bun) attached to the PR, no scenario regresses on Bun.

## Success criteria

- hello (HTTP, Node): 17.9k → **≥25.5k req/s** (≥0.85x Hono) after Phase 3a.
- hello (in-process, Node): 26.2 µs → **≤20 µs** after Phase 1.
- post-json (HTTP, Node): no regression (currently at parity).
- All Bun numbers within noise of baseline.

---

# Alternatives considered

- **Adopt `@hono/node-server` as futon's Node bridge.** Rejected: adds a dependency on a competitor's server internals, couples our `RuntimeContext`/WebSocket upgrade path (RFC-0001) to their release cadence, and teaches us nothing we can reuse in the workerd/Bun adapters.
- **Native binding layer (uWebSockets.js).** Out of proportion: license/prebuild friction, and the Bun numbers show the pipeline is fine once conversion is cheap.
- **Do nothing.** The 0.6x headline is what every "framework benchmark" blog post will quote; post-json parity and Bun parity prove the gap is incidental, not architectural — exactly the kind of gap worth closing.

---

# Open questions (feedback wanted)

1. **Phase 3b appetite** — is the lazy-Request shim worth the `instanceof`/materialization risk surface, or do we stop at 3a and accept ~0.85x on synthetic GET benches?
2. **Pathname fallback rule** — is `%`-detection + WHATWG fallback strict enough, or should the fast path also normalize dot-segments (`/a/../b`)? (Node's `req.url` for origin-form requests never contains them post-parse, but proxies can be creative.)
3. **Where should the chain-version counter live** — on `Router` (proposed) or should `Futon` own registration entirely and freeze the router after first request instead? Freezing is simpler but changes today's late-registration semantics.
4. **Bench baseline in CI** — do we want a CI job running `bench:micro` with a generous threshold to catch order-of-magnitude regressions, or keep benches manual?
