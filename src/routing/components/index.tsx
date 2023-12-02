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
  let error = useRouteError();

  console.error(error);

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageToRender page={page} data={data} />
    </Suspense>
  );
};

/**
 * Component that will be displayed during a routing on the client side
 * @returns React.ReactNode
 */
export const ClientComponent = ({ page }: { page: PageComponent }) => {
  // Default data
  const defaultData = {
    props: {},
  };

  const data = (useLoaderData() as LoaderResponse) || defaultData;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageToRender page={page} data={data} />
    </Suspense>
  );
};
