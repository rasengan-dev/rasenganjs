/**
 * Hono server entry — boots the scenario app on the idiomatic
 * server for the current runtime.
 *
 * Run with either:
 *   node --import tsx servers/hono.ts    (@hono/node-server)
 *   bun servers/hono.ts                  (Bun.serve)
 */

import { createApp } from '../frameworks/hono.js';

const port = Number(process.env.PORT ?? 3210);
const host = '127.0.0.1';

const app = createApp();

const bun = (globalThis as { Bun?: { serve: (opts: unknown) => unknown } }).Bun;

if (bun) {
  bun.serve({ port, hostname: host, fetch: app.fetch });
  console.log(`[hono] listening on http://${host}:${port}`);
} else {
  const { serve } = await import('@hono/node-server');
  serve({ fetch: app.fetch, port, hostname: host }, () => {
    console.log(`[hono] listening on http://${host}:${port}`);
  });
}
