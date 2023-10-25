import * as React from "react";
import * as ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./../../../../src/main";
import { Component } from "../core/components/index.js";

// TODO: Load configuration file (rasengan.config.js) in order to apply the configuration

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <App Component={Component} />
  </React.StrictMode>
);
