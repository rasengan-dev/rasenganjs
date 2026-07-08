import type { RuntimeAdapter, ServeOptions } from '@rasenganjs/runtime';
import { ServerApp, type ServerHandle } from './server/app.js';
import { selectAdapter } from './adapter/index.js';
import { logServerInfo } from './utils/log-server-info.js';
import { ConfigHolder } from './config/holder.js';
import type { RasenganServerConfig } from './config/index.js';

/**
 * Bootstrap the Rasengan server application.
 *
 * This is the recommended entry point for programmatic usage.
 * It:
 * 1. Creates a `ServerApp` instance.
 * 2. Loads configuration from `ConfigHolder` (auto-loaded from disk
 *    on first access, or pre-set by `cli.ts`).
 * 3. Invokes the user callback to register modules, middleware, etc.
 * 4. Compiles the app into a runtime \`Futon\`.
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
 * @param overrides - Optional partial config to merge on top of the
 *                    stored config (e.g. from CLI flags).
 * @returns A `ServerHandle` that can shut down the server externally.
 */
export async function bootstrap(
  callback: (app: ServerApp) => void | Promise<void>,
  overrides?: Partial<RasenganServerConfig>
): Promise<ServerHandle> {
  const serverApp = new ServerApp();

  const config = await ConfigHolder.get(overrides);

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

  const shutdown = async () => {
    await serverApp.close();
    await adapter.close();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  return {
    close: async () => {
      await serverApp.close();
      await adapter.close();
    },
    app: serverApp,
  };
}
