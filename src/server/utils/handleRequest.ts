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
export async function handleRequest(req: any, res?: any) {
  try {
    // Get URL
    const url = req.url;
    const host = req.headers.host ? req.headers.host : req.headers.get("host") || "";

    // Get app path
    const appPath = process.cwd();

    // ! Robots Fix
    if (url === "/robots.txt") {
      // Check if robots.txt exists using fs
      // If it does, return it
      try {
        await fs.access(path.resolve(join(appPath, "dist/client/robots.txt")));

        if (res)
          return res.send(path.resolve(join(appPath, "dist/client/robots.txt")));

        return new Response(path.resolve(join(appPath, "dist/client/robots.txt")), {
          status: 200
        });
      } catch (err: any) {
        if (res)
          return res.send(`
            user-agent: *
            disallow: /downloads/
            disallow: /private/
            allow: /
            
            user-agent: magicsearchbot
            disallow: /uploads/
          `);

          return new Response(`
            user-agent: *
            disallow: /downloads/
            disallow: /private/
            allow: /
            
            user-agent: magicsearchbot
            disallow: /uploads/
          `, {
            status: 200
          });
      }
    }

    // ! Sitemap Fix
    if (url === "/sitemap.xml") {
      if (res)
        return res.send(path.resolve(join(appPath, "dist/client/sitemap.xml")));

      return new Response(path.resolve(join(appPath, "dist/client/sitemap.xml")), {
        status: 200
      });
    }

    // ! Manifest Fix
    if (url === "/manifest.json") {
      if (res)
        return res.send(path.resolve(join(appPath, "dist/client/manifest.json")));

      return new Response(path.resolve(join(appPath, "dist/client/manifest.json")), {
        status: 200
      });
    }

    // ! Handle assets
    if (url.includes("/assets")) {
      // get segments from /assets to the end
      const segments = url.split("/");

      const segmentsWithoutOrigin = [...segments];

      for (let segment of segments) {
        if (segment === "assets") {
          break;
        }

        segmentsWithoutOrigin.shift();
      }

      // replace assets by client/assets
      const filePath = join(appPath, "dist/client", segmentsWithoutOrigin.join("/"));
      const file = await fs.readFile(filePath, "utf-8");

      if (res) {
        return res
        .status(200)
        .setHeader("Content-Type", url.endsWith(".js") ? "text/javascript" : "text/css")
        .setHeader("Cache-Control", "max-age=31536000")
        .end(file);
      }

      return new Response(file, {
        headers: {
          "Content-Type": url.endsWith(".js") ? "text/javascript" : "text/css",
          "Cache-Control": "max-age=31536000",
        },
      });
    }

    // Handle js and css files
    if (url.endsWith(".js") || url.endsWith(".css")) {
      const file = await fs.readFile(url, "utf-8");

      if (res) {
        return res
        .status(200)
        .setHeader("Content-Type", url.endsWith(".js") ? "text/javascript" : "text/css")
        .setHeader("Cache-Control", "max-age=31536000")
        .end(file);
      }

      return new Response(file, {
        headers: {
          "Content-Type": url.endsWith(".js") ? "text/javascript" : "text/css",
          "Cache-Control": "max-age=31536000",
        },
      });
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

      if (redirect) {
        if (res) return res.redirect(redirect);

        return Response.redirect(redirect);
      }
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
