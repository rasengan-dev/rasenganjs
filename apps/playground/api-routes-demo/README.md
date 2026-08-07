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
    data.ts               # in-memory store (not a route/middleware file, ignored by the glob)
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

## `users/data.ts`'s in-memory store only persists across requests in production

`rasengan dev` re-creates a fresh Vite SSR module runner per request (same
reason page routes don't keep in-memory state between requests either), so
a `POST`/`DELETE` against `/api/users` in dev won't be visible on the next
request — `users` resets to its two seed rows every time. In production
(`pnpm run serve`), the module is loaded once and reused, so mutations
persist for the life of the process, as you'd expect from a real (if
still non-durable, in-memory) store.
