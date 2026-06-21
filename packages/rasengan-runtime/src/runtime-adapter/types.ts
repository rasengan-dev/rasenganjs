import type { Application } from '../app/index.js';
import type { ServeOptions } from './serve-options.js';

/**
 * RuntimeAdapter — platform-agnostic interface for serving HTTP,
 * watching files, and accessing assets.
 *
 * Every platform package (@rasenganjs/runtime-node,
 * @rasenganjs/runtime-bun, etc.) implements this interface so
 * the Application can run anywhere without changing its code.
 *
 * Methods marked with ? are optional — a production adapter
 * may omit watch(), and a serverless adapter may implement
 * assets differently.
 */
export interface RuntimeAdapter {
  /**
   * Start an HTTP server and dispatch incoming requests to
   * the given Application.
   *
   * `app` may be omitted if `options.autoRestart.entry` is
   * provided — the adapter loads the entry module itself.
   *
   * If `options.watch` is provided and the platform supports
   * file watching, the watcher starts automatically and runs
   * until the server closes.
   *
   * The returned Promise resolves when the server closes.
   */
  serve(app?: Application | null, options?: ServeOptions): Promise<void>;

  /**
   * Stop the server and release all resources (file watchers,
   * child processes, network sockets).  After calling close()
   * the adapter must not be reused.
   */
  close(): void;

  /**
   * Watch a file or directory for changes.
   *
   * Returns a dispose function that stops the watcher.
   * Implementations should debounce rapid change events.
   */
  watch?(path: string, callback: () => void): () => void;

  /**
   * Platform-specific asset storage abstraction.
   *
   * In Node this reads/writes the local filesystem.
   * In serverless environments this could map to S3, R2, etc.
   * All paths are relative to the platform's configured root.
   */
  assets: {
    /** Read a file. Returns null if not found. */
    get(path: string): Promise<Uint8Array | null>;

    /**
     * Read a file and decode its content as UTF-8 text.
     * Returns null if not found.
     */
    load(path: string): Promise<string | null>;

    /** Write a file, creating parent directories if needed. */
    write(path: string, data: Uint8Array): Promise<void>;

    /** Delete a file or empty directory. No-op if missing. */
    delete(path: string): Promise<void>;

    /** List all entries under a prefix/directory. */
    list(prefix: string): Promise<string[]>;
  };
}
