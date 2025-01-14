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

	const { server, vite, redirects } = config;

	// Define default values for vite config coming from loadedConfig.vite
	const defaultViteConfig = {
		plugins: vite?.plugins || [],
		optimizeDeps: {
			exclude: vite?.optimizeDeps?.exclude || [],
			include: vite?.optimizeDeps?.include || [],
		},
		css: {
			postcss: vite?.css?.postcss || "./postcss.config.js",
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

	// Define default values for redirects config coming from loadedConfig.redirects
	const defaultRedirectsConfig =
		redirects || (() => new Promise((resolve) => resolve([])));

	try {
		const config: AppConfig = {
			server: defaultServerConfig,
			vite: {
				plugins: defaultViteConfig.plugins,

				optimizeDeps: {
					exclude: [
						...defaultViteConfig.optimizeDeps.exclude,
					],
					include: [
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
					alias: [
						{
							find: defaultViteConfig.resolve.symbole,
							replacement: "./src",
						},
						...defaultViteConfig.resolve.alias,
					],
				},

				appType: "custom",
			},
			redirects: defaultRedirectsConfig,
		};

		return config;
	} catch (error) {
		return {
			vite: {
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
				css: {
					postcss: "./postcss.config.js",
				},
			},
			redirects: () => new Promise((resolve) => resolve([])),
		};
	}
};
