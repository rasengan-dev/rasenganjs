/**
 * NodeProdAdapter — RuntimeAdapter for Node.js production.
 *
 * Features:
 *   - HTTP server on configurable port/host
 *   - Local filesystem assets (read-only: write/delete are no-ops)
 *
 * Differences from NodeDevAdapter:
 *   - No file watcher (`watch()` is undefined)
 *   - Assets write/delete are no-ops in production
 *
 * @example
 * ```ts
 * import { Application } from "@rasenganjs/futon";
 * import { NodeProdAdapter } from "@rasenganjs/runtime/adapters/node";
 *
 * const app = new Application();
 * const adapter = new NodeProdAdapter({ port: 8080, rootDir: './dist' });
 * await adapter.serve(app);
 * ```
 */

import type { RuntimeAdapter, ServeOptions, Assets } from '../../types.js';

import { startNodeServer, type NodeServerHandle } from './server.js';
import { loadNodeEnvFiles } from './env.js';
import { join, resolve, relative } from 'node:path';
import { readFile, readdir, stat } from 'node:fs/promises';
import type { Dirent } from 'node:fs';

export interface NodeProdAdapterOptions {
  port?: number;
  host?: string;
  rootDir?: string;
}

export class NodeProdAdapter implements RuntimeAdapter {
  readonly assets: Assets;
  private serverHandle: NodeServerHandle | null = null;

  constructor(private options: NodeProdAdapterOptions = {}) {
    const rootDir = options.rootDir ?? process.cwd();

    // Production assets: read-only, no write/delete
    this.assets = {
      get: async (path: string) => {
        const fullPath = resolvePath(rootDir, path);
        try {
          const s = await stat(fullPath);
          if (!s.isFile()) return null;
          return await readFile(fullPath);
        } catch (error: unknown) {
          if (isNotFound(error)) return null;
          throw error;
        }
      },

      load: async (path: string) => {
        const fullPath = resolvePath(rootDir, path);
        try {
          const s = await stat(fullPath);
          if (!s.isFile()) return null;
          const data = await readFile(fullPath);
          return new TextDecoder().decode(data);
        } catch (error: unknown) {
          if (isNotFound(error)) return null;
          throw error;
        }
      },

      write: async (_path: string, _data: Uint8Array) => {
        // Production builds should not write to the filesystem
        // at runtime.  Use a dedicated build step instead.
      },

      delete: async (_path: string) => {
        // No-op in production.
      },

      list: async (prefix: string) => {
        const fullPath = resolvePath(rootDir, prefix);
        try {
          const s = await stat(fullPath);
          if (!s.isDirectory()) return [];
        } catch (error: unknown) {
          if (isNotFound(error)) return [];
          throw error;
        }

        const results: string[] = [];
        await walkDir(rootDir, fullPath, results);
        return results;
      },
    };
  }

  /**
   * Start the Node.js production server.
   *
   * Configures the Application with production settings, loads
   * environment files, and starts listening.
   */
  async serve(app: any, options?: ServeOptions): Promise<void> {
    const rootDir = this.options.rootDir ?? process.cwd();

    app.configureServer({
      preset: 'node',
      mode: 'production',
      port: this.options.port ?? 5200,
      host: this.options.host ?? '0.0.0.0',
      rootDir,
    });

    app.loadEnv(await loadNodeEnvFiles(rootDir, 'production'));

    this.serverHandle = startNodeServer((request) => app.fetch(request), {
      port: this.options.port,
      host: this.options.host,
      onListening: options?.onListening,
    });

    return this.serverHandle.ready;
  }

  /** Stop the HTTP server. */
  close(): void {
    this.serverHandle?.close();
    this.serverHandle = null;
  }

  // No watch() in production
}

// ── Shared helpers ──────────────────────────────────────────

/**
 * Resolve a path against root with traversal protection.
 */
function resolvePath(root: string, path: string): string {
  const cleaned = path.replace(/\\/g, '/').replace(/^\//, '');
  const resolved = resolve(join(root, cleaned));
  if (!resolved.startsWith(resolve(root))) {
    throw new Error(`Path traversal detected: ${path}`);
  }
  return resolved;
}

/**
 * Check whether a thrown error is a Node.js `ENOENT` error.
 */
function isNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'ENOENT'
  );
}

/**
 * Recursively walk a directory collecting relative file paths.
 */
async function walkDir(
  root: string,
  dir: string,
  results: string[]
): Promise<void> {
  let entries: Dirent[];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(root, full, results);
    } else if (entry.isFile()) {
      results.push(relative(root, full).replace(/\\/g, '/'));
    }
  }
}
