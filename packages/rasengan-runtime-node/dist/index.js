// src/assets/node-assets.ts
import { readFile, writeFile, mkdir, readdir, unlink, stat } from "fs/promises";
import { join, dirname, relative, resolve } from "path";
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
      const stats = await stat(fullPath);
      if (!stats.isFile()) return null;
      return await readFile(fullPath);
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
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, data);
  }
  /**
   * Delete a file or empty directory.
   * No-op if the path does not exist.
   */
  async delete(path) {
    const fullPath = this.resolvePath(path);
    try {
      await unlink(fullPath);
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
      const stats = await stat(fullPath);
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
    const resolved = resolve(join(this.rootDir, cleaned));
    if (!resolved.startsWith(resolve(this.rootDir))) {
      throw new Error(`Path traversal detected: ${path}`);
    }
    return resolved;
  }
  async walk(dir, results) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await this.walk(full, results);
      } else if (entry.isFile()) {
        const rel = relative(this.rootDir, full).replace(/\\/g, "/");
        results.push(rel);
      }
    }
  }
};
function isNotFoundError(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

// src/watch/node-watcher.ts
import { watch } from "fs";
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
    const watcher = watch(path, { recursive: true }, () => {
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
import http from "http";
function startNodeServer(app, options = {}) {
  const port = options.port ?? 5320;
  const host = options.host ?? "0.0.0.0";
  const server = http.createServer(async (req, res) => {
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
import { join as join2, resolve as resolve2 } from "path";
import { readFile as readFile2, readdir as readdir2, stat as stat2 } from "fs/promises";
import { relative as relative2 } from "path";
var NodeProdAdapter = class {
  constructor(options = {}) {
    this.options = options;
    const rootDir = options.rootDir ?? process.cwd();
    this.assets = {
      get: async (path) => {
        const fullPath = resolvePath(rootDir, path);
        try {
          const s = await stat2(fullPath);
          if (!s.isFile()) return null;
          return await readFile2(fullPath);
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
          const s = await stat2(fullPath);
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
  const resolved = resolve2(join2(root, cleaned));
  if (!resolved.startsWith(resolve2(root))) {
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
    entries = await readdir2(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join2(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(root, full, results);
    } else if (entry.isFile()) {
      results.push(relative2(root, full).replace(/\\/g, "/"));
    }
  }
}
export {
  NodeAssets,
  NodeDevAdapter,
  NodeProdAdapter,
  NodeWatcher,
  startNodeServer
};
