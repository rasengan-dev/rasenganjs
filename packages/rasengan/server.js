import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import {
	createStaticHandler,
	createStaticRouter,
} from "react-router";
import chalk from "chalk";
import inquirer from "inquirer";

// Load utils
import {
	createFetchRequest,
	logServerInfo,
	fix404,
} from "./lib/esm/server/utils/index.js";

// Resolve path
import { resolvePath } from "./lib/esm/config/index.js";

/**
 * This function is responsible for creating a server for the development environment.
 * @param {boolean} isProduction - Whether the server is in production mode or not.
 * @param {number} port - The port to run the server on.
 * @param {string} base - The base path for the server.
 */
async function createServer({
	isProduction,
	port,
	base = "/",
	enableSearchingPort = false,
	open = false,
	config,
}) {
	// Get directory name
	const __dirname = dirname(fileURLToPath(import.meta.url));

	// Get app path
	const appPath = join(__dirname, "./../../");

	// Create http server
	const app = express();

	// Bootstrap
	let bootstrap = "";

	// Styles
	let styles = "";

	// Add Vite or respective production middlewares
	let vite;
	if (!isProduction) {
		const { createServer } = await import("vite");
		vite = await createServer({
			server: { middlewareMode: true, hmr: true },
			appType: "custom",
			base,
			configFile: "node_modules/rasengan/vite.config.js",
		});
		app.use(vite.middlewares);
	} else {
		const compression = (await import("compression")).default;
		const sirv = (await import("sirv")).default;
		app.use(compression());
		app.use(base, sirv(join(appPath, "dist/client"), { extensions: [] }));
	}

	// Serve HTML
	app.use("*", async (req, res) => {
		try {
			// ! 404 Fix related to some files not being found
			fix404(req.originalUrl, res, appPath);

			let entry;

			if (!isProduction) {
				entry = await vite.ssrLoadModule(
					join(appPath, `node_modules/rasengan/lib/esm/entries/entry-server.js`)
				);
			} else {
				entry = await import(
					resolvePath(join(appPath, "dist/server/entry-server.js"))
				);

				// replace bootstrap script with compiled scripts
				bootstrap =
					"/assets/" +
					fs
						.readdirSync(join(appPath, "dist/client/assets"))
						.filter(
							(fn) => fn.includes("entry-client") && fn.endsWith(".js")
						)[0];

				// replace styles with compiled styles
				styles =
					"/assets/" +
					fs
						.readdirSync(join(appPath, "dist/client/assets"))
						.filter(
							(fn) => fn.includes("entry-client") && fn.endsWith(".css")
						)[0];
			}

			// Get entry values
			const { render, staticRoutes } = entry;

			// Create static handler
			let handler = createStaticHandler(staticRoutes);

			// Create fetch request for static routing
			let fetchRequest = createFetchRequest(req, req.get("host"));
			let context = await handler.query(fetchRequest);

			// Handle redirects from config file
			const redirects = await config.redirects();

			for (let redirect of redirects) {
				if (redirect.source === req.originalUrl) {
					res.status(redirect.permanent ? 301 : 302);
					return res.redirect(redirect.destination);
				}
			}

			// Handle redirects from loader functions
			const status = context.status;

			if (status === 302 || status === 301) {
				const redirect = context.headers.get("Location");

				// Set redirect status
				res.status(status);

				// Redirect
				return res.redirect(redirect);
			}

			// Helmet context
			const helmetContext = {};

			// Create static router
			let router = createStaticRouter(handler.dataRoutes, context);

			// If stream mode enabled, render the page as a plain text
			return await render(
				router,
				context,
				helmetContext,
				bootstrap,
				styles,
				res
			);
		} catch (e) {
			vite?.ssrFixStacktrace(e);

			console.error(e);
		}
	});

	// Start http server
	const server = app.listen(port, () => {
		setTimeout(() => {
			logServerInfo(port, isProduction, open);
		}, 100);
	});

	// Handle errors
	server.on("error", async (err) => {
		const multiplicationSymbol = "\u00D7";

		// Handle PORT in use error
		if (err.code === "EADDRINUSE") {
			const newPort = port + 1;

			console.error(
				chalk.red(
					`${chalk.bold.red(
						multiplicationSymbol
					)} Port ${port} is already in use. \n\n`
				)
			);

			// Check if user wants to use a different port
			if (!enableSearchingPort) {
				// Ask user if they want to use a different port
				const { useDifferentPort } = await inquirer.prompt([
					{
						type: "confirm",
						name: "useDifferentPort",
						message: `Do you want to use a different port?`,
					},
				]);

				if (!useDifferentPort) {
					console.log(chalk.blue("Closing server... \n\n"));
					process.exit(0);
				}

				console.log(chalk.blue(`Trying port ${newPort}... \n\n`));

				await createServer({
					isProduction,
					port: newPort,
					base,
					enableSearchingPort: true,
					open,
					config,
				});
			} else {
				console.log(chalk.blue(`Trying port ${newPort}... \n\n`));

				await createServer({
					isProduction,
					port: newPort,
					base,
					enableSearchingPort,
					open,
					config,
				});
			}
		}
	});
}

// Launch server
(async function launchServer() {
	// Constants
	const isProduction = process.env.NODE_ENV === "production";

	// Format config path
	const configPath = resolvePath(join(`${process.cwd()}/rasengan.config.js`));

	// Get config
	const config = await (await import(configPath)).default;

	const port = !isProduction
		? (process.env.PORT && Number(process.env.PORT)) ||
		  config.server?.development?.port ||
		  5320
		: process.env.PORT || 4320;
	const base = process.env.BASE || "/";

	await createServer({
		isProduction,
		port,
		base,
		open: config.server?.development?.open,
		config,
	});
})();
