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
    callback: () => void;

    /** Debounce window in milliseconds (default 100) */
    debounceMs?: number;
  };
}
