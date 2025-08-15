import { I18nConfig, Resources } from '../types/index.js';
/**
 * Generates a unique identifier string.
 * @returns {string} A unique 9-character string.
 */
export declare const uniqueId: () => string;
/**
 * Flattens a nested object into a flat object with dot notation keys
 */
export declare const flattenObject: (
  obj: Record<string, any>,
  prefix?: string
) => Record<string, string>;
/**
 * Gets a nested value from an object using dot notation
 */
export declare const getNestedValue: (
  obj: Record<string, any>,
  path: string
) => any;
/**
 * This function generates a default configuration object based on the provided configuration.
 *
 * @param config The configuration object to generate a default configuration from.
 * @returns
 */
export declare const generateDefaultConfig: (config?: I18nConfig) => I18nConfig;
/**
 * This function checks the resources based on the provided configuration.
 *
 * @param resources The resources object to check.
 */
export declare const checkResources: (resources: Resources) => void;
