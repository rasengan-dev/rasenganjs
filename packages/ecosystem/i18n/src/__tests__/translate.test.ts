import { describe, expect, it } from 'vitest';
import {
  interpolate,
  isPluralMessage,
  selectPluralForm,
  translate,
} from '../utils/translate.js';

const resources = {
  fr: {
    translation: {
      greeting: 'Bonjour {name}',
      credits: {
        left: 'Il en reste {n}',
        count: { one: '{count} crédit', other: '{count} crédits' },
        changes: {
          '=0': 'Aucune modification',
          one: '{count} modification',
          other: '{count} modifications',
        },
      },
    },
  },
  en: {
    translation: {
      credits: {
        count: { one: '{count} credit', other: '{count} credits' },
      },
    },
  },
};

describe('interpolate', () => {
  it('replaces each placeholder with its value', () => {
    expect(interpolate('Version {n} of {total}', { n: 3, total: 8 })).toBe(
      'Version 3 of 8'
    );
  });

  it('accepts spaces inside the braces', () => {
    expect(interpolate('Hello { name }', { name: 'Ada' })).toBe('Hello Ada');
  });

  it('leaves a placeholder without a value as is', () => {
    expect(interpolate('Hello {name}', { other: 1 })).toBe('Hello {name}');
    expect(interpolate('Hello {name}')).toBe('Hello {name}');
  });

  it('replaces a placeholder used twice', () => {
    expect(interpolate('{n} + {n}', { n: 2 })).toBe('2 + 2');
  });
});

describe('plurals', () => {
  it('recognises a plural message', () => {
    expect(isPluralMessage({ one: 'a', other: 'b' })).toBe(true);
    expect(isPluralMessage({ '=0': 'none', other: 'b' })).toBe(true);
    expect(isPluralMessage({ one: 'a' })).toBe(false);
    expect(isPluralMessage({ title: 'a', other: 'b' })).toBe(false);
    expect(isPluralMessage('text')).toBe(false);
  });

  it('follows the plural rules of the locale', () => {
    const forms = { one: 'one', other: 'other' };
    // French: 0 and 1 are singular; English: only 1.
    expect(selectPluralForm(forms, 0, 'fr')).toBe('one');
    expect(selectPluralForm(forms, 0, 'en')).toBe('other');
    expect(selectPluralForm(forms, 1, 'en')).toBe('one');
    expect(selectPluralForm(forms, 12, 'fr')).toBe('other');
  });

  it('prefers an exact match', () => {
    expect(selectPluralForm({ '=0': 'none', other: 'many' }, 0, 'en')).toBe(
      'none'
    );
  });

  it('falls back to other when the category is missing', () => {
    expect(selectPluralForm({ other: 'many' }, 1, 'en')).toBe('many');
  });
});

describe('translate', () => {
  it('interpolates a message', () => {
    expect(
      translate(resources, 'fr', 'greeting', undefined, { name: 'Ada' })
    ).toBe('Bonjour Ada');
    expect(translate(resources, 'fr', 'left', 'credits', { n: 12 })).toBe(
      'Il en reste 12'
    );
  });

  it('picks the plural form from count', () => {
    expect(
      translate(resources, 'fr', 'credits.count', undefined, { count: 1 })
    ).toBe('1 crédit');
    expect(
      translate(resources, 'fr', 'credits.count', undefined, { count: 12 })
    ).toBe('12 crédits');
    expect(translate(resources, 'en', 'count', 'credits', { count: 1 })).toBe(
      '1 credit'
    );
    expect(translate(resources, 'fr', 'changes', 'credits', { count: 0 })).toBe(
      'Aucune modification'
    );
  });

  it('returns the key path when the key is missing', () => {
    expect(translate(resources, 'fr', 'nope')).toBe('translation.nope');
    expect(translate(resources, 'fr', 'nope', 'credits')).toBe(
      'translation.credits.nope'
    );
    expect(translate(resources, 'de', 'greeting')).toBe('translation.greeting');
  });

  it('returns the key path for a plural message without count', () => {
    expect(translate(resources, 'fr', 'credits.count')).toBe(
      'translation.credits.count'
    );
  });

  it('returns the key path for a group of messages', () => {
    expect(translate(resources, 'fr', 'credits')).toBe('translation.credits');
  });
});
