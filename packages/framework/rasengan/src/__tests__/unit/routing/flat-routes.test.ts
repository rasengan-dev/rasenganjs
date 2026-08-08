import { describe, it, expect } from 'vitest';
import {
  normalizeSegment,
  getPathSegments,
} from '../../../routing/utils/flat-routes.js';

describe('normalizeSegment', () => {
  it('maps "index" to the "." leaf marker', () => {
    expect(normalizeSegment('index')).toBe('.');
  });

  it('maps a dynamic segment [param] to :param', () => {
    expect(normalizeSegment('[id]')).toBe(':id');
  });

  it('maps an optional dynamic segment [_param] to :param?', () => {
    expect(normalizeSegment('[_locale]')).toBe(':locale?');
  });

  it('maps an optional static segment _edit to edit?', () => {
    expect(normalizeSegment('_edit')).toBe('edit?');
  });

  it('leaves a route group segment (parens) unchanged', () => {
    expect(normalizeSegment('(admin)')).toBe('(admin)');
  });

  it('leaves a plain static segment unchanged', () => {
    expect(normalizeSegment('pricing')).toBe('pricing');
  });

  it('does not treat a single "_" as an optional segment (needs length > 1)', () => {
    expect(normalizeSegment('_')).toBe('_');
  });
});

describe('getPathSegments', () => {
  it('turns a nested .page.tsx file into normalized segments', () => {
    expect(
      getPathSegments('/src/app/_routes/docs/getting-started.page.tsx')
    ).toEqual(['docs', 'getting-started']);
  });

  it('turns index.page.tsx into the "." leaf marker', () => {
    expect(getPathSegments('/src/app/_routes/docs/index.page.tsx')).toEqual([
      'docs',
      '.',
    ]);
  });

  it('turns layout.tsx into a trailing "_" layout marker', () => {
    expect(getPathSegments('/src/app/_routes/docs/layout.tsx')).toEqual([
      'docs',
      '_',
    ]);
  });

  it('normalizes dynamic segments inside the path', () => {
    expect(
      getPathSegments('/src/app/_routes/[_locale]/profile/[id].page.tsx')
    ).toEqual([':locale?', 'profile', ':id']);
  });

  it('supports .mdx/.md pages, not just .tsx', () => {
    expect(getPathSegments('/src/app/_routes/blog/post.page.mdx')).toEqual([
      'blog',
      'post',
    ]);
  });

  it('with foldersOnly: true, returns only folder segments, dropping the filename', () => {
    expect(
      getPathSegments('/src/app/_routes/[_locale]/profile/[id].page.tsx', true)
    ).toEqual([':locale?', 'profile']);
  });

  it('with foldersOnly: true, a top-level file has no folder segments', () => {
    expect(getPathSegments('/src/app/_routes/index.page.tsx', true)).toEqual(
      []
    );
  });
});
