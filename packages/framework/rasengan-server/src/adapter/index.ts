import type { RuntimeAdapter } from '@rasenganjs/runtime';

type AdapterModule = {
  NodeDevAdapter?: new (opts?: any) => RuntimeAdapter;
  BunDevAdapter?: new (opts?: any) => RuntimeAdapter;
  NodeProdAdapter?: new (opts?: any) => RuntimeAdapter;
  BunProdAdapter?: new (opts?: any) => RuntimeAdapter;
  WorkerdProdAdapter?: new (opts?: any) => RuntimeAdapter;
};

/**
 * Options passed to `selectAdapter()` to determine which runtime adapter
 * to use for serving the application.
 */
export interface AdapterOptions {
  /** Port number the server should listen on. */
  port?: number;
  /** Host address to bind to. */
  host?: string;
  /**
   * Target runtime preset.
   * - `"node"` — Node.js (default)
   * - `"bun"` — Bun
   * - `"workerd"` — Cloudflare Workers
   */
  preset?: 'node' | 'bun' | 'workerd';
  /** Whether this is a production deployment. */
  production?: boolean;
}

/**
 * Select and instantiate the appropriate `RuntimeAdapter` based on
 * the provided options and the current runtime environment.
 *
 * In development mode the adapter is auto-detected:
 * - Bun is detected via `process.versions.bun`.
 * - Falls back to Node adapter.
 *
 * In production mode the `preset` option determines the adapter.
 *
 * @param options - Adapter selection options (port, host, preset, mode).
 * @returns A configured `RuntimeAdapter` instance ready for `.serve()`.
 */
export async function selectAdapter(
  options: AdapterOptions
): Promise<RuntimeAdapter> {
  if (options.production) {
    return loadProdAdapter(options);
  }
  return detectDevAdapter(options);
}

/**
 * Detect and load the development adapter based on the runtime environment.
 *
 * Precedence:
 * 1. Bun (if `process.versions.bun` is set)
 * 2. Node.js (default)
 */
async function detectDevAdapter(
  options: AdapterOptions
): Promise<RuntimeAdapter> {
  try {
    const isBun =
      typeof process !== 'undefined' &&
      typeof (process as any).versions !== 'undefined' &&
      (process as any).versions.bun;

    if (isBun) {
      try {
        const mod: AdapterModule =
          await import('@rasenganjs/runtime/adapters/bun');
        return new mod.BunDevAdapter!({
          port: options.port,
          host: options.host,
        });
      } catch {
        console.error(
          `[rasengan-server] Cannot load Bun adapter from @rasenganjs/runtime/adapters/bun. ` +
            `Make sure @rasenganjs/runtime is installed.`
        );
      }
    }
  } catch {
    console.log('[rasengan-server] Bun runtime detection failed');
  }

  try {
    const mod: AdapterModule =
      await import('@rasenganjs/runtime/adapters/node');
    return new mod.NodeDevAdapter!({
      port: options.port,
      host: options.host,
    });
  } catch {
    throw new Error(
      `[rasengan-server] Cannot load Node adapter from @rasenganjs/runtime/adapters/node. ` +
        `Make sure @rasenganjs/runtime is installed.`
    );
  }
}

/**
 * Load a production adapter based on the configured preset.
 *
 * - `"bun"` → `BunProdAdapter`
 * - `"workerd"` → `WorkerdProdAdapter`
 * - default → `NodeProdAdapter`
 */
async function loadProdAdapter(
  options: AdapterOptions
): Promise<RuntimeAdapter> {
  switch (options.preset) {
    case 'bun': {
      const mod: AdapterModule =
        await import('@rasenganjs/runtime/adapters/bun');
      return new mod.BunProdAdapter!({
        port: options.port,
        host: options.host,
      });
    }
    case 'workerd': {
      const mod: AdapterModule =
        await import('@rasenganjs/runtime/adapters/workerd');
      return new mod.WorkerdProdAdapter!();
    }
    default: {
      const mod: AdapterModule =
        await import('@rasenganjs/runtime/adapters/node');
      return new mod.NodeProdAdapter!({
        port: options.port,
        host: options.host,
      });
    }
  }
}
