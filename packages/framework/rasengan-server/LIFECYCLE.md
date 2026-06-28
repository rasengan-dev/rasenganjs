# Request Lifecycle

This document traces an HTTP request through every layer of `@rasenganjs/server`, from the moment it reaches the server until the response is sent.

---

## Phase 1: Server Startup

```
bootstrap(callback)                          User calls bootstrap()
  │
  ├─ new ServerApp()                         Create the application
  ├─ loadConfig()                            Read rasengan.server.js/ts
  ├─ callback(serverApp)                     User registers modules
  │     └─ app.registerModule({...})
  ├─ app.compile()                           ── COMPILATION ──
  │     ├─ new Application()                 Runtime app
  │     ├─ app.use(global middleware)
  │     ├─ app.use(cors)             (if enabled)
  │     ├─ app.onError(handler)
  │     ├─ app.notFound(handler)
  │     ├─ flattenModules(modules)           Depth-first flatten
  │     ├─ container.register(all providers)
  │     └─ for each module:
  │           registerControllers(app, container, mod)
  │             ├─ resolve(ctrl) from container
  │             ├─ (module level) runtimeRouter.group(prefix, {middlewares})
  │             └─ (controller level) runtimeRouter.group({middlewares})
  │                   └─ instance.routes(new Router(ctrlRouter))  ← user registers routes
  │
  ├─ selectAdapter(config)                   Auto-detect Node/Bun
  ├─ adapter.serve(app, opts)                Start listening
  │     └─ onListening → logServerInfo()
  │
  └─ returns ServerHandle { close, app }
```

### Compilation details

During `compile()` the three-layer middleware structure is encoded into nested runtime groups:

```ts
// Conceptual structure of the runtime router after compilation:
//
// Application
//   ├── global middleware (logger, cors, bodyParser)
//   └── router
//         └── group("/api/v1", { middlewares: [moduleMws] })
//               └── group({ middlewares: [ctrlMws] })
//                     ├── GET /users        (route-level mw if any)
//                     ├── POST /users
//                     └── group("/admin", { middlewares: [adminMws] })
//                           └── ...
```

---

## Phase 2: Request Handling

```
HTTP Request arrives on port 3000
  │
  ├── Adapter receives socket
  │     (Node: http.createServer, Bun: Bun.serve, workerd: fetch)
  │
  └── Adapter converts to Context
        └── calls runtime Application.handle(ctx)
```

---

## Phase 3: Middleware Chain

```
Application.handle(ctx)
  │
  ├─ 1. GLOBAL MIDDLEWARE
  │     ├─ Logger middleware
  │     │     └─ logs: [2025-01-01T00:00:00.000Z] GET /api/users 200 12ms
  │     ├─ CORS middleware            (if enabled)
  │     │     └─ sets Access-Control-* headers
  │     └─ Body parser middleware    (if configured)
  │           └─ parses JSON/form-data into ctx.state.body
  │
  ├─ 2. MODULE-LEVEL MIDDLEWARE
  │     ├─ rateLimiter               ← ModuleConfig.middlewares[0]
  │     └─ auditLog                  ← ModuleConfig.middlewares[1]
  │
  ├─ 3. CONTROLLER-LEVEL MIDDLEWARE
  │     ├─ auth                      ← Controller.middlewares[0]
  │     └─ requestValidator          ← Controller.middlewares[1]
  │
  ├─ 4. ROUTE-LEVEL MIDDLEWARE
  │     ├─ validateBody             ← router.post(path, [mw], handler)
  │     └─ sanitize                 ← router.post(path, [mw], handler)
  │
  └─ 5. ROUTE HANDLER
        └─ handler(ctx) → Response
```

### Middleware contract

A middleware is a function (or object with a `handle` method) that:

```ts
type Middleware = (
  ctx: Context,
  next: () => Promise<Response>
) => Promise<Response>;
```

- Call `next()` to pass control to the next middleware/handler.
- Return a `Response` to short-circuit the chain.

---

## Phase 4: Response

```
Handler returns Response
  │
  ├─ (optional) Controller-level middleware post-processing
  │     └─ e.g. add response headers
  │
  ├─ (optional) Module-level middleware post-processing
  │
  ├─ (optional) Global middleware post-processing
  │     └─ Logger records status, duration, size
  │
  └─ Adapter sends HTTP response
        └─ Node: res.writeHead() + res.end()
        └─ Bun: return Response
        └─ workerd: return Response
```

---

## Error Flow

If any middleware or handler throws:

```
Error thrown in middleware or handler
  │
  ├─ Runtime catches the error
  │
  ├─ onError handler invoked
  │     ├─ Custom: app.onError(userHandler)
  │     └─ Default: returns 500 with error.message as plain text
  │
  └─ Adapter sends error Response
```

---

## 404 Flow

If no route matches:

```
Request for unmatched route
  │
  ├─ Runtime router finds no matching route
  │
  ├─ notFound handler invoked
  │     ├─ Custom: app.notFound(userHandler)
  │     └─ Default: returns 404 "Not Found"
  │
  └─ Adapter sends 404 Response
```

---

## Graceful Shutdown

```
SIGTERM received (or ServerHandle.close() called)
  │
  ├─ adapter.close()
  │     └─ Stops accepting new connections
  │     └─ Drains existing connections
  │
  └─ process.exit(0)
```

In dev mode (`rasengan-server dev`):

```
SIGINT/SIGTERM
  │
  ├─ Close file watchers
  ├─ Send SIGTERM to child process
  │     └─ (force SIGKILL after 3s if unresponsive)
  └─ process.exit(0)
```

---

## Dev Mode Lifecycle (CLI)

```
rasengan-server dev --port 4000
  │
  ├─ loadConfig()                    → merged config
  ├─ dev(config)
  │     ├─ resolveRuntime()          → /path/to/node_modules/.bin/tsx
  │     ├─ spawn("tsx watch src/main.ts")
  │     │     └─ Child process (NODE_ENV=development, PORT=4000)
  │     │           └─ bootstrap(callback) → normal lifecycle above
  │     │
  │     ├─ fs.watch("src/", { recursive: true })
  │     └─ Process signal handlers
  │           ├─ SIGINT → stop() → kill child → exit
  │           └─ SIGTERM → stop() → kill child → exit
  │
  └─ If child exits with non-zero code:
        └─ Wait for file changes to restart
```

## Build Mode Lifecycle (CLI)

```
rasengan-server build --preset node
  │
  ├─ loadConfig()                    → merged config
  ├─ build(config)
  │     ├─ for each format:
  │     │     ├─ "single-file" → esbuild bundle → dist/server.bundle.mjs
  │     │     └─ "directory"   → esbuild per-file  → dist/server/*.mjs
  │     │           ├─ rewriteImportExtensions()    → add .js to relative imports
  │     │           ├─ copy package.json (minimal)
  │     │           ├─ copy rasengan.server.js/ts
  │     │           └─ write start.json
  │     └─ ✓ build complete
  │
  └─ User deploys dist/ to production
```

---

## Summary Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     SERVER STARTUP                       │
│  bootstrap → loadConfig → compile → selectAdapter → serve│
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                     REQUEST FLOW                         │
│                                                         │
│  HTTP Request                                            │
│      │                                                   │
│      ▼                                                   │
│  Adapter (Node/Bun/workerd)                              │
│      │                                                   │
│      ▼                                                   │
│  Application.handle(ctx)                                 │
│      │                                                   │
│      ▼                                                   │
│  Global Middleware (logger, cors, bodyParser)             │
│      │                                                   │
│      ▼                                                   │
│  Module Group                                             │
│    ├── Module Middleware                                  │
│    └── Controller Group                                   │
│          ├── Controller Middleware                        │
│          └── Route                                        │
│                ├── Route-level Middleware                 │
│                └── Handler ──→ Response                   │
│                                                         │
│  (on error)  → onError handler                           │
│  (on 404)    → notFound handler                          │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                     RESPONSE                             │
│  Adapter sends HTTP response to client                   │
└─────────────────────────────────────────────────────────┘
```
