import I18nContext from '../contexts/index.js';
import { useEffect, useState, ReactNode } from 'react';
import { useParams } from 'rasengan';
import { I18nConfig, Resources } from '../types/index.js';

interface Props {
  children: ReactNode;
  i18n: {
    resources: Resources;
    config: I18nConfig;
    locales: string[];
  };
}

export function RasenganI18nProvider({ children, i18n }: Props) {
  const { locale: defaultLocale } = useParams();
  const [locale, setLocale] = useState(i18n.config.defaultLocale);

  useEffect(() => {
    if (defaultLocale && i18n.locales.includes(defaultLocale)) {
      setLocale(defaultLocale);
    }
  }, [defaultLocale]);

  return (
    <I18nContext
      value={{
        locale,
        locales: i18n.locales,
        resources: i18n.resources,
        setLocale,
      }}
    >
      {children}
    </I18nContext>
  );
}
