/**
 * @module WebSocket — runtime-agnostic types
 *
 * These types are the "internal WebSocket abstraction" described in
 * RFC-0001 (proposals/RFC-0001-Runtime-Agnostic-WebSocket-Architecture.md).
 * Runtime adapters (Node, Bun, workerd, ...) are responsible for adapting
 * their native upgrade/connection APIs into `WebSocketConnection`, so
 * application code written against `WebSocketHandlers` never touches a
 * runtime-specific API.
 *
 * `@rasenganjs/futon` intentionally has no knowledge of these types — it
 * stays HTTP-only per the RFC. This module lives in `rasengan-server`.
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
 * no DI/container access in this first slice.
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
