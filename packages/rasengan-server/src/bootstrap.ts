import type { RuntimeAdapter, ServeOptions } from '@rasenganjs/runtime';
import { ServerApp, type ServerHandle } from './server-app.js';
import { selectAdapter, type AdapterOptions } from './adapter.js';

export type BootstrapOptions = AdapterOptions & {
  serveOptions?: ServeOptions;
};

export async function bootstrap(
  callback: (app: ServerApp) => void | Promise<void>,
  options: BootstrapOptions = {}
): Promise<ServerHandle> {
  const serverApp = new ServerApp();

  await callback(serverApp);

  const runtimeApp = serverApp.compile();

  const adapter: RuntimeAdapter = await selectAdapter(options);

  if (options.serveOptions) {
    await adapter.serve(runtimeApp, options.serveOptions);
  } else {
    await adapter.serve(runtimeApp);
  }

  process.on('SIGTERM', () => {
    adapter.close();
    process.exit(0);
  });

  return {
    close: () => adapter.close(),
    app: serverApp,
  };
}
