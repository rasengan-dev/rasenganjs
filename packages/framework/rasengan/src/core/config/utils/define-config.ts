import type {
  AppConfig,
  AppConfigFunction,
  AppConfigFunctionAsync,
  ViteConfig,
} from '../type.js';

/**
 * Vite `UserConfig` keys `ViteConfig`'s type already excludes (see
 * `type.ts`) — rasengan computes these itself and a user config can't
 * safely override them. `Omit<...>` only enforces this at the type
 * level; `rasengan.config.js` is plain JS, so nothing stops a
 * mistaken (or `// @ts-ignore`d) config from setting one anyway and
 * silently clobbering rasengan's own Vite setup. Stripped here, at
 * runtime, right after the user's `vite` config is read — not just
 * relied on via the type system (RFC-0007 §5).
 */
const RESERVED_VITE_KEYS = [
  'environments',
  'cacheDir',
  'envPrefix',
  'builder',
  'ssr',
  'server',
  'ssrEmitAssets',
  'root',
  'base',
] as const;

function stripReservedViteKeys(
  vite: Record<string, unknown> | undefined
): ViteConfig {
  if (!vite) return {};
  const stripped = { ...vite };
  for (const key of RESERVED_VITE_KEYS) {
    delete stripped[key];
  }
  return stripped as ViteConfig;
}

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

    const { ssr, prerender, sageMode, server, vite, redirects, runtime } =
      config;

    const defaultSageModeConfig = {
      reactCompiler: sageMode?.reactCompiler ?? false,
    };

    // Define default values for vite config coming from loadedConfig.vite
    const strippedVite = stripReservedViteKeys(
      vite as Record<string, unknown> | undefined
    );
    const defaultViteConfig = {
      ...strippedVite,
      resolve: {
        symbole: strippedVite.resolve?.symbole || '@',
        alias: strippedVite.resolve?.alias || [],
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
        runtime: runtime ?? 'node',
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
        runtime: 'node',
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
