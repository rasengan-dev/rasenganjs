import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import AppRouter from "./../../../../src/pages/app.router";

// @ts-ignore
import { generateStaticRoutes } from "../routing/utils/index.js";
import {
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server.js";
import { Router } from "@remix-run/router";

// @ts-ignore
import config from "./../../../../rasengan.config.js";
import { ErrorBoundary } from "../core/components";

export function render(
  router: Router,
  context: StaticHandlerContext
) {
  const html = ReactDOMServer.renderToString(
    config.reactStrictMode ? (
      <React.StrictMode>
        <ErrorBoundary>
          <StaticRouterProvider router={router} context={context} />
        </ErrorBoundary>
      </React.StrictMode>
    ) : (
      <ErrorBoundary>
        <StaticRouterProvider router={router} context={context} />
      </ErrorBoundary>
    )
  );
  return { html };
}

export const staticRoutes = generateStaticRoutes(new AppRouter());
