// @ts-ignore
import type { Context } from "@netlify/functions"
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path, { join } from "node:path";
import {
  StaticHandlerContext,
  createStaticHandler,
  createStaticRouter,
} from "react-router";
// @ts-ignore
import { createFetchRequest } from "rasengan";
import { fileTypeFromBuffer } from "file-type";

// // @ts-ignore
// import { handleRequest } from "rasengan";
// // @ts-ignore
// import type { Context } from "@netlify/functions"


export default async (req: Request, context: Context) => {
  try {
    // Get URL
    const url = req.url;
    const host = req.headers.get("host")

    // Get app path
    // const appPath = join(__dirname, "..");
    const appPath = process.cwd();

    // ! Favicon Fix
    if (url === "/favicon.ico") {
      // Check if favicon.ico exists using fs
      // If it does, return it
      try {
        await fs.access(path.resolve(join(appPath, "dist/client/favicon.ico")));

        return new Response(path.resolve(join(appPath, "dist/client/favicon.ico"))
        )
      } catch (err: any) {
        return new Response("", {
          status: 404,
        });
      }
    }

    // ! Robots Fix
    if (url === "/robots.txt") {
      // Check if robots.txt exists using fs
      // If it does, return it
      try {
        await fs.access(path.resolve(join(appPath, "dist/client/robots.txt")));

        return new Response(path.resolve(join(appPath, "dist/client/robots.txt")))
      } catch (err: any) {
        return new Response(`
          user-agent: *
          disallow: /downloads/
          disallow: /private/
          allow: /
          
          user-agent: magicsearchbot
          disallow: /uploads/
        `)
      }
    }

    // ! Sitemap Fix
    if (url === "/sitemap.xml") {
      return new Response(path.resolve(join(appPath, "dist/client/sitemap.xml")))
    }

    // ! Manifest Fix
    if (url === "/manifest.json") {
      return new Response(path.resolve(join(appPath, "dist/client/manifest.json")))
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

      // New url without the search param if exist
      const newUrl = segmentsWithoutOrigin.join("/").split("?")[0];

      // replace assets by client/assets
      const filePath = join(appPath, "dist/client", newUrl);
      const file = await fs.readFile(filePath, "utf-8");

      if (url.endsWith(".js") || url.endsWith(".css")) {
        return new Response(file, {
          headers: {
            "Content-Type": url.endsWith(".js") ? "text/javascript" : "text/css",
            "Cache-Control": "max-age=31536000",
          },
        });
      }

      // read other files
      // const otherFile = await fs.readFile(filePath);

      // const result = await fileTypeFromBuffer(otherFile);

      // const mimeType = result ? result.mime : url.endsWith(".svg") ? "image/svg+xml" : "application/octet-stream";

      // return new Response(otherFile, {
      //   headers: {
      //     "Content-Type": mimeType,
      //     "Cache-Control": "max-age=31536000",
      //   },
      // });
    }

    // Handle js and css files
    if (url.endsWith(".js") || url.endsWith(".css")) {
      const file = await fs.readFile(url, "utf-8");

      return new Response(file, {
        headers: {
          "Content-Type": url.endsWith(".js") ? "text/javascript" : "text/css",
          "Cache-Control": "max-age=31536000",
        },
      });
    }

    // Handle fonts files
    if (url.endsWith(".ttf") || url.endsWith(".woff") || url.endsWith(".woff2") || url.endsWith(".eot") || url.endsWith(".otf")) {
      // Remove the characters after the ?
      const file = await fs.readFile(url.split("?")[0], "utf-8");

      return new Response(file, {
        headers: {
          "Content-Type": `font/${url.split(".").pop()}`,
          "Cache-Control": "max-age=31536000",
        },
      });
    }

    // Handle /.netlify/images requests
    if (url.includes('/.netlify/images')) {
      // make a request to the url
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();

      // get the file type
      const mimeType = res.headers.get("Content-Type") || "application/octet-stream";

      return new Response(buffer, {
        headers: {
          "Content-Type": mimeType,
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
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "max-age=31536000",
      },
    });
  } catch (e: any) {
    console.log(e.stack);
    
    return new Response(e.stack, {
      status: 500,
    });
  }
}

// export default async (req: Request, context: Context) => {
//   return await handleRequest(req);
// }