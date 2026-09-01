import { Provider } from '@rasenganjs/server';
import type { ConnectionCore } from './connection.js';

let activeConnection: ConnectionCore<unknown> | null = null;

/**
 * Internal, only DrizzleModule.forRoot() calls this. Not exported from
 * index.ts. Returns the same core it was given, so forRoot() can pass
 * it on to a ModulePlugin for the lazy-source case (RFC-0014).
 */
export function __setActiveConnection(
  core: ConnectionCore<unknown>
): ConnectionCore<unknown> {
  if (activeConnection) {
    throw new Error(
      '[drizzle] DrizzleModule.forRoot() was called more than once in this process. ' +
        'DataSource holds one connection via shared module state (RFC-0006), ' +
        'a second call would silently redirect every existing DataSource ' +
        'instance to a different connection.'
    );
  }
  activeConnection = core;
  return core;
}

/**
 * Test-only escape hatch, NOT exported from index.ts, imported directly
 * from this file's relative path by drizzle-module.test.ts only. Lets
 * each test case start from a clean slate despite forRoot()'s
 * throw-on-second-call guard being a real, intentional constraint in
 * production use.
 */
export function __resetForTesting(): void {
  activeConnection = null;
}

// DO NOT rename this class or move it into a factory function. See RFC-0006:
// rasengan-server's DI resolves constructor params by matching their name
// against a provider class's runtime `.name`, and every consuming app
// imports this exact class from "@rasenganjs/drizzle" and declares
// `constructor(dataSource: DataSource)`. Guarded by drizzle-module.test.ts.
export class DataSource<TDb = unknown> extends Provider {
  get db(): TDb {
    if (!activeConnection) {
      throw new Error(
        '[drizzle] DataSource resolved before DrizzleModule.forRoot() ran, forRoot() ' +
          'must appear in a module the app registers before anything injects DataSource.'
      );
    }
    // A distinct, separate error surfaces here (via connection.ts) if
    // forRoot() DID run but its source is a per-request resolver (e.g.
    // D1) still waiting on the first request (RFC-0014), the two "not
    // ready" states are different fixes for the caller, so they get
    // different messages.
    return activeConnection.getOrThrow() as TDb;
  }

  async onDestroy(): Promise<void> {
    await activeConnection?.close();
  }
}
