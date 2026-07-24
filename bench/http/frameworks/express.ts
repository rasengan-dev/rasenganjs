/**
 * Express adapter — the same scenario app built with Express.
 * Node-only, and not fetch-based: no `createFetch`, so it is
 * measured over HTTP only (see servers/express.ts).
 */

import express, { type Express, type RequestHandler } from 'express';
import { buildRouteTable, MIDDLEWARE_COUNT } from '../scenarios.js';

export function createApp(): Express {
  const app = express();

  // Measure the framework, not header cosmetics
  app.disable('x-powered-by');
  app.disable('etag');

  // ── hello ──
  app.get('/', (_req, res) => {
    res.json({ message: 'ok' });
  });

  // ── routing — shared route table, incl. /users/:id/posts/:postId ──
  const paramsHandler: RequestHandler = (req, res) => {
    res.json({ params: req.params });
  };
  for (const route of buildRouteTable()) {
    if (route.method === 'GET') {
      app.get(route.pattern, paramsHandler);
    } else {
      app.post(route.pattern, paramsHandler);
    }
  }

  // ── middleware — route-level, so only /mw pays the 8 hops ──
  const noop: RequestHandler = (_req, _res, next) => next();
  app.get(
    '/mw',
    ...Array.from({ length: MIDDLEWARE_COUNT }, () => noop),
    (_req, res) => {
      res.json({ mw: true });
    }
  );

  // ── post-json — body parser scoped to the route ──
  app.post('/echo', express.json(), (req, res) => {
    res.json({ name: (req.body as { name: string }).name });
  });

  return app;
}
