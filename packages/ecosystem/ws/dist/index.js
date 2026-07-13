// src/gateway.ts
var Gateway = class {
  /**
   * Handle for broadcasting from outside any connection's context
   * (an HTTP controller, a timer, ...). Set by the plugin after this
   * gateway is resolved — never construct this yourself.
   */
  server;
};
var GatewayRouter = class {
  handlers = /* @__PURE__ */ new Map();
  /**
   * Register a handler for one event name, parsed out of the
   * `{ event, data }` envelope on incoming text messages.
   *
   * When the incoming frame carries an `ackId` (a client
   * `emitWithAck()`), the handler's awaited return value is sent back
   * as the `$ack` reply, and a thrown error rejects the client's
   * promise. Frames without an `ackId` ignore the return value.
   *
   * @throws If `event` is already registered on this gateway, or if it
   *         starts with `$` (reserved for the protocol: `$error`,
   *         `$ping`, `$pong`, `$ack`).
   */
  on(event, handler) {
    if (event.startsWith("$")) {
      throw new Error(
        `[rasengan-ws] Event "${event}" is reserved \u2014 "$"-prefixed names belong to the protocol.`
      );
    }
    if (this.handlers.has(event)) {
      throw new Error(
        `[rasengan-ws] Event "${event}" is already registered on this gateway.`
      );
    }
    this.handlers.set(event, handler);
  }
  /** @internal Consumed by `createWsPlugin` after `Gateway.messages()` runs. */
  getHandlers() {
    return this.handlers;
  }
};

// src/adapters/memory.ts
var MemoryGatewayAdapter = class {
  subscribers = /* @__PURE__ */ new Map();
  async publish(channel, message) {
    const subs = this.subscribers.get(channel);
    if (!subs) return;
    for (const onMessage of subs) {
      onMessage(message);
    }
  }
  subscribe(channel, onMessage) {
    let subs = this.subscribers.get(channel);
    if (!subs) {
      subs = /* @__PURE__ */ new Set();
      this.subscribers.set(channel, subs);
    }
    subs.add(onMessage);
    return () => {
      subs.delete(onMessage);
      if (subs.size === 0) {
        this.subscribers.delete(channel);
      }
    };
  }
};

// src/client.ts
function serializeEnvelope(event, data, extra) {
  return JSON.stringify({ event, data, ...extra });
}
function parseEnvelope(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (parsed && typeof parsed === "object" && typeof parsed.event === "string") {
    const { event, data, ackId } = parsed;
    return {
      event,
      data,
      ...typeof ackId === "number" ? { ackId } : {}
    };
  }
  return null;
}
function createBroadcaster(adapter, channel, room, excludeClientId) {
  return {
    emit: (event, data) => adapter.publish(channel, { event, data, room, excludeClientId })
  };
}
function createGatewayClient(id, request, entry, channel, adapter) {
  return {
    id,
    request,
    get data() {
      return entry.data;
    },
    set data(value) {
      entry.data = value;
    },
    join(room) {
      entry.rooms.add(room);
    },
    leave(room) {
      entry.rooms.delete(room);
    },
    rooms() {
      return [...entry.rooms];
    },
    emit(event, data) {
      entry.connection.send(serializeEnvelope(event, data));
    },
    to(room) {
      return createBroadcaster(adapter, channel, room, id);
    },
    get broadcast() {
      return createBroadcaster(adapter, channel, void 0, id);
    },
    disconnect(code, reason) {
      entry.connection.close(code, reason);
    }
  };
}
function createGatewayServer(channel, adapter) {
  return {
    to(room) {
      return createBroadcaster(adapter, channel, room, void 0);
    },
    emit(event, data) {
      return adapter.publish(channel, { event, data });
    }
  };
}
function deliverLocally(localClients, message) {
  const payload = serializeEnvelope(message.event, message.data);
  for (const [id, entry] of localClients) {
    if (id === message.excludeClientId) continue;
    if (message.room && !entry.rooms.has(message.room)) continue;
    entry.connection.send(payload);
  }
}

// src/plugin.ts
var ERROR_EVENT = "$error";
var HEARTBEAT_CLOSE_CODE = 4001;
var HEARTBEAT_DEFAULTS = {
  interval: 25e3,
  timeout: 2e4
};
function resolveHeartbeat(option) {
  if (option === false) return null;
  if (option === true || option === void 0) return HEARTBEAT_DEFAULTS;
  return { ...HEARTBEAT_DEFAULTS, ...option };
}
function createWsPlugin(options = {}) {
  const adapter = options.adapter ?? new MemoryGatewayAdapter();
  const heartbeat = resolveHeartbeat(options.heartbeat);
  return {
    key: "gateways",
    register(app, container, _mod, value) {
      const gatewayClasses = value;
      for (const gatewayClass of gatewayClasses) {
        registerGateway(app, container, gatewayClass, adapter, heartbeat);
      }
    }
  };
}
function registerGateway(app, container, gatewayClass, adapter, heartbeat) {
  const instance = container.resolve(gatewayClass);
  if (!(instance instanceof Gateway)) {
    throw new Error(
      `[rasengan-ws] "${gatewayClass.name}" is registered under \`gateways\` but does not extend \`Gateway\`.`
    );
  }
  if (!instance.path) {
    throw new Error(
      `[rasengan-ws] Gateway "${gatewayClass.name}" is missing a \`path\` (e.g. path = '/chat').`
    );
  }
  if (typeof instance.messages !== "function") {
    throw new Error(
      `[rasengan-ws] Gateway "${gatewayClass.name}" is missing a \`messages(router)\` method.`
    );
  }
  const router = new GatewayRouter();
  instance.messages(router);
  const handlers = router.getHandlers();
  const channel = instance.path;
  const localClients = /* @__PURE__ */ new Map();
  const connectionToId = /* @__PURE__ */ new Map();
  instance.server = createGatewayServer(channel, adapter);
  const unsubscribe = adapter.subscribe(channel, (message) => {
    deliverLocally(localClients, message);
  });
  app.onDestroy(() => unsubscribe());
  if (heartbeat) {
    const pingFrame = serializeEnvelope("$ping", {
      interval: heartbeat.interval,
      timeout: heartbeat.timeout
    });
    const heartbeatTimer = setInterval(() => {
      const deadline = heartbeat.interval + heartbeat.timeout;
      const now = Date.now();
      for (const entry of localClients.values()) {
        if (now - entry.lastSeen > deadline) {
          entry.connection.close(HEARTBEAT_CLOSE_CODE, "heartbeat timeout");
        } else {
          entry.connection.send(pingFrame);
        }
      }
    }, heartbeat.interval);
    app.onDestroy(() => clearInterval(heartbeatTimer));
  }
  app.websocket(instance.path, {
    open(ctx) {
      const id = crypto.randomUUID();
      const entry = {
        connection: ctx.socket,
        rooms: /* @__PURE__ */ new Set(),
        data: {},
        lastSeen: Date.now()
      };
      entry.client = createGatewayClient(
        id,
        ctx.request,
        entry,
        channel,
        adapter
      );
      localClients.set(id, entry);
      connectionToId.set(ctx.socket, id);
      instance.onConnect?.(entry.client);
    },
    message(ctx, data) {
      const id = connectionToId.get(ctx.socket);
      if (!id) return;
      const entry = localClients.get(id);
      if (!entry) return;
      entry.lastSeen = Date.now();
      if (typeof data !== "string") {
        instance.onBinaryMessage?.(entry.client, data);
        return;
      }
      const envelope = parseEnvelope(data);
      if (!envelope) {
        entry.client.emit(ERROR_EVENT, {
          message: "Malformed message \u2014 expected { event, data } JSON."
        });
        return;
      }
      if (envelope.event === "$pong") return;
      const handler = handlers.get(envelope.event);
      if (!handler) {
        if (envelope.ackId !== void 0) {
          entry.connection.send(
            serializeEnvelope("$ack", void 0, {
              ackId: envelope.ackId,
              error: { message: `Unknown event "${envelope.event}".` }
            })
          );
        } else {
          entry.client.emit(ERROR_EVENT, {
            message: `Unknown event "${envelope.event}".`
          });
        }
        return;
      }
      void (async () => {
        try {
          const result = await handler(entry.client, envelope.data);
          if (envelope.ackId !== void 0) {
            entry.connection.send(
              serializeEnvelope("$ack", result, { ackId: envelope.ackId })
            );
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          if (envelope.ackId !== void 0) {
            entry.connection.send(
              serializeEnvelope("$ack", void 0, {
                ackId: envelope.ackId,
                error: { message }
              })
            );
          } else {
            entry.client.emit(ERROR_EVENT, { message });
          }
        }
      })();
    },
    close(ctx, code, reason) {
      const id = connectionToId.get(ctx.socket);
      if (!id) return;
      const entry = localClients.get(id);
      connectionToId.delete(ctx.socket);
      localClients.delete(id);
      if (entry) {
        instance.onDisconnect?.(entry.client, code, reason);
      }
    }
  });
}

// src/adapters/redis.ts
var RedisGatewayAdapter = class {
  publisher;
  subscriber;
  handlers = /* @__PURE__ */ new Map();
  constructor(options) {
    this.publisher = options.publisher;
    this.subscriber = options.subscriber;
    this.subscriber.on("message", (channel, raw) => {
      const subs = this.handlers.get(channel);
      if (!subs) return;
      let message;
      try {
        message = JSON.parse(raw);
      } catch {
        return;
      }
      for (const onMessage of subs) {
        onMessage(message);
      }
    });
  }
  async publish(channel, message) {
    await this.publisher.publish(channel, JSON.stringify(message));
  }
  subscribe(channel, onMessage) {
    let subs = this.handlers.get(channel);
    const isFirstSubscriber = !subs;
    if (isFirstSubscriber) {
      subs = /* @__PURE__ */ new Set();
      this.handlers.set(channel, subs);
    }
    subs.add(onMessage);
    if (isFirstSubscriber) {
      void this.subscriber.subscribe(channel);
    }
    return () => {
      subs.delete(onMessage);
      if (subs.size === 0) {
        this.handlers.delete(channel);
        void this.subscriber.unsubscribe(channel);
      }
    };
  }
};
export {
  Gateway,
  GatewayRouter,
  MemoryGatewayAdapter,
  RedisGatewayAdapter,
  createWsPlugin
};
