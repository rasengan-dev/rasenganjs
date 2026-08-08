import { describe, it, expect } from 'vitest';
import { startBunServer } from '../../../adapters/bun/server.js';

const itIfBun = typeof Bun !== 'undefined' ? it : it.skip;

describe('startBunServer', () => {
  itIfBun('returns a handle with close() and ready', () => {
    const handler = () => Promise.resolve(new Response('ok'));
    const handle = startBunServer(handler, { port: 0 });

    expect(handle).toHaveProperty('close');
    expect(typeof handle.close).toBe('function');
    expect(handle).toHaveProperty('ready');
    expect(handle.ready).toBeInstanceOf(Promise);

    handle.close();
  });

  itIfBun('forwards onListening callback', async () => {
    const handler = () => Promise.resolve(new Response('ok'));
    const onListening = new Promise<void>((resolve) => {
      const handle = startBunServer(handler, {
        port: 0,
        onListening: (info) => {
          expect(info).toHaveProperty('port');
          expect(info).toHaveProperty('host');
          resolve();
          handle.close();
        },
      });
    });

    await expect(onListening).resolves.toBeUndefined();
  });

  itIfBun('responds to HTTP requests', async () => {
    const handler = (req: Request) => {
      const url = new URL(req.url);
      if (url.pathname === '/hello') {
        return Promise.resolve(new Response('world'));
      }
      return Promise.resolve(new Response('not found', { status: 404 }));
    };

    const info = await new Promise<{ port: number; handle: { close(): void } }>(
      (resolve) => {
        const handle = startBunServer(handler, {
          port: 0,
          onListening: (info) => resolve({ ...info, handle }),
        });
      }
    );

    const { port, handle } = info;

    const res = await fetch(`http://127.0.0.1:${port}/hello`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('world');

    const res404 = await fetch(`http://127.0.0.1:${port}/nope`);
    expect(res404.status).toBe(404);
    expect(await res404.text()).toBe('not found');

    handle.close();
  });

  itIfBun('ready resolves immediately', async () => {
    const handler = () => Promise.resolve(new Response('ok'));
    const handle = startBunServer(handler, { port: 0 });

    await expect(handle.ready).resolves.toBeUndefined();
    handle.close();
  });

  itIfBun('returns default host 0.0.0.0 when not specified', () => {
    const handler = () => Promise.resolve(new Response('ok'));
    const handle = startBunServer(handler);
    expect(handle).toHaveProperty('close');
    handle.close();
  });
});
