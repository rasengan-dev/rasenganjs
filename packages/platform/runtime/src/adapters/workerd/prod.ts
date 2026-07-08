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
 * - `serve(app)` registers the Futon's fetch handler via
 *   `self.addEventListener('fetch', ...)`, the standard service-worker
 *   pattern supported by workerd.
 * - Assets are **no-ops** — workerd has no local filesystem at runtime.
 *   To serve static assets, use Workers KV, R2, or a build-time upload.
 * - `watch()` is **not implemented** — no file watcher in production
 *   on the edge.
 *
 * @example
 * ```ts
 * import { Futon } from "@rasenganjs/futon";
 * import { WorkerdProdAdapter } from "@rasenganjs/runtime/adapters/workerd";
 *
 * const app = new Futon();
 * app.get("/hello", () => new Response("Hello from the edge!"));
 *
 * const adapter = new WorkerdProdAdapter();
 * adapter.serve(app);
 * ```
 *
 * ES modules format (workers.dev / custom build):
 * ```ts
 * import { WorkerdProdAdapter } from "@rasenganjs/runtime/adapters/workerd";
 * import app from "./app";
 *
 * const adapter = new WorkerdProdAdapter({ passthrough: true });
 * export default { fetch: adapter.fetchHandler };
 * ```
 */

import type { RuntimeAdapter, ServeOptions, Assets } from '../../types.js';

export interface WorkerdProdAdapterOptions {
  /** Port (ignored by workerd — exists for type compatibility with other adapters). */
  port?: number;
  /** Host (ignored by workerd — exists for type compatibility). */
  host?: string;
  /**
   * Pass the application's fetch handler as a module-level export
   * for the ES modules format.  When `false` (default), the adapter
   * registers via `self.addEventListener('fetch', ...)` instead.
   */
  passthrough?: boolean;
}

export class WorkerdProdAdapter implements RuntimeAdapter {
  readonly assets: Assets;

  /**
   * The raw fetch handler, suitable for `export default { fetch }`.
   * Only available after `serve()` has been called.
   */
  fetchHandler: ((request: Request) => Promise<Response>) | null = null;

  constructor(private options: WorkerdProdAdapterOptions = {}) {
    // workerd has no local filesystem at runtime.
    // Assets can be served via KV / R2 / D1 at the Futon layer.
    this.assets = {
      get: async () => null,
      load: async () => null,
      write: async () => {},
      delete: async () => {},
      list: async () => [],
    };
  }

  /**
   * Register the Futon's fetch handler with the workerd runtime.
   *
   * In service-worker mode (default), registers a `fetch` event listener.
   * In passthrough mode, exposes the handler via `fetchHandler` property
   * for use with `export default { fetch }`.
   */
  async serve(app: any, _options?: ServeOptions): Promise<void> {
    app.configureServer({
      preset: 'workerd',
      mode: 'production',
      port: 0,
      host: '0.0.0.0',
      rootDir: process.cwd(),
    });

    await app.init();

    this.app = app;
    this.fetchHandler = (request: Request) => app.fetch(request);

    if (this.options.passthrough) {
      // Caller will export fetchHandler manually via `export default`.
      // Return immediately — they use it as a module default export.
      return;
    }

    // Register the fetch listener (service worker format).
    this.boundHandler = (event: FetchEvent) => {
      event.respondWith(this.handleEvent(event));
    };
    self.addEventListener('fetch', this.boundHandler);

    // workerd keeps the event loop alive — this promise never settles.
    return new Promise<void>(() => {});
  }

  /** Unregister the fetch listener and clean up. */
  async close(): Promise<void> {
    await this.app?.destroy();

    if (this.boundHandler) {
      self.removeEventListener('fetch', this.boundHandler);
      this.boundHandler = null;
    }

    this.closed = true;
    this.fetchHandler = null;
    this.app = null;
  }

  // No watch() on the edge — not implemented.

  // ── private ──────────────────────────────────────────────────

  private app: any | null = null;
  private closed = false;
  private boundHandler: ((event: FetchEvent) => void) | null = null;

  /**
   * Handle a FetchEvent by delegating to the Futon.
   * Returns a 503 response if the server has been closed.
   */
  private async handleEvent(event: FetchEvent): Promise<Response> {
    if (this.closed || !this.app) {
      return new Response('Server closed', { status: 503 });
    }
    return this.app.fetch(event.request);
  }
}
