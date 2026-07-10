import { describe, it, expect } from 'vitest';
import { WebSocket as WSClient } from 'ws';
import { startNodeServer } from '../../../adapters/node/server.js';
import type {
  WebSocketHandlers,
  WebSocketRouteMatcher,
} from '../../../websocket/types.js';

/** Minimal single-route matcher, enough to exercise the upgrade handler. */
function singleRouteMatcher(
  path: string,
  handlers: WebSocketHandlers
): WebSocketRouteMatcher {
  return {
    match: (pathname) => (pathname === path ? handlers : undefined),
  };
}

/** Start a Node server with the given WebSocket matcher on an ephemeral port. */
async function startTestServer(matcher: WebSocketRouteMatcher) {
  const handle = await new Promise<{
    port: number;
    server: ReturnType<typeof startNodeServer>;
  }>((resolve) => {
    const server = startNodeServer(
      () => Promise.resolve(new Response('http ok')),
      {
        port: 0,
        websocket: matcher,
        onListening: (info) => resolve({ port: info.port, server }),
      }
    );
  });
  return handle;
}

describe('Node WebSocket upgrade handling (RFC-0001)', () => {
  it('rejects the upgrade with 404 when no route matches the path', async () => {
    const { port, server } = await startTestServer(
      singleRouteMatcher('/chat', {})
    );

    const client = new WSClient(`ws://127.0.0.1:${port}/nope`);

    const failure = await new Promise<{ code?: number }>((resolve) => {
      client.on('unexpected-response', (_req, res) => {
        resolve({ code: res.statusCode });
      });
      client.on('error', () => {
        // 'unexpected-response' already resolves; swallow the paired error.
      });
    });

    expect(failure.code).toBe(404);
    server.close();
  });

  it('calls open(), echoes text messages via message(), and calls close()', async () => {
    const events: string[] = [];
    let receivedText: string | undefined;

    const handlers: WebSocketHandlers = {
      open(ctx) {
        events.push('open');
        expect(ctx.request.method).toBe('GET');
        expect(ctx.socket.readyState).toBe(1); // OPEN
      },
      message(ctx, data) {
        receivedText = data as string;
        ctx.socket.send(`echo:${data}`);
      },
      close() {
        events.push('close');
      },
    };

    const { port, server } = await startTestServer(
      singleRouteMatcher('/chat', handlers)
    );

    const client = new WSClient(`ws://127.0.0.1:${port}/chat`);

    const echoed = await new Promise<string>((resolve) => {
      client.on('open', () => client.send('hello'));
      client.on('message', (data) => resolve(data.toString('utf8')));
    });

    expect(echoed).toBe('echo:hello');
    expect(receivedText).toBe('hello');
    expect(events).toEqual(['open']);

    await new Promise<void>((resolve) => {
      client.on('close', () => resolve());
      client.close();
    });

    // close() runs asynchronously relative to the client-side 'close' event
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(events).toEqual(['open', 'close']);

    server.close();
  });

  it('delivers binary messages as ArrayBuffer', async () => {
    let received: unknown;

    const handlers: WebSocketHandlers = {
      message(_ctx, data) {
        received = data;
      },
    };

    const { port, server } = await startTestServer(
      singleRouteMatcher('/binary', handlers)
    );

    const client = new WSClient(`ws://127.0.0.1:${port}/binary`);

    await new Promise<void>((resolve) => {
      client.on('open', () => {
        client.send(new Uint8Array([1, 2, 3]));
        resolve();
      });
    });

    // Give the server a tick to process the message.
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(received).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(received as ArrayBuffer)).toEqual(
      new Uint8Array([1, 2, 3])
    );

    client.close();
    server.close();
  });
});
