import { describe, it, expect } from 'vitest';
import { startNodeServer } from '../../../adapters/node/server.js';

describe('startNodeServer', () => {
  it('returns a handle with close() and ready', () => {
    const handler = () => Promise.resolve(new Response('ok'));
    const handle = startNodeServer(handler, { port: 0 });

    expect(handle).toHaveProperty('close');
    expect(typeof handle.close).toBe('function');
    expect(handle).toHaveProperty('ready');
    expect(handle.ready).toBeInstanceOf(Promise);

    handle.close();
  });

  it('forwards onListening callback', async () => {
    const handler = () => Promise.resolve(new Response('ok'));
    const onListening = new Promise<void>((resolve) => {
      const handle = startNodeServer(handler, {
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

  it('responds to HTTP requests', async () => {
    const handler = (req: Request) => {
      const url = new URL(req.url);
      if (url.pathname === '/hello') {
        return Promise.resolve(new Response('world'));
      }
      return Promise.resolve(new Response('not found', { status: 404 }));
    };

    const info = await new Promise<{ port: number; handle: { close(): void } }>(
      (resolve) => {
        const handle = startNodeServer(handler, {
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

  it('returns default port 5200 when not specified', () => {
    const handler = () => Promise.resolve(new Response('ok'));
    const handle = startNodeServer(handler);
    expect(handle).toHaveProperty('close');
    handle.close();
  });
});
