import { UserConfig, type Plugin } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { loadModuleSSR } from '../config/utils/load-modules.js';
import { AppConfig } from '../config/type.js';

function loadRasenganConfig(): Plugin {
  return {
    name: 'vite-plugin-rasengan-config',
    async config(_, { command }) {
      if (command !== 'build') return;

      const configPath = resolve(process.cwd(), 'rasengan.config.js');

      if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found at: ${configPath}`);
      }

      const rasenganConfig: AppConfig = await (
        await loadModuleSSR(configPath)
      ).default;

      const partialConfig = {
        server: rasenganConfig.server ?? {},
        redirects: rasenganConfig.redirects
          ? await rasenganConfig.redirects()
          : [],
      };

      // Inject the configuration as a global constant
      return {
        define: {
          ['__RASENGAN_CONFIG__']: JSON.stringify(partialConfig),
        },
      };
    },
  };
}

function rasenganConfigPlugin(): Plugin {
  const virtualModuleId = 'virtual:rasengan-config';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-rasengan-config',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // if (command !== "build") return;

        const configPath = resolve(process.cwd(), 'rasengan.config.js');

        if (!fs.existsSync(configPath)) {
          throw new Error(`Configuration file not found at: ${configPath}`);
        }

        const rasenganConfig: AppConfig = await (
          await loadModuleSSR(configPath)
        ).default;

        const partialConfig = {
          server: rasenganConfig.server ?? {},
          redirects: rasenganConfig.redirects
            ? await rasenganConfig.redirects()
            : [],
        };

        return `
          export const __RASENGAN_CONFIG__ = ${JSON.stringify(partialConfig)};
        `;
      }
    },
  };
}

function buildOutputInformation(): Plugin {
  const virtualModuleId = 'virtual:rasengan-build-info';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-rasengan-build-info',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `
          export const resolveBuildOptions = (buildPath) => {
            return {
              buildDirectory: buildPath,
              manifestPathDirectory: 'client/.vite',
              assetPathDirectory: 'client/assets',
              entryServerPath: 'server/entry.server.js',
            };
          };
        `;
      }
    },
  };
}

export const Adapters = {
  VERCEL: 'vercel',
  DEFAULT: '',
} as const;

export type Adapter = (typeof Adapters)[keyof typeof Adapters];

type RasenganPluginOptions = {
  adapter?: Adapter;
};

export function rasengan({
  adapter = Adapters.DEFAULT,
}: RasenganPluginOptions): Plugin {
  let config = {};

  return {
    name: 'vite-plugin-rasengan',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    closeBundle() {
      if (this.environment.name === 'client') {
        console.log('Client build done!');

        // Preparing app for deployment
        switch (adapter) {
          case Adapters.VERCEL: {
            console.log('Preparing app for deployment to Vercel');
            break;
          }

          default:
            break;
        }
      }
    },
  };
}

export const plugins: Plugin[] = [];
