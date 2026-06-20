var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  NodeAssets: () => NodeAssets,
  NodeDevAdapter: () => NodeDevAdapter,
  NodeProdAdapter: () => NodeProdAdapter,
  NodeWatcher: () => NodeWatcher,
  startNodeServer: () => startNodeServer
});
module.exports = __toCommonJS(src_exports);

// src/assets/node-assets.ts
var import_promises = require("fs/promises");
var import_node_path = require("path");
var NodeAssets = class {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
  }
  /**
   * Read a file from the local filesystem.
   * Returns `null` if the file does not exist or is a directory.
   */
  async get(path) {
    const fullPath = this.resolvePath(path);
    try {
      const stats = await (0, import_promises.stat)(fullPath);
      if (!stats.isFile()) return null;
      return await (0, import_promises.readFile)(fullPath);
    } catch (error) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }
  /**
   * Write a file to the local filesystem.
   * Creates parent directories if they do not exist.
   */
  async write(path, data) {
    const fullPath = this.resolvePath(path);
    await (0, import_promises.mkdir)((0, import_node_path.dirname)(fullPath), { recursive: true });
    await (0, import_promises.writeFile)(fullPath, data);
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
  resolvePath(path) {
    const cleaned = path.replace(/\\/g, "/").replace(/^\//, "");
    const resolved = (0, import_node_path.resolve)((0, import_node_path.join)(this.rootDir, cleaned));
    if (!resolved.startsWith((0, import_node_path.resolve)(this.rootDir))) {
      throw new Error(`Path traversal detected: ${path}`);
    }
    return resolved;
  }
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

// src/watch/node-watcher.ts
var import_node_fs = require("fs");
var NodeWatcher = class {
  /**
   * Watch a file or directory for changes.
   *
   * @param path     — File or directory path to watch
   * @param callback — Called (after debounce) when a change is detected
   * @param debounceMs — Debounce window in milliseconds (default 100)
   * @returns A dispose function that stops the watcher
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

// src/serve/node-server.ts
var import_node_http = __toESM(require("http"), 1);
function startNodeServer(app, options = {}) {
  const port = options.port ?? 5320;
  const host = options.host ?? "0.0.0.0";
  const server = import_node_http.default.createServer(async (req, res) => {
    try {
      const request = await incomingToRequest(req);
      const response = await app.fetch(request);
      const rawHeaders = {};
      if (response.headers && typeof response.headers.forEach === "function") {
        response.headers.forEach((value, key) => {
          rawHeaders[key] = value;
        });
      }
      res.writeHead(response.status, rawHeaders);
      if (response.body) {
        const reader = response.body.getReader();
        const pump = () => {
          reader.read().then(({ done, value }) => {
            if (done) return res.end();
            res.write(value);
            pump();
          });
        };
        pump();
      } else {
        res.end();
      }
    } catch (error) {
      console.error("Server error:", error);
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  });
  const ready = new Promise((resolve3, reject) => {
    server.on("error", reject);
    server.on("close", resolve3);
    server.listen(port, host);
  });
  return {
    ready,
    close: () => server.close()
  };
}
async function incomingToRequest(req) {
  const protocol = req.socket.encrypted || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
  const host = req.headers.host ?? "localhost";
  const url = `${protocol}://${host}${req.url}`;
  let body;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await new Promise((resolve3) => {
      const chunks = [];
      req.setEncoding("utf8");
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => resolve3(chunks.join("")));
    });
  }
  return new Request(url, {
    method: req.method,
    headers: Object.entries(req.headers).filter(([, v]) => v !== void 0).map(([k, v]) => [k, Array.isArray(v) ? v.join(", ") : v]),
    body: body ?? void 0
  });
}

// src/node-dev-adapter.ts
var NodeDevAdapter = class {
  constructor(options = {}) {
    this.options = options;
    this.watcher = new NodeWatcher();
    this.assets = new NodeAssets(options.rootDir);
  }
  watcher;
  assets;
  serverHandle = null;
  disposeWatcher = null;
  async serve(app, options) {
    if (options?.watch) {
      const { path, callback, debounceMs } = options.watch;
      const paths = Array.isArray(path) ? path : [path];
      const disposes = paths.map(
        (p) => this.watcher.watch(p, callback, debounceMs)
      );
      this.disposeWatcher = () => disposes.forEach((d) => d());
    }
    this.serverHandle = startNodeServer(app, {
      port: this.options.port,
      host: this.options.host
    });
    return this.serverHandle.ready;
  }
  /** Stop the HTTP server and the file watcher. */
  close() {
    this.disposeWatcher?.();
    this.disposeWatcher = null;
    this.serverHandle?.close();
    this.serverHandle = null;
  }
  watch(path, callback) {
    return this.watcher.watch(path, callback);
  }
};

// src/node-prod-adapter.ts
var import_node_path2 = require("path");
var import_promises2 = require("fs/promises");
var import_node_path3 = require("path");
var NodeProdAdapter = class {
  constructor(options = {}) {
    this.options = options;
    const rootDir = options.rootDir ?? process.cwd();
    this.assets = {
      get: async (path) => {
        const fullPath = resolvePath(rootDir, path);
        try {
          const s = await (0, import_promises2.stat)(fullPath);
          if (!s.isFile()) return null;
          return await (0, import_promises2.readFile)(fullPath);
        } catch (error) {
          if (isNotFound(error)) return null;
          throw error;
        }
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
  assets;
  serverHandle = null;
  async serve(app, _options) {
    this.serverHandle = startNodeServer(app, {
      port: this.options.port,
      host: this.options.host
    });
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
      results.push((0, import_node_path3.relative)(root, full).replace(/\\/g, "/"));
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NodeAssets,
  NodeDevAdapter,
  NodeProdAdapter,
  NodeWatcher,
  startNodeServer
});
