/**
 * @module Types — Gateway, client, and adapter contracts
 *
 * Design note on `GatewayAdapter`: it is deliberately just a pub/sub relay
 * (`publish`/`subscribe`), not a room-membership registry. A client is
 * always connected to exactly one process, so "who's in room X" is only
 * ever meaningful to the process holding that client's live connection —
 * it never needs to be shared state. Broadcasting to a room therefore
 * means "publish the intent to every process; each process locally
 * filters its own connected clients by room membership and delivers."
 * This keeps `MemoryGatewayAdapter` and `RedisGatewayAdapter` symmetric
 * and the interface minimal. Cross-process room *introspection* (e.g.
 * "how many people are in room X across the whole cluster") is presence
 * territory, which RFC-0001 lists as a separate future integration —
 * intentionally out of scope here.
 */

/**
 * A handler for one named event, registered via `GatewayRouter.on()`.
 * The return value only matters when the incoming frame carried an
 * `ackId` — it then becomes the `$ack` reply payload (RPC-style).
 */
export type GatewayMessageHandler<T = unknown> = (
  client: GatewayClient,
  data: T
) => unknown | Promise<unknown>;

/** Returned by `client.to(room)` / `client.broadcast` / `server.to(room)`. */
export interface Broadcaster {
  emit(event: string, data: unknown): Promise<void>;
}

/**
 * A single connected client, passed to every `Gateway` lifecycle/message
 * handler. Wraps the runtime-agnostic `WebSocketConnection` from
 * `@rasenganjs/server` with the room/broadcast/envelope conveniences.
 */
export interface GatewayClient {
  /** Generated per-connection id (not stable across reconnects). */
  readonly id: string;
  /** The original upgrade request — headers, cookies, query params. */
  readonly request: Request;
  /** Free-form per-connection state bag, e.g. the authenticated user. */
  data: Record<string, unknown>;
  /** Add this client to a room (local bookkeeping only, synchronous). */
  join(room: string): void;
  /** Remove this client from a room. */
  leave(room: string): void;
  /** Rooms this client currently belongs to. */
  rooms(): string[];
  /** Send `{ event, data }` to this client only. */
  emit(event: string, data: unknown): void;
  /** Scope a broadcast to a room, excluding this client. */
  to(room: string): Broadcaster;
  /** Scope a broadcast to everyone on this gateway except this client. */
  readonly broadcast: Broadcaster;
  /** Close this client's connection. */
  disconnect(code?: number, reason?: string): void;
}

/**
 * Handle for broadcasting from outside any specific connection's context
 * (an HTTP controller, a cron job, ...). Set on `Gateway.server` by the
 * plugin after the gateway is resolved — the Gateway class itself never
 * constructs one.
 */
export interface GatewayServer {
  /** Broadcast to everyone in a room (no sender to exclude). */
  to(room: string): Broadcaster;
  /** Broadcast to everyone connected to this gateway. */
  emit(event: string, data: unknown): Promise<void>;
}

/** Wire shape relayed through a `GatewayAdapter`. */
export interface BroadcastMessage {
  event: string;
  data: unknown;
  /** Restrict delivery to clients (on any process) currently in this room. */
  room?: string;
  /** Skip this client id during delivery (the sender, for `.broadcast`/`.to()`). */
  excludeClientId?: string;
}

/**
 * Pluggable pub/sub relay a gateway's broadcasts go through. `channel` is
 * always the gateway's `path` — one adapter instance can back multiple
 * gateways since every call is scoped by channel.
 */
export interface GatewayAdapter {
  publish(channel: string, message: BroadcastMessage): Promise<void>;
  /**
   * @returns An unsubscribe function.
   */
  subscribe(
    channel: string,
    onMessage: (message: BroadcastMessage) => void
  ): () => void;
}

/** A `Gateway` subclass constructor, as passed to `defineModule({ gateways })`. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GatewayClass = new (
  ...args: any[]
) => import('./gateway.js').Gateway;
