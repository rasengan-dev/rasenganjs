import { PageComponent, MDXPageComponent } from "../../core/index.js";
import { DefaultLayout } from "../../core/components/index.js";
import { RouterProps } from "../types.js";
import { NotFoundPageComponent } from "../components/index.js";
import { RouterComponent } from "../interfaces.js";

/**
 * This function adds metadata to a router
 * @param option
 * @returns
 */
export const defineRouter = (option: RouterProps) => {
	const { imports, layout, pages, loaderComponent, notFoundComponent, MDXRenderer } = option;

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
				if (!MDXRenderer) {
					throw new Error(
						"You must provide a MDXRenderer component to render MDX pages"
					);
				}

				const MDXPage = p as MDXPageComponent;

				const Page: PageComponent = () => {
					return <MDXRenderer className={""}>{MDXPage}</MDXRenderer>;
				};

				Page.path = MDXPage.metadata.path;
				Page.metadata = MDXPage.metadata.metadata;

				normalizedPages.push(Page);
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
