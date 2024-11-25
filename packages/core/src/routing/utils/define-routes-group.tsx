import { PageComponent, MDXPageComponent } from "../../core/types.js";
import { RoutesGroupProps } from "../types.js";

/**
 * Recursively loops through an array of `PageComponent`, `MDXPageComponent`, or `RoutesGroupProps` and extracts all the pages into a single array.
 * @param option - An object containing the `path` and `children` properties, which are used to define a routes group.
 * @returns An array of `PageComponent` or `MDXPageComponent` objects.
 */
export const defineRoutesGroup = (option: RoutesGroupProps) => {
	const { path, children } = option;

	// Loop through all the children and extract the pages into a single array
	return loop(path, children);
};

/**
 * Recursively loops through an array of `PageComponent`, `MDXPageComponent`, or `RoutesGroupProps` and extracts all the pages into a single array.
 * @param children - An array of `PageComponent`, `MDXPageComponent`, or `RoutesGroupProps` objects.
 * @returns An array of `PageComponent` or `MDXPageComponent` objects.
 */
const loop = (
	path: string,
	children: Array<
		PageComponent | MDXPageComponent | Array<PageComponent | MDXPageComponent>
	>
) => {
	const pages: Array<PageComponent | MDXPageComponent> = [];

	for (const child of children) {
		const page = child as PageComponent;

		if (Array.isArray(child)) {
			const children = child as Array<
				PageComponent | MDXPageComponent
			>;

			// Recursively loop through the children and extract the pages
			const childrenPages = loop(path, children);

			pages.push(...childrenPages);
		} else {
			const routePath = path[0] === "/" ? path : `/${path}`;

			// Check if the page is a PageComponent
			if (page["path"]) {
				const pagePath =
					page["path"][0] === "/" ? page["path"].slice(1) : page["path"];
				page.path = `${routePath}/${pagePath}`;

				pages.push(page);
			}
			// Check if the page is a MDXPageComponent
			else {
				let pagePath = page.metadata["path"] || page.name;

				pagePath = pagePath[0] === "/" ? pagePath.slice(1) : pagePath;

				page.metadata["path"] = `${routePath}/${pagePath}`;

				pages.push(page);
			}
		}
	}

	return pages;
};
