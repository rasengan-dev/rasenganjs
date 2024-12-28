import { join } from "node:path";
import express from "express";

import { createStaticHandler, createStaticRouter } from "react-router";
import chalk from "chalk";
import inquirer from "inquirer";

// Middlewares
import { loggerMiddleware } from "./lib/esm/middlewares/index.js";

// Load utilities functions
import {
	createFetchRequest,
	logServerInfo,
} from "./lib/esm/server/utils/index.js";
import { getDirname, loadModuleSSR } from "./lib/esm/config/utils/index.js";
import { generateStaticRoutes } from "./lib/esm/routing/utils/index.js";

/**
 * This function is responsible for creating a server for the development environment.
 * @param {boolean} isProduction - Whether the server is in production mode or not.
 * @param {number} port - The port to run the server on.
 * @param {string} base - The base path for the server.
 */
async function createServer({
	port,
	base = "/",
	enableSearchingPort = false,
	open = false,
	config, 
}) {
	// Get app path
	const rootPath = process.cwd();

	// Get directory name
	const __dirname = await getDirname(import.meta.url);

	// Create http server
	const app = express();

	// Initialize a vite dev server as middleware
	const { createServer } = await import("vite");

	const viteDevServer = await createServer({
		server: { middlewareMode: true, hmr: true },
		base,
		configFile: `${__dirname}/vite.config.ts`,
	});

	// Apply middlewares
	app.use(viteDevServer.middlewares);
	app.use(loggerMiddleware);

	// Create the request handler
	app.use("*", async (req, res, next) => {
		try {
			const url = req.url || req.originalUrl;

			// Get the environment
			const environment = viteDevServer.environments.ssr;

			// Get the render function and app router
			const { render } = await environment.runner.import(
				join(`${__dirname}/lib/esm/entries/server/entry.server.js`)
			);
			const AppRouter = (
				await environment.runner.import(join(`${rootPath}/src/app/app.router`))
			).default;

			// Get static routes
			const staticRoutes = generateStaticRoutes(AppRouter);

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
			const status = context.statusCode;

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

			// Setup headers from action and loaders from deepest match
			let leaf = context.matches[context.matches.length - 1];
			let actionHeaders = context.actionHeaders[leaf.route.id];
			let loaderHeaders = context.loaderHeaders[leaf.route.id];
			let headers = new Headers(actionHeaders);
			if (loaderHeaders) {
				for (let [key, value] of loaderHeaders.entries()) {
					headers.append(key, value);
				}
			}

			headers.set("Content-Type", "text/html; charset=utf-8");

			// Set headers
			res.writeHead(context.statusCode, {
				...Object.fromEntries(headers),
			});

			// If stream mode enabled, render the page as a plain text
			return await render(router, context, helmetContext, res);
		} catch (error) {
			if (typeof error === "object" && error instanceof Error) {
				viteDevServer.ssrFixStacktrace(error);
			}
			next(error);
		}
	});

	// Start http server
	const server = app.listen(port, () => {
		setTimeout(() => {
			logServerInfo(port, false, open);
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
					port: newPort,
					base,
					enableSearchingPort: true,
					open,
					config,
				});
			} else {
				console.log(chalk.blue(`Trying port ${newPort}... \n\n`));

				await createServer({
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
	const rootPath = process.cwd();

	// Format config path
	const configPath = join(`${rootPath}/rasengan.config.js`);

	// Get config
	const config = await (await loadModuleSSR(configPath)).default;

	const port =
		(process.env.PORT && Number(process.env.PORT)) ||
		config.server?.development?.port ||
		5320;
	const base = process.env.BASE || "/";

	await createServer({
		port,
		base,
		open: config.server?.development?.open,
		config,
	});
})();
