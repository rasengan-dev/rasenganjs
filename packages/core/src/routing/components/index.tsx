import { Suspense } from "react";
import {
	Link,
	LinkProps,
	useLoaderData,
	useRouteError,
} from "react-router-dom";
import { PageToRender } from "../../core/components/index.js";
import { PageComponent } from "../../core/types.js";
import { LoaderResponse } from "../../core/types.js";
import {
	MetadataWithoutTitleAndDescription,
	NotFoundComponentContainerProps,
} from "../types.js";

/**
 * Error boundary component that will be displayed if an error occurs during a routing
 * @returns
 */
export function ErrorBoundary() {
	let error = useRouteError();

	console.error(error);

	return <div>Dang!</div>;
}

/**
 * Component that will be displayed during a routing on the server side
 * @returns React.ReactNode
 */
export const ServerComponent = ({
	page,
	layoutMetadata,
	loader,
}: {
	page: PageComponent;
	loader: React.ReactNode;
	layoutMetadata?: MetadataWithoutTitleAndDescription;
}) => {
	// Default data
	const defaultData = {
		props: {
			params: {},
		},
	};

	const data = (useLoaderData() as LoaderResponse) || defaultData;

	return (
		<Suspense fallback={loader}>
			<PageToRender page={page} data={data} layoutMetadata={layoutMetadata} />
		</Suspense>
	);
};

/**
 * Component that will be displayed during a routing on the client side
 * @returns React.ReactNode
 */
export const ClientComponent = ({
	page,
	layoutMetadata,
	loader,
}: {
	page: PageComponent;
	loader: React.ReactNode;
	layoutMetadata?: MetadataWithoutTitleAndDescription;
}) => {
	// Default data
	const defaultData = {
		props: {
			params: {},
		},
	};

	const data = (useLoaderData() as LoaderResponse) || defaultData;

	return (
		<Suspense fallback={loader}>
			<PageToRender page={page} data={data} layoutMetadata={layoutMetadata} />
		</Suspense>
	);
};

/**
 * Component that will be displayed when a page is not found
 * @returns React.ReactNode
 */
export const NotFoundPageComponent = () => {
	return (
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
			}}
		>
			<h1
				style={{
					fontSize: "3rem",
					fontWeight: "bold",
					marginBottom: 10,
				}}
			>
				404 Page Not Found
			</h1>

			<p
				style={{
					fontSize: "1.2rem",
					marginBottom: 20,
				}}
			>
				The page you are looking for does not exist or has been moved.
			</p>

			<Link
				to='/'
				style={{
					fontSize: "1.2rem",
					fontWeight: 800,
					marginBottom: 20,
					textDecoration: "none",
				}}
			>
				Go back to home page
			</Link>
		</section>
	);
};

/**
 * Component that will be displayed when a page is not found
 */
export const NotFoundComponentContainer = ({
	content,
}: NotFoundComponentContainerProps) => {
	return <>{content({})}</>;
};

/**
 * Custom Link Component
 * @param props
 * @returns React.ReactNode
 */
export const CustomLink = (props: LinkProps) => {
	const { to, children, ...rest } = props;

	if (typeof to === "string") {
		const splitted = to.split("#");
		if (splitted.length > 1)
			return (
				<a href={to} {...rest}>
					{children}
				</a>
			);
	}

	return (
		<Link to={to} {...rest}>
			{children}
		</Link>
	);
};
