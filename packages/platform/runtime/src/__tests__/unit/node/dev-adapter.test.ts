import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, writeFile, unlink, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { NodeDevAdapter } from '../../../adapters/node/dev.js';

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

describe('NodeDevAdapter', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = join(tmpdir(), `rasengan-dev-test-${randomUUID()}`);
    await mkdir(rootDir, { recursive: true });
  });

  afterEach(async () => {
    await rmdir(rootDir, { recursive: true }).catch(() => {});
  });

  it('starts and stops a server', async () => {
    const adapter = new NodeDevAdapter({ port: 0, rootDir });
    const app = createMockApp();

    const started = new Promise<void>((resolve) => {
      const origServe = adapter.serve.bind(adapter);
      adapter.serve = (a: any, opts?: any) =>
        origServe(a, { ...opts, onListening: () => resolve() });
    });

    const servePromise = adapter.serve(app);
    await started;
    await adapter.close();
    await servePromise;
  });

  it('starts server and responds to requests', async () => {
    const adapter = new NodeDevAdapter({ port: 0, rootDir });
    const app = createMockApp();

    const { port, servePromise } = await new Promise<{
      port: number;
      servePromise: Promise<void>;
    }>((resolve) => {
      const origServe = adapter.serve.bind(adapter);
      adapter.serve = (a: any, opts?: any) => {
        const sp = origServe(a, {
          ...opts,
          onListening: (i: { port: number }) =>
            resolve({ port: i.port, servePromise: sp }),
        });
      };
      adapter.serve(app);
    });

    const res = await fetch(`http://127.0.0.1:${port}/test`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('ok');

    await adapter.close();
    await servePromise;
  });

  it('passes a waitUntil-capable executionCtx to app.fetch() (RFC-0013)', async () => {
    const adapter = new NodeDevAdapter({ port: 0, rootDir });
    const app = createRecordingMockApp();

    const { port, servePromise } = await new Promise<{
      port: number;
      servePromise: Promise<void>;
    }>((resolve) => {
      const origServe = adapter.serve.bind(adapter);
      adapter.serve = (a: any, opts?: any) => {
        const sp = origServe(a, {
          ...opts,
          onListening: (i: { port: number }) =>
            resolve({ port: i.port, servePromise: sp }),
        });
        return sp;
      };
      adapter.serve(app);
    });

    await fetch(`http://127.0.0.1:${port}/`);
    await adapter.close();
    await servePromise;

    expect(app.calls).toHaveLength(1);
    expect(typeof app.calls[0].executionCtx.waitUntil).toBe('function');
  });

  it('provides assets instance', () => {
    const adapter = new NodeDevAdapter({ rootDir });
    expect(adapter.assets).toBeDefined();
    expect(typeof adapter.assets.get).toBe('function');
  });

  it('throws if app is null', async () => {
    const adapter = new NodeDevAdapter({ rootDir });
    await expect(adapter.serve(null)).rejects.toThrow(
      "Futon's app is required"
    );
    await adapter.close();
  });

  it('watch returns a dispose function', async () => {
    const adapter = new NodeDevAdapter({ rootDir });
    const dispose = adapter.watch(rootDir, () => {});
    expect(typeof dispose).toBe('function');
    dispose();
    await adapter.close();
  });

  it('is idempotent on close', async () => {
    const adapter = new NodeDevAdapter({ rootDir });
    await adapter.close();
    await adapter.close();
  });
});
