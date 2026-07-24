## Unreleased

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
