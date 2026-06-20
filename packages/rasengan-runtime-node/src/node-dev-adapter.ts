/**
 * NodeDevAdapter — RuntimeAdapter for Node.js development.
 *
 * Features:
 *   - HTTP server on configurable port/host
 *   - File watcher with debounce for HMR / auto-reload
 *   - Local filesystem assets (read/write/delete/list)
 *
 * @example
 * ```ts
 * import { Application } from "@rasenganjs/runtime";
 * import { NodeDevAdapter } from "@rasenganjs/runtime-node";
 *
 * const app = new Application();
 * app.get("/hello", (ctx) => new Response("Hello from dev!"));
 *
 * const adapter = new NodeDevAdapter({ port: 3000 });
 *
 * // With auto-starting watcher
 * await adapter.serve(app, {
 *   watch: { path: "src/", callback: () => console.log("rebuilding...") }
 * });
 * ```
 */

import { createContext } from '@rasenganjs/runtime';
import type {
  Application,
  RuntimeAdapter,
  ServeOptions,
} from '@rasenganjs/runtime';

import { NodeAssets } from './assets/node-assets.js';
import { NodeWatcher } from './watch/node-watcher.js';
import { startNodeServer, type NodeServerHandle } from './serve/node-server.js';

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

  constructor(private options: NodeDevAdapterOptions = {}) {
    this.watcher = new NodeWatcher();
    this.assets = new NodeAssets(options.rootDir);
  }

  async serve(app: Application, options?: ServeOptions): Promise<void> {
    // Start file watcher if configured
    if (options?.watch) {
      const { path, callback, debounceMs } = options.watch;
      const paths = Array.isArray(path) ? path : [path];
      const disposes = paths.map((p) =>
        this.watcher.watch(p, callback, debounceMs)
      );
      this.disposeWatcher = () => disposes.forEach((d) => d());
    }

    this.serverHandle = startNodeServer(app, {
      port: this.options.port,
      host: this.options.host,
    });

    return this.serverHandle.ready;
  }

  /** Stop the HTTP server and the file watcher. */
  close(): void {
    this.disposeWatcher?.();
    this.disposeWatcher = null;
    this.serverHandle?.close();
    this.serverHandle = null;
  }

  watch(path: string, callback: () => void): () => void {
    return this.watcher.watch(path, callback);
  }
}
