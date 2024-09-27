import inject from "@rollup/plugin-inject";

/**
 * Provides a Vite plugin that polyfills the `process` and `Buffer` global variables for the browser.
 * This is necessary for certain libraries that expect these global variables to be available.
 * The plugin is applied during the build phase of the Vite build process.
 */
export default function globals() {
	return {
		name: "vite-plugin-rasengan-global-polyfill",
		config: function config(config, env) {
			// test if we are on the browser
			return {
				define: {
					process: process,
				},

				build: {
					rollupOptions: {
						plugins: [
							inject({
								Buffer: ["buffer", "Buffer"],
							}),
						],
					},
				},
			};
		},

		apply: "build",
	};
}
