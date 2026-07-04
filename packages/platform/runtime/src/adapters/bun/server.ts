/**
 * HTTP server utilities for Bun adapters.
 *
 * Provides `startBunServer` which wraps `Bun.serve()`.
 * Unlike Node's `http.createServer`, Bun natively supports the
 * Web API `Request`/`Response` pattern, so no conversion is needed.
 */

export interface BunServerOptions {
  host?: string;
  port?: number;

  /** Called when the server starts listening. */
  onListening?: (info: { port: number; host: string }) => void;
}

export interface BunServerHandle {
  ready: Promise<void>;
  close(): void;
}

/**
 * Start a Bun HTTP server using `Bun.serve()`.
 *
 * `handler` receives a raw Web API Request and must return a
 * Response — the same WinterCG signature as `Application.fetch()`.
 *
 * Returns a handle with a `ready` promise (resolves immediately)
 * and a `close()` method to stop the server.
 *
 * @param handler - Fetch handler matching WinterCG signature.
 * @param options - Server options (port, host, callback).
 * @returns A handle to control the server lifecycle.
 */
export function startBunServer(
  handler: (request: Request) => Promise<Response>,
  options: BunServerOptions = {}
): BunServerHandle {
  try {
    const port = options.port;
    const hostname = options.host ?? '0.0.0.0';

    const server = Bun.serve({
      fetch: (request) => handler(request),
      port,
      hostname,
    });

    options.onListening?.({ port: server.port, host: hostname });

    return {
      ready: Promise.resolve(),
      close: () => server.stop(),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
