var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  RasenganIOProvider: () => RasenganIOProvider,
  useConnection: () => useConnection,
  useEmit: () => useEmit,
  useEvent: () => useEvent,
  useSocket: () => useSocket
});
module.exports = __toCommonJS(src_exports);

// src/components/Provider.tsx
var import_react2 = require("react");
var import_socket = require("socket.io-client");

// src/contexts/socket.ts
var import_react = require("react");
var SocketContext = (0, import_react.createContext)(/* @__PURE__ */ new Map());

// src/utils/index.ts
var isBrowser = typeof window !== "undefined";

// src/components/Provider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function RasenganIOProvider({
  name = "default",
  url,
  options = {},
  autoConnect = true,
  children
}) {
  const parentRegistry = (0, import_react2.use)(SocketContext);
  const [socket, setSocket] = (0, import_react2.useState)(null);
  const [isConnected, setIsConnected] = (0, import_react2.useState)(false);
  const [isConnecting, setIsConnecting] = (0, import_react2.useState)(false);
  const [error, setError] = (0, import_react2.useState)(null);
  const optionsRef = (0, import_react2.useRef)(options);
  optionsRef.current = options;
  const autoConnectRef = (0, import_react2.useRef)(autoConnect);
  autoConnectRef.current = autoConnect;
  (0, import_react2.useEffect)(() => {
    if (!isBrowser) return;
    const instance = (0, import_socket.io)(url, {
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
  const connect = (0, import_react2.useCallback)(() => {
    socket?.connect();
  }, [socket]);
  const disconnect = (0, import_react2.useCallback)(() => {
    socket?.disconnect();
  }, [socket]);
  const entry = (0, import_react2.useMemo)(() => ({
    socket,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect
  }), [socket, isConnected, isConnecting, error, connect, disconnect]);
  const registry = (0, import_react2.useMemo)(() => {
    const map = new Map(parentRegistry);
    map.set(name, entry);
    return map;
  }, [parentRegistry, entry, name]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocketContext, { value: registry, children });
}

// src/hooks/useSocket.ts
var import_react3 = require("react");
function useSocket(name = "default") {
  const registry = (0, import_react3.use)(SocketContext);
  return registry.get(name)?.socket ?? null;
}

// src/hooks/useEvent.ts
var import_react4 = require("react");
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
  const handlerRef = (0, import_react4.useRef)(handler);
  handlerRef.current = handler;
  (0, import_react4.useEffect)(() => {
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
var import_react5 = require("react");
function useConnection(name = "default") {
  const registry = (0, import_react5.use)(SocketContext);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RasenganIOProvider,
  useConnection,
  useEmit,
  useEvent,
  useSocket
});
