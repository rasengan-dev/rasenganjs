/**
 * NodeDevAdapter — RuntimeAdapter for Node.js development.
 *
 * Features:
 *   - In-process HTTP server (when Application is passed directly)
 *   - Child-process spawning (nodemon-style) for `autoRestart`
 *   - File watcher with debounce + auto-restart on change
 *   - Local filesystem assets (read/write/delete/list)
 *
 * @example
 * ```ts
 * // ── In-process mode ──
 * import { Application } from "@rasenganjs/runtime";
 * import { NodeDevAdapter } from "@rasenganjs/runtime-node";
 *
 * const app = new Application();
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
  private serveResolve: (() => void) | null = null;

  // Child-process fields (nodemon-style)
  private childProcess: ChildProcess | null = null;

  constructor(private options: NodeDevAdapterOptions = {}) {
    this.watcher = new NodeWatcher();
    this.assets = new NodeAssets(options.rootDir);
  }

  async serve(app: Application | null, options?: ServeOptions): Promise<void> {
    this.serveOptions = options ?? {};

    if (!app) {
      throw new Error(
        'Application is required — provide it directly or via autoRestart.entry'
      );
    }

    this.currentApp = app;

    if (options?.watch) {
      this.setupWatcher(options);
    }

    this.startServer(app);

    if (options?.autoRestart) {
      return new Promise<void>((resolve) => {
        this.serveResolve = resolve;
      });
    }

    return this.serverHandle!.ready;
  }

  close(): void {
    this.closing = true;

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

  private currentApp: Application | null = null;
  private serveOptions: ServeOptions = {};
  private restarting = false;
  private closing = false;

  // ── In-process helpers ──────────────────────────────────────

  private startServer(app: Application): void {
    this.serverHandle = startNodeServer(app, {
      port: this.options.port,
      host: this.options.host,
    });
  }

  private async restartInProcess(): Promise<void> {
    if (this.restarting) return;
    this.restarting = true;

    try {
      this.serverHandle?.close();
      this.serverHandle = null;
      await new Promise((r) => setTimeout(r, 100));

      const entry = this.serveOptions.autoRestart!.entry;
      const cacheBuster = `?t=${Date.now()}`;
      const mod = await import(`${entry}${cacheBuster}`);
      const freshApp: Application = mod.default;
      this.currentApp = freshApp;
      this.startServer(freshApp);
    } finally {
      this.restarting = false;
    }
  }

  // ── Child-process helpers (nodemon-style) ──────────────────

  private async serveChildProcess(options: ServeOptions): Promise<void> {
    const { entry, args = [] } = options.autoRestart!;

    if (options.watch) {
      this.setupWatcher(options);
    }

    this.spawnChild(entry, args);

    return new Promise<void>((resolve) => {
      this.serveResolve = resolve;
    });
  }

  private setupWatcher(options: ServeOptions): void {
    const { path, callback, debounceMs } = options.watch!;
    const paths = Array.isArray(path) ? path : [path];
    const useProcess = options.autoRestart?.process !== false;

    const disposes = paths.map((p) =>
      this.watcher.watch(
        p,
        () => {
          callback?.();
          if (useProcess && options.autoRestart) {
            this.restartChildProcess();
          } else if (options.autoRestart) {
            this.restartInProcess();
          }
        },
        debounceMs
      )
    );
    this.disposeWatcher = () => disposes.forEach((d) => d());
  }

  private spawnChild(entry: string, args: string[]): void {
    this.childProcess = spawn('node', [entry, ...args], {
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: String(this.options.port ?? 5320),
      },
    });

    this.childProcess.on('exit', (code, signal) => {
      if (this.restarting || this.closing) return;

      // Exit code 0 with no signal means a clean voluntary shutdown
      // (e.g. the script finished without keeping the event loop alive).
      if (code !== 0 || signal !== null) {
        console.error(
          `[rasengan] child process exited unexpectedly (code=${code}, signal=${signal})`
        );
      }
    });
  }

  /** Kill a child process and wait for it to exit (force SIGKILL after 3s). */
  private killChild(child: ChildProcess): Promise<void> {
    return new Promise((resolve) => {
      const forceKill = setTimeout(() => {
        child.kill('SIGKILL');
        resolve();
      }, 3000);

      child.on('exit', () => {
        clearTimeout(forceKill);
        resolve();
      });

      child.kill('SIGTERM');
    });
  }

  private async restartChildProcess(): Promise<void> {
    if (this.restarting) return;
    this.restarting = true;

    const { entry, args = [] } = this.serveOptions.autoRestart!;

    if (this.childProcess) {
      await this.killChild(this.childProcess);
      this.childProcess = null;
    }

    this.spawnChild(entry, args);
    this.restarting = false;
  }
}
