import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./../../../../src/main";
// @ts-ignore
// import AppRouter from "./../../../../src/pages/app.router";
import { Component, ErrorBoundary } from "../core/components/index.js";
// @ts-ignore
import config from "./../../../../rasengan.config.js";

import * as pkg from "react-helmet-async";

// @ts-ignore
const { HelmetProvider } = pkg.default || pkg;

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  config.reactStrictMode ? (
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <App Component={Component} />
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  ) : (
    <ErrorBoundary>
      <HelmetProvider>
        <App Component={Component} />
      </HelmetProvider>
    </ErrorBoundary>
  )
);
