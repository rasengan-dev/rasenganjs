# rasengan-cloudflare-demo

A minimal Rasengan.js app (SSR, two pages) permanently configured with `@rasenganjs/cloudflare`, demonstrating RFC-0009's Cloudflare Workers adapter.

```bash
pnpm install
pnpm run dev     # local development, plain Node — same as any other Rasengan app
pnpm run build   # rasengan build, then @rasenganjs/cloudflare's prepare() step
```

After `pnpm run build`, this directory contains:

- `.cloudflare/worker.js` — the single bundled Worker script
- `.cloudflare/assets/` — the static client build, served via Workers Assets
- `wrangler.toml` — generated, ready for `wrangler deploy`

For the full `wrangler login` / `wrangler deploy` walkthrough (including for someone who's never used Cloudflare before), see [`@rasenganjs/cloudflare`'s README](../../../packages/deploy/cloudflare/README.md).
