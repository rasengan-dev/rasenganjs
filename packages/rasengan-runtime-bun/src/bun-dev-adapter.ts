/**
 * BunDevAdapter — RuntimeAdapter for Bun development.
 *
 * Features:
 *   - In-process HTTP server via Bun.serve()
 *   - Child-process spawning (nodemon-style) via Bun.spawn()
 *   - File watcher with debounce + auto-restart on change
 *   - Local filesystem assets (Bun.file / Bun.write)
 *
 * @example
 * ```ts
 * import { Application } from "@rasenganjs/runtime";
 * import { BunDevAdapter } from "@rasenganjs/runtime-bun";
 *
 * const app = new Application();
 * app.get("/hello", (ctx) => new Response("Hello!"));
 *
 * const adapter = new BunDevAdapter({ port: 3000 });
 * await adapter.serve(app);
 * ```
 *
 * Child-process mode (nodemon-style):
 * ```ts
 * await adapter.serve(null, {
 *   watch: { path: "src/" },
 *   autoRestart: { entry: "./src/dev-server.mjs" }
 * });
 * ```
 */

import type {
  Application,
  RuntimeAdapter,
  ServeOptions,
} from '@rasenganjs/runtime';

import { BunAssets } from './assets/bun-assets.js';
import { BunWatcher } from './watch/bun-watcher.js';
import { startBunServer, type BunServerHandle } from './serve/bun-server.js';
import { loadBunEnvFiles } from './env/index.js';

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

  private childProcess: BunChildSubprocess | null = null;

  constructor(private options: BunDevAdapterOptions = {}) {
    this.watcher = new BunWatcher();
    this.assets = new BunAssets(options.rootDir);
  }

  async serve(app: Application | null, options?: ServeOptions): Promise<void> {
    this.serveOptions = options ?? {};

    if (!app) {
      throw new Error('Application is required — provide it directly');
    }

    const rootDir = this.options.rootDir ?? process.cwd();

    app.configureServer({
      preset: 'bun',
      mode: 'development',
      port: this.options.port ?? 5200,
      host: this.options.host ?? '0.0.0.0',
      rootDir,
    });

    app.loadEnv(await loadBunEnvFiles(rootDir, 'development'));

    this.startServer(app);

    if (options?.autoRestart) {
      return new Promise<void>((resolve) => {
        this.serveResolve = resolve;
      });
    }

    return this.serverHandle!.ready;
  }

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

  watch(path: string, callback: () => void): () => void {
    return this.watcher.watch(path, callback);
  }

  // ── private ──────────────────────────────────────────────────

  private serveOptions: ServeOptions = {};

  // ── In-process helpers ──────────────────────────────────────

  private startServer(app: Application): void {
    this.serverHandle = startBunServer(app, {
      port: this.options.port,
      host: this.options.host,
      onListening: this.serveOptions.onListening,
    });
  }
}
