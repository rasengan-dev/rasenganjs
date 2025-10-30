import { I18nConfig, Resources } from '../types/index.js';

/**
 * Generates a unique identifier string.
 * @returns {string} A unique 9-character string.
 */
export const uniqueId = (): string => {
  return Math.random().toString(36).slice(2, 11);
};

/**
 * Flattens a nested object into a flat object with dot notation keys
 */
export const flattenObject = (
  obj: Record<string, any>,
  prefix = ''
): Record<string, string> => {
  const flattened: Record<string, string> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(flattened, flattenObject(obj[key], newKey));
      } else {
        flattened[newKey] = String(obj[key]);
      }
    }
  }

  return flattened;
};

/**
 * Gets a nested value from an object using dot notation
 */
export const getNestedValue = (obj: Record<string, any>, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

/**
 * This function generates a default configuration object based on the provided configuration.
 *
 * @param config The configuration object to generate a default configuration from.
 * @returns
 */
export const generateDefaultConfig = (config?: I18nConfig): I18nConfig => {
  try {
    return {
      defaultLocale: config?.defaultLocale || 'en',
      detection: {
        order: config?.detection?.order || ['path'],
      },
      resources: {
        source: config?.resources?.source || '/src/messages',
      },
    };
  } catch (error) {
    return {
      defaultLocale: 'en',
      detection: {
        order: ['path'],
      },
      resources: {
        source: '/src/messages',
      },
    };
  }
};

/**
 * This function checks the resources based on the provided configuration.
 *
 * @param resources The resources object to check.
 */
export const checkResources = (resources: Resources) => {
  // Make sure that the resources are not empty
  if (Object.keys(resources).length === 0) {
    throw new Error('[rasengan:i18n]: No resources found');
  }

  // Make sure that each entry has a translation key
  Object.entries(resources).forEach(([locale, resource]) => {
    if (!resource['translation']) {
      throw new Error(
        `[rasengan:i18n]: No translation key found for locale ${locale}`
      );
    }
  });
};
