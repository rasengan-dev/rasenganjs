/**
 * Futon adapter — builds the shared scenario app with
 * @rasenganjs/futon. Served through @rasenganjs/runtime adapters
 * (see servers/futon.ts).
 */

import { Futon, json, type Middleware } from '@rasenganjs/futon';
import { buildRouteTable, MIDDLEWARE_COUNT } from '../scenarios.js';

export function createApp(): Futon {
  const app = new Futon();

  // ── hello ──
  app.get('/', async () => json({ message: 'ok' }));

  // ── routing — shared route table, incl. /users/:id/posts/:postId ──
  for (const route of buildRouteTable()) {
    if (route.method === 'GET') {
      app.get(route.pattern, async (ctx) => json({ params: ctx.params }));
    } else {
      app.post(route.pattern, async (ctx) => json({ params: ctx.params }));
    }
  }

  // ── post-json ──
  app.post('/echo', async (ctx) => {
    const body = (await ctx.request.json()) as { name: string };
    return json({ name: body.name });
  });

  // ── middleware — registered LAST: router-level middleware only
  //    applies to routes added after use(), keeping the other
  //    scenarios free of pass-through hops. ──
  const noop: Middleware = async (_ctx, next) => next();
  app.group(
    '/mw',
    { middlewares: Array.from({ length: MIDDLEWARE_COUNT }, () => noop) },
    (router) => {
      router.get('/', async () => json({ mw: true }));
    }
  );

  return app;
}

/** In-process WinterCG dispatch — same call the runtime adapters make. */
export function createFetch(): (req: Request) => Promise<Response> {
  const app = createApp();
  return (req) => app.fetch(req);
}
