import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, writeFile, unlink, rmdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { BunProdAdapter } from '../../../adapters/bun/prod.js';

const describeIfBun = typeof Bun !== 'undefined' ? describe : describe.skip;

function createMockApp() {
  return {
    configureServer: () => {},
    loadEnv: () => {},
    fetch: () => Promise.resolve(new Response('ok')),
  };
}

describe('BunProdAdapter', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = join(tmpdir(), `rasengan-bun-prod-${randomUUID()}`);
    await mkdir(rootDir, { recursive: true });
  });

  afterEach(async () => {
    await rmdir(rootDir, { recursive: true }).catch(() => {});
  });

  it('provides assets instance', () => {
    const adapter = new BunProdAdapter({ rootDir });
    expect(adapter.assets).toBeDefined();
    expect(typeof adapter.assets.get).toBe('function');
  });

  it('is idempotent on close', () => {
    const adapter = new BunProdAdapter({ rootDir });
    adapter.close();
    adapter.close();
  });

  describeIfBun('serve', () => {
    it('starts and stops a server', async () => {
      const adapter = new BunProdAdapter({ port: 0, rootDir });
      const app = createMockApp();

      const started = new Promise<void>((resolve) => {
        const origServe = adapter.serve.bind(adapter);
        adapter.serve = (a: any, opts?: any) =>
          origServe(a, { ...opts, onListening: () => resolve() });
      });

      const servePromise = adapter.serve(app);
      await started;
      adapter.close();
      await servePromise;
    });
  });

  describeIfBun('assets', () => {
    it('assets.get reads files from rootDir', async () => {
      await writeFile(join(rootDir, 'data.txt'), 'production content');
      const adapter = new BunProdAdapter({ rootDir });

      const result = await adapter.assets.get('data.txt');
      expect(result).toBeInstanceOf(Uint8Array);
      expect(new TextDecoder().decode(result!)).toBe('production content');

      adapter.close();
    });

    it('assets.load reads files as text', async () => {
      await writeFile(join(rootDir, 'hello.txt'), 'hello');
      const adapter = new BunProdAdapter({ rootDir });

      const result = await adapter.assets.load('hello.txt');
      expect(result).toBe('hello');

      adapter.close();
    });

    it('assets.write is a no-op (does not write)', async () => {
      const adapter = new BunProdAdapter({ rootDir });
      await adapter.assets.write('new.txt', new TextEncoder().encode('data'));

      await expect(readFile(join(rootDir, 'new.txt'))).rejects.toThrow();

      adapter.close();
    });

    it('assets.delete is a no-op', async () => {
      await writeFile(join(rootDir, 'keep.txt'), 'keep me');
      const adapter = new BunProdAdapter({ rootDir });

      await adapter.assets.delete('keep.txt');

      const content = await readFile(join(rootDir, 'keep.txt'), 'utf-8');
      expect(content).toBe('keep me');

      adapter.close();
    });

    it('assets.list returns files under prefix', async () => {
      await writeFile(join(rootDir, 'a.txt'), 'a');
      await mkdir(join(rootDir, 'sub'), { recursive: true });
      await writeFile(join(rootDir, 'sub', 'b.txt'), 'b');

      const adapter = new BunProdAdapter({ rootDir });
      const files = await adapter.assets.list('');
      expect(files.sort()).toEqual(['a.txt', 'sub/b.txt']);

      adapter.close();
    });
  });
});
