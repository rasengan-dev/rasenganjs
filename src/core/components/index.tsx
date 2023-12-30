import * as React from "react";
import { ComponentProps, PageToRenderProps } from "../types.js";
import { getRouter } from "../../routing/utils/index.js";
import { Helmet } from "react-helmet";

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
const ErrorFallbackComponent = ({}: any) => {
  return <div>Something went wrong!</div>;
};