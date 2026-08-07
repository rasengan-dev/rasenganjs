import { join } from 'node:path';
import http from 'node:http';
import type * as Vite from 'vite';
import {
  createServerModuleRunner,
  createServer as createViteServer,
} from 'vite';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {
  Futon,
  logger as futonLogger,
  html as htmlResponse,
  notFound as notFoundResponse,
  json as jsonResponse,
  type Context,
  type Router,
} from '@rasenganjs/futon';
import {
  incomingToRequest,
  writeNodeResponse,
} from '@rasenganjs/runtime/adapters/node';
import { isHttpErrorLike } from '../node/api-router-middleware.js';

// Load utilities functions
import {
  generateRandomPort,
  isDataRequest,
  isDocumentRequest,
  logServerInfo,
  stripDataSuffix,
} from './utils.js';
import {
  getDirname,
  loadModuleSSR,
} from '../../core/config/utils/load-modules.js';

import { RouterComponent, type AppConfig } from '../../index.js';
import { ServerMode } from '../runtime/mode.js';
import {
  handleDataRequest,
  handleDocumentRequest,
  handleSpaModeRequest,
} from './handlers.js';
import { createStaticHandler, matchRoutes } from 'react-router';
import {
  generateRoutes,
  preloadMatches,
} from '../../routing/utils/generate-routes.js';
import { renderErrorPage } from '../../entries/server/error-template.js';

type ServerError = Error & { code: string };

/**
 * The SSR catch-all — registered as `app.fallback(...)`, so it
 * receives every request that doesn't match a route Futon itself
 * knows about (rasengan registers none, see RFC-0007 §3).
 *
 * Includes a cheap structural-404 guard: `matchRoutes` (the same
 * matcher `createStaticHandler` uses internally) runs before any
 * loader/render work, short-circuiting requests that don't
 * correspond to any page pattern at all.
 * @param ctx
 * @param viteDevServer
 * @param options
 */
async function ssrHandler(
  ctx: Context,
  viteDevServer: Vite.ViteDevServer,
  options: { rootPath: string; __dirname: string; config: AppConfig }
): Promise<Response> {
  const request = ctx.request;

  // Get the module runner through ssr environment
  const runner = createServerModuleRunner(viteDevServer.environments.ssr);

  if (options.config.ssr) {
    // Load app-router
    const AppRouter: RouterComponent = await (
      await runner.import(join(`${options.rootPath}/src/app/app.router`))
    ).default;

    // Get static routes
    const staticRoutes = generateRoutes(AppRouter);

    const pathname = stripDataSuffix(new URL(request.url).pathname);

    // Cheap structural 404 — no loader/render invoked for URLs that
    // don't correspond to any page pattern at all.
    if (!matchRoutes(staticRoutes, pathname)) {
      return notFoundResponse('Not found');
    }

    await preloadMatches(pathname, staticRoutes);

    // Create static handler
    let handler = createStaticHandler(staticRoutes);

    if (isDataRequest(request)) {
      // Handle data request
      return await handleDataRequest(request, handler);
    }

    if (isDocumentRequest(request)) {
      return await handleDocumentRequest(request, runner, {
        ...options,
        handler,
      });
    }
  } else {
    // handling spa mode here
    return await handleSpaModeRequest(runner, options);
  }

  return notFoundResponse('Not found');
}

/**
 * Dispatches requests under `_api/`'s configured prefix (RFC-0008) to
 * the live `virtual:rasengan/api-router` module — resolved fresh
 * through Vite's SSR module runner, same as `ssrHandler` does for
 * `app.router`, so `_api/` edits are picked up without a rebuild.
 *
 * Self-contained under the prefix: an unmatched path or an uncaught
 * handler error responds in JSON here, never falling through to
 * `ssrHandler`'s HTML error page.
 * @param ctx
 * @param next
 * @param viteDevServer
 * @param config
 */
async function apiRouterDevMiddleware(
  ctx: Context,
  next: () => Promise<Response>,
  viteDevServer: Vite.ViteDevServer,
  config: AppConfig
): Promise<Response> {
  const prefix = config.api?.prefix ?? '/api';
  const pathname = new URL(ctx.request.url).pathname;

  if (!pathname.startsWith(prefix)) {
    return next();
  }

  const runner = createServerModuleRunner(viteDevServer.environments.ssr);

  try {
    const ApiRouter: Router = await (
      await runner.import('virtual:rasengan/api-router')
    ).default;

    const dispatch = ApiRouter.middleware();

    return await dispatch(ctx, async () =>
      jsonResponse(
        { error: { message: 'Not Found', status: 404 } },
        { status: 404 }
      )
    );
  } catch (error) {
    console.error(error);
    viteDevServer.ssrFixStacktrace(error as Error);

    const status = isHttpErrorLike(error) ? error.status : 500;
    const message = isHttpErrorLike(error)
      ? error.message
      : ((error as Error)?.message ?? 'Internal Server Error');

    return jsonResponse({ error: { message, status } }, { status });
  }
}

/**
 * Handle server errors
 * @param err
 * @param options
 * @returns
 */
async function errorHandler(
  err: ServerError,
  options: {
    port: number;
    base: string;
    enableSearchingPort: boolean;
    config: AppConfig;
  }
) {
  const { port, base, enableSearchingPort, config } = options;

  const multiplicationSymbol = '×';

  // Handle PORT in use error
  if (err.code === 'EADDRINUSE') {
    const newPort = port + 1;

    console.error(
      chalk.red(
        `${chalk.bold.red(
          multiplicationSymbol
        )} Port ${port} is already in use. \n\n`
      )
    );

    // Check if user wants to use a different port
    if (!enableSearchingPort) {
      // Ask user if they want to use a different port
      const { useDifferentPort } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useDifferentPort',
          message: `Do you want to use a different port?`,
        },
      ]);

      if (!useDifferentPort) {
        console.log(chalk.blue('Closing server... \n\n'));
        process.exit(0);
      }

      console.log(chalk.blue(`Trying port ${newPort}... \n\n`));

      return await createDevNodeServer({
        port: newPort,
        base,
        enableSearchingPort: true,
        config,
      });
    } else {
      console.log(chalk.blue(`Trying port ${newPort}... \n\n`));

      return await createDevNodeServer({
        port: newPort,
        base,
        enableSearchingPort,
        config,
      });
    }
  }
}

/**
 * This function is responsible for creating a server for the development environment.
 */
async function createDevNodeServer({
  port,
  base = '/',
  enableSearchingPort = false,
  config,
}: {
  port: number;
  base?: string;
  enableSearchingPort?: boolean;
  open?: boolean;
  config: AppConfig;
}) {
  // Get app path
  const rootPath = process.cwd();

  // Get directory full path
  const __dirname = await getDirname(import.meta.url);

  // Initialize a vite dev server as middleware
  const viteDevServer = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: {
        // TODO: Find a way to use a random port
        port: generateRandomPort(),
        overlay: false,
      },
    },
    base,
    configFile: `${rootPath}/node_modules/rasengan/vite.config.ts`, // Path: [...]/node_modules/rasengan/vite.config.ts
  });

  // Futon app — owns the SSR pipeline (middleware + fallback + error
  // handling). Vite's own Connect-style dev middleware is handled
  // one layer up (see the raw http.createServer below): it needs
  // genuine Node req/res objects, which Futon's Web-API-only Context
  // can't provide, so it isn't wrapped as a Futon middleware.
  const app = new Futon();

  // Populates ctx.runtime.server for every request — the same
  // one-time call a RuntimeAdapter's serve() would make (see
  // RFC-0007 §9). Not routed through NodeDevAdapter itself: its
  // built-in HTTP listener has no hook for giving Vite's Connect
  // middleware first crack at a request with genuine Node req/res.
  app.configureServer({
    preset: 'node',
    mode: 'development',
    port,
    host: '0.0.0.0',
    rootDir: rootPath,
  });

  app.use(futonLogger());
  app.use((ctx, next) =>
    apiRouterDevMiddleware(ctx, next, viteDevServer, config)
  );

  app.fallback((ctx) =>
    ssrHandler(ctx, viteDevServer, { rootPath, __dirname, config })
  );

  app.onError(async (error) => {
    console.error(error);

    viteDevServer.ssrFixStacktrace(error);

    const html = renderErrorPage(error);

    return htmlResponse(html, { status: 500 });
  });

  // Raw Node HTTP server: give Vite's Connect middleware first crack
  // at every request with real req/res (asset transforms, source
  // maps, static files, ...); only requests it doesn't handle
  // (`next()` called with no response written) are converted to a
  // Web Request and handed to Futon.
  const server = http.createServer((req, res) => {
    viteDevServer.middlewares(req, res, async (err?: unknown) => {
      if (err) {
        console.error(err);
        if (!res.headersSent) res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }

      try {
        const request = await incomingToRequest(req);
        const response = await app.fetch(request);
        await writeNodeResponse(res, response);
      } catch (error) {
        // Last-resort safety net — app.fetch() already catches
        // everything via app.onError() above.
        console.error(error);
        if (!res.headersSent) res.writeHead(500);
        res.end('Internal Server Error');
      }
    });
  });

  // Start http server
  server.listen(port, () => {
    setTimeout(() => {
      logServerInfo(
        port,
        ServerMode.Development,
        config.server?.development?.open
      );
    }, 100);
  });

  // Handle errors
  server.on('error', async (err: ServerError) => {
    await errorHandler(err, {
      port,
      base,
      enableSearchingPort,
      config,
    });
  });
}

// Launch server
(async function launchDevNodeServer() {
  const rootPath = process.cwd();

  // Format config path
  const configPath = join(`${rootPath}/rasengan.config.js`);

  // Get config
  const configHandler = await (await loadModuleSSR(configPath)).default;

  // console.log({ configHandler });

  const config = await configHandler();

  const port =
    (process.env.PORT && Number(process.env.PORT)) ||
    config.server?.development?.port ||
    5320;
  const base = process.env.BASE || '/';

  await createDevNodeServer({
    port,
    base,
    config,
  });
})();
