import type { ReactNode } from 'react';
import type { Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

export type { Socket };

export interface ConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}

export interface SocketEntry {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  connect: () => void;
  disconnect: () => void;
}

export interface RasenganIOProviderProps {
  name?: string;
  url: string;
  options?: Partial<ManagerOptions & SocketOptions>;
  autoConnect?: boolean;
  children: ReactNode;
}
