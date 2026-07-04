var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/adapters/workerd/index.ts
var workerd_exports = {};
__export(workerd_exports, {
  WorkerdProdAdapter: () => WorkerdProdAdapter
});
module.exports = __toCommonJS(workerd_exports);

// src/adapters/workerd/prod.ts
var WorkerdProdAdapter = class {
  constructor(options = {}) {
    this.options = options;
    this.assets = {
      get: async () => null,
      load: async () => null,
      write: async () => {
      },
      delete: async () => {
      },
      list: async () => []
    };
  }
  options;
  assets;
  /**
   * The raw fetch handler, suitable for `export default { fetch }`.
   * Only available after `serve()` has been called.
   */
  fetchHandler = null;
  /**
   * Register the Application's fetch handler with the workerd runtime.
   *
   * In service-worker mode (default), registers a `fetch` event listener.
   * In passthrough mode, exposes the handler via `fetchHandler` property
   * for use with `export default { fetch }`.
   */
  async serve(app, _options) {
    app.configureServer({
      preset: "workerd",
      mode: "production",
      port: 0,
      host: "0.0.0.0",
      rootDir: process.cwd()
    });
    this.app = app;
    this.fetchHandler = (request) => app.fetch(request);
    if (this.options.passthrough) {
      return;
    }
    this.boundHandler = (event) => {
      event.respondWith(this.handleEvent(event));
    };
    self.addEventListener("fetch", this.boundHandler);
    return new Promise(() => {
    });
  }
  /** Unregister the fetch listener and clean up. */
  close() {
    if (this.boundHandler) {
      self.removeEventListener("fetch", this.boundHandler);
      this.boundHandler = null;
    }
    this.closed = true;
    this.fetchHandler = null;
    this.app = null;
  }
  // No watch() on the edge — not implemented.
  // ── private ──────────────────────────────────────────────────
  app = null;
  closed = false;
  boundHandler = null;
  /**
   * Handle a FetchEvent by delegating to the Application.
   * Returns a 503 response if the server has been closed.
   */
  async handleEvent(event) {
    if (this.closed || !this.app) {
      return new Response("Server closed", { status: 503 });
    }
    return this.app.fetch(event.request);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WorkerdProdAdapter
});
