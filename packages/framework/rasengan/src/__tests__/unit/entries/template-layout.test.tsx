import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { TemplateLayout } from '../../../entries/server/index.js';
import type { TemplateProps } from '../../../routing/types.js';

const RawTemplate = ({ Head, Body, Script }: TemplateProps) => (
  <html>
    <Head />
    <Body />
    <Script />
  </html>
);

describe('TemplateLayout', () => {
  it('forwards metadata and assets through to the rendered Head', () => {
    const html = renderToStaticMarkup(
      <TemplateLayout
        Template={RawTemplate}
        metadata={{ page: { title: 'My Page', description: '' }, layout: {} }}
      />
    );
    expect(html).toContain('<title>My Page</title>');
  });

  it('flags SPA mode via a window.__RASENGAN_SPA_MODE__ inline script set to true', () => {
    const html = renderToStaticMarkup(
      <TemplateLayout Template={RawTemplate} isSpaMode={true} />
    );
    expect(html).toContain('window.__RASENGAN_SPA_MODE__=true;');
  });

  it('flags non-SPA mode via the same global set to false', () => {
    const html = renderToStaticMarkup(
      <TemplateLayout Template={RawTemplate} isSpaMode={false} />
    );
    expect(html).toContain('window.__RASENGAN_SPA_MODE__=false;');
  });

  it('injects a /src/index bootstrap script in SPA mode only when no assets are provided', () => {
    const withoutAssets = renderToStaticMarkup(
      <TemplateLayout Template={RawTemplate} isSpaMode={true} />
    );
    expect(withoutAssets).toContain('src="/src/index"');

    const withAssets = renderToStaticMarkup(
      <TemplateLayout
        Template={RawTemplate}
        isSpaMode={true}
        assets={[<link key="a" rel="stylesheet" href="/a.css" />]}
      />
    );
    expect(withAssets).not.toContain('src="/src/index"');
  });

  it('renders the App inside the body, wrapped by ErrorBoundaryFallback, when App is provided', () => {
    const App = ({ children }: any) => <div id="app-marker">{children}</div>;

    const html = renderToStaticMarkup(
      <TemplateLayout
        Template={RawTemplate}
        App={App}
        StaticRouterComponent={<p>routed content</p>}
      />
    );

    expect(html).toContain('id="app-marker"');
    expect(html).toContain('routed content');
  });

  it('renders no app content in the body when App is not provided', () => {
    const html = renderToStaticMarkup(
      <TemplateLayout Template={RawTemplate} />
    );
    expect(html).not.toContain('app-marker');
  });

  // The Vite HMR-preamble refresh script only injects when
  // process.env.NODE_ENV === 'development' — under vitest it's always
  // "test", so that branch is unreachable from this render-only suite.
});
