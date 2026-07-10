import { describe, expect, it } from 'vitest';
import { startBunServer } from '../../../adapters/bun/server.js';
import type {
  WebSocketHandlers,
  WebSocketRouteMatcher,
} from '../../../websocket/types.js';

const itIfBun = typeof Bun !== 'undefined' ? it : it.skip;

/** Minimal single-route matcher, enough to exercise the upgrade handler. */
function singleRouteMatcher(
  path: string,
  handlers: WebSocketHandlers
): WebSocketRouteMatcher {
  return {
    match: (pathname) => (pathname === path ? handlers : undefined),
  };
}

/** Start a Bun server with the given WebSocket matcher on an ephemeral port. */
async function startTestServer(
  matcher: WebSocketRouteMatcher,
  httpHandler: (request: Request) => Promise<Response> = () =>
    Promise.resolve(new Response('http ok'))
) {
  return new Promise<{
    port: number;
    server: ReturnType<typeof startBunServer>;
  }>((resolve) => {
    const server = startBunServer(httpHandler, {
      port: 0,
      websocket: matcher,
      onListening: (info) => resolve({ port: info.port, server }),
    });
  });
}

describe('Bun WebSocket upgrade handling (RFC-0001)', () => {
  itIfBun(
    'falls through to the HTTP handler (404) when no route matches the path',
    async () => {
      const { port, server } = await startTestServer(
        singleRouteMatcher('/chat', {}),
        () => Promise.resolve(new Response('not found', { status: 404 }))
      );

      const failed = await new Promise<boolean>((resolve) => {
        const client = new WebSocket(`ws://127.0.0.1:${port}/nope`);
        client.onerror = () => resolve(true);
        client.onopen = () => resolve(false);
      });

      expect(failed).toBe(true);
      server.close();
    }
  );

  itIfBun(
    'calls open(), echoes text messages via message(), and calls close()',
    async () => {
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

      const client = new WebSocket(`ws://127.0.0.1:${port}/chat`);

      const echoed = await new Promise<string>((resolve) => {
        client.onopen = () => client.send('hello');
        client.onmessage = (event) => resolve(event.data as string);
      });

      expect(echoed).toBe('echo:hello');
      expect(receivedText).toBe('hello');
      expect(events).toEqual(['open']);

      await new Promise<void>((resolve) => {
        client.onclose = () => resolve();
        client.close();
      });

      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(events).toEqual(['open', 'close']);

      server.close();
    }
  );

  itIfBun('delivers binary messages as ArrayBuffer', async () => {
    let received: unknown;

    const handlers: WebSocketHandlers = {
      message(_ctx, data) {
        received = data;
      },
    };

    const { port, server } = await startTestServer(
      singleRouteMatcher('/binary', handlers)
    );

    const client = new WebSocket(`ws://127.0.0.1:${port}/binary`);

    await new Promise<void>((resolve) => {
      client.onopen = () => {
        client.send(new Uint8Array([1, 2, 3]));
        resolve();
      };
    });

    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(received).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(received as ArrayBuffer)).toEqual(
      new Uint8Array([1, 2, 3])
    );

    client.close();
    server.close();
  });

  itIfBun(
    'normal HTTP requests are unaffected by a configured websocket matcher',
    async () => {
      const { port, server } = await startTestServer(
        singleRouteMatcher('/chat', {}),
        (request) => {
          const url = new URL(request.url);
          return Promise.resolve(
            url.pathname === '/ping'
              ? new Response('pong')
              : new Response('not found', { status: 404 })
          );
        }
      );

      const res = await fetch(`http://127.0.0.1:${port}/ping`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe('pong');

      server.close();
    }
  );
});
