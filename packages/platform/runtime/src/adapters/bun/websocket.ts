/**
 * Bun WebSocket handling (RFC-0001, Bun adapter phase).
 *
 * Unlike Node, Bun's `Bun.serve()` has first-class WebSocket support: no
 * separate `upgrade` event, no manual handshake — `server.upgrade(request,
 * { data })` inside `fetch` hijacks the connection, and a single
 * `websocket` handler object (shared across all connections on that
 * server) receives `open`/`message`/`close` calls with `ws.data` carrying
 * whatever was passed at upgrade time.
 *
 * This module adapts that shape into the runtime-agnostic
 * `WebSocketConnection`/`WebSocketContext` types so application handlers
 * are identical to the Node adapter's — including `ctx.socket` being the
 * same object reference for every `open`/`message`/`close` call on one
 * connection (see `getConnection()`), since callers reasonably key
 * connection-tracking data structures by that identity.
 *
 * Verified against a real `bun@1.3.8` process (see `types.d.ts`): the
 * `websocket` handler object has no `error` callback the way Node's `ws`
 * does, so `WebSocketHandlers.error` is never invoked under Bun.
 */

import type {
  WebSocketConnection,
  WebSocketContext,
  WebSocketHandlers,
} from '../../websocket/types.js';
import { toArrayBuffer } from '../../websocket/utils.js';

/** Data attached to each connection via `server.upgrade(request, { data })`. */
export interface BunWebSocketData {
  handlers: WebSocketHandlers;
  request: Request;
  /**
   * Lazily cached by `getConnection()` so `ctx.socket` is the *same*
   * object reference across `open`/`message`/`close` for one connection —
   * callers (e.g. `@rasenganjs/ws`) key connection-tracking maps by that
   * identity, matching the guarantee the Node adapter already provides
   * (it builds the wrapper once per connection, outside the event
   * listeners). Do not set this directly.
   */
  connection?: WebSocketConnection;
}

/**
 * The `websocket` option passed to `Bun.serve()` — one shared object
 * dispatches to the per-route `handlers` stashed in `ws.data`.
 */
export function createBunWebSocketHandlers(): {
  open(ws: ServerWebSocket<BunWebSocketData>): void;
  message(
    ws: ServerWebSocket<BunWebSocketData>,
    message: string | Buffer
  ): void;
  close(
    ws: ServerWebSocket<BunWebSocketData>,
    code: number,
    reason: string
  ): void;
} {
  return {
    open(ws) {
      ws.data.handlers.open?.(makeContext(ws));
    },
    message(ws, message) {
      const payload: string | ArrayBuffer =
        typeof message === 'string' ? message : toArrayBuffer(message);
      ws.data.handlers.message?.(makeContext(ws), payload);
    },
    close(ws, code, reason) {
      ws.data.handlers.close?.(makeContext(ws), code, reason);
    },
  };
}

function makeContext(ws: ServerWebSocket<BunWebSocketData>): WebSocketContext {
  return { request: ws.data.request, socket: getConnection(ws) };
}

/** Build (once) or return the cached `WebSocketConnection` for this connection. */
function getConnection(
  ws: ServerWebSocket<BunWebSocketData>
): WebSocketConnection {
  if (!ws.data.connection) {
    ws.data.connection = wrapConnection(ws);
  }
  return ws.data.connection;
}

/** Adapt a Bun `ServerWebSocket` into the runtime-agnostic `WebSocketConnection` shape. */
function wrapConnection(
  ws: ServerWebSocket<BunWebSocketData>
): WebSocketConnection {
  return {
    send: (data) => {
      ws.send(data);
    },
    close: (code, reason) => ws.close(code, reason),
    get readyState() {
      return ws.readyState;
    },
    get protocol() {
      return ws.protocol ?? '';
    },
  };
}
