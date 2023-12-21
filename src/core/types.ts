import { CSSProperties } from "react";
import { RouterComponent } from "../routing/interfaces";
import { PageComponent } from "./interfaces";

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
  props: { [key: string]: any };
};

/**
 * Props for the Image component
 */
export type ImageProps = {
  src: string | { uri: string };
  alt: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
  style?: { [key: string]: any };
  loading?: "lazy" | "eager";
  loadingType?: "blur" | "wave";
  objectFit?: "cover" | "contain" | "fill" | "none";
  onClick?: () => void;
};
