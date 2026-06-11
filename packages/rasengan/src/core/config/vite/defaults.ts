// core/config/defaults.ts
import { join } from 'node:path';
import type { UserConfig } from 'vite';
import type { AppConfig } from '../type.js';

export const createDefaultViteConfig = (
  rootPath: string,
  __dirname: string,
  mode: string,
  config: AppConfig
): UserConfig => {
  // Combine core externals with user-defined externals
  const externals = [
    ...(Array.isArray(config.vite?.build?.external)
      ? config.vite.build.external
      : []),
  ];

  return {
    ...config.vite,

    root: rootPath,

    build: {
      sourcemap: mode === 'development',
      rollupOptions: {
        external: externals,
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
          rollupOptions: {
            input: './src/index',
          },
        },
      },

      /**
       * SSR Environment
       */
      ssr: {
        build: {
          outDir: 'dist/server',
          rollupOptions: {
            input: {
              'entry.server': join(
                __dirname,
                './lib/esm/entries/server/entry.server.js'
              ),
              'app.router': './src/app/app.router',
              main: './src/main',
              template: './src/template',
            },
          },
          ssrEmitAssets: false,
        },
      },

      /**
       * SSG Environment
       */
      ssg: {
        build: {
          outDir: 'dist/prerender',
          rollupOptions: {
            input: {
              'entry.server': join(
                __dirname,
                './lib/esm/entries/server/entry.server.js'
              ),
              'app.router': './src/app/app.router',
              main: './src/main',
              template: './src/template',
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
