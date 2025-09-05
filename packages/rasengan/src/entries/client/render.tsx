import { hydrateRoot, createRoot } from 'react-dom/client';
import { StrictMode, FunctionComponent } from 'react';
import { type AppProps } from '../../core/index.js';
import { RootComponent } from '../../routing/components/template.js';

const isSpaMode = Boolean(window.__RASENGAN_SPA_MODE__);

export default function renderApp(
  App: FunctionComponent<AppProps>,
  options: {
    reactStrictMode?: boolean;
  }
) {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found');
  }

  const appTree = options.reactStrictMode ? (
    <StrictMode>
      <App Component={RootComponent} />
    </StrictMode>
  ) : (
    <App Component={RootComponent} />
  );

  if (isSpaMode) {
    // No SSR markup, so start fresh
    createRoot(root, {
      onCaughtError: (error) => {
        console.error(error);
      },
      onRecoverableError(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
      },
    }).render(appTree);
  } else {
    // SSR markup present, hydrate instead of re-rendering
    hydrateRoot(root, appTree, {
      onCaughtError: (error) => {
        console.error(error);
      },
      onRecoverableError(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
      },
    });
  }
}
