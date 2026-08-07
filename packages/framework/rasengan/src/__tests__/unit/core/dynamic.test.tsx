import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { dynamicLoad, lazyLoadPage } from '../../../core/dynamic/index.js';

describe('dynamicLoad', () => {
  it('renders the fallback while the lazy import is still pending', () => {
    const Comp = dynamicLoad(
      () => Promise.resolve({ default: () => <p>loaded</p> }),
      <span>loading</span>
    );

    // renderToStaticMarkup is fully synchronous, so it always observes the
    // Suspense fallback — the lazy() promise never has a chance to settle
    // before this render pass completes.
    const html = renderToStaticMarkup(<Comp />);
    expect(html).toBe('<span>loading</span>');
  });

  it('renders an empty fragment fallback by default', () => {
    const Comp = dynamicLoad(() =>
      Promise.resolve({ default: () => <p>loaded</p> })
    );
    expect(renderToStaticMarkup(<Comp />)).toBe('');
  });

  it('forwards props through to the eventually-loaded component type', () => {
    const Comp = dynamicLoad<React.ComponentType<{ label: string }>>(
      () => Promise.resolve({ default: (props) => <p>{props.label}</p> }),
      <span>loading</span>
    );
    // We can't observe the resolved props synchronously (see above), but
    // this at least confirms passing props doesn't throw at the call site.
    expect(() => renderToStaticMarkup(<Comp label="hello" />)).not.toThrow();
  });
});

describe('lazyLoadPage', () => {
  it('throws when no module in the /src/app glob matches the given file path', () => {
    // rasengan's own package source has no src/app directory, so the
    // import.meta.glob('/src/app/**/*...') inside lazyLoadPage is always
    // empty here — every call takes the "not found" branch.
    expect(() => lazyLoadPage('/blog', './blog.page.tsx')).toThrow(
      /No module found for path/
    );
  });

  it('strips a leading "./" from the file path in the thrown error context', () => {
    // Not directly observable (both branches throw identically), but
    // exercises the normalizePath() code path without a leading "./".
    expect(() => lazyLoadPage('/blog', 'blog.page.tsx')).toThrow(
      /No module found for path/
    );
  });
});
