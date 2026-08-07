import { describe, it, expect } from 'vitest';
import { defineStaticPaths } from '../../../routing/utils/define-static-paths.js';

describe('defineStaticPaths', () => {
  it('wraps each item as { params }', () => {
    expect(defineStaticPaths([{ id: '1' }, { id: '2' }])).toEqual({
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    });
  });

  it('returns an empty paths array for no items', () => {
    expect(defineStaticPaths([])).toEqual({ paths: [] });
  });

  it('preserves multi-key params objects as-is', () => {
    expect(defineStaticPaths([{ locale: 'fr', id: '42' }])).toEqual({
      paths: [{ params: { locale: 'fr', id: '42' } }],
    });
  });
});
