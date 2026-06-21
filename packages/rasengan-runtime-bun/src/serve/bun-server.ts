import { Application } from '@rasenganjs/runtime';

export interface BunServerOptions {
  host?: string;
  port?: number;
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

  return {
    ready: Promise.resolve(),
    close: () => server.stop(),
  };
}
