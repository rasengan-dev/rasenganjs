import type { RuntimeAdapter, ServeOptions } from '@rasenganjs/runtime';
import { detectRuntime } from '@rasenganjs/runtime';
import { ServerApp, type ServerHandle } from './server/app.js';
import { selectAdapter } from './adapter/index.js';
import { logServerInfo } from './utils/log-server-info.js';
import { printBuildSummary } from './utils/print-build-summary.js';
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

  const summary = serverApp.getBuildSummary();
  if (summary) printBuildSummary(summary);

  // `rasengan-server build` spawns the freshly-built entry with this flag
  // set so it can print the same summary and double as a build-validity
  // check, WITHOUT actually starting the HTTP listener. Note: `onInit()`
  // hooks still fire (compile() unconditionally starts them) — this
  // exits right after printing, so a slow onInit() (e.g. a real DB
  // connection) may be cut off mid-flight. Reusing the exact compile()
  // path both ways is the point; a full app lifecycle is not.
  if (process.env.RASENGAN_SERVER_DRY_RUN === '1') {
    process.exit(0);
  }

  const adapter: RuntimeAdapter = await selectAdapter(config);

  // The WebSocket registry (RFC-0001) is only consumed by the Node adapter
  // so far; other adapters (Bun, workerd) ignore `ServeOptions.websocket`
  // until their own upgrade-handling phase lands.
  const websocketRegistry = serverApp.getWebSocketRegistry();

  // RFC-0010: which .env* files actually exist, for the startup banner
  // below — display-only, doesn't re-load or re-apply anything (the
  // adapter's own serve() already did that). Dynamically imported, and
  // skipped only when ACTUALLY running on workerd right now (no
  // filesystem there at all) — deliberately checked via detectRuntime(),
  // not `config.preset`: `preset` is the eventual production *build*
  // target and stays 'workerd' even while `rasengan-server dev`/`start`
  // run on a real, local Node/Bun process (selectAdapter() above already
  // makes this same distinction — it only consults `preset` when
  // `config.production` is set). Gating on `config.preset` here instead
  // would silently hide the whole banner line for every workerd-targeted
  // project during local dev, even though the files are being loaded
  // correctly the entire time.
  let envFiles: string[] = [];
  if (detectRuntime() !== 'workerd') {
    const { getLoadedEnvFiles } =
      await import('@rasenganjs/runtime/adapters/node');
    const mode =
      process.env.NODE_ENV === 'production' ? 'production' : 'development';
    envFiles = await getLoadedEnvFiles(process.cwd(), mode);
  }

  const serveOptions: ServeOptions = {
    onListening: (info) => {
      logServerInfo(info.port, info.host, envFiles);
    },
    websocket:
      websocketRegistry && !websocketRegistry.isEmpty
        ? websocketRegistry
        : undefined,
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
