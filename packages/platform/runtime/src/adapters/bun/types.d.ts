/**
 * Minimal ambient declarations for Bun runtime globals used by
 * @rasenganjs/runtime.
 *
 * This avoids a dependency on `bun-types` while still providing
 * type safety during compilation (tsup DTS generation on Node).
 */

declare var Bun: {
  /** Start an HTTP server using Bun.serve(). */
  serve(options: {
    fetch: (request: Request) => Response | Promise<Response>;
    port?: number;
    hostname?: string;
  }): {
    stop(): void;
    readonly url: URL;
    readonly port: number;
  };

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
