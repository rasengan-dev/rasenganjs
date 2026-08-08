import React, { FunctionComponent } from 'react';
import { LayoutComponent, PageComponent } from './types.js';
import { RouteNode } from './utils/flat-routes.js';

/**
 * Router component that define a routing system
 */
export class RouterComponent {
  /**
   * Defines the layout applied to the Router
   */
  private _layout!: LayoutComponent | RouteNode;

  /**
   * Defines the list of sub routers
   */
  private _routers!: Array<RouterComponent>;

  /**
   * Defines the list of pages
   */
  private _pages!: Array<PageComponent | RouteNode>;

  /**
   * Defines the loader component to display when pages aren't available
   */
  private _loaderComponent!: FunctionComponent;

  /**
   * Defines the not found component to display when pages aren't available
   */
  private _notFoundComponent!: React.ReactNode | undefined;

  /**
   * Defines if the layout of the parent router must be used
   */
  private _useParentLayout!: boolean;

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
  get notFoundComponent(): React.ReactNode | undefined {
    return this._notFoundComponent;
  }

  /**
   * Get the use parent layout value
   */
  get useParentLayout() {
    return this._useParentLayout;
  }

  // Setters

  /**
   * Set the layout value
   */
  set layout(layout: LayoutComponent | RouteNode) {
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
  set pages(pages: Array<PageComponent | RouteNode>) {
    this._pages = pages;
  }

  /**
   * Set the loader component
   */
  set loaderComponent(loaderComponent: FunctionComponent) {
    this._loaderComponent = loaderComponent;
  }

  /**
   * Set the not found component
   */
  set notFoundComponent(NotFoundComponent: FunctionComponent | undefined) {
    this._notFoundComponent = NotFoundComponent ? (
      <NotFoundComponent />
    ) : undefined;
  }

  /**
   * Set the use parent layout value
   */
  set useParentLayout(useParentLayout: boolean) {
    this._useParentLayout = useParentLayout;
  }
}
