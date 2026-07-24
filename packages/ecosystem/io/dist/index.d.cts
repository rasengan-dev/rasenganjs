import * as react from 'react';
import { ReactNode } from 'react';

/**
 * @module RasenganSocket — framework-agnostic core
 *
 * A thin client over the Web Standard `WebSocket` class speaking the
 * `{ event, data }` JSON envelope of `@rasenganjs/ws` gateways. Adds the
 * pieces raw WebSocket lacks and Socket.IO users expect:
 *
 * - named events (via the envelope) with an `on`/`off`/`emit` surface
 * - automatic reconnection with capped exponential backoff + jitter
 * - a bounded buffer for emits issued while the socket isn't open
 * - a small set of reserved lifecycle events (`connect`, `disconnect`,
 *   `error`, `reconnecting`, `reconnect_failed`, `binary`)
 *
 * Deliberately NOT included (vs Socket.IO): HTTP long-polling fallback,
 * acknowledgements, and heartbeats — the last two are planned as opt-in
 * envelope extensions once `@rasenganjs/ws` reserves their server-side
 * counterparts.
 */
/** Client-side lifecycle events. Server envelopes can never use these names. */
declare const RESERVED_EVENTS: readonly ["connect", "disconnect", "error", "reconnecting", "reconnect_failed", "binary"];
type ReservedEvent = (typeof RESERVED_EVENTS)[number];
type SocketStatus = 'idle' | 'connecting' | 'open' | 'reconnecting' | 'closed';
/**
 * Event-map style shared with the hooks: one payload argument per event.
 * Example: `{ 'chat:message': (data: { text: string }) => void }`
 */
type EventsMap = Record<string, (data?: any) => void>;
interface ReservedEventPayloads {
    connect: () => void;
    disconnect: (info: {
        code?: number;
        reason?: string;
    }) => void;
    error: (error: Error) => void;
    reconnecting: (info: {
        attempt: number;
        delay: number;
    }) => void;
    reconnect_failed: () => void;
    binary: (data: ArrayBuffer) => void;
}
interface RasenganSocketOptions {
    /** Reconnect automatically after an unexpected close. Default `true`. */
    reconnection?: boolean;
    /** Give up after this many consecutive failed attempts. Default `Infinity`. */
    reconnectionAttempts?: number;
    /** Base delay (ms) before the first reconnect attempt. Default `1000`. */
    reconnectionDelay?: number;
    /** Upper bound (ms) for the exponential backoff. Default `10000`. */
    reconnectionDelayMax?: number;
    /** Jitter factor in `[0, 1]` subtracted randomly from each delay. Default `0.5`. */
    randomizationFactor?: number;
    /**
     * How many `emit()` calls to queue while the socket isn't open
     * (flushed in order on the next `connect` event; oldest dropped on
     * overflow). `0` disables buffering. Default `64`.
     */
    emitBufferSize?: number;
    /** Subprotocols forwarded to the `WebSocket` constructor. */
    protocols?: string | string[];
}
declare class RasenganSocket<ServerEvents extends EventsMap = EventsMap, ClientEvents extends EventsMap = EventsMap> {
    readonly url: string;
    private options;
    private ws;
    private listeners;
    private buffer;
    private currentStatus;
    private attempts;
    private reconnectTimer;
    /** True while a close was requested via `disconnect()` — no reconnect. */
    private intentionalClose;
    private ackCounter;
    private pendingAcks;
    private livenessWindow;
    private livenessTimer;
    /** The active connection's settle path — lets the liveness timer end a
     *  zombie session without waiting for a close handshake that a dead
     *  server will never answer. */
    private settleActive;
    constructor(url: string, options?: RasenganSocketOptions);
    get status(): SocketStatus;
    get isConnected(): boolean;
    /** Open the connection. No-op if already connecting/connected. */
    connect(): void;
    /** Close the connection and stop any reconnection. */
    disconnect(code?: number, reason?: string): void;
    /**
     * Send an `{ event, data }` envelope. While the socket isn't open the
     * frame is queued (bounded, see `emitBufferSize`) and flushed right
     * after the next successful connection.
     */
    emit<E extends keyof ClientEvents & string>(event: E, data?: Parameters<ClientEvents[E]>[0]): void;
    /**
     * Send an `{ event, data, ackId }` envelope and resolve with the
     * server handler's return value (`$ack` reply). Rejects when the
     * handler throws, when the event is unknown to the gateway, on
     * timeout (default 10s), or when the connection drops before the
     * reply — a reply can't meaningfully arrive from another session,
     * so unlike `emit()` this NEVER buffers while offline.
     */
    emitWithAck<E extends keyof ClientEvents & string, Reply = unknown>(event: E, data?: Parameters<ClientEvents[E]>[0], options?: {
        timeout?: number;
    }): Promise<Reply>;
    /**
     * Listen to a server event (by envelope name) or a reserved lifecycle
     * event. @returns An unsubscribe function.
     */
    on<E extends keyof ServerEvents & string>(event: E, handler: ServerEvents[E]): () => void;
    on<E extends ReservedEvent>(event: E, handler: ReservedEventPayloads[E]): () => void;
    off(event: string, handler: (...args: any[]) => void): void;
    removeAllListeners(): void;
    private open;
    private scheduleReconnect;
    private flushBuffer;
    private dispatch;
    private clearReconnectTimer;
    private clearLivenessTimer;
    /**
     * (Re)start the dead-server watchdog. Inert until the first `$ping`
     * sets `livenessWindow` — a plain `app.websocket()` server that never
     * pings never arms it, so nothing changes for non-gateway servers.
     */
    private restartLivenessTimer;
    private rejectPendingAcks;
}

interface ConnectionState {
    isConnected: boolean;
    /** True during the initial connection AND during reconnect attempts. */
    isConnecting: boolean;
    error: Error | null;
}
interface SocketEntry extends ConnectionState {
    socket: RasenganSocket<any, any> | null;
    connect: () => void;
    disconnect: () => void;
}
interface RasenganIOProviderProps {
    /** Registry key for multi-socket apps. Default `'default'`. */
    name?: string;
    /** WebSocket endpoint, e.g. `ws://localhost:3000/chat`. */
    url: string;
    /** Reconnection/buffering options forwarded to `RasenganSocket`. */
    options?: RasenganSocketOptions;
    /** Connect as soon as the provider mounts. Default `true`. */
    autoConnect?: boolean;
    children: ReactNode;
}

/**
 * Owns one `RasenganSocket` (one WebSocket connection) and registers it
 * in the context under `name`, so nested providers compose into a
 * registry of named sockets. SSR-safe: the socket is only created in
 * the browser; on the server every hook sees a `null` socket.
 */
declare function RasenganIOProvider({ name, url, options, autoConnect, children, }: RasenganIOProviderProps): react.JSX.Element;

/**
 * The raw `RasenganSocket` registered under `name`, or `null` while it
 * doesn't exist (server-side render, or before the provider mounts).
 */
declare function useSocket<ServerEvents extends EventsMap = EventsMap, ClientEvents extends EventsMap = EventsMap>(name?: string): RasenganSocket<ServerEvents, ClientEvents> | null;

declare function useEvent<Events extends EventsMap, Event extends keyof Events & string>(event: Event, handler: Events[Event]): void;
declare function useEvent<Events extends EventsMap, Event extends keyof Events & string>(name: string, event: Event, handler: Events[Event]): void;

declare function useConnection(name?: string): {
    isConnected: boolean;
    isConnecting: boolean;
    error: Error;
    connect: () => void;
    disconnect: () => void;
};

/**
 * Typed `emit` bound to the socket registered under `name`. Emits are
 * buffered by the socket while the connection isn't open (see
 * `RasenganSocketOptions.emitBufferSize`), so calling this before the
 * connection settles is safe.
 */
declare function useEmit<ClientEvents extends EventsMap = EventsMap>(name?: string): <Event extends keyof ClientEvents & string>(event: Event, ...data: Parameters<ClientEvents[Event]>) => void;

/**
 * Typed request/response bound to the socket registered under `name` —
 * the hook form of `RasenganSocket.emitWithAck()`.
 *
 * The promise resolves with the gateway handler's return value and
 * rejects when the handler throws, the event is unknown, the timeout
 * passes (default 10s), the connection drops before the reply, or the
 * socket doesn't exist yet (SSR / provider not mounted). Unlike
 * `useEmit`, nothing is ever buffered while offline.
 *
 * ```tsx
 * const emitWithAck = useEmitWithAck<ClientEvents>();
 *
 * const handleJoin = async () => {
 *   try {
 *     const reply = await emitWithAck<'user:register', RegisterReply>(
 *       'user:register',
 *       { name }
 *     );
 *     setUsers(reply.users);
 *   } catch (error) {
 *     setError((error as Error).message);
 *   }
 * };
 * ```
 */
declare function useEmitWithAck<ClientEvents extends EventsMap = EventsMap>(name?: string): <Event extends keyof ClientEvents & string, Reply = unknown>(event: Event, data?: Parameters<ClientEvents[Event]>[0], options?: {
    timeout?: number;
}) => Promise<Reply>;

export { type ConnectionState, type EventsMap, RESERVED_EVENTS, RasenganIOProvider, type RasenganIOProviderProps, RasenganSocket, type RasenganSocketOptions, type ReservedEvent, type ReservedEventPayloads, type SocketEntry, type SocketStatus, useConnection, useEmit, useEmitWithAck, useEvent, useSocket };
