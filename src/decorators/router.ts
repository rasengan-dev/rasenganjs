// Router Decorators

import { RouterComponent } from "../routing/interfaces.js";
import { DefaultLayout } from "../core/interfaces.js";
import { RouterDecoratorProps } from "./types.js";
import { NotFoundPageComponent } from "../routing/components/index.js";

/**
 * Decorator that define a new router.
 * @param props Object that define the necessary elements to create a router
 * @returns 
 */
export function Router(option: RouterDecoratorProps) {
  const { imports, layout, pages, loaderComponent, notFoundComponent } = option;

  return (Component: new () => RouterComponent) => {
    // Handle errors
    if (!option.pages)
      throw new Error(
        "You must provide a list of pages in the router decorator"
      );
    
    // Set properties
    Component.prototype._routers = imports || [];
    Component.prototype._layout = layout || new DefaultLayout();
    Component.prototype._pages = pages;
    Component.prototype._loaderComponent = loaderComponent || (() => null);
    Component.prototype._notFoundComponent = notFoundComponent || NotFoundPageComponent;

    // Seal the class
    Object.seal(Component);
    Object.seal(Component.prototype);
    
    //   // Create router
    // const router = new Component();

    // // Set properties
    // router.routers = imports || [];
    // router.layout = layout || new DefaultLayout();
    // router.pages = pages;
    // router.loaderComponent = loaderComponent || (() => null);
    // router.notFoundComponent = notFoundComponent || NotFoundPageComponent;

    // return router;
  };
}
