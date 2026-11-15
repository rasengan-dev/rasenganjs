import I18nContext from '../contexts/index.js';
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  ReactNode,
} from 'react';
import { useParams } from 'rasengan';
import { I18nConfig, Resources } from '../types/index.js';
import { generateDefaultConfig } from '../utils/index.js';
import { createLocaleStore } from '../utils/store.js';

interface Props {
  children: ReactNode;
  i18n: {
    resources: Resources;
    config: I18nConfig;
    locales: string[];
  };
}

export function RasenganI18nProvider({ children, i18n }: Props) {
  const config = useMemo(
    () => generateDefaultConfig(i18n.config),
    [i18n.config]
  );
  const routing = config.routing!;

  // routing: "path", the locale comes from the `:locale` route param.
  const { locale: localeParam } = useParams();
  const [pathLocale, setPathLocale] = useState(config.defaultLocale);

  useEffect(() => {
    if (localeParam && i18n.locales.includes(localeParam)) {
      setPathLocale(localeParam);
    }
  }, [localeParam]);

  // routing: "none", the locale is a preference kept in the browser.
  const store = useMemo(
    () =>
      createLocaleStore({
        defaultLocale: config.defaultLocale,
        locales: i18n.locales,
        order: config.detection!.order!,
        storageKey: config.detection!.storageKey!,
      }),
    [config, i18n.locales]
  );

  const storedLocale = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const locale = routing === 'none' ? storedLocale : pathLocale;
  const setLocale = routing === 'none' ? store.setLocale : setPathLocale;

  useEffect(() => {
    if (routing === 'none' && typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [routing, locale]);

  return (
    <I18nContext
      value={{
        locale,
        locales: i18n.locales,
        resources: i18n.resources,
        routing,
        setLocale,
      }}
    >
      {children}
    </I18nContext>
  );
}
