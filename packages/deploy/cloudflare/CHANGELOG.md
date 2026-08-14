# @rasenganjs/cloudflare

## Unreleased

- Initial release: Cloudflare Workers deploy adapter (RFC-0009). Bundles SSR builds into a single Worker script via esbuild, serves static output through Workers Assets, and generates `wrangler.toml`. SPA/SSG builds get no Worker at all — pure static hosting.
