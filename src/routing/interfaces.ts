import { LayoutComponent, PageComponent } from "../core/interfaces.js";

/**
 * Router component that define a routing system
 */
export class RouterComponent {
  /**
   * Defines the layout applied to the Router
   */
  private _layout!: new () => LayoutComponent;

  /**
   * Defines the list of sub routers
   */
  private _routers!: Array<new () => RouterComponent>;

  /**
   * Defines the list of pages
   */
  private _pages!: Array<new () => PageComponent>;

  /**
   * Defines the loader component to display when pages aren't available
   */
  private _loaderComponent!: React.ReactNode;

  // Getters

  /**
   * Get the layout value
   */
  get layout() {
    return this._layout;
  }

  /**
   * Get the list of routers
   */
  get routers() {
    return this._routers;
  }

  /**
   * Get the list of pages
   */
  get pages() {
    return this._pages;
  }

  /**
   * Get the loader component
   */
  get loaderComponent() {
    return this._loaderComponent;
  }
}
