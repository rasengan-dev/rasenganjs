/**
 * @module WebSocket — runtime-agnostic types (re-exported)
 *
 * These types are the "internal WebSocket abstraction" described in
 * RFC-0001 (proposals/RFC-0001-Runtime-Agnostic-WebSocket-Architecture.md).
 * They are defined in `@rasenganjs/runtime`, not here, because the runtime
 * adapters (Node, Bun, workerd, ...) construct `WebSocketConnection`
 * instances by wrapping their native APIs and need these types without
 * depending on `@rasenganjs/server`.
 *
 * Re-exported here so application code keeps importing from
 * `rasengan-server` — the same pattern used for `Context`, which is
 * defined in `@rasenganjs/futon` and re-exported from this package's
 * top-level `index.ts`.
 *
 * `@rasenganjs/futon` itself has no knowledge of any of this — it stays
 * HTTP-only per the RFC.
 */

export type {
  WebSocketConnection,
  WebSocketContext,
  WebSocketHandlers,
} from '@rasenganjs/runtime';
