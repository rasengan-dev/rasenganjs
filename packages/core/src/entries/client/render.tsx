import { hydrateRoot } from "react-dom/client";
import { StrictMode, FunctionComponent } from "react";
import { type AppProps } from "../../core/index.js";
import { Component } from "../../core/components/index.js";

export default function renderApp(
	App: FunctionComponent<AppProps>,
	options: {
		reactStrictMode?: boolean;
	}
) {
	const root = document.getElementById("root");

	if (!root) {
		throw new Error("Root element not found");
	}

	if (options.reactStrictMode) {
		hydrateRoot(
			root,
			<StrictMode>
				<App Component={Component} />
			</StrictMode>
		);
	} else {
		hydrateRoot(root, <App Component={Component} />);
	}
}
