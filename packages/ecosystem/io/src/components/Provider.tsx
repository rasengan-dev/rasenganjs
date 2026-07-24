import { useEffect, useMemo, useState, useCallback, use, useRef } from 'react';
import { RasenganSocket } from '../core/socket.js';
import { SocketContext } from '../contexts/socket.js';
import { isBrowser } from '../utils/index.js';
import type { RasenganIOProviderProps, SocketEntry } from '../types/index.js';

/**
 * Owns one `RasenganSocket` (one WebSocket connection) and registers it
 * in the context under `name`, so nested providers compose into a
 * registry of named sockets. SSR-safe: the socket is only created in
 * the browser; on the server every hook sees a `null` socket.
 */
export function RasenganIOProvider({
  name = 'default',
  url,
  options = {},
  autoConnect = true,
  children,
}: RasenganIOProviderProps) {
  const parentRegistry = use(SocketContext);
  const [socket, setSocket] = useState<RasenganSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const autoConnectRef = useRef(autoConnect);
  autoConnectRef.current = autoConnect;

  useEffect(() => {
    if (!isBrowser) return;

    const instance = new RasenganSocket(url, optionsRef.current);
    setSocket(instance);

    instance.on('connect', () => {
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
    });

    instance.on('disconnect', () => {
      setIsConnected(false);
    });

    // Fired for the initial connection failure AND before every retry —
    // the socket is actively trying, so the UI should say "connecting".
    instance.on('reconnecting', () => {
      setIsConnecting(true);
    });

    instance.on('reconnect_failed', () => {
      setIsConnecting(false);
    });

    instance.on('error', (err) => {
      setError(err);
    });

    if (autoConnectRef.current) {
      setIsConnecting(true);
      instance.connect();
    }

    return () => {
      instance.removeAllListeners();
      instance.disconnect();
      setSocket(null);
      setIsConnected(false);
      setIsConnecting(false);
      setError(null);
    };
  }, [url]);

  const connect = useCallback(() => {
    if (!socket) return;
    setIsConnecting(true);
    socket.connect();
  }, [socket]);

  const disconnect = useCallback(() => {
    socket?.disconnect();
    setIsConnecting(false);
  }, [socket]);

  const entry = useMemo<SocketEntry>(
    () => ({
      socket,
      isConnected,
      isConnecting,
      error,
      connect,
      disconnect,
    }),
    [socket, isConnected, isConnecting, error, connect, disconnect]
  );

  const registry = useMemo(() => {
    const map = new Map(parentRegistry);
    map.set(name, entry);
    return map;
  }, [parentRegistry, entry, name]);

  return <SocketContext value={registry}>{children}</SocketContext>;
}
