# @rasenganjs/io

Real-time communication for [Rasengan.JS](https://rasengan.dev) applications —
the browser client for [`@rasenganjs/ws`](../ws) gateways. Built on the Web
Standard `WebSocket` class, zero runtime dependencies.

It speaks the `{ event, data }` JSON envelope of `@rasenganjs/ws` and adds
what raw WebSocket lacks: named events, automatic reconnection with capped
exponential backoff, and buffering of emits issued while offline.

## Install

```bash
npm install @rasenganjs/io
```

## Quick start

Wrap your app (or a subtree) with the provider:

```tsx
import { RasenganIOProvider } from '@rasenganjs/io';

export default function App({ Component, children }: AppProps) {
  return (
    <RasenganIOProvider url="ws://localhost:3000/chat">
      <Component>{children}</Component>
    </RasenganIOProvider>
  );
}
```

Then use the hooks anywhere below it:

```tsx
import { useConnection, useEvent, useEmit } from '@rasenganjs/io';

type ServerEvents = {
  'chat:message': (data: { user: string; text: string }) => void;
};
type ClientEvents = {
  'chat:message': (data: { text: string }) => void;
};

function Chat() {
  const { isConnected, isConnecting, error } = useConnection();
  const emit = useEmit<ClientEvents>();

  useEvent<ServerEvents, 'chat:message'>('chat:message', (data) => {
    console.log(`${data.user}: ${data.text}`);
  });

  return (
    <button
      disabled={!isConnected}
      onClick={() => emit('chat:message', { text: 'hello' })}
    >
      Send
    </button>
  );
}
```

The matching server is a `@rasenganjs/ws` gateway:

```ts
class ChatGateway extends Gateway {
  path = '/chat';

  messages(router: GatewayRouter) {
    router.on<{ text: string }>('chat:message', (client, data) => {
      client.broadcast.emit('chat:message', {
        user: client.id,
        text: data.text,
      });
    });
  }
}
```

## Multiple sockets

Providers nest into a registry keyed by `name`; every hook takes the name as
its first (or only) extra argument:

```tsx
<RasenganIOProvider url="ws://localhost:3000/chat">
  <RasenganIOProvider name="metrics" url="ws://localhost:3000/metrics">
    {/* useEmit() → chat socket; useEmit('metrics') → metrics socket */}
  </RasenganIOProvider>
</RasenganIOProvider>
```

## Options

```tsx
<RasenganIOProvider
  url="ws://localhost:3000/chat"
  autoConnect={true}
  options={{
    reconnection: true,        // auto-reconnect on unexpected close
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,   // base backoff (doubles per attempt)
    reconnectionDelayMax: 10000,
    randomizationFactor: 0.5,  // jitter
    emitBufferSize: 64,        // emits queued while offline (0 disables)
  }}
>
```

## Acknowledgements (request/response)

When the gateway handler returns a value, `emitWithAck()` resolves with it:

```ts
// server (gateway)
router.on('getRooms', async () => this.rooms());

// client — hook form
const emitWithAck = useEmitWithAck<ClientEvents>();
const rooms = await emitWithAck('getRooms'); // 10s default timeout

// client — socket form
const socket = useSocket();
await socket.emitWithAck('join', { room }, { timeout: 5000 });
```

The promise rejects when the handler throws, the event is unknown, the
timeout passes, or the connection drops — unlike `emit()`, acks never
buffer while offline.

## Heartbeat

`@rasenganjs/ws` gateways heartbeat by default; the socket replies
automatically and self-disconnects (then reconnects) if a pinging server
goes silent. Nothing to configure, and servers that never ping (plain
`app.websocket()` routes) are unaffected.

## Without React

The core class is exported and framework-agnostic:

```ts
import { RasenganSocket } from '@rasenganjs/io';

const socket = new RasenganSocket('ws://localhost:3000/chat');
socket.on('connect', () => socket.emit('chat:message', { text: 'hi' }));
socket.on('chat:message', (data) => console.log(data));
socket.connect();
```

Reserved lifecycle events: `connect`, `disconnect`, `error`, `reconnecting`,
`reconnect_failed`, `binary` (raw `ArrayBuffer` frames).

## Migrating from 1.x (Socket.IO)

See the [CHANGELOG](./CHANGELOG.md) for the full migration guide. Highlights:
plain `ws://` URLs instead of a Socket.IO server, one payload value per event,
`useEvent` no longer takes a deps array, and no HTTP long-polling fallback.
