import { RouterComponent } from "../interfaces.js";
import {
	RouterProvider,
	createBrowserRouter,
	useLoaderData,
	useParams,
} from "react-router-dom";
import {
	RouteDecoratorProps,
	RouteLayoutDecoratorProps,
	RouterDecoratorProps,
} from "../../decorators/types.js";
import {
	LayoutComponent,
	LoaderResponse,
	MDXPageComponent,
	PageComponent,
} from "../../index.js";
import {
	ClientComponent,
	NotFoundComponentContainer,
	NotFoundPageComponent,
	ServerComponent,
} from "../components/index.js";
import { ErrorBoundary, DefaultLayout } from "../../core/components/index.js";
import { Metadata, MetadataLink, MetaTag } from "../types.js";

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

/**
 * This function adds metadata to a page or a layout
 * @param option
 * @returns
 */
export const defineRoutePage = (option: RouteDecoratorProps) => {
	const { path, metadata } = option;

	return (Component: new () => PageComponent) => {
		if (!path) throw new Error("You must provide a path to the page");

		// Create a new instance of the component
		const component = new Component();

		// Set properties
		component.path = path;
		component.metadata = metadata;

		return component;
	};
};

/**
 * This function adds metadata to a page or a layout
 * @param option
 * @returns
 */
export const defineRouteLayout = (option: RouteLayoutDecoratorProps) => {
	const { path, metadata } = option;

	return (Component: new () => LayoutComponent) => {
		if (!path) throw new Error("You must provide a path to the layout");

		// Create a new instance of the component
		const component = new Component();

		// Set properties
		component.path = path;
		component.metadata = metadata;

		return component;
	};
};

/**
 * This function adds metadata to a router
 * @param option
 * @returns
 */
export const defineRouter = (option: RouterDecoratorProps) => {
	const { imports, layout, pages, loaderComponent, notFoundComponent } = option;

	return (Component: new () => RouterComponent) => {
		// Handle errors
		if (!option.pages)
			throw new Error(
				"You must provide a list of pages in the router decorator"
			);

		// Create router
		const router = new Component();

		// Normalize pages
		const normalizedPages: PageComponent[] = [];

		for (let p of pages) {
      // When p is a MDXPageComponent
			if (!p["path"]) {
				const mdxPage = p as MDXPageComponent;

				const normalizedPage = p as PageComponent;

				normalizedPage.path = mdxPage.metadata.path;
				normalizedPage.metadata = mdxPage.metadata.metadata;

				normalizedPages.push(normalizedPage);
			} else {
				normalizedPages.push(p as PageComponent);
			}
		}

		// Set properties
		router.routers = imports || [];
		router.layout = layout || DefaultLayout;
		router.pages = normalizedPages;
		router.loaderComponent = loaderComponent || (() => null);
		router.notFoundComponent = notFoundComponent || NotFoundPageComponent;

		return router;
	};
};

/**
 * This function generates metadata useful for pages to show images when sharing on social media
 * @param {Metadata[]} metadatas
 */
export const generateMetadata = (metadatas: Metadata[]) => {
	const metadataElements: JSX.Element[] = [];

	metadatas.forEach((metadata) => {
		const { openGraph, twitter, links, metaTags } = metadata;

		// Handling openGraph
		if (openGraph) {
			const { title, description, url, image, width, height, type } = openGraph;

			if (title) {
				metadataElements.push(
					<meta key='og:title' property='og:title' content={title} />
				);
			}

			if (description) {
				metadataElements.push(
					<meta
						key='og:description'
						property='og:description'
						content={description}
					/>
				);
			}

			if (url) {
				metadataElements.push(
					<meta key='og:url' property='og:url' content={url} />
				);
			}

			if (image) {
				metadataElements.push(
					<meta key='og:image' property='og:image' content={image} />
				);
			}

			if (width) {
				metadataElements.push(
					<meta
						key='og:image:width'
						property='og:image:width'
						content={width}
					/>
				);
			}

			if (height) {
				metadataElements.push(
					<meta
						key='og:image:height'
						property='og:image:height'
						content={height}
					/>
				);
			}

			metadataElements.push(
				<meta key='og:type' property='og:type' content={type || "website"} />
			);
		}

		// Handling twitter
		if (twitter) {
			const { card, site, creator, image, title, description } = twitter;

			metadataElements.push(
				<meta
					key='twitter:card'
					name='twitter:card'
					content={card || "summary_large_image"}
				/>
			);

			if (site) {
				metadataElements.push(
					<meta key='twitter:site' name='twitter:site' content={site} />
				);
			}

			if (creator) {
				metadataElements.push(
					<meta
						key='twitter:creator'
						name='twitter:creator'
						content={creator}
					/>
				);
			}

			if (image) {
				metadataElements.push(
					<meta key='twitter:image' name='twitter:image' content={image} />
				);
			}

			if (title) {
				metadataElements.push(
					<meta key='twitter:title' name='twitter:title' content={title} />
				);
			}

			if (description) {
				metadataElements.push(
					<meta
						key='twitter:description'
						name='twitter:description'
						content={description}
					/>
				);
			}
		}

		// Handling links
		if (links) {
			metadataElements.push(...generateLinks(links));
		}

		// Handling metadata tags
		if (metaTags) {
			metadataElements.push(...generateMetaTags(metaTags));
		}
	});

	return metadataElements;
};

/**
 * This function generates links for metadata
 */
const generateLinks = (links: MetadataLink[]) => {
	return links.map((link) => {
		const { rel, sizes, type, href } = link;

		return (
			<link
				key={rel}
				rel={rel}
				sizes={sizes || "32x32"}
				type={type || "image/png"}
				href={href}
			/>
		);
	});
};

/**
 * This function generates meta tags for metadata
 * @param metaTags
 * @returns
 */
const generateMetaTags = (metaTags: MetaTag[]) => {
	return metaTags.map((metaTag) => {
		const { content, name, property } = metaTag;

		if (property) {
			return <meta key={property} property={property} content={content} />;
		}

		return <meta key={name} name={name} content={content} />;
	});
};
