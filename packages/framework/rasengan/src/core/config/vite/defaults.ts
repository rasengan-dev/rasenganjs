// core/config/defaults.ts
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { builtinModules } from 'node:module';
import type { UserConfig } from 'vite';
import type { AppConfig } from '../type.js';

/**
 * `node:`-prefixed and bare Node builtin specifiers (`fs`, `node:fs`,
 * ...) — externalized for the `ssr`/`ssg` environments only when
 * targeting `runtime: 'node'` (RFC-0007 §5). Bun/Workerd builds don't
 * externalize these: Bun supports most of them natively but bundling
 * is still the safer default there, and Workerd has no filesystem/
 * process APIs to externalize *to* in the first place.
 */
const NODE_BUILTIN_EXTERNALS = builtinModules.flatMap((mod) => [
  mod,
  `node:${mod}`,
]);

/**
 * `resolve.conditions` per target runtime — lets package `exports`
 * maps that branch on condition (edge/worker-specific builds) resolve
 * to the right entry point. `node` uses Vite's own default (no
 * override needed).
 */
const RUNTIME_RESOLVE_CONDITIONS: Record<
  NonNullable<AppConfig['runtime']>,
  string[] | undefined
> = {
  node: undefined,
  bun: ['bun'],
  workerd: ['workerd', 'edge-light', 'worker'],
};

export const createDefaultViteConfig = (
  rootPath: string,
  __dirname: string,
  mode: string,
  config: AppConfig
): UserConfig => {
  const runtime = config.runtime ?? 'node';

  // User-provided externals — unchanged, shared by every environment
  // (including client) via Vite's top-level `build` inheritance.
  const userExternals = Array.isArray(config.vite?.build?.external)
    ? config.vite.build.external
    : [];

  // Node builtins are only externalized for ssr/ssg — never at the
  // top level, which client also inherits from, and a browser bundle
  // must never mark `node:fs` external. Concatenated with user
  // externals, not overriding them (RFC-0007 §5 Open Questions).
  const ssrExternals = [
    ...(runtime === 'node' ? NODE_BUILTIN_EXTERNALS : []),
    ...userExternals,
  ];

  const runtimeConditions = RUNTIME_RESOLVE_CONDITIONS[runtime];

  // Auto-detected — no wrapper file needed (RFC-0008 §4). Only added to
  // the ssr/ssg build entries when the folder actually exists, so apps
  // not using the feature pay nothing for it.
  const hasApiRoutes = existsSync(join(rootPath, 'src/app/_api'));

  return {
    ...config.vite,

    root: rootPath,

    build: {
      sourcemap: mode === 'development',
      rolldownOptions: {
        external: userExternals,
        input: './src/index',
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) return 'vendor';
            if (id.includes('src/components')) return 'shared-components';

            return undefined;
          },
        },
      },
      outDir: 'dist',
      chunkSizeWarningLimit: 2000,
    },

    environments: {
      /**
       * Client Environment
       */
      client: {
        build: {
          manifest: true,
          outDir: config.ssr || config.prerender ? 'dist/client' : 'dist',
          rolldownOptions: {
            input: './src/index',
          },
        },
      },

      /**
       * SSR Environment
       */
      ssr: {
        resolve: runtimeConditions
          ? { conditions: runtimeConditions }
          : undefined,
        build: {
          outDir: 'dist/server',
          rolldownOptions: {
            external: ssrExternals,
            input: {
              'entry.server': join(
                __dirname,
                './lib/esm/entries/server/entry.server.js'
              ),
              'app.router': './src/app/app.router',
              main: './src/main',
              template: './src/template',
              ...(hasApiRoutes
                ? { 'api-router': 'virtual:rasengan/api-router' }
                : {}),
            },
          },
          ssrEmitAssets: false,
        },
      },

      /**
       * SSG Environment
       */
      ssg: {
        resolve: runtimeConditions
          ? { conditions: runtimeConditions }
          : undefined,
        build: {
          outDir: 'dist/prerender',
          rolldownOptions: {
            external: ssrExternals,
            input: {
              'entry.server': join(
                __dirname,
                './lib/esm/entries/server/entry.server.js'
              ),
              'app.router': './src/app/app.router',
              main: './src/main',
              template: './src/template',
              ...(hasApiRoutes
                ? { 'api-router': 'virtual:rasengan/api-router' }
                : {}),
            },
          },
          ssrEmitAssets: false,
        },
      },
    },

    // Resolve config
    resolve: {
      alias: Array.isArray(config.vite?.resolve?.alias)
        ? config.vite.resolve.alias.map(({ find, replacement }) => ({
            find,
            replacement: join(rootPath, replacement),
          }))
        : [],
    },

    // Builder config
    builder: {
      buildApp: async (builder) => {
        if (config.ssr) {
          if (!config.prerender) {
            await builder.build(builder.environments.ssr);
          }
        }

        if (config.prerender) {
          await builder.build(builder.environments.ssg);
        }

        await builder.build(builder.environments.client);
      },
    },

    cacheDir: '.rasengan/',
    envPrefix: 'RASENGAN_',
    appType: 'custom',
  };
};
