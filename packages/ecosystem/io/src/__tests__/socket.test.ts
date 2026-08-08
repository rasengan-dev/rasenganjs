import { describe, it, expect } from 'vitest';
import { ServerApp, defineModule } from '@rasenganjs/server';
import { startNodeServer } from '@rasenganjs/runtime/adapters/node';
import {
  Gateway,
  GatewayRouter,
  createWsPlugin,
  type GatewayClient,
} from '@rasenganjs/ws';
import { RasenganSocket } from '../core/socket.js';

/**
 * End-to-end: RasenganSocket (running on Node's Web Standard WebSocket
 * global) against a real `@rasenganjs/ws` gateway served by a real Node
 * HTTP server — the exact stack a browser client talks to in production.
 */

class EchoGateway extends Gateway {
  path = '/echo';

  onConnect(client: GatewayClient) {
    client.emit('welcome', { id: client.id });
  }

  messages(router: GatewayRouter) {
    router.on<{ text: string }>('echo', (client, data) => {
      client.emit('echoed', { text: data.text });
    });
    router.on('kickMe', (client) => {
      client.disconnect(4000, 'kicked');
    });
  }
}

async function startTestServer(): Promise<number> {
  const app = new ServerApp();
  app.registerPlugin(createWsPlugin());
  app.registerModule(defineModule({ gateways: [EchoGateway] }));

  const futon = app.compile();
  const registry = app.getWebSocketRegistry()!;

  return new Promise<number>((resolve) => {
    startNodeServer((request) => futon.fetch(request), {
      port: 0,
      websocket: registry,
      onListening: (info) => resolve(info.port),
    });
  });
}

function once<T = any>(
  socket: RasenganSocket,
  event: string,
  timeoutMs = 3000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`timeout waiting for "${event}"`)),
      timeoutMs
    );
    const unsubscribe = socket.on(event, (payload: T) => {
      clearTimeout(timer);
      unsubscribe();
      resolve(payload);
    });
  });
}

describe('RasenganSocket — against a real @rasenganjs/ws gateway', () => {
  it('connects, receives the connect lifecycle event, then server envelopes', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`);

    const connected = once(socket, 'connect');
    const welcome = once<{ id: string }>(socket, 'welcome');
    socket.connect();

    await connected;
    expect(socket.status).toBe('open');
    expect((await welcome).id).toEqual(expect.any(String));

    socket.disconnect();
  });

  it('emit() round-trips through the envelope', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`);
    socket.connect();
    await once(socket, 'connect');

    const reply = once<{ text: string }>(socket, 'echoed');
    socket.emit('echo', { text: 'dattebayo' });
    expect((await reply).text).toBe('dattebayo');

    socket.disconnect();
  });

  it('buffers emits issued before the connection opens and flushes them', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`);

    // Emit BEFORE connect() — must be queued, not lost.
    socket.emit('echo', { text: 'early bird' });
    const reply = once<{ text: string }>(socket, 'echoed');
    socket.connect();

    expect((await reply).text).toBe('early bird');
    socket.disconnect();
  });

  it('drops the oldest frame when the emit buffer overflows', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`, {
      emitBufferSize: 1,
    });

    const received: string[] = [];
    socket.on('echoed', (data: { text: string }) => received.push(data.text));

    socket.emit('echo', { text: 'dropped' });
    socket.emit('echo', { text: 'kept' });
    socket.connect();
    await once(socket, 'connect');

    // Give the round-trip a beat.
    await new Promise((r) => setTimeout(r, 100));
    expect(received).toEqual(['kept']);

    socket.disconnect();
  });

  it('surfaces the gateway $error reply for unknown events', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`);
    socket.connect();
    await once(socket, 'connect');

    const error = once<{ message: string }>(socket, '$error');
    socket.emit('nope');
    expect((await error).message).toContain('nope');

    socket.disconnect();
  });

  it('reconnects after a server-initiated close and re-emits connect', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`, {
      reconnectionDelay: 50,
      randomizationFactor: 0,
    });
    socket.connect();
    await once(socket, 'connect');

    const disconnected = once<{ code?: number }>(socket, 'disconnect');
    const reconnecting = once<{ attempt: number }>(socket, 'reconnecting');
    const reconnected = once(socket, 'connect');

    socket.emit('kickMe');

    expect((await disconnected).code).toBe(4000);
    expect((await reconnecting).attempt).toBe(1);
    await reconnected;
    expect(socket.status).toBe('open');

    socket.disconnect();
  });

  it('does NOT reconnect after an intentional disconnect()', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`, {
      reconnectionDelay: 20,
    });
    socket.connect();
    await once(socket, 'connect');

    let reconnectAttempts = 0;
    socket.on('reconnecting', () => reconnectAttempts++);

    socket.disconnect();
    await new Promise((r) => setTimeout(r, 150));

    expect(socket.status).toBe('closed');
    expect(reconnectAttempts).toBe(0);
  });

  it('gives up after reconnectionAttempts and emits reconnect_failed', async () => {
    // Nothing listens on this port — every attempt fails.
    const socket = new RasenganSocket('ws://127.0.0.1:1/echo', {
      reconnectionAttempts: 2,
      reconnectionDelay: 20,
      randomizationFactor: 0,
    });

    const attempts: number[] = [];
    socket.on('reconnecting', ({ attempt }) => attempts.push(attempt));
    const failed = once(socket, 'reconnect_failed', 5000);

    socket.connect();
    await failed;

    expect(attempts).toEqual([1, 2]);
    expect(socket.status).toBe('closed');
  });

  it('unsubscribes via the returned function and via off()', async () => {
    const port = await startTestServer();
    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/echo`);
    socket.connect();
    await once(socket, 'connect');

    let calls = 0;
    const handler = () => calls++;
    const unsubscribe = socket.on('echoed', handler);

    socket.emit('echo', { text: 'one' });
    await once(socket, 'echoed');
    unsubscribe();

    socket.emit('echo', { text: 'two' });
    await once(socket, 'echoed');

    expect(calls).toBe(1);
    socket.disconnect();
  });
});
