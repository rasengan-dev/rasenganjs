// Core only — driver adapters are separate subpath exports
// (e.g. "@rasenganjs/drizzle/drivers/node-postgres") so importing the
// core never pulls in a specific driver's client package. The
// Futon-native helper is its own subpath too ("@rasenganjs/drizzle/futon")
// so importing this core never pulls in @rasenganjs/futon either.
export type { ConnectResult, DrizzleAdapter } from './core/adapter.js';
export type { ConnectionSource } from './core/connection.js';
export { runMigrations } from './core/migrate.js';
export { DataSource } from './server/data-source.js';
export { DrizzleModule, type DrizzleModuleOptions } from './server/module.js';
export { createDrizzlePlugin } from './server/plugin.js';
