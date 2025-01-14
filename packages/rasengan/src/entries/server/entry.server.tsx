import React, { FunctionComponent } from "react";
import {
	RootComponent,
	HeadComponent,
	BodyComponent,
	ScriptComponent,
} from "../../core/components/index.js";
import type { AppProps } from "../../core/types.js";

import { type Response } from "express";
import { StaticHandlerContext, StaticRouterProvider } from "react-router";

import refreshScript from "../../scripts/refresh-hack.js?raw";
import { loadModuleSSR } from "../../core/config/utils/index.js";
import type {
	Metadata,
	MetadataWithoutTitleAndDescription,
	TemplateProps,
} from "../../routing/types.js";
import { isServerMode, ServerMode } from "../../server/runtime/mode.js";
import { renderToStream } from "./utils.js";

const RenderApp = ({
	router,
	context,
	metadata,
	App,
	Template,
}: {
	router: any;
	context: StaticHandlerContext;
	metadata: {
		page: Metadata;
		layout: MetadataWithoutTitleAndDescription;
	};
	App: FunctionComponent<AppProps>;
	Template: FunctionComponent<TemplateProps>;
}) => {
	// inject vite refresh script to avoid "React refresh preamble was not loaded"
	let viteScripts = <React.Fragment></React.Fragment>;

	if (
		isServerMode(process.env.NODE_ENV) &&
		process.env.NODE_ENV === ServerMode.Development
	) {
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
		<Template
			Head={({ children }) => (
				<HeadComponent metadata={metadata}>
					{viteScripts}
					{children}
				</HeadComponent>
			)}
			Body={({ children }) => (
				<BodyComponent
					asChild
					AppContent={
						<App Component={RootComponent}>
							<StaticRouterProvider router={router} context={context} />
						</App>
					}
				>
					{children}
				</BodyComponent>
			)}
			Script={({ children }) => <ScriptComponent>{children}</ScriptComponent>}
		/>
	);
};

/**
 * Render the app to a stream
 * @param router
 * @param context
 * @param helmetContext
 * @param res
 * @returns
 */
export async function render(
	router: any,
	res: Response,
	options: {
		context: StaticHandlerContext;
		metadata: {
			page: Metadata;
			layout: MetadataWithoutTitleAndDescription;
		};
	}
) {
	const { context, metadata } = options;

	// Root path
	const rootPath = process.cwd();

	// Import Main App Component
	const App = (await loadModuleSSR(`${rootPath}/src/main`))
		.default as FunctionComponent<AppProps>;

	// Import Template
	const Template = (await loadModuleSSR(`${rootPath}/src/template`))
		.default as FunctionComponent<TemplateProps>;

	return await renderToStream(
		<RenderApp
			router={router}
			context={context}
			metadata={metadata}
			App={App}
			Template={Template}
		/>,
		res
	);
}
