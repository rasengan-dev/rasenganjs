import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import App from "./../../../../src/main";

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  return { html };
}
