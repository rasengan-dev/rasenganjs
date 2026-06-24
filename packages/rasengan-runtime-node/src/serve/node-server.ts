/**
 * HTTP server utilities for Node adapters.
 *
 * Provides `startNodeServer` which wraps `http.createServer`
 * and converts Node.js IncomingMessage/ServerResponse into the
 * Web API Request/Response pattern.
 *
 * The adapter layer (NodeDevAdapter / NodeProdAdapter) is
 * responsible for creating the Context from the Request.
 */

import { Application, FetchHandler } from '@rasenganjs/runtime';
import http from 'node:http';

/**
 * Options shared by all Node-based servers.
 */
export interface NodeServerOptions {
  host?: string;
  port?: number;

  /** Called when the server starts listening. */
  onListening?: (info: { port: number; host: string }) => void;
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
 * Response.  This is the WinterCG fetch handler signature,
 * matching `Application.fetch()`.
 *
 * Returns a handle with a `ready` promise (resolves on close)
 * and a `close()` method to shut down.
 */
export function startNodeServer(
  app: Application,
  options: NodeServerOptions = {}
): NodeServerHandle {
  const port = options.port ?? 5200;
  const host = options.host ?? '0.0.0.0';

  const server = http.createServer(async (req, res) => {
    try {
      const request = await incomingToRequest(req);
      const response = await app.fetch(request);

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

  const ready = new Promise<void>((resolve, reject) => {
    server.on('error', reject);
    server.on('close', resolve);
    server.listen(port, host, () => {
      options.onListening?.({ port, host });
    });
  });

  return {
    ready,
    close: () => server.close(),
  };
}

/**
 * Convert a Node.js IncomingMessage into a Web API Request.
 */
async function incomingToRequest(req: http.IncomingMessage): Promise<Request> {
  const protocol =
    (req.socket as unknown as { encrypted?: boolean }).encrypted ||
    req.headers['x-forwarded-proto'] === 'https'
      ? 'https'
      : 'http';
  const host = req.headers.host ?? 'localhost';
  const url = `${protocol}://${host}${req.url}`;

  let body: string | undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await new Promise<string>((resolve) => {
      const chunks: string[] = [];
      req.setEncoding('utf8');
      req.on('data', (c: string) => chunks.push(c));
      req.on('end', () => resolve(chunks.join('')));
    });
  }

  return new Request(url, {
    method: req.method,
    headers: Object.entries(req.headers)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v!]),
    body: body ?? undefined,
  });
}
