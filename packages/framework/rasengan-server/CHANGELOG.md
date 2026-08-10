## Unreleased

## 1.0.0-beta.4 (2026-08-10)

### Features

- implement RFC-0010 automatic server-side env var loading 946b3c3

### Bug Fixes

- **`.env*` files were effectively never usable via the standard `process.env.X` idiom, and `rasengan-server.js`/`.ts` itself couldn't read them at all** (RFC-0010) — env loading previously only fed `Futon`'s own `app.env` bag, never `process.env`, and ran too late anyway (inside `dev()`/`start()`/`build()`, after `rasengan.server.js`/`.ts` had already been imported by `loadConfig()`). Loading now happens at the very top of `cli.ts`'s `main()`, before the config file is even imported, so both the config file and the spawned app see `process.env` correctly. Depends on `@rasenganjs/runtime`'s updated `loadNodeEnvFiles`/`loadBunEnvFiles`

### Features

- the startup banner (`dev`/`start`) now shows an `Env:` line listing which `.env*` files were actually loaded, right below `Runtime:` — checked against the real runtime in use, not the configured `preset`, so a project targeting `workerd` for production still shows it correctly during local `dev`/`start` (which always run on real Node/Bun)
- `dev()`/`start()` resolve `config.port ?? process.env.PORT ?? 3000` (and the `HOST` equivalent) — a `PORT`/`HOST` env var can now configure the server, matching the convention most Node hosting platforms expect. `DEFAULT_CONFIG` no longer hardcodes `port`/`host` so this fallback actually has a chance to apply

### Chores

- `DEFAULT_CONFIG`'s default build `formats` is now `['directory']` instead of `['single-file', 'directory']`, and `preset` now defaults explicitly to `'node'`

## 1.0.0-beta.3 (2026-07-24)

## 1.0.0-beta.2 (2026-07-24)

## 1.0.0-beta.1 (2026-07-24)

### ⚠ BREAKING CHANGES

- **server:** cross-module injection without imports/exports now
  fails at boot. Add the owning module to `imports` and the provider
  to its `exports`, or mark cross-cutting modules `global: true`.
  Same-named providers in sibling modules no longer collide.

### Features

- add app-level lifecycle to Futon, propagate through adapters 1a1844e
- enhance the print build summary display 16eb79f
- **rasengan-server:** enhance build, dev, start logs with proper summaries 6d155db
- **runtime:** add Node WebSocket upgrade handling (RFC-0001) 7d4906b
- **server:** add ConfigHolder, DI lifecycle hooks, graceful shutdown b2945dd
- **server:** add core WebSocket abstraction (RFC-0001) 9ef664c
- **server:** add ModulePlugin extension system for defineModule() be3779e
- **server:** add start command and runtime-specific entry generation ff8055e
- **server:** module-scoped DI with eager resolution (RFC-0003) 8e09c89
- **server:** re-export diskStorage via ./upload/disk subpath 86cd6e9
- **ws:** turn Gateway into a Provider 190a9d0

### Bug Fixes

- **rasengan-server:** skip setupKeypress's raw-mode takeover when running under dev.ts 9f63aed
- **server:** preserve DI param names through minification, dedupe ws peer 13b1c17
- vulnerabilities fixed d939ce4

## 1.0.0-beta.0 (2026-06-25)
