// src/components/Provider.tsx
import { useEffect, useMemo, useState, useCallback, use, useRef } from "react";
import { io } from "socket.io-client";

// src/contexts/socket.ts
import { createContext } from "react";
var SocketContext = createContext(/* @__PURE__ */ new Map());

// src/utils/index.ts
var isBrowser = typeof window !== "undefined";

// src/components/Provider.tsx
import { jsx } from "react/jsx-runtime";
function RasenganIOProvider({
  name = "default",
  url,
  options = {},
  autoConnect = true,
  children
}) {
  const parentRegistry = use(SocketContext);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const autoConnectRef = useRef(autoConnect);
  autoConnectRef.current = autoConnect;
  useEffect(() => {
    if (!isBrowser) return;
    const instance = io(url, {
      autoConnect: false,
      ...optionsRef.current
    });
    setSocket(instance);
    if (autoConnectRef.current) {
      setIsConnecting(true);
      instance.connect();
    }
    instance.on("connect", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
    });
    instance.on("disconnect", () => {
      setIsConnected(false);
      setIsConnecting(false);
    });
    instance.on("connect_error", (err) => {
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
  const entry = useMemo(() => ({
    socket,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect
  }), [socket, isConnected, isConnecting, error, connect, disconnect]);
  const registry = useMemo(() => {
    const map = new Map(parentRegistry);
    map.set(name, entry);
    return map;
  }, [parentRegistry, entry, name]);
  return /* @__PURE__ */ jsx(SocketContext, { value: registry, children });
}

// src/hooks/useSocket.ts
import { use as use2 } from "react";
function useSocket(name = "default") {
  const registry = use2(SocketContext);
  return registry.get(name)?.socket ?? null;
}

// src/hooks/useEvent.ts
import { useEffect as useEffect2, useRef as useRef2 } from "react";
function useEvent(nameOrEvent, eventOrHandler, handlerOrDeps, deps) {
  let name = "default";
  let event;
  let handler;
  if (typeof eventOrHandler === "string") {
    name = nameOrEvent;
    event = eventOrHandler;
    handler = handlerOrDeps;
  } else {
    event = nameOrEvent;
    handler = eventOrHandler;
    deps = handlerOrDeps;
  }
  const socket = useSocket(name);
  const handlerRef = useRef2(handler);
  handlerRef.current = handler;
  useEffect2(() => {
    if (!socket) return;
    const listener = (...args) => {
      handlerRef.current(...args);
    };
    socket.on(event, listener);
    return () => {
      socket.off(event, listener);
    };
  }, [socket, event, ...deps ?? []]);
}

// src/hooks/useConnection.ts
import { use as use3 } from "react";
function useConnection(name = "default") {
  const registry = use3(SocketContext);
  const entry = registry.get(name);
  return {
    isConnected: entry?.isConnected ?? false,
    isConnecting: entry?.isConnecting ?? false,
    error: entry?.error ?? null,
    connect: entry?.connect ?? (() => {
    }),
    disconnect: entry?.disconnect ?? (() => {
    })
  };
}

// src/hooks/useEmit.ts
function useEmit(name = "default") {
  const socket = useSocket(name);
  return (event, ...args) => {
    socket?.emit(event, ...args);
  };
}
export {
  RasenganIOProvider,
  useConnection,
  useEmit,
  useEvent,
  useSocket
};
