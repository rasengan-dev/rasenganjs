import i18n from 'virtual:rasengan:i18n';
import I18nContext from '../contexts/index.js';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export function RasenganI18nProvider({ children }: Props) {
  const [locale, setLocale] = useState(i18n.config.defaultLocale);

  console.log({ i18n });

  return (
    <I18nContext value={{ locale, resources: i18n.resources, setLocale }}>
      {children}
    </I18nContext>
  );
}
