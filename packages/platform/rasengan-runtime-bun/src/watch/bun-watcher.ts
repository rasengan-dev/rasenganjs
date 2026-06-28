import { watch } from 'node:fs';

export class BunWatcher {
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
