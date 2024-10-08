import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./../../../../../src/main";
import { Component, ErrorBoundary } from "../core/components/index.js";
// @ts-ignore
import config from "./../../../../../rasengan.config.js";
import * as HelmetAsync from "react-helmet-async";

// @ts-ignore
const H = HelmetAsync.default ? HelmetAsync.default : HelmetAsync;

// (async () => {
// 	const { reactStrictMode } = await config;

//   console.log("reactStrictMode", reactStrictMode);

// 	ReactDOM.hydrateRoot(
// 		document.getElementById("root") as HTMLElement,
// 		reactStrictMode ? (
// 			<React.StrictMode>
// 				<H.HelmetProvider>
// 					<ErrorBoundary>
// 						<App Component={Component} />
// 					</ErrorBoundary>
// 				</H.HelmetProvider>
// 			</React.StrictMode>
// 		) : (
// 			<H.HelmetProvider>
// 				<ErrorBoundary>
// 					<App Component={Component} />
// 				</ErrorBoundary>
// 			</H.HelmetProvider>
// 		)
// 	);
// })();

ReactDOM.hydrateRoot(
	document.getElementById("root") as HTMLElement,
	true ? (
		<React.StrictMode>
			<H.HelmetProvider>
				<ErrorBoundary>
					<App Component={Component} />
				</ErrorBoundary>
			</H.HelmetProvider>
		</React.StrictMode>
	) : (
		<H.HelmetProvider>
			<ErrorBoundary>
				<App Component={Component} />
			</ErrorBoundary>
		</H.HelmetProvider>
	)
);
