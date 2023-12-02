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
  ErrorBoundary,
  ServerComponent,
} from "../components/index.js";

/**
 * This function receive a router component and get a formated router first
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
 * This function receive a router component and return a formated router.
 */
const generateBrowserRoutes = (router: RouterComponent) => {
  // Initialization of the list of routes
  const routes = [] as any;

  // Get information about the layout and the path
  const layout = new router.layout();
  const LayoutToRender = layout.render;

  const route = {
    path: layout.path,
    elementError: <ErrorBoundary />,
    element: <LayoutToRender />,
    children: [] as unknown as any,
  };

  // Get informations about pages
  const pages = router.pages.map((pageClass) => {
    const page = new pageClass();

    // Get the path of the page
    const path = page.path === "/" ? layout.path : page.path;

    return {
      path,
      element: <ClientComponent page={page} />,
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
  for (const BesideRouter of router.routers) {
    const besideRouter = new BesideRouter();
    const besidesRoutes = generateBrowserRoutes(besideRouter);

    // Add besides routes into the lists of route
    routes.push(...besidesRoutes);
  }

  // Return the formated router
  return routes;
};

/**
 * This function receive a router component and return a formated router for static routing
 * @param router Represents the router component
 * @returns
 */
export const generateStaticRoutes = (router: RouterComponent) => {
  // Initialization of the list of routes
  const routes = [] as any;

  // Get information about the layout and the path
  const layout = new router.layout();
  const LayoutToRender = layout.render;

  const route = {
    path: layout.path,
    elementError: <ErrorBoundary />,
    element: <LayoutToRender />,
    children: [] as unknown as any,
  };

  // Get informations about pages
  const pages = router.pages.map((pageClass) => {
    const pageComponent = new pageClass();

    // Get the path of the page
    const path = pageComponent.path === "/" ? layout.path : pageComponent.path;

    return {
      path,
      loader({ params, request }: any) {
        return pageComponent.loader({ params, request });
      },
      Component() {
        return <ServerComponent page={pageComponent} />;
      },
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
  for (const BesideRouter of router.routers) {
    const besideRouter = new BesideRouter();
    const besidesRoutes = generateStaticRoutes(besideRouter);

    // Add besides routes into the lists of route
    routes.push(...besidesRoutes);
  }

  // Return the formated router
  return routes;
};

/**
 * This function add metadata to a page or a layout
 * @param option
 * @returns
 */
export const defineRoutePage = (option: RouteDecoratorProps) => {
  const { path, title, description } = option;

  return (Component: new () => PageComponent) => {
    if (!path) throw new Error("You must provide a path to the page");

    Component.prototype._path = path;
    Component.prototype["_title"] = title;
    Component.prototype["_description"] = description;

    return Component;
  };
};

/**
 * This function add metadata to a page or a layout
 * @param option
 * @returns
 */
export const defineRouteLayout = (option: RouteLayoutDecoratorProps) => {
  const { path } = option;

  return (Component: new () => LayoutComponent) => {
    if (!path) throw new Error("You must provide a path to the layout");

    Component.prototype._path = path;

    return Component;
  };
};

/**
 * This function add metadata to a router
 * @param option
 * @returns
 */
export const defineRouter = (option: RouterDecoratorProps) => {
  const { imports, layout, pages } = option;

  return (Component: new () => RouterComponent) => {
    // Handle errors
    if (!option.pages)
      throw new Error(
        "You must provide a list of pages in the router decorator"
      );

    // Add values to properties

    // Define sub routers if provided or set and empty array
    Component.prototype["_routers"] = imports || [];

    // Define layout if provided or set a default one.
    Component.prototype["_layout"] = layout || DefaultLayout;

    // Define pages
    Component.prototype["_pages"] = pages;

    return Component;
  };
};
