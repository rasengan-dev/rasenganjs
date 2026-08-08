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
export const RESERVED_EVENTS = [
  'connect',
  'disconnect',
  'error',
  'reconnecting',
  'reconnect_failed',
  'binary',
] as const;

export type ReservedEvent = (typeof RESERVED_EVENTS)[number];

export type SocketStatus =
  'idle' | 'connecting' | 'open' | 'reconnecting' | 'closed';

/**
 * Event-map style shared with the hooks: one payload argument per event.
 * Example: `{ 'chat:message': (data: { text: string }) => void }`
 */
export type EventsMap = Record<string, (data?: any) => void>;

export interface ReservedEventPayloads {
  connect: () => void;
  disconnect: (info: { code?: number; reason?: string }) => void;
  error: (error: Error) => void;
  reconnecting: (info: { attempt: number; delay: number }) => void;
  reconnect_failed: () => void;
  binary: (data: ArrayBuffer) => void;
}

export interface RasenganSocketOptions {
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

type ResolvedOptions = Required<Omit<RasenganSocketOptions, 'protocols'>> &
  Pick<RasenganSocketOptions, 'protocols'>;

const DEFAULTS: ResolvedOptions = {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  randomizationFactor: 0.5,
  emitBufferSize: 64,
  protocols: undefined,
};

export class RasenganSocket<
  ServerEvents extends EventsMap = EventsMap,
  ClientEvents extends EventsMap = EventsMap,
> {
  readonly url: string;

  private options: ResolvedOptions;
  private ws: WebSocket | null = null;
  private listeners = new Map<string, Set<(...args: any[]) => void>>();
  private buffer: string[] = [];
  private currentStatus: SocketStatus = 'idle';
  private attempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  /** True while a close was requested via `disconnect()` — no reconnect. */
  private intentionalClose = false;

  // ── Acks ──
  private ackCounter = 0;
  private pendingAcks = new Map<
    number,
    {
      resolve: (value: unknown) => void;
      reject: (reason: Error) => void;
      timer: ReturnType<typeof setTimeout>;
    }
  >();

  // ── Heartbeat liveness (armed by the first server $ping) ──
  private livenessWindow: number | null = null;
  private livenessTimer: ReturnType<typeof setTimeout> | null = null;
  /** The active connection's settle path — lets the liveness timer end a
   *  zombie session without waiting for a close handshake that a dead
   *  server will never answer. */
  private settleActive: ((code?: number, reason?: string) => void) | null =
    null;

  constructor(url: string, options: RasenganSocketOptions = {}) {
    this.url = url;
    this.options = { ...DEFAULTS, ...options };
  }

  get status(): SocketStatus {
    return this.currentStatus;
  }

  get isConnected(): boolean {
    return this.currentStatus === 'open';
  }

  // ── Lifecycle ─────────────────────────────────────────────────────

  /** Open the connection. No-op if already connecting/connected. */
  connect(): void {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.CONNECTING ||
        this.ws.readyState === WebSocket.OPEN)
    ) {
      return;
    }
    if (typeof WebSocket === 'undefined') {
      throw new Error(
        '[rasengan-io] No global WebSocket available. connect() must run ' +
          'in a browser (or a runtime with the Web Standard WebSocket class).'
      );
    }
    this.clearReconnectTimer();
    this.intentionalClose = false;
    this.attempts = 0;
    this.open('connecting');
  }

  /** Close the connection and stop any reconnection. */
  disconnect(code?: number, reason?: string): void {
    this.intentionalClose = true;
    this.clearReconnectTimer();
    this.clearLivenessTimer();
    this.livenessWindow = null;
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      this.ws.close(code, reason);
    } else {
      this.currentStatus = 'closed';
    }
  }

  // ── Messaging ─────────────────────────────────────────────────────

  /**
   * Send an `{ event, data }` envelope. While the socket isn't open the
   * frame is queued (bounded, see `emitBufferSize`) and flushed right
   * after the next successful connection.
   */
  emit<E extends keyof ClientEvents & string>(
    event: E,
    data?: Parameters<ClientEvents[E]>[0]
  ): void {
    const frame = JSON.stringify({ event, data });
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(frame);
      return;
    }
    if (this.options.emitBufferSize > 0) {
      this.buffer.push(frame);
      if (this.buffer.length > this.options.emitBufferSize) {
        this.buffer.shift();
      }
    }
  }

  /**
   * Send an `{ event, data, ackId }` envelope and resolve with the
   * server handler's return value (`$ack` reply). Rejects when the
   * handler throws, when the event is unknown to the gateway, on
   * timeout (default 10s), or when the connection drops before the
   * reply — a reply can't meaningfully arrive from another session,
   * so unlike `emit()` this NEVER buffers while offline.
   */
  emitWithAck<E extends keyof ClientEvents & string, Reply = unknown>(
    event: E,
    data?: Parameters<ClientEvents[E]>[0],
    options?: { timeout?: number }
  ): Promise<Reply> {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      return Promise.reject(
        new Error(
          `[rasengan-io] emitWithAck("${event}") requires an open connection.`
        )
      );
    }

    const ackId = ++this.ackCounter;
    const timeout = options?.timeout ?? 10_000;

    return new Promise<Reply>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingAcks.delete(ackId);
        reject(
          new Error(
            `[rasengan-io] Ack for "${event}" timed out after ${timeout}ms.`
          )
        );
      }, timeout);

      this.pendingAcks.set(ackId, {
        resolve: resolve as (value: unknown) => void,
        reject,
        timer,
      });
      this.ws!.send(JSON.stringify({ event, data, ackId }));
    });
  }

  /**
   * Listen to a server event (by envelope name) or a reserved lifecycle
   * event. @returns An unsubscribe function.
   */
  on<E extends keyof ServerEvents & string>(
    event: E,
    handler: ServerEvents[E]
  ): () => void;
  on<E extends ReservedEvent>(
    event: E,
    handler: ReservedEventPayloads[E]
  ): () => void;
  on(event: string, handler: (...args: any[]) => void): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: (...args: any[]) => void): void {
    this.listeners.get(event)?.delete(handler);
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }

  // ── Internals ─────────────────────────────────────────────────────

  private open(status: 'connecting' | 'reconnecting'): void {
    this.currentStatus = status;

    const ws = this.options.protocols
      ? new WebSocket(this.url, this.options.protocols)
      : new WebSocket(this.url);
    ws.binaryType = 'arraybuffer';
    this.ws = ws;

    ws.onopen = () => {
      this.attempts = 0;
      this.currentStatus = 'open';
      this.flushBuffer();
      this.dispatch('connect');
    };

    ws.onmessage = (e: MessageEvent) => {
      // Once heartbeats are armed, any inbound frame proves liveness.
      this.restartLivenessTimer();

      if (typeof e.data !== 'string') {
        this.dispatch('binary', e.data);
        return;
      }
      let envelope: {
        event?: unknown;
        data?: unknown;
        ackId?: unknown;
        error?: { message?: string };
      };
      try {
        envelope = JSON.parse(e.data);
      } catch {
        this.dispatch(
          'error',
          new Error('[rasengan-io] Received a non-envelope text frame.')
        );
        return;
      }
      if (typeof envelope?.event !== 'string') {
        this.dispatch(
          'error',
          new Error('[rasengan-io] Received a frame without an event name.')
        );
        return;
      }

      // ── Protocol frames, handled internally, never dispatched ──
      if (envelope.event === '$ping') {
        // Learn the server's cadence: the next frame must arrive within
        // interval + timeout, exactly the server's own deadline for us.
        const info = envelope.data as { interval?: number; timeout?: number };
        this.livenessWindow =
          (info?.interval ?? 25_000) + (info?.timeout ?? 20_000);
        this.restartLivenessTimer();
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ event: '$pong', data: undefined }));
        }
        return;
      }
      if (envelope.event === '$ack') {
        const pending =
          typeof envelope.ackId === 'number'
            ? this.pendingAcks.get(envelope.ackId)
            : undefined;
        if (pending) {
          this.pendingAcks.delete(envelope.ackId as number);
          clearTimeout(pending.timer);
          if (envelope.error) {
            pending.reject(
              new Error(envelope.error.message ?? 'Ack failed on the server.')
            );
          } else {
            pending.resolve(envelope.data);
          }
        }
        return;
      }

      this.dispatch(envelope.event, envelope.data);
    };

    // Runs exactly once per WebSocket instance, whether the end is
    // signalled by `close`, by `error`, or by both in either order.
    let settled = false;
    const settle = (code?: number, reason?: string) => {
      if (settled) return;
      settled = true;

      const wasOpen = this.currentStatus === 'open';
      this.ws = null;
      this.clearLivenessTimer();
      // A reply can't arrive from a session that just ended.
      this.rejectPendingAcks(
        new Error('[rasengan-io] Connection closed before the ack arrived.')
      );

      if (wasOpen) {
        this.dispatch('disconnect', { code, reason });
      }

      if (this.intentionalClose || !this.options.reconnection) {
        this.currentStatus = 'closed';
        return;
      }
      this.scheduleReconnect();
    };
    this.settleActive = settle;

    ws.onclose = (e: CloseEvent) => settle(e.code, e.reason);

    // Browsers hide error details and always follow with `close`. Node's
    // undici-based WebSocket does NOT fire `close` when the TCP connect
    // itself fails (and still reports CONNECTING at error time) — so a
    // never-opened socket must settle from here. When the session was
    // open (OPEN/CLOSING), the imminent `close` settles instead so the
    // `disconnect` event keeps its close code and reason.
    ws.onerror = () => {
      this.dispatch('error', new Error('[rasengan-io] WebSocket error.'));
      if (
        ws.readyState !== WebSocket.OPEN &&
        ws.readyState !== WebSocket.CLOSING
      ) {
        settle();
      }
    };
  }

  private scheduleReconnect(): void {
    if (this.attempts >= this.options.reconnectionAttempts) {
      this.currentStatus = 'closed';
      this.dispatch('reconnect_failed');
      return;
    }
    this.attempts++;

    const base = Math.min(
      this.options.reconnectionDelayMax,
      this.options.reconnectionDelay * 2 ** (this.attempts - 1)
    );
    const delay = Math.max(
      0,
      Math.round(base - Math.random() * base * this.options.randomizationFactor)
    );

    this.currentStatus = 'reconnecting';
    this.dispatch('reconnecting', { attempt: this.attempts, delay });
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.open('reconnecting');
    }, delay);
  }

  private flushBuffer(): void {
    if (this.buffer.length === 0) return;
    const pending = this.buffer;
    this.buffer = [];
    for (const frame of pending) {
      // Guarded send — the socket could close mid-flush; re-buffer the rest.
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(frame);
      } else {
        this.buffer.push(frame);
      }
    }
  }

  private dispatch(event: string, ...args: any[]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    // Copy before iterating — a handler may unsubscribe itself (or others).
    for (const handler of [...set]) {
      handler(...args);
    }
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private clearLivenessTimer(): void {
    if (this.livenessTimer !== null) {
      clearTimeout(this.livenessTimer);
      this.livenessTimer = null;
    }
  }

  /**
   * (Re)start the dead-server watchdog. Inert until the first `$ping`
   * sets `livenessWindow` — a plain `app.websocket()` server that never
   * pings never arms it, so nothing changes for non-gateway servers.
   */
  private restartLivenessTimer(): void {
    this.clearLivenessTimer();
    if (this.livenessWindow === null) return;

    this.livenessTimer = setTimeout(() => {
      this.livenessTimer = null;
      const zombie = this.ws;
      // Settle first (dispatch disconnect, reject acks, schedule the
      // reconnect) — a dead server never answers a close handshake, so
      // waiting for its close event could stall for minutes.
      this.settleActive?.(4001, 'heartbeat timeout');
      if (zombie) {
        try {
          zombie.close();
        } catch {
          // The socket may already be unusable — that's the point.
        }
      }
    }, this.livenessWindow);
  }

  private rejectPendingAcks(reason: Error): void {
    for (const pending of this.pendingAcks.values()) {
      clearTimeout(pending.timer);
      pending.reject(reason);
    }
    this.pendingAcks.clear();
  }
}
