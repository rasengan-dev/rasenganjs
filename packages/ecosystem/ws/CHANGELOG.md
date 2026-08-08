# @rasenganjs/ws

## Unreleased

## 1.0.0-beta.1 (2026-07-24)

### Heartbeat — dead-connection detection (on by default)

Gateways now ping every connection with a reserved `$ping` frame (every
25s by default) and close connections that stayed silent for
`interval + timeout` (25s + 20s) with code `4001` — presence and
`onDisconnect` behave exactly like a client-side close. Any inbound
frame counts as liveness, so active clients are never pinged into
disconnection. Configure or disable per plugin:

```ts
createWsPlugin({ heartbeat: { interval: 10_000, timeout: 5_000 } });
createWsPlugin({ heartbeat: false });
```

`@rasenganjs/io` ≥ 2.0.0 replies `$pong` automatically. Hand-rolled
envelope clients must reply to `$ping` (or send any traffic) within the
deadline, or disable the heartbeat.

### Acknowledgements — RPC over the envelope

Frames may now carry an `ackId`. When one does, the handler's awaited
**return value** is sent back as a `$ack` reply; a thrown error rejects
the caller's promise instead of timing out (same for unknown events):

```ts
messages(router: GatewayRouter) {
  router.on('getRooms', async () => this.rooms()); // reply = return value
}
```

Pairs with `@rasenganjs/io`'s `socket.emitWithAck(event, data?)`.
`GatewayMessageHandler` return type widened `void → unknown` (backward
compatible). Client→server acks only; server→client acks deferred.

### Other

- `GatewayRouter.on()` now rejects `$`-prefixed event names — reserved
  for the protocol (`$error`, `$ping`, `$pong`, `$ack`).
- Handlers are awaited: a rejecting handler no longer produces an
  unhandled rejection — without an `ackId` the error is reported to the
  sender via `$error`.
