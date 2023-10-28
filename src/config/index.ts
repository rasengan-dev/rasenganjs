import { AppConfig } from "./type.js";

export const defineConfig = (loadedConfig: AppConfig) => {
  try {
    const config = {
      reactStrictMode: loadedConfig.reactStrictMode || true,
      // More config options...
    };

    return config;
  } catch (error) {
    console.error(error);
    return {
      reactStrictMode: true,
    };
  }
}
