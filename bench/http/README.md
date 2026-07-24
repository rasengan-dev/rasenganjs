# HTTP framework benchmark

Compares **futon + @rasenganjs/runtime** against other frameworks on
identical apps: [Hono](https://hono.dev) (fetch-based, Node + Bun),
[Express](https://expressjs.com) (Node-only), [Koa](https://koajs.com)
and [Fastify](https://fastify.dev) (Node + Bun via Bun's node:http
compat layer). Non-fetch frameworks are HTTP-only. Two modes:

- **In-process** (`micro.bench.ts`, [mitata](https://github.com/evanwashere/mitata)) —
  dispatches `Request` objects straight through each framework's fetch
  handler. Pure framework overhead: router, middleware pipeline,
  context and Request/Response handling. No sockets.
- **HTTP load** (`load.ts`, [autocannon](https://github.com/mcollina/autocannon)) —
  boots each framework as a real server in its own child process and
  measures req/s + latency, including the runtime adapter's HTTP layer.

## Scenarios

Every framework registers the exact same app (see `scenarios.ts`):

| id           | What it measures                                                    |
| ------------ | ------------------------------------------------------------------- |
| `hello`      | `GET /` returning small JSON — the baseline overhead number         |
| `routing`    | Dynamic route hit in a ~41-route table (`/users/:id/posts/:postId`) |
| `middleware` | `GET /mw` behind 8 pass-through middlewares                         |
| `post-json`  | `POST /echo` — parse a JSON body, echo one field                    |

## Running

Prerequisite: `pnpm build` (or at least built `dist/` for
`@rasenganjs/futon` and `@rasenganjs/runtime`), then `pnpm install`.

From `bench/`:

```bash
pnpm bench:micro        # in-process, Node
pnpm bench:micro:bun    # in-process, Bun
pnpm bench:http         # HTTP load, Node servers
pnpm bench:http:bun     # HTTP load, Bun servers (driver stays on Node)
```

`load.ts` flags: `--duration <s>` (default 10), `--connections <n>`
(default 100), `--warmup <s>` (default 2), `--frameworks futon,hono`,
`--runtime node|bun`. Results are also written to
`results-<runtime>.json` (gitignored — numbers are machine-specific).

## Adding a framework

1. `frameworks/<name>.ts` — build the shared scenario app; export
   `createApp()` and (if the framework is fetch-based) `createFetch()`.
2. `servers/<name>.ts` — start a real server on `process.env.PORT`,
   bound to `127.0.0.1`.
3. Register it in `frameworks/index.ts`. Non-fetch frameworks (Koa,
   Express) omit `createFetch` and are measured over HTTP only.

## Fairness rules

- Same route table, same handlers, same response bodies everywhere.
- No logger/compression middleware — measure the framework, not config.
- Each server runs in a fresh child process (no shared JIT state).
- Every scenario is sanity-checked (status + body) before timing, so a
  misrouted 404 can never masquerade as a fast result.
