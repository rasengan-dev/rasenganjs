import { hydrateRoot, createRoot } from 'react-dom/client';
import { StrictMode, FunctionComponent } from 'react';
import { type AppProps } from '../../core/index.js';
import { RootComponent } from '../../routing/components/template.js';

const isSpaMode = window.__RASENGAN_SPA_MODE__;

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

  // If SPA mode, render the app
  if (isSpaMode) {
    if (options.reactStrictMode) {
      createRoot(root).render(
        <StrictMode>
          <App Component={RootComponent} />
        </StrictMode>
      );
    } else {
      createRoot(root).render(<App Component={RootComponent} />);
    }

    return;
  }

  // Handling hydration
  if (options.reactStrictMode) {
    hydrateRoot(
      root,
      <StrictMode>
        <App Component={RootComponent} />
      </StrictMode>
    );
  } else {
    hydrateRoot(root, <App Component={RootComponent} />);
  }
}
