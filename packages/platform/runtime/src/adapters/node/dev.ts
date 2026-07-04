/**
 * NodeDevAdapter — RuntimeAdapter for Node.js development.
 *
 * Features:
 *   - In-process HTTP server (when Futon is passed directly)
 *   - Child-process spawning (nodemon-style) for `autoRestart`
 *   - File watcher with debounce + auto-restart on change
 *   - Local filesystem assets (read/write/delete/list)
 *
 * @example
 * ```ts
 * // In-process mode
 * import { Futon } from "@rasenganjs/futon";
 * import { NodeDevAdapter } from "@rasenganjs/runtime/adapters/node";
 *
 * const app = new Futon();
 * app.get("/hello", () => new Response("Hello!"));
 *
 * const adapter = new NodeDevAdapter({ port: 3000 });
 * await adapter.serve(app);
 * ```
 */

import { spawn, type ChildProcess } from 'node:child_process';

import type { RuntimeAdapter, ServeOptions } from '../../types.js';

import { NodeAssets } from './assets.js';
import { NodeWatcher } from './watcher.js';
import { startNodeServer, type NodeServerHandle } from './server.js';
import { loadNodeEnvFiles } from './env.js';

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

  /**
   * Start the Node.js development server.
   *
   * Requires an Application instance (in-process mode).
   * When `options.autoRestart` is provided the returned promise
   * stays pending until `close()` is called.
   */
  async serve(app: any | null, options?: ServeOptions): Promise<void> {
    this.serveOptions = options ?? {};

    if (!app) {
      throw new Error("Futon's app is required — provide it directly");
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

    // In auto-restart mode the promise stays unresolved until close()
    if (options?.autoRestart) {
      return new Promise<void>((resolve) => {
        this.serveResolve = resolve;
      });
    }

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

  /** Start the in-process HTTP server. */
  private startServer(app: any): void {
    this.serverHandle = startNodeServer((request) => app.fetch(request), {
      port: this.options.port,
      host: this.options.host,
      onListening: this.serveOptions.onListening,
    });
  }
}
