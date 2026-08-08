---
name: run-futon
description: Build, run, and smoke-test @rasenganjs/futon (with @rasenganjs/runtime). Use when asked to run, start, build, or test futon; curl its demo HTTP server; smoke test the futon + runtime pairing; or verify Futon.fetch() works in-process without a real server.
---

`@rasenganjs/futon` is a zero-dependency, WinterCG-compatible HTTP middleware/router library built on Web API primitives (`Request`/`Response`/`Headers`). It has no way to bind a TCP port on its own — that's `@rasenganjs/runtime`'s job (`RuntimeAdapter`s like `NodeDevAdapter`). This skill covers both: driving the real demo server (`apps/playground/rasengan-runtime-node-demo`, futon + runtime's `NodeDevAdapter`) via `driver.sh`, and exercising futon in-process via `direct-invoke.mjs` — the path most futon-only changes actually need, since futon is a library first and an HTTP-bound server second.

All paths below are relative to `packages/framework/futon/` (the unit root). The driver's own path from there is `.claude/skills/run-futon/driver.sh`; the in-process script is `.claude/skills/run-futon/direct-invoke.mjs`.

## Prerequisites

Repo already cloned and `pnpm install` already run at the workspace root (this repo's `node_modules/@rasenganjs/futon` and the demo app's `node_modules/@rasenganjs/{futon,runtime}` are workspace symlinks — nothing extra to install for this skill). Node >=22.12 (verified with v22.22.0), pnpm 10.9.0.

```bash
node -v   # v22.22.0 (or newer per package.json engines)
pnpm -v   # 10.9.0
```

## Build

Both `@rasenganjs/futon` and `@rasenganjs/runtime` ship from `dist/`, and the demo app (and this skill's `direct-invoke.mjs`) run against built output — rebuild both before treating a run as proof of anything, since a stale `dist/` silently runs old code:

```bash
cd <repo-root>
pnpm --filter @rasenganjs/futon build
pnpm --filter @rasenganjs/runtime build
```

Expect `tsup` output ending in `DTS ⚡️ Build success` for each package (ESM + CJS + `.d.ts`).

## Run (agent path)

Two independent checks. Run both — they cover different layers.

### 1. HTTP demo (futon + runtime, real server, real port)

```bash
bash .claude/skills/run-futon/driver.sh
```

What it does: finds the repo root via `git rev-parse --show-toplevel`, kills anything already bound to port 5330, starts `apps/playground/rasengan-runtime-node-demo` (`pnpm start`, which runs `NodeDevAdapter.serve(app)` from `server/index.mjs`) in the background, polls `http://localhost:5330/` until it responds, then curls and checks:

| request                  | expects                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `GET /`                  | 200, HTML body                                                 |
| `GET /hello/World`       | 200, `{"message":"Hello, World!"}`                             |
| `POST /echo` (JSON body) | 200, body has an `echo` key (see Gotchas — it's always `null`) |
| `GET /does-not-exist`    | 404 via the custom `notFound` handler                          |

Prints `PASS`/`FAIL` per check, a final `N passed, M failed` line, and exits non-zero if anything failed. Server log is written to `/tmp/futon-runtime-node-demo.log`. The server is killed on exit (success, failure, or Ctrl-C) via a `trap` that also frees port 5330 directly — `pnpm start`'s `$!` is the pnpm wrapper, which doesn't forward `SIGTERM` to the `node` child it spawns.

Real output from this session:

```
== futon + runtime demo driver ==
demo: /home/dilane3/Documents/Projects/React-Framework/rasenganjs/apps/playground/rasengan-runtime-node-demo
log:  /tmp/futon-runtime-node-demo.log

-- starting server (pnpm start) in background --
-- waiting for http://localhost:5330/ to respond --
server is up (pid 48626)

-- checks --
  PASS  GET / returns 200 with HTML body
  PASS  GET /hello/World returns 200 with interpolated name
  PASS  POST /echo returns 200 with an echo key
  PASS  GET /does-not-exist returns 404 via custom notFound handler

4 passed, 0 failed
```

This demo app's `app.mjs` has no route that throws, so it can't exercise `onError` — that's covered by the in-process script below instead.

### 2. Direct invocation (in-process, no port, no runtime adapter)

```bash
node .claude/skills/run-futon/direct-invoke.mjs
```

What it does: imports `Futon`/`json`/`text` straight from `dist/index.js` (relative import via `import.meta.url`, not the bare `@rasenganjs/futon` specifier — works regardless of where/how it's invoked, no dependency on pnpm hoisting), builds a throwaway `Futon` app with a param route, a route that throws, and a custom `notFound`, and calls `app.fetch(new Request(...))` directly — exactly the pattern `src/__tests__/integration/application.test.ts` uses. Checks the param route, the `onError` handler catching the thrown error, and the custom 404.

Real output from this session:

```
== futon direct-invocation smoke test (in-process, no server) ==

  PASS  GET /hello/:name returns 200 with interpolated param
  PASS  GET /boom is caught by onError and returns 500 with message
  PASS  GET /does-not-exist hits custom notFound handler

3 passed, 0 failed
```

## Run (human path)

```bash
cd ../../../apps/playground/rasengan-runtime-node-demo   # from packages/framework/futon/
pnpm start
# → http://localhost:5330  (Ctrl-C to stop)
curl http://localhost:5330/hello/World
```

## Test

```bash
pnpm test              # vitest run — futon's own suite
```

Real result from this session: `Test Files 27 passed (27)` / `Tests 334 passed (334)`.

```bash
cd ../../platform/runtime && pnpm test   # runtime's own suite, if touching the adapter layer
```

Real result from this session: `Test Files 14 passed | 3 skipped (17)` / `Tests 98 passed | 36 skipped (134)`.

---

## Gotchas

- **`POST /echo` in the demo always returns `{"echo":null}`.** `apps/playground/rasengan-runtime-node-demo/server/app.mjs` reads the parsed body via `ctx.get('parsedBody')`, but `bodyParser()`'s default storage key is `'body'` (see `src/middlewares/body.ts`: `const key = options.key ?? 'body'`). This is a pre-existing bug in the demo app, not in futon — `driver.sh` only asserts the response has an `echo` key, not its value. Don't "fix" this by editing futon; the fix (if ever wanted) is either `bodyParser({ key: 'parsedBody' })` or `ctx.get('body')` in `app.mjs`.
- **Stale `dist/` silently runs old code.** The demo app and `direct-invoke.mjs` both import from `dist/`, not `src/`. If you edit `src/` and forget to rebuild, both will keep passing against the previous behavior — always rebuild (see Build section) before trusting a run.
- **`pnpm start`'s backgrounded PID is the wrapper, not the server.** Killing `$!` alone can leave the Node process (and port 5330) bound. `driver.sh` handles this by also killing whatever's listening on the port; do the same if driving the demo manually in the background.

## Troubleshooting

- **`driver.sh` hangs in "waiting for ... to respond" then dumps a log and exits 1**: port 5330 was already bound by a leftover process from a previous unclean run. The script already tries `lsof -ti:5330 -sTCP:LISTEN | xargs -r kill` before starting, but if that's insufficient, run it manually then retry: `lsof -ti:5330 -sTCP:LISTEN | xargs -r kill`.
- **`direct-invoke.mjs` throws `ERR_MODULE_NOT_FOUND` for `dist/index.js`**: `@rasenganjs/futon` hasn't been built yet (or was cleaned). Run the Build step above.
