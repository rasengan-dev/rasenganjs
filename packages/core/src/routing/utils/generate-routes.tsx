import {
	RouterProvider,
	createBrowserRouter,
	useLoaderData,
	useParams,
} from "react-router-dom";
import { LoaderResponse } from "../../core";
import {
	ErrorBoundary,
	NotFoundComponentContainer,
	ClientComponent,
	ServerComponent,
} from "../components";
import { RouterComponent } from "../interfaces";

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
const generateBrowserRoutes = (router: RouterComponent, isRoot = true) => {
	// Initialization of the list of routes
	const routes = [] as any;

	// Get information about the layout and the path
	const Layout = router.layout;

	const route = {
		path: Layout.path,
		elementError: <ErrorBoundary />,
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
		children: [] as unknown as any,
	};

	// Defining the page not found route
	if (isRoot) {
		routes.push({
			path: "*",
			element: (
				<NotFoundComponentContainer content={router.notFoundComponent} />
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
			elementError: <ErrorBoundary />,
		};
	});

	// Add pages into children of the current route
	pages.forEach((page) => {
		route.children.push(page);
	});

	// Loop throug sub routers in order to apply the same thing.
	// for (const SubRouter of router.routers) {
	//   const subRouter = new SubRouter();

	//   const subRoutes = generateBrowserRoutes(subRouter);

	//   // Add sub routes into the lists of route
	//   route.children.push(subRoutes);
	// }

	routes.push(route);

	// Loop throug besides routers in order to apply the same thing.
	for (const besideRouter of router.routers) {
		const besidesRoutes = generateBrowserRoutes(besideRouter, false);

		// Add besides routes into the lists of route
		routes.push(...besidesRoutes);
	}

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
	isRoot = true
) => {
	// Initialization of the list of routes
	const routes = [] as any;

	// Get information about the layout and the path
	const Layout = router.layout;

	const route = {
		path: Layout.path,
		elementError: <ErrorBoundary />,
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
		children: [] as unknown as any,
	};

	// Defining the page not found route
	if (isRoot) {
		routes.push({
			path: "*",
			element: (
				<NotFoundComponentContainer content={router.notFoundComponent} />
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
			elementError: <ErrorBoundary />,
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

	routes.push(route);

	// Loop throug besides routers in order to apply the same thing.
	for (const besideRouter of router.routers) {
		const besidesRoutes = generateStaticRoutes(besideRouter, false);

		// Add besides routes into the lists of route
		routes.push(...besidesRoutes);
	}

	// Return the formated router
	return routes;
};
