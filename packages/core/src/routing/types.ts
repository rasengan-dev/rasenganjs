import { FunctionComponent } from "react";
import {
	LayoutComponent,
	LoaderResponse,
	MDXPageComponent,
	MDXRendererProps,
	PageComponent,
} from "../core/types.js";
import { RouterComponent } from "./interfaces.js";
import { RouteObject as RRRouteObject } from "react-router";

export type NotFoundComponentContainerProps = {
	content: React.ReactNode;
};

export type MetadataLink = {
	rel: string;
	type?: string;
	sizes?: string;
	href: string;
};

export type MetaTag = {
	name?: string;
	property?: string;
	content: string;
};

export type MetadataWithoutTitleAndDescription = {
	/**
	 * Configuring link preview on social media like facebook, linkedin, etc.
	 */
	openGraph?: {
		type?: string;
		title?: string;
		description?: string;
		url: string;
		image: string;
		width?: string;
		height?: string;
	};

	/**
	 * Configuring link preview on twitter
	 */
	twitter?: {
		card: "summary_large_image" | "summary";
		image: string;
		title: string;
		description?: string;
		creator?: string;
		site?: string;
	};

	/**
	 * Configuring link tags to define icons and others
	 */
	links?: Array<MetadataLink>;

	/**
	 * Other metadata tags
	 */
	metaTags?: Array<MetaTag>;
};

export type Metadata = MetadataWithoutTitleAndDescription & {
	/**
	 * Title of the pate
	 */
	title?: string;

	/**
	 * Description of the page
	 */
	description?: string;
};

/**
 * Props for Router Decorators
 */
export type RouterProps = {
	/**
	 * Usefull to collect sub routers
	 */
	imports?: Array<RouterComponent>;

	/**
	 * Usefull to define a layout
	 */
	layout?: LayoutComponent;

	/**
	 * Usefull to collect pages
	 */
	pages?: Array<
		PageComponent | MDXPageComponent | Array<PageComponent | MDXPageComponent>
	>;

	/**
	 * Usefull to render MDX pages
	 */
	MDXRenderer?: FunctionComponent<MDXRendererProps>;

	/**
	 * Usefull to display a screen that let know to the user that the page is loading.
	 */
	loaderComponent?: FunctionComponent;

	/**
	 * Usefull to display a screen that let know to the user that the page is not found.
	 */
	notFoundComponent?: FunctionComponent;

	/**
	 * Determines whether the current page should use the parent layout, or render its own layout.
	 */
	useParentLayout?: boolean;
};

export type LoaderFunction = ({
	params,
	request,
}: {
	params: Record<string, string>;
	request: Request;
}) => Promise<LoaderResponse | Response>;

export type RouteObject = RRRouteObject & {
	loader?: LoaderFunction;

	/**
	 * Routes children
	 */
	children?: Array<RouteObject>;

	/**
	 * Determines if the route is nested
	 */
	nested?: boolean;
};

// export type Route = {
// 	/**
// 	 * Path of the route
// 	 */
// 	path: string;

// 	Component(): JSX.Element | undefined;
// 	element?: React.ReactNode;

// 	loader?: ({ params, request }: any) => Promise<LoaderResponse | Response>;

// 	/**
// 	 * Error element to render
// 	 */
// 	errorElement?: React.ReactNode;

// 	hydrateFallbackElement?: React.ReactNode;

// 	/**
// 	 * Routes children
// 	 */
// 	children?: Array<Route | RoutePage>;

// 	/**
// 	 * Determines if the route is nested
// 	 */
// 	nested?: boolean;
// };

// export type RoutePage = {
// 	/**
// 	 * Path of the route
// 	 */
// 	path: string;

// 	/**
// 	 * Element to render
// 	 */
// 	element: React.ReactNode;

// 	/**
// 	 * Element error to render
// 	 */
// 	errorElement?: React.ReactNode;
// };

export type RoutesGroupProps = {
	/**
	 * Path of the group
	 */
	path: string;

	/**
	 * Routes children
	 */
	children: Array<
		PageComponent | MDXPageComponent | Array<PageComponent | MDXPageComponent>
	>;
};
