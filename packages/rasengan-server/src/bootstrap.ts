import type { RuntimeAdapter, ServeOptions } from '@rasenganjs/runtime';
import { ServerApp, type ServerHandle } from './server-app.js';
import { selectAdapter } from './adapter.js';
import { logServerInfo } from './utils/log-server-info.js';
import { loadConfig } from './cli/config.js';

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

  process.on('SIGTERM', () => {
    adapter.close();
    process.exit(0);
  });

  return {
    close: () => adapter.close(),
    app: serverApp,
  };
}
