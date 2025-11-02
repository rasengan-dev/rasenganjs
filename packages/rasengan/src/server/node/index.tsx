import type * as Express from 'express';
import { ManifestManager } from '../build/manifest.js';
import fs from 'node:fs';
import path from 'node:path';
import {
  render,
  RenderStreamFunction,
} from '../../entries/server/entry.server.js';
import {
  generateRoutes,
  getAllRoutesPath,
  preloadMatches,
  // generateSSRRoutes,
} from '../../routing/utils/index.js';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router';
import createRasenganRequest, { createFakeRasenganRequest } from './utils.js';
import {
  extractHeadersFromRRContext,
  extractMetaFromRRContext,
  generateRandomPort,
  isRedirectResponse,
  isStaticRedirectFromConfig,
} from '../dev/utils.js';
import { handleRedirectRequest } from '../dev/handlers.js';
import { OptimizedAppConfig } from '../../core/config/type.js';
import { resolvePath } from '../../core/config/utils/path.js';
import { BuildOptions } from '../build/index.js';
import {
  createServerModuleRunner,
  createServer as createViteServer,
} from 'vite';
import { RouterComponent } from '../../routing/interfaces.js';
import { FunctionComponent } from 'react';

interface CreateRequestHandlerOptions {
  build: BuildOptions;
}

interface PreRenderAppOptions {
  build: BuildOptions;
  outDir?: string;
  routes?: string[];
}

/**
 * This function is responsible for creating a request handler for the server.
 * @param options
 * @returns
 */
export function createRequestHandler(options: CreateRequestHandlerOptions) {
  const { build: buildOptions } = options;

  const manifest = new ManifestManager(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.clientPathDirectory,
      buildOptions.manifestPathDirectory,
      'manifest.json'
    )
  );

  return async function requestHandler(
    req: Express.Request,
    res: Express.Response
  ) {
    try {
      // Get server entry
      const entry = await import(
        resolvePath(
          path.posix.join(
            buildOptions.buildDirectory,
            buildOptions.serverPathDirectory,
            buildOptions.entryServerPath
          )
        )
      );
      // Get AppRouter
      const AppRouter = await (
        await import(
          resolvePath(
            path.posix.join(
              buildOptions.buildDirectory,
              buildOptions.serverPathDirectory,
              'app.router.js'
            )
          )
        )
      ).default;
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
      const config = JSON.parse(configData) as OptimizedAppConfig;

      // extract render function
      const {
        render,
      }: {
        render: RenderStreamFunction;
      } = entry;

      // Get static routes
      const staticRoutes = generateRoutes(AppRouter);

      // Preload matches
      await preloadMatches(req.originalUrl, staticRoutes);

      // Create static handler
      let handler = createStaticHandler(staticRoutes);

      // Create rasengan request for static routing
      let request = createRasenganRequest(req, res);
      let context = await handler.query(request);

      const redirectFound = await isStaticRedirectFromConfig(
        req,
        config.redirects
      );

      if (isRedirectResponse(context as Response) || redirectFound) {
        return await handleRedirectRequest(req, res, {
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

        // Set headers
        res.writeHead(context.statusCode, {
          ...Object.fromEntries(headers),
        });

        const Router = (
          <StaticRouterProvider router={router} context={context} />
        );

        // If stream mode enabled, render the page as a plain text
        return await render(Router, res, {
          metadata,
          assets,
          buildOptions,
        });
      }

      return context;
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
}

/**
 * This function prerenders all Rasengan routes into static HTML files.
 * It replaces the need for a runtime server and allows deployment to a CDN.
 */
export async function preRenderApp(options: PreRenderAppOptions) {
  try {
    const {
      build: buildOptions,
      outDir = 'dist',
      // routes = ['/'],
    } = options;
    // Initialize a vite dev server as middleware
    const viteDevServer = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      base: '/',
      configFile: `${process.cwd()}/node_modules/rasengan/vite.config.ts`, // Path: [...]/node_modules/rasengan/vite.config.ts
    });
    // Get the module runner through ssr environment
    const runner = createServerModuleRunner(viteDevServer.environments.ssr);

    console.log('🌀 Starting Rasengan static prerendering...');

    // Locate the assets directory
    const clientDirCandidates = [
      path.posix.join(
        buildOptions.buildDirectory,
        buildOptions.clientPathDirectory
      ),
      path.posix.join(buildOptions.buildDirectory),
    ];

    const clientDir = clientDirCandidates.find((dir) => fs.existsSync(dir));

    if (!clientDir) {
      throw new Error(
        'No "dist/client" or "dist" directory found. Please make sure to run "rasengan build" first.'
      );
    }

    // 1. Load build manifest
    const manifest = new ManifestManager(
      path.posix.join(
        clientDir,
        buildOptions.manifestPathDirectory,
        'manifest.json'
      )
    );

    // 2. Load the entry server
    // const entry = await import(
    //   resolvePath(
    //     path.posix.join(
    //       buildOptions.buildDirectory,
    //       buildOptions.serverPathDirectory,
    //       buildOptions.entryServerPath
    //     )
    //   )
    // );
    // const { render }: { render: RenderStreamFunction } = entry;

    // // 3. Load AppRouter
    // Load app-router
    const AppRouter: RouterComponent = await (
      await runner.import(path.posix.join(process.cwd(), '/src/app/app.router'))
    ).default;

    // Load Main App
    const App: FunctionComponent = await (
      await runner.import(path.posix.join(process.cwd(), '/src/main'))
    ).default;

    // Load Template
    const Template: FunctionComponent = await (
      await runner.import(path.posix.join(process.cwd(), '/src/template'))
    ).default;

    // 4. Load App Config
    const configPath = path.posix.join(
      clientDir, // dist or dist/client
      buildOptions.assetPathDirectory,
      'config.json'
    );
    const configData = fs.readFileSync(configPath, 'utf-8').toString();
    const config = JSON.parse(configData) as OptimizedAppConfig;

    // 5. Generate static routes
    const staticRoutes = generateRoutes(AppRouter);

    const routes = await getAllRoutesPath(staticRoutes);

    // 6. Loop through routes and render them to HTML
    for (const route of routes) {
      const pathname = route === '/' ? '/' : `${route}/`;
      console.log(`🧩 Rendering ${pathname}`);

      // Simulate fake request & response
      const { req: fakeReq, res: fakeRes } =
        createFakeRasenganRequest(pathname);

      // Preload data
      await preloadMatches(pathname, staticRoutes);

      // Create static handler
      const handler = createStaticHandler(staticRoutes);
      const request = createRasenganRequest(fakeReq, fakeRes);
      const context = await handler.query(request);

      const redirectFound = await isStaticRedirectFromConfig(
        fakeReq,
        config.redirects
      );
      if (redirectFound) {
        console.log(`➡️  Skipping redirect route: ${pathname}`);
        continue;
      }

      if (!(context instanceof Response)) {
        const metadata = extractMetaFromRRContext(context);
        const source = context.loaderData.source;
        const assets = manifest.generateMetaTags(source);
        const router = createStaticRouter(handler.dataRoutes, context);

        const Router = (
          <StaticRouterProvider router={router} context={context} />
        );

        // Capture the HTML as string
        const html = await render(
          Router,
          null,
          {
            metadata,
            assets,
            // buildOptions,
            App,
            Template,
          },
          false
        );

        // Write to disk
        const outputDir = path.join(outDir, route || 'index');
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'index.html'), html as string);

        const splittedOutputDir = outputDir.split('dist/');
        console.log(
          `✅  Rendered: ${pathname} → dist/${splittedOutputDir[1] ? splittedOutputDir[1] + '/' : ''}index.html`
        );
      }
    }

    // Stop the vite dev server
    viteDevServer.close();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * This function is responsible for handling the document request.
 * @param req
 * @param res
 * @returns
 */
export function handleDocumentRequest() {}

/**
 * This function is responsible for handling the data request.
 * @param req
 * @param res
 * @returns
 */
export function handleDataRequest() {}
