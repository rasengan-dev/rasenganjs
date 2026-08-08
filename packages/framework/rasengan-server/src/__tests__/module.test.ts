import { describe, it, expect } from 'vitest';
import type { Middleware } from '@rasenganjs/futon';

describe('defineModule', () => {
  it('returns a ModuleConfig with given properties', async () => {
    const { defineModule } = await import('../server/module.js');

    const config = defineModule({
      prefix: '/api',
      controllers: [],
      providers: [],
    });

    expect(config.prefix).toBe('/api');
    expect(config.controllers).toEqual([]);
    expect(config.providers).toEqual([]);
  });

  it('accepts middlewares array', async () => {
    const { defineModule } = await import('../server/module.js');

    const mw: Middleware = async (_ctx, next) => next();

    const config = defineModule({
      middlewares: [mw],
      controllers: [],
    });

    expect(config.middlewares).toHaveLength(1);
    expect(config.middlewares![0]).toBe(mw);
  });

  it('accepts nested imports', async () => {
    const { defineModule } = await import('../server/module.js');

    const child = defineModule({
      prefix: '/child',
      controllers: [],
    });

    const parent = defineModule({
      prefix: '/parent',
      imports: [child],
      controllers: [],
    });

    expect(parent.imports).toHaveLength(1);
    expect(parent.imports![0].prefix).toBe('/child');
  });

  it('returns the same config reference', async () => {
    const { defineModule } = await import('../server/module.js');

    const input = { controllers: [] };
    const output = defineModule(input);
    expect(output).toBe(input);
  });
});

describe('defineConfig', () => {
  it('returns the same config reference', async () => {
    const { defineConfig } = await import('../config/index.js');

    const input = { port: 3000 };
    const output = defineConfig(input);
    expect(output).toBe(input);
  });

  it('accepts partial config', async () => {
    const { defineConfig } = await import('../config/index.js');

    const config = defineConfig({
      entry: 'src/server.ts',
      port: 4000,
    });

    expect(config.entry).toBe('src/server.ts');
    expect(config.port).toBe(4000);
  });

  it('accepts build config with formats', async () => {
    const { defineConfig } = await import('../config/index.js');

    const config = defineConfig({
      build: {
        outDir: 'custom-dist',
        minify: false,
        formats: ['single-file'],
      },
    });

    expect(config.build?.outDir).toBe('custom-dist');
    expect(config.build?.formats).toEqual(['single-file']);
  });
});
