import fs from "node:fs/promises";
import express from "express";
import { dirname, join } from "path";
// import { ViteDevServer } from "vite";
import { fileURLToPath } from "url";
import {
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server.js";
import { Request, Headers } from "node-fetch";
import chalk from "chalk";
import os from "node:os";

/**
 * This function is used to create a fetch request from an express request.
 */
function createFetchRequest(req) {
  let origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

/**
 * This function is responsible for creating a server for the development environment.
 */
async function createServer() {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const appPath = join(__dirname, "./../../");

  // Constants
  const isProduction = process.env.NODE_ENV === "production";
  const port = process.env.PORT || isProduction ? 4320 : 5320;
  const base = process.env.BASE || "/";

  // Cached production assets
  const templateHtml = isProduction
    ? await fs.readFile(join(appPath, "dist/client/index.html"), "utf-8")
    : "";
  const ssrManifest = isProduction
    ? await fs.readFile(join(appPath, "dist/client/ssr-manifest.json"), "utf-8")
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
      // ! Favicon Fix
      if (req.originalUrl === "/favicon.ico") {
        return res.sendFile(path.resolve(join(appPath, "public/rasengan.png")));
      }

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
      let fetchRequest = createFetchRequest(req);
      let context = await handler.query(fetchRequest);

      // Create static router
      let router = createStaticRouter(handler.dataRoutes, context);

      // const rendered = await render(url, ssrManifest);
      const rendered = await render(router, context);

      let html = template
        .replace(`<!--app-head-->`, rendered.head ?? "")
        .replace(`<!--app-html-->`, rendered.html ?? "");

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  // Start http server
  app.listen(port, async () => {
    setTimeout(() => {
      console.log(
        `${chalk.bold("Local:")} ${chalk.blue(`http://localhost:${port}`)}`
      );

      const ipAddress = getIP();

      if (ipAddress) {
        console.log(
          `${chalk.bold("Network:")} ${chalk.blue(`http://${getIP()}:${port}`)}`
        );

        console.log("");
      }
    }, 1000);
  });
}

// Get local IP
export const getIP = () => {
  // Get network interfaces
  const networkInterfaces = os.networkInterfaces();

  // Find the IPv4 address for the default network interface
  let ipAddress = "";

  for (const interfaceName in networkInterfaces) {
    const iface = networkInterfaces[interfaceName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === "IPv4" && !alias.internal) {
        ipAddress = alias.address;
        break;
      }
    }
    if (ipAddress) {
      break;
    }
  }

  return ipAddress;
};

// Launch server
createServer();
