import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { generateRoutes, getAllRoutesPath } from 'rasengan';
import type { RouterComponent } from 'rasengan';
import type { RasenganBuildConfig } from './build-config.js';

export interface CollectedRoutes {
  paths: string[];
  warnings: string[];
}

/**
 * Enumerate every concrete URL the app can produce, reusing the exact
 * route-walking `preRenderApp()` itself already relies on
 * (`generateRoutes()` then `getAllRoutesPath()`). `_api/` routes are
 * structurally impossible to appear here: they're dispatched through a
 * completely separate Futon router, never through `RouterComponent`/
 * `generateRoutes()`, so no filter is needed for them.
 */
export async function collectRoutePaths(
  cwd: string,
  build: RasenganBuildConfig
): Promise<CollectedRoutes> {
  // config.json's own buildOptions.serverPathDirectory is always 'server'
  // as written by the framework's build plugin, even in prerender mode —
  // dist/server/ is never actually built when prerender is true, only
  // dist/prerender/ is (see core/config/vite/defaults.ts's builder.buildApp:
  // the ssr environment only builds `if (config.ssr && !config.prerender)`).
  // Override here to match reality instead of trusting the stored value.
  const serverPathDirectory = build.prerender
    ? 'prerender'
    : build.buildOptions.serverPathDirectory;

  const appRouterPath = path.posix.join(
    cwd,
    build.buildOptions.buildDirectory,
    serverPathDirectory,
    'app.router.js'
  );

  let AppRouter: RouterComponent;
  try {
    const mod = await import(pathToFileURL(appRouterPath).href);
    // File-based routing's app.router.js exports the (async) flatRoutes()
    // call result directly, so `default` is a Promise<RouterComponent>
    // rather than a RouterComponent — same await pre-render.tsx does.
    AppRouter = (await (mod.default ?? mod)) as RouterComponent;
  } catch (err) {
    throw new Error(
      `Could not import the built router at ${appRouterPath}. ` +
        `Make sure \`rasengan build\` completed successfully.\n${(err as Error).message}`
    );
  }

  const routeTree = generateRoutes(AppRouter);
  const { paths, error } = await getAllRoutesPath(routeTree);

  // '*' is the framework's catch-all/404 route, never a real indexable page.
  const filtered = paths.filter((p) => !p.includes('*'));

  return { paths: filtered, warnings: Array.from(error) };
}
