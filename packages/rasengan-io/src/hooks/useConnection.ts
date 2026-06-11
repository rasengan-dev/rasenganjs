import { use } from 'react';
import { SocketContext } from '../contexts/socket.js';

export function useConnection(name: string = 'default') {
  const registry = use(SocketContext);
  const entry = registry.get(name);

  return {
    isConnected: entry?.isConnected ?? false,
    isConnecting: entry?.isConnecting ?? false,
    error: entry?.error ?? null,
    connect: entry?.connect ?? (() => {}),
    disconnect: entry?.disconnect ?? (() => {}),
  };
}
