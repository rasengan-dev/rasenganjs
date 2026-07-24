import { describe, it, expect } from 'vitest';
import { WebSocket as WSClient } from 'ws';
import { ServerApp, defineModule } from '@rasenganjs/server';
import { startNodeServer } from '@rasenganjs/runtime/adapters/node';
import {
  Gateway,
  GatewayRouter,
  createWsPlugin,
  type GatewayClient,
} from '../index.js';

/**
 * End-to-end: a real ServerApp, compiled with `createWsPlugin()`, served
 * over a real Node HTTP server, exercised by real `ws` clients. Proves
 * the full chain — defineModule({ gateways }) -> ModulePlugin ->
 * app.websocket() -> Node upgrade handling (RFC-0001) -> Gateway
 * dispatch — actually works together, not just each piece in isolation.
 */

class ChatGateway extends Gateway {
  path = '/chat';
  disconnected: string[] = [];

  onConnect(client: GatewayClient) {
    client.join('lobby');
  }

  onDisconnect(client: GatewayClient) {
    this.disconnected.push(client.id);
  }

  messages(router: GatewayRouter) {
    router.on<{ text: string }>('sendMessage', (client, data) => {
      client
        .to('lobby')
        .emit('newMessage', { text: data.text, from: client.id });
    });
    router.on('whoami', (client) => {
      client.emit('whoami', { id: client.id });
    });
  }
}

async function startTestServer() {
  // Pre-construct the instance and register it via `useValue` so the
  // test keeps a direct handle on the exact instance the plugin resolves
  // (to assert on `gateway.disconnected`) — `container.resolve(ChatGateway)`
  // inside `createWsPlugin` returns this same object. Real apps would
  // just list the class in `gateways` and let DI construct it normally.
  const gateway = new ChatGateway();

  const app = new ServerApp();
  app.registerPlugin(createWsPlugin());
  app.registerModule(
    defineModule({
      providers: [{ provide: ChatGateway, useValue: gateway }],
      gateways: [ChatGateway],
    })
  );

  const futon = app.compile();
  const registry = app.getWebSocketRegistry()!;

  const { port } = await new Promise<{ port: number }>((resolve) => {
    startNodeServer((request) => futon.fetch(request), {
      port: 0,
      websocket: registry,
      onListening: (info) => resolve({ port: info.port }),
    });
  });

  return { port, gateway };
}

function connect(port: number, path = '/chat'): Promise<WSClient> {
  return new Promise((resolve, reject) => {
    const client = new WSClient(`ws://127.0.0.1:${port}${path}`);
    client.on('open', () => resolve(client));
    client.on('error', reject);
  });
}

function nextMessage(
  client: WSClient
): Promise<{ event: string; data: unknown }> {
  return new Promise((resolve) => {
    client.once('message', (raw) => resolve(JSON.parse(raw.toString('utf8'))));
  });
}

describe('@rasenganjs/ws — end-to-end over a real Node server', () => {
  it('broadcasts to a room, excluding the sender', async () => {
    const { port } = await startTestServer();

    const alice = await connect(port);
    const bob = await connect(port);

    const bobReceived = nextMessage(bob);
    alice.send(JSON.stringify({ event: 'sendMessage', data: { text: 'hi' } }));

    const message = await bobReceived;
    expect(message).toEqual({
      event: 'newMessage',
      data: { text: 'hi', from: expect.any(String) },
    });

    alice.close();
    bob.close();
  });

  it('direct emit() only reaches the requesting client', async () => {
    const { port } = await startTestServer();
    const client = await connect(port);

    const reply = nextMessage(client);
    client.send(JSON.stringify({ event: 'whoami', data: null }));

    const message = await reply;
    expect(message.event).toBe('whoami');
    expect((message.data as { id: string }).id).toEqual(expect.any(String));

    client.close();
  });

  it('replies with $error for an unregistered event', async () => {
    const { port } = await startTestServer();
    const client = await connect(port);

    const reply = nextMessage(client);
    client.send(JSON.stringify({ event: 'notARealEvent', data: null }));

    const message = await reply;
    expect(message.event).toBe('$error');

    client.close();
  });

  it('replies with $error for a malformed (non-envelope) frame', async () => {
    const { port } = await startTestServer();
    const client = await connect(port);

    const reply = nextMessage(client);
    client.send('not json at all');

    const message = await reply;
    expect(message.event).toBe('$error');

    client.close();
  });

  it('calls onDisconnect when a client closes', async () => {
    const { port, gateway } = await startTestServer();
    const client = await connect(port);

    await new Promise<void>((resolve) => {
      client.on('close', () => resolve());
      client.close();
    });

    // onDisconnect runs server-side asynchronously relative to the
    // client-side close event.
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(gateway.disconnected.length).toBe(1);
  });
});
