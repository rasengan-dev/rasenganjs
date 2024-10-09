import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./../../../../../src/main";
import { Component } from "../core/components/index.js";

ReactDOM.hydrateRoot(
	document.getElementById("root") as HTMLElement,
	<App Component={Component} StrictMode={React.StrictMode} />
);
