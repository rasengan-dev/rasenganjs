/**
 * Koa adapter — the same scenario app built with Koa + @koa/router.
 * Not fetch-based: no `createFetch`, measured over HTTP only.
 * Runs on Bun through its node:http compatibility layer.
 */

import Koa from 'koa';
import Router from '@koa/router';
import { bodyParser } from '@koa/bodyparser';
import { buildRouteTable, MIDDLEWARE_COUNT } from '../scenarios.js';

export function createApp(): Koa {
  const app = new Koa();
  const router = new Router();

  // ── hello ──
  router.get('/', (ctx) => {
    ctx.body = { message: 'ok' };
  });

  // ── routing — shared route table, incl. /users/:id/posts/:postId ──
  for (const route of buildRouteTable()) {
    const handler = (ctx: Koa.Context & { params: Record<string, string> }) => {
      ctx.body = { params: ctx.params };
    };
    if (route.method === 'GET') {
      router.get(route.pattern, handler);
    } else {
      router.post(route.pattern, handler);
    }
  }

  // ── middleware — route-level, so only /mw pays the 8 hops ──
  const noop: Router.Middleware = (_ctx, next) => next();
  router.get(
    '/mw',
    ...Array.from({ length: MIDDLEWARE_COUNT }, () => noop),
    (ctx) => {
      ctx.body = { mw: true };
    }
  );

  // ── post-json — body parser scoped to the route ──
  router.post('/echo', bodyParser(), (ctx) => {
    ctx.body = { name: (ctx.request.body as { name: string }).name };
  });

  app.use(router.routes());
  return app;
}
