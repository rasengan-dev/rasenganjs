## Unreleased

- fix: rewrite SSR handler with Express mock bridge for Netlify Functions v2
- fix: add `send()` and `json()` methods to mock Express `res`
- fix: switch output directory from `.netlify/v1/functions` to `netlify/functions`
- fix: correct build script (`&` → `&&`)
- chore: migrate build from `tsc` to `tsup`
- docs: rewrite CHANGELOG

## 1.0.0-beta.12 (2025-04-26)

- feat: initial Netlify adapter implementation
