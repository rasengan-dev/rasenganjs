import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { ManagerOptions, SocketOptions, Socket } from 'socket.io-client';
export { Socket } from 'socket.io-client';

interface ConnectionState {
    isConnected: boolean;
    isConnecting: boolean;
    error: Error | null;
}
interface RasenganIOProviderProps {
    name?: string;
    url: string;
    options?: Partial<ManagerOptions & SocketOptions>;
    autoConnect?: boolean;
    children: ReactNode;
}

declare function RasenganIOProvider({ name, url, options, autoConnect, children, }: RasenganIOProviderProps): react_jsx_runtime.JSX.Element;

declare function useSocket<ServerEvents = any, ClientEvents = any>(name?: string): Socket<ServerEvents, ClientEvents> | null;

declare function useEvent<Events extends Record<string, (...args: any[]) => void>, Event extends keyof Events>(event: Event, handler: Events[Event], deps?: any[]): void;
declare function useEvent<Events extends Record<string, (...args: any[]) => void>, Event extends keyof Events>(name: string, event: Event, handler: Events[Event], deps?: any[]): void;

declare function useConnection(name?: string): {
    isConnected: boolean;
    isConnecting: boolean;
    error: Error;
    connect: () => void;
    disconnect: () => void;
};

declare function useEmit<ClientEvents = any>(name?: string): <Event extends keyof ClientEvents & string>(event: Event, ...args: ClientEvents[Event] extends (...args: infer A) => any ? A : never) => void;

export { type ConnectionState, RasenganIOProvider, type RasenganIOProviderProps, useConnection, useEmit, useEvent, useSocket };
