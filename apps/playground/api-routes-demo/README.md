# api-routes-demo

Playground exercising `_api/` file-based API routes (RFC-0008 —
`proposals/RFC-0008-Api-Routes.md`). `ssr: true` with `prerender`
disabled is required — that's the only build shape that produces
`dist/server/api-router.js`; anything else fails the build with an
explicit error (RFC-0008 §9).

## What's here

```
src/app/_api/
  middleware.ts           # logs every request, applies repo-wide
  health.route.ts         # GET /api/health
  users/
    middleware.ts         # requires an x-api-key header, applies to /api/users/*
    db.ts                 # @libsql/client-backed store (not a route/middleware file, ignored by the glob)
    index.route.ts        # GET, POST /api/users
    [id].route.ts         # GET (throws NotFoundError for a missing id), DELETE /api/users/:id
```

## Try it

```bash
pnpm run dev
```

```bash
curl http://localhost:5320/api/health

curl http://localhost:5320/api/users
# -> 401, missing x-api-key (users/middleware.ts)

curl -H "x-api-key: demo" http://localhost:5320/api/users

curl -H "x-api-key: demo" http://localhost:5320/api/users/1

curl -H "x-api-key: demo" http://localhost:5320/api/users/999
# -> 404 {"error":{"message":"User 999 not found","status":404}}

curl -X POST -H "x-api-key: demo" -H "content-type: application/json" \
  -d '{"name":"Sakura"}' http://localhost:5320/api/users

curl -X DELETE -H "x-api-key: demo" http://localhost:5320/api/users/1
```

## Production

```bash
pnpm run build
pnpm run serve
```

Same requests as above, against whatever port `rasengan-serve` prints.

## Storage: `@libsql/client` (Turso-compatible)

`users/db.ts` uses [`@libsql/client`](https://github.com/tursodatabase/libsql-client-ts)
against a local `shinobi.sqlite` file (via libsql's `file:` URL scheme) by
default, seeded with Naruto/Sasuke on first run — same local dev experience
as the SQLite file this demo started with (an earlier version used Node's
built-in `node:sqlite` directly).

That's fine for `rasengan dev` and for `@rasenganjs/serve` on a
persistent host (a VM/container with a real, mounted filesystem), but
**not** for Vercel/Netlify: serverless functions there have an ephemeral
filesystem, so a locally-written file never survives between invocations
in production. Set these two environment variables in production to point
the same client at a real hosted [Turso](https://turso.tech) database
instead — no code change needed beyond that, since `@libsql/client` speaks
the same wire protocol for both:

```bash
TURSO_DATABASE_URL=libsql://<your-db>.turso.io
TURSO_AUTH_TOKEN=<token>
```

(`turso db create`, then `turso db show --url` / `turso db tokens create`
to get these two values.)

`shinobi.sqlite` is gitignored — delete it to reset back to the seed data
locally.

Swapping in Postgres/MySQL instead would be a `db.ts`-only change —
nothing about `_api/`'s routing or middleware cares what's behind these
functions.
