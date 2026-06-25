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
  try {
    const port = options.port;
    const hostname = options.host;

    const server = Bun.serve({
      fetch: (request) => app.fetch(request),
      port,
      hostname,
    });

    console.log(options);

    options.onListening?.({ port: server.port, host: hostname });

    return {
      ready: Promise.resolve(),
      close: () => server.stop(),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
