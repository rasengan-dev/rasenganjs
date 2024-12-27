import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadModuleSSR, getDirname } from "./lib/esm/config/utils/index.js";
import { join } from "node:path";

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
	const rootPath = process.cwd();
	const __dirname = await getDirname(import.meta.url);

	// Format config path
	const configPath = join(`${rootPath}/rasengan.config.js`);

	// Get config
	const config = await(await loadModuleSSR(configPath)).default;

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
		root: rootPath,
		optimizeDeps: {
			exclude: vite?.optimizeDeps?.exclude,
			include: vite?.optimizeDeps?.include,
		},

		// Build options
		build: {
			sourcemap: mode === "development",
			minify: "esbuild",
			outDir: "./dist/client",
			rollupOptions: {
				input: "./src/index.ts",
				output: {
					manualChunks: undefined, // TODO: Add manual chunks
				},
				external: [...vite?.build?.external],
			},
			chunkSizeWarningLimit: 1000,
		},

		// Server options
		css: {
			modules: {
				localsConvention: "camelCaseOnly",
			},

			postcss: vite?.css?.postcss,
		},

		// Environment options
		environments: {
			ssr: {
				build: {
					outDir: "./dist/server",
					rollupOptions: {
						input: `${join(__dirname, "./lib/esm/entries/server/entry.server.js")}`,
					},
				},
			},
		},

		// Aliases
		resolve: {
			alias: vite?.resolve?.alias.map(
				(alias: { find: string; replacement: string }) => ({
					find: alias.find,
					replacement: join(rootPath, alias.replacement),
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
