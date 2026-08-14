# @rasenganjs/cloudflare

[![npm version](https://badge.fury.io/js/@rasenganjs%2Fcloudflare.svg)](https://badge.fury.io/js/@rasenganjs%2Fcloudflare)
![NPM Downloads](https://img.shields.io/npm/dm/%40rasenganjs%2Fcloudflare)
[![GitHub license](https://img.shields.io/github/license/rasengan-dev/rasenganjs)](https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE)

Cloudflare Workers deploy adapter for [Rasengan.js](https://rasengan.dev). Bundles SSR builds into a single Worker script, serves static output through Cloudflare's modern **Workers Assets** feature, and generates a ready-to-deploy `wrangler.toml`.

See [RFC-0009](https://github.com/rasengan-dev/rasenganjs/blob/main/proposals/RFC-0009-Cloudflare-Workers-Adapter.md) for the full design.

## Installation

```bash
npm install -D @rasenganjs/cloudflare
```

## Usage

```js
// rasengan.config.js
import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import { configure } from '@rasenganjs/cloudflare';

export default defineConfig({
  ssr: true, // or prerender: true — SPA-only (ssr: false, prerender: false) is not supported
  runtime: 'workerd',
  vite: {
    plugins: [
      rasengan({
        adapter: configure({}),
      }),
    ],
  },
});
```

```bash
npm run build
wrangler deploy
```

## What it generates

- **SSR builds** (`ssr: true`, `prerender: false`): `.cloudflare/worker.js` (a single bundled Worker script, no runtime filesystem or dynamic `import()` involved) plus `.cloudflare/assets/` (the client build).
- **SSG/SPA builds**: `.cloudflare/assets/` only — no Worker script. Cloudflare serves 100% static through the `[assets]` binding.
- `wrangler.toml` at the project root, `main`/`compatibility_flags` present only for SSR builds.

## Not supported yet

Pure SPA builds (`ssr: false`, `prerender: false`) have no server-rendered route bundle to build a Worker from. Set `ssr: true` temporarily if you need a Cloudflare deploy today — the route tree is identical either way, only the rendering strategy differs.

## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))
