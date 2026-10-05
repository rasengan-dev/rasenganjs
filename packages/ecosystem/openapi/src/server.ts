// Rasengan Server entry point — OpenApiModule.forRoot() + Controller/DI
// integration, built on top of the Futon-native core.
export { OpenApiModule, type OpenApiModuleOptions } from './server/module.js';
export { DocumentedRouter } from './server/documented-router.js';
export {
  OpenApiRegistry,
  type DocumentInfo,
  type SecurityScheme,
} from './core/registry.js';
