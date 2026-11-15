import { use } from 'react';
import I18nContext from '../contexts/index.js';
import { checkResources } from '../utils/index.js';
import { translate, type TranslationValues } from '../utils/translate.js';

export type { TranslationValues };

/**
 * Returns `t(key, values?)`. `{name}` in a message is replaced by
 * `values.name`; a plural message (`{ "one": …, "other": … }`) picks its form
 * from `values.count`.
 */
export const useTranslations = (namespace?: string) => {
  const { resources, locale } = use(I18nContext);

  const t = (key: string, values?: TranslationValues): string => {
    checkResources(resources);

    return translate(resources, locale, key, namespace, values);
  };

  return t;
};
