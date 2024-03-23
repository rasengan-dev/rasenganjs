// Router Decorators

import { PageComponent } from "../core/interfaces.js";
import { RouteDecoratorProps } from "./types.js";

/**
 * Decorator that add metadata for a page.
 * @param props Object that define the necessary elements to create a router
 * @returns
 */
export function Route(props: RouteDecoratorProps) {
  return function (Component: new () => PageComponent) {
    // Handle errors
    if (!props.path)
      throw new Error("You must provide a path in the route decorator");


    // Set properties
    Component.prototype._path = props.path;
    Component.prototype._title = props.title || Component.name;
    Component.prototype._description = props.description || "";

    // Seal the class
    Object.seal(Component);
    Object.seal(Component.prototype);
  };
}
