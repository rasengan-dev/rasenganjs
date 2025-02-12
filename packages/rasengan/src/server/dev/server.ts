import { join } from 'node:path';
import express from 'express';
import type * as Express from 'express';
import type * as Vite from 'vite';
import {
  createServerModuleRunner,
  createServer as createViteServer,
} from 'vite';
import chalk from 'chalk';
import inquirer from 'inquirer';

// Middlewares
import { loggerMiddleware } from '../../core/middlewares/index.js';

// Load utilities functions
import { isDataRequest, isDocumentRequest, logServerInfo } from './utils.js';
import {
  getDirname,
  loadModuleSSR,
} from '../../core/config/utils/load-modules.js';

import { RouterComponent, type AppConfig } from '../../index.js';
import { ServerMode } from '../runtime/mode.js';
import { handleDataRequest, handleDocumentRequest } from './handlers.js';
import { createStaticHandler } from 'react-router';
import { generateRoutes } from '../../routing/utils/generate-routes.js';

type ServerError = Error & { code: string };

/**
 * Handle the request for the development environment
 * @param req
 * @param res
 * @param viteDevServer
 * @param options
 */
async function devRequestHandler(
  req: Express.Request,
  res: Express.Response,
  viteDevServer: Vite.ViteDevServer,
  options: { rootPath: string; __dirname: string; config: AppConfig }
) {
  try {
    // Get the module runner through ssr environment
    const runner = createServerModuleRunner(viteDevServer.environments.ssr);

    // Load app-router
    const AppRouter: RouterComponent = await (
      await runner.import(join(`${options.rootPath}/src/app/app.router`))
    ).default;

    // Get static routes
    const staticRoutes = generateRoutes(AppRouter);

    // Create static handler
    let handler = createStaticHandler(staticRoutes);

    if (isDataRequest(req)) {
      // Handle data request
      return await handleDataRequest(req, handler);
    }

    if (isDocumentRequest(req)) {
      return await handleDocumentRequest(req, res, runner, {
        ...options,
        handler,
      });
    }

    return res.status(404).send('Not found');
  } catch (error) {
    // Just log the error for now
    console.error(error);
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

  const multiplicationSymbol = '\u00D7';

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

  // Create http server
  const app = express();

  // Initialize a vite dev server as middleware
  const viteDevServer = await createViteServer({
    server: { middlewareMode: true, hmr: true },
    base,
    configFile: `${rootPath}/node_modules/rasengan/vite.config.ts`, // Path: [...]/node_modules/rasengan/vite.config.ts
  });

  // Disable x-powered-by
  app.disable('x-powered-by');

  // Apply middlewares
  app.use(loggerMiddleware);
  app.use(viteDevServer.middlewares);

  // Create the request handler
  app.use('*', async (req, res, next) => {
    try {
      // const url = req.url || req.originalUrl;
      return devRequestHandler(req, res, viteDevServer, {
        rootPath,
        __dirname,
        config,
      });
    } catch (error) {
      if (typeof error === 'object' && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);

      // TODO: Find a way to handle the error here
    }
  });

  // Start http server
  const server = app.listen(port, () => {
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
