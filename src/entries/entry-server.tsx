import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import AppRouter from "./../../../../src/app/app.router";
// @ts-ignore
import App from "./../../../../src/main";

// @ts-ignore
import { generateStaticRoutes } from "../routing/utils/index.js";
import {
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server.js";
import { Router } from "@remix-run/router";

// @ts-ignore
import config from "./../../../../rasengan.config.js";
import { Component, ErrorBoundary } from "../core/components";

import * as pkg from "react-helmet-async";

// @ts-ignore
const { HelmetProvider } = pkg.default || pkg;

export function render(
  router: Router,
  context: StaticHandlerContext,
  helmetContext: any = {}
) {
  const html = ReactDOMServer.renderToString(
    config.reactStrictMode ? (
      <React.StrictMode>
        <ErrorBoundary>
          <HelmetProvider context={helmetContext}>
            <App Component={Component}>
              <StaticRouterProvider router={router} context={context} />
            </App>
          </HelmetProvider>
        </ErrorBoundary>
      </React.StrictMode>
    ) : (
      <ErrorBoundary>
        <HelmetProvider context={helmetContext}>
          <App Component={Component}>
            <StaticRouterProvider router={router} context={context} />
          </App>
        </HelmetProvider>
      </ErrorBoundary>
    )
  );
  return { html };
}

export const staticRoutes = generateStaticRoutes(AppRouter);
