import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { loadSitemapConfig } from './config-loader.js';
import { loadBuildConfig } from './build-config.js';
import { collectRoutePaths } from './collect-routes.js';
import { resolveOutputDirectory } from './output-dir.js';
import { buildSitemapXml } from './generate-xml.js';

const LOG_PREFIX = '[rasengan-sitemap]';

function buildRobotsTxt(siteUrl: string): string {
  const sitemapUrl = new URL('sitemap.xml', siteUrl).toString();
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
}

export async function main(): Promise<void> {
  const cwd = process.cwd();

  try {
    const config = await loadSitemapConfig(cwd);
    const build = await loadBuildConfig(cwd);

    if (!build.prerender && !build.ssr) {
      throw new Error(
        'rasengan-sitemap needs a server-rendered route bundle to enumerate ' +
          'routes, which pure SPA builds (ssr: false, prerender: false) do not ' +
          'produce. Temporarily set `ssr: true` in rasengan.config.js, run ' +
          '`rasengan build`, then `rasengan-sitemap` (the route tree is the ' +
          'same regardless of ssr/spa, only the rendering strategy differs).'
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
    await mkdir(outputDir, { recursive: true });

    const sitemapPath = path.posix.join(outputDir, 'sitemap.xml');
    await writeFile(sitemapPath, xml, 'utf-8');

    console.log(`${LOG_PREFIX} Wrote ${paths.length} URLs to ${sitemapPath}`);

    if (config.generateRobotsTxt) {
      const robotsPath = path.posix.join(outputDir, 'robots.txt');
      await writeFile(robotsPath, buildRobotsTxt(config.siteUrl), 'utf-8');
      console.log(`${LOG_PREFIX} Wrote ${robotsPath}`);
    }
  } catch (err) {
    console.error(`${LOG_PREFIX} ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
