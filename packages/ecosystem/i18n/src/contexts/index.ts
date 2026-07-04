import { createContext } from 'react';
import { I18nContext } from '../types';

/**
 * Provides a React context for managing the application's i18n.
 * The context includes the current locale, the resources being used (which may differ from the current locale),
 * the default locale, and a function to set the locale.
 */
export default createContext<I18nContext>({
  locale: 'en',
  locales: [],
  resources: {},

  setLocale: () => {},
});
