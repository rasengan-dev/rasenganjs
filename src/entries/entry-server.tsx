import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import AppRouter from "./../../../../src/app/app.router";
// @ts-ignore
import App from "./../../../../src/main";
// @ts-ignore
import Template from "./../../../../src/template";

// @ts-ignore
import { generateStaticRoutes } from "../routing/utils/index.js";
import {
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server.js";
import { Router } from "@remix-run/router";

// @ts-ignore
import config from "./../../../../rasengan.config.js";
import { Component, ErrorBoundary, Heads } from "../core/components";

import refreshScript from "./../scripts/refresh-hack.js?raw";

import * as pkg from "react-helmet-async";

// @ts-ignore
const { HelmetProvider } = pkg.default || pkg;

const ABORT_DELAY = 5000;

export async function render(
  router: Router,
  context: StaticHandlerContext,
  helmetContext: any = {},
  response: any
) {
  let shellRendered = false;

  // inject vite refresh script to avoid "React refresh preamble was not loaded"
  let viteScripts = <></>;
  if (import.meta.env.DEV) {
    viteScripts = (
      <>
        <script type="module" src="/@vite/client" />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: refreshScript }}
        />
      </>
    );
  }

  return new Promise((resolve, reject) => {
    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      config.reactStrictMode ? (
        <Template Head={() => <Heads data={helmetContext}>{viteScripts}</Heads>}>
          <React.StrictMode>
            <HelmetProvider context={helmetContext}>
              <ErrorBoundary>
                <App Component={Component}>
                  <StaticRouterProvider router={router} context={context} />
                </App>
              </ErrorBoundary>
            </HelmetProvider>
          </React.StrictMode>
        </Template>
      ) : (
        <Template Head={() => <Heads data={helmetContext}>{viteScripts}</Heads>}>
          <HelmetProvider context={helmetContext}>
            <ErrorBoundary>
              <App Component={Component}>
                <StaticRouterProvider router={router} context={context} />
              </App>
            </ErrorBoundary>
          </HelmetProvider>
        </Template>
      ),

      {
        onShellReady() {
          shellRendered = true;
          const headers = new Headers();

          headers.append("Content-Type", "text/html");
          headers.append("Cache-Control", "max-age=31536000");

          response.status(200);
          response.setHeaders(headers);

          resolve(response);

          pipe(response);
        },

        onShellError(error: unknown) {
          reject(error);
        },

        onError(error: unknown) {
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

export const staticRoutes = generateStaticRoutes(AppRouter);
