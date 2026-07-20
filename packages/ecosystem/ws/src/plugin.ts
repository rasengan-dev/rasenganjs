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
  serializeEnvelope,
  type LocalClientEntry,
} from './client.js';

export interface HeartbeatOptions {
  /** How often the server pings each connection (ms). Default 25000. */
  interval?: number;
  /**
   * Extra time after `interval` a connection may stay silent before it
   * is closed as dead (ms). Default 20000 — a connection is dropped
   * once nothing was received for `interval + timeout`.
   */
  timeout?: number;
}

export interface WsPluginOptions {
  /**
   * Pub/sub relay used for room/broadcast delivery across every gateway
   * this plugin registers. Defaults to `MemoryGatewayAdapter`
   * (single-process). Pass a `RedisGatewayAdapter` to scale horizontally.
   */
  adapter?: GatewayAdapter;
  /**
   * App-level dead-connection detection (browsers can't send protocol
   * pings). On by default; pass `false` to disable, or an object to
   * tune. Any inbound frame counts as liveness — active clients are
   * never pinged into disconnection.
   */
  heartbeat?: boolean | HeartbeatOptions;
}

/** Reserved event name used to report malformed frames or unknown events back to a client. */
const ERROR_EVENT = '$error';
/** Close code used when a connection is dropped by the heartbeat. */
const HEARTBEAT_CLOSE_CODE = 4001;

const HEARTBEAT_DEFAULTS: Required<HeartbeatOptions> = {
  interval: 25_000,
  timeout: 20_000,
};

function resolveHeartbeat(
  option: WsPluginOptions['heartbeat']
): Required<HeartbeatOptions> | null {
  if (option === false) return null;
  if (option === true || option === undefined) return HEARTBEAT_DEFAULTS;
  return { ...HEARTBEAT_DEFAULTS, ...option };
}

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
  const heartbeat = resolveHeartbeat(options.heartbeat);

  return {
    key: 'gateways',
    register(app, container, _mod, value) {
      const gatewayClasses = value as GatewayClass[];

      for (const gatewayClass of gatewayClasses) {
        registerGateway(app, container, gatewayClass, adapter, heartbeat);
      }
    },
    // Gateway extends Provider — the array IS already a set of real DI
    // provider tokens, so compile() can register/export/eagerly-resolve
    // them exactly like a hand-declared provider.
    asProviders(value) {
      return value as GatewayClass[];
    },
  };
}

function registerGateway(
  app: Parameters<ModulePlugin['register']>[0],
  container: Parameters<ModulePlugin['register']>[1],
  gatewayClass: GatewayClass,
  adapter: GatewayAdapter,
  heartbeat: Required<HeartbeatOptions> | null
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

  // ── Heartbeat ─────────────────────────────────────────────────────
  // One timer per gateway. Every tick: drop connections that stayed
  // silent past interval + timeout, ping everyone else. `close()` on a
  // dead connection flows into the normal `close` handler below, so
  // presence and onDisconnect behave exactly like a client-side close.
  if (heartbeat) {
    const pingFrame = serializeEnvelope('$ping', {
      interval: heartbeat.interval,
      timeout: heartbeat.timeout,
    });
    const heartbeatTimer = setInterval(() => {
      const deadline = heartbeat.interval + heartbeat.timeout;
      const now = Date.now();
      for (const entry of localClients.values()) {
        if (now - entry.lastSeen > deadline) {
          entry.connection.close(HEARTBEAT_CLOSE_CODE, 'heartbeat timeout');
        } else {
          entry.connection.send(pingFrame);
        }
      }
    }, heartbeat.interval);
    app.onDestroy(() => clearInterval(heartbeatTimer));
  }

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
        lastSeen: Date.now(),
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

      // ANY inbound frame proves the connection is alive.
      entry.lastSeen = Date.now();

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

      // Heartbeat reply — its only job was updating lastSeen above.
      if (envelope.event === '$pong') return;

      const handler = handlers.get(envelope.event);
      if (!handler) {
        if (envelope.ackId !== undefined) {
          // Reject the caller's promise instead of letting it time out.
          entry.connection.send(
            serializeEnvelope('$ack', undefined, {
              ackId: envelope.ackId,
              error: { message: `Unknown event "${envelope.event}".` },
            })
          );
        } else {
          entry.client.emit(ERROR_EVENT, {
            message: `Unknown event "${envelope.event}".`,
          });
        }
        return;
      }

      // Awaited so ack replies carry the handler's return value and a
      // throwing handler answers (or reports) instead of crashing the
      // runtime with an unhandled rejection.
      void (async () => {
        try {
          const result = await handler(entry.client, envelope.data);
          if (envelope.ackId !== undefined) {
            entry.connection.send(
              serializeEnvelope('$ack', result, { ackId: envelope.ackId })
            );
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          if (envelope.ackId !== undefined) {
            entry.connection.send(
              serializeEnvelope('$ack', undefined, {
                ackId: envelope.ackId,
                error: { message },
              })
            );
          } else {
            entry.client.emit(ERROR_EVENT, { message });
          }
        }
      })();
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
