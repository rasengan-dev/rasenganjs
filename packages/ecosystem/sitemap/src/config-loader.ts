import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { SitemapConfig } from './types.js';

/**
 * Load `rasengan-sitemap.config.js` from the project root. Plain JS only
 * for v1, matching `rasengan.config.js`'s own convention (no TS
 * transpilation step in this CLI).
 */
export async function loadSitemapConfig(cwd: string): Promise<SitemapConfig> {
  const configPath = path.posix.join(cwd, 'rasengan-sitemap.config.js');

  let mod: { default?: SitemapConfig } & Partial<SitemapConfig>;
  try {
    mod = await import(pathToFileURL(configPath).href);
  } catch (err) {
    throw new Error(
      `Could not load rasengan-sitemap.config.js at ${configPath}. ` +
        `Create one exporting defineSitemapConfig({ siteUrl: '...' }).\n` +
        `${(err as Error).message}`
    );
  }

  const config = (mod.default ?? (mod as SitemapConfig)) as SitemapConfig;

  if (!config?.siteUrl) {
    throw new Error(
      '`siteUrl` is required in rasengan-sitemap.config.js, e.g. ' +
        "defineSitemapConfig({ siteUrl: 'https://example.com' })."
    );
  }

  return config;
}
