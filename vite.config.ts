import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Importing __dirname
// @ts-ignore
import { fileURLToPath } from "node:url";
import path, { dirname, resolve } from "node:path";

// Getting root path
const __dirname = dirname(fileURLToPath(import.meta.url));
let __pathToRoot = "";

const external = [
	// `${__pathToRoot}/node_modules/rasengan/lib/esm/server/utils/handleRequest.js`,
	// `${__pathToRoot}/node_modules/rasengan/lib/cjs/server/utils/handleRequest.js`,
];

export default defineConfig(({ command, mode }: any) => {
	console.log({ command, mode });
	if (command === "serve") {
		__pathToRoot = process.cwd();
	} else {
		__pathToRoot = path.join(process.cwd(), "./../../");
	}

	// Default Vite config
	let vite = {
		plugins: [],
		optimizeDeps: {
			exclude: [],
			include: [],
		},
		build: {
			sourcemap: true,
			rollupOptions: {
				input: "./lib/esm/entries/entry-client.js",
				output: {
					manualChunks: undefined,
				},
			},
			external: [],
		},
		ssr: {
			external: [],
		},
		css: {
			modules: {
				localsConvention: "camelCaseOnly",
			},

			postcss: undefined,
		},
		resolve: {
			alias: [],
		},
		appType: "custom",
	};

	// Load rasengan config file
	import(path.join(process.cwd(), "rasengan.config.js")).then((config) => {
		// Extract vite config
		const { vite: viteConfig } = config;

		vite = viteConfig;
	});

	return {
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
			sourcemap: true,
			rollupOptions: {
				input: "./lib/esm/entries/entry-client.js",
				output: {
					manualChunks: undefined,
				},
				external: [...vite?.build?.external, ...external],
			},
			external: [],
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
