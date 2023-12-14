import { type AppConfig } from "./type.js";

export const defineConfig = (loadedConfig: AppConfig) => {
  const { reactStrictMode, server } = loadedConfig;

  try {
    const config = {
      reactStrictMode: reactStrictMode === undefined ? true : reactStrictMode,
      server,
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
