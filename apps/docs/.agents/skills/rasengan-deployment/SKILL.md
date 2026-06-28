---
name: rasengan-deployment
description: Deployment patterns for Rasengan.js. Covers Vercel deployment with @rasenganjs/vercel adapter and self-hosting on Node.js with @rasenganjs/serve. Use when deploying a Rasengan.js application to production.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '1.0.0'
---

# Rasengan.js Deployment Patterns

## When to Activate

- Deploying a Rasengan.js app to Vercel
- Self-hosting a Rasengan.js app on a Node.js server
- Configuring deployment adapters (`@rasenganjs/vercel`, `@rasenganjs/serve`)
- Setting up build scripts and production server configuration

## Build for Production

```bash
rasengan build
```

Output is written to `dist/`:

```
dist/
  client/        # Client bundle + manifest.json
    assets/      # JS, CSS, config.json
    .vite/       # Vite manifest
  server/        # SSR server bundle
static/          # Pre-rendered HTML (SSG)
```

## Vercel

Install the adapter:

```bash
npm install @rasenganjs/vercel
```

Configure in `rasengan.config.js`:

```js
// rasengan.config.js
import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import { configure } from '@rasenganjs/vercel';

export default defineConfig({
  vite: {
    plugins: [
      rasengan({
        adapter: configure(),
      }),
    ],
  },
});
```

Or deploy directly from the Vercel dashboard:

- Set **Build Command**: `rasengan build`
- Set **Output Directory**: `dist`
- Set **Framework Preset**: `Other`

## Node.js (Self-hosted)

Install the server package:

```bash
npm install @rasenganjs/serve
```

Build and serve:

```bash
rasengan build
npx rasengan-serve ./dist
```

Add as a package script:

```json
{
  "scripts": {
    "build": "rasengan build",
    "serve": "rasengan-serve ./dist",
    "start": "npm run build && npm run serve"
  }
}
```

### PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start npm --name "my-app" -- start
```

## Rules

- Always run `rasengan build` before deploying — it generates the `dist/` output
- For Vercel: the `@rasenganjs/vercel` adapter must be configured as a Vite plugin in `rasengan.config.js`
- For Node: `@rasenganjs/serve` is a production server; use a process manager (PM2) for persistence
- Build output directory is `dist/` — point your deployment platform to this folder
- Both `@rasenganjs/vercel` and `@rasenganjs/serve` are runtime dependencies (not dev dependencies)
- All Rasengan.js projects require `"type": "module"` in `package.json`
