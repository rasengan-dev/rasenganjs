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
 * - Defaults to **Module Worker** format: `serve(app)` builds
 *   `fetchHandler`, a `(request, env, ctx) => Promise<Response>`
 *   function meant for `export default { fetch: adapter.fetchHandler }`.
 *   `env` (bindings: D1, R2, KV, service bindings, secrets) and `ctx`
 *   (`ExecutionContext.waitUntil`/`passThroughOnException`) are both
 *   forwarded into the Futon's `RuntimeContext` on every request
 *   (RFC-0013) — read them via `ctx.runtime.env` / `ctx.runtime.executionCtx`
 *   inside handlers and middleware.
 * - Set `passthrough: false` to instead register via the legacy
 *   **Service Worker** format (`self.addEventListener('fetch', ...)`).
 *   That format predates bindings-as-arguments and workerd never
 *   passes `env` to it — `ctx.runtime.env` stays empty in this mode,
 *   only `ctx.runtime.executionCtx.waitUntil` is available (backed by
 *   `FetchEvent.waitUntil`). Use Module Worker format if the app reads
 *   any binding.
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
 * app.get("/hello", (ctx) => new Response(`Hello, DB is ${ctx.runtime.env?.DB}`));
 *
 * const adapter = new WorkerdProdAdapter();
 * await adapter.serve(app);
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
   * Expose the application's fetch handler as a module-level export
   * for the ES modules (Module Worker) format. Defaults to `true`
   * (RFC-0013) since it is the only format workerd passes bindings
   * to. Set to `false` to fall back to the legacy Service Worker
   * format (`self.addEventListener('fetch', ...)`), which never
   * receives `env` — see the class doc comment.
   */
  passthrough?: boolean;
}

export class WorkerdProdAdapter implements RuntimeAdapter {
  readonly assets: Assets;

  /**
   * The raw fetch handler, suitable for `export default { fetch }`.
   * Only available after `serve()` has been called. Matches workerd's
   * own Module Worker signature, `env` and `ctx` are forwarded into
   * the Futon's `RuntimeContext` (RFC-0013).
   */
  fetchHandler:
    | ((
        request: Request,
        env?: unknown,
        ctx?: ExecutionContext
      ) => Promise<Response>)
    | null = null;

  constructor(private options: WorkerdProdAdapterOptions = {}) {
    this.options.passthrough = this.options.passthrough ?? true;

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
    app.configureAssets(this.assets);

    await app.init();

    this.app = app;
    this.fetchHandler = (
      request: Request,
      env?: unknown,
      ctx?: ExecutionContext
    ) =>
      app.fetch(request, {
        env: (env ?? {}) as Record<string, unknown>,
        executionCtx: ctx
          ? {
              waitUntil: (promise: Promise<unknown>) => ctx.waitUntil(promise),
              passThroughOnException: () => ctx.passThroughOnException(),
            }
          : undefined,
      });

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
   *
   * Service Worker format has no `env` argument to forward (see the
   * class doc comment) — only `executionCtx.waitUntil` is wired here,
   * backed by `FetchEvent.waitUntil`.
   */
  private async handleEvent(event: FetchEvent): Promise<Response> {
    if (this.closed || !this.app) {
      return new Response('Server closed', { status: 503 });
    }
    return this.app.fetch(event.request, {
      executionCtx: {
        waitUntil: (promise: Promise<unknown>) =>
          event.waitUntil(promise.then(() => undefined)),
      },
    });
  }
}
