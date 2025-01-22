// Imports
import renderApp from "./entries/client/render.js";
import { defineConfig } from "./core/config/utils/define-config.js";

// Exports
export * from "./routing/index.js";
export { defineConfig, renderApp };

// Export types
export type {
	AppConfig,
	AppConfigFunction,
	AppConfigFunctionAsync,
} from "./core/config/type.js";
export type { AppProps, ComponentProps } from "./core/index.js";
