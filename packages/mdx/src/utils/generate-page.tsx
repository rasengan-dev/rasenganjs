import { type PageComponent } from "rasengan";
import { MDXPageComponent } from "../types/index.js";
import { MDXRenderer } from "../components/index.js";

/**
 * Generates a React component from an MDXPageComponent.
 *
 * @param MDXPage - The MDXPageComponent to generate the React component from.
 * @param className - An optional CSS class name to apply to the MDXRenderer component.
 * @returns A React component that renders the MDXPage content using the MDXRenderer.
 */
export default function generatePage(
	MDXPage: MDXPageComponent,
	className = ""
): PageComponent {
	const Page: PageComponent = () => {
		return <MDXRenderer className={className}>{MDXPage}</MDXRenderer>;
	};

	Page.path = MDXPage.metadata.path;
	Page.metadata = MDXPage.metadata.metadata;

	return Page;
}
