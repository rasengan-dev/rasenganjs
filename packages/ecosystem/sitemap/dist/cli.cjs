"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
  main: () => main
});
module.exports = __toCommonJS(cli_exports);
var import_promises2 = require("fs/promises");
var import_node_path5 = __toESM(require("path"), 1);
var import_node_process = __toESM(require("process"), 1);

// src/config-loader.ts
var import_node_path = __toESM(require("path"), 1);
var import_node_url = require("url");
async function loadSitemapConfig(cwd) {
  const configPath = import_node_path.default.posix.join(cwd, "rasengan-sitemap.config.js");
  let mod;
  try {
    mod = await import((0, import_node_url.pathToFileURL)(configPath).href);
  } catch (err) {
    throw new Error(
      `Could not load rasengan-sitemap.config.js at ${configPath}. Create one exporting defineSitemapConfig({ siteUrl: '...' }).
${err.message}`
    );
  }
  const config = mod.default ?? mod;
  if (!config?.siteUrl) {
    throw new Error(
      "`siteUrl` is required in rasengan-sitemap.config.js, e.g. defineSitemapConfig({ siteUrl: 'https://example.com' })."
    );
  }
  return config;
}

// src/build-config.ts
var import_promises = require("fs/promises");
var import_node_path2 = __toESM(require("path"), 1);
async function loadBuildConfig(cwd) {
  const candidates = [
    import_node_path2.default.posix.join(cwd, "dist", "client", "assets", "config.json"),
    import_node_path2.default.posix.join(cwd, "dist", "assets", "config.json")
  ];
  for (const candidate of candidates) {
    try {
      await (0, import_promises.access)(candidate);
      const text = await (0, import_promises.readFile)(candidate, "utf-8");
      const parsed = JSON.parse(text);
      return { ...parsed, redirects: parsed.redirects ?? [] };
    } catch {
    }
  }
  throw new Error(
    "Could not find dist/client/assets/config.json or dist/assets/config.json. Run `rasengan build` before `rasengan-sitemap`."
  );
}

// src/collect-routes.ts
var import_node_path3 = __toESM(require("path"), 1);
var import_node_url2 = require("url");
var import_rasengan = require("rasengan");
async function collectRoutePaths(cwd, build) {
  const serverPathDirectory = build.prerender ? "prerender" : build.buildOptions.serverPathDirectory;
  const appRouterPath = import_node_path3.default.posix.join(
    cwd,
    build.buildOptions.buildDirectory,
    serverPathDirectory,
    "app.router.js"
  );
  let AppRouter;
  try {
    const mod = await import((0, import_node_url2.pathToFileURL)(appRouterPath).href);
    AppRouter = await (mod.default ?? mod);
  } catch (err) {
    throw new Error(
      `Could not import the built router at ${appRouterPath}. Make sure \`rasengan build\` completed successfully.
${err.message}`
    );
  }
  const routeTree = (0, import_rasengan.generateRoutes)(AppRouter);
  const { paths, error } = await (0, import_rasengan.getAllRoutesPath)(routeTree);
  const filtered = paths.filter((p) => !p.includes("*"));
  return { paths: filtered, warnings: Array.from(error) };
}

// src/output-dir.ts
var import_node_path4 = __toESM(require("path"), 1);
function resolveOutputDirectory(cwd, build) {
  if (build.prerender) {
    return import_node_path4.default.posix.join(cwd, build.buildOptions.staticDirectory);
  }
  if (build.ssr) {
    return import_node_path4.default.posix.join(
      cwd,
      build.buildOptions.buildDirectory,
      build.buildOptions.clientPathDirectory
    );
  }
  return import_node_path4.default.posix.join(cwd, build.buildOptions.buildDirectory);
}

// src/generate-xml.ts
function matchGlob(pattern, value) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escaped.replace(/\*/g, ".*")}$`);
  return regex.test(value);
}
function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function renderUrl(entry, siteUrl) {
  const loc = new URL(entry.loc, siteUrl).toString();
  const lines = [`    <loc>${escapeXml(loc)}</loc>`];
  if (entry.changefreq) {
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  }
  if (entry.priority !== void 0) {
    lines.push(`    <priority>${entry.priority}</priority>`);
  }
  return `  <url>
${lines.join("\n")}
  </url>`;
}
async function buildSitemapXml(routePaths, redirectSources, config) {
  const exclude = config.exclude ?? [];
  const entries = [];
  for (const routePath of routePaths) {
    if (redirectSources.has(routePath)) continue;
    if (exclude.some((pattern) => matchGlob(pattern, routePath))) continue;
    const entry = config.transform ? await config.transform(routePath) : {
      loc: routePath,
      changefreq: config.changefreq,
      priority: config.priority
    };
    entries.push(entry);
  }
  const urls = entries.map((entry) => renderUrl(entry, config.siteUrl)).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// src/cli.ts
var LOG_PREFIX = "[rasengan-sitemap]";
function buildRobotsTxt(siteUrl) {
  const sitemapUrl = new URL("sitemap.xml", siteUrl).toString();
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
}
async function main() {
  const cwd = import_node_process.default.cwd();
  try {
    const config = await loadSitemapConfig(cwd);
    const build = await loadBuildConfig(cwd);
    if (!build.prerender && !build.ssr) {
      throw new Error(
        "rasengan-sitemap needs a server-rendered route bundle to enumerate routes, which pure SPA builds (ssr: false, prerender: false) do not produce. Temporarily set `ssr: true` in rasengan.config.js, run `rasengan build`, then `rasengan-sitemap` (the route tree is the same regardless of ssr/spa, only the rendering strategy differs)."
      );
    }
    const { paths, warnings } = await collectRoutePaths(cwd, build);
    for (const warning of warnings) {
      console.warn(`${LOG_PREFIX} warning: ${warning}`);
    }
    const redirectSources = new Set(
      build.redirects.map((redirect) => redirect.source)
    );
    const xml = await buildSitemapXml(paths, redirectSources, config);
    const outputDir = resolveOutputDirectory(cwd, build);
    await (0, import_promises2.mkdir)(outputDir, { recursive: true });
    const sitemapPath = import_node_path5.default.posix.join(outputDir, "sitemap.xml");
    await (0, import_promises2.writeFile)(sitemapPath, xml, "utf-8");
    console.log(`${LOG_PREFIX} Wrote ${paths.length} URLs to ${sitemapPath}`);
    if (config.generateRobotsTxt) {
      const robotsPath = import_node_path5.default.posix.join(outputDir, "robots.txt");
      await (0, import_promises2.writeFile)(robotsPath, buildRobotsTxt(config.siteUrl), "utf-8");
      console.log(`${LOG_PREFIX} Wrote ${robotsPath}`);
    }
  } catch (err) {
    console.error(`${LOG_PREFIX} ${err.message}`);
    import_node_process.default.exit(1);
  }
}
main();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
