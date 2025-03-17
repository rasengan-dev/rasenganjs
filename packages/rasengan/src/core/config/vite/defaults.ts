// core/config/defaults.ts
import { join } from 'node:path';
import type { UserConfig } from 'vite';
import type { AppConfig } from '../type.js';

// Define core external packages
const CORE_EXTERNALS = [
  // '@rasenganjs/mdx',
  // '@rasenganjs/vercel',
  // '@rasenganjs/netlify',
];

export const createDefaultViteConfig = (
  rootPath: string,
  __dirname: string,
  mode: string,
  config: AppConfig
): UserConfig => {
  // Combine core externals with user-defined externals
  const externals = [
    ...CORE_EXTERNALS,
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

            if (config.ssr) {
              if (id.includes('src/app') && id.includes('.page.')) {
                const parts = id.split('src/app')[1]?.split('/');
                if (parts?.length) {
                  const pageName = parts.pop()?.split('.')[0];
                  return pageName ? `page-${pageName}` : undefined;
                }
              }
            }
            return undefined;
          },
        },
      },
      outDir: 'dist',
      chunkSizeWarningLimit: 1000,
    },

    environments: {
      client: {
        build: {
          manifest: true,
          outDir: config.ssr ? 'dist/client' : 'dist',
          rollupOptions: {
            input: './src/index',
          },
        },
      },
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
              config: './rasengan.config.js',
            },
          },
          ssrEmitAssets: false,
        },
      },
    },

    resolve: {
      alias: Array.isArray(config.vite?.resolve?.alias)
        ? config.vite.resolve.alias.map(({ find, replacement }) => ({
            find,
            replacement: join(rootPath, replacement),
          }))
        : [],
    },

    builder: {
      buildApp: async (builder) => {
        if (config.ssr) {
          await builder.build(builder.environments.ssr);
        }
        await builder.build(builder.environments.client);
      },
    },

    cacheDir: '.rasengan/',
    envPrefix: 'RASENGAN_',
    appType: 'custom',
  };
};
