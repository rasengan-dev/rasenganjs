import { RouterComponent } from "../interfaces.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  RouteDecoratorProps,
  RouteLayoutDecoratorProps,
  RouterDecoratorProps,
} from "../../decorators/types.js";
import { DefaultLayout, LayoutComponent, PageComponent } from "../../index.js";
import {
  ClientComponent,
  NotFoundComponentContainer,
  NotFoundPageComponent,
  ServerComponent,
} from "../components/index.js";
import { ErrorBoundary } from "../../core/components/index.js";

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
  const layout = router.layout;
  const LayoutToRender = layout.render;

  const route = {
    path: layout.path,
    elementError: <ErrorBoundary />,
    element: <LayoutToRender />,
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
  const pages = router.pages.map((page) => {
    // Get the path of the page
    const path = page.path === "/" ? layout.path : page.path;

    return {
      path,
      loader: async ({ params, request }: any) => {
        // Get the response from the loader
        const response = await page.loader({ params, request });

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
      },
      element: (
        <ClientComponent page={page} loader={router.loaderComponent({})} />
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
  const layout = router.layout;
  const LayoutToRender = layout.render;

  const route = {
    path: layout.path,
    elementError: <ErrorBoundary />,
    element: <LayoutToRender />,
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
  const pages = router.pages.map((page) => {
    // Get the path of the page
    const path = page.path === "/" ? layout.path : page.path;

    return {
      path,
      async loader({ params, request }: any) {
        // Get the response from the loader
        const response = await page.loader({ params, request });

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
      },
      Component() {
        return <ServerComponent page={page} />;
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
 * This function receives a router component and extract all metadatas of all pages
 * and put all of them inside a map function in order to be used to enhance ssr
 */
export const extractPageMetadata = (router: RouterComponent) => {
  // Initialisation of the Map of metadata
  const metadatas = new Map<string, { title: string; description: string }>();

  // Get base url
  const baseURL = router.layout.path;

  // Get informations about pages of the main router
  router.pages.forEach((page) => {
    // Get the path of the page
    const path = page.path === "/" ? baseURL : baseURL + page.path;

    // Add metadata
    metadatas.set(path, {
      title: page.title,
      description: page.description,
    });
  });

  // Loop through the others routers recursively
  for (let besidesRouter of router.routers) {
    const data = extractPageMetadata(besidesRouter);

    // Copy metadata from data to metadatas map
    data.forEach((value, key) => {
      metadatas.set(key, value);
    });
  }

  return metadatas;
};

/**
 * This function adds metadata to a page or a layout
 * @param option
 * @returns
 */
export const defineRoutePage = (option: RouteDecoratorProps) => {
  const { path, title, description } = option;

  return (Component: new () => PageComponent) => {
    if (!path) throw new Error("You must provide a path to the page");

    // Create a new instance of the component
    const component = new Component();

    // Set properties
    component.path = path;
    component.title = title || Component.name;
    component.description = description || "";

    return component;
  };
};

/**
 * This function adds metadata to a page or a layout
 * @param option
 * @returns
 */
export const defineRouteLayout = (option: RouteLayoutDecoratorProps) => {
  const { path } = option;

  return (Component: new () => LayoutComponent) => {
    if (!path) throw new Error("You must provide a path to the layout");

    // Create a new instance of the component
    const component = new Component();

    // Set properties
    component.path = path;

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

    // Set properties
    router.routers = imports || [];
    router.layout = layout || new DefaultLayout();
    router.pages = pages;
    router.loaderComponent = loaderComponent || (() => null);
    router.notFoundComponent = notFoundComponent || NotFoundPageComponent;

    return router;
  };
};
