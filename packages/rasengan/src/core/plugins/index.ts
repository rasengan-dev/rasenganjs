import { type Plugin } from 'vite';
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
  return {
    name: '@rasengan/hosting-plugin',
    buildEnd() {
      // Preparing app for deployment
      switch (adapter) {
        case Adapters.VERCEL: {
          break;
        }
        case Adapters.DEFAULT: {
          break;
        }
        default:
          break;
      }
    },
  };
}

export const plugins = [];
