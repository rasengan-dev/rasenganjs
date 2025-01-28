/// <reference types="vite/client" />
/// <reference types="../lib/types/index.d.ts" />

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
	import { redirect, StaticHandlerContext } from "react-router";
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

// declare module "virtual:rasengan-config" {
// 	import { type ProductionAppConfig } from "../lib/esm/core/config/types.js";

// 	export const __RASENGAN_CONFIG__: ProductionAppConfig;
// }
