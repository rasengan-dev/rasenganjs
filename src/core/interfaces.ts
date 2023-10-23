/**
 * Layout component that represents a layout
 */
abstract class LayoutComponent {
  /**
   *
   * Page path
   */
  protected _path!: string;

  /**
   * Render method which is a React component
   * @param props - props for the component
   */
  abstract render(props?: any): React.ReactNode;

  // Getters

  /**
   * Get page path
   */
  get path(): string {
    return this._path;
  }
}

/**
 * Page component that extends LayoutComponent and represents a page
 */
abstract class PageComponent extends LayoutComponent {
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

  // Definition of abstract methods for SSR

  // abstract getInitialProps(): Promise<any>;
}

export { LayoutComponent, PageComponent };
