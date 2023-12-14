import { LayoutComponent, PageComponent } from "../core/interfaces.js";
import { RouterComponent } from "../routing/interfaces.js";

/**
 * Props for Router Decorators
 */
export type RouterDecoratorProps = {
  /**
   * Usefull to collect sub routers
   */
  imports?: Array<new () => RouterComponent>;

  /**
   * Usefull to define a layout
   */
  layout?: new () => LayoutComponent;

  /**
   * Usefull to collect pages
   */
  pages: Array<new () => PageComponent>;

  /**
   * Usefull to display a screen that let know to the user that the page is loading.
   */
  loaderComponent?: React.FC;
};

export type RouteDecoratorProps = RouteLayoutDecoratorProps & {
  /**
   * Title of the page
   */
  title?: string;

  /**
   * Description of the page
   */
  description?: string;
};

/**
 * Props for Layout Decorators
 */
export type RouteLayoutDecoratorProps = {
  /**
   * base path of the layout
   */
  path: string;
};
