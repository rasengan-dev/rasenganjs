import { I18nDetectionOrder } from '../types/index.js';
import { detectLocale } from './detect.js';

/**
 * The locale when it lives outside the URL (`routing: "none"`): detected in
 * the browser, saved in `localStorage`, shared by every tab. Read through
 * `useSyncExternalStore`, so the server and the first hydrated render use
 * `defaultLocale` and the browser's choice follows right after.
 */
export interface LocaleStore {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string;
  getServerSnapshot: () => string;
  setLocale: (locale: string) => void;
}

const readStorage = (key: string): string | null => {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode, quota): the choice then only
    // lasts until the page is reloaded.
  }
};

export const createLocaleStore = (options: {
  defaultLocale: string;
  locales: readonly string[];
  order: readonly I18nDetectionOrder[];
  storageKey: string;
}): LocaleStore => {
  const { defaultLocale, locales, order, storageKey } = options;
  const listeners = new Set<() => void>();

  // Set by `setLocale`, so the choice holds even when storage is unavailable.
  let chosen: string | null = null;

  const notify = () => listeners.forEach((listener) => listener());

  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey) {
      chosen = null;
      notify();
    }
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) {
        globalThis.addEventListener?.('storage', onStorage);
      }

      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          globalThis.removeEventListener?.('storage', onStorage);
        }
      };
    },

    getSnapshot() {
      if (chosen) return chosen;

      return detectLocale(order, locales, defaultLocale, {
        stored: readStorage(storageKey),
        languages: globalThis.navigator?.languages,
      });
    },

    getServerSnapshot() {
      return defaultLocale;
    },

    setLocale(locale) {
      chosen = locale;
      writeStorage(storageKey, locale);
      notify();
    },
  };
};
