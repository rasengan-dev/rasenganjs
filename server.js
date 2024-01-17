import fs from "node:fs/promises";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server.js";
import chalk from "chalk";
import inquirer from "inquirer";

// Get config
// @ts-ignore
import config from "./../../rasengan.config.js";

// Load utils
import {
  createFetchRequest,
  logServerInfo,
  fix404,
} from "./lib/server/utils/index.js";

/**
 * This function is responsible for creating a server for the development environment.
 * @param {boolean} isProduction - Whether the server is in production mode or not.
 * @param {number} port - The port to run the server on.
 * @param {string} base - The base path for the server.
 */
async function createServer({
  isProduction,
  port,
  base = "/",
  enableSearchingPort = false,
}) {
  // Get directory name
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Get app path
  const appPath = join(__dirname, "./../../");

  // Cached production assets
  const templateHtml = isProduction
    ? await fs.readFile(join(appPath, "dist/client/index.html"), "utf-8")
    : "";
  const ssrManifest = isProduction
    ? await fs.readFile(
        join(appPath, "dist/client/.vite/ssr-manifest.json"),
        "utf-8"
      )
    : undefined;

  // Create http server
  const app = express();

  // Add Vite or respective production middlewares
  let vite;
  if (!isProduction) {
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv(join(appPath, "dist/client"), { extensions: [] }));
  }

  // Serve HTML
  app.use("*", async (req, res) => {
    try {
      // ! 404 Fix related to some files not being found
      fix404(req.originalUrl, res, appPath);

      // ! Service Worker Fix

      const url = req.originalUrl.replace(base, "");

      let template;
      let render;
      let staticRoutes;
      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile(join(appPath, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);

        const entry = await vite.ssrLoadModule(
          join(appPath, "node_modules/rasengan/lib/entries/entry-server.js")
        );

        render = entry.render;
        staticRoutes = entry.staticRoutes;
      } else {
        template = templateHtml;
        const entry = await import(
          join(appPath, "dist/server/entry-server.js")
        );
        render = entry.render;
        staticRoutes = entry.staticRoutes;
      }

      // Create static handler
      let handler = createStaticHandler(staticRoutes);

      // Create fetch request for static routing
      let fetchRequest = createFetchRequest(req, req.get("host"));
      let context = await handler.query(fetchRequest);

      // Handle redirects
      const status = context.status;

      if (status === 302) {
        const redirect = context.headers.get("Location");

        return res.redirect(redirect);
      }

      // Helmet context
      const helmetContext = {};

      // Create static router
      let router = createStaticRouter(handler.dataRoutes, context);

      // const rendered = await render(url, ssrManifest);
      const rendered = await render(router, context, helmetContext);

      // Get metadata
      const helmet = helmetContext.helmet;

      const head = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      `;

      let html = template
        .replace(`<!--app-head-->`, head ?? "")
        .replace(`<!--app-html-->`, rendered.html ?? "");

      res
        .status(200)
        .set({
          "Content-Type": "text/html",
          "Cache-Control": "max-age=31536000",
        })
        .end(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      // console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  // Start http server
  const server = app.listen(port, () => {
    setTimeout(() => {
      logServerInfo(port, isProduction);
    }, 100);
  });

  // Handle errors
  server.on("error", async (err) => {
    const multiplicationSymbol = "\u00D7";

    // Handle PORT in use error
    if (err.code === "EADDRINUSE") {
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
            type: "confirm",
            name: "useDifferentPort",
            message: `Do you want to use a different port?`,
          },
        ]);

        if (!useDifferentPort) {
          console.log(chalk.blue("Closing server... \n\n"));
          process.exit(0);
        }

        console.log(chalk.blue(`Trying port ${newPort}... \n\n`));

        await createServer({
          isProduction,
          port: newPort,
          base,
          enableSearchingPort: true,
        });
      } else {
        console.log(chalk.blue(`Trying port ${newPort}... \n\n`));

        await createServer({
          isProduction,
          port: newPort,
          base,
          enableSearchingPort,
        });
      }
    }
  });
}

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = !isProduction
  ? (process.env.PORT && Number(process.env.PORT)) ||
    config.server?.development?.port ||
    5320
  : process.env.PORT || 4320;
const base = process.env.BASE || "/";

// Launch server
(async function launchServer() {
  await createServer({ isProduction, port, base });
})();
