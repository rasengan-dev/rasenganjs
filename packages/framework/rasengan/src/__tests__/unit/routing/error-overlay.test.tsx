import { describe, it, expect, beforeEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ErrorOverlay } from '../../../routing/error-overlay/ErrorOverlay.js';
import { errorStore } from '../../../routing/error-overlay/error-store.js';

beforeEach(() => {
  errorStore.clearAll();
});

describe('ErrorOverlay', () => {
  it('renders nothing when the error store is empty', () => {
    const html = renderToStaticMarkup(<ErrorOverlay />);
    expect(html).toBe('');
  });

  // Every other branch (minimized FAB, the overlay panel itself) renders
  // through createPortal(..., document.body), which requires a DOM —
  // this suite runs in vitest's plain "node" environment (no jsdom), per
  // the project's chosen React-testing strategy, so `document` is
  // undefined and those branches aren't reachable from here. They're only
  // exercised by the browser at runtime.
});
