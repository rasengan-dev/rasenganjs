import type { Middleware } from '@rasenganjs/futon';
import { Controller } from '../controller/index.js';
import { ProviderDefinition, ProviderLike } from '../di/container.js';

/**
 * Declares a logical module that groups related controllers, providers,
 * and middleware under an optional URL prefix.
 *
 * Modules can import other modules to create nested hierarchies.
 */
export interface ModuleConfig {
  /**
   * URL prefix applied to all routes registered by this module's controllers.
   * @example `"/api/v1"`
   */
  prefix?: string;
  /**
   * Module-level middleware functions that run before every route
   * in this module. Applied after global middleware, before
   * controller-level and route-level middleware.
   */
  middlewares?: Middleware[];
  /** Sub-modules to import and flatten into the route tree. */
  imports?: ModuleConfig[];
  /** Controller classes to register within this module. */
  controllers?: (new (...args: any[]) => Controller)[];
  /** Providers to register in the dependency-injection container. */
  providers?: (ProviderLike | ProviderDefinition)[];
  /**
   * Open extension point for ecosystem packages (e.g. `@rasenganjs/ws`
   * registers a `gateways` key). `rasengan-server` never interprets these
   * values itself — a matching `ModulePlugin` registered via
   * `app.registerPlugin()` must claim the key, or `compile()` throws.
   * See `../plugin/index.js`.
   */
  [extensionKey: string]: unknown;
}

/**
 * Helper to define a typed module configuration object.
 *
 * @example
 * ```ts
 * export default defineModule({
 *   prefix: '/users',
 *   controllers: [UsersController],
 *   providers: [UsersService],
 *   middlewares: [auth],
 * });
 * ```
 *
 * @param config - The module configuration object.
 * @returns The same configuration object (pass-through).
 */
export function defineModule(config: ModuleConfig): ModuleConfig {
  return config;
}
