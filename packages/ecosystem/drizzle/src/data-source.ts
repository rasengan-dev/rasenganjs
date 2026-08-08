import { Provider } from '@rasenganjs/server';
import type { ConnectResult } from './adapter.js';

let activeConnection: ConnectResult<unknown> | null = null;

/** Internal — only DrizzleModule.forRoot() calls this. Not exported from index.ts. */
export function __setActiveConnection(conn: ConnectResult<unknown>): void {
  if (activeConnection) {
    throw new Error(
      '[drizzle] DrizzleModule.forRoot() was called more than once in this process. ' +
        'DataSource holds one connection via shared module state (RFC-0006) ' +
        '— a second call would silently redirect every existing DataSource ' +
        'instance to a different connection.'
    );
  }
  activeConnection = conn;
}

/**
 * Test-only escape hatch — NOT exported from index.ts, imported directly
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
        '[drizzle] DataSource resolved before DrizzleModule.forRoot() ran — forRoot() ' +
          'must appear in a module the app registers before anything injects DataSource.'
      );
    }
    return activeConnection.db as TDb;
  }

  async onDestroy(): Promise<void> {
    await activeConnection?.close();
  }
}
