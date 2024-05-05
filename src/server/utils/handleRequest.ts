import fs from "node:fs/promises";
import fsSync from "node:fs";
import path, { join } from "node:path";
import {
  StaticHandlerContext,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server.js";
// @ts-ignore
import { createFetchRequest } from "rasengan";

// Create server for production only
export default async function handleRequest(req: any, res?: any) {
  try {
    // Get URL
    const url = req.url;
    const host = req.headers.host;

    // Get app path
    const appPath = process.cwd();

    // ! Robots Fix
    if (url === "/robots.txt") {
      // Check if robots.txt exists using fs
      // If it does, return it
      try {
        await fs.access(path.resolve(join(appPath, "dist/client/robots.txt")));

        return res.send(path.resolve(join(appPath, "dist/client/robots.txt")));
      } catch (err: any) {
        return res.send(`
        user-agent: *
        disallow: /downloads/
        disallow: /private/
        allow: /
        
        user-agent: magicsearchbot
        disallow: /uploads/
      `);
      }
    }

    // ! Sitemap Fix
    if (url === "/sitemap.xml") {
      return res.send(path.resolve(join(appPath, "dist/client/sitemap.xml")));
    }

    // ! Manifest Fix
    if (url === "/manifest.json") {
      return res.send(path.resolve(join(appPath, "dist/client/manifest.json")));
    }

    // Template html
    let templateHtml = "";

    // Always read fresh template in development
    const serverFilePath = join(appPath, "dist/server/entry-server.js");
    const bootstrapDirPath = join(appPath, "dist/client/assets")

    // Read the entry sever file
    let entry = await import(serverFilePath);

    // replace bootstrap script with compiled scripts
    let bootstrap =
      "/assets/" +
      fsSync
        .readdirSync(bootstrapDirPath)
        .filter((fn) => fn.includes("entry-client") && fn.endsWith(".js"))[0];

    // replace styles with compiled styles
    let styles =
      "/assets/" +
      fsSync
        .readdirSync(join(appPath, "dist/client/assets"))
        .filter((fn) => fn.includes("entry-client") && fn.endsWith(".css"))[0];

    // Extract render and staticRoutes from entry
    const { render, staticRoutes, loadTemplateHtml } = entry;

    // Create static handler
    let handler = createStaticHandler(staticRoutes);

    // Create fetch request for static routing
    // @ts-ignore
    let fetchRequest = createFetchRequest(req, host);
    let context = await handler.query(fetchRequest);

    // Handle redirects
    const status = (context as Response).status;

    if (status === 302) {
      const redirect = (context as Response).headers.get("Location");

      if (redirect) return res.redirect(redirect);
    }

    // Helmet context
    const helmetContext = {} as { helmet: any };

    // Create static router
    let router = createStaticRouter(
      handler.dataRoutes,
      context as StaticHandlerContext
    );

    const rendered = await render(router, context, helmetContext);

    // Load template html
    if (!templateHtml) {
      templateHtml = loadTemplateHtml(helmetContext, bootstrap, styles);
    }

    // Replacing the app-html placeholder with the rendered html
    let html = templateHtml.replace(`rasengan-body-app`, rendered.html ?? "");

    // Send the rendered html page
    if (res) {
      return res
      .status(200)
      .setHeader("Content-Type", "text/html")
        .setHeader("Cache-Control", "max-age=31536000")
        .end(html);
    }

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "max-age=31536000",
      },
    });
  } catch (e: any) {
    console.log(e.stack);

    if (res) {
      return res.status(500).end(e.stack);
    }

    return new Response(e.stack, {
      status: 500,
    });
  }
}
