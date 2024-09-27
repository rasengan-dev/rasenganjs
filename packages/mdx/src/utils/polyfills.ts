/**
 * A Vite plugin that provides polyfills for Node.js modules and APIs when running in a browser environment.
 * This plugin is designed to work with the Vite bundler and helps ensure compatibility with Node.js-based code
 * that is being used in a browser context.
 *
 * The plugin configures Vite's resolver to map various Node.js modules and APIs to their browser-compatible
 * counterparts, allowing the code to run seamlessly in the browser without requiring changes to the original
 * Node.js-based implementation.
 *
 * This plugin is particularly useful when working with libraries or frameworks that rely on Node.js-specific
 * functionality, such as the `process` object or various built-in modules like `fs`, `crypto`, and `http`.
 */
export default function polyfill() {
	return {
		name: "vite-plugin-rasengan-node-polyfill",
		config: function config(config, env) {
			// test if we are on the browser
			return {
				define: {
					"process.env": process.env,
				},

				resolve: {
					alias: [
						// {
						// 	find: "assert",
						// 	replacement: "assert",
						// },
						// {
						// 	find: "buffer",
						// 	replacement: "buffer/",
						// },
						// {
						// 	find: "process",
						// 	replacement: "process/browser.js",
						// },
						// {
						// 	find: "console",
						// 	replacement: "console-browserify",
						// },
						{
							find: "fs",
							replacement: "browserify-fs",
						},
						// {
						// 	find: "crypto",
						// 	replacement: "crypto-browserify",
						// },
						// {
						// 	find: "domain",
						// 	replacement: "domain-browser",
						// },
						// {
						// 	find: "events",
						// 	replacement: "events",
						// },
						// {
						// 	find: "http",
						// 	replacement: "stream-http",
						// },
						// {
						// 	find: "https",
						// 	replacement: "https-browserify",
						// },
						// {
						// 	find: "path",
						// 	replacement: "path-browserify",
						// },
						// {
						// 	find: "punycode",
						// 	replacement: "punycode",
						// },
						// {
						// 	find: "querystring",
						// 	replacement: "querystring-es3",
						// },
						// {
						// 	find: "stream",
						// 	replacement: "stream-browserify",
						// },
						// {
						// 	find: "string_decoder",
						// 	replacement: "string_decoder",
						// },
						// {
						// 	find: "sys",
						// 	replacement: "util",
						// },
						// {
						// 	find: "timers",
						// 	replacement: "timers-browserify",
						// },
						// {
						// 	find: "tty",
						// 	replacement: "tty-browserify",
						// },
						// {
						// 	find: "url",
						// 	replacement: "url",
						// },
						// {
						// 	find: "util",
						// 	replacement: "util",
						// },
						// {
						// 	find: "vm",
						// 	replacement: "vm-browserify",
						// },
						// {
						// 	find: "zlib",
						// 	replacement: "browserify-zlib",
						// },
					],
				},
			};
		},
		enforce: "pre",
		apply: "build",
	};
}
