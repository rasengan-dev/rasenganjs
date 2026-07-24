# Roadmap

**Status:** `1.0.0-beta.0` — pre-release, API stable but pending feedback before 1.0.0.

---

## Short-term (pre-1.0.0)

- [x] Controller-based routing
- [x] Module system with prefix, middleware, imports
- [x] Dependency injection container
- [x] Three-layer middleware (global, module, controller, route)
- [x] Config file support (`rasengan.server.js` / `.ts`)
- [x] CLI dev mode (tsx watch, hot-reload)
- [x] CLI build mode (single-file + directory format)
- [x] Auto-detected adapters (Node, Bun, workerd)
- [x] Development logger (coloured) + JSON logger
- [x] CORS, body parser, error/404 handlers
- [ ] **Plugin system** — allow third-party extensions to hook into the compilation lifecycle (e.g. before/after compile, after providers registered)

---

## Medium-term (1.x)

- [ ] **OpenAPI / Swagger generation** — auto-generate OpenAPI spec from route metadata and controller decorators.
- [ ] **Validation layer** — built-in request validation (Zod integration or decorator-based) with automatic 400 responses.
- [ ] **WebSocket support** — integrate WebSocket handling with the module/controller paradigm.
- [ ] **Middleware chaining API** — fluent `.pipe()` or `.chain()` API on the Router for composing middleware at registration time.
- [ ] **Environment-based config** — load different `rasengan.server.*.ts` files per `NODE_ENV`.
- [ ] **Graceful shutdown hooks** — `app.onShutdown(fn)` for cleanup (DB disconnects, queue drains).
- [ ] **Health check endpoint** — built-in `GET /health` route with custom check functions.
- [ ] **Rate limiting middleware** — first-party rate limiter using the module middleware system.
- [ ] **CLI improvements:**
  - `rasengan-server generate controller <name>` — scaffold a controller
  - `rasengan-server generate module <name>` — scaffold a module
  - `rasengan-server info` — show loaded config, registered modules, routes

---

## Long-term (2.x)

- [ ] **GraphQL support** — first-class GraphQL module with schema-first or code-first approach.
- [ ] **Background job queue** — module-based job processing (bull/agenda integration).
- [ ] **CLI scaffolding** — `create-rasengan-server` package for interactive project creation.
- [ ] **Distributed tracing** — OpenTelemetry integration for middleware-level tracing.
- [ ] **Hot reload improvements:**
  - Watch mode for production (zero-downtime reload)
  - Module-level HMR (reload only changed modules without full restart)
- [ ] **Adapter plugins** — first-party support for:
  - AWS Lambda (via `@rasenganjs/adapter-lambda`)
  - Google Cloud Functions (via `@rasenganjs/adapter-gcf`)
  - Docker (official base images)
- [ ] **Testing utilities** — `createTestServer()` helper that returns a configured instance without starting the adapter, with `fetch()`-style request helpers.
- [ ] **Performance benchmarks** — continuous benchmarking suite against Express, Fastify, Hono.

---

## Ideas (not yet prioritised)

- Static file serving middleware
- Compression middleware (gzip/brotli)
- Session management (cookie-based, JWT, Redis)
- CLI for managing secrets / environment variables
- Dockerfile generator (`rasengan-server init --docker`)
- Automatic HTTPS via Let's Encrypt (ACME)
- Server-sent events (SSE) module
- gRPC module
- Scheduler / cron module
- Multi-tenant module support (isolated configurations per tenant)

---

## Milestones

| Milestone | Target  | Key Deliverables                                              |
| --------- | ------- | ------------------------------------------------------------- |
| v1.0.0    | Q3 2026 | Stable API, plugin system, OpenAPI generation                 |
| v1.1.0    | Q4 2026 | WebSocket support, validation layer, health checks            |
| v1.5.0    | Q1 2027 | Testing utilities, CLI scaffolds, first-party rate limiter    |
| v2.0.0    | Q3 2027 | GraphQL, distributed tracing, adapter plugins, production HMR |

---

## How to Contribute

See the main repository [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

Feature requests and bug reports: [GitHub Issues](https://github.com/rasengan-dev/rasenganjs/issues)
