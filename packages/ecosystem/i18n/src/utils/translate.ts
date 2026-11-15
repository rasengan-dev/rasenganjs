import { Resources } from '../types/index.js';
import { getNestedValue } from './index.js';

/**
 * Values passed to `t(key, values)`. `count` selects the plural form.
 */
export type TranslationValues = Record<string, string | number>;

const PLACEHOLDER = /\{\s*([A-Za-z0-9_]+)\s*\}/g;

const PLURAL_CATEGORIES = ['zero', 'one', 'two', 'few', 'many', 'other'];

const pluralRulesCache = new Map<string, Intl.PluralRules>();

const getPluralRules = (locale: string): Intl.PluralRules => {
  let rules = pluralRulesCache.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRulesCache.set(locale, rules);
  }
  return rules;
};

/**
 * Replaces each `{name}` in `message` with `values[name]`.
 * A placeholder without a value is left as is.
 */
export const interpolate = (
  message: string,
  values?: TranslationValues
): string => {
  if (!values) return message;

  return message.replace(PLACEHOLDER, (placeholder, name: string) =>
    Object.prototype.hasOwnProperty.call(values, name)
      ? String(values[name])
      : placeholder
  );
};

/**
 * True when `value` is a plural message: an object whose keys are plural
 * categories (`one`, `other`…) or exact matches (`=0`), with `other` required.
 */
export const isPluralMessage = (
  value: unknown
): value is Record<string, string> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const keys = Object.keys(value);

  return (
    keys.includes('other') &&
    keys.every(
      (key) =>
        (PLURAL_CATEGORIES.includes(key) || /^=\d+$/.test(key)) &&
        typeof (value as Record<string, unknown>)[key] === 'string'
    )
  );
};

/**
 * Picks the form of a plural message for `count`: an exact match (`=0`) first,
 * then the category given by `Intl.PluralRules` for the locale, then `other`.
 */
export const selectPluralForm = (
  forms: Record<string, string>,
  count: number,
  locale: string
): string => {
  const exact = forms[`=${count}`];
  if (exact !== undefined) return exact;

  const category = getPluralRules(locale).select(count);

  return forms[category] ?? forms.other;
};

/**
 * Resolves `key` (in `namespace`, if given) for `locale`, picks the plural
 * form when the message has one, and interpolates `values`.
 * Returns `translation.<namespace>.<key>` when the key is missing.
 */
export const translate = (
  resources: Resources,
  locale: string,
  key: string,
  namespace?: string,
  values?: TranslationValues
): string => {
  const missing = namespace
    ? `translation.${namespace}.${key}`
    : `translation.${key}`;

  const root = resources[locale]?.['translation'];
  if (!root) return missing;

  const scope = namespace ? getNestedValue(root, namespace) : root;
  if (scope === undefined || scope === null) return missing;

  const message = getNestedValue(scope, key);
  if (message === undefined || message === null) return missing;

  if (isPluralMessage(message)) {
    const count = values?.count;
    if (typeof count !== 'number') return missing;

    return interpolate(selectPluralForm(message, count, locale), values);
  }

  if (typeof message === 'object') return missing;

  return interpolate(String(message), values);
};
