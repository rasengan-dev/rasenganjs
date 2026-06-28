/**
 * Options shared by all platform adapters' serve() method.
 * Platform-specific packages may extend this interface.
 */
export interface ServeOptions {
  /**
   * Configure a file watcher that starts automatically
   * when the server starts.
   *
   * The callback fires (after debounce) when any watched
   * file changes.  Use this to rebuild, restart, or notify
   * the dev server.
   */
  watch?: {
    /** File or directory path(s) to watch */
    path: string | string[];

    /** Called when a watched file changes */
    callback?: () => void;

    /** Debounce window in milliseconds (default 100) */
    debounceMs?: number;
  };

  /**
   * Called when the HTTP server starts listening.
   * Receives the resolved port and host the server bound to.
   */
  onListening?: (info: { port: number; host: string }) => void;

  /**
   * Automatically restart the server when watched files
   * change.
   *
   * Requires `watch` to also be set.  When `process` is
   * true (default), the adapter spawns `node <entry>` as a
   * child process and restarts it on file changes — this
   * matches nodemon's model and avoids all ESM caching /
   * global state issues.
   *
   * The `serve()` promise stays pending until `close()`
   * is called, regardless of how many restarts happen.
   */
  autoRestart?: {
    /**
     * Path to the entry script passed to `node <entry>`.
     *
     * The script is responsible for creating its own HTTP
     * server.  The adapter forwards the port via the
     * `PORT` environment variable.
     *
     * @example "./src/dev-server.js"
     */
    entry: string;

    /**
     * Use child-process mode (default: true).
     *
     * When true, the adapter spawns `node <entry>` as an
     * external process — the cleanest form of reload since
     * the OS handles full teardown.  Set to false to fall
     * back to in-process cache-busted import.
     */
    process?: boolean;

    /** Extra arguments passed to the entry script. */
    args?: string[];
  };
}
