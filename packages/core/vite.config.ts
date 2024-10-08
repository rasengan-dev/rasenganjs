import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";

// Load config
// @ts-ignore
import config from "./../../rasengan.config.js";
// import { config } from "./AppEntry";

// Getting root path
let __pathToRoot = "";

/**
 * Configures the Vite build for the Rasengan.js application.
 *
 * This function is exported as the default configuration for the Vite build system.
 * It loads the Rasengan.js configuration file and uses it to configure the Vite build.
 *
 * The configuration includes:
 * - Defining environment variables
 * - Registering Vite plugins, including the React plugin
 * - Setting the root directory for the build
 * - Configuring dependency optimization
 * - Configuring the build output, including source maps and manual chunking
 * - Configuring SSR options, including ignoring CSS files
 * - Configuring CSS modules and PostCSS
 * - Configuring aliases for the build
 * - Setting the cache directory and environment variable prefix
 * - Configuring the app type
 *
 * @param {object} options - The Vite build options, including the command and mode.
 * @returns {object} The Vite configuration object.
 */
export default defineConfig(async ({ command, mode }: any) => {
	if (command === "serve") {
		__pathToRoot = process.cwd();
	} else {
		__pathToRoot = path.join(process.cwd(), "./../../");
	}

	// Extract vite config
	const { vite } = await config;

	return {
		// Define env
		define: {
			"process.env": process.env,
		},

		// Vite Plugins
		plugins: [react(), ...vite?.plugins],

		// define index.html location
		root: __pathToRoot,
		optimizeDeps: {
			exclude: vite?.optimizeDeps?.exclude,
			include: vite?.optimizeDeps?.include,
		},

		// Build options
		build: {
			sourcemap: mode === "development" ? true : false,
			minify: "esbuild",
			rollupOptions: {
				input: "./lib/esm/entries/entry-client.js",
				output: {
					manualChunks: undefined,
				},
				external: [...vite?.build?.external],
			},
			chunkSizeWarningLimit: 1000,
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
	};
});
