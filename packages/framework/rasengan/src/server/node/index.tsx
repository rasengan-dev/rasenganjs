import type { Context } from '@rasenganjs/futon';
import type { FunctionComponent } from 'react';
import { ManifestManager, ManifestEntry } from '../build/manifest.js';
import fs from 'node:fs';
import path from 'node:path';
import { RenderStreamFunction } from '../../entries/server/entry.server.js';
import { generateRoutes, preloadMatches } from '../../routing/utils/index.js';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router';
import {
  extractHeadersFromRRContext,
  extractMetaFromRRContext,
  isDataRequest,
  isRedirectResponse,
  isStaticRedirectFromConfig,
  stripDataSuffix,
} from '../dev/utils.js';
import { handleDataRequest, handleRedirectRequest } from '../dev/handlers.js';
import { OptimizedAppConfig } from '../../core/config/type.js';
import { resolvePath } from '../../core/config/utils/path.js';
import { BuildOptions } from '../build/index.js';
import type { RouterComponent } from '../../routing/interfaces.js';
import type { AppProps } from '../../core/types.js';
import type { TemplateProps } from '../../routing/types.js';

interface CreateRequestHandlerOptions {
  build: BuildOptions;
  /**
   * Pre-loaded build artifacts, bypassing every dynamic import() and
   * filesystem read this function (and, transitively, entry.server's
   * render()) would otherwise do. Required on runtimes with no
   * filesystem and no dynamic import-by-path support (Cloudflare
   * Workers) — every other caller (Vercel, Netlify, @rasenganjs/serve,
   * the dev server) omits this and keeps today's exact behavior
   * (RFC-0009 §Detailed Design 1).
   */
  modules?: {
    entryServer: { render: RenderStreamFunction };
    appRouter: RouterComponent;
    config: OptimizedAppConfig;
    manifest: Record<string, ManifestEntry>;
    app: FunctionComponent<AppProps>;
    template: FunctionComponent<TemplateProps>;
  };
}

/**
 * This function is responsible for creating a request handler for the server.
 *
 * Returns a plain WinterCG-style handler — `(ctx) => Promise<Response>` —
 * with its own top-level try/catch producing a sanitized 500 `Response`.
 * That safety net is independent of whichever futon `app.onError` (if
 * any) the caller happens to register above it, since this function
 * may be called directly without being wrapped in a Futon app at all
 * (e.g. from `@rasenganjs/serve`, or a bare script).
 * @param options
 * @returns
 */
export function createRequestHandler(options: CreateRequestHandlerOptions) {
  const { build: buildOptions, modules } = options;

  const manifest = new ManifestManager(
    modules
      ? modules.manifest
      : path.posix.join(
          buildOptions.buildDirectory,
          buildOptions.clientPathDirectory,
          buildOptions.manifestPathDirectory,
          'manifest.json'
        )
  );

  return async function requestHandler(ctx: Context): Promise<Response> {
    const request = ctx.request;

    try {
      // Get server entry
      const render: RenderStreamFunction = modules
        ? modules.entryServer.render
        : (
            await import(
              /* @vite-ignore */
              resolvePath(
                path.posix.join(
                  buildOptions.buildDirectory,
                  buildOptions.serverPathDirectory,
                  buildOptions.entryServerPath
                )
              )
            )
          ).render;
      // Get AppRouter
      const AppRouter = modules
        ? modules.appRouter
        : await (
            await import(
              /* @vite-ignore */
              resolvePath(
                path.posix.join(
                  buildOptions.buildDirectory,
                  buildOptions.serverPathDirectory,
                  'app.router.js'
                )
              )
            )
          ).default;

      let config: OptimizedAppConfig;

      if (modules) {
        config = modules.config;
      } else {
        // Get Config
        const configPath = path.posix.join(
          buildOptions.buildDirectory,
          buildOptions.clientPathDirectory,
          buildOptions.assetPathDirectory,
          'config.json'
        );

        const configPathExist = fs.existsSync(configPath);

        if (!configPathExist) {
          throw new Error(
            'No config.json file found in dist/client/assets, please make a build again by running "npm run build"'
          );
        }

        // Read the config.json file
        const configData = fs.readFileSync(configPath, 'utf-8').toString();

        // Parse the config.json file
        config = JSON.parse(configData) as OptimizedAppConfig;
      }

      // Get static routes
      const staticRoutes = generateRoutes(AppRouter);

      const pathname = stripDataSuffix(new URL(request.url).pathname);

      // Preload matches
      await preloadMatches(pathname, staticRoutes);

      // Create static handler
      let handler = createStaticHandler(staticRoutes);

      // React Router client-side navigations (`.data` URL suffix or
      // `Accept: application/json`) want just the matched route's
      // loader/action data, not a full document render — this branch
      // was previously dev-only, leaving production returning a full
      // HTML document for these requests instead.
      if (isDataRequest(request)) {
        return await handleDataRequest(request, handler);
      }

      let context = await handler.query(request);

      const redirectFound = await isStaticRedirectFromConfig(
        request,
        config.redirects
      );

      if (isRedirectResponse(context as Response) || redirectFound) {
        return await handleRedirectRequest(request, {
          context,
          redirects: config.redirects,
        });
      }

      if (!(context instanceof Response)) {
        // Extract meta from context
        const metadata = extractMetaFromRRContext(context);

        // Get the source file from the context
        const source = context.loaderData.source;

        // Get assets tags
        const assets = manifest.generateMetaTags(source);

        // Create static router
        let router = createStaticRouter(handler.dataRoutes, context);

        const headers = extractHeadersFromRRContext(context);

        const Router = (
          <StaticRouterProvider router={router} context={context} />
        );

        return await render(Router, {
          metadata,
          assets,
          buildOptions,
          statusCode: context.statusCode,
          responseHeaders: Object.fromEntries(headers),
          modules: modules
            ? { App: modules.app, Template: modules.template }
            : undefined,
        });
      }

      return context;
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  };
}
