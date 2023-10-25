import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
// @ts-ignore
import AppRouter from "./../../../../src/pages/app.router";

// @ts-ignore
import { generateStaticRoutes } from "../routing/utils/index.js";
import {
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server.js";
import { Router } from "@remix-run/router";

// TODO: Load configuration file (rasengan.config.js) in order to apply the configuration

export function render(
  url: string,
  router: Router,
  context: StaticHandlerContext
) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>
  );
  return { html };
}

export const staticRoutes = () => generateStaticRoutes(new AppRouter());
