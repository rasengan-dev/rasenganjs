/**
 * BunDevAdapter — RuntimeAdapter for Bun development.
 *
 * Features:
 *   - In-process HTTP server via `Bun.serve()`
 *   - Child-process spawning (nodemon-style) via `Bun.spawn()`
 *   - File watcher with debounce + auto-restart on change
 *   - Local filesystem assets (`Bun.file` / `Bun.write`)
 *
 * @example
 * ```ts
 * import { Futon } from "@rasenganjs/futon";
 * import { BunDevAdapter } from "@rasenganjs/runtime/adapters/bun";
 *
 * const app = new Futon();
 * app.get("/hello", () => new Response("Hello!"));
 *
 * const adapter = new BunDevAdapter({ port: 3000 });
 * await adapter.serve(app);
 * ```
 */

import type { RuntimeAdapter, ServeOptions } from '../../types.js';

import { BunAssets } from './assets.js';
import { BunWatcher } from './watcher.js';
import { startBunServer, type BunServerHandle } from './server.js';
import { loadBunEnvFiles } from './env.js';

/** Minimal interface for a Bun child subprocess. */
interface BunChildSubprocess {
  kill(signal?: string): void;
  readonly exited: Promise<number>;
  readonly pid: number;
}

export interface BunDevAdapterOptions {
  port?: number;
  host?: string;
  rootDir?: string;
}

export class BunDevAdapter implements RuntimeAdapter {
  private watcher: BunWatcher;
  readonly assets: BunAssets;
  private serverHandle: BunServerHandle | null = null;
  private disposeWatcher: (() => void) | null = null;
  private serveResolve: (() => void) | null = null;

  // Child-process fields (nodemon-style)
  private childProcess: BunChildSubprocess | null = null;

  constructor(private options: BunDevAdapterOptions = {}) {
    this.watcher = new BunWatcher();
    this.assets = new BunAssets(options.rootDir);
  }

  /**
   * Start the Bun development server.
   *
   * Requires an Application instance (in-process mode).
   * Configures the app with Bun preset and development mode.
   */
  async serve(app: any | null, options?: ServeOptions): Promise<void> {
    this.serveOptions = options ?? {};

    if (!app) {
      throw new Error("Futon's app is required — provide it directly");
    }

    const rootDir = this.options.rootDir ?? process.cwd();

    app.configureServer({
      preset: 'bun',
      mode: 'development',
      port: this.options.port,
      host: this.options.host,
      rootDir,
    });

    app.loadEnv(await loadBunEnvFiles(rootDir, 'development'));

    this.startServer(app);

    return this.serverHandle!.ready;
  }

  /** Stop the server, watcher, and any child process. */
  close(): void {
    this.disposeWatcher?.();
    this.disposeWatcher = null;

    if (this.childProcess) {
      this.childProcess.kill('SIGTERM');
      this.childProcess = null;
    }

    this.serverHandle?.close();
    this.serverHandle = null;
    this.serveResolve?.();
    this.serveResolve = null;
  }

  /** Watch a file or directory for changes. */
  watch(path: string, callback: () => void): () => void {
    return this.watcher.watch(path, callback);
  }

  // ── private ──────────────────────────────────────────────────

  private serveOptions: ServeOptions = {};

  /** Start the in-process HTTP server via Bun.serve(). */
  private startServer(app: any): void {
    this.serverHandle = startBunServer((request) => app.fetch(request), {
      port: this.options.port,
      host: this.options.host,
      onListening: this.serveOptions.onListening,
    });
  }
}
