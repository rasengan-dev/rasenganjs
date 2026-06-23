# @rasenganjs/runtime — Agent Guide

## Identity

A **WinterCG-compatible** runtime abstraction layer for Rasengan.js. Zero-dependency HTTP middleware/routing pipeline built entirely on **Web API** primitives (`Request`, `Response`, `ReadableStream`, `Headers`, `URL`). Works in Node, Bun, Deno, Cloudflare Workers, and any WinterCG runtime.

## Package Manifest

- **Package:** `@rasenganjs/runtime` (v1.0.0)
- **Entry:** `src/index.ts` → `dist/index.js` (ESM + CJS + `.d.ts`)
- **Build:** `tsup` (ESM + CJS dual output, `.d.ts` generation)
- **Node:** >=22.12.0, ESM-only (`"type": "module"`)
- **Dependencies:** zero (everything uses Web API built-ins)

## Source Structure

```
src/
  index.ts                          # Public API — re-exports everything
  types.ts                          # FetchHandler type
  app/index.ts                      # Application class (orchestrator)
  context/
    types.ts                        # Context, RuntimeContext interfaces
    index.ts                        # createContext(), createQueryParams()
  middlewares/
    index.ts                        # Middleware type definition
    compose.ts                      # compose() — Koa-style onion model
    body.ts                         # bodyParser() — auto body parsing
    cors.ts                         # cors() — CORS headers
    logger.ts                       # logger() — request logging
    request-id.ts                   # requestId() — unique request IDs
    compress.ts                     # compress() — gzip/brotli/deflate
  router/
    index.ts                        # Router class + SubRouter for groups
    utils.ts                        # matchPath(), parseQueryString()
  response/
    index.ts                        # Re-exports
    utils.ts                        # json(), text(), html(), redirect(), etc.
    cookies.ts                      # setCookie(), clearCookie(), serializeCookie()
  request/
    index.ts                        # getPathname(), getQueryParams(), getQueryParam()
    body.ts                         # parseJson(), parseUrlEncoded(), parseFormData(), etc.
    cookies.ts                      # parseCookies(), getCookie()
  adapters/
    index.ts                        # Re-exports
    express.ts                      # toExpressHandler() — Express bridge
    wintercg.ts                     # toWinterCgHandler() — WinterCG fetch handler
  hooks/
    index.ts                        # HookSystem — beforeRequest/afterResponse/onError
  errors/
    index.ts                        # HttpError, NotFoundError, MethodNotAllowedError, InternalServerError
  runtime-adapter/
    types.ts                        # RuntimeAdapter interface
    serve-options.ts                # ServeOptions interface
    index.ts                        # Re-exports
```

## Architecture & Key Concepts

### Application (orchestrator)

`Application` in `src/app/index.ts` is the top-level entry point. It:

- Maintains a global middleware stack (`use()`)
- Owns an internal `Router`
- Provides `.fetch(request, runtime)` — the WinterCG handler signature
- Supports lifecycle hooks (`beforeRequest`, `afterResponse`, `onError`)
- Configurable 404 and 500 handlers

**Flow inside `fetch()`:**

1. `createContext(request, {}, runtime)` → builds Context
2. Emit `beforeRequest` hook
3. `compose([...middlewares, router.middleware()])` → run onion chain
4. If no route matches → `finalHandler` (404 handler or default text)
5. `try/catch` → emit `onError` hook → error handler
6. Emit `afterResponse` hook
7. Return Response

### Middleware Pipeline (Onion Model)

`compose()` in `src/middlewares/compose.ts` chains middlewares in Koa-style:

- Each middleware calls `next()` to pass control downstream
- Code after `next()` executes on the unwind phase
- `next()` double-call protection (throws error)
- Empty array = pass-through to `next` fallback

### Router

`Router` in `src/router/index.ts`:

- 7 HTTP method shortcuts: `get`, `post`, `put`, `patch`, `delete`, `head`, `options`
- Route-level middleware stack (`.use()` scoped to subsequent routes)
- `group(prefix, callback)` for scoped route groups with prefix and shared middleware
- Nested groups supported via `SubRouter` class
- `.middleware()` produces a single `Middleware` that dispatches by linear scan
- Route-level middleware run in a nested onion before the handler

### Path Matching

`matchPath()` in `src/router/utils.ts` converts patterns to regex:

- `:param` → required segment
- `:param?` → optional segment
- `:param*` → wildcard (greedy, multi-segment)
- `*` → bare catch-all (stored under `_` key)

### Context

`Context` in `src/context/types.ts`:

- `request` — standard Web API `Request`
- `params` — path params set by Router
- `query` — `QueryParams` (callable + indexable object for URL query string)
- `runtime` — `{ env }` platform info
- `state` — mutable bag for middleware ↔ handler data
- `set<T>(key, value)` / `get<T>(key)` — typed state accessors

### Response Helpers (`src/response/utils.ts`)

- `json(data, init?)` — JSON response
- `text(value, init?)` — plain text
- `html(value, init?)` — HTML with Content-Type header
- `redirect(url, status?)` — redirect (default 302)
- `status(code, body?)` — status-only
- `notFound(body?)` — 404 shorthand
- `streamResponse(stream, init?)` — streaming Response for SSR
- `nodeStreamToResponse(nodeStream, init?)` — Node stream → Web Response

### Cookie Handling

- Request: `parseCookies(request)` / `getCookie(request, name)` in `src/request/cookies.ts`
- Response: `setCookie(response, name, value, options?)` / `clearCookie(response, name, options?)` / `serializeCookie(name, value, options?)` in `src/response/cookies.ts`
- `CookieOptions`: domain, path, maxAge, httpOnly, secure, sameSite, expires

### Body Parsing

- `parseJson<T>(request)` — JSON body
- `parseUrlEncoded(request)` — URL-encoded form
- `parseFormData(request)` — multipart/form-data → FormData
- `parseText(request)` — plain text
- `parseBody(request)` — auto-detect by Content-Type

All in `src/request/body.ts`. Body is a single-use `ReadableStream` — consume once.

### Built-in Middleware

| Middleware     | File                        | Purpose                                                                        |
| -------------- | --------------------------- | ------------------------------------------------------------------------------ |
| `bodyParser()` | `middlewares/body.ts`       | Eager body parsing, stores on `ctx.state`, max-size guard, Content-Type filter |
| `cors()`       | `middlewares/cors.ts`       | CORS headers, preflight handling, configurable origin/methods/headers          |
| `logger()`     | `middlewares/logger.ts`     | Request log with method, URL, status, duration; skip paths, custom log fn      |
| `requestId()`  | `middlewares/request-id.ts` | X-Request-Id header read/gen; UUID v4 via `crypto.randomUUID()`                |
| `compress()`   | `middlewares/compress.ts`   | gzip/brotli/deflate via `CompressionStream` (Web API), min-threshold           |

### Adapters

- `toExpressHandler(app, runtime?)` — wraps Express `(req, res, next)`, bridges Node streams → Web streams
- `toWinterCgHandler(app, defaultRuntime?)` — returns `(request, env?, ctx?) => Promise<Response>` for Cloudflare Workers, Bun, Deno

### Hook System (`src/hooks/index.ts`)

Lifecycle hooks: `beforeRequest`, `afterResponse`, `onError`

- Fire-and-forget: handler errors never crash the request
- `on(name, handler)` / `off(name, handler)` / `emit(name, ...args)` / `clear()`
- All handlers run in registration order; async handlers are awaited

### Error Types (`src/errors/index.ts`)

- `HttpError(status, message?)` — base
- `NotFoundError` — 404
- `MethodNotAllowedError` — 405
- `InternalServerError` — 500

### RuntimeAdapter Interface (`src/runtime-adapter/types.ts`)

Platform-agnostic interface that platform packages implement:

- `serve(app?, options?)` — start HTTP server
- `close()` — stop server
- `watch?(path, callback)` — file watching (optional)
- `assets` — get/load/write/delete/list files

## Patterns & Conventions

- **Pure Web API:** Never import Node-specific modules. All I/O uses `Request`, `Response`, `ReadableStream`, `Headers`, `URL`, `crypto`.
- **Context state bag:** Middlewares communicate via `ctx.set()`/`ctx.get()` — never mutate `ctx.request`.
- **One body read:** Request body is a single-use `ReadableStream`. `bodyParser()` consumes it eagerly and stores on `ctx.state`.
- **Eager body parsing:** in `bodyParser()`, body consumed immediately when middleware runs. This is safe because handlers access via `ctx.get(key)`.
- **Router as middleware:** The router is just the last middleware in the global chain — all global middleware runs before route matching.
- **Optional `app.use(path, mw)` prefix:** First arg string = only run middleware for paths starting with that prefix.
- **Scoped middleware with groups:** `router.group("/api", { middlewares: [auth] }, ...)` — middleware applied to all routes in group. Snapshot-based stack depth management.
- **Error hook independence:** `onError` fires before the error handler, so external monitoring (Sentry, Datadog) can observe regardless of handling.
- **Linear route scan:** Routes matched in registration order. Simple loop — no radix tree (yet).
- **No dependencies:** Zero runtime dependencies. Pure Web API everywhere.

## Testing

**Framework:** Vitest v4 (ESM-native, Jest-compatible API, globals enabled)
**Config:** `vitest.config.ts` — Node environment, glob pattern `src/**/*.test.ts`
**Coverage:** V8 provider, excludes index files and type-only files

### Test Structure

```
src/__tests__/
  unit/                           # Pure-function unit tests
    compose.test.ts               # compose() onion model, double-call guard, empty chain
    context.test.ts               # createContext(), set/get, state mutations
    errors.test.ts                # HttpError hierarchy (status, message, instanceof)
    hooks.test.ts                 # HookSystem on/off/emit/clear, error swallowing, async
    middlewares/
      body.test.ts                # bodyParser: JSON, skip methods, maxSize 413, allowedTypes, parse errors
      compress.test.ts            # compress: threshold, content-encoding check, gzip/brotli, fallback
      cors.test.ts                # cors: default *, preflight 204, origin array, credentials, maxAge
      logger.test.ts              # logger: log lines, custom log fn, skip paths, error logging
      request-id.test.ts          # requestId: UUID gen, incoming header, custom header/state/generator
    request/
      body.test.ts                # parseJson, parseUrlEncoded, parseFormData, parseText, parseBody
      cookies.test.ts             # parseCookies, getCookie, URL-encoded, empty header
      index.test.ts               # getPathname, getQueryParams, getQueryParam
    response/
      utils.test.ts              # json, text, html, redirect, status, notFound, streamResponse, nodeStreamToResponse
      cookies.test.ts            # serializeCookie, setCookie, clearCookie, all options
    router/
      utils.test.ts              # matchPath (static, params, optional, wildcard, catch-all), parseQueryString
  integration/                    # Full pipeline tests
    application.test.ts           # Application.fetch(): routes, 404, error handler, hooks, middleware, bodyParser, CORS
    router.test.ts                # Router: method dispatch, params, group prefix/nested, group middleware scoping
    middleware-chain.test.ts      # compose: context state passing, short-circuit, error propagation, 100-mw stack
  adapter/                        # Platform adapter tests
    express.test.ts               # toExpressHandler: Request construction, body write, error passthrough, runtime merge
    wintercg.test.ts              # toWinterCgHandler: Workers/Deno/plain arg styles, env merging, string coercion
```

### Running Tests

```bash
pnpm test              # Single run
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage report
```

### Testing Patterns

- **Mock Contexts:** Tests use `createContext()` factory for real `set`/`get`/`query` behavior — not manual object literals.
- **Content-Length:** Request/Response constructors may not auto-set `Content-Length` in Node. Tests explicitly set it when the production code checks this header (bodyParser maxSize, compress threshold).
- **CompressionStream:** Brotli (`br`) may not be available in all Node builds. Tests check `hasBrotli` before running brotli-specific assertions.
- **Adapter arguments:** WinterCG adapter tests cover three argument styles: Workers `(req, env, ctx)`, Deno `(req, {env, ctx})`, and plain `(req, env)`.
- **Edge cases:** 100-middleware deep stack, `next()` double-call guard, error swallowing in hooks, short-circuit middleware, catch-all paths.
- **Query encoding:** `createQueryParams()` uses `Object.defineProperty` to attach params onto the callable function — avoids conflict with read-only built-in `.name` and `.length` properties when a query key collides.

## Build & Release

```bash
pnpm build                          # rimraf + tsup → dist/
pnpm pack                           # tarball to ./release
pnpm deploy                         # npm publish --access public
pnpm deploy:beta                    # npm publish --tag beta
```
