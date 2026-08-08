import { describe, it, expect } from 'vitest';
import { getAllRoutesPath } from '../../../routing/utils/generate-routes.js';
import type { RouteObject, PageComponent } from '../../../routing/types.js';

function staticRoute(path: string, children: RouteObject[] = []): RouteObject {
  return { path, children } as RouteObject;
}

function indexRoute(): RouteObject {
  return { index: true } as RouteObject;
}

function dynamicPageRoute(path: string, Page: PageComponent): RouteObject {
  return {
    path,
    module: () => Promise.resolve({ default: Page }),
  } as RouteObject;
}

function page(generatePaths?: PageComponent['generatePaths']): PageComponent {
  const P: PageComponent = () => null;
  P.generatePaths = generatePaths;
  return P;
}

describe('getAllRoutesPath', () => {
  it('collects static paths from a flat route list', async () => {
    const { paths, error } = await getAllRoutesPath([
      staticRoute('/about'),
      staticRoute('/contact'),
    ]);

    expect(paths.sort()).toEqual(['/about', '/contact']);
    expect(error.size).toBe(0);
  });

  it('resolves an index route to its parent path (or "/" at the root)', async () => {
    const { paths } = await getAllRoutesPath([
      staticRoute('/blog', [indexRoute()]),
    ]);

    expect(paths).toContain('/blog');
  });

  it('resolves a root-level index route to "/"', async () => {
    const { paths } = await getAllRoutesPath([indexRoute()]);
    expect(paths).toEqual(['/']);
  });

  it('recurses into children, joining paths without double slashes', async () => {
    const { paths } = await getAllRoutesPath([
      staticRoute('/blog/', [staticRoute('/posts')]),
    ]);

    expect(paths).toContain('/blog/posts');
  });

  it('deduplicates identical resolved paths', async () => {
    const { paths } = await getAllRoutesPath([
      staticRoute('/dup'),
      staticRoute('/dup'),
    ]);

    expect(paths).toEqual(['/dup']);
  });

  it('resolves a dynamic-segment page via its generatePaths(), substituting the param', async () => {
    const Page = page(async () => ({ paths: [{ params: { slug: 'hello' } }] }));

    const { paths, error } = await getAllRoutesPath([
      dynamicPageRoute('/blog/:slug', Page),
    ]);

    expect(paths).toEqual(['/blog/hello']);
    expect(error.size).toBe(0);
  });

  it('records an error when a dynamic page has no generatePaths()', async () => {
    const Page = page(undefined);

    const { paths, error } = await getAllRoutesPath([
      dynamicPageRoute('/blog/:slug', Page),
    ]);

    expect(paths).toEqual([]);
    expect(Array.from(error)[0]).toMatch(
      /does not have a generatePaths function/
    );
  });

  it('records an error when generatePaths() returns a param not present in the path', async () => {
    const Page = page(async () => ({
      paths: [{ params: { wrongParam: 'x' } }],
    }));

    const { paths, error } = await getAllRoutesPath([
      dynamicPageRoute('/blog/:slug', Page),
    ]);

    expect(paths).toEqual([]);
    expect(Array.from(error)[0]).toMatch(
      /does not have a dynamic segment 'wrongParam'/
    );
  });

  it('skips a dynamic-segment layout route that has no module (children resolve their own params)', async () => {
    const { paths, error } = await getAllRoutesPath([
      staticRoute('/:locale', [staticRoute('/about')]),
    ]);

    // The dynamic layout itself contributes no path (no `module`), but its
    // static child still does, joined onto the layout's raw (unresolved)
    // dynamic segment.
    expect(paths).toEqual(['/:locale/about']);
    expect(error.size).toBe(0);
  });
});
