import { use } from 'react';
import { SocketContext } from '../contexts/socket.js';
import type { EventsMap, RasenganSocket } from '../core/socket.js';

/**
 * The raw `RasenganSocket` registered under `name`, or `null` while it
 * doesn't exist (server-side render, or before the provider mounts).
 */
export function useSocket<
  ServerEvents extends EventsMap = EventsMap,
  ClientEvents extends EventsMap = EventsMap,
>(name: string = 'default'): RasenganSocket<ServerEvents, ClientEvents> | null {
  const registry = use(SocketContext);
  return (
    (registry.get(name)?.socket as RasenganSocket<
      ServerEvents,
      ClientEvents
    >) ?? null
  );
}
