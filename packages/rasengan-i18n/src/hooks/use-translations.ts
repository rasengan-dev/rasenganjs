import { use } from 'react';
import I18nContext from '../contexts/index.js';
import { checkResources } from '../utils/index.js';

export const useTranslations = (namespace?: string) => {
  const { resources, locale } = use(I18nContext);

  const t = (key: string): string => {
    checkResources(resources);

    return resources[locale]['translation'][key] || key;
  };

  return t;
};
