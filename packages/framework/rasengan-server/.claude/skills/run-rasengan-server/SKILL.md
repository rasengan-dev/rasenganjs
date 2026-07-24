---
name: run-rasengan-server
description: Build, run, and drive @rasenganjs/server and its ecosystem sub-packages (@rasenganjs/ws, @rasenganjs/queue, @rasenganjs/validators). Use when asked to start the server, run/curl its HTTP routes, validate request bodies, open a WebSocket / Gateway connection, trigger or watch a background queue job, or otherwise confirm a change to server/ws/queue/validators actually works end to end.
---

Drives `apps/playground/rasengan-server-demo`, a real controller-based app that exercises all four packages at once (DI-based controllers, Zod validation, a raw `app.websocket()` echo route plus a `@rasenganjs/ws` Gateway with rooms, and a `@rasenganjs/queue` job both route-triggered and self-repeating). Launch it and drive it via `.claude/skills/run-rasengan-server/driver.sh`.

**Cross-directory note:** this skill lives under `packages/framework/rasengan-server/` (the unit for `@rasenganjs/server`), and all paths below are relative to that directory _except_ where explicitly marked as relative to the demo app. The demo app it drives — and the only place the four packages are wired together — is `apps/playground/rasengan-server-demo/` (`../../../apps/playground/rasengan-server-demo` from here, or `$(git rev-parse --show-toplevel)/apps/playground/rasengan-server-demo`). The driver script resolves this itself; you generally don't need to.

## Prerequisites

Node >=22.12 and pnpm 10.9.0 (already satisfied in this environment — verify with `node -v && pnpm -v`). No system packages needed. **Redis is NOT required** — `@rasenganjs/queue`'s `createQueuePlugin()` defaults to an in-memory adapter when no `adapter` option is passed, which is what the demo app uses.

## Build

Six packages feed the demo app; rebuild them after any source change before trusting a run reflects current code:

```bash
cd <repo-root>
pnpm --filter "@rasenganjs/runtime" --filter "@rasenganjs/futon" \
     --filter "@rasenganjs/server" --filter "@rasenganjs/ws" \
     --filter "@rasenganjs/queue" --filter "@rasenganjs/validators" run build
```

If the demo app's `node_modules/@rasenganjs/queue` doesn't exist yet (first time only — it's a workspace dependency added for this skill), link it:

```bash
cd <repo-root>
pnpm install --filter "rasengan-server-demo..."
```

The driver script below does both of these automatically ("if needed").

## Run (agent path)

```bash
./.claude/skills/run-rasengan-server/driver.sh          # skip build if dist/ already present
./.claude/skills/run-rasengan-server/driver.sh --build  # force-rebuild all 6 packages first
```

What it does: rebuilds (if needed) → links the demo's `node_modules` (if needed) → kills anything already on port 3006 → launches `pnpm dev` in the demo app in the background (`setsid`, logged to `/tmp/rasengan-server-demo.log`) → polls `GET /ping` for readiness → runs all four capability checks below with PASS/FAIL output → prints a summary → kills the server and any orphaned watch process on exit (via `trap ... EXIT`), whether it passed or failed. Exit code is 0 iff every check passed.

Real output from the last run (11/11 passing):

```
== Capability: HTTP & DI ==
  PASS - GET /ping -> {"ok":true}
  PASS - GET /users -> [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
  PASS - POST /users -> {"id":3,"name":"driver-user"}
  PASS - GET /users/1 -> {"id":1,"name":"Alice"}

== Capability: Validation (Zod) ==
  PASS - GET /users/abc -> HTTP 400, {"errors":[{"path":["id"],"message":"must be number","code":"invalid_type"}]}

== Capability: Upload (futon fileUpload) ==
  PASS - POST /upload/avatar -> {"ok":true,"file":{...}}

== Capability: WebSocket / Gateway ==
  PASS - scripts/ws-client.mjs (/chat echo round trip)
  PASS - scripts/ws-rooms-client.mjs (/rooms Gateway, rooms + broadcast)

== Capability: Queue (in-memory adapter) ==
  PASS - POST /jobs/hello -> queued {"queued":true,"jobId":"..."}
  PASS - queue log shows job ... processed (route-triggered)
  PASS - queue log shows repeating 'tick' job firing (1x so far)

==================================
  RESULT: 11 passed, 0 failed
==================================
```

Server logs land at `/tmp/rasengan-server-demo.log` and are kept after the driver exits (even on failure) for inspection.

### Run: HTTP & DI

Proves controller routing + constructor DI (`UserController(private userService: UserService)`, `deps: [UserService, 'CONFIG']`).

```bash
curl -s http://127.0.0.1:3006/ping                                             # {"ok":true}
curl -s http://127.0.0.1:3006/users                                            # [{"id":1,"name":"Alice"},...]
curl -s -X POST http://127.0.0.1:3006/users -H 'content-type: application/json' -d '{"name":"dilane"}'
curl -s http://127.0.0.1:3006/users/1                                          # {"id":1,"name":"Alice"}
```

### Run: Validation

Proves `@rasenganjs/validators`' `zodAdapter`, wired via `app.configureValidation({ adapter: zodAdapter })` in `src/main.ts` (demo app) and `UserController.schemas.findOne.params` coercing `id` to a number:

```bash
curl -s -w '\nHTTP_STATUS:%{http_code}\n' http://127.0.0.1:3006/users/abc
# {"errors":[{"path":["id"],"message":"must be number","code":"invalid_type"}]}
# HTTP_STATUS:400
```

File upload (`@rasenganjs/futon`'s `fileUpload()` + `diskStorage()`, see `src/upload.controller.ts`):

```bash
curl -s -F "avatar=@/path/to/any/small/file" http://127.0.0.1:3006/upload/avatar
```

### Run: WebSocket / Gateway

Two independent paths, both registered in the demo app — a raw `app.websocket()` echo route, and a `@rasenganjs/ws` `Gateway` with rooms/broadcasting:

```bash
cd <repo-root>/apps/playground/rasengan-server-demo
node scripts/ws-client.mjs        # talks to /chat (raw app.websocket()), expects an echo
node scripts/ws-rooms-client.mjs  # talks to /rooms (ChatRoomGateway), exercises join/broadcast/switch-room
```

`ws-rooms-client.mjs` prints its own PASS/FAIL assertions and exits non-zero on any failure — treat it as a self-contained smoke test, not just a log to eyeball.

### Run: Queue

Proves `@rasenganjs/queue`'s `createQueuePlugin()` (in-memory adapter, no Redis) end to end — both a route-triggered one-shot job and a self-repeating job registered in `Queue.onInit()`:

```bash
curl -s -X POST http://127.0.0.1:3006/jobs/hello -H 'content-type: application/json' -d '{"name":"dilane"}'
# {"queued":true,"jobId":"<uuid>"}

# then, in the server log (/tmp/rasengan-server-demo.log when run via the driver):
grep 'hello-queue' /tmp/rasengan-server-demo.log
# [hello-queue] tick 2026-07-24T13:46:26.373Z          <- repeating job (src/hello.queue.ts, onInit())
# [hello-queue] greeted dilane (job <uuid>)             <- the job you just triggered
```

## Run (human path)

```bash
cd apps/playground/rasengan-server-demo
pnpm dev   # blocks in foreground; Ctrl+C to stop (dev.ts owns SIGINT and forwards it to the tsx child's process group)
```

Then hit `http://localhost:3006/...` with a browser, curl, or a WebSocket client by hand, same endpoints as above.

## Direct-invocation note

For a PR that only touches one internal function inside a single package (no cross-package wiring), running that package's own unit tests is faster than the full driver:

```bash
pnpm test   # from packages/framework/rasengan-server/ (this dir) — vitest, currently 118 tests / 14 files
```

Same pattern for the sibling packages: `cd ../../../packages/ecosystem/ws && pnpm test` (44 tests), `.../queue && pnpm test` (73 tests + 1 todo), `.../validators && pnpm test` (15 tests). All four suites were confirmed green before this skill's demo changes were added.

## Test

```bash
pnpm test   # from this directory (packages/framework/rasengan-server/)
```

Expect all suites to pass (`14 passed`, `118 passed`). For an integration-level check that spans all four packages together, use the driver script above instead — that's what it's for.

---

## Gotchas

- **`rasengan.server.js` sets `preset: 'workerd'`, but `pnpm dev` ignores it.** `preset` only selects the target adapter for the production `build`/`start` commands (`src/cli/start.ts`, `src/cli/build.ts`). The `dev` command (`src/cli/dev.ts`) always spawns `tsx watch <entry>` on plain Node regardless of `preset`, and `selectAdapter()` in dev mode auto-detects Bun vs Node from `process.versions.bun` — it never even reads `preset` outside `production` mode. So this container (no Bun/workerd runtime active) runs the demo fine on `pnpm dev` unmodified; no config change was needed or made.
- **Killing the port's listener does not kill the whole `pnpm dev` tree.** `rasengan-server dev` spawns `tsx watch` with Node's `spawn({ detached: true })`, which puts it in a _new session_ (not just a new process group) — a plain `lsof -ti:3006 | xargs kill` frees the port but leaves `tsx watch` (and its own respawned child) running as an orphan on the next reload cycle. The driver's cleanup does both: kill the port's listener, then `pkill -f "<absolute demo app path>"` (safe — scoped to a unique absolute path, won't match the agent's own shell).
- **The repeating "tick" job does not fire exactly every 1000ms.** `HelloQueue.onInit()` registers it with `{ repeat: { every: 1_000 } }`, and the very first tick fires immediately at boot — but _subsequent_ ticks are gated by `createQueuePlugin()`'s sweeper, which promotes due repeat jobs on a fixed `sweepInterval` (default 5000ms), not on each job's own `every`. Don't wait only ~1-2s expecting multiple ticks; the driver waits up to 6s and only asserts "fired at least once."
- **`@rasenganjs/queue` is not a pre-existing dependency of the demo app.** It was added for this skill (`package.json` + `pnpm install --filter "rasengan-server-demo..."`) along with `src/hello.queue.ts`, `src/queue.controller.ts`, `src/queue.module.ts`, and the `createQueuePlugin()` registration in `src/main.ts` — there was no queue example here before. See the driver's Build step, which links it automatically if missing.

## Troubleshooting

- **`curl: (7) Failed to connect ... port 3006`**: server isn't up yet (or crashed). Check `/tmp/rasengan-server-demo.log` for a stack trace — a common cause is stale `dist/` in one of the six packages after a source edit; rerun the driver with `--build`.
- **`Error: Cannot find module '@rasenganjs/queue'`** when the server boots: the demo app's `node_modules` predates the queue package being added as a dependency. Run `pnpm install --filter "rasengan-server-demo..."` from the repo root (the driver does this automatically when `node_modules/@rasenganjs/queue` is missing).
- **Driver reports `queue log missing repeating 'tick' job`** on an otherwise-healthy server: timing — the sweeper only promotes repeat jobs every 5s (see Gotchas above). Re-run, or check `/tmp/rasengan-server-demo.log` directly a few seconds later; a single missed check here doesn't mean the queue plugin is broken.
- **Address already in use on 3006** when launching manually (outside the driver): a previous `pnpm dev` run's `tsx watch` orphan is still alive. `lsof -ti:3006 -sTCP:LISTEN | xargs -r kill` then, if it recurs, `pkill -f "apps/playground/rasengan-server-demo"`.
