import { LayoutComponent, PageComponent } from "../core/interfaces.js";

/**
 * Router component that define a routing system
 */
export class RouterComponent {
  /**
   * Defines the layout applied to the Router
   */
  private _layout!: LayoutComponent;

  /**
   * Defines the list of sub routers
   */
  private _routers!: Array<RouterComponent>;

  /**
   * Defines the list of pages
   */
  private _pages!: Array<PageComponent>;

  /**
   * Defines the loader component to display when pages aren't available
   */
  private _loaderComponent!: React.FC;

  /**
   * Defines the not found component to display when pages aren't available
   */
  private _notFoundComponent!: React.FC;

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

  /**
   * Get the not found component
   */
  get notFoundComponent() {
    return this._notFoundComponent;
  }

  // Setters

  /**
   * Set the layout value
   */
  set layout(layout: LayoutComponent) {
    this._layout = layout;
  }

  /**
   * Set the list of routers
   */
  set routers(routers: Array<RouterComponent>) {
    this._routers = routers;
  }

  /**
   * Set the list of pages
   */
  set pages(pages: Array<PageComponent>) {
    this._pages = pages;
  }

  /**
   * Set the loader component
   */
  set loaderComponent(loaderComponent: React.FC) {
    this._loaderComponent = loaderComponent;
  }

  /**
   * Set the not found component
   */
  set notFoundComponent(notFoundComponent: React.FC) {
    this._notFoundComponent = notFoundComponent;
  }
}
