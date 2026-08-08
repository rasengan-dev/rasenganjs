import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  RootComponent,
  HeadComponent,
  BodyComponent,
  ScriptComponent,
  DefaultLayout,
} from '../../../routing/components/template.js';

describe('RootComponent', () => {
  it('renders children directly when provided (the SSR static-router case)', () => {
    const html = renderToStaticMarkup(
      <RootComponent>
        <p>static</p>
      </RootComponent>
    );
    expect(html).toBe('<p>static</p>');
  });

  it('renders nothing when neither children nor a Router are given', () => {
    const html = renderToStaticMarkup(<RootComponent />);
    expect(html).toBe('');
  });

  it('renders the provided client Router when no children are given', () => {
    const FakeRouter = () => <div>router-output</div>;
    const html = renderToStaticMarkup(<RootComponent Router={FakeRouter} />);
    expect(html).toBe('<div>router-output</div>');
  });
});

describe('HeadComponent', () => {
  it('renders the title from metadata.page.title', () => {
    const html = renderToStaticMarkup(
      <HeadComponent
        metadata={{ page: { title: 'My Page', description: '' }, layout: {} }}
      />
    );
    expect(html).toContain('<title>My Page</title>');
  });

  it('renders the description as a meta tag', () => {
    const html = renderToStaticMarkup(
      <HeadComponent
        metadata={{
          page: { title: '', description: 'A page description' },
          layout: {},
        }}
      />
    );
    expect(html).toContain('content="A page description"');
  });

  it('always includes the Rasengan.js generator meta tag', () => {
    const html = renderToStaticMarkup(
      <HeadComponent metadata={{ page: {}, layout: {} }} />
    );
    expect(html).toContain('name="generator"');
    expect(html).toContain('content="Rasengan.js"');
  });

  it('renders provided assets and children alongside the standard tags', () => {
    const html = renderToStaticMarkup(
      <HeadComponent
        metadata={{ page: {}, layout: {} }}
        assets={[<link key="a" rel="stylesheet" href="/a.css" />]}
      >
        <meta key="extra" name="extra" content="1" />
      </HeadComponent>
    );
    expect(html).toContain('href="/a.css"');
    expect(html).toContain('name="extra"');
  });

  it('merges page and layout metadata into meta tags', () => {
    const html = renderToStaticMarkup(
      <HeadComponent
        metadata={{
          page: { openGraph: { url: '', image: '', title: 'Page OG' } },
          layout: { openGraph: { url: '', image: '' } },
        }}
      />
    );
    expect(html).toContain('content="Page OG"');
  });
});

describe('BodyComponent', () => {
  it('always renders a noscript warning and a #root div', () => {
    const html = renderToStaticMarkup(<BodyComponent />);
    expect(html).toContain('<noscript>');
    expect(html).toContain('Enable JavaScript');
    expect(html).toContain('id="root"');
  });

  it('renders AppContent inside #root only when asChild is true', () => {
    const withChild = renderToStaticMarkup(
      <BodyComponent asChild AppContent={<p>app</p>} />
    );
    expect(withChild).toContain('<p>app</p>');

    const withoutChild = renderToStaticMarkup(
      <BodyComponent AppContent={<p>app</p>} />
    );
    expect(withoutChild).not.toContain('<p>app</p>');
  });

  it('renders children after #root (e.g. scripts)', () => {
    const html = renderToStaticMarkup(
      <BodyComponent>
        <script>console.log(1)</script>
      </BodyComponent>
    );
    expect(html).toContain('<script>console.log(1)</script>');
  });
});

describe('ScriptComponent', () => {
  it('renders its children with no extra wrapper element', () => {
    const html = renderToStaticMarkup(
      <ScriptComponent>
        <script>1</script>
        <script>2</script>
      </ScriptComponent>
    );
    expect(html).toBe('<script>1</script><script>2</script>');
  });

  it('renders nothing with no children', () => {
    expect(renderToStaticMarkup(<ScriptComponent />)).toBe('');
  });
});

describe('DefaultLayout', () => {
  it('is a layout component rooted at "/"', () => {
    expect(DefaultLayout.path).toBe('/');
  });
});
