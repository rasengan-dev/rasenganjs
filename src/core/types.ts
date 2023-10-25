import { RouterComponent } from "../routing/interfaces.js";
import { PageComponent } from "./interfaces.js";

/**
 * Props for App component
 */
export type AppProps = {
  Component: React.FC<{ router: any }>;
};

/**
 * Props for the base Component that takes the app router
 */
export type ComponentProps = {
  router: new () => RouterComponent;
};

export type PageToRenderProps = {
  page: PageComponent
}

/**
 * Props for component react components
 */
export type ReactComponentProps = { [key: string]: any };
