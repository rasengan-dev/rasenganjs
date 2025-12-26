import type {
  AppConfig,
  AppConfigFunction,
  AppConfigFunctionAsync,
} from '../type.js';

/**
 * Function to define the config for the app
 * It will be used by vite.config.ts and other files in other to configure the app
 * @param {AppConfig | AppConfigFunction | AppConfigFunctionAsync} loadedConfig
 */
export const defineConfig = async (
  loadedConfig: AppConfig | AppConfigFunction | AppConfigFunctionAsync
): Promise<() => Promise<AppConfig>> => {
  return async () => {
    let config: AppConfig;

    // Check if the loadedConfig is a function
    if (typeof loadedConfig === 'function') {
      // Call the function to get the config
      const result = loadedConfig();

      // Check if it's a promise (asynchronous function)
      if (result instanceof Promise) {
        config = await result; // Await the promise result (AppConfigFunctionAsync)
      } else {
        config = result as AppConfig; // Synchronous function result (AppConfigFunction)
      }
    } else {
      config = loadedConfig;
    }

    const { ssr, prerender, sageMode, server, vite, redirects } = config;

    const defaultSageModeConfig = {
      reactCompiler: sageMode?.reactCompiler ?? false,
    };

    // Define default values for vite config coming from loadedConfig.vite
    const defaultViteConfig = {
      ...vite,
      resolve: {
        symbole: vite?.resolve?.symbole || '@',
        alias: vite?.resolve?.alias || [],
      },
    };

    // Define default values for server config coming from loadedConfig.server
    const defaultServerConfig = {
      development: {
        port: server?.development?.port || undefined,
        open: server?.development?.open || false,
      },
    };

    // Define default values for redirects config coming from loadedConfig.redirects
    const defaultRedirectsConfig =
      redirects || (() => new Promise((resolve) => resolve([])));

    try {
      const config: AppConfig = {
        ssr: ssr ?? true,
        prerender: prerender ?? false,
        server: defaultServerConfig,
        sageMode: defaultSageModeConfig,
        vite: {
          ...defaultViteConfig,
          resolve: {
            alias: [
              {
                find: defaultViteConfig.resolve.symbole,
                replacement: './src',
              },
              ...defaultViteConfig.resolve.alias,
            ],
          },
        },
        redirects: defaultRedirectsConfig,
      };

      return config;
    } catch (error) {
      return {
        ssr: true,
        prerender: false,
        sageMode: {
          reactCompiler: false,
        },
        vite: {
          appType: 'custom',
          resolve: {
            alias: [
              {
                find: '@',
                replacement: './src',
              },
            ],
          },
        },
        redirects: () => new Promise((resolve) => resolve([])),
      };
    }
  };
};
