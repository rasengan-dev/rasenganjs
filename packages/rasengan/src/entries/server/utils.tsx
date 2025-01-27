import ReactDOM from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import type * as Express from "express";
import { isServerMode, ServerMode } from "../../server/runtime/mode.js";

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

	let bootstrap = [];

	if (
		isServerMode(process.env.NODE_ENV) &&
		process.env.NODE_ENV === ServerMode.Development
	) {
		bootstrap.push("/src/index");
	}

	return new Promise(async (resolve, reject) => {
		let shellRendered = false;

		const { pipe, abort } = renderToPipeableStream(Component, {
			bootstrapModules: bootstrap,
			onShellReady() {
				shellRendered = true;

				resolve(res);

				pipe(res);
			},
			onShellError(error: unknown) {
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
