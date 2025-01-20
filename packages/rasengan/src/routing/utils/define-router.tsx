import { DefaultLayout } from "../../core/components/index.js";
import {
	RouterProps,
	PageComponent,
	MDXPageComponent,
	MDXRendererProps,
} from "../types.js";
import { RouterComponent } from "../interfaces.js";

/**
 * This function adds metadata to a router
 * @param option
 * @returns
 */
export const defineRouter = (option: RouterProps) => {
	const {
		imports,
		layout,
		pages,
		loaderComponent,
		notFoundComponent,
		MDXRenderer,
		useParentLayout,
	} = option;

	return (Router: new () => RouterComponent) => {
		// Handle errors
		if (!option.pages)
			throw new Error(
				"You must provide a list of pages in the router option object"
			);

		// Create router
		const router = new Router();

		// List of pages component
		const pageComponentList: PageComponent[] = [];

		for (let p of pages ?? []) {
			// Check if p is an array
			if (Array.isArray(p)) {
				for (let page of p) {
					if (isMDXPage(page, MDXRenderer)) {
						const Page = convertMDXPageToPageComponent(
							page as MDXPageComponent,
							MDXRenderer
						);

						pageComponentList.push(Page);
					} else {
						pageComponentList.push(page as PageComponent);
					}
				}

				continue;
			}

			// When p is a MDXPageComponent
			if (isMDXPage(p, MDXRenderer)) {
				const Page = convertMDXPageToPageComponent(
					p as MDXPageComponent,
					MDXRenderer
				);

				pageComponentList.push(Page);
			} else {
				pageComponentList.push(p as PageComponent);
			}
		}

		// Set properties
		router.routers = imports || [];
		router.layout = layout || DefaultLayout;
		router.pages = pageComponentList;
		router.loaderComponent = loaderComponent || (() => null);
		router.notFoundComponent = notFoundComponent;
		router.useParentLayout = useParentLayout ?? true;

		return router;
	};
};

const convertMDXPageToPageComponent = (
	MDXPage: MDXPageComponent,
	MDXRenderer: React.FunctionComponent<MDXRendererProps>
) => {
	const Page: PageComponent = () => {
		return <MDXRenderer className={""}>{MDXPage}</MDXRenderer>;
	};

	Page.path = MDXPage.metadata.path;
	Page.metadata = MDXPage.metadata.metadata;

	return Page;
};

const isMDXPage = (
	page: MDXPageComponent | PageComponent<any>,
	MDXRenderer: React.FunctionComponent<MDXRendererProps>
) => {
	// Check if page is a MDX Page Component or not
	if (!page["path"]) {
		if (!MDXRenderer) {
			throw new Error(
				"You must provide a MDXRenderer component to render MDX pages"
			);
		}

		return true;
	}

	return false;
};
