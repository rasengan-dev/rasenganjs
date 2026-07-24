import type { WebSocketConnection } from '@rasenganjs/server';
import type {
  Broadcaster,
  GatewayAdapter,
  GatewayClient,
  GatewayServer,
} from './types.js';

/**
 * Per-connection state a gateway's runtime tracks locally (never shared
 * across processes — see the design note on `GatewayAdapter`).
 *
 * `client` is constructed once in `open()` and reused for every later
 * `message()`/`close()` call on the same connection — constructing a
 * fresh `GatewayClient` per call would silently lose anything the
 * gateway wrote to `client.data` in `onConnect`.
 */
export interface LocalClientEntry {
  connection: WebSocketConnection;
  rooms: Set<string>;
  data: Record<string, unknown>;
  client: GatewayClient;
  /** Timestamp of the last inbound frame — the heartbeat's liveness signal. */
  lastSeen: number;
}

/**
 * A parsed wire frame. `ackId` (client-chosen) asks for a `$ack` reply
 * carrying the handler's return value; `error` marks a failed `$ack`.
 */
export interface Envelope {
  event: string;
  data: unknown;
  ackId?: number;
  error?: { message: string };
}

/** Serialize an event/data pair into this package's `{ event, data }` wire envelope. */
export function serializeEnvelope(
  event: string,
  data: unknown,
  extra?: { ackId?: number; error?: { message: string } }
): string {
  return JSON.stringify({ event, data, ...extra });
}

/**
 * Parse an incoming text frame as `{ event, data, ackId?, error? }`.
 * @returns `null` if the frame isn't valid JSON or lacks a string `event`.
 */
export function parseEnvelope(raw: string): Envelope | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (
    parsed &&
    typeof parsed === 'object' &&
    typeof (parsed as { event?: unknown }).event === 'string'
  ) {
    const { event, data, ackId } = parsed as Envelope;
    return {
      event,
      data,
      ...(typeof ackId === 'number' ? { ackId } : {}),
    };
  }
  return null;
}

function createBroadcaster(
  adapter: GatewayAdapter,
  channel: string,
  room: string | undefined,
  excludeClientId: string | undefined
): Broadcaster {
  return {
    emit: (event, data) =>
      adapter.publish(channel, { event, data, room, excludeClientId }),
  };
}

/**
 * Build the `GatewayClient` for a new connection. Call exactly once per
 * connection (in the `open` handler) — see `LocalClientEntry`.
 */
export function createGatewayClient(
  id: string,
  request: Request,
  entry: LocalClientEntry,
  channel: string,
  adapter: GatewayAdapter
): GatewayClient {
  return {
    id,
    request,
    get data() {
      return entry.data;
    },
    set data(value: Record<string, unknown>) {
      entry.data = value;
    },
    join(room: string) {
      entry.rooms.add(room);
    },
    leave(room: string) {
      entry.rooms.delete(room);
    },
    rooms() {
      return [...entry.rooms];
    },
    emit(event: string, data: unknown) {
      entry.connection.send(serializeEnvelope(event, data));
    },
    to(room: string) {
      return createBroadcaster(adapter, channel, room, id);
    },
    get broadcast() {
      return createBroadcaster(adapter, channel, undefined, id);
    },
    disconnect(code?: number, reason?: string) {
      entry.connection.close(code, reason);
    },
  };
}

/** Build the gateway-level `server` handle (broadcasts, no sender to exclude). */
export function createGatewayServer(
  channel: string,
  adapter: GatewayAdapter
): GatewayServer {
  return {
    to(room: string) {
      return createBroadcaster(adapter, channel, room, undefined);
    },
    emit(event: string, data: unknown) {
      return adapter.publish(channel, { event, data });
    },
  };
}

/**
 * Deliver a relayed `BroadcastMessage` to this process's local clients on
 * one gateway — the actual send always happens here, uniformly for both
 * same-process and cross-process (Redis-relayed) broadcasts, since both
 * paths go through `GatewayAdapter.subscribe()`.
 */
export function deliverLocally(
  localClients: Map<string, LocalClientEntry>,
  message: {
    event: string;
    data: unknown;
    room?: string;
    excludeClientId?: string;
  }
): void {
  const payload = serializeEnvelope(message.event, message.data);
  for (const [id, entry] of localClients) {
    if (id === message.excludeClientId) continue;
    if (message.room && !entry.rooms.has(message.room)) continue;
    entry.connection.send(payload);
  }
}
