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

    if (options?.autoRestart && options.autoRestart.process !== false) {
      if (app) {
        console.warn(
          '[rasengan] both an Application and autoRestart.entry were provided; ' +
            'ignoring entry and using in-process mode. ' +
            'Pass null as the first argument to use child-process mode.'
        );
      } else {
        return this.serveChildProcess(options);
      }
    }

    if (!app) {
      throw new Error(
        'Application is required — provide it directly or via autoRestart.entry'
      );
    }

    this.currentApp = app;

    if (options?.watch) {
      const { path, callback, debounceMs } = options.watch;
      const paths = Array.isArray(path) ? path : [path];
      const disposes = paths.map((p) =>
        this.watcher.watch(
          p,
          () => {
            callback?.();
            if (options.autoRestart) this.restartInProcess();
          },
          debounceMs
        )
      );
      this.disposeWatcher = () => disposes.forEach((d) => d());
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
    this.serverHandle = startBunServer(app, {
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
    const proc = Bun.spawn(['bun', entry, ...args], {
      stdio: ['inherit', 'inherit', 'inherit'],
      env: {
        ...process.env,
        PORT: String(this.options.port ?? 5320),
      },
    }) as BunChildSubprocess;

    this.childProcess = proc;

    proc.exited.then((code) => {
      if (this.restarting || this.closing) return;

      if (code !== 0) {
        console.error(
          `[rasengan] child process exited unexpectedly (code=${code})`
        );
      }
    });
  }

  private async killChild(child: BunChildSubprocess): Promise<void> {
    child.kill('SIGTERM');

    const forceKill = setTimeout(() => {
      child.kill('SIGKILL');
    }, 3000);

    try {
      await child.exited;
    } finally {
      clearTimeout(forceKill);
    }
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
