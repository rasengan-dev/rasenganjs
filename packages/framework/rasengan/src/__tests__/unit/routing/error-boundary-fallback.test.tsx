import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ErrorBoundaryFallback } from '../../../routing/error-overlay/ErrorBoundaryFallback.js';

describe('ErrorBoundaryFallback', () => {
  it('renders children when nothing throws', () => {
    const html = renderToStaticMarkup(
      <ErrorBoundaryFallback>
        <p>fine</p>
      </ErrorBoundaryFallback>
    );
    expect(html).toBe('<p>fine</p>');
  });

  // React's legacy synchronous server renderer (renderToString /
  // renderToStaticMarkup) does not invoke class-component error boundaries
  // (getDerivedStateFromError / componentDidCatch) for errors thrown while
  // rendering descendants — a thrown error just propagates out of the
  // render call instead of being caught, unlike the client renderer or the
  // streaming server APIs. That makes the componentDidCatch->errorStore
  // wiring and the dev-vs-production render branch unreachable from a
  // renderToStaticMarkup-based test; both are only exercised by the browser
  // at runtime, not covered here for that reason.
});
