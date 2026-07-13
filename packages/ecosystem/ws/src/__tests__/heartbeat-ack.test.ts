import { describe, it, expect } from 'vitest';
import { WebSocket as WSClient } from 'ws';
import { ServerApp, defineModule } from '@rasenganjs/server';
import { startNodeServer } from '@rasenganjs/runtime/adapters/node';
import {
  Gateway,
  GatewayRouter,
  createWsPlugin,
  type WsPluginOptions,
} from '../index.js';

/**
 * Heartbeat + acknowledgement protocol, end-to-end over a real Node
 * server with raw `ws` clients (millisecond-scale heartbeat settings).
 */

class RpcGateway extends Gateway {
  path = '/rpc';

  messages(router: GatewayRouter) {
    router.on('echo', (_client, data) => data);
    router.on<{ ms: number }>('slow', async (_client, data) => {
      await new Promise((r) => setTimeout(r, data.ms));
      return 'finally';
    });
    router.on('boom', () => {
      throw new Error('kaboom');
    });
    router.on('fireAndForget', () => 'ignored return');
  }
}

async function startTestServer(options?: WsPluginOptions) {
  const app = new ServerApp();
  app.registerPlugin(createWsPlugin(options));
  app.registerModule(defineModule({ gateways: [RpcGateway] }));

  const futon = app.compile();
  const registry = app.getWebSocketRegistry()!;

  const port = await new Promise<number>((resolve) => {
    startNodeServer((request) => futon.fetch(request), {
      port: 0,
      websocket: registry,
      onListening: (info) => resolve(info.port),
    });
  });
  return { port, app };
}

function connect(port: number): Promise<WSClient> {
  return new Promise((resolve, reject) => {
    const client = new WSClient(`ws://127.0.0.1:${port}/rpc`);
    client.on('open', () => resolve(client));
    client.on('error', reject);
  });
}

function nextEvent(
  client: WSClient,
  event: string,
  timeoutMs = 3000
): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`timeout waiting for "${event}"`)),
      timeoutMs
    );
    const onMessage = (raw: Buffer) => {
      const frame = JSON.parse(raw.toString('utf8'));
      if (frame.event === event) {
        clearTimeout(timer);
        client.off('message', onMessage);
        resolve(frame);
      }
    };
    client.on('message', onMessage);
  });
}

describe('acknowledgements ($ack)', () => {
  it('replies with the handler return value and the same ackId', async () => {
    const { port } = await startTestServer({ heartbeat: false });
    const client = await connect(port);

    const reply = nextEvent(client, '$ack');
    client.send(JSON.stringify({ event: 'echo', data: { n: 42 }, ackId: 7 }));

    const frame = await reply;
    expect(frame.ackId).toBe(7);
    expect(frame.data).toEqual({ n: 42 });
    expect(frame.error).toBeUndefined();

    client.close();
  });

  it('awaits async handlers before replying', async () => {
    const { port } = await startTestServer({ heartbeat: false });
    const client = await connect(port);

    const reply = nextEvent(client, '$ack');
    client.send(JSON.stringify({ event: 'slow', data: { ms: 50 }, ackId: 1 }));

    expect((await reply).data).toBe('finally');
    client.close();
  });

  it('carries an error when the handler throws', async () => {
    const { port } = await startTestServer({ heartbeat: false });
    const client = await connect(port);

    const reply = nextEvent(client, '$ack');
    client.send(JSON.stringify({ event: 'boom', data: null, ackId: 2 }));

    const frame = await reply;
    expect(frame.ackId).toBe(2);
    expect(frame.error).toEqual({ message: 'kaboom' });

    client.close();
  });

  it('rejects unknown events with an error $ack instead of a timeout', async () => {
    const { port } = await startTestServer({ heartbeat: false });
    const client = await connect(port);

    const reply = nextEvent(client, '$ack');
    client.send(JSON.stringify({ event: 'nope', data: null, ackId: 3 }));

    const frame = await reply;
    expect(frame.ackId).toBe(3);
    expect(frame.error.message).toContain('nope');

    client.close();
  });

  it('a throwing handler WITHOUT ackId reports via $error', async () => {
    const { port } = await startTestServer({ heartbeat: false });
    const client = await connect(port);

    const reply = nextEvent(client, '$error');
    client.send(JSON.stringify({ event: 'boom', data: null }));

    expect((await reply).data.message).toBe('kaboom');
    client.close();
  });

  it('return values are ignored when no ackId was sent', async () => {
    const { port } = await startTestServer({ heartbeat: false });
    const client = await connect(port);

    const frames: string[] = [];
    client.on('message', (raw) =>
      frames.push(JSON.parse(raw.toString('utf8')).event)
    );
    client.send(JSON.stringify({ event: 'fireAndForget', data: null }));

    await new Promise((r) => setTimeout(r, 100));
    expect(frames).toEqual([]); // no $ack, no $error, nothing

    client.close();
  });
});

describe('reserved event names', () => {
  it('GatewayRouter refuses $-prefixed registrations', () => {
    const router = new GatewayRouter();
    expect(() => router.on('$ping', () => {})).toThrow(/reserved/);
  });
});

describe('heartbeat ($ping/$pong)', () => {
  it('pings connected clients with interval/timeout info', async () => {
    const { port } = await startTestServer({
      heartbeat: { interval: 50, timeout: 50 },
    });
    const client = await connect(port);

    const ping = await nextEvent(client, '$ping');
    expect(ping.data).toEqual({ interval: 50, timeout: 50 });

    client.close();
  });

  it('closes silent connections after interval + timeout, keeps ponging ones', async () => {
    const { port } = await startTestServer({
      heartbeat: { interval: 40, timeout: 40 },
    });

    const silent = await connect(port);
    const lively = await connect(port);

    // `lively` answers every ping; `silent` never sends anything.
    lively.on('message', (raw) => {
      if (JSON.parse(raw.toString('utf8')).event === '$ping') {
        lively.send(JSON.stringify({ event: '$pong', data: null }));
      }
    });

    const silentClosed = new Promise<number>((resolve) => {
      silent.on('close', (code) => resolve(code));
    });

    const code = await silentClosed;
    expect(code).toBe(4001);
    // Well past several deadlines, the ponging client is still open.
    expect(lively.readyState).toBe(WSClient.OPEN);

    lively.close();
  });

  it('any traffic counts as liveness, not just $pong', async () => {
    const { port } = await startTestServer({
      heartbeat: { interval: 40, timeout: 40 },
    });
    const client = await connect(port);

    // Never pong — but keep sending regular events.
    const chatter = setInterval(() => {
      client.send(JSON.stringify({ event: 'fireAndForget', data: null }));
    }, 30);

    await new Promise((r) => setTimeout(r, 300)); // ≫ interval + timeout
    expect(client.readyState).toBe(WSClient.OPEN);

    clearInterval(chatter);
    client.close();
  });
});
