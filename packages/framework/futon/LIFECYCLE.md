# Request Lifecycle

This document describes the full request lifecycle of `@rasenganjs/futon`, from the moment a raw HTTP request hits your server to the moment a Response is returned.

## 1. Server Adapter (entry point)

The runtime doesn't own the TCP socket. A **server adapter** creates the standard `Request` and calls `app.fetch()`:

| Runtime                            | Adapter                                                                                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Node** (`http.createServer`)     | Manually reads the IncomingMessage body into a Buffer, constructs `new Request(url, { method, headers, body })`, calls `demo.fetch(request)`, then pipes the Response body back via `res.write()` |
| **Bun** (`Bun.serve`)              | `Bun.serve({ fetch: (req) => demo.fetch(req) })` — Bun gives you a native `Request` directly                                                                                                      |
| **Deno** (`Deno.serve`)            | Same as Bun — `Deno.serve({ port }, (req) => demo.fetch(req))`                                                                                                                                    |
| **Express** (`toExpressHandler`)   | Wraps Express `req`/`res` into a `Request`, calls `app.fetch()`, pipes back                                                                                                                       |
| **WinterCG** (`toWinterCgHandler`) | The raw `fetch` function you'd export for Cloudflare Workers, Deno Deploy, etc.                                                                                                                   |

All adapters end up calling the same thing:

```ts
const response: Response = await app.fetch(request, runtime);
```

---

## 2. `Futon.fetch()` — the orchestrator

**Source:** `src/app/index.ts`

This is the central coordinator. It follows five sequential steps:

### 2a. Create the Context

```ts
const ctx = createContext(request, {}, runtime);
```

The `Context` object bundles everything a handler needs:

```
ctx.request   →  the standard Web API Request
ctx.params    →  path params (filled later by the Router)
ctx.runtime   →  { env } — platform info
ctx.state     →  mutable bag for middleware-to-handler data
ctx.set(k,v)  →  store on state
ctx.get(k)    →  read from state
```

### 2b. Emit `beforeRequest` hook

```ts
await this.hooks.emit('beforeRequest', ctx);
```

Fires any handlers registered via `app.hooks.on('beforeRequest', handler)`.
Hook errors are **swallowed** — they never crash the request.

### 2c. Build and run the middleware chain

```ts
const chain = compose([...this.middlewares, this.router.middleware()]);
```

This is the core of the pipeline. `compose()` chains an array of Middleware functions into the **Koa-style onion model**:

```
Request in
  │
  ▼
middleware[0]    ←  global logger, cors, bodyParser, etc.
  │ next()
  ▼
middleware[1]
  │ next()
  ▼
  ...
  │ next()
  ▼
router.middleware()   ←  route dispatcher
  │ next()            ←  no match → fall through
  ▼
finalHandler          ←  404 handler (user-defined or default)
```

Every middleware calls `next()` to pass control downstream, then runs code **after** `next()` resolves for the "unwind" phase — for example, the logger measures request duration, and CORS sets response headers.

The `finalHandler` wraps `app.notFound()` if set, or returns a plain-text "Not Found" with status 404.

### 2d. Route dispatch

When the chain reaches `router.middleware()`, it performs a **linear scan** through registered routes in registration order:

1. Extract `method` and `pathname` from the Request's URL
2. For each route, check if `method` matches
3. Call `matchPath(route.pattern, pathname)` — returns `null` or a params object
4. If matched:
   - Set `ctx.params` from the match result
   - If the route has **route-level middleware**, compose and run them in a nested onion before the handler
   - Otherwise, call `route.handler(ctx)` directly and return its Response
5. If no route matches, call `next()` to fall through to the 404 handler

`matchPath` converts patterns like `/users/:id/posts/:slug` into a regex and supports:

| Pattern   | Meaning                         |
| --------- | ------------------------------- |
| `:param`  | Required segment                |
| `:param?` | Optional segment                |
| `:param*` | Wildcard (one or more segments) |
| `*`       | Catch-all                       |

### 2e. Error handling

The entire `chain(ctx, finalHandler)` call is wrapped in try/catch:

```ts
try {
  response = await chain(ctx, finalHandler);
} catch (error) {
  await this.hooks.emit('onError', error, ctx);
  // then call this.errorHandler(error, ctx) if set
  // else return plain-text 500
}
```

The `onError` hook fires **before** the error handler, so external monitoring (Sentry, Datadog, OpenTelemetry) can observe the error regardless of how it's handled.

### 2f. Emit `afterResponse` hook

```ts
await this.hooks.emit('afterResponse', ctx, response);
```

Always fires — both success and error paths. Useful for metrics, logging response status, cleanup.

### 2g. Return the Response

```ts
return response;
```

The control flow returns to the adapter, which pipes the body back to the client.

---

## End-to-end flow diagram

```
┌──────────────────────────────────────────────────────────┐
│  Server Adapter                                          │
│  (Node / Bun / Deno / Express / WinterCG)                │
│  Creates Request, calls app.fetch(request, runtime)      │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│  Futon.fetch(request, runtime)                           │
│                                                          │
│  ┌─ 1. createContext(request, {}, runtime)               │
│  │     → ctx.state = {}, ctx.params = {}                 │
│  │                                                       │
│  ├─ 2. hooks.emit('beforeRequest', ctx)                  │
│  │                                                       │
│  ├─ 3. compose([                                         │
│  │       global middleware,                              │
│  │       router.middleware()                             │
│  │     ])                                                │
│  │                                                       │
│  │     ┌──────────────────────────────────────────┐      │
│  │     │  Middleware chain (onion model)          │      │
│  │     │                                          │      │
│  │     │  [0] requestId()                         │      │
│  │     │    → sets X-Request-Id header            │      │
│  │     │  [1] logger()                            │      │
│  │     │    → logs "→ GET /hello"                 │      │
│  │     │  [2] cors()                              │      │
│  │     │    → sets CORS headers                   │      │
│  │     │  [3] bodyParser()                        │      │
│  │     │    → parses body → ctx.state.parsedBody  │      │
│  │     │  [4] router.middleware()                 │      │
│  │     │    → linear route match by method+path   │      │
│  │     │       │                                  │      │
│  │     │       ├─ match → set ctx.params          │      │
│  │     │       │   run route-level middleware     │      │
│  │     │       │   → handler(ctx) → Response      │      │
│  │     │       │                                  │      │
│  │     │       └─ no match → next()               │      │
│  │     │                      → 404 handler       │      │
│  │     └──────────────────────────────────────────┘      │
│  │                                                       │
│  ├─ 4. catch(error) → hooks.emit('onError', error, ctx)  │
│  │     → errorHandler(error, ctx)                        │
│  │     → or default 500 text                             │
│  │                                                       │
│  ├─ 5. hooks.emit('afterResponse', ctx, response)        │
│  │                                                       │
│  └─ 6. return response                                   │
└──────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│  Server Adapter pipes Response body to the TCP socket    │
└──────────────────────────────────────────────────────────┘
```

## Key design decisions

### Onion model

Every middleware can run code before **and** after the downstream chain. This lets a single middleware perform setup (parse body, authenticate) and teardown (log duration, record metrics) in one place.

### Router as middleware

The router is just the last middleware in the global chain. All global middleware (CORS, logging, body parsing, request ID, auth) runs **before** route matching, so they apply uniformly regardless of which route handles the request.

### Eager body parsing

`bodyParser()` consumes the `Request` body in its middleware and stores the result on `ctx.state`. This is the only safe approach because the Request body is a single-use `ReadableStream`. Handlers access it via `ctx.get('parsedBody')` instead of reading the stream themselves.

### Linear route scan

Routes are matched in registration order with a simple loop. For the expected scale of most Rasengan applications this is sufficient. If it becomes a bottleneck, a radix tree or trie can be swapped in without changing the public API.

### Hooks are fire-and-forget

If a hook handler throws, subsequent handlers still run, and the request is unaffected. This prevents a misbehaving monitoring or metrics hook from crashing production traffic. Hook handlers should do their own error handling and never rely on the hook system to catch issues.
