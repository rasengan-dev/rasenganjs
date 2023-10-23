import fs from "node:fs/promises";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    console.log({ appPath });

    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile(join(appPath, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("./entries/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import(join(appPath, "dist/server/entry-server.js")))
        .render;
    }

    const rendered = await render(url, ssrManifest);

    let html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    if (!isProduction) {
      html = html.replace(
        `<!--app-script-->`,
        `<script type="module" src="/node_modules/rasengan/entries/entry-client.tsx"></script>`
      );
    } else {
      // Read and import the generated main.js entry
    }

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
