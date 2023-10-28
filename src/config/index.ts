import { type AppConfig } from "./type.js";

export const defineConfig = (loadedConfig: AppConfig) => {
  const { reactStrictMode } = loadedConfig;

  try {
    const config = {
      reactStrictMode: reactStrictMode === undefined ? true : reactStrictMode,
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
