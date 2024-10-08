import { PageComponent, MDXPageComponent } from "../../core";
import { DefaultLayout } from "../../core/components";
import { RouterDecoratorProps } from "../../decorators/types";
import { NotFoundPageComponent } from "../components";
import { RouterComponent } from "../interfaces";

/**
 * This function adds metadata to a router
 * @param option
 * @returns
 */
export const defineRouter = (option: RouterDecoratorProps) => {
	const { imports, layout, pages, loaderComponent, notFoundComponent } = option;

	return (Component: new () => RouterComponent) => {
		// Handle errors
		if (!option.pages)
			throw new Error(
				"You must provide a list of pages in the router decorator"
			);

		// Create router
		const router = new Component();

		// Normalize pages
		const normalizedPages: PageComponent[] = [];

		for (let p of pages) {
			// When p is a MDXPageComponent
			if (!p["path"]) {
				const mdxPage = p as MDXPageComponent;

				const normalizedPage = p as PageComponent;

				normalizedPage.path = mdxPage.metadata.path;
				normalizedPage.metadata = mdxPage.metadata.metadata;

				normalizedPages.push(normalizedPage);
			} else {
				normalizedPages.push(p as PageComponent);
			}
		}

		// Set properties
		router.routers = imports || [];
		router.layout = layout || DefaultLayout;
		router.pages = normalizedPages;
		router.loaderComponent = loaderComponent || (() => null);
		router.notFoundComponent = notFoundComponent || NotFoundPageComponent;

		return router;
	};
};
