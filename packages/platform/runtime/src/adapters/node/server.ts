/**
 * HTTP server utilities for Node adapters.
 *
 * Provides `startNodeServer` which wraps `http.createServer`
 * and converts Node.js `IncomingMessage`/`ServerResponse` into
 * the Web API `Request`/`Response` pattern.
 *
 * The adapter layer (NodeDevAdapter / NodeProdAdapter) is
 * responsible for creating the handler from the Futon.
 */

import http from 'node:http';

import type { WebSocketRouteMatcher } from '../../websocket/types.js';
import { createNodeUpgradeHandler } from './websocket.js';
import { incomingToRequest } from './request.js';

/**
 * Options shared by all Node-based servers.
 */
export interface NodeServerOptions {
  host?: string;
  port?: number;

  /** Called when the server starts listening. */
  onListening?: (info: { port: number; host: string }) => void;

  /**
   * Looks up WebSocket handlers for an incoming upgrade request's
   * pathname. When provided, `startNodeServer` wires up the HTTP
   * server's `upgrade` event (RFC-0001, Node adapter phase). When
   * omitted, upgrade requests are left unhandled and Node closes
   * the socket by default.
   */
  websocket?: WebSocketRouteMatcher;
}

/**
 * Server handle returned by `startNodeServer`.
 */
export interface NodeServerHandle {
  /** Resolves when the server closes. */
  ready: Promise<void>;
  /** Stop the server. */
  close(): void;
}

/**
 * Start a Node HTTP server.
 *
 * `handler` receives a raw Web API Request and must return a
 * Response. This is the WinterCG fetch handler signature,
 * matching `Futon.fetch()`.
 *
 * Returns a handle with a `ready` promise (resolves on close)
 * and a `close()` method to shut down.
 *
 * @param handler - Fetch handler matching WinterCG signature.
 * @param options - Server options (port, host, callback).
 * @returns A handle to control the server lifecycle.
 */
export function startNodeServer(
  handler: (request: Request) => Promise<Response>,
  options: NodeServerOptions = {}
): NodeServerHandle {
  const port = options.port ?? 5200;
  const host = options.host ?? '0.0.0.0';

  const server = http.createServer(async (req, res) => {
    try {
      const request = await incomingToRequest(req);
      const response = await handler(request);

      const rawHeaders: Record<string, string> = {};
      if (response.headers && typeof response.headers.forEach === 'function') {
        response.headers.forEach((value: string, key: string) => {
          rawHeaders[key] = value;
        });
      }
      res.writeHead(response.status, rawHeaders);

      if (response.body) {
        const reader = response.body.getReader();
        const pump = (): void => {
          reader.read().then(({ done, value }) => {
            if (done) return res.end();
            res.write(value);
            pump();
          });
        };
        pump();
      } else {
        res.end();
      }
    } catch (error) {
      console.error('Server error:', error);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });

  if (options.websocket) {
    // Node's http server has no built-in WebSocket protocol support — it
    // only emits 'upgrade' with a raw duplex socket. Delegate handshake +
    // framing to `ws` via `createNodeUpgradeHandler`.
    server.on('upgrade', createNodeUpgradeHandler(options.websocket));
  }

  const ready = new Promise<void>((resolve, reject) => {
    server.on('error', reject);
    server.on('close', resolve);
    server.listen(port, host, () => {
      const addr = server.address();
      const actualPort = addr && typeof addr === 'object' ? addr.port : port;
      options.onListening?.({ port: actualPort, host });
    });
  });

  return {
    ready,
    close: () => server.close(),
  };
}
