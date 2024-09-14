import React from "react";
import { renderToPipeableStream } from "react-dom/server";
// @ts-ignore
import AppRouter from "./../../../../../src/app/app.router";
// @ts-ignore
import App from "./../../../../../src/main";
// @ts-ignore
import Template from "./../../../../../src/template";
import {
  Component,
  ErrorBoundary,
  Heads,
  Body,
  Scripts,
} from "../core/components/index.js";

import { Request, Response } from "express";
import { type Router } from "@remix-run/router";
import {
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server";
import { PassThrough } from "stream";
import * as HelmetAsync from "react-helmet-async";
import { createReadableStreamFromReadable } from "../server/utils";

import refreshScript from "../scripts/refresh-hack.js?raw";

// @ts-ignore
const H = HelmetAsync.default ? HelmetAsync.default : HelmetAsync;

const ABORT_DELAY = 5_000;

const RenderApp = ({
  router,
  context,
  helmetContext,
  styles,
  bootstrap,
}: {
  router: Router;
  context: StaticHandlerContext;
  helmetContext: any;
  styles: string;
  bootstrap: string;
}) => {
  // inject vite refresh script to avoid "React refresh preamble was not loaded"
  let viteScripts = <React.Fragment></React.Fragment>;

  if (process.env.NODE_ENV !== "production") {
    viteScripts = (
      <React.Fragment>
        <script type="module" src="/@vite/client" />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: refreshScript }}
        />
      </React.Fragment>
    );
  }

  return (
    <H.HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <Template
          Head={({ children }) => (
            <Heads data={helmetContext} styles={styles} bootstrap={bootstrap}>
              {viteScripts}
              {children}
            </Heads>
          )}
          Body={({ children }) => <Body asChild>{children}</Body>}
          Script={({ children }) => <Scripts bootstrap={bootstrap}>{children}</Scripts>}
        >
          <App Component={Component}>
            <StaticRouterProvider router={router} context={context} />
          </App>
        </Template>
      </ErrorBoundary>
    </H.HelmetProvider>
  );
};

export default async function renderStream(
  router: Router,
  context: StaticHandlerContext,
  helmetContext: any = {},
  bootstrap: string,
  styles: string,
  res: Response
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let responseStatusCode = 200;

    const { pipe, abort } = renderToPipeableStream(
      <RenderApp
        router={router}
        context={context}
        helmetContext={helmetContext}
        bootstrap={bootstrap}
        styles={styles}
      />,
      {
        // bootstrapModules: [bootstrap],
        onShellReady() {
          // console.log("hummm")
          shellRendered = true;
          // const body = new PassThrough();
          // const stream = createReadableStreamFromReadable(body);

          // console.log({
          //   body,
          //   stream
          // })

          res.status(200).set({
            "Content-Type": "text/html",
            "Cache-Control": "max-age=31536000",
          });

          resolve(res);

          pipe(res);
        },
        onShellError(error: unknown) {
          console.log({ error });
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
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
