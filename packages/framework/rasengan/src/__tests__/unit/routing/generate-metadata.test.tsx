import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { generateMetadata } from '../../../routing/utils/generate-metadata.js';
import type { Metadata } from '../../../routing/types.js';

function render(metadatas: Metadata[]) {
  return renderToStaticMarkup(<>{generateMetadata(metadatas)}</>);
}

describe('generateMetadata', () => {
  it('renders an empty fragment for metadata with no known fields', () => {
    expect(render([{}])).toBe('');
  });

  it('renders openGraph fields as og:* meta tags', () => {
    const html = render([
      {
        openGraph: {
          title: 'Hello',
          description: 'World',
          url: 'https://x.test',
          image: 'https://x.test/og.png',
        },
      },
    ]);

    expect(html).toContain('property="og:title"');
    expect(html).toContain('content="Hello"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('property="og:url"');
    expect(html).toContain('property="og:image"');
  });

  it('always emits og:type, defaulting to "website"', () => {
    const html = render([{ openGraph: { url: '', image: '' } }]);
    expect(html).toContain('property="og:type"');
    expect(html).toContain('content="website"');
  });

  it('respects an explicit openGraph.type override', () => {
    const html = render([
      { openGraph: { url: '', image: '', type: 'article' } },
    ]);
    expect(html).toContain('content="article"');
  });

  it('defaults twitter:card to summary_large_image', () => {
    const html = render([
      { twitter: { card: undefined as any, image: '', title: '' } },
    ]);
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain('content="summary_large_image"');
  });

  it('renders twitter fields when provided', () => {
    const html = render([
      {
        twitter: {
          card: 'summary',
          site: '@site',
          creator: '@creator',
          image: 'https://x.test/tw.png',
          title: 'Tw title',
          description: 'Tw description',
        },
      },
    ]);

    expect(html).toContain('content="summary"');
    expect(html).toContain('name="twitter:site"');
    expect(html).toContain('content="@site"');
    expect(html).toContain('name="twitter:creator"');
    expect(html).toContain('name="twitter:image"');
    expect(html).toContain('name="twitter:title"');
    expect(html).toContain('name="twitter:description"');
  });

  it('renders links with default rel sizes/type when omitted', () => {
    const html = render([{ links: [{ rel: 'icon', href: '/favicon.svg' }] }]);

    expect(html).toContain('rel="icon"');
    expect(html).toContain('href="/favicon.svg"');
    expect(html).toContain('sizes="32x32"');
    expect(html).toContain('type="image/png"');
  });

  it('respects explicit link sizes/type overrides', () => {
    const html = render([
      {
        links: [
          {
            rel: 'icon',
            href: '/favicon.png',
            sizes: '16x16',
            type: 'image/x-icon',
          },
        ],
      },
    ]);

    expect(html).toContain('sizes="16x16"');
    expect(html).toContain('type="image/x-icon"');
  });

  it('renders arbitrary metaTags using property when given, name otherwise', () => {
    const html = render([
      {
        metaTags: [
          { property: 'article:author', content: 'Jane' },
          { name: 'robots', content: 'noindex' },
        ],
      },
    ]);

    expect(html).toContain('property="article:author"');
    expect(html).toContain('content="Jane"');
    expect(html).toContain('property="robots"');
    expect(html).toContain('content="noindex"');
  });

  it('merges output across multiple metadata objects in the array', () => {
    const html = render([
      { openGraph: { url: '', image: '', title: 'First' } },
      { twitter: { card: 'summary', image: '', title: 'Second' } },
    ]);

    expect(html).toContain('content="First"');
    expect(html).toContain('content="summary"');
  });
});
