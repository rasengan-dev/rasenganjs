## 2.0.0 (Unreleased)

**Breaking: Socket.IO replaced by the Web Standard `WebSocket` class.**

`@rasenganjs/io` is now the browser client for `@rasenganjs/ws` gateways. It
speaks the same `{ event, data }` JSON envelope, has **zero runtime
dependencies**, and no longer requires a Socket.IO server. v1.x remains on npm
for Socket.IO users.

### What stays the same

- The whole React API: `RasenganIOProvider`, `useSocket`, `useEvent`,
  `useEmit`, `useConnection` — including named multi-socket registries.
- Event-map typing style: `{ 'chat:message': (data: { text: string }) => void }`.
- SSR safety: the socket is only created in the browser.

### Migration guide

1. **Server**: point the provider at a `@rasenganjs/ws` gateway (or any
   `app.websocket()` route speaking the envelope) instead of a Socket.IO
   server. `url` is now a plain WebSocket URL: `ws://host/path`.
2. **Remove `socket.io-client`** from your dependencies — it is no longer a
   peer dependency.
3. **Provider `options`** are now `RasenganSocketOptions` (`reconnection`,
   `reconnectionAttempts`, `reconnectionDelay`, `reconnectionDelayMax`,
   `randomizationFactor`, `emitBufferSize`, `protocols`) instead of Socket.IO's
   `ManagerOptions & SocketOptions`.
4. **One payload per event.** `emit('event', a, b)` and multi-argument
   handlers become a single `data` value: `emit('event', { a, b })`.
   Acknowledgement callbacks (`emit('event', data, ack)`) are not supported
   yet — planned as an opt-in envelope extension.
5. **`useEvent` lost its `deps` argument.** Handlers are kept fresh through a
   ref, so closing over state never requires re-subscribing.
6. **`useSocket` returns a `RasenganSocket`** (also exported, usable without
   React). Reserved lifecycle events: `connect`, `disconnect`, `error`,
   `reconnecting`, `reconnect_failed`, `binary`. Socket.IO's `connect_error`
   maps to `error` + `reconnecting`.
7. **Transport**: there is no HTTP long-polling fallback anymore — native
   WebSocket only.

## 1.0.0 (2026-06-11)
