import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadModuleSSR } from "../utils/load-modules.js";
import { isServerMode, ServerMode } from "../../../server/runtime/mode.js";

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
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
	// Load getDirname function and join function
	const { getDirname } = await import("../utils/load-modules.js");
	const { join } = await import("node:path");

	// Get root path
	const rootPath = process.cwd();
	const __dirname = await getDirname(import.meta.url);

	// Format config path
	const configPath = join(`${rootPath}/rasengan.config.js`);

	// Get config
	const config = await (await loadModuleSSR(configPath)).default;

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
			sourcemap:
				(isServerMode(mode) && mode === ServerMode.Development) ?? false,
			minify: "esbuild",
			outDir: "./dist/client",
			rollupOptions: {
				input: "./src/index",
				output: {
					manualChunks(id: string) {
						if (id.includes("node_modules")) {
							return "vendor"; // All third-party dependencies in one chunk
						}
						if (id.includes("src/components")) {
							return "shared-components"; // Shared UI components
						}
						if (id.includes("src/app")) {
							// Check if the file contains follow the [name].page.[ext] pattern
							if (id.includes(".page.")) {
								const pageFileName = id.split("src/app")[1].split("/").pop();

								if (pageFileName) {
									const pageName = pageFileName.split(".")[0];
									return `page-${pageName}`; // One chunk per page
								}
							}
						}

						return undefined;
					},
				},
				external: [...vite?.build?.external],
			},
			chunkSizeWarningLimit: 500,
			emptyOutDir: true,
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
			client: {
				build: {
					// Emit manifest
					manifest: true,
				},
			},
			ssr: {
				dev: {},

				/**
				 * Server-side rendering build options.
				 */
				build: {
					// Output directory
					outDir: "./dist/server",

					// Rollup options
					rollupOptions: {
						input: `${join(
							__dirname,
							"./lib/esm/entries/server/entry.server.js"
						)}`,
					},

					// Enable SSR
					ssr: true,

					// Emit assets
					ssrEmitAssets: true,
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
