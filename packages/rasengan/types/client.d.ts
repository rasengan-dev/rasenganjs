/// <reference types="vite/client" />
/// <reference types="../lib/types/index.d.ts" />

import { RouteObject } from "../lib/esm/routing/types";

// Markdown files

declare module "*.mdx" {
	import { type MDXPageComponent } from "../lib/esm/index.js";

	let MDXComponent: MDXPageComponent;

	export default MDXComponent;
}

declare module "*.md" {
	import { type MDXPageComponent } from "../lib/esm/index.js";

	let MDXComponent: MDXPageComponent;

	export default MDXComponent;
}

// ?raw files

declare module "*.js?raw" {
	const value: string;
	export default value;
}

// Virtual modules

/**
 * virtual-entry-server.d.ts
 **/
declare module "virtual:entry-server" {
	import { type Response } from "express";
	import { StaticHandlerContext } from "react-router";
	import {
		Metadata,
		MetadataWithoutTitleAndDescription,
	} from "../lib/esm/index.js";

	/**
	 * Render the app to a stream
	 * @param router
	 * @param res
	 * @param options
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
	): Promise<unknown>;
}

// Add new properties to window global object
declare global {
	interface Window {
		__RASENGAN_DATA_ROUTE__?: RouteObject[]; // Replace `any` with the specific type of your data
	}
}

