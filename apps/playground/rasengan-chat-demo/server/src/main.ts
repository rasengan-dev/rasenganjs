import { bootstrap } from '@rasenganjs/server';
import { createWsPlugin, RedisGatewayAdapter } from '@rasenganjs/ws';
import { createQueuePlugin, RedisQueueAdapter } from '@rasenganjs/queue';
import appModule from './app.module.js';
import Redis from 'ioredis';

// Queue storage always goes through Redis in this demo (see
// docker-compose.yml) — a queue's whole value is surviving the process,
// so MemoryQueueAdapter isn't a realistic stand-in here.
const client = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379');

const adapter = new RedisQueueAdapter({
  client,
  blockingClient: client.duplicate(),
});

// The ws gateway, unlike the queue, is genuinely fine single-process —
// MemoryGatewayAdapter is production-legitimate there (see
// @rasenganjs/ws's docs). Only branch to Redis (for the multi-process
// broadcast fan-out it buys) when REDIS_URL is explicitly set, so this
// demo still runs without Docker/Redis by default.
const wsAdapter = process.env.REDIS_URL
  ? new RedisGatewayAdapter({
      publisher: client,
      subscriber: client.duplicate(),
    })
  : undefined;

console.log(
  `[chat-demo] ws gateway adapter: ${wsAdapter ? 'redis' : 'memory'}`
);

/**
 * Chat backend for the rasengan-chat-demo playground. The web app
 * (../web) connects to ws://localhost:3007/chat — see
 * src/chat/chat.gateway.ts for the protocol.
 */
bootstrap(async (app) => {
  // Claims the `gateways` key consumed by app.module.ts.
  app.registerPlugin(
    createWsPlugin({
      adapter: wsAdapter,
    })
  );
  // Claims the `queues` key — see chat/media.queue.ts (RFC-0004 dogfood).
  app.registerPlugin(
    createQueuePlugin({
      sweepInterval: 1_000,
      adapter,
    })
  );

  // The web app (another origin in dev) POSTs uploads to /upload and
  // loads /files/* — WebSockets don't need CORS, but fetch() does.
  app.enableCors();

  app.registerModule(appModule);
});
