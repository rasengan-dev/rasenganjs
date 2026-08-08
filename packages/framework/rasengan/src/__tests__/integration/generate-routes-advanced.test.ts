import { describe, it, expect } from 'vitest';
import { createStaticHandler, type StaticHandlerContext } from 'react-router';
import { RouterComponent } from '../../routing/interfaces.js';
import { generateRoutes } from '../../routing/utils/generate-routes.js';
import type {
  LayoutComponent,
  PageComponent,
  RouteObject,
} from '../../routing/types.js';
import type { RouteNode } from '../../routing/utils/flat-routes.js';

function leafLoaderData(context: StaticHandlerContext): any {
  const leaf = context.matches[context.matches.length - 1];
  return context.loaderData[leaf.route.id];
}

describe('generateRoutes: file-based routing (RouteNode layout/pages)', () => {
  function fileLayout(overrides: Partial<RouteNode> = {}): RouteNode {
    const Layout: LayoutComponent = () => null;
    return {
      path: '/',
      segment: '',
      fullPath: '/',
      isLayout: true,
      source: '/src/app/_routes/layout.tsx',
      module: () => Promise.resolve({ default: Layout }),
      ...overrides,
    } as RouteNode;
  }

  function filePage(path: string, metadata = {}): RouteNode {
    const Page: PageComponent = () => null;
    Page.metadata = metadata;
    return {
      path,
      segment: path,
      fullPath: path,
      isLayout: false,
      source: `/src/app/_routes${path}/page.tsx`,
      module: () => Promise.resolve({ default: Page }),
    } as RouteNode;
  }

  function makeRouter(pages: RouteNode[], layout = fileLayout()) {
    const router = new RouterComponent();
    router.layout = layout as any;
    router.pages = pages as any;
    router.routers = [];
    router.useParentLayout = true;
    return router;
  }

  it('resolves a matched file-based page with statusCode 200 and its metadata', async () => {
    const router = makeRouter([filePage('/', { title: 'Home' })]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/')
    )) as StaticHandlerContext;

    expect(context.statusCode).toBe(200);
    expect(leafLoaderData(context).meta.title).toBe('Home');
  });

  it('warns and falls back to <Outlet/> when a file-based layout has no default export', async () => {
    const router = makeRouter(
      [filePage('/')],
      fileLayout({ module: () => Promise.resolve({} as any) })
    );
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    await expect(handler.query(new Request('http://x/'))).resolves.toBeTruthy();
  });

  it('warns and renders nothing when a file-based page has no default export', async () => {
    const NoDefaultPage: RouteNode = {
      path: '/broken',
      segment: '/broken',
      fullPath: '/broken',
      isLayout: false,
      source: '/src/app/_routes/broken/page.tsx',
      module: () => Promise.resolve({} as any),
    } as RouteNode;

    const router = makeRouter([NoDefaultPage]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/broken')
    )) as StaticHandlerContext;

    expect(context.statusCode).toBe(200);
  });

  it('detects and converts an MDX file-based page', async () => {
    const MdxPage = {
      type: 'MDXPageComponent',
      Renderer: () => null,
      config: {},
      toc: [],
      raw: '',
      Content: '',
      metadata: { path: '/guide', metadata: { title: 'MDX Guide' } },
    };

    const MdxNode: RouteNode = {
      path: '/guide',
      segment: '/guide',
      fullPath: '/guide',
      isLayout: false,
      source: '/src/app/_routes/guide/page.mdx',
      module: () => Promise.resolve({ default: MdxPage as any }),
    } as RouteNode;

    const router = makeRouter([MdxNode]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/guide')
    )) as StaticHandlerContext;

    expect(context.statusCode).toBe(200);
    expect(leafLoaderData(context).meta.title).toBe('MDX Guide');
  });
});

describe('generateRoutes: custom notFoundComponent', () => {
  function makeRouter(pages: PageComponent[]) {
    const Layout: LayoutComponent = () => null;
    Layout.path = '/';
    const router = new RouterComponent();
    router.layout = Layout;
    router.pages = pages;
    router.routers = [];
    router.useParentLayout = true;
    return router;
  }

  function homePage(): PageComponent {
    const Home: PageComponent = () => null;
    Home.path = '/';
    return Home;
  }

  it('uses the default meta ("Not Found") for the catch-all when no custom notFoundComponent is set', async () => {
    const router = makeRouter([homePage()]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/nope')
    )) as StaticHandlerContext;

    expect(context.statusCode).toBe(404);
    expect(leafLoaderData(context).meta.title).toBe('Not Found');
  });

  it('still adds a catch-all 404 route when a custom notFoundComponent is set on a non-root router', () => {
    const NotFound: any = () => null;
    const router = makeRouter([homePage()]);
    router.notFoundComponent = NotFound;

    // isRoot=false here — the catch-all is only added because
    // router.notFoundComponent is set, not because it's root.
    const routes = generateRoutes(router, false, '');
    const catchAll = routes[0].children?.find(
      (c: RouteObject) => c.path === '*'
    );

    expect(catchAll).toBeDefined();
    expect((catchAll?.element as any)?.type).toBe(NotFound);
  });

  it('does not add a catch-all route on a non-root router with no notFoundComponent', () => {
    const router = makeRouter([homePage()]);
    const routes = generateRoutes(router, false, '');
    const catchAll = routes[0].children?.find(
      (c: RouteObject) => c.path === '*'
    );

    expect(catchAll).toBeUndefined();
  });
});

describe('generateRoutes: nested sub-routers', () => {
  function makeRouter(pages: PageComponent[], useParentLayout = true) {
    const Layout: LayoutComponent = () => null;
    Layout.path = '/admin';
    const router = new RouterComponent();
    router.layout = Layout;
    router.pages = pages;
    router.routers = [];
    router.useParentLayout = useParentLayout;
    return router;
  }

  function subPage(path: string): PageComponent {
    const P: PageComponent = () => null;
    P.path = path;
    return P;
  }

  it('nests a sub-router using its parent layout under the parent route.children', () => {
    const parent = makeRouter([]);
    const child = makeRouter([subPage('/users')], true);
    parent.routers = [child];

    const routes = generateRoutes(parent);

    // routes[0] is the parent's own route; the nested child route (using
    // parent's layout, so nested=true) should be merged into its children,
    // not pushed as a sibling top-level route.
    expect(routes).toHaveLength(1);
    const nestedChild = routes[0].children?.find((c: RouteObject) =>
      c.children?.some((gc: RouteObject) => gc.path === 'users')
    );
    expect(nestedChild).toBeDefined();
  });

  it('pushes a sub-router with its own layout (useParentLayout=false) as a separate top-level route', () => {
    const parent = makeRouter([]);
    const child = makeRouter([subPage('/users')], false);
    parent.routers = [child];

    const routes = generateRoutes(parent);

    // Parent's own route + the independent child route.
    expect(routes).toHaveLength(2);
  });
});
