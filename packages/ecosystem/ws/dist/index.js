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
   * @throws If `event` is already registered on this gateway.
   */
  on(event, handler) {
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
function serializeEnvelope(event, data) {
  return JSON.stringify({ event, data });
}
function parseEnvelope(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (parsed && typeof parsed === "object" && typeof parsed.event === "string") {
    const { event, data } = parsed;
    return { event, data };
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
function createWsPlugin(options = {}) {
  const adapter = options.adapter ?? new MemoryGatewayAdapter();
  return {
    key: "gateways",
    register(app, container, _mod, value) {
      const gatewayClasses = value;
      for (const gatewayClass of gatewayClasses) {
        registerGateway(app, container, gatewayClass, adapter);
      }
    }
  };
}
function registerGateway(app, container, gatewayClass, adapter) {
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
  app.websocket(instance.path, {
    open(ctx) {
      const id = crypto.randomUUID();
      const entry = {
        connection: ctx.socket,
        rooms: /* @__PURE__ */ new Set(),
        data: {}
      };
      entry.client = createGatewayClient(id, ctx.request, entry, channel, adapter);
      localClients.set(id, entry);
      connectionToId.set(ctx.socket, id);
      instance.onConnect?.(entry.client);
    },
    message(ctx, data) {
      const id = connectionToId.get(ctx.socket);
      if (!id) return;
      const entry = localClients.get(id);
      if (!entry) return;
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
      const handler = handlers.get(envelope.event);
      if (!handler) {
        entry.client.emit(ERROR_EVENT, {
          message: `Unknown event "${envelope.event}".`
        });
        return;
      }
      handler(entry.client, envelope.data);
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
    if (!subs) {
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
