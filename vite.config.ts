import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Load rasengan config file
// @ts-ignore
import config from "./../../rasengan.config.js";

// Importing __dirname
// @ts-ignore
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

// Extract vite config
const { vite } = config;

// Getting root path
const __dirname = dirname(fileURLToPath(import.meta.url));
const __pathToRoot = path.resolve(__dirname, "./../../");

const external = [
  // `${__pathToRoot}/node_modules/rasengan/lib/esm/server/utils/handleRequest.js`,
  // `${__pathToRoot}/node_modules/rasengan/lib/cjs/server/utils/handleRequest.js`,
]

export default defineConfig({
  // Define env
  define: {
    "process.env": loadEnv("", __pathToRoot),
  },

  // Vite Plugins
  plugins: [react(), ...vite?.plugins],

  // define index.html location
  root: __pathToRoot,
  optimizeDeps: {
    exclude: vite?.optimizeDeps?.exclude,
    include: vite?.optimizeDeps?.include
  },

  // Build options
  build: {
    sourcemap: true,
    rollupOptions: {
      input: "./lib/esm/entries/entry-client.js",
      output: {
        manualChunks: undefined
      },
      external: [
        ...vite?.build?.external,
        ...external
      ],
    },
  },

  // SSR options
  ssr: {
    // Ignore CSS files
    noExternal: [/\.css$/],
  },

  // Server options
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },

    postcss: vite?.css?.postcss,
  },

  // Aliases
  resolve: {
    alias: vite?.resolve?.alias.map(
      (alias: { find: string; replacement: string }) => ({
        find: alias.find,
        replacement: path.join(__pathToRoot, alias.replacement),
      })
    ),
  },

  // Cache directory
  cacheDir: ".rasengan/",

  // Environment variable prefix
  envPrefix: "RASENGAN_",

  // App type
  appType: vite.appType,
});
