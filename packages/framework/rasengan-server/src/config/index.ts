/**
 * Build output configuration for the production bundle.
 */
export interface BuildConfig {
  /**
   * Output directory path. Defaults to `"dist"`.
   */
  outDir?: string;
  /** Whether to minify the bundled output. Defaults to `true`. */
  minify?: boolean;
  /**
   * Output formats to produce.
   * - `"single-file"` — a single `server.bundle.mjs`.
   * - `"directory"` — one `.mjs` per source file, preserving structure.
   * @default ['single-file', 'directory']
   */
  formats?: Array<'single-file' | 'directory'>;
}

/**
 * Top-level configuration for a Rasengan server application.
 *
 * Consumed by the CLI and the `bootstrap()` function to determine
 * runtime behaviour (port, host, preset), build options, and file-watching.
 */
export interface RasenganServerConfig {
  /** Path to the server entry file. Defaults to `"src/main.ts"`. */
  entry?: string;
  /** Port the server listens on. Defaults to `3000`. */
  port?: number;
  /** Host address to bind to. Defaults to `"0.0.0.0"`. */
  host?: string;
  /**
   * Target runtime preset.
   * - `"node"` — Node.js (default)
   * - `"bun"` — Bun
   * - `"workerd"` — Cloudflare Workers
   */
  preset?: 'node' | 'bun' | 'workerd';
  /**
   * Directory (or directories) to watch for file changes in dev mode.
   * Defaults to `"src/"`.
   */
  watchDir?: string | string[];
  /** Build output configuration for production bundles. */
  build?: BuildConfig;
}

/**
 * Helper to define a typed server configuration object.
 *
 * Use in `rasengan.server.ts`:
 * ```ts
 * export default defineConfig({
 *   entry: 'src/main.ts',
 *   port: 4000,
 * });
 * ```
 *
 * @param config - The configuration object.
 * @returns The same configuration object (pass-through).
 */
export function defineConfig(
  config: RasenganServerConfig
): RasenganServerConfig {
  return config;
}
