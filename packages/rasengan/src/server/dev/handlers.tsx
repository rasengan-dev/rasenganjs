import {
	createStaticHandler,
	createStaticRouter,
	StaticHandler,
	StaticHandlerContext,
	StaticRouterProvider,
} from "react-router";
import { logRedirection as log } from "../../core/utils/log.js";
import createRasenganRequest, {
	createRasenganHeaders,
	sendRasenganResponse,
} from "../node/utils.js";
import { AppConfig, Redirect } from "../../core/config/type.js";
import type * as Express from "express";
import type * as Vite from "vite";
import { join } from "path";
import { createServerModuleRunner } from "vite";
import { RouterComponent } from "../../routing/interfaces.js";
import { generateRoutes } from "../../routing/utils/generate-routes.js";
import {
	isStaticRedirectFromConfig,
	isRedirectResponse,
	extractMetaFromRRContext,
	extractHeadersFromRRContext,
} from "./utils.js";
import { ModuleRunner } from "vite/module-runner";

/**
 * Handle redirect request
 * @param req
 * @param res
 * @param options
 * @returns
 */
export async function handleRedirectRequest(
	req: Express.Request,
	res: Express.Response,
	{
		context,
		redirects,
	}: { context: StaticHandlerContext | Response; redirects: Redirect[] }
) {
	for (let redirect of redirects) {
		if (redirect.source === req.originalUrl) {
			// Log redirect
			log(redirect.source, redirect.destination);

			res.status(redirect.permanent ? 301 : 302);
			return res.redirect(redirect.destination);
		}
	}

	// Handle redirects from loader functions
	if (context instanceof Response) {
		const status = context.status; // "status" is only available when redirecting from loader, normally it's statusCode

		if (status === 302 || status === 301) {
			const redirectURL = context.headers.get("Location");

			// Set redirect status
			res.status(status);

			// Log redirect
			log(req.originalUrl, redirectURL);

			// Redirect
			return res.redirect(redirectURL);
		}

		// TODO: Check this line again
		return await sendRasenganResponse(res, context);
	}
}

export async function handleDocumentRequest(
	req: Express.Request,
	res: Express.Response,
	runner: ModuleRunner,
	options: {
		rootPath: string;
		__dirname: string;
		config: AppConfig;
		handler: StaticHandler;
	}
) {
	try {
		const { __dirname, config, handler } = options;

		// Get the render function and app router
		const { render } = await runner.import(
			join(`${__dirname}./../../entries/server/entry.server.js`)
		);

		// Create rasengan request for static routing
		let request = createRasenganRequest(req, res);
		let context = await handler.query(request);

		// Handle redirects from config file
		const redirects = await config.redirects();
		const redirectFound = await isStaticRedirectFromConfig(req, redirects);

		if (isRedirectResponse(context as Response) || redirectFound) {
			return await handleRedirectRequest(req, res, { context, redirects });
		}

		if (!(context instanceof Response)) {
			// Extract meta from context
			const metadata = extractMetaFromRRContext(context);

			// Create static router
			let router = createStaticRouter(handler.dataRoutes, context);

			const headers = extractHeadersFromRRContext(context);

			// Set headers
			res.writeHead(context.statusCode, {
				...Object.fromEntries(headers),
			});

			const Router = <StaticRouterProvider router={router} context={context} />;
			// const Router = StaticRouterProvider({ router, context });

			// If stream mode enabled, render the page as a plain text
			return await render(Router, res, {
				metadata,
			});
		}

		return context;
	} catch (error) {
		// Just log the error for now
		console.error(error);
	}
}

export async function handleDataRequest(
	request: Express.Request,
	handler: StaticHandler
) {
	// 1. we don't want to proxy the browser request directly to our router, so we
	// make a new one.
	let newRequest =
		request.method === "POST"
			? new Request(request.url, {
					method: request.method,
					headers: createRasenganHeaders(request.headers),
					// @ts-expect-error this is valid, types are wrong
					body: new URLSearchParams(await request.formData()),
			  })
			: new Request(request.url, {
					headers: createRasenganHeaders(request.headers),
			  });

	// 2. get data from our router, queryRoute knows to call the action or loader
	// of the leaf route that matches
	let data = await handler.queryRoute(newRequest);

	// 3. send the response
	return new Response(JSON.stringify(data), {
		headers: { "Content-Type": "application/json" },
	});
}
