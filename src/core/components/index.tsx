import * as React from "react";
import { ComponentProps, PageToRenderProps } from "../types.js";
import { getRouter } from "../../routing/utils/index.js";
import { Helmet } from "react-helmet-async";

/**
 * App component that represent the entry point of the application
 */
export const Component = ({ router: AppRouter }: ComponentProps) => {
  const Router = getRouter(AppRouter);

  return <Router />;
};

/**
 * Page component that defines title and description to a page
 */
export const PageToRender = ({ page, data }: PageToRenderProps) => {
  // Get the page component
  const Page = page.render;

  // Get the page props
  const props = data.props || {};

  return (
    <React.Fragment>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
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
  console.log({ error, info })
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
            width: "calc(100% - 40px)",
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
