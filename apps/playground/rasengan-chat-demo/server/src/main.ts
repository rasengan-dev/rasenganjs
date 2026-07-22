import { bootstrap } from '@rasenganjs/server';
import { createWsPlugin } from '@rasenganjs/ws';
import { createQueuePlugin } from '@rasenganjs/queue';
import appModule from './app.module.js';

/**
 * Chat backend for the rasengan-chat-demo playground. The web app
 * (../web) connects to ws://localhost:3007/chat — see
 * src/chat/chat.gateway.ts for the protocol.
 */
bootstrap(async (app) => {
  // Claims the `gateways` key consumed by app.module.ts.
  app.registerPlugin(createWsPlugin());
  // Claims the `queues` key — see chat/media.queue.ts (RFC-0004 dogfood).
  app.registerPlugin(createQueuePlugin());

  // The web app (another origin in dev) POSTs uploads to /upload and
  // loads /files/* — WebSockets don't need CORS, but fetch() does.
  app.enableCors();

  app.registerModule(appModule);
});
