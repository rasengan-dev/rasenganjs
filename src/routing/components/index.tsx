import { Suspense } from "react";
import { useLoaderData, useRouteError } from "react-router-dom";
import { PageToRender } from "../../core/components/index.js";
import { PageComponent } from "../../core/interfaces.js";
import { LoaderResponse } from "../../core/types.js";

/**
 * Error boundary component that will be displayed if an error occurs during a routing
 * @returns
 */
export function ErrorBoundary() {
  // let error = useRouteError();

  // console.error(error);

  return <div>Dang!</div>;
}

/**
 * Component that will be displayed during a routing on the server side
 * @returns React.ReactNode
 */
export const ServerComponent = ({ page }: { page: PageComponent }) => {
  // Default data
  const data = {
    props: {},
  };

  return <PageToRender page={page} data={data} />;
};

/**
 * Component that will be displayed during a routing on the client side
 * @returns React.ReactNode
 */
export const ClientComponent = ({ page }: { page: PageComponent }) => {
  const data = useLoaderData() as LoaderResponse;

  return <PageToRender page={page} data={data} />;
};
