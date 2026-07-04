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

// src/adapters/bun/index.ts
var bun_exports = {};
__export(bun_exports, {
  BunAssets: () => BunAssets,
  BunDevAdapter: () => BunDevAdapter,
  BunProdAdapter: () => BunProdAdapter,
  BunWatcher: () => BunWatcher,
  loadBunEnvFiles: () => loadBunEnvFiles,
  startBunServer: () => startBunServer
});
module.exports = __toCommonJS(bun_exports);

// src/adapters/bun/assets.ts
var import_promises = require("fs/promises");
var import_node_path = require("path");
var BunAssets = class {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
  }
  rootDir;
  /**
   * Read a file using `Bun.file()`.
   * Returns `null` if the file does not exist.
   */
  async get(path) {
    const fullPath = this.resolvePath(path);
    const file = Bun.file(fullPath);
    if (!await file.exists()) return null;
    const buf = await file.arrayBuffer();
    return new Uint8Array(buf);
  }
  /**
   * Read a file and decode its content as UTF-8 text.
   * Returns `null` if the file does not exist.
   */
  async load(path) {
    const fullPath = this.resolvePath(path);
    const file = Bun.file(fullPath);
    if (!await file.exists()) return null;
    return file.text();
  }
  /**
   * Write a file using `Bun.write()`.
   * Creates parent directories if they do not exist.
   */
  async write(path, data) {
    const fullPath = this.resolvePath(path);
    await (0, import_promises.mkdir)((0, import_node_path.dirname)(fullPath), { recursive: true });
    await Bun.write(fullPath, data);
  }
  /**
   * Delete a file or empty directory.
   * No-op if the path does not exist.
   */
  async delete(path) {
    const fullPath = this.resolvePath(path);
    try {
      await (0, import_promises.unlink)(fullPath);
    } catch (error) {
      if (isNotFoundError(error)) return;
      throw error;
    }
  }
  /**
   * Recursively list all files under a prefix/directory.
   * Returns paths relative to rootDir with forward slashes.
   */
  async list(prefix) {
    const fullPath = this.resolvePath(prefix);
    try {
      const stats = await (0, import_promises.stat)(fullPath);
      if (!stats.isDirectory()) return [];
    } catch (error) {
      if (isNotFoundError(error)) return [];
      throw error;
    }
    const results = [];
    await this.walk(fullPath, results);
    return results;
  }
  // ── Private helpers ────────────────────────────────────────
  /**
   * Resolve a user-provided path against rootDir with path traversal
   * protection.
   */
  resolvePath(path) {
    const cleaned = path.replace(/\\/g, "/").replace(/^\//, "");
    const resolved = (0, import_node_path.resolve)((0, import_node_path.join)(this.rootDir, cleaned));
    if (!resolved.startsWith((0, import_node_path.resolve)(this.rootDir))) {
      throw new Error(`Path traversal detected: ${path}`);
    }
    return resolved;
  }
  /**
   * Recursively walk a directory, collecting file paths relative
   * to rootDir.
   */
  async walk(dir, results) {
    let entries;
    try {
      entries = await (0, import_promises.readdir)(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = (0, import_node_path.join)(dir, entry.name);
      if (entry.isDirectory()) {
        await this.walk(full, results);
      } else if (entry.isFile()) {
        const rel = (0, import_node_path.relative)(this.rootDir, full).replace(/\\/g, "/");
        results.push(rel);
      }
    }
  }
};
function isNotFoundError(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

// src/adapters/bun/watcher.ts
var import_node_fs = require("fs");
var BunWatcher = class {
  /**
   * Watch a file or directory for changes.
   *
   * @param path       - File or directory path to watch.
   * @param callback   - Called (after debounce) when a change is detected.
   * @param debounceMs - Debounce window in milliseconds (default 100).
   * @returns A dispose function that stops the watcher.
   */
  watch(path, callback, debounceMs = 100) {
    let timer = null;
    let aborted = false;
    const watcher = (0, import_node_fs.watch)(path, { recursive: true }, () => {
      if (aborted) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (!aborted) callback();
      }, debounceMs);
    });
    return () => {
      aborted = true;
      if (timer) clearTimeout(timer);
      watcher.close();
    };
  }
};

// src/adapters/bun/server.ts
function startBunServer(handler, options = {}) {
  try {
    const port = options.port;
    const hostname = options.host ?? "0.0.0.0";
    const server = Bun.serve({
      fetch: (request) => handler(request),
      port,
      hostname
    });
    options.onListening?.({ port: server.port, host: hostname });
    return {
      ready: Promise.resolve(),
      close: () => server.stop()
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// src/env.ts
function parseEnv(text) {
  const env = {};
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const withoutExport = line.startsWith("export ") ? line.slice(7).trimStart() : line;
    const eqIdx = withoutExport.indexOf("=");
    if (eqIdx === -1) continue;
    const key = withoutExport.slice(0, eqIdx).trim();
    if (!key) continue;
    let value = withoutExport.slice(eqIdx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}
function getEnvFileNames(mode) {
  return [".env", ".env.local", `.env.${mode}`, `.env.${mode}.local`];
}

// src/adapters/bun/env.ts
async function loadBunEnvFiles(rootDir, mode) {
  const names = getEnvFileNames(mode);
  let merged = {};
  for (const name of names) {
    try {
      const file = Bun.file(`${rootDir}/${name}`);
      if (await file.exists()) {
        const text = await file.text();
        merged = { ...merged, ...parseEnv(text) };
      }
    } catch {
    }
  }
  return merged;
}

// src/adapters/bun/dev.ts
var BunDevAdapter = class {
  constructor(options = {}) {
    this.options = options;
    this.watcher = new BunWatcher();
    this.assets = new BunAssets(options.rootDir);
  }
  options;
  watcher;
  assets;
  serverHandle = null;
  disposeWatcher = null;
  serveResolve = null;
  // Child-process fields (nodemon-style)
  childProcess = null;
  /**
   * Start the Bun development server.
   *
   * Requires an Application instance (in-process mode).
   * Configures the app with Bun preset and development mode.
   */
  async serve(app, options) {
    this.serveOptions = options ?? {};
    if (!app) {
      throw new Error("Application is required \u2014 provide it directly");
    }
    const rootDir = this.options.rootDir ?? process.cwd();
    app.configureServer({
      preset: "bun",
      mode: "development",
      port: this.options.port,
      host: this.options.host,
      rootDir
    });
    app.loadEnv(await loadBunEnvFiles(rootDir, "development"));
    this.startServer(app);
    return this.serverHandle.ready;
  }
  /** Stop the server, watcher, and any child process. */
  close() {
    this.disposeWatcher?.();
    this.disposeWatcher = null;
    if (this.childProcess) {
      this.childProcess.kill("SIGTERM");
      this.childProcess = null;
    }
    this.serverHandle?.close();
    this.serverHandle = null;
    this.serveResolve?.();
    this.serveResolve = null;
  }
  /** Watch a file or directory for changes. */
  watch(path, callback) {
    return this.watcher.watch(path, callback);
  }
  // ── private ──────────────────────────────────────────────────
  serveOptions = {};
  /** Start the in-process HTTP server via Bun.serve(). */
  startServer(app) {
    this.serverHandle = startBunServer(
      (request) => app.fetch(request),
      {
        port: this.options.port,
        host: this.options.host,
        onListening: this.serveOptions.onListening
      }
    );
  }
};

// src/adapters/bun/prod.ts
var import_node_path2 = require("path");
var import_promises2 = require("fs/promises");
var BunProdAdapter = class {
  constructor(options = {}) {
    this.options = options;
    const rootDir = options.rootDir ?? process.cwd();
    this.assets = {
      get: async (path) => {
        const fullPath = resolvePath(rootDir, path);
        const file = Bun.file(fullPath);
        if (!await file.exists()) return null;
        const buf = await file.arrayBuffer();
        return new Uint8Array(buf);
      },
      load: async (path) => {
        const fullPath = resolvePath(rootDir, path);
        const file = Bun.file(fullPath);
        if (!await file.exists()) return null;
        return file.text();
      },
      write: async (_path, _data) => {
      },
      delete: async (_path) => {
      },
      list: async (prefix) => {
        const fullPath = resolvePath(rootDir, prefix);
        try {
          const s = await (0, import_promises2.stat)(fullPath);
          if (!s.isDirectory()) return [];
        } catch (error) {
          if (isNotFound(error)) return [];
          throw error;
        }
        const results = [];
        await walkDir(rootDir, fullPath, results);
        return results;
      }
    };
  }
  options;
  assets;
  serverHandle = null;
  /**
   * Start the Bun production server.
   *
   * Configures the Application with production settings, loads
   * environment files, and starts listening via Bun.serve().
   */
  async serve(app, options) {
    const rootDir = this.options.rootDir ?? process.cwd();
    app.configureServer({
      preset: "bun",
      mode: "production",
      port: this.options.port ?? 5200,
      host: this.options.host ?? "0.0.0.0",
      rootDir
    });
    app.loadEnv(await loadBunEnvFiles(rootDir, "production"));
    this.serverHandle = startBunServer(
      (request) => app.fetch(request),
      {
        port: this.options.port,
        host: this.options.host,
        onListening: options?.onListening
      }
    );
    return this.serverHandle.ready;
  }
  /** Stop the HTTP server. */
  close() {
    this.serverHandle?.close();
    this.serverHandle = null;
  }
  // No watch() in production
};
function resolvePath(root, path) {
  const cleaned = path.replace(/\\/g, "/").replace(/^\//, "");
  const resolved = (0, import_node_path2.resolve)((0, import_node_path2.join)(root, cleaned));
  if (!resolved.startsWith((0, import_node_path2.resolve)(root))) {
    throw new Error(`Path traversal detected: ${path}`);
  }
  return resolved;
}
function isNotFound(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
async function walkDir(root, dir, results) {
  let entries;
  try {
    entries = await (0, import_promises2.readdir)(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = (0, import_node_path2.join)(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(root, full, results);
    } else if (entry.isFile()) {
      results.push((0, import_node_path2.relative)(root, full).replace(/\\/g, "/"));
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BunAssets,
  BunDevAdapter,
  BunProdAdapter,
  BunWatcher,
  loadBunEnvFiles,
  startBunServer
});
