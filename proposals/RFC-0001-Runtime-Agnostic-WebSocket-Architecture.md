# RFC 0001 — Runtime-Agnostic WebSocket Architecture

**Status:** Implemented (v1)  
**Author:** Rasengan.js Core Team  
**Date:** 2026-07-08 · Implemented 2026-07-11

## Executive Summary

This RFC proposes a first-class, runtime-agnostic WebSocket architecture for Rasengan Server.

The primary objective is **not** to integrate Socket.IO, but to provide a unified real-time infrastructure that works consistently across Node.js, Bun, Deno and workerd while keeping `@rasenganjs/futon` focused exclusively on HTTP.

Socket.IO becomes an optional ecosystem integration built on top of this infrastructure rather than the architectural foundation.

---

# Motivation

Rasengan aims to support multiple runtimes. Every runtime exposes WebSockets differently:

| Runtime | Native mechanism          |
| ------- | ------------------------- |
| Node.js | HTTP Upgrade              |
| Bun     | `server.upgrade()`        |
| Deno    | `Deno.upgradeWebSocket()` |
| workerd | `WebSocketPair`           |

`@rasenganjs/futon` currently implements a pure HTTP engine.

Its responsibility ends once a `Response` is produced.

A WebSocket has a different lifecycle:

```
HTTP Request
    ↓
Upgrade
    ↓
Persistent Connection
    ↓
Messages
```

Because of this, WebSockets should not become part of Futon's responsibility.

---

# Goals

- Keep Futon HTTP-only.
- Provide first-class WebSocket routing.
- Hide runtime-specific upgrade APIs.
- Support Node, Bun, Deno and workerd.
- Allow optional integrations (Socket.IO, GraphQL subscriptions, SSE, RPC, etc.).
- Build a long-term real-time foundation.

## Non-goals

- Reimplement Socket.IO.
- Expose runtime-specific upgrade primitives publicly.
- Turn Futon into a networking engine.

---

# Proposed Architecture

```
                Rasengan Server

        ┌──────────────┴──────────────┐
        │                             │
     HTTP Registry            WebSocket Registry
        │                             │
        └──────────────┬──────────────┘
                       │
                Runtime Adapter
                       │
      ┌────────┬────────┬────────┬────────┐
      │        │        │        │
    Node      Bun      Deno   workerd
```

The runtime adapter becomes responsible for translating native runtime APIs into Rasengan's internal WebSocket abstraction.

---

# Package Responsibilities

## @rasenganjs/futon

Responsible only for:

- Request → Response
- Routing
- Middleware execution
- HTTP semantics

It should never know about WebSockets.

## @rasenganjs/server

Owns:

- HTTP registry
- WebSocket registry
- Modules
- Lifecycle
- Bootstrap

Public API:

```ts
const app = new ServerApp();

app.get('/');

app.websocket('/chat', {
  open(ctx) {},
  message(ctx, data) {},
  close(ctx) {},
});
```

---

# Runtime Adapter Responsibilities

The runtime adapter internally performs the native upgrade.

Examples:

- Node → `server.on("upgrade")`
- Bun → `server.upgrade()`
- Deno → `Deno.upgradeWebSocket()`
- workerd → `WebSocketPair`

These details remain internal.

No public `onUpgrade()` API is exposed.

---

# Internal WebSocket Abstraction

Every runtime is adapted into a common interface.

```ts
interface WebSocketConnection {
  send(data: string | ArrayBuffer): void;
  close(code?: number, reason?: string): void;
  readonly readyState: number;
  readonly protocol: string;
}

interface WebSocketContext {
  request: Request;
  socket: WebSocketConnection;
}
```

Application code becomes runtime-independent.

---

# Compilation Flow

```
ServerApp
      │
      ▼
compile()
      │
      ▼
CompiledApplication
 ├── httpEngine (Futon)
 └── websocketRegistry
```

The runtime adapter receives both registries and dispatches requests appropriately.

---

# Optional Socket.IO Integration

Socket.IO lives in a dedicated package.

```
@rasenganjs/io-server
```

Responsibilities:

- Integrate Socket.IO on supported runtimes.
- Use internal runtime extension points.
- Never influence the core architecture.

Supported:

- Node.js
- Bun (compatibility mode)

Not guaranteed:

- workerd
- WinterCG-only runtimes

---

# Benefits

- Clear separation of concerns.
- Runtime-agnostic API.
- Cleaner architecture.
- Easier testing.
- Future support for:
  - SSE
  - GraphQL subscriptions
  - Live Queries
  - RPC
  - Presence
  - Broadcast channels

---

# Conclusion

Rasengan should build its real-time architecture around the WebSocket protocol rather than around Socket.IO.

The framework owns a stable, portable WebSocket abstraction while ecosystem packages such as `@rasenganjs/io-server` provide optional protocol-specific integrations.
