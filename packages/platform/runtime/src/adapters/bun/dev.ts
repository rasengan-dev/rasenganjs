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
import { Futon } from '@rasenganjs/futon';
import { createWaitUntilStub } from '../wait-until-stub.js';

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
  private app: any | null = null; // Futon instance
  private watcher: BunWatcher;
  readonly assets: BunAssets;
  private serverHandle: BunServerHandle | null = null;
  private disposeWatcher: (() => void) | null = null;
  private serveResolve: (() => void) | null = null;

  constructor(private options: BunDevAdapterOptions = {}) {
    this.watcher = new BunWatcher();
    this.assets = new BunAssets(options.rootDir);
  }

  /**
   * Start the Bun development server.
   *
   * Requires a Futon instance (in-process mode).
   * Configures the app with Bun preset and development mode.
   */
  async serve(app: Futon | null, options?: ServeOptions): Promise<void> {
    this.serveOptions = options ?? {};

    if (!app) {
      throw new Error("Futon's app is required — provide it directly");
    }

    this.app = app; // Keep reference of the Futon's app instance
    const rootDir = this.options.rootDir ?? process.cwd();

    app.configureServer({
      preset: 'bun',
      mode: 'development',
      port: this.options.port,
      host: this.options.host,
      rootDir,
    });
    app.configureAssets(this.assets);

    app.loadEnv(await loadBunEnvFiles(rootDir, 'development'));

    await app.init();

    this.startServer(app);

    return this.serverHandle!.ready;
  }

  /** Stop the server, watcher, and any child process. */
  async close(): Promise<void> {
    this.disposeWatcher?.();
    this.disposeWatcher = null;

    this.serverHandle?.close();
    this.serverHandle = null;
    this.serveResolve?.();
    this.serveResolve = null;
    this.app = null;
  }

  /** Watch a file or directory for changes. */
  watch(path: string, callback: () => void): () => void {
    return this.watcher.watch(path, callback);
  }

  // ── private ──────────────────────────────────────────────────

  private serveOptions: ServeOptions = {};

  /** Start the in-process HTTP server via Bun.serve(). */
  private startServer(app: Futon): void {
    const executionCtx = createWaitUntilStub();
    this.serverHandle = startBunServer(
      (request) => app.fetch(request, { executionCtx }),
      {
        port: this.options.port,
        host: this.options.host,
        onListening: this.serveOptions.onListening,
        websocket: this.serveOptions.websocket,
      }
    );
  }
}
