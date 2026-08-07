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
    db.ts                 # node:sqlite-backed store (not a route/middleware file, ignored by the glob)
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

## Storage: `node:sqlite`

`users/db.ts` uses Node's built-in `node:sqlite` (stable since Node 22.5,
no extra dependency — matches the `>=22.12.0` engine this monorepo already
requires) against a `shinobi.sqlite` file written to the app root, seeded
with Naruto/Sasuke on first run.

This is a real file on disk, not an in-memory array, so mutations persist
across requests in **both** `rasengan dev` and production — unlike an
earlier version of this demo that kept a plain in-memory array and lost
every write on the next request in dev (`rasengan dev` re-creates a fresh
Vite SSR module runner per request, the same reason page routes can't hold
in-memory state across dev requests either — see RFC-0008 Phase 4). A file
on disk isn't affected by that: the module re-runs each request, but it's
just re-opening the same database, not resetting its contents.

`shinobi.sqlite` is gitignored — delete it to reset back to the seed data.

Swapping in Postgres/MySQL/a hosted SQLite (Turso, D1, ...) instead is a
`db.ts`-only change — nothing about `_api/`'s routing or middleware cares
what's behind these functions.
