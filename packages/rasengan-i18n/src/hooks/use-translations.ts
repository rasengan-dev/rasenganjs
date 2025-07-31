import { use } from 'react';
import I18nContext from '../contexts/index.js';
import {
  checkResources,
  getNestedValue,
  flattenObject,
} from '../utils/index.js';

interface TranslationOptions {
  [key: string]: string | number;
}

export const useTranslations = (namespace?: string) => {
  const { resources, locale } = use(I18nContext);

  const t = (key: string, options?: TranslationOptions): string => {
    checkResources(resources);

    const currentResource = resources[locale];
    if (!currentResource) {
      return namespace
        ? `translation.${namespace}.${key}`
        : `translation.${key}`;
    }

    let translation: string;
    if (namespace) {
      // If namespace is provided, look for the key within that namespace
      const namespaceData = getNestedValue(
        currentResource['translation'],
        namespace
      );
      if (namespaceData) {
        // Try to get the value directly from the namespace
        const namespaceValue = getNestedValue(namespaceData, key);
        if (namespaceValue !== undefined) {
          translation = namespaceValue;
        } else {
          return `translation.${namespace}.${key}`;
        }
      } else {
        return `translation.${namespace}.${key}`;
      }
    } else {
      // Fallback: try the key as is in the root translation
      const rootValue = getNestedValue(currentResource['translation'], key);
      if (rootValue !== undefined) {
        translation = rootValue;
      } else {
        // Return fallback if nothing found
        return `translation.${key}`;
      }
    }

    // Final fallback
    if (translation === undefined) {
      return namespace
        ? `translation.${namespace}.${key}`
        : `translation.${key}`;
    }

    // Handle interpolation
    // if (options && typeof translation === 'string') {
    //   let interpolatedTranslation = translation;
    //   Object.entries(options).forEach(([placeholder, value]) => {
    //     const regex = new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g');
    //     interpolatedTranslation = interpolatedTranslation.replace(
    //       regex,
    //       String(value)
    //     );
    //   });

    //   return interpolatedTranslation;
    // }

    return String(translation);
  };

  return t;
};
