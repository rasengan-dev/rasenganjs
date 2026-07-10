import { ModulePlugin } from '@rasenganjs/server';
import { Redis } from 'ioredis';

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
declare abstract class Gateway {
    /** The WebSocket path this gateway listens on, e.g. `'/chat'`. */
    abstract path: string;
    /**
     * Handle for broadcasting from outside any connection's context
     * (an HTTP controller, a timer, ...). Set by the plugin after this
     * gateway is resolved — never construct this yourself.
     */
    server: GatewayServer;
    /** Called once per new connection, after the WebSocket upgrade completes. */
    onConnect?(client: GatewayClient): void | Promise<void>;
    /** Called when a connection closes, for any reason. */
    onDisconnect?(client: GatewayClient, code?: number, reason?: string): void | Promise<void>;
    /**
     * Escape hatch for binary frames, which don't fit the `{ event, data }`
     * JSON envelope every other message goes through. Ignored if undefined.
     */
    onBinaryMessage?(client: GatewayClient, data: ArrayBuffer): void | Promise<void>;
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
declare class GatewayRouter {
    private handlers;
    /**
     * Register a handler for one event name, parsed out of the
     * `{ event, data }` envelope on incoming text messages.
     *
     * @throws If `event` is already registered on this gateway.
     */
    on<T = unknown>(event: string, handler: GatewayMessageHandler<T>): void;
    /** @internal Consumed by `createWsPlugin` after `Gateway.messages()` runs. */
    getHandlers(): Map<string, GatewayMessageHandler>;
}

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
/** A handler for one named event, registered via `GatewayRouter.on()`. */
type GatewayMessageHandler<T = unknown> = (client: GatewayClient, data: T) => void | Promise<void>;
/** Returned by `client.to(room)` / `client.broadcast` / `server.to(room)`. */
interface Broadcaster {
    emit(event: string, data: unknown): Promise<void>;
}
/**
 * A single connected client, passed to every `Gateway` lifecycle/message
 * handler. Wraps the runtime-agnostic `WebSocketConnection` from
 * `@rasenganjs/server` with the room/broadcast/envelope conveniences.
 */
interface GatewayClient {
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
interface GatewayServer {
    /** Broadcast to everyone in a room (no sender to exclude). */
    to(room: string): Broadcaster;
    /** Broadcast to everyone connected to this gateway. */
    emit(event: string, data: unknown): Promise<void>;
}
/** Wire shape relayed through a `GatewayAdapter`. */
interface BroadcastMessage {
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
interface GatewayAdapter {
    publish(channel: string, message: BroadcastMessage): Promise<void>;
    /**
     * @returns An unsubscribe function.
     */
    subscribe(channel: string, onMessage: (message: BroadcastMessage) => void): () => void;
}
/** A `Gateway` subclass constructor, as passed to `defineModule({ gateways })`. */
type GatewayClass = new (...args: any[]) => Gateway;

/**
 * `rasengan-server`'s `ModuleConfig` only knows about `gateways` as an
 * opaque `unknown` extension key (see `ModulePlugin`) — it never imports
 * this package. This declaration merge adds a properly-typed `gateways`
 * field to `ModuleConfig` for any project that imports `@rasenganjs/ws`,
 * so `defineModule({ gateways: [ChatGateway] })` gets real type-checking
 * and autocomplete without `rasengan-server` needing to know `Gateway`
 * exists.
 */
declare module '@rasenganjs/server' {
    interface ModuleConfig {
        /** Gateway classes to register — forwarded to `createWsPlugin()`. */
        gateways?: GatewayClass[];
    }
}

interface WsPluginOptions {
    /**
     * Pub/sub relay used for room/broadcast delivery across every gateway
     * this plugin registers. Defaults to `MemoryGatewayAdapter`
     * (single-process). Pass a `RedisGatewayAdapter` to scale horizontally.
     */
    adapter?: GatewayAdapter;
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
declare function createWsPlugin(options?: WsPluginOptions): ModulePlugin;

/**
 * Default `GatewayAdapter` — an in-process pub/sub relay. Correct for a
 * single server instance; broadcasts never leave the process. For
 * multiple instances behind a load balancer, use `RedisGatewayAdapter`
 * so a broadcast published on one process reaches clients connected to
 * another.
 */
declare class MemoryGatewayAdapter implements GatewayAdapter {
    private subscribers;
    publish(channel: string, message: BroadcastMessage): Promise<void>;
    subscribe(channel: string, onMessage: (message: BroadcastMessage) => void): () => void;
}

/**
 * This file only ever imports `ioredis` as a type (`import type`), which
 * is erased at compile time — so `@rasenganjs/ws` has zero runtime
 * dependency on `ioredis` actually being installed. Mirrors how
 * `@rasenganjs/validators`' `zodAdapter` never imports `zod` at runtime
 * either: the caller constructs the library-specific object (a Zod
 * schema there, an `ioredis` client here) and hands it to the adapter.
 */
interface RedisGatewayAdapterOptions {
    /** `ioredis` client used for `PUBLISH`. Can be shared with app code. */
    publisher: Redis;
    /**
     * A *separate* `ioredis` client used for `SUBSCRIBE`. Redis puts a
     * connection into subscriber mode as soon as it issues `SUBSCRIBE`,
     * after which that connection can no longer run other commands —
     * typically `publisher.duplicate()`.
     */
    subscriber: Redis;
}
/**
 * `GatewayAdapter` backed by Redis Pub/Sub, for horizontally-scaled
 * deployments: a broadcast published on one process is relayed to every
 * other subscribed process, so `client.to(room).emit(...)` reaches room
 * members regardless of which process holds their connection.
 *
 * One Redis channel per gateway `path`. Room membership itself is never
 * stored in Redis — see the design note in `types.ts` on `GatewayAdapter`.
 */
declare class RedisGatewayAdapter implements GatewayAdapter {
    private publisher;
    private subscriber;
    private handlers;
    constructor(options: RedisGatewayAdapterOptions);
    publish(channel: string, message: BroadcastMessage): Promise<void>;
    subscribe(channel: string, onMessage: (message: BroadcastMessage) => void): () => void;
}

export { type BroadcastMessage, type Broadcaster, Gateway, type GatewayAdapter, type GatewayClass, type GatewayClient, type GatewayMessageHandler, GatewayRouter, type GatewayServer, MemoryGatewayAdapter, RedisGatewayAdapter, type RedisGatewayAdapterOptions, type WsPluginOptions, createWsPlugin };
