import type { ModulePlugin } from '@rasenganjs/server';
import type { ConnectionCore } from './connection.js';

/**
 * Claims the `drizzleConnection` module-extension key that
 * `DrizzleModule.forRoot()` declares only when its connection source is
 * a per-request resolver (e.g. a D1 binding), see drizzle.module.ts.
 * Must be registered once, in bootstrap(), before compile() runs:
 *
 * ```ts
 * bootstrap((app) => {
 *   app.registerPlugin(createDrizzlePlugin());
 *   app.registerModule(appModule); // imports DrizzleModule.forRoot({...})
 * });
 * ```
 *
 * A static/pg-backed forRoot() never declares this key at all (see
 * drizzle.module.ts), so an app that never uses a resolver-based
 * adapter does not need to register this plugin.
 */
export function createDrizzlePlugin(): ModulePlugin {
  return {
    key: 'drizzleConnection',
    register(app, _container, _mod, value) {
      const core = value as ConnectionCore<unknown>;
      app.use(async (ctx, next) => {
        await core.resolve(ctx);
        return next();
      });
    },
  };
}
