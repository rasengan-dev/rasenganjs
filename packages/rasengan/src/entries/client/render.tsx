import { hydrateRoot, createRoot } from 'react-dom/client';
import { StrictMode, FunctionComponent } from 'react';
import { type AppProps } from '../../core/index.js';
import { RootComponent } from '../../routing/components/template.js';
import { RouterComponent } from '../../routing/interfaces.js';
import {
  generateRoutes,
  preloadMatches,
} from '../../routing/utils/generate-routes.js';
import { createBrowserRouter, RouterProvider } from 'react-router';
import {
  ErrorOverlayProvider,
  errorStore,
} from '../../routing/error-overlay/index.js';

const isSpaMode = Boolean(window.__RASENGAN_SPA_MODE__);

export default async function renderApp(
  App: FunctionComponent<AppProps>,
  AppRouter: Promise<RouterComponent>,
  options: {
    reactStrictMode?: boolean;
  }
) {
  // Forward SSR errors to the error overlay
  const ssrError = window.__RASENGAN_SSR_ERROR__;
  if (ssrError) {
    const err = new Error(ssrError.message);
    err.name = ssrError.name;
    err.stack = ssrError.stack;
    errorStore.addError(err, 'global');
  }

  // Get root element
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('#root element not found in the DOM');
  }

  // Resolve app router
  const RasenganRouter = await AppRouter;

  // Generate routes for the browser routing
  const routes = generateRoutes(RasenganRouter);

  if (!ssrError) {
    // Preload lazy routes
    // We have to only preload the routes that are matched for the current URL
    // The remaining routing will be lazy loaded on the client after routes change
    await preloadMatches(window.location, routes);
  }

  // Create router
  let router = createBrowserRouter(routes, {
    hydrationData: window.__staticRouterHydrationData,
  });

  // Generate client router
  const ClientRouter = () => <RouterProvider router={router} />;

  // Detect dev mode
  const devMode =
    typeof import.meta !== 'undefined' &&
    (import.meta as { env?: { DEV?: boolean } }).env?.DEV === true;

  // Generate app tree
  const appContent = options.reactStrictMode ? (
    <StrictMode>
      <App
        Component={(props) => (
          <RootComponent {...props} Router={ClientRouter} />
        )}
      />
    </StrictMode>
  ) : (
    <App
      Component={(props) => <RootComponent {...props} Router={ClientRouter} />}
    />
  );
  const appTree = (
    <ErrorOverlayProvider devMode={devMode}>{appContent}</ErrorOverlayProvider>
  );

  // Render app
  if (isSpaMode) {
    // No SSR markup, so start fresh
    createRoot(root, {
      onCaughtError: (error) => {
        console.error(error);
      },
      onUncaughtError(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
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
