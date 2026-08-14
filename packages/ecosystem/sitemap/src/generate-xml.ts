import type { SitemapConfig, SitemapEntry } from './types.js';

/** Minimal glob support (`*` only) for `exclude` patterns, no dependency. */
function matchGlob(pattern: string, value: string): boolean {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^${escaped.replace(/\*/g, '.*')}$`);
  return regex.test(value);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderUrl(entry: SitemapEntry, siteUrl: string): string {
  const loc = new URL(entry.loc, siteUrl).toString();
  const lines = [`    <loc>${escapeXml(loc)}</loc>`];

  if (entry.changefreq) {
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  }
  if (entry.priority !== undefined) {
    lines.push(`    <priority>${entry.priority}</priority>`);
  }

  return `  <url>\n${lines.join('\n')}\n  </url>`;
}

/**
 * Build the sitemap.xml body: filters out redirect sources and
 * `exclude`-matched routes, applies `transform` (or the static
 * `changefreq`/`priority` defaults) to everything else.
 */
export async function buildSitemapXml(
  routePaths: string[],
  redirectSources: Set<string>,
  config: SitemapConfig
): Promise<string> {
  const exclude = config.exclude ?? [];

  const entries: SitemapEntry[] = [];
  for (const routePath of routePaths) {
    if (redirectSources.has(routePath)) continue;
    if (exclude.some((pattern) => matchGlob(pattern, routePath))) continue;

    const entry = config.transform
      ? await config.transform(routePath)
      : {
          loc: routePath,
          changefreq: config.changefreq,
          priority: config.priority,
        };

    entries.push(entry);
  }

  const urls = entries
    .map((entry) => renderUrl(entry, config.siteUrl))
    .join('\n');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urls}\n` +
    '</urlset>\n'
  );
}
