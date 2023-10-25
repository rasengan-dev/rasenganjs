// Router Decorators

import { DefaultLayout } from "../core/interfaces.js";
import { RouterDecoratorProps } from "./types.js";

/**
 * Decorator that define a new router.
 * @param props Object that define the necessary elements to create a router
 * @returns 
 */
export function Router(props: RouterDecoratorProps) {
  return function (constructor: Function) {
    // Handle errors
    if (!props.pages) throw new Error("You must provide a list of pages in the router decorator");

    // Add values to properties

    // Define sub routers if provided or set and empty array
    constructor.prototype["_routers"] = props.imports || [];

    // Define layout if provided or set a default one.
    constructor.prototype["_layout"] = props.layout || DefaultLayout;

    // Define pages
    constructor.prototype["_pages"] = props.pages;

    Object.seal(constructor);
    Object.seal(constructor.prototype);
  };
}
