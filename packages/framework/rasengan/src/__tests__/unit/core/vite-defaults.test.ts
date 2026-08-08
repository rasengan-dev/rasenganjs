import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createDefaultViteConfig } from '../../../core/config/vite/defaults.js';
import type { AppConfig } from '../../../core/config/type.js';

const tempDirs: string[] = [];

function makeRoot(withApiRoutes = false): string {
  const dir = mkdtempSync(join(tmpdir(), 'rasengan-vite-defaults-'));
  tempDirs.push(dir);
  if (withApiRoutes) {
    mkdirSync(join(dir, 'src/app/_api'), { recursive: true });
  }
  return dir;
}

afterEach(() => {
  while (tempDirs.length) {
    rmSync(tempDirs.pop()!, { recursive: true, force: true });
  }
});

describe('createDefaultViteConfig', () => {
  it('sets root, cacheDir, envPrefix and appType', () => {
    const root = makeRoot();
    const cfg = createDefaultViteConfig(root, '/pkg', 'production', {});

    expect(cfg.root).toBe(root);
    expect(cfg.cacheDir).toBe('.rasengan/');
    expect(cfg.envPrefix).toBe('RASENGAN_');
    expect(cfg.appType).toBe('custom');
  });

  it('enables build sourcemaps only in development mode', () => {
    const root = makeRoot();
    expect(
      createDefaultViteConfig(root, '/pkg', 'development', {}).build!.sourcemap
    ).toBe(true);
    expect(
      createDefaultViteConfig(root, '/pkg', 'production', {}).build!.sourcemap
    ).toBe(false);
  });

  it('externalizes Node builtins for ssr/ssg when runtime is "node" (the default)', () => {
    const root = makeRoot();
    const cfg = createDefaultViteConfig(root, '/pkg', 'production', {});
    const external = (cfg.environments!.ssr!.build!.rolldownOptions as any)
      .external as string[];

    expect(external).toContain('fs');
    expect(external).toContain('node:fs');
  });

  it('does not externalize Node builtins for the "workerd" runtime', () => {
    const root = makeRoot();
    const cfg = createDefaultViteConfig(root, '/pkg', 'production', {
      runtime: 'workerd',
    });
    const external = (cfg.environments!.ssr!.build!.rolldownOptions as any)
      .external as string[];

    expect(external).not.toContain('fs');
  });

  it('sets resolve.conditions for bun/workerd but not for node', () => {
    const root = makeRoot();

    const nodeCfg = createDefaultViteConfig(root, '/pkg', 'production', {
      runtime: 'node',
    });
    expect(nodeCfg.environments!.ssr!.resolve).toBeUndefined();

    const bunCfg = createDefaultViteConfig(root, '/pkg', 'production', {
      runtime: 'bun',
    });
    expect(bunCfg.environments!.ssr!.resolve).toEqual({
      conditions: ['bun'],
    });

    const workerdCfg = createDefaultViteConfig(root, '/pkg', 'production', {
      runtime: 'workerd',
    });
    expect(workerdCfg.environments!.ssg!.resolve).toEqual({
      conditions: ['workerd', 'edge-light', 'worker'],
    });
  });

  it('concatenates user-provided build.external onto the ssr externals without dropping them', () => {
    const root = makeRoot();
    const cfg = createDefaultViteConfig(root, '/pkg', 'production', {
      vite: { build: { external: ['my-external-pkg'] } },
    } as AppConfig);

    const external = (cfg.environments!.ssr!.build!.rolldownOptions as any)
      .external as string[];
    expect(external).toContain('my-external-pkg');
    expect(external).toContain('fs');
  });

  it('sets client outDir to dist/client when ssr or prerender is enabled, else dist', () => {
    const root = makeRoot();

    expect(
      createDefaultViteConfig(root, '/pkg', 'production', {}).environments!
        .client!.build!.outDir
    ).toBe('dist');

    expect(
      createDefaultViteConfig(root, '/pkg', 'production', { ssr: true })
        .environments!.client!.build!.outDir
    ).toBe('dist/client');

    expect(
      createDefaultViteConfig(root, '/pkg', 'production', { prerender: true })
        .environments!.client!.build!.outDir
    ).toBe('dist/client');
  });

  it('adds an "api-router" ssr/ssg build input only when src/app/_api exists', () => {
    const rootWithApi = makeRoot(true);
    const withApi = createDefaultViteConfig(
      rootWithApi,
      '/pkg',
      'production',
      {}
    );
    expect(
      (withApi.environments!.ssr!.build!.rolldownOptions as any).input[
        'api-router'
      ]
    ).toBe('virtual:rasengan/api-router');

    const rootWithoutApi = makeRoot(false);
    const withoutApi = createDefaultViteConfig(
      rootWithoutApi,
      '/pkg',
      'production',
      {}
    );
    expect(
      (withoutApi.environments!.ssr!.build!.rolldownOptions as any).input
    ).not.toHaveProperty('api-router');
  });

  it('maps resolve.alias entries to be relative to rootPath', () => {
    const root = makeRoot();
    const cfg = createDefaultViteConfig(root, '/pkg', 'production', {
      vite: {
        resolve: { alias: [{ find: '@', replacement: './src' }] },
      },
    } as AppConfig);

    expect((cfg.resolve!.alias as any)[0]).toEqual({
      find: '@',
      replacement: join(root, './src'),
    });
  });

  it('defaults resolve.alias to an empty array when none is configured', () => {
    const root = makeRoot();
    const cfg = createDefaultViteConfig(root, '/pkg', 'production', {});
    expect(cfg.resolve!.alias).toEqual([]);
  });

  describe('builder.buildApp', () => {
    async function runBuilder(config: AppConfig) {
      const root = makeRoot();
      const cfg = createDefaultViteConfig(root, '/pkg', 'production', config);
      const calls: string[] = [];
      const fakeBuilder = {
        environments: { ssr: 'ssr-env', ssg: 'ssg-env', client: 'client-env' },
        build: async (env: string) => {
          calls.push(env);
        },
      };
      await (cfg.builder!.buildApp as any)(fakeBuilder);
      return calls;
    }

    it('builds ssr then client when ssr is enabled without prerender', async () => {
      expect(await runBuilder({ ssr: true })).toEqual([
        'ssr-env',
        'client-env',
      ]);
    });

    it('builds ssg then client when prerender is enabled (ssr build is skipped even if also set)', async () => {
      expect(await runBuilder({ ssr: true, prerender: true })).toEqual([
        'ssg-env',
        'client-env',
      ]);
    });

    it('builds only client when neither ssr nor prerender is enabled', async () => {
      expect(await runBuilder({})).toEqual(['client-env']);
    });
  });
});
