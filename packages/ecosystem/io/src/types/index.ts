import type { ReactNode } from 'react';
import type {
  EventsMap,
  RasenganSocket,
  RasenganSocketOptions,
  SocketStatus,
} from '../core/socket.js';

export type { EventsMap, RasenganSocketOptions, SocketStatus };

export interface ConnectionState {
  isConnected: boolean;
  /** True during the initial connection AND during reconnect attempts. */
  isConnecting: boolean;
  error: Error | null;
}

export interface SocketEntry extends ConnectionState {
  socket: RasenganSocket<any, any> | null;
  connect: () => void;
  disconnect: () => void;
}

export interface RasenganIOProviderProps {
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
