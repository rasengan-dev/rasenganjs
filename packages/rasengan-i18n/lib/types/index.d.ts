/**
 * Resources types describing how translations are structured
 */
export type ResourceItem = Record<string, any>;
export type Resources = Record<string, ResourceItem>;
/**
 * i18n context type
 */
export type I18nContext = {
  locale: string;
  locales: string[];
  resources: Resources;
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
export declare const I18nDetectionOrders: {
  readonly PATH: 'path';
  readonly COOKIE: 'cookie';
  readonly LOCAL_STORAGE: 'localStorage';
  readonly SUBDOMAIN: 'subdomain';
  readonly QUERYSTRING: 'querystring';
  readonly ACCEPT_LANGUAGE: 'acceptLanguage';
};
export type I18nDetectionOrder =
  (typeof I18nDetectionOrders)[keyof typeof I18nDetectionOrders];
