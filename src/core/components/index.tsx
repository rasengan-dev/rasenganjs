import * as React from "react";
import {
  ComponentProps,
  HelmetContext,
  LayoutComponent,
  PageToRenderProps,
} from "../types.js";
import { generateMetadata, getRouter } from "../../routing/utils/index.js";
import * as pkg from "react-helmet-async";
import { Outlet } from "react-router-dom";

import refreshScript from "../../scripts/refresh-hack.js?raw";

// @ts-ignore
const { Helmet } = pkg.default || pkg;

/**
 * App component that represent the entry point of the application
 */
export const Component = ({
  router: AppRouter,
  children = undefined,
}: ComponentProps) => {
  // Return children if they exist
  if (children) return children;

  let Router: any = null;

  // Otherwise, get the router and return it
  Router = getRouter(AppRouter);

  return <Router />;
};

/**
 * Page component that defines title and description to a page
 */
export const PageToRender = ({ page: Page, data }: PageToRenderProps) => {
  // Get the page props
  const props = data.props || {};

  // Generate meta tags
  const metaTags = React.useMemo(() => {
    if (!Page.metadata) return [];

    return generateMetadata([Page.metadata]);
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        {metaTags.map((meta) => meta)}

        <meta name="description" content={Page.metadata?.description || ""} />
        <title>{Page.metadata?.title || Page.name}</title>
      </Helmet>

      <Page {...props} />
    </React.Fragment>
  );
};

/**
 * Error fallback component that will be displayed if an error occurs
 */
export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, info: null };

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    const { error, info } = this.state;

    if (this.state.hasError) {
      return <ErrorFallbackComponent error={error} info={info} />;
    }

    // @ts-ignore
    return this.props.children;
  }
}

/**
 * Error fallback component that will be displayed if an error occurs
 */
const ErrorFallbackComponent = ({ error, info }: any) => {
  return (
    <div
      style={{
        width: "calc(100% - 80px)",
        height: "calc(100vh - 80px)",
        padding: "40px",
        backgroundColor: "#fff",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem" }}>Something went wrong</h1>
        <p>{error.toString()}</p>

        <div
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 10,
            padding: "20px",
            marginTop: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <p>{info.componentStack}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Head component
 * @params data - Helmet context
 * @returns 
 */
export const Heads = ({ data, children }: { data: HelmetContext, children: React.ReactNode }) => {
  if (!data) return null;

  return (
    <React.Fragment>
      {children}

      {data.helmet && data.helmet.meta.toComponent({})}
      {data.helmet && data.helmet.title.toComponent({})}
    </React.Fragment>
  );
};

/**
 * Body component
 */
export const Body = ({ children }: { children: React.ReactNode }) => {
  return <div id="root">{children}</div>
}

/**
 * Scripts component
 */
export const Scripts = () => {
  return (
    <React.Fragment>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<b>Enable JavaScript to run this app.</b>`,
        }}
      />

      <script
        type="module"
        src="/node_modules/rasengan/lib/entries/entry-client.js"
        defer
      ></script>
    </React.Fragment>
  );
};

/**
 * Default layout component
 */
const DefaultLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};
DefaultLayout.path = "/";

export { DefaultLayout };
