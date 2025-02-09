import React from "react";
import { RouterComponent } from "../routing/interfaces.js";

/**
 * Props for App component
 */
export type AppProps = {
	/**
	 * Represents the component that will be rendered
	 */
	Component: React.FC<ComponentProps>;

	/**
	 * Represents the children of the component
	 */
	children?: React.ReactNode;
};

/**
 * Props for the base Component that takes the app router
 */
export type ComponentProps = {
	router: Promise<RouterComponent>;
	children: React.ReactNode;
};
