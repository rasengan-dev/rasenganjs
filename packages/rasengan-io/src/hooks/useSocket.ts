import { use } from 'react';
import { SocketContext } from '../contexts/socket.js';
import type { Socket } from '../types/index.js';

export function useSocket<ServerEvents = any, ClientEvents = any>(
  name: string = 'default'
): Socket<ServerEvents, ClientEvents> | null {
  const registry = use(SocketContext);
  return (
    (registry.get(name)?.socket as Socket<ServerEvents, ClientEvents>) ?? null
  );
}
