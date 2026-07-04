import type { RuntimeAdapter, ServeOptions } from '@rasenganjs/runtime';
import { ServerApp, type ServerHandle } from './server/app.js';
import { selectAdapter } from './adapter/index.js';
import { logServerInfo } from './utils/log-server-info.js';
import { loadConfig } from './cli/config.js';

/**
 * Bootstrap the Rasengan server application.
 *
 * This is the recommended entry point for programmatic usage.
 * It:
 * 1. Creates a `ServerApp` instance.
 * 2. Loads configuration from `rasengan.server.js`/`.ts`.
 * 3. Invokes the user callback to register modules, middleware, etc.
 * 4. Compiles the app into a runtime `Application`.
 * 5. Selects and starts the appropriate runtime adapter (Node/Bun).
 * 6. Sets up a `SIGTERM` handler for graceful shutdown.
 *
 * @example
 * ```ts
 * import { bootstrap } from 'rasengan-server';
 *
 * bootstrap((app) => {
 *   app.registerModule(myModule);
 * });
 * ```
 *
 * @param callback - Function that receives the `ServerApp` instance for
 *                   configuration before the server starts.
 * @returns A `ServerHandle` that can shut down the server externally.
 */
export async function bootstrap(
  callback: (app: ServerApp) => void | Promise<void>
): Promise<ServerHandle> {
  const serverApp = new ServerApp();

  const config = await loadConfig();

  await callback(serverApp);

  const runtimeApp = serverApp.compile();

  const adapter: RuntimeAdapter = await selectAdapter(config);

  const serveOptions: ServeOptions = {
    onListening: (info) => {
      logServerInfo(info.port, info.host);
    },
  };

  adapter.serve(runtimeApp, serveOptions).catch((err: Error) => {
    console.error(`\n  [rasengan-server] ${err.message}\n`);
    process.exit(1);
  });

  // adapter.fet

  process.on('SIGTERM', () => {
    adapter.close();
    process.exit(0);
  });

  return {
    close: () => adapter.close(),
    app: serverApp,
  };
}
