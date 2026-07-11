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
  RESERVED_EVENTS: () => RESERVED_EVENTS,
  RasenganIOProvider: () => RasenganIOProvider,
  RasenganSocket: () => RasenganSocket,
  useConnection: () => useConnection,
  useEmit: () => useEmit,
  useEvent: () => useEvent,
  useSocket: () => useSocket
});
module.exports = __toCommonJS(src_exports);

// src/components/Provider.tsx
var import_react2 = require("react");

// src/core/socket.ts
var RESERVED_EVENTS = [
  "connect",
  "disconnect",
  "error",
  "reconnecting",
  "reconnect_failed",
  "binary"
];
var DEFAULTS = {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1e3,
  reconnectionDelayMax: 1e4,
  randomizationFactor: 0.5,
  emitBufferSize: 64,
  protocols: void 0
};
var RasenganSocket = class {
  url;
  options;
  ws = null;
  listeners = /* @__PURE__ */ new Map();
  buffer = [];
  currentStatus = "idle";
  attempts = 0;
  reconnectTimer = null;
  /** True while a close was requested via `disconnect()` — no reconnect. */
  intentionalClose = false;
  constructor(url, options = {}) {
    this.url = url;
    this.options = { ...DEFAULTS, ...options };
  }
  get status() {
    return this.currentStatus;
  }
  get isConnected() {
    return this.currentStatus === "open";
  }
  // ── Lifecycle ─────────────────────────────────────────────────────
  /** Open the connection. No-op if already connecting/connected. */
  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
      return;
    }
    if (typeof WebSocket === "undefined") {
      throw new Error(
        "[rasengan-io] No global WebSocket available. connect() must run in a browser (or a runtime with the Web Standard WebSocket class)."
      );
    }
    this.clearReconnectTimer();
    this.intentionalClose = false;
    this.attempts = 0;
    this.open("connecting");
  }
  /** Close the connection and stop any reconnection. */
  disconnect(code, reason) {
    this.intentionalClose = true;
    this.clearReconnectTimer();
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      this.ws.close(code, reason);
    } else {
      this.currentStatus = "closed";
    }
  }
  // ── Messaging ─────────────────────────────────────────────────────
  /**
   * Send an `{ event, data }` envelope. While the socket isn't open the
   * frame is queued (bounded, see `emitBufferSize`) and flushed right
   * after the next successful connection.
   */
  emit(event, data) {
    const frame = JSON.stringify({ event, data });
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(frame);
      return;
    }
    if (this.options.emitBufferSize > 0) {
      this.buffer.push(frame);
      if (this.buffer.length > this.options.emitBufferSize) {
        this.buffer.shift();
      }
    }
  }
  on(event, handler) {
    let set = this.listeners.get(event);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      this.listeners.set(event, set);
    }
    set.add(handler);
    return () => this.off(event, handler);
  }
  off(event, handler) {
    this.listeners.get(event)?.delete(handler);
  }
  removeAllListeners() {
    this.listeners.clear();
  }
  // ── Internals ─────────────────────────────────────────────────────
  open(status) {
    this.currentStatus = status;
    const ws = this.options.protocols ? new WebSocket(this.url, this.options.protocols) : new WebSocket(this.url);
    ws.binaryType = "arraybuffer";
    this.ws = ws;
    ws.onopen = () => {
      this.attempts = 0;
      this.currentStatus = "open";
      this.flushBuffer();
      this.dispatch("connect");
    };
    ws.onmessage = (e) => {
      if (typeof e.data !== "string") {
        this.dispatch("binary", e.data);
        return;
      }
      let envelope;
      try {
        envelope = JSON.parse(e.data);
      } catch {
        this.dispatch(
          "error",
          new Error("[rasengan-io] Received a non-envelope text frame.")
        );
        return;
      }
      if (typeof envelope?.event !== "string") {
        this.dispatch(
          "error",
          new Error("[rasengan-io] Received a frame without an event name.")
        );
        return;
      }
      this.dispatch(envelope.event, envelope.data);
    };
    let settled = false;
    const settle = (code, reason) => {
      if (settled) return;
      settled = true;
      const wasOpen = this.currentStatus === "open";
      this.ws = null;
      if (wasOpen) {
        this.dispatch("disconnect", { code, reason });
      }
      if (this.intentionalClose || !this.options.reconnection) {
        this.currentStatus = "closed";
        return;
      }
      this.scheduleReconnect();
    };
    ws.onclose = (e) => settle(e.code, e.reason);
    ws.onerror = () => {
      this.dispatch("error", new Error("[rasengan-io] WebSocket error."));
      if (ws.readyState !== WebSocket.OPEN && ws.readyState !== WebSocket.CLOSING) {
        settle();
      }
    };
  }
  scheduleReconnect() {
    if (this.attempts >= this.options.reconnectionAttempts) {
      this.currentStatus = "closed";
      this.dispatch("reconnect_failed");
      return;
    }
    this.attempts++;
    const base = Math.min(
      this.options.reconnectionDelayMax,
      this.options.reconnectionDelay * 2 ** (this.attempts - 1)
    );
    const delay = Math.max(
      0,
      Math.round(base - Math.random() * base * this.options.randomizationFactor)
    );
    this.currentStatus = "reconnecting";
    this.dispatch("reconnecting", { attempt: this.attempts, delay });
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.open("reconnecting");
    }, delay);
  }
  flushBuffer() {
    if (this.buffer.length === 0) return;
    const pending = this.buffer;
    this.buffer = [];
    for (const frame of pending) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(frame);
      } else {
        this.buffer.push(frame);
      }
    }
  }
  dispatch(event, ...args) {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const handler of [...set]) {
      handler(...args);
    }
  }
  clearReconnectTimer() {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
};

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
    const instance = new RasenganSocket(url, optionsRef.current);
    setSocket(instance);
    instance.on("connect", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
    });
    instance.on("disconnect", () => {
      setIsConnected(false);
    });
    instance.on("reconnecting", () => {
      setIsConnecting(true);
    });
    instance.on("reconnect_failed", () => {
      setIsConnecting(false);
    });
    instance.on("error", (err) => {
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
  const connect = (0, import_react2.useCallback)(() => {
    if (!socket) return;
    setIsConnecting(true);
    socket.connect();
  }, [socket]);
  const disconnect = (0, import_react2.useCallback)(() => {
    socket?.disconnect();
    setIsConnecting(false);
  }, [socket]);
  const entry = (0, import_react2.useMemo)(
    () => ({
      socket,
      isConnected,
      isConnecting,
      error,
      connect,
      disconnect
    }),
    [socket, isConnected, isConnecting, error, connect, disconnect]
  );
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
function useEvent(nameOrEvent, eventOrHandler, maybeHandler) {
  let name = "default";
  let event;
  let handler;
  if (typeof eventOrHandler === "string") {
    name = nameOrEvent;
    event = eventOrHandler;
    handler = maybeHandler;
  } else {
    event = nameOrEvent;
    handler = eventOrHandler;
  }
  const socket = useSocket(name);
  const handlerRef = (0, import_react4.useRef)(handler);
  handlerRef.current = handler;
  (0, import_react4.useEffect)(() => {
    if (!socket) return;
    return socket.on(event, (data) => {
      handlerRef.current(data);
    });
  }, [socket, event]);
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
  return (event, ...data) => {
    socket?.emit(event, data[0]);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RESERVED_EVENTS,
  RasenganIOProvider,
  RasenganSocket,
  useConnection,
  useEmit,
  useEvent,
  useSocket
});
