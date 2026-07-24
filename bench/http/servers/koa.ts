/**
 * Koa server entry.
 *
 * Run with either:
 *   node --import tsx servers/koa.ts
 *   bun servers/koa.ts        (via Bun's node:http compat layer)
 */

import { createApp } from '../frameworks/koa.js';

const port = Number(process.env.PORT ?? 3210);
const host = '127.0.0.1';

createApp().listen(port, host, () => {
  console.log(`[koa] listening on http://${host}:${port}`);
});
