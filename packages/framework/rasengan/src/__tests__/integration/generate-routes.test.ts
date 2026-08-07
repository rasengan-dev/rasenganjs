import { describe, it, expect } from 'vitest';
import { createStaticHandler, type StaticHandlerContext } from 'react-router';
import { RouterComponent } from '../../routing/interfaces.js';
import { generateRoutes } from '../../routing/utils/generate-routes.js';
import type { LayoutComponent, PageComponent } from '../../routing/types.js';

// query()/queryRoute() never render components — they only run loaders —
// so these fixtures don't need to produce meaningful JSX, just the static
// properties (.path, .metadata, .loader) generateRoutes() reads.
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
  Home.metadata = { title: 'Home' };
  return Home;
}

// Both the layout and the page have their own loader/loaderData entry —
// the last match is always the leaf (the actual page), same technique
// extractMetaFromRRContext() itself uses to pick the right one.
function leafLoaderData(context: StaticHandlerContext): any {
  const leaf = context.matches[context.matches.length - 1];
  return context.loaderData[leaf.route.id];
}

describe('generateRoutes + createStaticHandler (integration)', () => {
  it('a matched page resolves with statusCode 200 and its loader data', async () => {
    const router = makeRouter([homePage()]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/')
    )) as StaticHandlerContext;

    expect(context.statusCode).toBe(200);
    expect(leafLoaderData(context).meta.title).toBe('Home');
  });

  it('a genuinely unmatched path resolves with statusCode 404 via the catch-all (regression: the catch-all used to always report 200)', async () => {
    const router = makeRouter([homePage()]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/does-not-exist')
    )) as StaticHandlerContext;

    expect(context.statusCode).toBe(404);
  });

  it('a dynamic-segment page exposes matched params to its loader', async () => {
    const Profile: PageComponent = () => null;
    Profile.path = '/profile/:id';
    Profile.loader = async ({ params }) => ({ props: { id: params.id } });

    const router = makeRouter([homePage(), Profile]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/profile/42')
    )) as StaticHandlerContext;

    expect(context.statusCode).toBe(200);
    expect(leafLoaderData(context).props.id).toBe('42');
  });

  it("a loader's redirect becomes a 302 Response with a Location header", async () => {
    const Old: PageComponent = () => null;
    Old.path = '/old';
    Old.loader = async () => ({ redirect: '/new' });

    const router = makeRouter([homePage(), Old]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const result = await handler.query(new Request('http://x/old'));

    expect(result).toBeInstanceOf(Response);
    const response = result as Response;
    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/new');
  });

  it('a page loader error is caught and surfaced as loaderData with an empty props/default meta, not a thrown exception', async () => {
    const Bad: PageComponent = () => null;
    Bad.path = '/bad';
    Bad.loader = async () => {
      throw new Error('loader exploded');
    };

    const router = makeRouter([homePage(), Bad]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    const context = (await handler.query(
      new Request('http://x/bad')
    )) as StaticHandlerContext;

    // createLoaderFunction() swallows the throw and returns a fallback
    // payload (see generate-routes.tsx) rather than letting it bubble
    // into an error boundary.
    expect(context.statusCode).toBe(200);
    expect(leafLoaderData(context).props).toEqual({});
  });
});
