import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type RouteObject,
} from 'react-router';
import MetadataProvider from '../../../routing/providers/metadata.js';

async function renderRoute(routes: RouteObject[], url = 'http://x/') {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(url));

  if (context instanceof Response) {
    throw new Error('renderRoute helper does not support redirects');
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToStaticMarkup(
    <StaticRouterProvider router={router} context={context} />
  );
}

describe('MetadataProvider', () => {
  it('renders its children as-is (the DOM metadata injection runs in a useEffect, never during SSR)', async () => {
    const html = await renderRoute([
      {
        path: '/',
        loader: () => ({ meta: { title: 'Home' } }),
        Component: () => (
          <MetadataProvider>
            <p>page content</p>
          </MetadataProvider>
        ),
      },
    ]);

    expect(html).toContain('<p>page content</p>');
  });

  it('does not throw when the route has no loader data at all', async () => {
    const html = await renderRoute([
      {
        path: '/',
        Component: () => (
          <MetadataProvider>
            <span>no loader</span>
          </MetadataProvider>
        ),
      },
    ]);

    expect(html).toContain('<span>no loader</span>');
  });
});
