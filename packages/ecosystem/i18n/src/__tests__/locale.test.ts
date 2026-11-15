import { afterEach, describe, expect, it, vi } from 'vitest';
import { detectLocale, matchLocale } from '../utils/detect.js';
import { createLocaleStore } from '../utils/store.js';
import { generateDefaultConfig } from '../utils/index.js';

const locales = ['en', 'fr'];

describe('matchLocale', () => {
  it('matches exactly, then by base language', () => {
    expect(matchLocale('fr', locales)).toBe('fr');
    expect(matchLocale('fr-CM', locales)).toBe('fr');
    expect(matchLocale('EN-us', locales)).toBe('en');
    expect(matchLocale('de', locales)).toBeUndefined();
  });
});

describe('detectLocale', () => {
  const order = ['localStorage', 'acceptLanguage'] as const;

  it('uses the saved locale first', () => {
    expect(
      detectLocale(order, locales, 'en', { stored: 'fr', languages: ['en'] })
    ).toBe('fr');
  });

  it('ignores a saved locale that is not supported', () => {
    expect(
      detectLocale(order, locales, 'en', { stored: 'de', languages: ['fr-FR'] })
    ).toBe('fr');
  });

  it('then the browser languages, in order', () => {
    expect(
      detectLocale(order, locales, 'en', { languages: ['de', 'fr-CM', 'en'] })
    ).toBe('fr');
  });

  it('then the default locale', () => {
    expect(detectLocale(order, locales, 'fr', { languages: ['de'] })).toBe(
      'fr'
    );
    expect(detectLocale(order, locales, 'fr', {})).toBe('fr');
  });

  it('follows the configured order', () => {
    expect(
      detectLocale(['acceptLanguage', 'localStorage'], locales, 'en', {
        stored: 'en',
        languages: ['fr'],
      })
    ).toBe('fr');
  });
});

describe('generateDefaultConfig', () => {
  it('keeps the locale in the path by default', () => {
    const config = generateDefaultConfig({ defaultLocale: 'fr' });
    expect(config.routing).toBe('path');
    expect(config.detection?.order).toEqual(['path']);
  });

  it('reads the browser when the locale is outside the URL', () => {
    const config = generateDefaultConfig({
      defaultLocale: 'fr',
      routing: 'none',
    });
    expect(config.detection?.order).toEqual(['localStorage', 'acceptLanguage']);
    expect(config.detection?.storageKey).toBe('rasengan-locale');
  });
});

describe('createLocaleStore', () => {
  const memoryStorage = () => {
    const data = new Map<string, string>();
    return {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => void data.set(key, value),
    };
  };

  const options = {
    defaultLocale: 'en',
    locales,
    order: ['localStorage', 'acceptLanguage'] as const,
    storageKey: 'rasengan-locale',
  };

  afterEach(() => vi.unstubAllGlobals());

  it('renders the default locale on the server', () => {
    vi.stubGlobal('navigator', { languages: ['fr'] });
    expect(createLocaleStore(options).getServerSnapshot()).toBe('en');
  });

  it('detects the browser language', () => {
    vi.stubGlobal('localStorage', memoryStorage());
    vi.stubGlobal('navigator', { languages: ['fr-FR'] });
    expect(createLocaleStore(options).getSnapshot()).toBe('fr');
  });

  it('saves the chosen locale, which holds after a reload', () => {
    const storage = memoryStorage();
    vi.stubGlobal('localStorage', storage);
    vi.stubGlobal('navigator', { languages: ['en'] });

    const store = createLocaleStore(options);
    const listener = vi.fn();
    store.subscribe(listener);
    store.setLocale('fr');

    expect(listener).toHaveBeenCalledOnce();
    expect(store.getSnapshot()).toBe('fr');
    expect(storage.getItem('rasengan-locale')).toBe('fr');

    // A new page load reads the saved choice.
    expect(createLocaleStore(options).getSnapshot()).toBe('fr');
  });

  it('keeps the choice when storage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('denied');
      },
      setItem: () => {
        throw new Error('denied');
      },
    });
    vi.stubGlobal('navigator', { languages: ['en'] });

    const store = createLocaleStore(options);
    store.setLocale('fr');
    expect(store.getSnapshot()).toBe('fr');
  });
});
