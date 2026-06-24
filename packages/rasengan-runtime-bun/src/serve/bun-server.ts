import { Application } from '@rasenganjs/runtime';

export interface BunServerOptions {
  host?: string;
  port?: number;

  /** Called when the server starts listening. */
  onListening?: (info: { port: number; host: string }) => void;
}

export interface BunServerHandle {
  ready: Promise<void>;
  close(): void;
}

export function startBunServer(
  app: Application,
  options: BunServerOptions = {}
): BunServerHandle {
  const port = options.port ?? 5200;
  const hostname = options.host ?? '0.0.0.0';

  const server = Bun.serve({
    fetch: (request) => app.fetch(request),
    port,
    hostname,
  });

  options.onListening?.({ port: server.port, host: hostname });

  return {
    ready: Promise.resolve(),
    close: () => server.stop(),
  };
}
