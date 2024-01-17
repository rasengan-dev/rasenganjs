import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import AppRouter from "./../../../../src/pages/app.router";

// @ts-ignore
import {
  extractPageMetadata,
  generateStaticRoutes,
} from "../routing/utils/index.js";
import {
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server.js";
import { Router } from "@remix-run/router";

// @ts-ignore
import config from "./../../../../rasengan.config.js";
import { ErrorBoundary } from "../core/components";
import { HelmetProvider } from "react-helmet-async";

export function render(router: Router, context: StaticHandlerContext) {
  const html = ReactDOMServer.renderToString(
    config.reactStrictMode ? (
      <React.StrictMode>
        <ErrorBoundary>
          <HelmetProvider>
            <StaticRouterProvider router={router} context={context} />
          </HelmetProvider>
        </ErrorBoundary>
      </React.StrictMode>
    ) : (
      <ErrorBoundary>
        <HelmetProvider>
          <StaticRouterProvider router={router} context={context} />
        </HelmetProvider>
      </ErrorBoundary>
    )
  );
  return { html };
}

export const staticRoutes = generateStaticRoutes(AppRouter);
export const metadatas = extractPageMetadata(AppRouter);
