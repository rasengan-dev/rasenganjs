import React from "react";
import {
	ComponentProps,
	HelmetContext,
	LayoutComponent,
	PageToRenderProps,
} from "../types.js";
import { generateMetadata, getRouter } from "../../routing/utils/index.js";
import { Outlet, useParams } from "react-router";
import * as HelmetAsync from "react-helmet-async";

// @ts-ignore
const H = HelmetAsync.default ? HelmetAsync.default : HelmetAsync;

/**
 * App component that represent the entry point of the application
 */
export const Component = ({
	router: AppRouter,
	children = undefined,
}: ComponentProps) => {
	// Return children if they exist
	if (children) return children;

	let Router: any = null;

	// Otherwise, get the router and return it
	Router = getRouter(AppRouter);

	return (
		<H.HelmetProvider>
			<Router />
		</H.HelmetProvider>
	);
};

/**
 * Page component that defines title and description to a page
 */
export const PageToRender = ({
	page: Page,
	data,
	layoutMetadata,
}: PageToRenderProps) => {
	// Get the page props
	const props = data.props || {};

	// get params
	const params = useParams();

	const finalProps = {
		...props,
		params,
	};

	// Generate meta tags
	const metaTags = React.useMemo(() => {
		const metadatas = [];

		if (Page.metadata) metadatas.push(Page.metadata);
		if (layoutMetadata) metadatas.push(layoutMetadata);

		return generateMetadata(metadatas);
	}, []);

	return (
		<React.Fragment>
			<H.Helmet>
				{metaTags.map((meta) => meta)}

				<meta name='description' content={Page.metadata?.description || ""} />
				<title>{Page.metadata?.title || Page.name}</title>
			</H.Helmet>

			<Page {...finalProps} />
		</React.Fragment>
	);
};

/**
 * Head component
 * @params data - Helmet context
 * @returns
 */
export const Heads = ({
	data,
	children = undefined,
	bootstrap = "",
	styles = "",
}: {
	data: HelmetContext;
	children?: React.ReactNode;
	bootstrap?: string;
	styles?: string;
}) => {
	if (!data) return null;

	return (
		<head>
			{children}

			{/* {data.helmet && data.helmet.meta.toComponent({})}
			{data.helmet && data.helmet.title.toComponent({})} */}

			{bootstrap && (
				<script type='module' src={bootstrap} defer={true}></script>
			)}

			{styles && (
				<link rel='stylesheet' crossOrigin='' type='text/css' href={styles} />
			)}
		</head>
	);
};

/**
 * Body component
 */
export const Body = ({
	children = undefined,
	asChild = false,
	AppContent = undefined,
}: {
	children?: React.ReactNode;
	asChild?: boolean;
	AppContent?: React.ReactNode;
}) => {
	return (
		<body>
			<noscript
				dangerouslySetInnerHTML={{
					__html: `<b>Enable JavaScript to run this app.</b>`,
				}}
			/>

			{asChild ? (
				<div id='root'>{AppContent}</div>
			) : (
				<div id='root'>{"rasengan-body-app"}</div>
			)}

			{children}
		</body>
	);
};

/**
 * Scripts component
 */
export const Scripts = ({
	children = undefined,
	bootstrap = "",
}: {
	children?: React.ReactNode;
	bootstrap?: string;
}) => {
	return (
		<React.Fragment>
			{/* {bootstrap === "" && (
				<script
					type='module'
					src={`/src/index.js`}
					defer={true}
				></script>
			)} */}
			{children}
		</React.Fragment>
	);
};

/**
 * Default layout component
 */
const DefaultLayout: LayoutComponent = () => {
	return (
		<React.Fragment>
			<Outlet />
		</React.Fragment>
	);
};
DefaultLayout.path = "/";

export { DefaultLayout };
