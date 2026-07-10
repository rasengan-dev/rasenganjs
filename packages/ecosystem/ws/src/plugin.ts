import type {
  ModulePlugin,
  WebSocketConnection,
  WebSocketContext,
} from '@rasenganjs/server';

import { Gateway, GatewayRouter } from './gateway.js';
import type { GatewayAdapter, GatewayClass } from './types.js';
import { MemoryGatewayAdapter } from './adapters/memory.js';
import {
  createGatewayClient,
  createGatewayServer,
  deliverLocally,
  parseEnvelope,
  type LocalClientEntry,
} from './client.js';

export interface WsPluginOptions {
  /**
   * Pub/sub relay used for room/broadcast delivery across every gateway
   * this plugin registers. Defaults to `MemoryGatewayAdapter`
   * (single-process). Pass a `RedisGatewayAdapter` to scale horizontally.
   */
  adapter?: GatewayAdapter;
}

/** Reserved event name used to report malformed frames or unknown events back to a client. */
const ERROR_EVENT = '$error';

/**
 * Build the `ModulePlugin` that wires `defineModule({ gateways: [...] })`
 * into `app.websocket()`. Register once at bootstrap time:
 *
 * ```ts
 * bootstrap((app) => {
 *   app.registerPlugin(createWsPlugin());
 *   app.registerModule(appModule); // may declare gateways: [ChatGateway]
 * });
 * ```
 *
 * Every gateway this plugin registers is purely a convenience layer over
 * `app.websocket()` (RFC-0001) — nothing here bypasses that primitive.
 */
export function createWsPlugin(options: WsPluginOptions = {}): ModulePlugin {
  const adapter = options.adapter ?? new MemoryGatewayAdapter();

  return {
    key: 'gateways',
    register(app, container, _mod, value) {
      const gatewayClasses = value as GatewayClass[];

      for (const gatewayClass of gatewayClasses) {
        registerGateway(app, container, gatewayClass, adapter);
      }
    },
  };
}

function registerGateway(
  app: Parameters<ModulePlugin['register']>[0],
  container: Parameters<ModulePlugin['register']>[1],
  gatewayClass: GatewayClass,
  adapter: GatewayAdapter
): void {
  const instance = container.resolve(gatewayClass) as Gateway;

  if (!(instance instanceof Gateway)) {
    throw new Error(
      `[rasengan-ws] "${gatewayClass.name}" is registered under \`gateways\` ` +
        `but does not extend \`Gateway\`.`
    );
  }
  if (!instance.path) {
    throw new Error(
      `[rasengan-ws] Gateway "${gatewayClass.name}" is missing a \`path\` (e.g. path = '/chat').`
    );
  }
  if (typeof instance.messages !== 'function') {
    throw new Error(
      `[rasengan-ws] Gateway "${gatewayClass.name}" is missing a \`messages(router)\` method.`
    );
  }

  const router = new GatewayRouter();
  instance.messages(router);
  const handlers = router.getHandlers();

  const channel = instance.path;
  const localClients = new Map<string, LocalClientEntry>();
  const connectionToId = new Map<WebSocketConnection, string>();

  instance.server = createGatewayServer(channel, adapter);

  const unsubscribe = adapter.subscribe(channel, (message) => {
    deliverLocally(localClients, message);
  });
  app.onDestroy(() => unsubscribe());

  app.websocket(instance.path, {
    open(ctx: WebSocketContext) {
      const id = crypto.randomUUID();
      // `client` is assigned immediately below. `createGatewayClient` only
      // closes over `entry` (for `.connection`/`.rooms`/`.data`) and never
      // reads `entry.client` itself, so this two-step build is safe despite
      // the cast.
      const entry = {
        connection: ctx.socket,
        rooms: new Set<string>(),
        data: {} as Record<string, unknown>,
      } as LocalClientEntry;
      entry.client = createGatewayClient(
        id,
        ctx.request,
        entry,
        channel,
        adapter
      );

      localClients.set(id, entry);
      connectionToId.set(ctx.socket, id);

      instance.onConnect?.(entry.client);
    },

    message(ctx: WebSocketContext, data: string | ArrayBuffer) {
      const id = connectionToId.get(ctx.socket);
      if (!id) return;
      const entry = localClients.get(id);
      if (!entry) return;

      if (typeof data !== 'string') {
        instance.onBinaryMessage?.(entry.client, data);
        return;
      }

      const envelope = parseEnvelope(data);
      if (!envelope) {
        entry.client.emit(ERROR_EVENT, {
          message: 'Malformed message — expected { event, data } JSON.',
        });
        return;
      }

      const handler = handlers.get(envelope.event);
      if (!handler) {
        entry.client.emit(ERROR_EVENT, {
          message: `Unknown event "${envelope.event}".`,
        });
        return;
      }

      handler(entry.client, envelope.data);
    },

    close(ctx: WebSocketContext, code?: number, reason?: string) {
      const id = connectionToId.get(ctx.socket);
      if (!id) return;
      const entry = localClients.get(id);

      connectionToId.delete(ctx.socket);
      localClients.delete(id);

      if (entry) {
        instance.onDisconnect?.(entry.client, code, reason);
      }
    },
  });
}
