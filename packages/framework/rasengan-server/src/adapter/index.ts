import type { RuntimeAdapter } from '@rasenganjs/runtime';

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
 * Dynamically import a runtime adapter package.
 */
async function importPkg(
  name: string
): Promise<Record<string, new (...args: any[]) => RuntimeAdapter>> {
  return import(name);
}

/**
 * Select and instantiate the appropriate `RuntimeAdapter` based on
 * the provided options and the current runtime environment.
 *
 * In development mode the adapter is auto-detected:
 * - Bun is detected via `process.versions.bun`.
 * - Falls back to `@rasenganjs/runtime-node`.
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
 * 2. Node.js (`@rasenganjs/runtime-node`)
 *
 * @throws If the Node adapter package cannot be loaded.
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
        const mod = await importPkg('@rasenganjs/runtime-bun');
        return new mod.BunDevAdapter({
          port: options.port,
          host: options.host,
        });
      } catch {
        console.error(
          `[rasengan-server] Cannot load @rasenganjs/runtime-bun adapter. ` +
            `Make sure the package is installed: \`npm install @rasenganjs/runtime-bun\``
        );
        console.log(
          '[rasengan-server] Bun runtime detected but package not installed'
        );
      }
    }
  } catch {
    console.log('[rasengan-server] Bun runtime detection failed');
  }

  try {
    const mod = await importPkg('@rasenganjs/runtime-node');
    return new mod.NodeDevAdapter({ port: options.port, host: options.host });
  } catch {
    throw new Error(
      `[rasengan-server] Cannot load @rasenganjs/runtime-node adapter. ` +
        `Make sure the package is installed: \`npm install @rasenganjs/runtime-node\``
    );
  }
}

/**
 * Load a production adapter based on the configured preset.
 *
 * - `"bun"` → `BunProdAdapter` from `@rasenganjs/runtime-bun`
 * - `"workerd"` → `WorkerdProdAdapter` from `@rasenganjs/runtime-workerd`
 * - default → `NodeProdAdapter` from `@rasenganjs/runtime-node`
 *
 * @throws If the target adapter package cannot be imported.
 */
async function loadProdAdapter(
  options: AdapterOptions
): Promise<RuntimeAdapter> {
  switch (options.preset) {
    case 'bun': {
      const mod = await importPkg('@rasenganjs/runtime-bun');
      return new mod.BunProdAdapter({
        port: options.port,
        host: options.host,
      });
    }
    case 'workerd': {
      const mod = await importPkg('@rasenganjs/runtime-workerd');
      return new mod.WorkerdProdAdapter();
    }
    default: {
      const mod = await importPkg('@rasenganjs/runtime-node');
      return new mod.NodeProdAdapter({
        port: options.port,
        host: options.host,
      });
    }
  }
}
