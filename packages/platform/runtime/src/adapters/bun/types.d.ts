/**
 * Minimal ambient declarations for Bun runtime globals used by
 * @rasenganjs/runtime.
 *
 * This avoids a dependency on `bun-types` while still providing
 * type safety during compilation (tsup DTS generation on Node).
 *
 * `BunServer` / `ServerWebSocket` (RFC-0001) were verified against a real
 * `bun@1.3.8` process rather than transcribed from memory — Bun's
 * `websocket` handler object has no `error` callback (unlike Node's `ws`),
 * so `WebSocketHandlers.error` is intentionally never wired for Bun; see
 * `adapters/bun/websocket.ts`.
 */

declare var Bun: {
  /** Start an HTTP server using Bun.serve(). */
  serve<T = unknown>(options: {
    /**
     * Return `undefined` (not a `Response`) after a successful
     * `server.upgrade()` call — Bun takes over the connection itself.
     */
    fetch: (
      request: Request,
      server: BunServer<T>
    ) => Response | undefined | Promise<Response | undefined>;
    port?: number;
    hostname?: string;
    /** Required when `fetch` ever calls `server.upgrade()`. */
    websocket?: {
      open?(ws: ServerWebSocket<T>): void;
      message?(ws: ServerWebSocket<T>, message: string | Buffer): void;
      close?(ws: ServerWebSocket<T>, code: number, reason: string): void;
    };
  }): BunServer<T>;

  /** Spawn a child process. */
  spawn(
    command: string[],
    options?: {
      stdio?: Array<'inherit' | 'pipe' | 'ignore'>;
      env?: Record<string, string | undefined>;
      cwd?: string;
    }
  ): {
    kill(signal?: string): void;
    readonly exited: Promise<number>;
    readonly pid: number;
  };

  /** Read a file (lazy — use `.exists()` / `.text()` / `.arrayBuffer()`). */
  file(path: string): {
    exists(): Promise<boolean>;
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBuffer>;
    stream(): ReadableStream;
  };

  /** Write data to a file. */
  write(
    path: string,
    data: string | Uint8Array | ArrayBuffer | Blob
  ): Promise<number>;
};

/** The object returned by `Bun.serve()`, and passed as `fetch`'s 2nd argument. */
declare interface BunServer<T = unknown> {
  stop(closeActiveConnections?: boolean): void;
  readonly url: URL;
  readonly port: number;
  /**
   * Hijack an in-flight request into a WebSocket connection. Returns
   * `true` on success (the `fetch` handler must then return `undefined`),
   * `false` if the request isn't a valid upgrade request.
   */
  upgrade<U = T>(
    request: Request,
    options?: { data?: U; headers?: HeadersInit }
  ): boolean;
}

/** A single Bun-native WebSocket connection, as seen by the `websocket` handlers. */
declare interface ServerWebSocket<T = unknown> {
  /** Whatever was passed as `{ data }` to `server.upgrade()`. */
  readonly data: T;
  readonly readyState: number;
  /** `undefined` when no subprotocol was negotiated (verified against real Bun). */
  readonly protocol: string | undefined;
  send(
    data: string | ArrayBufferView | ArrayBuffer,
    compress?: boolean
  ): number;
  close(code?: number, reason?: string): void;
}
