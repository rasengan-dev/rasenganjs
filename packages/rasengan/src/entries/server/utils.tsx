import ReactDOM from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { findModulePath } from "../../core/config/utils/load-modules.js";
import type * as Express from "express";

/**
 * Render a React component to a stream.
 * @param Component
 * @param res
 * @returns
 */
export const renderToStream = async (
	Component: React.ReactNode,
	res: Express.Response
) => {
	const ABORT_DELAY = 10_000;

	return new Promise(async (resolve, reject) => {
		let shellRendered = false;

		const rootPath = process.cwd();

		const { extension } = await findModulePath(`${rootPath}/src/index`);

		const { pipe, abort } = renderToPipeableStream(Component, {
			bootstrapModules: [`/src/index${extension}`],
			onShellReady() {
				shellRendered = true;

				resolve(res);

				pipe(res);
			},
			onShellError(error: unknown) {
				console.log({ error });
				reject(error);
			},
			onError(error: unknown) {
				// Log streaming rendering errors from inside the shell.  Don't log
				// errors encountered during initial shell rendering since they'll
				// reject and get logged in handleDocumentRequest.
				if (shellRendered) {
					console.error(error);
				}
			},
		});

		setTimeout(abort, ABORT_DELAY);
	});
};

export const renderToString = async (Component: React.ReactNode) => {
	const html = ReactDOM.renderToString(Component);

	return html;
};
