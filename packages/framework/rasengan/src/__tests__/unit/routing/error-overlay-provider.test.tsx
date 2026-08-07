import { describe, it, expect, beforeEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ErrorOverlayProvider } from '../../../routing/error-overlay/ErrorOverlayProvider.js';
import { errorStore } from '../../../routing/error-overlay/error-store.js';

beforeEach(() => {
  errorStore.clearAll();
});

describe('ErrorOverlayProvider', () => {
  it('renders children when devMode is false', () => {
    const html = renderToStaticMarkup(
      <ErrorOverlayProvider devMode={false}>
        <p>app</p>
      </ErrorOverlayProvider>
    );
    expect(html).toBe('<p>app</p>');
  });

  it('renders children when devMode is true (ErrorOverlay contributes nothing with an empty store)', () => {
    const html = renderToStaticMarkup(
      <ErrorOverlayProvider devMode={true}>
        <p>app</p>
      </ErrorOverlayProvider>
    );
    expect(html).toBe('<p>app</p>');
  });

  // The window/hot 'error' & 'unhandledrejection' listener wiring lives in
  // a useEffect, which renderToStaticMarkup never runs (effects are a
  // client/browser-only concept) — not observable from this render-only
  // test.
});
