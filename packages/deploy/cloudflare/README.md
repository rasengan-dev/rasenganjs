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

## First time deploying to Cloudflare?

If you've never used Cloudflare Workers before, here's the full path from zero to a live deploy.

### 1. Create a free Cloudflare account

Sign up at [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) if you don't already have an account. The free plan is enough to deploy and try this out.

### 2. Install Wrangler

Wrangler is Cloudflare's CLI — the thing that actually uploads your Worker and talks to Cloudflare's API. It's not a dependency of `@rasenganjs/cloudflare` itself (this package only _generates_ what Wrangler needs), so add it to your app:

```bash
npm install -D wrangler
```

### 3. Log in

```bash
npx wrangler login
```

This opens a browser tab to authorize Wrangler against your Cloudflare account. One-time step, `wrangler` remembers you after this.

### 4. Configure the adapter and build

```js
// rasengan.config.js
import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import { configure } from '@rasenganjs/cloudflare';

export default defineConfig({
  ssr: true,
  runtime: 'workerd',
  vite: {
    plugins: [rasengan({ adapter: configure({}) })],
  },
});
```

```bash
npm run build
```

This produces `wrangler.toml`, `.cloudflare/worker.js`, and `.cloudflare/assets/` at your project root — see § What it generates below.

### 5. Try it locally (optional, but recommended before your first real deploy)

```bash
npx wrangler dev
```

Runs the exact generated Worker + assets locally, on Cloudflare's own local runtime (Miniflare) — the closest thing to production you can test without actually deploying.

### 6. Deploy

```bash
npx wrangler deploy
```

Wrangler prints a `*.workers.dev` URL once it finishes — that's your app, live on Cloudflare's edge network.

### 7. Re-deploying later

Every time you change your app: `npm run build`, then `npx wrangler deploy` again. `@rasenganjs/cloudflare`'s `prepare()` step (which `npm run build` already triggers, see § How it's wired) regenerates everything from scratch each time, so there's nothing stale to worry about between deploys.

## What it generates

- **SSR builds** (`ssr: true`, `prerender: false`): `.cloudflare/worker.js` (a single bundled Worker script, no runtime filesystem or dynamic `import()` involved) plus `.cloudflare/assets/` (the client build).
- **SSG/SPA builds**: `.cloudflare/assets/` only — no Worker script. Cloudflare serves 100% static through the `[assets]` binding.
- `wrangler.toml` at the project root, `main`/`compatibility_flags` present only for SSR builds.

## How it's wired

`configure()` returns the same `{ name, prepare }` shape `@rasenganjs/vercel`/`@rasenganjs/netlify` do. `rasengan build` runs `prepare()` for you automatically once the adapter is configured — there's no separate CLI command to remember, `npm run build` is the only step before `wrangler deploy`.

## Not supported yet

Pure SPA builds (`ssr: false`, `prerender: false`) have no server-rendered route bundle to build a Worker from. Set `ssr: true` temporarily if you need a Cloudflare deploy today — the route tree is identical either way, only the rendering strategy differs.

## Example

[`apps/playground/rasengan-cloudflare-demo`](https://github.com/rasengan-dev/rasenganjs/tree/main/apps/playground/rasengan-cloudflare-demo) in this monorepo is a minimal, working example.

## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))
