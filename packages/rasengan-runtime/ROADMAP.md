# @rasenganjs/runtime — Roadmap

**Status:** v1.0.0 — Solid foundation, not yet a standalone production HTTP framework.

This document outlines the planned enhancements with a **clear architectural boundary**:

| Package                        | Scope                        | Constraints                                             |
| ------------------------------ | ---------------------------- | ------------------------------------------------------- |
| `@rasenganjs/runtime`          | Core Web API abstractions    | Zero deps, WinterCG-compatible, runs everywhere         |
| `@rasenganjs/server` (planned) | Production backend framework | May have dependencies, Node-specific, builds on runtime |

---

## Belongs in `@rasenganjs/runtime`

Pure Web API features. Zero dependencies. Every runtime (Node, Bun, Deno, Workers) can use these without importing anything beyond Web API globals.

### P0 — Router Core (no excuses)

| #   | Feature                                                              | Why Runtime                               | Effort | Status         |
| --- | -------------------------------------------------------------------- | ----------------------------------------- | ------ | -------------- |
| 1   | ~~Pre-compile route regex~~ — Radix tree makes this unnecessary      | Superseded by radix tree                  | —      | ✅ Done (v1.1) |
| 2   | **Radix tree router** — Replace O(n) linear scan                     | Algorithmic improvement, zero deps        | Large  | ✅ Done (v1.1) |
| 3   | ~~Route sorting~~ — Radix tree naturally prefers static over dynamic | Inherent in tree structure                | —      | ✅ Done (v1.1) |
| 4   | **405 with `Allow` header** — Path matched but method didn't         | Correct HTTP semantics, pure header logic | Small  | ❌ Pending     |

### P1 — Middleware & Body Enhancements

| #   | Feature                                                                                                    | Why Runtime                                                         | Effort |
| --- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------ |
| 5   | **Streaming byte-count body limits** — Not just `Content-Length` check, actually count bytes while reading | Pure `ReadableStream` byte counting, enhances existing `bodyParser` | Medium |
| 6   | **Basic auth middleware** — Parse `Authorization: Basic` header, delegate verification to handler          | `atob()` is a Web API global, zero deps                             | Small  |
| 7   | **Bearer token extraction middleware** — Parse `Authorization: Bearer`, expose token on `ctx.state`        | Pure header parsing, zero deps                                      | Small  |

### P2 — HTTP Utilities & Ergonomics

| #   | Feature                                                                                      | Why Runtime                                 | Effort |
| --- | -------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| 8   | **ETag / `Last-Modified` helpers** — Weak ETag via JSON/Crypto, conditional request checking | `crypto.subtle` is a Web API                | Small  |
| 9   | **Content negotiation** — `Accept` header parser, format selection                           | Pure header parsing, zero deps              | Small  |
| 10  | **`Cache-Control` string builder** — Declarative cache policy → header value                 | Pure string construction, zero deps         | Tiny   |
| 11  | **Error cause chaining** — Preserve original error in `HttpError.cause`                      | Pure JS, no deps                            | Tiny   |
| 12  | **Reverse URL generation** — `router.url('user.show', { id: 5 })` from named routes          | Pure logic, no deps                         | Medium |
| 13  | **Chainable response object** — Optional `ctx.res.json()`, `.send()`, `.status()` fluent API | Ergonomics layer on top of existing helpers | Medium |

### P3 — Web Platform Extensions

| #   | Feature                                                                                     | Why Runtime                    | Effort |
| --- | ------------------------------------------------------------------------------------------- | ------------------------------ | ------ |
| 14  | **SSE (Server-Sent Events)** — `ctx.sse()` helper wrapping `ReadableStream` + `TextEncoder` | Pure Web API, no deps          | Medium |
| 15  | **Signed cookies** — HMAC-based cookie signing via `SubtleCrypto`                           | `crypto.subtle` is a Web API   | Small  |
| 16  | **Range request helpers** — Parse `Range` / `If-Range` / `Content-Range` headers            | Pure header parsing, zero deps | Small  |
| 17  | **Plugin system** — `app.register(plugin)` with lifecycle hooks                             | Architectural, no deps         | Large  |

---

## Belongs in `@rasenganjs/server`

Production features that may require dependencies, Node-specific APIs, or platform integration. Consumes `@rasenganjs/runtime` as a dependency.

### P0 — Production Security & Operations

| #   | Feature                                                                   | Why Server                                                         | Effort |
| --- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------ |
| 18  | **Rate limiting** — Token bucket / sliding window with configurable store | Needs state management, timer precision, distributed store support | Medium |
| 19  | **CSRF protection** — Double-submit cookie / origin validation            | Security concern, needs crypto token management                    | Small  |
| 20  | **Security headers** — HSTS, CSP, X-Frame-Options, X-Content-Type-Options | Production hardening, sensible defaults per environment            | Small  |
| 21  | **Request timeout** — `AbortController` deadline per request              | Resource management concern, belongs in production layer           | Small  |
| 22  | **Graceful shutdown** — `SIGTERM` drain + connection draining             | Platform-specific (Node signals), belongs in server                | Medium |

### P1 — Auth, Validation, Observability

| #   | Feature                                                               | Why Server                                          | Effort |
| --- | --------------------------------------------------------------------- | --------------------------------------------------- | ------ |
| 23  | **JWT middleware** — `verify()` + `sign()` helpers                    | Needs `jose` or `jsonwebtoken` dependency           | Medium |
| 24  | **Session middleware** — Cookie-based sessions with pluggable stores  | Needs store abstraction, Redis/file/memory backends | Medium |
| 25  | **Request validation** — Zod schema validation for body/params/query  | Needs `zod` dependency                              | Medium |
| 26  | **Structured logging** — JSON output, log levels, pino integration    | Needs pino or similar dependency                    | Small  |
| 27  | **Metrics / OpenTelemetry** — Request count, latency, active requests | Needs OTEL SDK or prometheus client                 | Medium |
| 28  | **Static file serving** — `serveStatic()` with `public/` convention   | Needs file system access, mime types                | Medium |

### P2 — Platform Adapters & File Handling

| #   | Feature                                                                 | Why Server                        | Effort             |
| --- | ----------------------------------------------------------------------- | --------------------------------- | ------------------ |
| 29  | **Node native adapter** — `http.createServer()` without Express         | Platform-specific (`http` module) | Small              |
| 30  | **File upload middleware** — Disk/memory storage, size limits, progress | Needs file system, stream piping  | Medium             |
| 31  | **Serverless adapters** — AWS Lambda, Vercel, Netlify                   | Platform-specific integration     | Medium per adapter |

### P3 — Real-Time & Advanced Protocols

| #   | Feature                                                               | Why Server                         | Effort |
| --- | --------------------------------------------------------------------- | ---------------------------------- | ------ |
| 32  | **WebSocket upgrade handling** — Route-aware WS connection management | Needs `ws` or Node `http` upgrade  | Large  |
| 33  | **HTTP/2 support** — `http2.createServer()` adapter + server push     | Platform-specific (`http2` module) | Medium |
| 34  | **HTTP/3 / QUIC** — When runtime support matures                      | Platform-specific                  | Large  |
| 35  | **103 Early Hints** — Link headers before full response               | Needs early-response platform API  | Medium |

---

## Architectural Boundary Rules

```
@rasenganjs/runtime                      @rasenganjs/server
│                                         │
├── Application (fetch handler)           ├── Rate limiting middleware
├── Router (linear -> radix tree)         ├── CSRF protection middleware
├── Context (request, params, query)      ├── Security headers middleware
├── compose() (onion pipeline)            ├── JWT auth middleware
├── Middleware: cors()                    ├── Session middleware
├── Middleware: compress()               ├── Request validation (Zod)
├── Middleware: bodyParser()             ├── Structured logging
├── Middleware: logger()                 ├── Metrics / OpenTelemetry
├── Middleware: requestId()              ├── Static file serving
├── Request helpers (parseBody, etc.)    ├── File upload middleware
├── Response helpers (json, text, etc.)  ├── Node native adapter
├── Cookie parse/serialize               ├── WebSocket support
├── SSE (ReadableStream-based)           ├── Serverless adapters
├── ETag / Cache-Control helpers         ├── Graceful shutdown
├── Content negotiation                  ├── HTTP/2, Early Hints
├── Error classes (HttpError, etc.)      │
├── Hook system                          │
├── Adapters: toExpressHandler           │
├── Adapters: toWinterCgHandler          │
└── Plugin system                        │
                                         │
  Zero dependencies, Web API only        Can have dependencies, Node APIs
  WinterCG-compatible                    Production-focused
```

**Key rule:** If a feature needs `import` from npm or a Node built-in (`fs`, `http`, `crypto` (the Node one, not Web Crypto)), it goes in `@rasenganjs/server`. If it can be written using only `Request`, `Response`, `ReadableStream`, `URL`, `Headers`, `crypto.subtle`, `TextEncoder`, `AbortController`, and `atob`/`btoa`, it can land in `@rasenganjs/runtime`.

---

## Summary

| Layer           | Runtime | Server  | Total  |
| --------------- | ------- | ------- | ------ |
| P0 — Must have  | 4 items | 5 items | 9      |
| P1 — High value | 3 items | 6 items | 9      |
| P2 — Growth     | 6 items | 3 items | 9      |
| P3 — Advanced   | 4 items | 4 items | 8      |
| **Total**       | **17**  | **18**  | **35** |
