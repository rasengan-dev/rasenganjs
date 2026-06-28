import { useEffect, useMemo, useState, useCallback, use, useRef } from 'react';
import { io } from 'socket.io-client';
import { SocketContext } from '../contexts/socket.js';
import { isBrowser } from '../utils/index.js';
import type { RasenganIOProviderProps, SocketEntry } from '../types/index.js';

export function RasenganIOProvider({
  name = 'default',
  url,
  options = {},
  autoConnect = true,
  children,
}: RasenganIOProviderProps) {
  const parentRegistry = use(SocketContext);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const autoConnectRef = useRef(autoConnect);
  autoConnectRef.current = autoConnect;

  useEffect(() => {
    if (!isBrowser) return;

    const instance = io(url, {
      autoConnect: false,
      ...optionsRef.current,
    });

    setSocket(instance);

    if (autoConnectRef.current) {
      setIsConnecting(true);
      instance.connect();
    }

    instance.on('connect', () => {
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
    });

    instance.on('disconnect', () => {
      setIsConnected(false);
      setIsConnecting(false);
    });

    instance.on('connect_error', (err) => {
      setError(err);
      setIsConnecting(false);
    });

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
    socket?.connect();
  }, [socket]);

  const disconnect = useCallback(() => {
    socket?.disconnect();
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
