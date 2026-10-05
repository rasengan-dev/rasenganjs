// Framework-agnostic core only — no dependency on @rasenganjs/futon or
// @rasenganjs/server. Use "@rasenganjs/openapi/futon" or
// "@rasenganjs/openapi/server" for a Router-integrated DocumentedRouter.
export {
  OpenApiRegistry,
  type OpenApiRegistryOptions,
  type DocumentInfo,
  type SecurityScheme,
} from './core/registry.js';
export {
  buildRouteConfig,
  type RouteConfig,
  type RouteDoc,
  type RouteSchema,
  type HttpMethod,
} from './core/route-config.js';
export { scalarHtml, type ScalarHtmlOptions } from './core/scalar.js';
export { swaggerHtml, type SwaggerHtmlOptions } from './core/swagger.js';
