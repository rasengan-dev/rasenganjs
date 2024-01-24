import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load rasengan config file
// @ts-ignore
import config from "./../../rasengan.config.js";

// Importing __dirname
// @ts-ignore
import { fileURLToPath } from "url";
import path, { dirname } from "path";

// Extract vite config
const { vite } = config;

// Getting root path
const __dirname = dirname(fileURLToPath(import.meta.url));
const __pathToRoot = path.resolve(__dirname, "./../../");

export default defineConfig({
  plugins: [react(), ...vite?.plugins],

  // define index.html location
  root: __pathToRoot,
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
