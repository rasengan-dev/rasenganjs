export type ChangeFrequency =
  'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SitemapEntry {
  /** Route path (e.g. `/blog/hello`) or a full absolute URL. */
  loc: string;
  changefreq?: ChangeFrequency;
  /** 0.0 to 1.0. */
  priority?: number;
}

export interface SitemapConfig {
  /**
   * Absolute base URL of the deployed site, e.g. `https://rasengan.dev`.
   * Required: nothing in the framework itself has a concept of a
   * site-wide base URL to fall back on.
   */
  siteUrl: string;
  /** Glob patterns matched against each route path, e.g. `/admin/*`. */
  exclude?: string[];
  /** Static default applied to every route unless `transform` overrides it. */
  changefreq?: ChangeFrequency;
  /** Static default applied to every route unless `transform` overrides it. */
  priority?: number;
  /** Per-route override, called once per route path that survives `exclude`. */
  transform?: (path: string) => SitemapEntry | Promise<SitemapEntry>;
  /**
   * Append a `Sitemap:` line to an existing `robots.txt`, or write a
   * minimal one if none exists. Off by default so an existing
   * hand-written robots.txt is never silently touched.
   */
  generateRobotsTxt?: boolean;
}
