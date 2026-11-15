/**
 * Resources types describing how translations are structured
 */
export type ResourceItem = Record<string, any>;
export type Resources = Record<string, ResourceItem>;

/**
 * i18n context type
 */
export type I18nContext = {
  // state
  locale: string;
  locales: string[];
  resources: Resources;
  routing: I18nRouting;

  // actions
  setLocale: (locale: string) => void;
};

/**
 * Where the locale lives.
 * - `path`: in the URL (`/fr/...`); `setLocale` navigates.
 * - `none`: outside the URL, as a preference; `setLocale` changes the texts
 *   without navigating and saves the choice in `localStorage`.
 */
export type I18nRouting = 'path' | 'none';

/**
 * i18n config type
 */
export type I18nConfig = {
  /**
   * Default locale
   */
  defaultLocale: string;

  /**
   * Where the locale lives
   * @default "path"
   */
  routing?: I18nRouting;

  /**
   * Detection config
   */
  detection?: {
    /**
     * Detection order. With `routing: "none"`, `localStorage` and
     * `acceptLanguage` are read in this order, then `defaultLocale` is used.
     * @default ["path"] with `routing: "path"`,
     * ["localStorage", "acceptLanguage"] with `routing: "none"`
     */
    order?: I18nDetectionOrder[];

    /**
     * `localStorage` key where the chosen locale is saved (`routing: "none"`)
     * @default "rasengan-locale"
     */
    storageKey?: string;
  };

  /**
   * Resources config
   */
  resources?: {
    /**
     * Path to the resources source
     * @default "/src/messages"
     */
    source?: string;
  };
};

export const I18nDetectionOrders = {
  PATH: 'path',
  COOKIE: 'cookie',
  LOCAL_STORAGE: 'localStorage',
  SUBDOMAIN: 'subdomain',
  QUERYSTRING: 'querystring',
  ACCEPT_LANGUAGE: 'acceptLanguage',
} as const;

export type I18nDetectionOrder =
  (typeof I18nDetectionOrders)[keyof typeof I18nDetectionOrders];
