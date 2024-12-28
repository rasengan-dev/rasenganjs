import React, { FunctionComponent } from "react";
import { renderToPipeableStream } from "react-dom/server";
import {
	Component,
	Heads,
	Body,
	Scripts,
} from "../../core/components/index.js";
import type { AppProps, TemplateProps } from "../../core/types.js";

import { Response } from "express";
import { StaticHandlerContext, StaticRouterProvider } from "react-router";
import * as HelmetAsync from "react-helmet-async";

import refreshScript from "../../scripts/refresh-hack.js?raw";
import { findModulePath, loadModuleSSR } from "../../config/utils/index.js";

// @ts-ignore
const H = HelmetAsync.default ? HelmetAsync.default : HelmetAsync;

const ABORT_DELAY = 5_000;

const RenderApp = ({
	router,
	context,
	helmetContext,
	App,
	Template,
}: {
	router: any;
	context: StaticHandlerContext;
	helmetContext: any;
	App: FunctionComponent<AppProps>;
	Template: FunctionComponent<TemplateProps>;
}) => {
	// inject vite refresh script to avoid "React refresh preamble was not loaded"
	let viteScripts = <React.Fragment></React.Fragment>;

	if (process.env.NODE_ENV !== "production") {
		viteScripts = (
			<React.Fragment>
				<script type='module' src='/@vite/client' />
				<script
					type='module'
					dangerouslySetInnerHTML={{ __html: refreshScript }}
				/>
			</React.Fragment>
		);
	}

	return (
		<H.HelmetProvider context={helmetContext}>
			<Template
				Head={({ children }) => (
					<Heads data={helmetContext} styles={""} bootstrap={""}>
						{viteScripts}
						{children}
					</Heads>
				)}
				Body={({ children }) => (
					<Body
						asChild
						AppContent={
							<App Component={Component}>
								<StaticRouterProvider router={router} context={context} />
							</App>
						}
					>
						{children}
					</Body>
				)}
				Script={({ children }) => <Scripts bootstrap={""}>{children}</Scripts>}
			/>
		</H.HelmetProvider>
	);
};

export async function render(
	router: any,
	context: StaticHandlerContext,
	helmetContext: any = {},
	res: Response
) {
	// Root path
	const rootPath = process.cwd();

	// Import Main App Component
	const App = (await loadModuleSSR(`${rootPath}/src/main`))
		.default as FunctionComponent<AppProps>;

	// Import Template
	const Template = (await loadModuleSSR(`${rootPath}/src/template`))
		.default as FunctionComponent<TemplateProps>;

	return new Promise(async (resolve, reject) => {
		let shellRendered = false;
		let responseStatusCode = 200;

		const { extension } = await findModulePath(`${rootPath}/src/index`);

		const { pipe, abort } = renderToPipeableStream(
			<RenderApp
				router={router}
				context={context}
				helmetContext={helmetContext}
				App={App}
				Template={Template}
			/>,
			{
				bootstrapModules: [`/src/index${extension}`],
				onShellReady() {
					shellRendered = true;

					// res
					// 	.status(responseStatusCode)
					// 	.setHeader("Content-Type", "text/html")
					// 	.setHeader("Cache-Control", "max-age=31536000");

					resolve(res);

					pipe(res);
				},
				onShellError(error: unknown) {
					console.log({ error });
					reject(error);
				},
				onError(error: unknown) {
					responseStatusCode = 500;
					// Log streaming rendering errors from inside the shell.  Don't log
					// errors encountered during initial shell rendering since they'll
					// reject and get logged in handleDocumentRequest.
					if (shellRendered) {
						console.error(error);
					}
				},
			}
		);

		setTimeout(abort, ABORT_DELAY);
	});
}
