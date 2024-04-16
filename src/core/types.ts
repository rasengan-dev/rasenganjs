import React from "react";
import { RouterComponent } from "../routing/interfaces.js";
import { Metadata } from "../routing/index.js";
import { MetadataWithoutTitleAndDescription } from "../routing/types.js";

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
  redirect?: string;
};

/**
 * Layout component that represents a layout
 */
export type LayoutComponent = React.FC<ReactComponentProps> & {
  /**
   * Base path for the page
   */
  path: string;

  /**
   * Metadata for the page
   */
  metadata?: MetadataWithoutTitleAndDescription;

  /**
   * Loader function that loads data for the page from the server
   */
  loader?: (options: LoaderOptions) => Promise<LoaderResponse>;
};

/**
 * Page component that extends LayoutComponent and represents a page
 */
export type PageComponent = LayoutComponent & {
  /**
   * Metadata for the page omit title
   */
  metadata?: Metadata;
};

/**
 * Helmet context type
 */
export type HelmetContext = {
  helmet: {
    priority: {
      toComponent: React.FC;
      toString: () => string;
    };
    base: {
      toComponent: React.FC;
      toString: () => string;
    };
    bodyAttributes: {
      toComponent: React.FC;
      toString: () => string;
    };
    htmlAttributes: {
      toComponent: React.FC;
      toString: () => string;
    };
    link: {
      toComponent: React.FC;
      toString: () => string;
    };
    meta: {
      toComponent: React.FC;
      toString: () => string;
    };
    noscript: {
      toComponent: React.FC;
      toString: () => string;
    };
    script: {
      toComponent: React.FC;
      toString: () => string;
    };
    style: {
      toComponent: React.FC;
      toString: () => string;
    };
    title: {
      toComponent: React.FC;
      toString: () => string;
    };
  };
};

/**
 * Template props
 */
export type TemplateProps = {
  children: React.ReactNode;
  Head: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Script: React.FC<{ children?: React.ReactNode }>;
};
