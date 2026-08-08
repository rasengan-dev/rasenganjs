import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type RouteObject,
} from 'react-router';
import {
  ErrorBoundary,
  RasenganPageComponent,
  NotFoundPageComponent,
  CustomLink,
  ScrollRestoration,
} from '../../../routing/components/index.js';
import { HydrationFallback } from '../../../routing/components/fallback.js';

// Mirrors how these components are actually used in production: SSR via
// createStaticHandler().query() (settles loaders/errors up front) then
// createStaticRouter() + StaticRouterProvider — not createMemoryRouter,
// whose client-side data loading doesn't settle synchronously before the
// first render.
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

describe('HydrationFallback', () => {
  it('renders a loading message', () => {
    expect(renderToStaticMarkup(<HydrationFallback />)).toBe(
      '<div>Loading page...</div>'
    );
  });
});

describe('NotFoundPageComponent', () => {
  it('renders a 404 / Page not found message', () => {
    const html = renderToStaticMarkup(<NotFoundPageComponent />);
    expect(html).toContain('404');
    expect(html).toContain('Page not found');
  });
});

describe('CustomLink', () => {
  it('renders a plain anchor for a hash link, bypassing react-router (no router context needed)', () => {
    const html = renderToStaticMarkup(
      <CustomLink to="/page#section">Jump</CustomLink>
    );
    expect(html).toBe('<a href="/page#section">Jump</a>');
  });

  it('renders a react-router Link for a plain (non-hash) destination', async () => {
    const html = await renderRoute([
      {
        path: '/',
        Component: () => <CustomLink to="/other">Go</CustomLink>,
      },
    ]);
    expect(html).toContain('href="/other"');
    expect(html).toContain('Go');
  });
});

describe('RasenganPageComponent', () => {
  it('passes loader props and route params through to the page', async () => {
    const Page = (props: any) => (
      <div data-name={props.name} data-id={props.params.id} />
    );

    const html = await renderRoute(
      [
        {
          path: '/users/:id',
          Component: () => (
            <RasenganPageComponent
              page={Page as any}
              data={{ props: { name: 'Kakashi' } } as any}
            />
          ),
        },
      ],
      'http://x/users/42'
    );

    expect(html).toContain('data-name="Kakashi"');
    expect(html).toContain('data-id="42"');
  });

  it('defaults props to an empty object when data.props is absent', async () => {
    const Page = (props: any) => (
      <div data-has-name={String('name' in props)} />
    );

    const html = await renderRoute([
      {
        path: '/',
        Component: () => (
          <RasenganPageComponent page={Page as any} data={{} as any} />
        ),
      },
    ]);

    expect(html).toContain('data-has-name="false"');
  });
});

describe('ErrorBoundary', () => {
  it('renders without throwing when used as a route errorElement for a loader error', async () => {
    // import.meta.env.DEV is true under vitest, so the effect-driven
    // errorStore.addError() branch is taken — but effects never run
    // during a static/SSR render, so the observable output here is
    // just "renders null without throwing", not the errorStore side effect.
    const html = await renderRoute([
      {
        path: '/',
        loader() {
          throw new Error('boom');
        },
        Component: () => <p>never rendered</p>,
        errorElement: <ErrorBoundary />,
      },
    ]);

    // StaticRouterProvider always emits a hydration-data <script> —
    // what we're actually checking is that ErrorBoundary itself (not
    // the never-rendered page Component) rendered, contributing nothing
    // visible of its own.
    expect(html).not.toContain('never rendered');
    expect(html).not.toContain('<section');
  });
});

describe('ScrollRestoration', () => {
  it('renders nothing itself and does not throw outside a browser (no window)', async () => {
    const html = await renderRoute([
      { path: '/', Component: () => <ScrollRestoration /> },
    ]);
    // Only StaticRouterProvider's own hydration-data <script> remains.
    expect(html).toMatch(/^<script>.*<\/script>$/);
  });
});
