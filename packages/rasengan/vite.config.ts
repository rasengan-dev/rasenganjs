import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "node:path";
import {
	loadModuleSSR,
	getDirname,
} from "./lib/esm/core/config/utils/load-modules.js";
import { isServerMode, ServerMode } from "./lib/esm/server/runtime/mode.js";
import { plugins } from "./lib/esm/core/plugins/index.js";

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
		plugins: [react({ jsxRuntime: "automatic" }), ...plugins.map((plugin) => plugin()), ...vite?.plugins],

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
				input: "./src/index", // Handle extension properly
				output: {
					manualChunks(id: string) {
						const isNodeModule = id.includes("node_modules");
						const isSharedComponent = id.includes("src/components");
						const isAppPage = id.includes("src/app") && id.includes(".page.");

						if (isNodeModule) {
							return "vendor"; // All third-party dependencies in one chunk
						}

						if (isSharedComponent) {
							return "shared-components"; // Shared UI components
						}

						if (isAppPage) {
							try {
								const pageFileName = id.split("src/app")[1]?.split("/").pop();
								if (pageFileName) {
									const pageName = pageFileName.split(".")[0];
									return `page-${pageName}`; // One chunk per page
								}
							} catch {
								console.warn(
									`Could not process app page chunk for file: ${id}`
								);
							}
						}

						return undefined; // Default behavior for unclassified chunks
					},
				},
				external: [...vite?.build?.external],
			},
			chunkSizeWarningLimit: 1000,
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
						input: {
							"entry.server": `${join(
								__dirname,
								"./lib/esm/entries/server/entry.server.js"
							)}`,
							"app.router": `./src/app/app.router`,
							main: `./src/main`,
							template: `./src/template`,
							config: `./rasengan.config.js`,
						},
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
