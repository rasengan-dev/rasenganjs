import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { WorkerdProdAdapter } from '../../../adapters/workerd/prod.js';

const isWorkerd =
  typeof self !== 'undefined' &&
  typeof self.addEventListener === 'function' &&
  typeof FetchEvent !== 'undefined';

const describeIfWorkerd = isWorkerd ? describe : describe.skip;

function createMockApp() {
  return {
    configureServer: () => {},
    configureAssets: () => {},
    loadEnv: () => {},
    init: () => Promise.resolve(),
    destroy: () => Promise.resolve(),
    fetch: () => Promise.resolve(new Response('ok')),
  };
}

/** Mock app that records the `runtime` argument every `fetch()` receives. */
function createRecordingMockApp() {
  const calls: any[] = [];
  return {
    configureServer: () => {},
    configureAssets: () => {},
    loadEnv: () => {},
    init: () => Promise.resolve(),
    destroy: () => Promise.resolve(),
    fetch: (request: Request, runtime?: any) => {
      calls.push(runtime);
      return Promise.resolve(new Response('ok'));
    },
    calls,
  };
}

function createMockExecutionCtx() {
  const waitUntilPromises: Promise<unknown>[] = [];
  return {
    waitUntil: (p: Promise<unknown>) => {
      waitUntilPromises.push(p);
    },
    passThroughOnException: () => {},
    waitUntilPromises,
  };
}

describe('WorkerdProdAdapter', () => {
  let adapter: WorkerdProdAdapter;

  afterEach(async () => {
    await adapter?.close();
  });

  it('provides no-op assets instance', () => {
    adapter = new WorkerdProdAdapter();
    expect(adapter.assets).toBeDefined();
    expect(typeof adapter.assets.get).toBe('function');
  });

  it('all assets methods are no-ops', async () => {
    adapter = new WorkerdProdAdapter();

    expect(await adapter.assets.get('any')).toBeNull();
    expect(await adapter.assets.load('any')).toBeNull();
    await expect(
      adapter.assets.write('any', new Uint8Array())
    ).resolves.not.toThrow();
    await expect(adapter.assets.delete('any')).resolves.not.toThrow();
    expect(await adapter.assets.list('any')).toEqual([]);
  });

  it('fetchHandler is null before serve', () => {
    adapter = new WorkerdProdAdapter();
    expect(adapter.fetchHandler).toBeNull();
  });

  it('is idempotent on close', async () => {
    adapter = new WorkerdProdAdapter();
    await adapter.close();
    await adapter.close();
  });

  it('passthrough mode sets fetchHandler without addEventListener', async () => {
    adapter = new WorkerdProdAdapter({ passthrough: true });
    const app = createMockApp();

    await adapter.serve(app);

    expect(adapter.fetchHandler).not.toBeNull();
    expect(typeof adapter.fetchHandler).toBe('function');

    const response = await adapter.fetchHandler!(new Request('http://test/'));
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('ok');
  });

  it('defaults to passthrough mode when no options are given (RFC-0013)', async () => {
    adapter = new WorkerdProdAdapter();
    const app = createMockApp();

    // Resolves (rather than hanging on the never-settling promise the
    // addEventListener path returns) — proof passthrough is the default.
    await adapter.serve(app);

    expect(adapter.fetchHandler).not.toBeNull();
  });

  it('forwards env to app.fetch() as ctx.runtime.env (RFC-0013)', async () => {
    adapter = new WorkerdProdAdapter();
    const app = createRecordingMockApp();
    await adapter.serve(app);

    const env = { DB: { prepare: () => {} }, SECRET: 'shh' };
    await adapter.fetchHandler!(new Request('http://test/'), env);

    expect(app.calls).toHaveLength(1);
    expect(app.calls[0].env).toBe(env);
  });

  it('forwards ctx.waitUntil/passThroughOnException as ctx.runtime.executionCtx (RFC-0013)', async () => {
    adapter = new WorkerdProdAdapter();
    const app = createRecordingMockApp();
    await adapter.serve(app);

    const mockCtx = createMockExecutionCtx();
    await adapter.fetchHandler!(
      new Request('http://test/'),
      {},
      mockCtx as any
    );

    const executionCtx = app.calls[0].executionCtx;
    expect(typeof executionCtx.waitUntil).toBe('function');

    const marker = Promise.resolve('usage-event');
    executionCtx.waitUntil(marker);
    expect(mockCtx.waitUntilPromises).toContain(marker);

    executionCtx.passThroughOnException();
  });

  it('defaults env to an empty object and executionCtx to undefined when omitted', async () => {
    adapter = new WorkerdProdAdapter();
    const app = createRecordingMockApp();
    await adapter.serve(app);

    await adapter.fetchHandler!(new Request('http://test/'));

    expect(app.calls[0].env).toEqual({});
    expect(app.calls[0].executionCtx).toBeUndefined();
  });

  it('close clears fetchHandler', async () => {
    adapter = new WorkerdProdAdapter({ passthrough: true });
    await adapter.serve(createMockApp());

    expect(adapter.fetchHandler).not.toBeNull();
    await adapter.close();
    expect(adapter.fetchHandler).toBeNull();
  });

  describeIfWorkerd(
    'workerd mode (addEventListener, passthrough: false)',
    () => {
      it('serve registers fetch listener', async () => {
        adapter = new WorkerdProdAdapter({ passthrough: false });
        const app = createMockApp();

        const servePromise = adapter.serve(app);
        await expect(servePromise).resolves.toBeUndefined();

        expect(adapter.fetchHandler).not.toBeNull();
      });

      it('close removes fetch listener', async () => {
        adapter = new WorkerdProdAdapter({ passthrough: false });
        await adapter.serve(createMockApp());

        await adapter.close();

        expect(adapter.fetchHandler).toBeNull();
      });
    }
  );
});
