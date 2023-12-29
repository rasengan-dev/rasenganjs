import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // define index.html location
  root: "./../../",
  optimizeDeps: {
    exclude: ["node:http", "node-fetch"],
  },

  build: {
    sourcemap: true,
  },

  ssr: {
    // Ignore CSS files
    noExternal: [/\.css$/],
  },

  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  }
});