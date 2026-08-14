# @rasenganjs/cloudflare

## Unreleased

## 1.0.0-beta.1 (2026-08-14)

- Initial release: Cloudflare Workers deploy adapter (RFC-0009). Bundles SSR builds (including `_api/` routes, RFC-0008) into a single Worker script via esbuild, serves static output through Workers Assets, and generates `wrangler.toml`. SPA/SSG builds get no Worker at all — pure static hosting.
