import * as React from "react";
import * as ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./../../../../src/main";
// @ts-ignore
import AppRouter from "./../../../../src/pages/app.router";
import { ErrorBoundary } from "../core/components/index.js";
// @ts-ignore
import * as config from "./../../../../rasengan.config.js";
import { getRouter } from "../routing/utils/index.js";

const Router = getRouter(new AppRouter());

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  config.reactStrictMode ? (
    <React.StrictMode>
      {/* <ErrorBoundary> */}
        <Router />
      {/* </ErrorBoundary> */}
    </React.StrictMode>
  ) : (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  )
);
