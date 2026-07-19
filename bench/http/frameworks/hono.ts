/**
 * Hono adapter — the exact same scenario app built with Hono.
 * Served through @hono/node-server (Node) or Bun.serve (Bun),
 * see servers/hono.ts.
 */

import { Hono } from 'hono';
import type { MiddlewareHandler } from 'hono';
import { buildRouteTable, MIDDLEWARE_COUNT } from '../scenarios.js';

export function createApp(): Hono {
  const app = new Hono();

  // ── hello ──
  app.get('/', (c) => c.json({ message: 'ok' }));

  // ── routing — shared route table, incl. /users/:id/posts/:postId ──
  for (const route of buildRouteTable()) {
    if (route.method === 'GET') {
      app.get(route.pattern, (c) => c.json({ params: c.req.param() }));
    } else {
      app.post(route.pattern, (c) => c.json({ params: c.req.param() }));
    }
  }

  // ── middleware — path-scoped so only /mw pays the 8 hops ──
  const noop: MiddlewareHandler = async (_c, next) => {
    await next();
  };
  app.use('/mw', ...Array.from({ length: MIDDLEWARE_COUNT }, () => noop));
  app.get('/mw', (c) => c.json({ mw: true }));

  // ── post-json ──
  app.post('/echo', async (c) => {
    const body = await c.req.json<{ name: string }>();
    return c.json({ name: body.name });
  });

  return app;
}

/** In-process WinterCG dispatch. */
export function createFetch(): (req: Request) => Promise<Response> {
  const app = createApp();
  return (req) => Promise.resolve(app.fetch(req));
}
