import React from "react";
import { LoaderOptions, LoaderResponse, ReactComponentProps } from "./types.js";
import { Outlet } from "react-router-dom";
import { Metadata } from "../routing/types.js";

/**
 * Layout component interface that defines the base structure of a Layout and a Page too.
 */
export interface ILayoutComponent {
  /**
   * Fonction Component that return a JSX Element for a UI
   */
  render: React.FC<ReactComponentProps>;
}

/**
 * Layout component that represents a layout
 */
export abstract class LayoutComponent implements ILayoutComponent {
  /**
   *
   * Page path
   */
  protected _path!: string;

  /**
   * Metadata
   */
  protected _metadata!: Metadata[];

  /**
   * Render method which is a React component
   * @param props - props for the component
   */
  abstract render(props?: ReactComponentProps): React.ReactNode;

  // Getters

  /**
   * Get page path
   */
  get path(): string {
    return this._path;
  }

  /**
   * Get metadata
   */
  get metadata(): Metadata[] {
    return this._metadata;
  }

  // Setters

  /**
   * Set page path
   */
  set path(path: string) {
    this._path = path;
  }

  /**
   * Set metadata
   */
  set metadata(metadata: Metadata[]) {
    this._metadata = metadata;
  }

  /**
   * Add metadata
   */
  addMetadata(metadata: Metadata[]) {
    metadata.forEach((meta) => {
      this._metadata.unshift(meta);
    });
  }

  /**
   * Loader method that will be called during a routing on the server side
   * in order to get data for the page from the server
   * @returns Promise<any>
   */
  async loader(_options: LoaderOptions): Promise<LoaderResponse> {
    return new Promise((resolve) => {
      resolve({
        props: {},
      });
    });
  }
}

/**
 * Default Layout
 */
export class DefaultLayout extends LayoutComponent {
  constructor() {
    super();

    this._path = "/";
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    );
  }
}

/**
 * Page component that extends LayoutComponent and represents a page
 */
export abstract class PageComponent extends LayoutComponent {
  /**
   * Page title
   */
  protected _title!: string;

  /**
   * Page description
   */
  protected _description!: string;

  // Getters

  /**
   * Get page title
   */
  get title(): string {
    return this._title;
  }

  /**
   * Get page description
   */
  get description(): string {
    return this._description;
  }

  // Setters

  /**
   * Set page title
   */
  set title(title: string) {
    this._title = title;
  }

  /**
   * Set page description
   */
  set description(description: string) {
    this._description = description;
  }
}
