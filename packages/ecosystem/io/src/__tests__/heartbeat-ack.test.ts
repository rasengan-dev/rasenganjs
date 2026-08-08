import { describe, it, expect } from 'vitest';
import { ServerApp, defineModule } from '@rasenganjs/server';
import { startNodeServer } from '@rasenganjs/runtime/adapters/node';
import {
  Gateway,
  GatewayRouter,
  createWsPlugin,
  type WsPluginOptions,
} from '@rasenganjs/ws';
import { RasenganSocket } from '../core/socket.js';

/**
 * RasenganSocket's heartbeat + emitWithAck against a real gateway —
 * the client side of the protocol the ws suite verifies with raw
 * `ws` clients.
 */

class RpcGateway extends Gateway {
  path = '/rpc';

  messages(router: GatewayRouter) {
    router.on('add', (_client, data: { a: number; b: number }) => {
      return { sum: data.a + data.b };
    });
    router.on('boom', () => {
      throw new Error('kaboom');
    });
    router.on('never', async () => {
      await new Promise((r) => setTimeout(r, 60_000));
    });
  }
}

async function startTestServer(options?: WsPluginOptions): Promise<number> {
  const app = new ServerApp();
  app.registerPlugin(createWsPlugin(options));
  app.registerModule(defineModule({ gateways: [RpcGateway] }));

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

function connect(port: number): Promise<RasenganSocket> {
  const socket = new RasenganSocket(`ws://127.0.0.1:${port}/rpc`);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('connect timeout')), 3000);
    socket.on('connect', () => {
      clearTimeout(timer);
      resolve(socket);
    });
    socket.connect();
  });
}

describe('emitWithAck', () => {
  it('resolves with the handler return value', async () => {
    const port = await startTestServer({ heartbeat: false });
    const socket = await connect(port);

    const reply = await socket.emitWithAck<'add', { sum: number }>('add', {
      a: 19,
      b: 23,
    });
    expect(reply).toEqual({ sum: 42 });

    socket.disconnect();
  });

  it('rejects when the handler throws', async () => {
    const port = await startTestServer({ heartbeat: false });
    const socket = await connect(port);

    await expect(socket.emitWithAck('boom')).rejects.toThrow('kaboom');
    socket.disconnect();
  });

  it('rejects for unknown events (no silent timeout)', async () => {
    const port = await startTestServer({ heartbeat: false });
    const socket = await connect(port);

    await expect(socket.emitWithAck('nope')).rejects.toThrow(
      'Unknown event "nope"'
    );
    socket.disconnect();
  });

  it('rejects on timeout', async () => {
    const port = await startTestServer({ heartbeat: false });
    const socket = await connect(port);

    await expect(
      socket.emitWithAck('never', undefined, { timeout: 100 })
    ).rejects.toThrow('timed out after 100ms');
    socket.disconnect();
  });

  it('rejects immediately while not connected', async () => {
    const socket = new RasenganSocket('ws://127.0.0.1:1/rpc');
    await expect(socket.emitWithAck('add', { a: 1, b: 1 })).rejects.toThrow(
      'requires an open connection'
    );
  });

  it('rejects pending acks when the connection drops', async () => {
    const port = await startTestServer({ heartbeat: false });
    const socket = await connect(port);

    const pending = socket.emitWithAck('never');
    socket.disconnect();

    await expect(pending).rejects.toThrow('Connection closed');
  });

  it('concurrent acks resolve independently by ackId', async () => {
    const port = await startTestServer({ heartbeat: false });
    const socket = await connect(port);

    const [one, two, three] = await Promise.all([
      socket.emitWithAck('add', { a: 1, b: 1 }),
      socket.emitWithAck('add', { a: 2, b: 2 }),
      socket.emitWithAck('add', { a: 3, b: 3 }),
    ]);
    expect([one, two, three]).toEqual([{ sum: 2 }, { sum: 4 }, { sum: 6 }]);

    socket.disconnect();
  });
});

describe('heartbeat', () => {
  it('auto-pongs and survives many heartbeat cycles hands-free', async () => {
    const port = await startTestServer({
      heartbeat: { interval: 40, timeout: 40 },
    });
    const socket = await connect(port);

    // ≫ interval + timeout — a non-ponging client would be dropped.
    let disconnects = 0;
    socket.on('disconnect', () => disconnects++);
    await new Promise((r) => setTimeout(r, 400));

    expect(socket.status).toBe('open');
    expect(disconnects).toBe(0);
    // Ack still works after heartbeat cycles (protocol frames don't
    // interfere with the pending-ack bookkeeping).
    expect(await socket.emitWithAck('add', { a: 5, b: 5 })).toEqual({
      sum: 10,
    });

    socket.disconnect();
  });

  it('self-disconnects when a server that pinged goes silent', async () => {
    // A raw app.websocket() route that sends ONE $ping and then nothing:
    // the client must arm its liveness window from that ping and end the
    // session itself once the window passes.
    const app = new ServerApp();
    app.websocket('/half-dead', {
      open(ctx) {
        ctx.socket.send(
          JSON.stringify({
            event: '$ping',
            data: { interval: 40, timeout: 40 },
          })
        );
      },
    });
    const futon = app.compile();
    const port = await new Promise<number>((resolve) => {
      startNodeServer((request) => futon.fetch(request), {
        port: 0,
        websocket: app.getWebSocketRegistry()!,
        onListening: (info) => resolve(info.port),
      });
    });

    const socket = new RasenganSocket(`ws://127.0.0.1:${port}/half-dead`, {
      reconnection: false,
    });
    const closed = new Promise<{ code?: number }>((resolve) => {
      socket.on('disconnect', (info) => resolve(info));
    });
    socket.connect();

    const info = await closed;
    expect(info.code).toBe(4001);
    expect(socket.status).toBe('closed');
  });

  it('$ping/$pong/$ack never reach user listeners', async () => {
    const port = await startTestServer({
      heartbeat: { interval: 30, timeout: 30 },
    });
    const socket = await connect(port);

    const seen: string[] = [];
    for (const event of ['$ping', '$pong', '$ack']) {
      socket.on(event, () => seen.push(event));
    }

    await new Promise((r) => setTimeout(r, 100)); // several pings
    await socket.emitWithAck('add', { a: 0, b: 0 }); // one $ack
    expect(seen).toEqual([]);

    socket.disconnect();
  });
});
