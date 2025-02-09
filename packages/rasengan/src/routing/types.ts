import { FunctionComponent } from "react";
import { RouteObject as RRRouteObject } from "react-router";
import { RouterComponent } from "./interfaces.js";

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

/**
 * Options for the loader function that loads data for a page from the server
 */
export type LoaderOptions = {
	params: { [key: string]: any };
	request: Request;
};

/**
 * Data returned from the loader function
 */
export type LoaderResponse = {
	props?: { [key: string]: any };
	redirect?: string;
	meta?: Metadata | MetadataWithoutTitleAndDescription;
};

export type RouteLoaderFunction = (
	options: LoaderOptions
) => Promise<LoaderResponse>;

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

export type RasenganPageComponentProps = {
	page: PageComponent;
	data: LoaderResponse;
};

/**
 * Props for react components
 */
export type ReactComponentProps =
	| {
			[key: string]: any;
			params: {
				[key: string]: any;
			};
	  }
	| any;

/**
 * Layout component that represents a layout
 */
export type LayoutComponent<T = ReactComponentProps> = FunctionComponent<T> & {
	/**
	 * Base path for the page
	 */
	path: string;

	/**
	 * Metadata for the page
	 */
	metadata?: MetadataWithoutTitleAndDescription;

	/**
	 * Loader function that loads data for the page from the server
	 */
	loader?: RouteLoaderFunction;
};

/**
 * Page component that extends LayoutComponent and represents a page
 */
export type PageComponent<T = ReactComponentProps> = LayoutComponent<T> & {
	/**
	 * Metadata for the page omit title
	 */
	metadata?: Metadata;
};

/**
 * A React functional component that represents an MDX page.
 *
 * The `MDXPageComponent` type extends the `React.FC<ReactComponentProps>` type,
 * which means it is a React functional component that accepts the standard props for a React component.
 *
 * The `MDXPageComponent` type also has an optional `metadata` property of type `Metadata`,
 * which can be used to store metadata about the page.
 */
export type MDXPageComponent = FunctionComponent & {
	metadata?: {
		path: string;
		metadata: Metadata;
	};
};

/**
 * A React functional component that represents a simple block element.
 */
export type MDXRendererProps = {
	children: MDXPageComponent;
	className?: string;
};

/**
 * Template props
 */
export type TemplateProps = {
	Head: FunctionComponent<{ children: React.ReactNode }>;
	Body: FunctionComponent<{ children: React.ReactNode }>;
	Script: FunctionComponent<{ children?: React.ReactNode }>;
};


/**
 * Props for the base Component that takes the app router
 */
export type RootComponentProps = {
	router: Promise<RouterComponent>;
	children: React.ReactNode;
};