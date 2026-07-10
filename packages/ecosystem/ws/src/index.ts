/**
 * @module @rasenganjs/ws
 *
 * NestJS-inspired WebSocket Gateways for Rasengan Server. A `Gateway` is
 * the `Controller` equivalent for `app.websocket()` (RFC-0001): declared
 * in `defineModule({ gateways: [...] })` alongside HTTP controllers,
 * resolved through the same DI container, and registered via a
 * `ModulePlugin` — this package never bypasses `app.websocket()`, it's
 * purely a convenience layer on top of it.
 *
 * ## Quick start
 * ```ts
 * // main.ts
 * import { bootstrap } from '@rasenganjs/server';
 * import { createWsPlugin } from '@rasenganjs/ws';
 *
 * bootstrap((app) => {
 *   app.registerPlugin(createWsPlugin());
 *   app.registerModule(appModule); // declares gateways: [ChatGateway]
 * });
 *
 * // chat.gateway.ts
 * import { Gateway, GatewayRouter, type GatewayClient, type GatewayMessageHandler } from '@rasenganjs/ws';
 *
 * export class ChatGateway extends Gateway {
 *   path = '/chat';
 *
 *   onConnect(client: GatewayClient) {
 *     client.join('lobby');
 *   }
 *
 *   messages(router: GatewayRouter) {
 *     router.on('sendMessage', this.handleSendMessage);
 *   }
 *
 *   handleSendMessage: GatewayMessageHandler<{ text: string }> = (client, data) => {
 *     client.to('lobby').emit('newMessage', { text: data.text, from: client.id });
 *   };
 * }
 * ```
 *
 * ## Wire format
 * Messages are JSON `{ event, data }` frames — plain WebSocket has no
 * built-in concept of a named event, so this package defines its own
 * minimal envelope (not Socket.IO wire-compatible). Binary frames bypass
 * the envelope entirely; handle them via `Gateway.onBinaryMessage`.
 *
 * ## Storage / scaling
 * `createWsPlugin({ adapter })` accepts a `GatewayAdapter` — the default
 * `MemoryGatewayAdapter` is single-process; `RedisGatewayAdapter` relays
 * broadcasts across multiple processes via Redis Pub/Sub. See `types.ts`
 * for why room membership itself is never centrally stored.
 */

import './augment.js';

// ── Plugin (the module-system integration point) ──────────────────
export { createWsPlugin } from './plugin.js';
export type { WsPluginOptions } from './plugin.js';

// ── Gateway ─────────────────────────────────────────────────────────
export { Gateway, GatewayRouter } from './gateway.js';

// ── Types ───────────────────────────────────────────────────────────
export type {
  GatewayClient,
  GatewayServer,
  GatewayMessageHandler,
  GatewayAdapter,
  GatewayClass,
  Broadcaster,
  BroadcastMessage,
} from './types.js';

// ── Adapters ────────────────────────────────────────────────────────
export { MemoryGatewayAdapter, RedisGatewayAdapter } from './adapters/index.js';
export type { RedisGatewayAdapterOptions } from './adapters/index.js';
