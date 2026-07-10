/**
 * HTTP server utilities for Bun adapters.
 *
 * Provides `startBunServer` which wraps `Bun.serve()`.
 * Unlike Node's `http.createServer`, Bun natively supports the
 * Web API `Request`/`Response` pattern, so no conversion is needed.
 */

import type { WebSocketRouteMatcher } from '../../websocket/types.js';
import {
  createBunWebSocketHandlers,
  type BunWebSocketData,
} from './websocket.js';

export interface BunServerOptions {
  host?: string;
  port?: number;

  /** Called when the server starts listening. */
  onListening?: (info: { port: number; host: string }) => void;

  /**
   * Looks up WebSocket handlers for an incoming upgrade request's
   * pathname. When provided, `startBunServer` hijacks matching upgrade
   * requests via `server.upgrade()` (RFC-0001, Bun adapter phase). When
   * omitted, no `websocket` option is passed to `Bun.serve()` at all.
   */
  websocket?: WebSocketRouteMatcher;
}

export interface BunServerHandle {
  ready: Promise<void>;
  close(): void;
}

/**
 * Start a Bun HTTP server using `Bun.serve()`.
 *
 * `handler` receives a raw Web API Request and must return a
 * Response — the same WinterCG signature as `Futon.fetch()`.
 *
 * Returns a handle with a `ready` promise (resolves immediately)
 * and a `close()` method to stop the server.
 *
 * @param handler - Fetch handler matching WinterCG signature.
 * @param options - Server options (port, host, callback, websocket).
 * @returns A handle to control the server lifecycle.
 */
export function startBunServer(
  handler: (request: Request) => Promise<Response>,
  options: BunServerOptions = {}
): BunServerHandle {
  try {
    const port = options.port;
    const hostname = options.host ?? '0.0.0.0';
    const matcher = options.websocket;

    const server = Bun.serve<BunWebSocketData>({
      fetch(request, server) {
        if (matcher && isWebSocketUpgrade(request)) {
          const { pathname } = new URL(request.url);
          const handlers = matcher.match(pathname);

          if (handlers) {
            const upgraded = server.upgrade(request, {
              data: { handlers, request },
            });
            // Per Bun's contract: return undefined (no Response) once
            // upgraded — Bun has taken over the connection.
            if (upgraded) return undefined;
          }
        }

        return handler(request);
      },
      // Only required (and only valid) when `fetch` may call `server.upgrade()`.
      websocket: matcher ? createBunWebSocketHandlers() : undefined,
      port,
      hostname,
    });

    options.onListening?.({ port: server.port, host: hostname });

    return {
      ready: Promise.resolve(),
      close: async () => {
        // Then stop the server
        server.stop();
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/** Whether a request is asking to be upgraded to a WebSocket connection. */
function isWebSocketUpgrade(request: Request): boolean {
  return request.headers.get('upgrade')?.toLowerCase() === 'websocket';
}
