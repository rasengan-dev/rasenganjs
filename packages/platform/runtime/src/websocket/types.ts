/**
 * @module WebSocket — runtime-agnostic types (RFC-0001)
 *
 * These live in `@rasenganjs/runtime` — not `@rasenganjs/server` or
 * `@rasenganjs/futon` — because it is the runtime adapters (Node, Bun,
 * workerd, ...) that actually construct a `WebSocketConnection` by
 * wrapping their native upgrade/socket APIs, and they need these types
 * to do so without depending on `@rasenganjs/server`.
 *
 * `@rasenganjs/server` re-exports these unchanged from its own
 * `websocket` module (mirroring how it re-exports `Context` from
 * `@rasenganjs/futon`), so application code keeps importing from
 * `rasengan-server` and never needs to know these types originate here.
 */

/**
 * A single live WebSocket connection, normalised across runtimes.
 *
 * Node's `ws` connections, Bun's `ServerWebSocket`, and workerd's
 * `WebSocketPair` all expose this shape differently; the runtime adapter
 * is responsible for wrapping its native object to satisfy this interface.
 */
export interface WebSocketConnection {
  /** Send a text or binary message to this connection. */
  send(data: string | ArrayBuffer): void;
  /** Close the connection, optionally with a close code and reason. */
  close(code?: number, reason?: string): void;
  /** Mirrors the standard WebSocket `readyState` (CONNECTING/OPEN/CLOSING/CLOSED). */
  readonly readyState: number;
  /** The negotiated sub-protocol, or an empty string if none. */
  readonly protocol: string;
}

/**
 * Context passed to every WebSocket handler.
 *
 * `request` is the original upgrade request (useful for reading headers,
 * cookies, or query params during `open`). Kept minimal to match the RFC —
 * no DI/container access in this slice.
 */
export interface WebSocketContext {
  request: Request;
  socket: WebSocketConnection;
}

/**
 * Handlers for a single WebSocket route, registered via `app.websocket(path, handlers)`.
 *
 * `error` is not in the RFC's public API sketch but is included here since
 * every runtime's native WebSocket API (Bun, ws, workerd) surfaces connection
 * errors distinctly from a normal `close`, and callers need a place to handle
 * that without inferring it from a close code.
 */
export interface WebSocketHandlers {
  /** Called once the upgrade completes and the connection is open. */
  open?(ctx: WebSocketContext): void | Promise<void>;
  /** Called for every incoming message on this connection. */
  message?(
    ctx: WebSocketContext,
    data: string | ArrayBuffer
  ): void | Promise<void>;
  /** Called when the connection closes, normally or otherwise. */
  close?(
    ctx: WebSocketContext,
    code?: number,
    reason?: string
  ): void | Promise<void>;
  /** Called when the underlying connection errors out. */
  error?(ctx: WebSocketContext, error: Error): void | Promise<void>;
}

/**
 * The shape a runtime adapter needs to look up WebSocket handlers for an
 * incoming upgrade request, without knowing anything about how routes were
 * registered.
 *
 * `@rasenganjs/server`'s `WebSocketRegistry` satisfies this structurally —
 * `@rasenganjs/runtime` never imports it directly, keeping the dependency
 * one-way (server depends on runtime, never the reverse).
 */
export interface WebSocketRouteMatcher {
  match(pathname: string): WebSocketHandlers | undefined;
}
