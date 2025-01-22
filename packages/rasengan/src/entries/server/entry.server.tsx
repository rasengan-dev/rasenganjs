import { FunctionComponent } from "react";
import type { AppProps } from "../../core/types.js";

import { type Response } from "express";
import { StaticHandlerContext } from "react-router";

import { loadModuleSSR } from "../../core/config/utils/load-modules.js";
import type {
	Metadata,
	MetadataWithoutTitleAndDescription,
	TemplateProps,
} from "../../routing/types.js";
import { renderToStream } from "./utils.js";
import { TemplateLayout } from "./index.js";

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
		<TemplateLayout
			router={router}
			context={context}
			metadata={metadata}
			App={App}
			Template={Template}
		/>,
		res
	);
}
