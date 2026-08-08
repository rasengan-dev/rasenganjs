import I18nContext from '../contexts/index.js';
import { use } from 'react';
import { useLocation, useNavigate } from 'rasengan';

export function useLocale() {
  const { locale, locales, setLocale: updateLocale } = use(I18nContext);

  const location = useLocation(); // e.g. { pathname: '/en/dashboard' }
  const navigate = useNavigate();

  const setLocale = (newLocale: string) => {
    // Check if newLocale is supported
    if (!locales.includes(newLocale)) {
      throw new Error(`Locale ${newLocale} is not supported`);
    }

    // Strip the old locale from the pathname
    const pathWithoutLocale = location.pathname.replace(`/${locale}`, '');

    // Navigate to the same path with new locale
    navigate(`/${newLocale}${pathWithoutLocale}`, {
      replace: true,
    });

    updateLocale(newLocale);
  };

  return {
    locale,
    setLocale,
  };
}
