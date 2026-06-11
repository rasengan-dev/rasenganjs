## Unreleased

## 1.0.0-beta.15 (2026-06-11)

### Bug Fixes

- return an instance of Response via the netlify handler a21b7bb

## 1.0.0-beta.14 (2026-06-11)

### Bug Fixes

- remove \_\_dirname identifier d592cd8

## 1.0.0-beta.13 (2026-06-11)

- fix: rewrite SSR handler with Express mock bridge for Netlify Functions compatibility
- fix: enable static file copying for prerender/ssr/spa modes
- fix: correct build script (`&` → `&&`)
- fix: update config.json paths to match adapter output structure

## 1.0.0-beta.12 (2025-04-26)

- feat: initial Netlify adapter implementation
