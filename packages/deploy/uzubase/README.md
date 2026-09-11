# @rasenganjs/uzubase

Deploy adapter for hosting a Rasengan.js app on [Uzubase](https://uzubase.dev), a Cloudflare-native BaaS. Bundles SSR builds into a single Worker script and serves static output through Cloudflare's **Workers Assets** feature — same mechanism [`@rasenganjs/cloudflare`](https://www.npmjs.com/package/@rasenganjs/cloudflare) uses, minus `wrangler.toml`: Uzubase's own build runner and deploy API take it from here, there is nothing to run locally beyond `npm run build`.

See [RFC-0009](https://github.com/rasengan-dev/rasenganjs/blob/main/proposals/RFC-0009-Cloudflare-Workers-Adapter.md) for the bundling design this shares with `@rasenganjs/cloudflare` (the dynamic-`import()`-on-workerd problem, pre-loaded `modules`, static-asset separation).

## Installation

```bash
npm install -D @rasenganjs/uzubase
```

## Usage

```js
// rasengan.config.js
import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import { configure } from '@rasenganjs/uzubase';

export default defineConfig({
  ssr: true, // or prerender: true — SPA-only (ssr: false, prerender: false) has no server bundle to build
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

Set the workload's framework to `rasengan` when you create it on Uzubase (dashboard "Add workload", or `config.framework` via the API) — that's what selects this adapter's output contract on the Uzubase side (`@uzubase/build`'s `rasengan` adapter).

```bash
npm run build
uzubase deploy
```

or upload the project from the dashboard, or connect a Git repository — any of Uzubase's deploy paths run `npm run build` first, which is the only step this adapter needs.

## What it generates

- **SSR builds** (`ssr: true`, `prerender: false`): `.uzubase/worker.js` (a single bundled Worker script, no runtime filesystem or dynamic `import()` involved) plus `.uzubase/assets/` (the client build) and `.uzubase/meta.json` (`{ hasWorker: true, spaFallback: false }` — unmatched paths reach the Worker for server rendering, the same asset-first routing `@rasenganjs/cloudflare` relies on).
- **SSG/SPA builds** (`prerender: true`, or `ssr: false`): `.uzubase/assets/` and `.uzubase/meta.json` (`{ hasWorker: false, spaFallback: true }`) only — no Worker script, pure static hosting.

## How it's wired

`configure()` returns the same `{ name, prepare }` shape `@rasenganjs/vercel`/`@rasenganjs/netlify`/`@rasenganjs/cloudflare` do. `rasengan build` runs `prepare()` for you automatically once the adapter is configured — `npm run build` is the only local step; Uzubase's build runner (or its build-runner container, when the source is a Git repository or an uploaded tarball) does the same thing on its end before packaging `.uzubase/` into a deployment.

## Not supported yet

Pure SPA builds (`ssr: false`, `prerender: false`) have no server-rendered route bundle to build a Worker from — set `ssr: true` (or `prerender: true` for a fully static build) if you need this today; the route tree is identical either way, only the rendering strategy differs. This mirrors `@rasenganjs/cloudflare`'s own limitation, since both share the same underlying build.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE).

## Authors

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))
