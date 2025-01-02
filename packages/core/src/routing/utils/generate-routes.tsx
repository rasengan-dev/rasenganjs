import {
	RouterProvider,
	createBrowserRouter,
	useLoaderData,
	useParams,
} from "react-router";
import {
	ErrorBoundary,
	NotFoundPageComponent,
} from "../components/index.js";
import { RouterComponent } from "../interfaces.js";
import {
	LoaderFunction,
	RouteLoaderFunction,
	RouteObject,
	LayoutComponent,
	LoaderResponse,
} from "../types.js";
import { PageToRender } from "../../core/components/index.js";
import { Suspense } from "react";

/**
 * This function receives a router component and get a formated router first
 * and then return a router.
 */
export const getRouter = (routerInstance: RouterComponent) => {
	const routes = generateRoutes(routerInstance);

	let router = createBrowserRouter(routes);

	return () => <RouterProvider router={router} />;
};

/**
 * This function create a loader function
 */
const createLoaderFunction = (loader?: RouteLoaderFunction): LoaderFunction => {
	return async ({ params, request }) => {
		try {
			// Check if the loader is defined
			if (!loader) {
				throw new Error("Missing loader function");
			}

			// Get the response from the loader
			const response = await loader({ params, request });

			// Handle redirection
			if (response.redirect) {
				const formData = new FormData();

				formData.append("redirect", response.redirect);

				return new Response(formData, {
					status: 302,
					headers: {
						Location: response.redirect,
					},
				});
			}

			return response;
		} catch (error) {
			return {
				props: {},
			};
		}
	};
};

/**
 * This function receives a router component and return a formated router for static routing
 * @param router Represents the router component
 * @returns
 */
export const generateRoutes = (
	router: RouterComponent,
	isRoot = true,
	parentLayout: LayoutComponent | undefined = undefined
) => {
	// Initialization of the list of routes
	const routes: Array<RouteObject> = [];

	// Get information about the layout and the path
	const Layout = router.layout;

	const route: RouteObject = {
		path: !isRoot
			? router.useParentLayout
				? parentLayout.path + Layout.path
				: Layout.path
			: Layout.path,
		errorElement: <ErrorBoundary />,
		Component() {
			// Default data
			const defaultData = {
				props: {},
			};

			// Get SSR data
			let { props } = (useLoaderData() as LoaderResponse) || defaultData;

			// get params
			const params = useParams();

			const layoutProps = {
				...props,
				params,
			};

			return <Layout {...layoutProps} />;
		},
		async loader({ params, request }) {
			return await createLoaderFunction(Layout.loader)({ params, request });
		},
		children: [],
		nested: router.useParentLayout,
	};

	// Defining the page not found route
	if (isRoot || router.notFoundComponent) {
		route.children.push({
			path: "*",
			element: router.notFoundComponent ?? <NotFoundPageComponent />,
		});
	}

	// Get informations about pages
	const pages: Array<RouteObject> = router.pages.map((Page) => {
		const pagePathFormated =
			Page.path.startsWith("/") && Page.path !== "/"
				? Page.path.slice(1)
				: Page.path;

		// Get the path of the page
		const path =
			Page.path === "/"
				? Layout.path
				: Layout.path.length > 1
				? pagePathFormated
				: Page.path;

		return {
			path,
			async loader({ params, request }) {
				return await createLoaderFunction(Page.loader)({ params, request });
			},
			Component() {
				// Default data
				const defaultData = {
					props: {
						params: {},
					},
				};

				const data = (useLoaderData() as LoaderResponse) || defaultData;

				return (
					<Suspense fallback={<>Loading</>}>
						<PageToRender
							page={Page}
							data={data}
							layoutMetadata={Layout.metadata}
						/>
					</Suspense>
				);
			},
			errorElement: <ErrorBoundary />,
			hydrateFallbackElement: <>Loading</>,
		};
	});

	// Add pages into children of the current route
	pages.forEach((page) => {
		route.children.push(page);
	});

	// Loop throug imported routers in order to apply the same thing.
	for (const importedRouter of router.routers) {
		const importedRoutes = generateRoutes(importedRouter, false, Layout);

		importedRoutes.forEach((route) => {
			if (route.nested) {
				route.children.push(route);
			} else {
				routes.push(route);
			}
		});
	}

	routes.unshift(route);

	// Return the formated router
	return routes;
};
