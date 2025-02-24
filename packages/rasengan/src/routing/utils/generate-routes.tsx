import {
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
  useParams,
} from 'react-router';
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
  MetaTag,
} from '../types.js';
import { Suspense } from 'react';

const defaultMetadata: Metadata = {
  title: 'Not Found',
  description: 'Page not found',
};

/**
 * This function receives a router component and get a formated router first
 * and then return a router.
 */
export const getRouter = (routerInstance: RouterComponent) => {
  const routes = generateRoutes(routerInstance);
  let router = createBrowserRouter(routes, {
    hydrationData: window.__staticRouterHydrationData,
  });

  return () => <RouterProvider router={router} />;
};

/**
 * This function merge the metadata, giving priority to the ones comming from loader
 */
const mergeMetaData = (
  responseMeta: Metadata | MetadataWithoutTitleAndDescription,
  meta: Metadata | MetadataWithoutTitleAndDescription
) => {
  let mergedMetaData: Metadata | MetadataWithoutTitleAndDescription = {
    metaTags: [],
    links: [],
  };

  // merge title and description
  mergedMetaData['title'] =
    (responseMeta as Metadata).title ?? (meta as Metadata).title;
  mergedMetaData['description'] =
    (responseMeta as Metadata).description ?? (meta as Metadata).description;

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
}: {
  loader?: RouteLoaderFunction;
  metadata?: Metadata | MetadataWithoutTitleAndDescription;
}): LoaderFunction => {
  return async ({ params, request }) => {
    try {
      // Check if the loader is defined
      if (!loader) {
        return {
          props: {},
          meta: metadata,
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
        meta: mergeMetaData(response.meta, metadata),
      };
    } catch (error) {
      console.error(error);

      return {
        props: {},
        meta: {},
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
      // Extract metadata from the layout
      const metadata = Layout.metadata;

      return createLoaderFunction({ loader: Layout.loader, metadata })({
        params,
        request,
      });
    },
    children: [],
    nested: router.useParentLayout,
  };

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
  const pages: Array<RouteObject> = router.pages.map((Page) => {
    const pagePathFormated =
      Page.path.startsWith('/') && Page.path !== '/'
        ? Page.path.slice(1)
        : Page.path;

    // Get the path of the page
    const path =
      Page.path === '/'
        ? Layout.path
        : Layout.path.length > 1
          ? pagePathFormated
          : Page.path;

    return {
      path,
      async loader({ params, request }) {
        // Extracting metadata from the page
        const metadata = Page.metadata;

        return createLoaderFunction({ loader: Page.loader, metadata })({
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

        const loaderData = (useLoaderData() as LoaderResponse) || defaultData;

        return (
          <Suspense fallback={<>Loading</>}>
            <RasenganPageComponent page={Page} data={loaderData} />
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

  // Loop through imported routers in order to apply the same thing.
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

  // Make sure to add the route at the beginning of the list
  routes.unshift(route);

  // Return the formated router
  return routes;
};
