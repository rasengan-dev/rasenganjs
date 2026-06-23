# @rasenganjs/runtime — Roadmap

**Status:** v1.0.0 — Solid foundation, not yet a standalone production HTTP framework.

This document outlines the planned enhancements, organized by priority. Each item includes the rationale and rough effort estimate.

---

## P0 — Required Before Public Production Use

These are security, correctness, and scalability gaps that block production readiness for public-facing applications.

| #   | Feature                                                                                               | Rationale                                                                                                                                            | Effort |
| --- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | **Rate limiting** — Token bucket / sliding window middleware                                          | Without this, any route can be hammered. Every production framework provides it (Hono, Express `express-rate-limit`, Fastify `@fastify/rate-limit`). | Medium |
| 2   | **CSRF protection** — Double-submit cookie / token validation                                         | Essential for any app using cookie-based auth. Currently no protection against cross-site request forgery.                                           | Small  |
| 3   | **Security headers middleware** — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy | OWASP A5 (Security Misconfiguration). Helmet-style defense-in-depth for every response.                                                              | Small  |
| 4   | **Request timeout** — `AbortController`-based deadline per request                                    | A hanging handler (slow DB, infinite loop) leaks resources forever. Every production server needs this.                                              | Small  |
| 5   | **Router: pre-compile regex** — Cache compiled `RegExp` at registration time                          | `matchPath()` calls `new RegExp(pattern)` on **every request per route** — unnecessary GC pressure and CPU waste. 10-line fix.                       | Tiny   |
| 6   | **Router: radix tree or trie** — Replace O(n) linear scan                                             | At 500+ routes, linear scan with per-request regex matching becomes a bottleneck. Hono's radix tree is the reference.                                | Large  |
| 7   | **Router: route sorting** — Static before dynamic before catch-all                                    | Registration-order matching causes ambiguity. `/users/:id` registered before `/users/admin` would match `/users/admin` as `:id`.                     | Small  |
| 8   | **405 responses** — `Allow` header on method mismatch                                                 | Current router silently falls through to 404 when the path matches but the method doesn't. Clients need the `Allow` header to know what's valid.     | Small  |
| 9   | **Graceful shutdown** — `SIGTERM` drain + `server.close()`                                            | Dropping in-flight connections on deploy is unacceptable. Need connection draining and a grace period.                                               | Medium |

---

## P1 — High-Value Additions

These features significantly improve the developer experience and coverage of common use cases.

| #   | Feature                                                                                     | Rationale                                                                                                                                 | Effort |
| --- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 10  | **JWT middleware** — Bearer token verification, key rotation                                | Every production API needs auth. JWT is the most common pattern. Provide `verify()` out of the box.                                       | Medium |
| 11  | **Basic / Bearer auth middleware** — Generic credential check                               | Simple auth patterns for internal APIs, health checks, webhooks.                                                                          | Small  |
| 12  | **Session middleware** — Cookie-based sessions with pluggable stores (memory, Redis)        | Stateful sessions are still widely used alongside JWTs. Express `express-session` equivalent.                                             | Medium |
| 13  | **Request validation middleware** — Zod schema validation for body / params / query         | Typed input validation should be a first-class concern. No more manual `if (typeof x !== 'string')` in every handler.                     | Medium |
| 14  | **Structured logging** — JSON log output, pino integration, log levels                      | `console.log` strings are not production-grade. Need structured logs for log aggregation (Datadog, Grafana Loki, ELK).                    | Small  |
| 15  | **Metrics / OpenTelemetry** — Request count, latency histogram, active requests             | Cannot measure p99 latency, error rates, or throughput without this.                                                                      | Medium |
| 16  | **Static file serving** — `serveStatic()` middleware with `public/` convention              | Every framework needs this — HTML, CSS, JS, images. Currently requires a separate file server.                                            | Medium |
| 17  | **Body streaming limits** — Byte-accurate streaming limit (not just `Content-Length` check) | Current `maxSize` only checks the `Content-Length` header, which can be omitted or spoofed. Need actual byte counting during consumption. | Medium |

---

## P2 — Growth & Ergonomics

These improve completeness, performance, and convenience.

| #   | Feature                                                                                              | Rationale                                                                                                                        | Effort |
| --- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 18  | **Node native adapter** — `http.createServer()` / `https.createServer()` without Express             | `toExpressHandler` requires Express as a peer dependency. A direct Node adapter removes that requirement for simple deployments. | Small  |
| 19  | **File upload middleware** — Multipart file handling with size limits, disk/memory storage, progress | `parseFormData()` returns `FormData` but has no size controls, no streaming, no disk offload.                                    | Medium |
| 20  | **ETag / `Last-Modified` / conditional requests** — `if-none-match` / `if-modified-since`            | Reduces bandwidth for cached resources. Standard in every production framework.                                                  | Small  |
| 21  | **Content negotiation** — `Accept` header parsing, automatic response format selection               | Serve JSON, HTML, or XML from the same endpoint based on client preference.                                                      | Small  |
| 22  | **`Cache-Control` helpers** — `public`, `private`, `max-age`, `s-maxage`, `stale-while-revalidate`   | Make it easy to set correct caching headers on responses.                                                                        | Small  |
| 23  | **Error cause chaining** — Preserve original error in `HttpError.cause`                              | Currently `new InternalServerError()` wraps the original error but doesn't chain it. Lost context in logs.                       | Tiny   |
| 24  | **`app.listen()` convenience** — Quick-start without adapters for local dev                          | `app.listen(3000)` is the most ergonomic API. Current flow requires `toExpressHandler` + `express()`.                            | Small  |
| 25  | **Reverse URL generation** — Named routes with `router.url('user.show', { id: 5 })`                  | Avoids hardcoding URLs in templates, enables route refactoring.                                                                  | Medium |
| 26  | **`res.json()` / `res.send()` chainable API** — Traditional Express-style response object            | Some users prefer this over standalone `json(data)` functions. Optional ergonomic layer.                                         | Medium |

---

## P3 — Advanced & Platform Expansion

These address specialized use cases and broader platform support.

| #   | Feature                                                                                   | Rationale                                                                                                                                             | Effort               |
| --- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 27  | **WebSocket upgrade handling** — `ctx.upgrade()` for WS connections                       | Real-time apps need WebSocket routing alongside HTTP.                                                                                                 | Large                |
| 28  | **SSE (Server-Sent Events)** — `ctx.sse()` helper, keepalive, reconnection                | One-way event streaming for live updates, notifications. Simpler than WebSockets for many use cases.                                                  | Medium               |
| 29  | **HTTP/2 support** — `http2.createServer()` adapter, server push                          | Performance improvement for modern browsers.                                                                                                          | Medium               |
| 30  | **Serverless adapters** — AWS Lambda (function URL), Vercel serverless, Netlify Functions | Beyond Cloudflare Workers, these are the major serverless platforms.                                                                                  | Medium (per adapter) |
| 31  | **HTTP/3 / QUIC** — When Node/bun runtime support matures                                 | Future-proofing. Early adopter stage.                                                                                                                 | Large                |
| 32  | **Plugin system** — `app.register(plugin)` with lifecycle hooks                           | Third-party extensions need a formal API instead of "just add middleware." Hooks for "after route matched," "before handler," "before response sent." | Large                |
| 33  | **Signed cookies** — Cookie tampering prevention via HMAC                                 | Express `cookie-parser` equivalent. Needed for session cookies that shouldn't be forgeable.                                                           | Small                |
| 34  | **Range requests** — `Accept-Ranges`, `Content-Range`, partial content                    | Required for video/audio streaming, large file resumes.                                                                                               | Medium               |
| 35  | **103 Early Hints** — Link headers before full response                                   | Improves perceived performance by telling the browser about critical assets early.                                                                    | Medium               |

---

## Completion Criteria by Tier

### P0 Done When

- Application can be deployed behind a reverse proxy without additional security middleware
- Router handles 1000+ routes at <1ms per match
- Server shuts down without dropping active connections
- Wrong HTTP methods return proper 405 with `Allow` header

### P1 Done When

- You can build a complete CRUD API with auth, validation, logging, and metrics without writing a single middleware from scratch
- Static assets are served without a separate web server
- Request body limits cannot be bypassed by omitting `Content-Length`

### P2 Done When

- A new project can run `app.listen(3000)` without additional adapter setup
- File uploads are handled with streaming, size limits, and offload
- Caching is configured declaratively per route
- Errors always preserve their causal chain in logs

### P3 Done When

- WebSocket and SSE apps are first-class citizens
- The framework runs on every major serverless platform without adapter code from users
- Third-party packages can extend the framework via a plugin API

---

## Current Gaps vs Comparable Frameworks

| Capability          | Hono 4  | Fastify 5  | Express 4 | **This package**  |
| ------------------- | ------- | ---------- | --------- | :---------------: |
| Radix tree router   | ✓       | ✓          | ✗         |         ✗         |
| JWT auth middleware | ✓       | ✓          | plugin    |         ✗         |
| Request validation  | ✓ (Zod) | ✓ (schema) | plugin    |         ✗         |
| Security headers    | ✓       | ✓          | plugin    |         ✗         |
| Rate limiting       | plugin  | ✓          | plugin    |         ✗         |
| Request timeout     | ✗       | ✓          | ✗         |         ✗         |
| Graceful shutdown   | ✗       | ✓          | ✗         |         ✗         |
| Structured logging  | ✗       | ✓ (Pino)   | plugin    |         ✗         |
| Metrics / OTEL      | plugin  | ✓          | plugin    |         ✗         |
| Static file serving | ✓       | ✓          | ✓         |         ✗         |
| SSE                 | ✓       | ✓          | plugin    |         ✗         |
| WebSocket           | ✓       | ✓          | plugin    |         ✗         |
| Node native adapter | ✓       | ✓          | n/a       | ✗ (needs Express) |
| Streaming SSR       | ✗       | ✗          | ✗         |         ✓         |
| Zero dependencies   | ✓       | ✗          | ✗         |         ✓         |
| WinterCG compliant  | ✓       | ✗          | ✗         |         ✓         |
| Dual ESM/CJS        | ✗       | ✓          | ✓         |         ✓         |
