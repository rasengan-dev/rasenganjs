import { R as RuntimeAdapter, A as Assets, S as ServeOptions } from '../../types-C53UIsik.cjs';

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

interface WorkerdProdAdapterOptions {
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
declare class WorkerdProdAdapter implements RuntimeAdapter {
    private options;
    readonly assets: Assets;
    /**
     * The raw fetch handler, suitable for `export default { fetch }`.
     * Only available after `serve()` has been called.
     */
    fetchHandler: ((request: Request) => Promise<Response>) | null;
    constructor(options?: WorkerdProdAdapterOptions);
    /**
     * Register the Futon's fetch handler with the workerd runtime.
     *
     * In service-worker mode (default), registers a `fetch` event listener.
     * In passthrough mode, exposes the handler via `fetchHandler` property
     * for use with `export default { fetch }`.
     */
    serve(app: any, _options?: ServeOptions): Promise<void>;
    /** Unregister the fetch listener and clean up. */
    close(): void;
    private app;
    private closed;
    private boundHandler;
    /**
     * Handle a FetchEvent by delegating to the Futon.
     * Returns a 503 response if the server has been closed.
     */
    private handleEvent;
}

export { WorkerdProdAdapter, type WorkerdProdAdapterOptions };
