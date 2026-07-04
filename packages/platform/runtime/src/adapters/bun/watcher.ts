/**
 * BunWatcher — filesystem watcher using `node:fs.watch`.
 *
 * Bun does not yet provide a native file watcher API, so this
 * implementation uses Node's `fs.watch` (which Bun supports).
 *
 * Debounces rapid change events (default 100ms).
 *
 * @example
 * ```ts
 * const watcher = new BunWatcher();
 * const dispose = watcher.watch('src/', () => rebuild());
 * // later
 * dispose();
 * ```
 */

import { watch } from 'node:fs';

export class BunWatcher {
  /**
   * Watch a file or directory for changes.
   *
   * @param path       - File or directory path to watch.
   * @param callback   - Called (after debounce) when a change is detected.
   * @param debounceMs - Debounce window in milliseconds (default 100).
   * @returns A dispose function that stops the watcher.
   */
  watch(
    path: string,
    callback: () => void,
    debounceMs: number = 100
  ): () => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let aborted = false;

    const watcher = watch(path, { recursive: true }, () => {
      if (aborted) return;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (!aborted) callback();
      }, debounceMs);
    });

    return () => {
      aborted = true;
      if (timer) clearTimeout(timer);
      watcher.close();
    };
  }
}
