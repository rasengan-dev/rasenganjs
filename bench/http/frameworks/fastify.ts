/**
 * Fastify adapter — the same scenario app built with Fastify.
 * Not fetch-based: no `createFetch`, measured over HTTP only.
 * Runs on Bun through its node:http compatibility layer.
 *
 * Fastify has no connect-style middleware; the 8 pass-through hops
 * are route-level `preHandler` hooks — its idiomatic equivalent.
 */

import Fastify, {
  type FastifyInstance,
  type preHandlerHookHandler,
} from 'fastify';
import { buildRouteTable, MIDDLEWARE_COUNT } from '../scenarios.js';

export function createApp(): FastifyInstance {
  const app = Fastify({ logger: false });

  // ── hello ──
  app.get('/', async () => ({ message: 'ok' }));

  // ── routing — shared route table, incl. /users/:id/posts/:postId ──
  for (const route of buildRouteTable()) {
    const handler = async (req: { params: unknown }) => ({
      params: req.params,
    });
    if (route.method === 'GET') {
      app.get(route.pattern, handler);
    } else {
      app.post(route.pattern, handler);
    }
  }

  // ── middleware — 8 pass-through preHandler hooks on /mw only ──
  const noop: preHandlerHookHandler = (_req, _reply, done) => done();
  app.get(
    '/mw',
    { preHandler: Array.from({ length: MIDDLEWARE_COUNT }, () => noop) },
    async () => ({ mw: true })
  );

  // ── post-json — Fastify parses JSON bodies natively ──
  app.post('/echo', async (req) => ({
    name: (req.body as { name: string }).name,
  }));

  return app;
}
