import React from "react";
import { RouterComponent } from "../routing/interfaces.js";
import { Metadata } from "../routing/index.js";


/**
 * Props for App component
 */
export type AppProps = {
  Component: React.FC<ComponentProps>;
  children: React.ReactNode;
};

/**
 * Props for the base Component that takes the app router
 */
export type ComponentProps = {
  router: RouterComponent;
  children: React.ReactNode;
};

export type PageToRenderProps = {
  page: PageComponent;
  data: LoaderResponse;
};

/**
 * Props for component react components
 */
export type ReactComponentProps = { [key: string]: any };

/**
 * Options for the loader function that loads data for a page from the server
 */
export type LoaderOptions = {
  params: { [key: string]: any };
  request: Request;
};

/**
 * Data returned from the loader function
 */
export type LoaderResponse = {
  props?: { [key: string]: any };
  redirect?: string
};

/**
 * Page component that extends LayoutComponent and represents a page
 */
export type PageComponent = React.FC<ReactComponentProps> & {
  /**
   * Base path for the page
   */
  path: string;
  
  /**
   * Metadata for the page 
   */
  metadata?: Metadata,

  /**
   * Loader function that loads data for the page from the server
   */
  loader?: (options: LoaderOptions) => Promise<LoaderResponse>;
};

/**
 * Layout component that represents a layout
 */
export type LayoutComponent = PageComponent & {
   /**
   * Metadata for the page omit title
   */
   metadata?: Omit<Metadata, "title">,
}