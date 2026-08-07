import { describe, it, expect } from 'vitest';
import { createStaticHandler, type StaticHandlerContext } from 'react-router';
import {
  handleRedirectRequest,
  handleDataRequest,
  handleSpaModeRequest,
  handleDocumentRequest,
} from '../../server/dev/handlers.js';
import { RouterComponent } from '../../routing/interfaces.js';
import type { LayoutComponent, PageComponent } from '../../routing/types.js';
import { generateRoutes } from '../../routing/utils/generate-routes.js';

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
  Home.loader = async () => ({ props: { greeting: 'hi' } });
  return Home;
}

describe('handleRedirectRequest', () => {
  it('returns a 301 for a permanent config-defined redirect', async () => {
    const request = new Request('http://x/old');
    const response = await handleRedirectRequest(request, {
      context: new Response(),
      redirects: [{ source: '/old', destination: '/new', permanent: true }],
    });

    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe('/new');
  });

  it('returns a 302 for a non-permanent config-defined redirect', async () => {
    const request = new Request('http://x/temp');
    const response = await handleRedirectRequest(request, {
      context: new Response(),
      redirects: [{ source: '/temp', destination: '/new' }],
    });

    expect(response.status).toBe(302);
  });

  it('forwards a loader redirect Response (301/302) using its Location header', async () => {
    const request = new Request('http://x/whatever');
    const loaderRedirect = new Response(null, {
      status: 302,
      headers: { Location: '/from-loader' },
    });

    const response = await handleRedirectRequest(request, {
      context: loaderRedirect,
      redirects: [],
    });

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/from-loader');
  });

  it('returns a non-redirect Response context unchanged', async () => {
    const request = new Request('http://x/whatever');
    const passthrough = new Response('body', { status: 200 });

    const response = await handleRedirectRequest(request, {
      context: passthrough,
      redirects: [],
    });

    expect(response).toBe(passthrough);
  });
});

describe('handleDataRequest', () => {
  it('returns the loader data as JSON for a GET data request', async () => {
    const router = makeRouter([homePage()]);
    const handler = createStaticHandler(generateRoutes(router));

    // The root page here is an index route ("/") — react-router's own
    // convention only targets an index route's own data (rather than its
    // parent layout's) when the request carries a naked `?index` query
    // param; without it, queryRoute() resolves to the last
    // *path-contributing* match, i.e. the layout. See getTargetMatch() in
    // react-router's router.js.
    const response = await handleDataRequest(
      new Request('http://x/.data?index'),
      handler
    );

    expect(response.headers.get('Content-Type')).toBe('application/json');
    const body = await response.json();
    expect(body.props.greeting).toBe('hi');
  });

  it('strips the ".data" suffix before matching the route', async () => {
    const Profile: PageComponent = () => null;
    Profile.path = '/profile';
    Profile.loader = async () => ({ props: { ok: true } });

    const router = makeRouter([homePage(), Profile]);
    const handler = createStaticHandler(generateRoutes(router));

    const response = await handleDataRequest(
      new Request('http://x/profile.data'),
      handler
    );

    const body = await response.json();
    expect(body.props.ok).toBe(true);
  });

  it('returns the thrown Response as-is for a genuinely unmatched route (catch-all 404)', async () => {
    const router = makeRouter([homePage()]);
    const handler = createStaticHandler(generateRoutes(router));

    const response = await handleDataRequest(
      new Request('http://x/does-not-exist.data'),
      handler
    );

    expect(response.status).toBe(404);
  });
});

describe('handleSpaModeRequest', () => {
  it('renders the template via the module runner and returns a 200 HTML Response', async () => {
    const Template = ({ Head, Body }: any) => (
      <html>
        <Head />
        <Body />
      </html>
    );

    const fakeRunner = {
      import: async (_path: string) => ({ default: Template }),
    } as any;

    const response = await handleSpaModeRequest(fakeRunner, {
      rootPath: '/app',
      __dirname: '/pkg',
      config: {} as any,
    });

    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain('<html>');
  });
});

describe('handleDocumentRequest', () => {
  it('invokes the entry-server render() with the matched status code and metadata', async () => {
    const router = makeRouter([homePage()]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    let renderCalledWith: any = null;
    const fakeRunner = {
      import: async (_path: string) => ({
        render: async (_Router: unknown, opts: unknown) => {
          renderCalledWith = opts;
          return new Response('rendered', { status: 200 });
        },
      }),
    } as any;

    const response = await handleDocumentRequest(
      new Request('http://x/'),
      fakeRunner,
      {
        rootPath: '/app',
        __dirname: '/pkg',
        config: { redirects: async () => [] } as any,
        handler,
      }
    );

    expect(await response.text()).toBe('rendered');
    expect(renderCalledWith.statusCode).toBe(200);
  });

  it('short-circuits to a redirect Response without calling render() when the config declares one', async () => {
    const router = makeRouter([homePage()]);
    const routes = generateRoutes(router);
    const handler = createStaticHandler(routes);

    let renderCalled = false;
    const fakeRunner = {
      import: async (_path: string) => ({
        render: async () => {
          renderCalled = true;
          return new Response('rendered');
        },
      }),
    } as any;

    const response = await handleDocumentRequest(
      new Request('http://x/old'),
      fakeRunner,
      {
        rootPath: '/app',
        __dirname: '/pkg',
        config: {
          redirects: async () => [
            { source: '/old', destination: '/new', permanent: true },
          ],
        } as any,
        handler,
      }
    );

    expect(renderCalled).toBe(false);
    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe('/new');
  });
});
