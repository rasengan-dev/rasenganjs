# @rasenganjs/runtime

**WinterCG-compatible runtime abstraction layer for Rasengan.js** — a zero-dependency HTTP middleware and routing pipeline built entirely on Web API primitives.

```
npm install @rasenganjs/runtime
```

```
pnpm add @rasenganjs/runtime
```

---

## Overview

`@rasenganjs/runtime` provides the foundational request/response pipeline for Rasengan.js. It is a standalone HTTP framework that:

- **Runs everywhere** — Node.js, Bun, Deno, Cloudflare Workers, and any [WinterCG](https://wintercg.org/)-compatible runtime
- **Zero dependencies** — built on Web API standard primitives (`Request`, `Response`, `ReadableStream`, `Headers`, `URL`, `crypto`)
- **Koa-style onion middleware** — compose middleware in a cascading pipeline
- **Pattern-matched routing** — dynamic segments, optional params, wildcards, catch-all
- **Built-in middleware** — body parsing, CORS, logging, request IDs, compression
- **Adapter pattern** — pluggable adapters for Express and WinterCG runtimes
- **Lifecycle hooks** — observe or intercept requests before/after processing

---

## Quick Start

```ts
import { Application, json, logger, cors } from '@rasenganjs/runtime';

const app = new Application();

// Global middleware
app.use(logger());
app.use(cors());

// Routes
app.get('/api/health', async (ctx) => json({ status: 'ok' }));
app.get('/users/:id', async (ctx) => json({ userId: ctx.params.id }));

// Error handling
app.onError((error, ctx) => {
  return json({ error: error.message }, { status: 500 });
});

// Start with WinterCG (Bun, Deno, Workers)
Bun.serve({ fetch: app.fetch });
```

---

## Package Structure

```
src/
├── index.ts                  # Public API entry — re-exports everything
├── types.ts                  # FetchHandler type
├── app/
│   └── index.ts              # Application — top-level orchestrator
├── context/
│   ├── types.ts              # Context, RuntimeContext interfaces
│   └── index.ts              # createContext() factory
├── middlewares/
│   ├── index.ts              # Middleware type definition
│   ├── compose.ts            # Koa-style onion model composer
│   ├── body.ts               # bodyParser()
│   ├── cors.ts               # cors()
│   ├── logger.ts             # logger()
│   ├── request-id.ts         # requestId()
│   └── compress.ts           # compress()
├── router/
│   ├── index.ts              # Router + SubRouter (groups)
│   └── utils.ts              # matchPath(), parseQueryString()
├── response/
│   ├── index.ts              # Re-exports
│   ├── utils.ts              # json(), text(), html(), redirect(), ...
│   └── cookies.ts            # setCookie(), clearCookie(), serializeCookie()
├── request/
│   ├── index.ts              # getPathname(), getQueryParams(), getQueryParam()
│   ├── body.ts               # parseJson(), parseUrlEncoded(), parseFormData(), ...
│   └── cookies.ts            # parseCookies(), getCookie()
├── adapters/
│   ├── index.ts              # Re-exports
│   ├── express.ts            # toExpressHandler()
│   └── wintercg.ts           # toWinterCgHandler()
├── hooks/
│   └── index.ts              # HookSystem
├── errors/
│   └── index.ts              # HttpError hierarchy
└── runtime-adapter/
    ├── index.ts              # Re-exports
    ├── types.ts              # RuntimeAdapter interface
    └── serve-options.ts      # ServeOptions interface
```

---

## Request Lifecycle

```
Adapter (Node/Bun/Deno/Express/Workers)
  │
  ├── app.fetch(request, runtime)
  │     │
  │     ├── createContext(request, {}, runtime)
  │     │     → ctx.state = {}, ctx.params = {}
  │     │
  │     ├── hooks.emit('beforeRequest', ctx)
  │     │
  │     ├── compose([global middleware, router.middleware()])
  │     │     │
  │     │     ├── middleware[0] (logger)
  │     │     │     next()
  │     │     ├── middleware[1] (cors)
  │     │     │     next()
  │     │     ├── middleware[2] (bodyParser)
  │     │     │     next()
  │     │     ├── router.middleware()
  │     │     │     ├── match → set params → handler → Response
  │     │     │     └── no match → next() → 404 handler
  │     │     │
  │     │     ├── catch(error) → hooks.emit('onError', error, ctx)
  │     │     │     → errorHandler(error, ctx)
  │     │     │
  │     │     ├── hooks.emit('afterResponse', ctx, response)
  │     │     │
  │     │     └── return response
  │
  └── Adapter pipes Response to socket
```

Full lifecycle document: [LIFECYCLE.md](./LIFECYCLE.md)

---

## API Reference

### Application

| Method                                   | Signature                                  | Description                                         |
| ---------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| `use`                                    | `(middleware)` or `(path, middleware)`     | Register global middleware (optionally path-scoped) |
| `get/post/put/patch/delete/head/options` | `(pattern, handler)`                       | Register route for HTTP method                      |
| `group`                                  | `(prefix, options?, callback)`             | Scoped route group with prefix + shared middleware  |
| `getRouter`                              | `() => Router`                             | Access the internal Router instance                 |
| `notFound`                               | `(handler)`                                | Custom 404 handler                                  |
| `onError`                                | `(handler)`                                | Global error handler                                |
| `fetch`                                  | `(request, runtime?) => Promise<Response>` | WinterCG fetch handler                              |

### Router

| Method                                   | Description                                           |
| ---------------------------------------- | ----------------------------------------------------- |
| `use(...middlewares)`                    | Route-level middleware (applies to subsequent routes) |
| `get/post/put/patch/delete/head/options` | Register route                                        |
| `group(prefix, options?, callback)`      | Scoped route group                                    |
| `middleware()`                           | Produce Middleware for the pipeline                   |
| `routesCount()`                          | Number of registered routes                           |

### Path Patterns

| Pattern         | Meaning                  | Example                              |
| --------------- | ------------------------ | ------------------------------------ |
| `/users/:id`    | Required segment         | `/users/42` → `{ id: "42" }`         |
| `/users/:id?`   | Optional segment         | `/users` → `{}`                      |
| `/files/:path*` | Wildcard (multi-segment) | `/files/a/b/c` → `{ path: "a/b/c" }` |
| `/static/*`     | Catch-all                | `/static/foo.js` → `{ _: "foo.js" }` |

### Route Groups

```ts
app.group('/api/v1', { middlewares: [authMiddleware] }, (api) => {
  api.get('/users', listUsers);
  api.post('/users', createUser);
});

// Nested groups
app.group('/api', (api) => {
  api.group('/v1', { middlewares: [auth] }, (v1) => {
    v1.get('/items', getItems);
  });
});
```

### Response Helpers

| Function                              | Description            |
| ------------------------------------- | ---------------------- |
| `json(data, init?)`                   | JSON response          |
| `text(value, init?)`                  | Plain text             |
| `html(value, init?)`                  | HTML with Content-Type |
| `redirect(url, status?)`              | Redirect (default 302) |
| `status(code, body?)`                 | Status-only response   |
| `notFound(body?)`                     | 404 shorthand          |
| `streamResponse(stream, init?)`       | Streaming Response     |
| `nodeStreamToResponse(stream, init?)` | Node stream bridge     |

### Cookies

```ts
// Request
const cookies = parseCookies(request);
const session = getCookie(request, 'session');

// Response
let res = json({ ok: true });
res = setCookie(res, 'session', token, { httpOnly: true, secure: true });
res = clearCookie(res, 'session');
```

### Body Parsing

```ts
// Auto-detect by Content-Type
const body = await parseBody(request);

// Explicit
const json = await parseJson(request);
const form = await parseFormData(request);
const text = await parseText(request);
```

### Built-in Middleware

```ts
app.use(bodyParser({ maxSize: 1024 * 100 })); // 100 KB limit
app.use(cors({ origin: 'https://myapp.com' })); // CORS
app.use(logger({ skip: ['/health'] })); // Request logging
app.use(requestId()); // X-Request-Id
app.use(compress({ threshold: 2048 })); // Compression
```

### Adapters

```ts
// Express
import express from 'express';
const expressApp = express();
expressApp.use(toExpressHandler(app));
expressApp.listen(3000);

// WinterCG (Bun, Deno, Cloudflare Workers)
export default { fetch: toWinterCgHandler(app) };
```

### Lifecycle Hooks

```ts
app.hooks.on('beforeRequest', (ctx) => {
  metrics.increment('requests');
});

app.hooks.on('afterResponse', (ctx, response) => {
  console.log(`${ctx.request.method} → ${response.status}`);
});

app.hooks.on('onError', (error, ctx) => {
  sentry.captureException(error);
});
```

### Error Classes

```ts
throw new NotFoundError();
throw new MethodNotAllowedError();
throw new InternalServerError();
throw new HttpError(429, 'Too Many Requests');
```

---

## Technical Documentation for Maintainers

### Architecture Decisions

**1. Pure Web API, Zero Dependencies**

Every I/O operation uses standard Web API constructors (`Request`, `Response`, `ReadableStream`, `Headers`, `URL`, `crypto`). This guarantees portability across all WinterCG runtimes without polyfills or platform-detection code. The only exception is the Express adapter (`adapters/express.ts`), which bridges Node.js `IncomingMessage` / `ServerResponse` into the Web API world.

**2. Onion Middleware Model**

`compose()` in `middlewares/compose.ts` implements the classic Koa pattern — each middleware runs bidirectional code around `next()`. This is essential for capabilities like:

- **Logger:** Time the request before and after the chain
- **CORS:** Set response headers after the handler produces them
- **Compression:** Compress the response body after it's generated

The implementation uses a recursive `dispatch(i)` with an index guard (`if (i <= index)`) to catch double `next()` calls — a common bug that would otherwise silently skip middleware.

**3. Router as Middleware**

The router is not a separate subsystem — it's the terminal middleware in the global chain. This means all global middleware (CORS, logging, body parsing, auth) runs before route matching, applying uniformly regardless of which route handles the request.

**4. Eager Body Parsing**

The `bodyParser()` middleware consumes the `Request` body immediately and stores the result on `ctx.state`. This is necessary because the body is a single-use `ReadableStream` — once read, it cannot be re-read. Handlers access the parsed body via `ctx.get('parsedBody')` synchronously.

**5. Linear Route Scan**

Routes are matched by iterating the array in registration order. For most applications this is sufficient. A future optimization could replace this with a radix tree without changing the public API — the `Router` class encapsulates the matching logic entirely.

**6. Snapshot-based Middleware Scoping in Groups**

`Router.group()` uses stack depth snapshots to manage route-level middleware scope. When entering a group, the current stack depth is captured. Group middleware is pushed onto the stack, routes are registered (capturing a copy of the current stack), and then the stack is trimmed back to the outer depth. This avoids complex push/pop patterns and makes nested groups deterministic.

**7. SubRouter Delegation Pattern**

`SubRouter` extends `Router` but overrides `add()` to prepend the group prefix and delegate to the parent router. This means all routes ultimately live in a single flat array on the parent — groups are purely a registration-time convenience, with zero runtime overhead.

### Extension Points

- **New built-in middleware:** Add a file to `src/middlewares/`, export a factory function following the `(options?) => Middleware` pattern, and re-export from `src/index.ts`.
- **New adapter:** Add a file to `src/adapters/`, export the conversion function (e.g., `toExpressHandler`), and re-export from `src/index.ts`.
- **New error type:** Add a class extending `HttpError` in `src/errors/index.ts`.
- **New hook:** Add the hook name to the `HookName` type union in `src/hooks/index.ts` and update the Application's `fetch()` method to emit it.

### Testing

**Framework:** Vitest v4 — `pnpm test`, `pnpm test:watch`, `pnpm test:coverage`

**200 tests across 20 files** covering:

| Layer                 | Files                                                                                                                                       | Coverage                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Unit (pure functions) | `compose`, `context`, `errors`, `hooks`, `matchPath`, `parseQueryString`, `json/text/html/redirect`, `cookies`, `parseBody`, `parseCookies` | All edge cases, error paths, option variants                                                                       |
| Middleware            | `bodyParser`, `cors`, `logger`, `requestId`, `compress`                                                                                     | Each option, preflight, skip logic, threshold, fallback                                                            |
| Integration           | `Application.fetch`, `Router`, `compose` chain                                                                                              | Full pipeline: middleware + route + response, 404, error handler, hooks, groups, nested groups, middleware scoping |
| Adapter               | `toExpressHandler`, `toWinterCgHandler`                                                                                                     | Express bridge, Workers/Deno/plain arg styles, env merging                                                         |

### Testing Strategy for New Contributions

1. **Unit tests** for individual functions: `matchPath()`, `parseBody()`, `compose()`, cookie helpers — these are pure functions with no platform dependency.
2. **Integration tests** for the full pipeline: create an `Application`, register middleware + routes, call `app.fetch()` with mock Request objects, assert on the returned Response.
3. **Adapter tests** require a running HTTP server — use a test helper that starts a server on a random port, sends a real HTTP request, and asserts on the response.

### Build System

`tsup.config.ts` produces ESM (`dist/index.js`) and CJS (`dist/index.cjs`) with bundled type declarations (`dist/index.d.ts`). The build is clean — no external dependencies to bundle.

```bash
pnpm build    # rimraf dist/ + tsup
```

### Key Gotchas

- **Never import Node.js modules** in the core (`src/app`, `src/router`, `src/middlewares`, `src/request`, `src/response`). Only the Express adapter (`src/adapters/express.ts`) bridges into Node land.
- **`matchPath()` regex order matters** — optional params (`:param?`) are tested before required ones to avoid false negatives.
- **`compose()` recursion depth** equals the number of middleware functions — no stack overflow concern for typical middleware stacks (<100).
- **`new URL(request.url)` is safe** in all WinterCG runtimes — the URL is the full absolute URL (even when the runtime constructs it from the host header).
- **Response immutability** — Web API Response objects are read-only. Middleware that modifies headers (CORS, requestId, cookies) creates a new Response via `new Response(response.body, { ... })`.
