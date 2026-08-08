import { describe, it, expect } from 'vitest';
import { defineRoutesGroup } from '../../../routing/utils/define-routes-group.js';
import type {
  PageComponent,
  MDXPageComponent,
} from '../../../routing/types.js';

function page(path: string): PageComponent {
  const P: PageComponent = () => null;
  P.path = path;
  return P;
}

describe('defineRoutesGroup', () => {
  it('prefixes each page path with the group path', () => {
    const [a, b] = defineRoutesGroup({
      path: '/docs',
      children: [page('/intro'), page('/setup')],
    }) as PageComponent[];

    expect(a.path).toBe('/docs/intro');
    expect(b.path).toBe('/docs/setup');
  });

  it('strips a leading slash from the page path before joining', () => {
    const [a] = defineRoutesGroup({
      path: '/docs',
      children: [page('setup')],
    }) as PageComponent[];

    expect(a.path).toBe('/docs/setup');
  });

  it('adds a leading slash to the group path if missing', () => {
    const [a] = defineRoutesGroup({
      path: 'docs',
      children: [page('intro')],
    }) as PageComponent[];

    expect(a.path).toBe('/docs/intro');
  });

  it('treats "/" as an empty prefix, not a doubled slash', () => {
    const [a] = defineRoutesGroup({
      path: '/',
      children: [page('/pricing')],
    }) as PageComponent[];

    expect(a.path).toBe('/pricing');
  });

  it('recursively flattens nested arrays of pages', () => {
    const pages = defineRoutesGroup({
      path: '/docs',
      children: [page('/intro'), [page('/a'), page('/b')]],
    }) as PageComponent[];

    expect(pages.map((p) => p.path)).toEqual([
      '/docs/intro',
      '/docs/a',
      '/docs/b',
    ]);
  });

  it('rewrites metadata.path for an MDX page instead of .path', () => {
    const MdxPage = {
      metadata: { path: 'guide' },
    } as unknown as MDXPageComponent;

    const [result] = defineRoutesGroup({
      path: '/docs',
      children: [MdxPage],
    }) as MDXPageComponent[];

    expect(result.metadata.path).toBe('/docs/guide');
  });

  it('falls back to the function name for an MDX page with no metadata.path', () => {
    function about() {}
    const MdxPage = Object.assign(about, {
      metadata: {},
    }) as unknown as MDXPageComponent;

    const [result] = defineRoutesGroup({
      path: '/docs',
      children: [MdxPage],
    }) as MDXPageComponent[];

    expect(result.metadata.path).toBe('/docs/about');
  });
});
