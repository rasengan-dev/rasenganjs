import type {
	AppConfig,
	AppConfigFunction,
	AppConfigFunctionAsync,
} from "../type.js";

/**
 * Function to define the config for the app
 * It will be used by vite.config.ts and other files in other to configure the app
 * @param {AppConfig | AppConfigFunction | AppConfigFunctionAsync} loadedConfig
 */
export const defineConfig = async (
	loadedConfig: AppConfig | AppConfigFunction | AppConfigFunctionAsync
): Promise<AppConfig> => {
	let config: AppConfig;

	// Check if the loadedConfig is a function
	if (typeof loadedConfig === "function") {
		// Call the function to get the config
		const result = loadedConfig();

		// Check if it's a promise (asynchronous function)
		if (result instanceof Promise) {
			config = await result; // Await the promise result (AppConfigFunctionAsync)
		} else {
			config = result as AppConfig; // Synchronous function result (AppConfigFunction)
		}
	} else {
		config = loadedConfig;
	}

	const { server, vite } = config;

	// Define default values for vite config coming from loadedConfig.vite
	const defaultViteConfig = {
		plugins: vite?.plugins || [],
		optimizeDeps: {
			exclude: vite?.optimizeDeps?.exclude || [],
			include: vite?.optimizeDeps?.include || [],
		},
		css: {
			postcss: vite?.css?.postcss || undefined,
		},
		build: {
			external: vite?.build?.external || [],
		},
		resolve: {
			symbole: vite?.resolve?.symbole || "@",
			alias: vite?.resolve?.alias || [],
		},
	};

	// Define default values for server config coming from loadedConfig.server
	const defaultServerConfig = {
		development: {
			port: server?.development?.port || undefined,
			open: server?.development?.open || false,
		},

		production: {
			hosting: server?.production?.hosting || "custom",
		},
	};

	try {
		const config: AppConfig = {
			server: defaultServerConfig,
			vite: {
				plugins: defaultViteConfig.plugins,

				optimizeDeps: {
					exclude: [
						"node:http",
						"node-fetch",
						...defaultViteConfig.optimizeDeps.exclude,
					],
					include: [
						"react-fast-compare",
						"invariant",
						"shallowequal",
						"react-dom/client",
						"react-dom",
						"react",
						"react-router-dom",
						"react-helmet-async",
						...defaultViteConfig.optimizeDeps.include,
					],
				},

				css: {
					postcss: defaultViteConfig.css.postcss,
				},

				build: {
					external: defaultViteConfig.build.external,
				},

				resolve: {
					// concat two arrays
					alias: [
						{
							find: defaultViteConfig.resolve.symbole,
							replacement: "./src",
						},
						{
							find: "path",
							replacement: "node_modules/path-browserify",
						},
						...defaultViteConfig.resolve.alias,
					],
				},

				appType: "custom",
			},
		};

		return config;
	} catch (error) {
		return {
			vite: {
				optimizeDeps: {
					exclude: ["node:http", "node-fetch"],
					include: [
						"react-fast-compare",
						"invariant",
						"shallowequal",
						"react-dom/client",
						"react-dom",
						"react",
						"react-router-dom",
						"react-helmet-async",
					],
				},
				appType: "custom",
				resolve: {
					alias: [
						{
							find: "@",
							replacement: "./src",
						},
						{
							find: "path",
							replacement: "node_modules/path-browserify",
						},
					],
				},
			},
		};
	}
};