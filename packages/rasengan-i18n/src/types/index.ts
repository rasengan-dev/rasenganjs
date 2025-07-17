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
  resources: Resources;

  // actions
  setLocale: (locale: string) => void;
};

/**
 * i18n config type
 */
export type I18nConfig = {
  /**
   * Default locale
   */
  defaultLocale: string;

  /**
   * Available locales
   */
  locales: string[];

  /**
   * Detection config
   */
  detection?: {
    /**
     * Detection order
     * @default ["path"]
     */
    order?: I18nDetectionOrder[];
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
