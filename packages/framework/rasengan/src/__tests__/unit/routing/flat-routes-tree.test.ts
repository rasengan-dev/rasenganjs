import { describe, it, expect } from 'vitest';
import { flatRoutes } from '../../../routing/utils/flat-routes.js';
import { DefaultLayout } from '../../../routing/components/template.js';
import type { RouterComponent } from '../../../routing/interfaces.js';
import type { PageComponent } from '../../../routing/types.js';

function mod(name: string) {
  const C: any = () => null;
  C.displayName = name;
  return async () => ({ default: C });
}

function pagePaths(router: RouterComponent) {
  return (router.pages as PageComponent[]).map((p) => p.path).sort();
}

describe('flatRoutes: skeleton tree -> RouterComponent (real file-based routing conventions)', () => {
  it('builds a root layout + a single index page', async () => {
    const router = await flatRoutes(() => ({
      '/src/app/_routes/layout.tsx': mod('RootLayout'),
      '/src/app/_routes/index.page.tsx': mod('Home'),
    }));

    expect((router.layout as any).source).toBe('/src/app/_routes/layout.tsx');
    expect(pagePaths(router)).toEqual(['/']);
  });

  it('falls back to DefaultLayout when no root layout.tsx is present', async () => {
    const router = await flatRoutes(() => ({
      '/src/app/_routes/index.page.tsx': mod('Home'),
    }));

    expect(router.layout).toBe(DefaultLayout);
  });

  it('creates a nested sub-router for a folder that has its own layout.tsx', async () => {
    const router = await flatRoutes(() => ({
      '/src/app/_routes/layout.tsx': mod('RootLayout'),
      '/src/app/_routes/docs/layout.tsx': mod('DocsLayout'),
      '/src/app/_routes/docs/index.page.tsx': mod('DocsIndex'),
    }));

    expect(router.routers).toHaveLength(1);
    const docsRouter = router.routers[0] as RouterComponent;
    expect((docsRouter.layout as any).source).toBe(
      '/src/app/_routes/docs/layout.tsx'
    );
    expect(pagePaths(docsRouter)).toEqual(['/']);
  });

  it('normalizes a dynamic [param].page.tsx filename to a :param path', async () => {
    const router = await flatRoutes(() => ({
      '/src/app/_routes/layout.tsx': mod('RootLayout'),
      '/src/app/_routes/docs/layout.tsx': mod('DocsLayout'),
      '/src/app/_routes/docs/[slug].page.tsx': mod('DocsSlug'),
    }));

    const docsRouter = router.routers[0] as RouterComponent;
    expect(pagePaths(docsRouter)).toEqual(['/:slug']);
  });

  it('normalizes a dynamic [param]/ folder (with an index page inside) the same way', async () => {
    const router = await flatRoutes(() => ({
      '/src/app/_routes/layout.tsx': mod('RootLayout'),
      '/src/app/_routes/blog/[slug]/index.page.tsx': mod('BlogSlug'),
    }));

    // No layout inside blog/[slug]/, so it isn't its own sub-router — the
    // page is flattened up into the root router's own page list, with its
    // full dynamic-segment path.
    expect(router.routers).toEqual([]);
    expect(pagePaths(router)).toContain('/blog/:slug');
  });

  it('normalizes an optional static segment (_edit) to edit?', async () => {
    const router = await flatRoutes(() => ({
      '/src/app/_routes/layout.tsx': mod('RootLayout'),
      '/src/app/_routes/settings/_edit.page.tsx': mod('SettingsEdit'),
    }));

    expect(pagePaths(router)).toContain('/settings/edit?');
  });

  it('a route group segment "(marketing)" at the routes root produces a leading double slash (pre-existing behavior, not introduced by this test)', async () => {
    // generateSkeletonTree() sets a group folder's own fullPath to "/" (it
    // deliberately contributes no path segment), but insertNodeToTree()'s
    // page-path calculation always does `fullPath + '/' + lastSegment`
    // regardless of whether fullPath is already "/" — for a page directly
    // inside a root-level group folder that produces "//about" instead of
    // "/about". Documented as observed behavior; not this test suite's job
    // to fix routing logic.
    const router = await flatRoutes(() => ({
      '/src/app/_routes/layout.tsx': mod('RootLayout'),
      '/src/app/_routes/(marketing)/about.page.tsx': mod('About'),
    }));

    expect(pagePaths(router)).toContain('//about');
  });

  it('flattens an intermediate folder with no layout.tsx of its own (its pages surface on the parent router)', async () => {
    const router = await flatRoutes(() => ({
      '/src/app/_routes/layout.tsx': mod('RootLayout'),
      '/src/app/_routes/plain-folder/child.page.tsx': mod('Child'),
    }));

    expect(router.routers).toEqual([]);
    expect(pagePaths(router)).toContain('/plain-folder/child');
  });
});
