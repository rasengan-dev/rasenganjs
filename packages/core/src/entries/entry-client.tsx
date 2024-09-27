import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./../../../../../src/main";
import { Component, ErrorBoundary } from "../core/components/index.js";
// @ts-ignore
import config from "./../../../../../rasengan.config.js";
import * as HelmetAsync from "react-helmet-async";

// @ts-ignore
const H = HelmetAsync.default ? HelmetAsync.default : HelmetAsync;

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  config.reactStrictMode ? (
    <React.StrictMode>
      <H.HelmetProvider>
        <ErrorBoundary>
          <App Component={Component} />
        </ErrorBoundary>
      </H.HelmetProvider>
    </React.StrictMode>
  ) : (
    <H.HelmetProvider>
      <ErrorBoundary>
        <App Component={Component} />
      </ErrorBoundary>
    </H.HelmetProvider>
  )
);
