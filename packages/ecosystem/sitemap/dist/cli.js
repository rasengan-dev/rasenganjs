// src/cli.ts
import { mkdir, writeFile } from "fs/promises";
import path5 from "path";
import process from "process";

// src/config-loader.ts
import path from "path";
import { pathToFileURL } from "url";
async function loadSitemapConfig(cwd) {
  const configPath = path.posix.join(cwd, "rasengan-sitemap.config.js");
  let mod;
  try {
    mod = await import(pathToFileURL(configPath).href);
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
import { access, readFile } from "fs/promises";
import path2 from "path";
async function loadBuildConfig(cwd) {
  const candidates = [
    path2.posix.join(cwd, "dist", "client", "assets", "config.json"),
    path2.posix.join(cwd, "dist", "assets", "config.json")
  ];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      const text = await readFile(candidate, "utf-8");
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
import path3 from "path";
import { pathToFileURL as pathToFileURL2 } from "url";
import { generateRoutes, getAllRoutesPath } from "rasengan";
async function collectRoutePaths(cwd, build) {
  const serverPathDirectory = build.prerender ? "prerender" : build.buildOptions.serverPathDirectory;
  const appRouterPath = path3.posix.join(
    cwd,
    build.buildOptions.buildDirectory,
    serverPathDirectory,
    "app.router.js"
  );
  let AppRouter;
  try {
    const mod = await import(pathToFileURL2(appRouterPath).href);
    AppRouter = await (mod.default ?? mod);
  } catch (err) {
    throw new Error(
      `Could not import the built router at ${appRouterPath}. Make sure \`rasengan build\` completed successfully.
${err.message}`
    );
  }
  const routeTree = generateRoutes(AppRouter);
  const { paths, error } = await getAllRoutesPath(routeTree);
  const filtered = paths.filter((p) => !p.includes("*"));
  return { paths: filtered, warnings: Array.from(error) };
}

// src/output-dir.ts
import path4 from "path";
function resolveOutputDirectory(cwd, build) {
  if (build.prerender) {
    return path4.posix.join(cwd, build.buildOptions.staticDirectory);
  }
  if (build.ssr) {
    return path4.posix.join(
      cwd,
      build.buildOptions.buildDirectory,
      build.buildOptions.clientPathDirectory
    );
  }
  return path4.posix.join(cwd, build.buildOptions.buildDirectory);
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
  const cwd = process.cwd();
  try {
    const config = await loadSitemapConfig(cwd);
    const build = await loadBuildConfig(cwd);
    if (!build.prerender) {
      throw new Error(
        "rasengan-sitemap currently only supports SSG (prerender: true) apps. SSR/SPA support is planned for a future release."
      );
    }
    const { paths, warnings } = await collectRoutePaths(cwd, build);
    for (const warning of warnings) {
      console.warn(`${LOG_PREFIX} warning: ${warning}`);
    }
    const redirectSources = new Set(build.redirects.map((redirect) => redirect.source));
    const xml = await buildSitemapXml(paths, redirectSources, config);
    const outputDir = resolveOutputDirectory(cwd, build);
    await mkdir(outputDir, { recursive: true });
    const sitemapPath = path5.posix.join(outputDir, "sitemap.xml");
    await writeFile(sitemapPath, xml, "utf-8");
    console.log(`${LOG_PREFIX} Wrote ${paths.length} URLs to ${sitemapPath}`);
    if (config.generateRobotsTxt) {
      const robotsPath = path5.posix.join(outputDir, "robots.txt");
      await writeFile(robotsPath, buildRobotsTxt(config.siteUrl), "utf-8");
      console.log(`${LOG_PREFIX} Wrote ${robotsPath}`);
    }
  } catch (err) {
    console.error(`${LOG_PREFIX} ${err.message}`);
    process.exit(1);
  }
}
main();
export {
  main
};
