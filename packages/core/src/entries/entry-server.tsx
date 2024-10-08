// import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import AppRouter from "./../../../../../src/app/app.router";
// @ts-ignore
import Template from "./../../../../../src/template";

// @ts-ignore
import { generateStaticRoutes } from "../routing/utils/index.js";
import { StaticHandlerContext } from "react-router-dom/server.js";
import { type Router } from "@remix-run/router";
import { Response } from "express";

import {
	// Component,
	// ErrorBoundary,
	Heads,
	Body,
	Scripts,
} from "../core/components/index.js";
import renderStream from "./entry-server-stream.js";

// const ABORT_DELAY = 5000;

const TemplateHtml = ({
	helmetContext,
	bootstrap,
	styles,
}: {
	helmetContext: any;
	bootstrap: string;
	styles: string;
}) => {
	return (
		<Template
			Head={({ children }) => (
				<Heads data={helmetContext} bootstrap={bootstrap} styles={styles}>
					{children}
				</Heads>
			)}
			Body={({ children }) => <Body>{children}</Body>}
			Script={({ children }) => (
				<Scripts bootstrap={bootstrap}>{children}</Scripts>
			)}
		/>
	);
};

/**
 * Function used to render the app on the server
 * @param router
 * @param context
 * @param helmetContext
 * @returns
 */
export async function render(
	router: Router,
	context: StaticHandlerContext,
	helmetContext: any = {},
	bootstrap = "",
	styles = "",
	res?: Response,
	env?: "vercel" | "netlify" | "cloudflare" | "other"
) {
	if (!res) return;

	return await renderStream(
		router,
		context,
		helmetContext,
		bootstrap,
		styles,
		res,
		env
	);
}

export const staticRoutes = generateStaticRoutes(AppRouter);
export const loadTemplateHtml = (
	helmetContext: any,
	bootstrap: string,
	styles: string
) => {
	const html = ReactDOMServer.renderToString(
		<TemplateHtml
			helmetContext={helmetContext}
			bootstrap={bootstrap}
			styles={styles}
		/>
	);

	return `
  <!DOCTYPE html>
  ${html}
  `;
};
