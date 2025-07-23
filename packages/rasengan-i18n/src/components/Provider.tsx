import i18n from 'virtual:rasengan:i18n';
import I18nContext from '../contexts/index.js';
import { useEffect, useState } from 'react';
import { useParams } from 'rasengan';

interface Props {
  children: React.ReactNode;
}

export function RasenganI18nProvider({ children }: Props) {
  const { locale: defaultLocale } = useParams();
  const [locale, setLocale] = useState(i18n.config.defaultLocale);

  useEffect(() => {
    console.log({ defaultLocale });
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
