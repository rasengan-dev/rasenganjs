/**
 * WorkerdProdAdapter — RuntimeAdapter for the workerd runtime
 * (Cloudflare Workers).
 *
 * This is a **production-only** adapter.  There is no dev adapter
 * because workerd has its own local dev server (`wrangler dev`,
 * `miniflare`) that handles the development loop.
 *
 * ## How it works
 *
 * - `serve(app)` registers the Application's fetch handler via
 *   `self.addEventListener('fetch', ...)`, the standard service-worker
 *   pattern supported by workerd.
 * - Assets are **no-ops** — workerd has no local filesystem at runtime.
 *   To serve static assets, use Workers KV, R2, or a build-time upload.
 * - `watch()` is **not implemented** — no file watcher in production on the edge.
 *
 * @example
 * ```ts
 * import { Application } from "@rasenganjs/runtime";
 * import { WorkerdProdAdapter } from "@rasenganjs/runtime-workerd";
 *
 * const app = new Application();
 * app.get("/hello", () => new Response("Hello from the edge!"));
 *
 * const adapter = new WorkerdProdAdapter();
 * adapter.serve(app);
 * ```
 *
 * ES modules format (workers.dev / custom build):
 * ```ts
 * import { WorkerdProdAdapter } from "@rasenganjs/runtime-workerd";
 * import app from "./app";
 *
 * const adapter = new WorkerdProdAdapter();
 * export default { fetch: adapter.fetchHandler };
 * ```
 */

import type {
  Application,
  RuntimeAdapter,
  ServeOptions,
} from '@rasenganjs/runtime';

export interface WorkerdProdAdapterOptions {
  /** Port (ignored by workerd — exists for type compatibility with other adapters) */
  port?: number;
  /** Host (ignored by workerd — exists for type compatibility) */
  host?: string;
  /**
   * Pass the application's fetch handler as a module-level export
   * for the ES modules format.  When false (default), the adapter
   * registers via `self.addEventListener('fetch', ...)` instead.
   */
  passthrough?: boolean;
}

export class WorkerdProdAdapter implements RuntimeAdapter {
  readonly assets: {
    get(path: string): Promise<Uint8Array | null>;
    load(path: string): Promise<string | null>;
    write(path: string, data: Uint8Array): Promise<void>;
    delete(path: string): Promise<void>;
    list(prefix: string): Promise<string[]>;
  };

  /**
   * The raw fetch handler, suitable for `export default { fetch }`.
   * Only available after `serve()` has been called.
   */
  fetchHandler: ((request: Request) => Promise<Response>) | null = null;

  constructor(private options: WorkerdProdAdapterOptions = {}) {
    // workerd has no local filesystem at runtime.
    // Assets can be served via KV / R2 / D1 at the Application layer.
    this.assets = {
      get: async () => null,
      load: async () => null,
      write: async () => {},
      delete: async () => {},
      list: async () => [],
    };
  }

  async serve(app: Application, _options?: ServeOptions): Promise<void> {
    app.configureServer({
      preset: 'workerd',
      mode: 'production',
      port: 0,
      host: '0.0.0.0',
      rootDir: process.cwd(),
    });

    this.app = app;
    this.fetchHandler = (request: Request) => app.fetch(request);

    if (this.options.passthrough) {
      // Caller will export fetchHandler manually via `export default`.
      // Return immediately — they use it as a module default export.
      return;
    }

    // Register the fetch listener (service worker format).
    // This works in both the traditional Workers format and the
    // ES modules format (self is available in both).
    this.boundHandler = (event: FetchEvent) => {
      event.respondWith(this.handleEvent(event));
    };
    self.addEventListener('fetch', this.boundHandler);

    // workerd keeps the event loop alive — this promise never settles.
    return new Promise<void>(() => {});
  }

  close(): void {
    if (this.boundHandler) {
      self.removeEventListener('fetch', this.boundHandler);
      this.boundHandler = null;
    }

    this.closed = true;
    this.fetchHandler = null;
    this.app = null;
  }

  // ── private ──────────────────────────────────────────────────

  private app: Application | null = null;
  private closed = false;
  private boundHandler: ((event: FetchEvent) => void) | null = null;

  private async handleEvent(event: FetchEvent): Promise<Response> {
    if (this.closed || !this.app) {
      return new Response('Server closed', { status: 503 });
    }
    return this.app.fetch(event.request);
  }
}
