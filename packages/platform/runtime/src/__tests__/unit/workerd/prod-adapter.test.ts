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
    loadEnv: () => {},
    fetch: () => Promise.resolve(new Response('ok')),
  };
}

describe('WorkerdProdAdapter', () => {
  let adapter: WorkerdProdAdapter;

  afterEach(() => {
    adapter?.close();
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

  it('is idempotent on close', () => {
    adapter = new WorkerdProdAdapter();
    adapter.close();
    adapter.close();
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

  it('close clears fetchHandler', async () => {
    adapter = new WorkerdProdAdapter({ passthrough: true });
    await adapter.serve(createMockApp());

    expect(adapter.fetchHandler).not.toBeNull();
    adapter.close();
    expect(adapter.fetchHandler).toBeNull();
  });

  describeIfWorkerd('workerd mode (addEventListener)', () => {
    it('serve registers fetch listener', async () => {
      adapter = new WorkerdProdAdapter();
      const app = createMockApp();

      const servePromise = adapter.serve(app);
      await expect(servePromise).resolves.toBeUndefined();

      expect(adapter.fetchHandler).not.toBeNull();
    });

    it('close removes fetch listener', async () => {
      adapter = new WorkerdProdAdapter();
      await adapter.serve(createMockApp());

      adapter.close();

      expect(adapter.fetchHandler).toBeNull();
    });
  });
});
