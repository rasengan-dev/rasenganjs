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
 * Registry symbol under which futon's response helpers (json/text/html)
 * attach the raw single-buffer body of the Response they build
 * (RFC-0005, Phase 2). When present, the body is written with one
 * `res.end(raw)` instead of pumping the web stream — the dominant cost
 * for small JSON responses. `Symbol.for` avoids an import edge to futon.
 */
const RAW_BODY = Symbol.for('rasenganjs.response.rawBody');

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
 * Write a Web API `Response` onto a raw Node `http.ServerResponse`.
 *
 * Shared by `startNodeServer` and any caller that owns its own
 * `http.createServer` and only wants the Futon-facing half of the
 * bridge (e.g. a dev server that hands unhandled requests to Vite's
 * Connect middleware first, and only converts to/from Web API types
 * for the requests Futon actually serves).
 *
 * Takes the fast path (single `res.end(raw)`) when the Response was
 * tagged with a raw single-buffer body (RFC-0005, Phase 2); otherwise
 * streams the body chunk-by-chunk, honoring backpressure via the
 * `drain` event so a slow client never buffers an unbounded response
 * in memory.
 *
 * @param res - The raw Node response to write onto.
 * @param response - The Web API Response to send.
 */
export async function writeNodeResponse(
  res: http.ServerResponse,
  response: Response
): Promise<void> {
  res.statusCode = response.status;
  // Copy headers directly. `set-cookie` is skipped in the joined
  // view and set from getSetCookie() so multiple cookies are sent
  // as separate header lines instead of one comma-joined value.
  for (const [key, value] of response.headers) {
    if (key === 'set-cookie') continue;
    res.setHeader(key, value);
  }
  const setCookies = response.headers.getSetCookie();
  if (setCookies.length > 0) res.setHeader('set-cookie', setCookies);

  const raw = (response as { [RAW_BODY]?: string | Uint8Array })[RAW_BODY];
  if (raw !== undefined) {
    // Fast path: single-buffer body tagged at creation
    res.end(raw);
  } else if (response.body) {
    // Streaming path: flush each chunk as it arrives (first chunk
    // is never held back — SSE/TTFB safe), honoring backpressure.
    // Cast: Node's ReadableStream is async-iterable at runtime,
    // but the DOM lib types don't declare it.
    const chunks = response.body as unknown as AsyncIterable<Uint8Array>;
    for await (const chunk of chunks) {
      if (!res.write(chunk)) {
        await new Promise<void>((resolve) => res.once('drain', resolve));
      }
    }
    res.end();
  } else {
    res.end();
  }
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
      await writeNodeResponse(res, response);
    } catch (error) {
      console.error('Server error:', error);
      if (res.headersSent) {
        // Mid-stream failure — the status line is gone; all we can
        // do is terminate the connection so the client sees an error.
        res.destroy();
      } else {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
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
