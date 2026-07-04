/**
 * NodeDevAdapter — RuntimeAdapter for Node.js development.
 *
 * Features:
 *   - In-process HTTP server (when a Futon instance is passed directly)
 *   - Child-process spawning (nodemon-style) for `autoRestart`
 *   - File watcher with debounce + auto-restart on change
 *   - Local filesystem assets (read/write/delete/list)
 *
 * @example
 * ```ts
 * // ── In-process mode ──
 * import { Futon } from "@rasenganjs/runtime";
 * import { NodeDevAdapter } from "@rasenganjs/runtime-node";
 *
 * const app = new Futon();
 * app.get("/hello", (ctx) => new Response("Hello!"));
 *
 * const adapter = new NodeDevAdapter({ port: 3000 });
 * await adapter.serve(app);
 *
 * // ── Child-process mode (nodemon-style) ──
 * // Your entry script creates its own server.
 * // The adapter spawns `node <entry>` and restarts it on changes.
 * await adapter.serve(null, {
 *   watch: { path: "src/" },
 *   autoRestart: { entry: "./src/dev-server.mjs" }
 * });
 * ```
 */

import { spawn, type ChildProcess } from 'node:child_process';

import type { Futon, RuntimeAdapter, ServeOptions } from '@rasenganjs/runtime';

import { NodeAssets } from './assets/node-assets.js';
import { NodeWatcher } from './watch/node-watcher.js';
import { startNodeServer, type NodeServerHandle } from './serve/node-server.js';
import { loadNodeEnvFiles } from './env/index.js';

export interface NodeDevAdapterOptions {
  port?: number;
  host?: string;
  rootDir?: string;
}

export class NodeDevAdapter implements RuntimeAdapter {
  private watcher: NodeWatcher;
  readonly assets: NodeAssets;
  private serverHandle: NodeServerHandle | null = null;
  private disposeWatcher: (() => void) | null = null;
  private serveResolve: (() => void) | null = null;

  // Child-process fields (nodemon-style)
  private childProcess: ChildProcess | null = null;

  constructor(private options: NodeDevAdapterOptions = {}) {
    this.watcher = new NodeWatcher();
    this.assets = new NodeAssets(options.rootDir);
  }

  async serve(app: Futon | null, options?: ServeOptions): Promise<void> {
    this.serveOptions = options ?? {};

    // ── In-process mode ─────────────────────────────────────
    if (!app) {
      throw new Error('Futon instance is required — provide it directly');
    }

    const rootDir = this.options.rootDir ?? process.cwd();

    app.configureServer({
      preset: 'node',
      mode: 'development',
      port: this.options.port ?? 5200,
      host: this.options.host ?? '0.0.0.0',
      rootDir,
    });

    app.loadEnv(await loadNodeEnvFiles(rootDir, 'development'));

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

  private startServer(app: Futon): void {
    this.serverHandle = startNodeServer(app, {
      port: this.options.port,
      host: this.options.host,
      onListening: this.serveOptions.onListening,
    });
  }
}
