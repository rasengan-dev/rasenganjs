import {
	RouterProvider,
	createBrowserRouter,
	useLoaderData,
	useParams,
} from "react-router-dom";
import { LayoutComponent, LoaderResponse } from "../../core/index.js";
import {
	ErrorBoundary,
	NotFoundComponentContainer,
	ClientComponent,
	ServerComponent,
	NotFoundPageComponent,
} from "../components/index.js";
import { RouterComponent } from "../interfaces.js";
import { Route } from "../types.js";
import { lazy } from "react";

/**
 * This function receives a router component and get a formated router first
 * and then return a router.
 */
export const getRouter = (router: RouterComponent) => {
	const routes = generateBrowserRoutes(router);

	let Router = createBrowserRouter(routes);

	return () => (
		<RouterProvider fallbackElement={<>Not Found</>} router={Router} />
	);
};

/**
 * This function receives a router component and return a formated router.
 */
const generateBrowserRoutes = (
	router: RouterComponent,
	isRoot = true,
	parentLayout: LayoutComponent | undefined = undefined
) => {
	// Initialization of the list of routes
	const routes: Array<Route> = [];

	// Get information about the layout and the path
	const Layout = router.layout;

	const route: Route = {
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

			let { props } = (useLoaderData() as LoaderResponse) || defaultData;

			// get params
			const params = useParams();

			const finalProps = {
				...props,
				params,
			};

			return <Layout {...finalProps} />;
		},
		children: [],
		nested: router.useParentLayout,
	};

	// Defining the page not found route
	if (isRoot || router.notFoundComponent) {
		route.children.push({
			path: "*",
			element: (
				<NotFoundComponentContainer
					content={router.notFoundComponent ?? NotFoundPageComponent}
				/>
			),
		});
	}

	// Get informations about pages
	const pages = router.pages.map((Page) => {
		const pagePathFormated =
			Page.path[0] === "/" && Page.path !== "/"
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
			element: (
				<ClientComponent
					page={Page}
					loader={router.loaderComponent({})}
					layoutMetadata={Layout.metadata}
				/>
			),
			errorElement: <ErrorBoundary />,
		};
	});

	// Add pages into children of the current route
	pages.forEach((page) => {
		route.children.unshift(page);
	});

	// Loop throug sub routers in order to apply the same thing.
	// for (const SubRouter of router.routers) {
	//   const subRouter = new SubRouter();

	//   const subRoutes = generateBrowserRoutes(subRouter);

	//   // Add sub routes into the lists of route
	//   route.children.push(subRoutes);
	// }

	// Loop throug besides routers in order to apply the same thing.
	for (const besideRouter of router.routers) {
		const besidesRoutes = generateBrowserRoutes(besideRouter, false, Layout);

		// Add besides routes into the lists of route
		besidesRoutes.forEach((r) => {
			if (r.nested) {
				route.children.unshift(r);
			} else {
				routes.push(r);
			}
		});
	}

	routes.unshift(route);

	// Return the formated router
	return routes;
};

/**
 * This function receives a router component and return a formated router for static routing
 * @param router Represents the router component
 * @returns
 */
export const generateStaticRoutes = (
	router: RouterComponent,
	isRoot = true,
	parentLayout: LayoutComponent | undefined = undefined
) => {
	// Initialization of the list of routes
	const routes: Array<Route> = [];

	// Get information about the layout and the path
	const Layout = router.layout;

	const route: Route = {
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

			const finalProps = {
				...props,
				params,
			};

			return <Layout {...finalProps} />;
		},
		loader: async ({ params, request }: any) => {
			try {
				// Check if the loader is defined
				if (!Layout.loader) {
					throw new Error("Missing loader function");
				}

				// Get the response from the loader
				const response = await Layout.loader({ params, request });

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
		},
		children: [],
		nested: router.useParentLayout,
	};

	// Defining the page not found route
	if (isRoot || router.notFoundComponent) {
		route.children.push({
			path: "*",
			element: (
				<NotFoundComponentContainer
					content={router.notFoundComponent ?? NotFoundPageComponent}
				/>
			),
		});
	}

	// Get informations about pages
	const pages = router.pages.map((Page) => {
		const pagePathFormated =
			Page.path[0] === "/" && Page.path !== "/"
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
			async loader({ params, request }: any) {
				try {
					// Check if the loader is defined
					if (!Page.loader) {
						throw new Error("Missing loader function");
					}

					// Get the response from the loader
					const response = await Page.loader({ params, request });

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
			},
			Component() {
				return (
					<ServerComponent
						page={Page}
						loader={router.loaderComponent({})}
						layoutMetadata={Layout.metadata}
					/>
				);
			},
			errorElement: <ErrorBoundary />,
		};
	});

	// Add pages into children of the current route
	pages.forEach((page) => {
		route.children.push(page);
	});

	// Loop throug sub routers in order to apply the same thing.
	// for (const SubRouter of router.routers) {
	//   const subRouter = new SubRouter();
	//   const subRoutes = generateStaticRoutes(subRouter);

	//   // Add sub routes into the lists of route
	//   route.children.push(subRoutes);
	// }

	// Loop throug besides routers in order to apply the same thing.
	for (const besideRouter of router.routers) {
		const besidesRoutes = generateStaticRoutes(besideRouter, false, Layout);

		besidesRoutes.forEach((r) => {
			if (r.nested) {
				route.children.push(r);
			} else {
				routes.push(r);
			}
		});
	}

	routes.unshift(route);

	// Return the formated router
	return routes;
};
