import { RouterComponent } from "../routing/interfaces.js";
import { PageComponent } from "./interfaces.js";


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
