import { I18nDetectionOrder } from '../types/index.js';

export const DEFAULT_STORAGE_KEY = 'rasengan-locale';

/**
 * What the browser tells us, passed in so detection stays testable.
 */
export interface DetectionSources {
  /** The locale saved by a previous `setLocale`, if any. */
  stored?: string | null;
  /** `navigator.languages`, most preferred first. */
  languages?: readonly string[];
}

/**
 * Matches a browser language (`fr-CM`) against the supported locales:
 * exactly first, then by its base language (`fr`).
 */
export const matchLocale = (
  language: string,
  locales: readonly string[]
): string | undefined => {
  const lower = language.toLowerCase();
  const exact = locales.find((locale) => locale.toLowerCase() === lower);
  if (exact) return exact;

  const base = lower.split('-')[0];
  return locales.find((locale) => locale.toLowerCase().split('-')[0] === base);
};

/**
 * Detects the locale when it is not in the URL, following `order`.
 * Only `localStorage` and `acceptLanguage` are read here; the other orders are
 * skipped. Falls back to `defaultLocale`.
 */
export const detectLocale = (
  order: readonly I18nDetectionOrder[],
  locales: readonly string[],
  defaultLocale: string,
  sources: DetectionSources
): string => {
  for (const source of order) {
    if (source === 'localStorage' && sources.stored) {
      if (locales.includes(sources.stored)) return sources.stored;
    }

    if (source === 'acceptLanguage' && sources.languages) {
      for (const language of sources.languages) {
        const match = matchLocale(language, locales);
        if (match) return match;
      }
    }
  }

  return defaultLocale;
};
