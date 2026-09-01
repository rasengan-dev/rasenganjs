## Unreleased

### Bug Fixes

- **CORS preflight requests could get blocked by an unrelated global middleware.** `compile()` always appended `cors` after every `.use()` middleware had drained from `middlewareList`, regardless of the order `enableCors()`/`.use()` were actually called in `bootstrap()`. A preflight `OPTIONS` request never carries credentials, so any auth-style global middleware saw it as unauthenticated and short-circuited (e.g. with a 401) before `cors` ever got to answer the preflight with its own 204 and headers, and the browser then blocked the real request too, even though `enableCors()` was configured correctly. `cors` is now registered first, unconditionally, ahead of the rest of `middlewareList`, so it always gets first refusal on `OPTIONS` d792afa
- **A `ModulePlugin` calling `app.use()` from `register()` had its middleware silently discarded.** `compile()` drains its `middlewareList` buffer into the real `Futon` instance once, early on, before `dispatchPlugins()` runs. `ServerApp.use()` now attaches directly to the live `Futon` instance once it exists, covering both the `dispatchPlugins()` case and any `app.use()` call made after `compile()` has already returned; `Futon.use()` invalidates its cached middleware chain on every call, so a late attach is still picked up on the next request. Found while designing RFC-0014 (`@rasenganjs/drizzle`), whose D1-via-`forRoot()` path needs a `ModulePlugin` to add per-request middleware d03f4a7
- `rasengan-server build --preset workerd`'s generated entry file imported the app's `configureApp` export incorrectly (`module.default.configureApp` instead of the default export itself) and never forwarded `env`/`ctx` to `adapter.fetchHandler`, so Workers bindings and `ExecutionContext` never reached the app on Workerd deploys 76206a6
- **`{ provide, useValue }` providers never received `onInit()`/`onDestroy()` lifecycle callbacks, even when the value was a `Provider` subclass instance** (RFC-0012) — `Container.instantiate()`'s `useValue` branch returned before ever reaching the `instanceof Provider` → `lifecycleInstances.push()` check, silently skipping the eager-resolution guarantee RFC-0003 already promised for every declared provider. A pre-built resource (e.g. a database connection pool) registered via `useValue` would leak on every graceful shutdown with no error or warning. Fixed by caching the resolved value into the same `entry.instance` slot the `useClass` path already uses, so the lifecycle push happens exactly once, keeping `useValue` and `useClass` providers consistent 352c49a

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
