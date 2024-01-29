import { type AppConfig } from "./type.js";

/**
 * Function to define the config for the app
 * It will be used by vite.config.ts and other files in other to configure the app
 * @param {AppConfig} loadedConfig
 */
export const defineConfig = (loadedConfig: AppConfig) => {
  const { reactStrictMode, server, vite } = loadedConfig;

  // Define default values for vite config coming from loadedConfig.vite
  const defaultViteConfig = {
    plugins: vite?.plugins || [],
    optimizeDeps: {
      exclude: vite?.optimizeDeps?.exclude || [],
    },
    css: {
      postcss: vite?.css?.postcss || undefined,
    },
    build: {
      external: vite?.build?.external || [],
    },
    resolve: {
      alias: vite?.resolve?.alias || [],
    },
  };

  try {
    const config = {
      reactStrictMode: reactStrictMode === undefined ? true : reactStrictMode,
      server,
      vite: {
        plugins: defaultViteConfig.plugins,

        optimizeDeps: {
          exclude: [
            "node:http",
            "node-fetch",
            ...defaultViteConfig.optimizeDeps.exclude,
          ],
        },

        css: {
          postcss: defaultViteConfig.css.postcss,
        },

        build: {
          external: defaultViteConfig.build.external,
        },

        resolve: {
          // concat two arrays
          alias: [
            {
              find: "@/",
              replacement: "src/",
            },
            ...defaultViteConfig.resolve.alias,
          ],
        },

        appType: "custom",
      },
      // More config options...
    };

    return config;
  } catch (error) {
    console.error(error);
    return {
      reactStrictMode: true,
      vite: {
        optimizeDeps: {
          exclude: ["node:http", "node-fetch"],
        },
        appType: "custom",
        resolve: {
          alias: [
            {
              find: "@/",
              replacement: "src/",
            },
          ],
        },
      },
    };
  }
};

/**
 * Function to adapt the path for dev and prod
 * @param {string | Array<string>} paths
 */
export const adaptPath = (paths: string | Array<string>) => {
  // Check if we are in dev mode or prod
  const isProduction = process.env.NODE_ENV === "production";
  const prefix = isProduction ? "./../../" : "";

  // Chech if the path is an array
  const isArray = Array.isArray(paths);

  // If the path is an array
  if (isArray) {
    return paths.map((path) => `${prefix}${path}`);
  }

  // If the path is a string
  return `${prefix}${paths}`;
};
