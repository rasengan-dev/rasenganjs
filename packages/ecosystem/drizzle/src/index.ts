// Core only — driver adapters are separate subpath exports
// (e.g. "@rasenganjs/drizzle/drivers/node-postgres") so importing the
// core never pulls in a specific driver's client package.
export type { ConnectResult, DrizzleAdapter } from './adapter.js';
export { DataSource } from './data-source.js';
export { DrizzleModule, type DrizzleModuleOptions } from './drizzle.module.js';
export { runMigrations } from './migrate.js';
