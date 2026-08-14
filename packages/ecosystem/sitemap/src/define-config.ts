import type { SitemapConfig } from './types.js';

/**
 * Typed pass-through helper for `rasengan-sitemap.config.js`. Returns the
 * same object you pass in, with type-checking, same shape as `rasengan`'s
 * own `defineConfig()`.
 */
export function defineSitemapConfig(config: SitemapConfig): SitemapConfig {
  return config;
}
