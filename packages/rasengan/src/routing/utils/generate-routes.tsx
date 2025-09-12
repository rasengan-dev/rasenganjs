import { Outlet, matchRoutes, useLoaderData, useParams } from 'react-router';
import {
  ErrorBoundary,
  NotFoundPageComponent,
  RasenganPageComponent,
} from '../components/index.js';
import { RouterComponent } from '../interfaces.js';
import {
  LoaderFunction,
  RouteLoaderFunction,
  RouteObject,
  LayoutComponent,
  LoaderResponse,
  Metadata,
  MetadataWithoutTitleAndDescription,
  PageComponent,
  MDXPageComponent,
} from '../types.js';
import { lazy, Suspense } from 'react';
import MetadataProvider from '../providers/metadata.js';
import {
  convertMDXPageToPageComponent,
  isMDXPage,
  Module,
  RouteNode,
} from './index.js';
import { HydrationFallback } from '../components/fallback.js';

const defaultMetadata: Metadata = {
  title: 'Not Found',
  description: 'Page not found',
};

/**
 * This function merge the metadata, giving priority to the ones comming from loader
 */
const mergeMetaData = (
  responseMeta: Metadata | MetadataWithoutTitleAndDescription,
  meta: Metadata | MetadataWithoutTitleAndDescription,
  isLayout = false
) => {
  let mergedMetaData: Metadata | MetadataWithoutTitleAndDescription = {
    metaTags: [],
    links: [],
    openGraph: {
      url: '',
      image: '',
    },
    twitter: {
      card: 'summary_large_image',
      image: '',
      title: '',
    },
  };

  if (!isLayout) {
    // merge title and description
    mergedMetaData['title'] =
      (responseMeta as Metadata).title ?? (meta as Metadata).title;
    mergedMetaData['description'] =
      (responseMeta as Metadata).description ?? (meta as Metadata).description;
  }

  // merge openGraph datas
  mergedMetaData['openGraph'] = {
    ...meta.openGraph,
    ...responseMeta.openGraph,
  };

  // merge twitter data
  mergedMetaData['twitter'] = {
    ...meta.twitter,
    ...responseMeta.twitter,
  };

  // merge elements of type <array> eg. metaTags and links
  const metaSet = new Set<string>();
  const linkSet = new Set<string>();

  if (meta['metaTags'] && Array.isArray(meta.metaTags)) {
    // Loop through the metaTags and add every key to the set
    for (const element of meta.metaTags) {
      metaSet.add(element.name ?? element.property);
    }

    if (responseMeta['metaTags'] && Array.isArray(responseMeta.metaTags)) {
      // Loop through the responseMeta and check if the key is already in the set
      for (const element of responseMeta.metaTags) {
        if (metaSet.has(element.name ?? element.property)) {
          // remove the element from the set
          metaSet.delete(element.name ?? element.property);
        }

        mergedMetaData.metaTags.push(element);
      }
    }

    // Loop through the remaining elements in the set
    for (const element of metaSet) {
      const metaElement = meta.metaTags.find((el) => el.name === element);

      if (metaElement) {
        mergedMetaData.metaTags.push(metaElement);
      }
    }
  } else {
    mergedMetaData.metaTags = responseMeta.metaTags ?? [];
  }

  if (meta['links'] && Array.isArray(meta.links)) {
    // Loop through the links and add every key to the set
    for (const element of meta.links) {
      linkSet.add(element.rel);
    }

    if (responseMeta['links'] && Array.isArray(responseMeta.links)) {
      // Loop through the responseMeta and check if the key is already in the set
      for (const element of responseMeta.links) {
        if (linkSet.has(element.rel)) {
          // remove the element from the set
          linkSet.delete(element.rel);
        }

        mergedMetaData.links.push(element);
      }
    }

    // Loop through the remaining elements in the set
    for (const element of linkSet) {
      const linkElement = meta.links.find((el) => el.rel === element);

      if (linkElement) {
        mergedMetaData.links.push(linkElement);
      }
    }
  } else {
    mergedMetaData.links = responseMeta.links ?? [];
  }

  return mergedMetaData;
};

/**
 * This function create a loader function
 */
const createLoaderFunction = ({
  loader,
  metadata,
  isLayout = false,
  source,
}: {
  loader?: RouteLoaderFunction;
  metadata?: Metadata | MetadataWithoutTitleAndDescription;
  isLayout?: boolean;
  source?: string;
}): LoaderFunction => {
  return async ({ params, request }) => {
    try {
      // Check if the loader is defined
      if (!loader) {
        return {
          props: {},
          meta: metadata,
          source,
        };
      }

      // Get the response from the loader
      const response = await loader({ params, request });

      // Handle redirection
      if (response.redirect) {
        const formData = new FormData();

        formData.append('redirect', response.redirect);

        return new Response(formData, {
          status: 302,
          headers: {
            Location: response.redirect,
          },
        });
      }

      return {
        props: response.props,
        meta: mergeMetaData(response.meta ?? {}, metadata, isLayout),
        source,
      };
    } catch (error) {
      console.error(error);

      return {
        props: {},
        meta: {
          openGraph: {
            url: '',
            image: '',
          },
          twitter: {
            card: 'summary_large_image',
            image: '',
            title: '',
          },
          metaTags: [],
          links: [],
        },
        source,
      };
    }
  };
};

/**
 * This function preload the matching lazy routes
 * @param url
 * @param routes
 */
export const preloadMatches = async (
  url: Partial<Location> | string,
  routes: RouteObject[]
) => {
  const matches = matchRoutes(routes, url);
  if (!matches) return;

  await Promise.all(
    matches.map(async (match) => {
      if (match.route.lazy) {
        const resolved = await (match.route.lazy as Function)();

        Object.assign(match.route, resolved);

        // Strip lazy so Router never tries to suspend again
        delete match.route.lazy;
      }
    })
  );
};

/**
 * This function receives a router component and return a formated router for static routing
 * @param router Represents the router component
 * @returns
 */
export const generateRoutes = (
  router: RouterComponent,
  isRoot = true,
  parentLayoutPath: string | undefined = undefined
) => {
  // Initialization of the list of routes
  const routes: Array<RouteObject> = [];

  let route: RouteObject;
  let layoutPath: string;

  // Check if the layout is coming from the file-based routing system
  if ('source' in router.layout) {
    const layoutNode = router.layout as RouteNode;
    layoutPath = layoutNode.path;

    route = {
      path: !isRoot
        ? router.useParentLayout
          ? layoutNode.path.replace(parentLayoutPath + '/', '')
          : layoutNode.path
        : layoutNode.path,
      errorElement: <ErrorBoundary />,
      lazy: async () => {
        const Layout = (await layoutNode.module()).default as LayoutComponent;

        if (!Layout) {
          console.warn(
            `Layout component is not exported by default from: ${layoutNode.source}}`
          );

          return {
            Component() {
              return <Outlet />;
            },
          };
        }

        return {
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

            // Check if the layout is the root layout and wrap it in a MetadataProvider
            if (isRoot || !router.useParentLayout) {
              // Generate metadata mapping
              // const metadataMapping = generateMetadataMapping(router);

              return (
                // <MetadataProvider metadataMapping={metadataMapping}>
                <Layout {...layoutProps} />
                // </MetadataProvider>
              );
            }

            return <Layout {...layoutProps} />;
          },

          async loader({ params, request }) {
            // Extract metadata from the layout
            const metadata: MetadataWithoutTitleAndDescription = {
              openGraph: {
                url: '',
                image: '',
              },
              twitter: {
                card: 'summary_large_image',
                image: '',
                title: '',
              },
              ...Layout.metadata,
            };

            return createLoaderFunction({
              loader: Layout.loader,
              metadata,
              isLayout: true,
              source: layoutNode.source,
            })({
              params,
              request,
            });
          },
        };
      },
      children: [],
      nested: router.useParentLayout,
      hydrateFallbackElement: <></>,
      // shouldRevalidate: ({ currentUrl, nextUrl, defaultShouldRevalidate }) => {
      //   // Only revalidate if navigating to a different route
      //   return currentUrl.pathname !== nextUrl.pathname;
      // },
    };
  } else {
    const Layout = router.layout as LayoutComponent;
    layoutPath = Layout.path;

    route = {
      path: !isRoot
        ? router.useParentLayout
          ? layoutPath.replace(parentLayoutPath + '/', '')
          : layoutPath
        : layoutPath,
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

        // Check if the layout is the root layout and wrap it in a MetadataProvider
        if (isRoot || !router.useParentLayout) {
          // Generate metadata mapping
          // const metadataMapping = generateMetadataMapping(router);

          return (
            // <MetadataProvider metadataMapping={metadataMapping}>
            <Layout {...layoutProps} />
            // </MetadataProvider>
          );
        }

        return <Layout {...layoutProps} />;
      },
      async loader({ params, request }) {
        // Extract metadata from the layout
        const metadata: MetadataWithoutTitleAndDescription = {
          openGraph: {
            url: '',
            image: '',
          },
          twitter: {
            card: 'summary_large_image',
            image: '',
            title: '',
          },
          ...Layout.metadata,
        };

        return createLoaderFunction({
          loader: Layout.loader,
          metadata,
          isLayout: true,
        })({
          params,
          request,
        });
      },
      children: [],
      nested: router.useParentLayout,
      hydrateFallbackElement: <></>,
      // hydrateFallbackElement: <>Loading...</>, // TODO: enable override
      // shouldRevalidate: ({ currentUrl, nextUrl, defaultShouldRevalidate }) => {
      //   // Only revalidate if navigating to a different route
      //   return currentUrl.pathname !== nextUrl.pathname;
      // },
    };
  }

  // Defining the page not found route
  if (isRoot || router.notFoundComponent) {
    route.children.push({
      path: '*',
      element: router.notFoundComponent ?? <NotFoundPageComponent />,
      loader: async () => {
        return {
          props: {},
          meta: defaultMetadata,
        };
      },
    });
  }

  // Get informations about pages
  const pages: Array<RouteObject> = router.pages.map(
    (p: PageComponent | RouteNode) => {
      // Check if the page is coming from file-based routing system
      if ('source' in p) {
        const pageNode = p as RouteNode;

        // /home => home
        // / => /
        const pagePathFormated =
          pageNode.path.startsWith('/') && pageNode.path !== '/'
            ? pageNode.path.slice(1)
            : pageNode.path;

        // Get the path of the page
        const path =
          pageNode.path === '/'
            ? layoutPath
            : layoutPath.length > 1
              ? pagePathFormated
              : pageNode.path;

        return {
          path: path === layoutPath ? undefined : path,
          index: path === layoutPath,
          async lazy() {
            let Page = (await pageNode.module()).default as PageComponent;

            if (!Page) {
              console.warn(
                `Page component is not exported by default from: ${pageNode.source}}`
              );

              return {
                Component() {
                  return null;
                },
              };
            }

            // Detech if the page is a MDXPageComponent or not
            if (isMDXPage(Page)) {
              // Convert PageComponent to MDXPageComponent (to make ts happy)
              const mdxPage = Page as unknown as MDXPageComponent;

              // mdxPage.metadata.path = node.path;
              // mdxPage.metadata.metadata = Page.metadata;

              Page = await convertMDXPageToPageComponent(mdxPage);
            }

            return {
              Component() {
                // Default data
                const defaultData = {
                  props: {
                    params: {},
                  },
                };

                const loaderData =
                  (useLoaderData() as LoaderResponse) || defaultData;

                return (
                  // <Suspense fallback={<>Loading</>}>
                  <RasenganPageComponent page={Page} data={loaderData} />
                  // </Suspense>
                );
              },

              async loader({ params, request }) {
                // Extracting metadata from the page
                const metadata: Metadata = {
                  openGraph: {
                    url: '',
                    image: '',
                  },
                  twitter: {
                    card: 'summary_large_image',
                    image: '',
                    title: '',
                  },
                  ...Page.metadata,
                };

                return createLoaderFunction({
                  loader: Page.loader,
                  metadata,
                  source: pageNode.source,
                })({
                  params,
                  request,
                });
              },
            };
          },
          errorElement: <ErrorBoundary />,
          hydrateFallbackElement: <></>,
          // hydrateFallbackElement: <>Loading...</>,
          shouldRevalidate: ({
            currentUrl,
            nextUrl,
            defaultShouldRevalidate,
          }) => {
            // Only revalidate if navigating to a different route
            return currentUrl.pathname !== nextUrl.pathname;
          },
        };
      } else {
        const Page = p as PageComponent;

        // /home => home
        // / => /
        const pagePathFormated =
          Page.path.startsWith('/') && Page.path !== '/'
            ? Page.path.slice(1)
            : Page.path;

        // Get the path of the page
        const path =
          Page.path === '/'
            ? layoutPath
            : layoutPath.length > 1
              ? pagePathFormated
              : Page.path;

        return {
          path: path === layoutPath ? undefined : path,
          index: path === layoutPath,
          async loader({ params, request }) {
            // Extracting metadata from the page
            const metadata: Metadata = {
              openGraph: {
                url: '',
                image: '',
              },
              twitter: {
                card: 'summary_large_image',
                image: '',
                title: '',
              },
              ...Page.metadata,
            };

            return createLoaderFunction({
              loader: Page.loader,
              metadata,
            })({
              params,
              request,
            });
          },
          Component() {
            // Default data
            const defaultData = {
              props: {
                params: {},
              },
            };

            const loaderData =
              (useLoaderData() as LoaderResponse) || defaultData;

            return (
              // <Suspense fallback={<>Loading</>}>
              <RasenganPageComponent page={Page} data={loaderData} />
              // </Suspense>
            );
          },
          errorElement: <ErrorBoundary />,
          hydrateFallbackElement: <></>,
          // hydrateFallbackElement: <>Loading...</>,
          shouldRevalidate: ({
            currentUrl,
            nextUrl,
            defaultShouldRevalidate,
          }) => {
            // Only revalidate if navigating to a different route
            return currentUrl.pathname !== nextUrl.pathname;
          },
        };
      }
    }
  );

  // Add pages into children of the current route
  pages.forEach((page) => {
    route.children.push(page);
  });

  // Loop through imported routers in order to apply the same logic like above.
  for (const importedRouter of router.routers) {
    const importedRoutes = generateRoutes(importedRouter, false, layoutPath);

    for (const importedRoute of importedRoutes) {
      if (importedRoute.nested) {
        route.children.push(importedRoute);
      } else {
        routes.push(importedRoute);
      }
    }
  }

  // Make sure to add the route at the beginning of the list
  routes.unshift(route);

  // Return the formated router
  return routes;
};

/**
 * This function receives a router component and return a mapping from path to metadata
 * @param router Represents the router component
 * @returns
 */
// export const generateMetadataMapping = (
//   router: RouterComponent,
//   isRoot = true,
//   parentLayoutPath: string | undefined = undefined
// ): Record<string, Metadata> => {
//   const metadataMapping: Record<string, Metadata> = {};

//   // Get information about the layout and the path
//   const Layout = router.layout;

//   // Set default path layout if not provided
//   if (!Layout.path) {
//     throw new Error(
//       `[rasengan] Page path is required for ${Layout.name} layout component`
//     );
//   }

//   const layoutPath = !isRoot
//     ? router.useParentLayout
//       ? parentLayoutPath +
//         (Layout.path === '/'
//           ? ''
//           : Layout.path.startsWith('/') && parentLayoutPath === '/'
//             ? Layout.path.slice(1)
//             : Layout.path)
//       : Layout.path
//     : Layout.path;

//   // Get informations about pages
//   router.pages.forEach((Page) => {
//     // Set default page path if not provided
//     if (!Page.path) {
//       throw new Error(
//         `[rasengan] Page path is required for ${Page.name} page component`
//       );
//     }

//     const pagePathFormated =
//       Page.path.startsWith('/') && Page.path !== '/' && layoutPath.endsWith('/')
//         ? Page.path.slice(1)
//         : Page.path;

//     // Get the path of the page
//     const path = Page.path === '/' ? layoutPath : layoutPath + pagePathFormated;

//     // Get metadata
//     metadataMapping[path] = {
//       openGraph: {
//         url: '',
//         image: '',
//       },
//       twitter: {
//         card: 'summary_large_image',
//         image: '',
//         title: '',
//       },
//       ...Page.metadata,
//     };
//   });

//   // Loop through imported routers in order to apply the same logic like above.
//   for (const importedRouter of router.routers) {
//     const importedMetadataMapping = generateMetadataMapping(
//       importedRouter,
//       false,
//       Layout
//     );
//     Object.assign(metadataMapping, importedMetadataMapping);

//     // Add the metadata of the imported router's pages to the metadata mapping
//     for (const [path, metadata] of Object.entries(importedMetadataMapping)) {
//       metadataMapping[path] = metadata;
//     }
//   }

//   return metadataMapping;
// };
