import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./../../../../src/main";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
