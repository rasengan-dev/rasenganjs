import { describe, it, expect } from 'vitest';
import { createConnection } from '../connection.js';
import type { DrizzleAdapter } from '../adapter.js';

interface FakeDb {
  id: number;
}

function fakeAdapter() {
  const calls: string[] = [];
  let nextId = 0;
  const adapter: DrizzleAdapter<
    { url: string },
    Record<string, unknown>,
    FakeDb
  > = {
    name: 'fake',
    connect(config) {
      calls.push(`connect:${config.url}`);
      const id = nextId++;
      return {
        db: { id },
        close: async () => {
          calls.push(`close:${id}`);
        },
        migrate: async () => {},
      };
    },
  };
  return { adapter, calls };
}

describe('createConnection — static source', () => {
  it('connects immediately at creation, getOrThrow() works with no resolve() call', () => {
    const { adapter, calls } = fakeAdapter();
    const core = createConnection(adapter, { url: 'static://' }, {});

    expect(calls).toEqual(['connect:static://']);
    expect(core.isReady()).toBe(true);
    expect(core.getOrThrow()).toEqual({ id: 0 });
  });

  it('resolve() is a no-op for a static source, even called repeatedly', async () => {
    const { adapter, calls } = fakeAdapter();
    const core = createConnection(adapter, { url: 'static://' }, {});

    await core.resolve(undefined);
    await core.resolve(undefined);

    expect(calls).toEqual(['connect:static://']);
  });
});

describe('createConnection — lazy (resolver) source', () => {
  it('getOrThrow() throws before the first resolve() call', () => {
    const { adapter } = fakeAdapter();
    const core = createConnection(adapter, () => ({ url: 'lazy://' }), {});

    expect(() => core.getOrThrow()).toThrow(/first incoming request/);
    expect(core.isReady()).toBe(false);
  });

  it('connects on the first resolve() call, then getOrThrow() works', async () => {
    const { adapter, calls } = fakeAdapter();
    const core = createConnection(
      adapter,
      (ctx: { url: string }) => ({ url: ctx.url }),
      {}
    );

    await core.resolve({ url: 'lazy://from-ctx' });

    expect(calls).toEqual(['connect:lazy://from-ctx']);
    expect(core.getOrThrow()).toEqual({ id: 0 });
  });

  it('a second resolve() after connecting does not reconnect', async () => {
    const { adapter, calls } = fakeAdapter();
    const core = createConnection(adapter, () => ({ url: 'lazy://' }), {});

    await core.resolve(undefined);
    await core.resolve(undefined);

    expect(calls).toEqual(['connect:lazy://']);
  });

  it('concurrent resolve() calls before the first completes connect exactly once', async () => {
    const calls: string[] = [];
    let resolveConfig!: (config: { url: string }) => void;
    const configPromise = new Promise<{ url: string }>((resolve) => {
      resolveConfig = resolve;
    });

    const adapter: DrizzleAdapter<
      { url: string },
      Record<string, unknown>,
      FakeDb
    > = {
      name: 'fake',
      connect(config) {
        calls.push(`connect:${config.url}`);
        return {
          db: { id: 0 },
          close: async () => {},
          migrate: async () => {},
        };
      },
    };

    const core = createConnection(adapter, () => configPromise, {});

    const first = core.resolve(undefined);
    const second = core.resolve(undefined);

    resolveConfig({ url: 'lazy://race' });
    await Promise.all([first, second]);

    expect(calls).toEqual(['connect:lazy://race']);
  });
});

describe('createConnection — close()', () => {
  it('calls the adapter close() exactly once, plus every registered onClose hook, in order', async () => {
    const { adapter, calls } = fakeAdapter();
    const core = createConnection(adapter, { url: 'static://' }, {});

    const order: string[] = [];
    core.onClose(() => {
      order.push('hook-1');
    });
    core.onClose(async () => {
      order.push('hook-2');
    });

    await core.close();

    expect(calls).toEqual(['connect:static://', 'close:0']);
    expect(order).toEqual(['hook-1', 'hook-2']);
  });
});
