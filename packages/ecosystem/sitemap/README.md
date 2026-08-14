# Rasengan Sitemap

[![npm version](https://badge.fury.io/js/@rasenganjs%2Fsitemap.svg)](https://badge.fury.io/js/@rasenganjs%2Fsitemap)
![NPM Downloads](https://img.shields.io/npm/dm/%40rasenganjs%2Fsitemap)
[![GitHub license](https://img.shields.io/github/license/rasengan-dev/rasenganjs)](https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE)

Automatic `sitemap.xml` generation for [Rasengan.js](https://rasengan.dev) frontend apps, in `ssr` or `prerender` (SSG) mode.

`rasengan-sitemap` runs as a separate CLI step after `rasengan build`, not as a Vite plugin, so it always reads the final, complete build output.

## Installation

```bash
npm install -D @rasenganjs/sitemap
```

## Usage

Create a `rasengan-sitemap.config.js` at your project root:

```ts
import { defineSitemapConfig } from '@rasenganjs/sitemap';

export default defineSitemapConfig({
  siteUrl: 'https://your-site.com', // required
  changefreq: 'weekly', // optional
  priority: 0.7, // optional
  exclude: ['/admin/*'], // optional, glob against the route path
  generateRobotsTxt: false, // optional, off by default
});
```

Then run the CLI after your build:

```bash
rasengan build && rasengan-sitemap
```

Or wire it into `package.json`:

```json
{
  "scripts": {
    "build": "rasengan build && rasengan-sitemap"
  }
}
```

`rasengan-sitemap` writes `sitemap.xml` into the same directory the app actually produced: `static/` for `prerender: true`, `dist/client/` for `ssr: true`.

Pure SPA builds (`ssr: false, prerender: false`) aren't supported: no server-rendered route bundle is produced to enumerate routes from. Temporarily set `ssr: true`, run `rasengan build`, then `rasengan-sitemap`, the route tree is identical either way.

## What Gets Excluded Automatically

- The catch-all `*`/404 route.
- `_api/` routes (excluded by construction, never part of the page route tree).
- Any route matching a redirect `source` in `rasengan.config.js`'s `redirects()`.
- Anything matching your own `exclude` glob patterns.

## Full Documentation

See the [Rasengan Sitemap docs](https://rasengan.dev/packages/sitemap) for the full API, including `transform` for per-route overrides.

## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))
