/**
 * @module Server — application, modules, and compilation
 *
 * The server module provides the top-level `ServerApp` that orchestrates
 * middleware, DI, and route registration into a runtime \`Futon\`.
 */

export { ServerApp } from './app.js';
export type { ServerHandle } from './app.js';
export { defineModule } from './module.js';
export type { ModuleConfig } from './module.js';
