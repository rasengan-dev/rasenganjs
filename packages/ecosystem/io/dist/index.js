// src/components/Provider.tsx
import { useEffect, useMemo, useState, useCallback, use, useRef } from "react";

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
  const connect = useCallback(() => {
    if (!socket) return;
    setIsConnecting(true);
    socket.connect();
  }, [socket]);
  const disconnect = useCallback(() => {
    socket?.disconnect();
    setIsConnecting(false);
  }, [socket]);
  const entry = useMemo(
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
  const handlerRef = useRef2(handler);
  handlerRef.current = handler;
  useEffect2(() => {
    if (!socket) return;
    return socket.on(event, (data) => {
      handlerRef.current(data);
    });
  }, [socket, event]);
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
  return (event, ...data) => {
    socket?.emit(event, data[0]);
  };
}
export {
  RESERVED_EVENTS,
  RasenganIOProvider,
  RasenganSocket,
  useConnection,
  useEmit,
  useEvent,
  useSocket
};
