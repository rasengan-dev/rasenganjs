/**
 * Node WebSocket upgrade handling (RFC-0001, Node adapter phase).
 *
 * Node's `http` module has no WebSocket protocol support of its own —
 * only a raw `upgrade` event exposing a duplex socket. The handshake and
 * RFC 6455 frame parsing/masking are delegated to the `ws` package rather
 * than hand-rolled here, since getting frame masking/fragmentation wrong
 * is a well-known source of security bugs.
 *
 * This module is only responsible for:
 * 1. Matching the upgrade request's pathname against a `WebSocketRouteMatcher`
 *    (routing — nothing to do with the WebSocket protocol itself).
 * 2. Adapting `ws`'s `WebSocket` into the runtime-agnostic `WebSocketConnection`
 *    shape so application handlers never see a `ws`-specific API.
 */

import { WebSocketServer, type WebSocket as WSWebSocket } from 'ws';
import type { IncomingMessage } from 'node:http';
import type { Socket } from 'node:net';

import type {
  WebSocketConnection,
  WebSocketContext,
  WebSocketRouteMatcher,
} from '../../websocket/types.js';
import { toArrayBuffer } from '../../websocket/utils.js';
import { incomingToRequest } from './request.js';

/**
 * Build an `upgrade` event handler bound to a single HTTP server.
 *
 * One `WebSocketServer({ noServer: true })` is created per HTTP server
 * (not shared as a module-level singleton) so that independent servers
 * — e.g. two `startNodeServer()` calls in the same process, as happens
 * in tests — never mix connections in the same `wss.clients` set.
 *
 * `noServer: true` means this `WebSocketServer` never listens on its own;
 * it is purely used for its `handleUpgrade()` handshake/framing logic,
 * invoked manually below once we've decided (via `matcher`) that this
 * upgrade request should be accepted.
 */
export function createNodeUpgradeHandler(
  matcher: WebSocketRouteMatcher
): (req: IncomingMessage, socket: Socket, head: Buffer) => void {
  const wss = new WebSocketServer({ noServer: true });

  return (req, socket, head) => {
    handleUpgrade(req, socket, head, matcher, wss).catch((error) => {
      console.error('[rasengan-runtime] WebSocket upgrade error:', error);
      socket.destroy();
    });
  };
}

async function handleUpgrade(
  req: IncomingMessage,
  socket: Socket,
  head: Buffer,
  matcher: WebSocketRouteMatcher,
  wss: WebSocketServer
): Promise<void> {
  const host = req.headers.host ?? 'localhost';
  const { pathname } = new URL(req.url ?? '/', `http://${host}`);
  const handlers = matcher.match(pathname);

  if (!handlers) {
    // No WebSocket route registered for this path — reject the upgrade.
    // Mirrors Futon's HTTP 404 convention for unmatched routes.
    socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    socket.destroy();
    return;
  }

  // Safe to call before handleUpgrade: for GET requests (all upgrades are
  // GET) this resolves without reading the socket's data stream, so it
  // doesn't interfere with the handshake that follows.
  const request = await incomingToRequest(req);

  wss.handleUpgrade(req, socket, head, (ws) => {
    const connection = wrapConnection(ws);
    const ctx: WebSocketContext = { request, socket: connection };

    handlers.open?.(ctx);

    ws.on('message', (data, isBinary) => {
      const buffer = data as Buffer;
      const payload: string | ArrayBuffer = isBinary
        ? toArrayBuffer(buffer)
        : buffer.toString('utf8');
      handlers.message?.(ctx, payload);
    });

    ws.on('close', (code, reasonBuffer) => {
      handlers.close?.(ctx, code, reasonBuffer.toString('utf8'));
    });

    ws.on('error', (error) => {
      handlers.error?.(ctx, error);
    });
  });
}

/** Adapt a `ws` connection into the runtime-agnostic `WebSocketConnection` shape. */
function wrapConnection(ws: WSWebSocket): WebSocketConnection {
  return {
    send: (data) => ws.send(data),
    close: (code, reason) => ws.close(code, reason),
    get readyState() {
      return ws.readyState;
    },
    get protocol() {
      return ws.protocol;
    },
  };
}
