import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  defineRouter,
  isMDXPage,
  convertMDXPageToPageComponent,
} from '../../../routing/utils/define-router.js';
import { RouterComponent } from '../../../routing/interfaces.js';
import { DefaultLayout } from '../../../routing/components/template.js';
import type { PageComponent } from '../../../routing/types.js';

function page(path: string): PageComponent {
  const P: PageComponent = () => null;
  P.path = path;
  return P;
}

describe('isMDXPage', () => {
  it('is true when type is "MDXPageComponent"', () => {
    expect(isMDXPage({ type: 'MDXPageComponent' })).toBe(true);
  });

  it('is false for a plain PageComponent (no type field)', () => {
    expect(isMDXPage(page('/x'))).toBe(false);
  });
});

describe('convertMDXPageToPageComponent', () => {
  it('copies path and metadata from MDXPage.metadata', async () => {
    const MDXPage = {
      type: 'MDXPageComponent',
      Renderer: (props: any) => <div>{props.children}</div>,
      config: {},
      toc: [],
      raw: '',
      Content: 'hello',
      metadata: { path: '/guide', metadata: { title: 'Guide' } },
    };

    const Page = await convertMDXPageToPageComponent(MDXPage);

    expect(Page.path).toBe('/guide');
    expect(Page.metadata).toEqual({ title: 'Guide' });
  });

  it('renders the MDX Renderer with the expected props', async () => {
    const MDXPage = {
      type: 'MDXPageComponent',
      Renderer: (props: any) => <div data-raw={props.raw}>content</div>,
      config: { theme: 'dark' },
      toc: [],
      raw: 'raw-markdown',
      Content: 'hello',
      metadata: { path: '/guide', metadata: {} },
    };

    const Page = await convertMDXPageToPageComponent(MDXPage);
    const html = renderToStaticMarkup(<Page />);

    expect(html).toContain('data-raw="raw-markdown"');
  });
});

describe('defineRouter', () => {
  it('defaults layout to DefaultLayout when none is given', async () => {
    const build = defineRouter({});
    const router = await build(RouterComponent);

    expect(router.layout).toBe(DefaultLayout);
  });

  it('uses the provided layout when given', async () => {
    const Layout = () => null;
    const build = defineRouter({ layout: Layout as any });
    const router = await build(RouterComponent);

    expect(router.layout).toBe(Layout);
  });

  it('defaults useParentLayout to true', async () => {
    const router = await defineRouter({})(RouterComponent);
    expect(router.useParentLayout).toBe(true);
  });

  it('respects an explicit useParentLayout: false', async () => {
    const router = await defineRouter({ useParentLayout: false })(
      RouterComponent
    );
    expect(router.useParentLayout).toBe(false);
  });

  it('flattens plain and nested-array page entries into router.pages', async () => {
    const router = await defineRouter({
      pages: [page('/a'), [page('/b'), page('/c')]],
    })(RouterComponent);

    expect(router.pages).toHaveLength(3);
    expect((router.pages as PageComponent[]).map((p) => p.path)).toEqual([
      '/a',
      '/b',
      '/c',
    ]);
  });

  it('converts an MDX page entry into a real PageComponent', async () => {
    const MdxPage = {
      type: 'MDXPageComponent',
      Renderer: () => null,
      config: {},
      toc: [],
      raw: '',
      Content: '',
      metadata: { path: '/mdx-page', metadata: { title: 'MDX' } },
    };

    const router = await defineRouter({ pages: [MdxPage as any] })(
      RouterComponent
    );

    const [converted] = router.pages as PageComponent[];
    expect(converted.path).toBe('/mdx-page');
  });

  it('awaits and attaches sub-routers from `imports`', async () => {
    const subRouter = await defineRouter({})(RouterComponent);
    const router = await defineRouter({
      imports: [Promise.resolve(subRouter)],
    })(RouterComponent);

    expect(router.routers).toEqual([subRouter]);
  });

  it('defaults notFoundComponent to undefined when none is given', async () => {
    const router = await defineRouter({})(RouterComponent);
    expect(router.notFoundComponent).toBeUndefined();
  });

  it('wraps a provided notFoundComponent as a rendered element', async () => {
    const NotFound = () => <p>missing</p>;
    const router = await defineRouter({ notFoundComponent: NotFound })(
      RouterComponent
    );

    expect(renderToStaticMarkup(router.notFoundComponent as any)).toBe(
      '<p>missing</p>'
    );
  });
});
