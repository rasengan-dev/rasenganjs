import type {
  GatewayClient,
  GatewayMessageHandler,
  GatewayServer,
} from './types.js';

/**
 * Base class for a WebSocket gateway — the `Controller` equivalent for
 * `app.websocket()`. Registered via `defineModule({ gateways: [...] })`
 * (see `createWsPlugin`), resolved through the same DI container as
 * HTTP controllers, so constructor injection works identically.
 *
 * @example
 * ```ts
 * class ChatGateway extends Gateway {
 *   path = '/chat';
 *   constructor(private rooms: RoomService) { super(); }
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
 */
export abstract class Gateway {
  /** The WebSocket path this gateway listens on, e.g. `'/chat'`. */
  abstract path: string;

  /**
   * Handle for broadcasting from outside any connection's context
   * (an HTTP controller, a timer, ...). Set by the plugin after this
   * gateway is resolved — never construct this yourself.
   */
  server!: GatewayServer;

  /** Called once per new connection, after the WebSocket upgrade completes. */
  onConnect?(client: GatewayClient): void | Promise<void>;

  /** Called when a connection closes, for any reason. */
  onDisconnect?(
    client: GatewayClient,
    code?: number,
    reason?: string
  ): void | Promise<void>;

  /**
   * Escape hatch for binary frames, which don't fit the `{ event, data }`
   * JSON envelope every other message goes through. Ignored if undefined.
   */
  onBinaryMessage?(
    client: GatewayClient,
    data: ArrayBuffer
  ): void | Promise<void>;

  /**
   * Declare this gateway's event handlers, imperatively — mirrors
   * `Controller.routes(router)` exactly.
   */
  abstract messages(router: GatewayRouter): void;
}

/**
 * Collects a `Gateway`'s event → handler map. Passed to `Gateway.messages()`
 * once per gateway registration; `createWsPlugin` consumes the result.
 */
export class GatewayRouter {
  private handlers = new Map<string, GatewayMessageHandler>();

  /**
   * Register a handler for one event name, parsed out of the
   * `{ event, data }` envelope on incoming text messages.
   *
   * @throws If `event` is already registered on this gateway.
   */
  on<T = unknown>(event: string, handler: GatewayMessageHandler<T>): void {
    if (this.handlers.has(event)) {
      throw new Error(
        `[rasengan-ws] Event "${event}" is already registered on this gateway.`
      );
    }
    this.handlers.set(event, handler as GatewayMessageHandler);
  }

  /** @internal Consumed by `createWsPlugin` after `Gateway.messages()` runs. */
  getHandlers(): Map<string, GatewayMessageHandler> {
    return this.handlers;
  }
}
