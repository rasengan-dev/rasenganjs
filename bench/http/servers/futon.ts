/**
 * Futon server entry — boots the scenario app on the
 * @rasenganjs/runtime adapter matching the current runtime.
 *
 * Run with either:
 *   node --import tsx servers/futon.ts   (Node adapter)
 *   bun servers/futon.ts                 (Bun adapter)
 */

import { createApp } from '../frameworks/futon.js';

const port = Number(process.env.PORT ?? 3210);
const host = '127.0.0.1';

const app = createApp();
const handler = (request: Request) => app.fetch(request);

const onListening = () => {
  // load.ts polls for readiness, but log for humans running this directly
  console.log(`[futon] listening on http://${host}:${port}`);
};

if ((globalThis as { Bun?: unknown }).Bun) {
  const { startBunServer } = await import('@rasenganjs/runtime/adapters/bun');
  startBunServer(handler, { port, host, onListening });
} else {
  const { startNodeServer } = await import('@rasenganjs/runtime/adapters/node');
  startNodeServer(handler, { port, host, onListening });
}
