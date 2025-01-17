// Imports
import renderApp from "./entries/client/render.js";
import { defineConfig, resolvePath } from "./core/index.js";

// Exports
export * from "./routing/index.js";
export * from "./entries/server/index.js";
export { renderApp, defineConfig, resolvePath };

// Export types
export type {
	AppConfig,
	AppConfigFunction,
	AppConfigFunctionAsync,
} from "./core/config/type.js";
export type { AppProps, ComponentProps } from "./core/index.js";
