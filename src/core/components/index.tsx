import * as React from "react";
import { ComponentProps, PageToRenderProps } from "../types.js";
import { getRouter } from "../../routing/utils/index.js";
import { Helmet } from "react-helmet";

/**
 * App component that represent the entry point of the application
 */
export const Component = ({ router: AppRouter }: ComponentProps) => {
  const Router = getRouter(new AppRouter());

  return <Router />;
};

/**
 * Page component that defines title and description to a page
 */
export const PageToRender = ({ page }: PageToRenderProps) => {
  // Get the page component
  const Page = page.render;

  return (
    <React.Fragment>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Helmet>

      <Page />
    </React.Fragment>
  );
};
