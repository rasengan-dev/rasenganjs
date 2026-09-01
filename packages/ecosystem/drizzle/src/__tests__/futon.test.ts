import { describe, it, expect } from 'vitest';
import { Futon } from '@rasenganjs/futon';
import { drizzle } from '../futon.js';
import type { DrizzleAdapter } from '../adapter.js';

interface FakeDb {
  queried: boolean;
}

function fakeAdapter() {
  const calls: string[] = [];
  const adapter: DrizzleAdapter<
    { url: string },
    Record<string, unknown>,
    FakeDb
  > = {
    name: 'fake',
    connect(config) {
      calls.push(`connect:${config.url}`);
      return {
        db: { queried: false },
        close: async () => {
          calls.push('close');
        },
        migrate: async () => {},
      };
    },
  };
  return { adapter, calls };
}

describe('drizzle() — Futon-native, static source', () => {
  it('connects immediately at creation, the accessor works with no request involved', () => {
    const app = new Futon();
    const { adapter, calls } = fakeAdapter();

    const getDb = drizzle(app, adapter, { url: 'static://' }, {});

    expect(calls).toEqual(['connect:static://']);
    expect(getDb()).toEqual({ queried: false });
  });

  it('app.onDestroy() closes the underlying connection', async () => {
    const app = new Futon();
    const { adapter, calls } = fakeAdapter();
    drizzle(app, adapter, { url: 'static://' }, {});

    await app.destroy();

    expect(calls).toContain('close');
  });

  it('a real request handler can read the db through the returned accessor', async () => {
    const app = new Futon();
    const { adapter } = fakeAdapter();
    const getDb = drizzle(app, adapter, { url: 'static://' }, {});

    app.get('/ping', async () => Response.json(getDb()));

    const res = await app.fetch(new Request('http://localhost/ping'));

    expect(await res.json()).toEqual({ queried: false });
  });
});

describe('drizzle() — Futon-native, lazy (resolver) source', () => {
  it('the accessor throws before the first request', () => {
    const app = new Futon();
    const { adapter } = fakeAdapter();
    const getDb = drizzle(app, adapter, () => ({ url: 'lazy://' }), {});

    expect(() => getDb()).toThrow(/first incoming request/);
  });

  it('connects on the first request, resolving the source from ctx, stable after that', async () => {
    const app = new Futon();
    const { adapter, calls } = fakeAdapter();
    const getDb = drizzle(
      app,
      adapter,
      (ctx) => ({
        url: `lazy://${(ctx.runtime.env as { NAME?: string }).NAME}`,
      }),
      {}
    );

    app.get('/ping', async () => Response.json(getDb()));

    const res = await app.fetch(new Request('http://localhost/ping'), {
      env: { NAME: 'from-request' },
    });
    expect(await res.json()).toEqual({ queried: false });
    expect(calls).toEqual(['connect:lazy://from-request']);

    // A second request does not reconnect, even though its ctx carries
    // a different env value — the first resolution is cached.
    await app.fetch(new Request('http://localhost/ping'), {
      env: { NAME: 'from-second-request' },
    });
    expect(calls).toEqual(['connect:lazy://from-request']);

    // And now callable from outside a request entirely.
    expect(getDb()).toEqual({ queried: false });
  });
});
