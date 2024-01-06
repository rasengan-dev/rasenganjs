import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load rasengan config file
// @ts-ignore
import config from "./../../rasengan.config.js";

// Extract vite config
const { vite } = config;

export default defineConfig({
  plugins: [react(), ...vite?.plugins],

  // define index.html location
  root: "./../../",
  optimizeDeps: {
    exclude: [
      "node:http",
      "node-fetch",
      ...vite?.optimizeDeps?.exclude,
    ],
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      external: vite?.build?.external,
    },
  },

  ssr: {
    // Ignore CSS files
    noExternal: [/\.css$/],
  },

  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },

    postcss: vite?.css?.postcss,
  },

  appType: vite.appType,
});
