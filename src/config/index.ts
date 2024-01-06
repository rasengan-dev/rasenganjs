import { type AppConfig } from "./type.js";

/**
 * Function to define the config for the app
 * It will be used by vite.config.ts and other files in other to configure the app
 * @param {AppConfig} loadedConfig
 */
export const defineConfig = (loadedConfig: AppConfig) => {
  const { reactStrictMode, server, vite } = loadedConfig;

  try {
    const config = {
      reactStrictMode: reactStrictMode === undefined ? true : reactStrictMode,
      server,
      vite: {
        plugins: vite?.plugins || [],

        optimizeDeps: {
          exclude: [
            "node:http",
            "node-fetch",
            ...(vite?.optimizeDeps?.exclude || []),
          ],
        },

        css: {
          postcss: vite?.css?.postcss || undefined,
        },

        build: {
          external: vite?.build?.external || [],
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
}
