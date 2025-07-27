import { ResolvedConfig, type Plugin } from 'vite';
import path, { resolve } from 'path';
import fs from 'fs';
import { loadModuleSSR } from '../config/utils/load-modules.js';
import { AppConfig, AppConfigFunctionAsync } from '../config/type.js';
import { resolveBuildOptions } from '../../server.js';
import { renderIndexHTML } from '../../server/build/rendering.js';
import { flatRoutes } from '../../routing/index.js';

function loadRasenganGlobal(): Plugin {
  return {
    name: 'vite-plugin-rasengan-config',
    async config(_, { command }) {
      if (command !== 'build') return;

      const packageJsonPath = resolve(process.cwd(), 'package.json');

      if (!fs.existsSync(packageJsonPath)) {
        throw new Error(`Package.json file not found at: ${packageJsonPath}`);
      }

      const packageJsonRaw = fs.readFileSync(packageJsonPath, {
        encoding: 'utf-8',
      });
      const packageJson = JSON.parse(packageJsonRaw);

      const rasenganConfig = {
        version: packageJson.version,
        ssr: true,
      };

      // Inject the configuration as a global constant
      return {
        define: {
          ['Rasengan']: JSON.stringify(rasenganConfig),
        },
      };
    },
    apply: 'build',
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

function flatRoutesPlugin(): Plugin {
  const virtualModuleId = 'virtual:rasengan:router';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-rasengan-router',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `
          import { flatRoutes } from 'rasengan';

          const Router = flatRoutes(() => {
            return import.meta.glob(
              [
                '/src/app/_routes/**/layout.{js,ts,jsx,tsx}',
                '/src/app/_routes/**/*.page.{md,mdx,js,ts,jsx,tsx}',
              ],
              { eager: true }
            );
          });

          export default Router;
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

export interface AdapterOptions {}

export interface AdapterConfig {
  name: Adapter;
  prepare: () => Promise<void>;
}

type RasenganPluginOptions = {
  adapter?: AdapterConfig;
};

export function rasengan({
  adapter = { name: Adapters.DEFAULT, prepare: async () => {} },
}: RasenganPluginOptions): Plugin {
  let config: AppConfig;
  let viteConfig: ResolvedConfig;

  const buildOptions = resolveBuildOptions({});

  return {
    name: 'vite-plugin-rasengan',

    async config() {
      // load rasengan.config.js
      const configPath = resolve(process.cwd(), 'rasengan.config.js');

      if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found at: ${configPath}`);
      }

      const rasenganConfigHandler: AppConfigFunctionAsync = await (
        await loadModuleSSR(configPath)
      ).default;

      config = await rasenganConfigHandler();
    },

    async load(id: string) {
      if (id === 'virtual:rasengan-config') {
        return `
          export const __RASENGAN_CONFIG__ = ${JSON.stringify(config)};
        `;
      }
    },

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    async writeBundle(_) {
      const modulePaths = ['template.jsx', 'template.tsx'].map((file) => {
        return path.posix.join(process.cwd(), 'src', file);
      });
      const modulePath = modulePaths.find((modulePath) => {
        return fs.existsSync(modulePath);
      });

      const module = await this.load({ id: modulePath });

      // SPA mode only
      if (!config.ssr) {
        // Generate the template.js file into the dist/assets
        fs.writeFileSync(
          path.posix.join(
            process.cwd(),
            buildOptions.buildDirectory,
            buildOptions.assetPathDirectory,
            'template.js'
          ),
          module.code,
          'utf-8'
        );
      }
    },

    async closeBundle() {
      // We check here if the environment is client has been built because it's the
      // last environment to be built in the Vite build process
      if (this.environment.name === 'client') {
        // Check if SPA mode is enabled
        if (!config.ssr) {
          // Load the template.js file
          const templatePath = path.posix.join(
            process.cwd(),
            buildOptions.buildDirectory,
            buildOptions.assetPathDirectory,
            'template.js'
          );

          const Template = (await import(templatePath)).default;

          // Render the index.html file
          await renderIndexHTML(Template, {
            rootPath: process.cwd(),
            config,
          });
        }

        // Generate a config.json file into the dist/client/assets or dist/assets
        const minimizedConfig = {
          buildOptions,
          ssr: config.ssr,
          redirects: await config.redirects(),
        };

        fs.writeFileSync(
          path.posix.join(
            process.cwd(),
            buildOptions.buildDirectory,
            config.ssr ? buildOptions.clientPathDirectory : '',
            buildOptions.assetPathDirectory,
            'config.json'
          ),
          JSON.stringify(minimizedConfig),
          'utf-8'
        );

        // Prepare the app for deployment
        await prepareToDeploy(adapter);
      }
    },

    apply: 'build',
  };
}

const prepareToDeploy = async (adapter: AdapterConfig): Promise<void> => {
  // Preparing app for deployment
  switch (adapter.name) {
    case Adapters.VERCEL: {
      await adapter.prepare();

      break;
    }

    default:
      break;
  }
};

export const plugins: Plugin[] = [loadRasenganGlobal(), flatRoutesPlugin()];
