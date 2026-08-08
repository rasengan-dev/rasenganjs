import { describe, it, expect } from 'vitest';
import { defineConfig } from '../../../core/config/utils/define-config.js';

describe('defineConfig', () => {
  it('accepts a plain AppConfig object directly', async () => {
    const handler = await defineConfig({ ssr: false });
    const config = await handler();
    expect(config.ssr).toBe(false);
  });

  it('accepts a synchronous config function', async () => {
    const handler = await defineConfig(() => ({ ssr: false }));
    const config = await handler();
    expect(config.ssr).toBe(false);
  });

  it('accepts an asynchronous config function', async () => {
    const handler = await defineConfig(async () => ({ prerender: true }));
    const config = await handler();
    expect(config.prerender).toBe(true);
  });

  it('defaults runtime to "node" when unset', async () => {
    const handler = await defineConfig({});
    const config = await handler();
    expect(config.runtime).toBe('node');
  });

  it('respects an explicit runtime override', async () => {
    const handler = await defineConfig({ runtime: 'bun' });
    const config = await handler();
    expect(config.runtime).toBe('bun');
  });

  it('defaults ssr to true when unset', async () => {
    const handler = await defineConfig({});
    const config = await handler();
    expect(config.ssr).toBe(true);
  });

  it('defaults prerender to false when unset', async () => {
    const handler = await defineConfig({});
    const config = await handler();
    expect(config.prerender).toBe(false);
  });

  it('defaults redirects() to an empty array when not provided', async () => {
    const handler = await defineConfig({});
    const config = await handler();
    await expect(config.redirects!()).resolves.toEqual([]);
  });

  it('uses the user-provided redirects() function when given', async () => {
    const redirects = async () => [
      { source: '/old', destination: '/new', permanent: true },
    ];
    const handler = await defineConfig({ redirects });
    const config = await handler();
    await expect(config.redirects!()).resolves.toEqual([
      { source: '/old', destination: '/new', permanent: true },
    ]);
  });

  it('strips reserved Vite keys from the user-provided vite config at runtime', async () => {
    const handler = await defineConfig({
      vite: {
        // These are reserved (rasengan computes them itself) — a plain JS
        // config bypassing the AppConfig type could still set them.
        ssr: { external: ['whatever'] },
        server: { port: 1234 },
        environments: { fake: {} },
        // A legitimate, non-reserved key should survive.
        plugins: [],
      } as any,
    });

    const config = await handler();

    expect(config.vite).not.toHaveProperty('ssr');
    expect(config.vite).not.toHaveProperty('server');
    expect(config.vite).not.toHaveProperty('environments');
    expect(config.vite).toHaveProperty('plugins');
  });

  it('prepends the default "@" -> "./src" alias, keeping user-provided aliases', async () => {
    const handler = await defineConfig({
      vite: {
        resolve: {
          alias: [{ find: '~', replacement: './other' }],
        },
      },
    });

    const config = await handler();

    expect(config.vite?.resolve?.alias).toEqual([
      { find: '@', replacement: './src' },
      { find: '~', replacement: './other' },
    ]);
  });

  it('uses a custom resolve.symbole as the default alias find key', async () => {
    const handler = await defineConfig({
      vite: {
        resolve: { symbole: '~', alias: [] },
      },
    });

    const config = await handler();

    expect(config.vite?.resolve?.alias).toEqual([
      { find: '~', replacement: './src' },
    ]);
  });

  it('defaults sageMode.reactCompiler to false when unset', async () => {
    const handler = await defineConfig({});
    const config = await handler();
    expect(config.sageMode?.reactCompiler).toBe(false);
  });

  it('respects an explicit sageMode.reactCompiler override', async () => {
    const handler = await defineConfig({
      sageMode: { reactCompiler: true },
    });
    const config = await handler();
    expect(config.sageMode?.reactCompiler).toBe(true);
  });
});
