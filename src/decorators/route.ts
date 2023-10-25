// Router Decorators

import { RouteDecoratorProps } from "./types.js";

/**
 * Decorator that add metadata for a page.
 * @param props Object that define the necessary elements to create a router
 * @returns
 */
export function Route(props: RouteDecoratorProps) {
  return function (constructor: Function) {
    // Handle errors
    if (!props.path)
      throw new Error("You must provide a path in the route decorator");

    // Add values to properties

    // Define path of the page
    constructor.prototype._path = props.path;

    // Define title of the page
    constructor.prototype._title =
      props.title ||
      constructor.name.charAt(0).toUpperCase() + constructor.name.slice(1);

    // Define description of the page
    constructor.prototype._description = props.description || "";

    Object.seal(constructor);
    Object.seal(constructor.prototype);
  };
}
