/**
 * BunProdAdapter — RuntimeAdapter for Bun production.
 *
 * Features:
 *   - HTTP server via `Bun.serve()`
 *   - Local filesystem assets (`Bun.file` for reads, no write/delete)
 *
 * @example
 * ```ts
 * import { Application } from "@rasenganjs/futon";
 * import { BunProdAdapter } from "@rasenganjs/runtime/adapters/bun";
 *
 * const app = new Application();
 * const adapter = new BunProdAdapter({ port: 8080, rootDir: './dist' });
 * await adapter.serve(app);
 * ```
 */

import type { RuntimeAdapter, ServeOptions, Assets } from '../../types.js';

import { startBunServer, type BunServerHandle } from './server.js';
import { loadBunEnvFiles } from './env.js';
import { join, resolve, relative } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import type { Dirent } from 'node:fs';

export interface BunProdAdapterOptions {
  port?: number;
  host?: string;
  rootDir?: string;
}

export class BunProdAdapter implements RuntimeAdapter {
  readonly assets: Assets;
  private serverHandle: BunServerHandle | null = null;

  constructor(private options: BunProdAdapterOptions = {}) {
    const rootDir = options.rootDir ?? process.cwd();

    // Production assets: read-only via Bun.file, no write/delete
    this.assets = {
      get: async (path: string) => {
        const fullPath = resolvePath(rootDir, path);
        const file = Bun.file(fullPath);
        if (!(await file.exists())) return null;
        const buf = await file.arrayBuffer();
        return new Uint8Array(buf);
      },

      load: async (path: string) => {
        const fullPath = resolvePath(rootDir, path);
        const file = Bun.file(fullPath);
        if (!(await file.exists())) return null;
        return file.text();
      },

      write: async (_path: string, _data: Uint8Array) => {
        // No-op in production.
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
   * Start the Bun production server.
   *
   * Configures the Application with production settings, loads
   * environment files, and starts listening via Bun.serve().
   */
  async serve(app: any, options?: ServeOptions): Promise<void> {
    const rootDir = this.options.rootDir ?? process.cwd();

    app.configureServer({
      preset: 'bun',
      mode: 'production',
      port: this.options.port ?? 5200,
      host: this.options.host ?? '0.0.0.0',
      rootDir,
    });

    app.loadEnv(await loadBunEnvFiles(rootDir, 'production'));

    this.serverHandle = startBunServer((request) => app.fetch(request), {
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
    (error as { code: unknown }).code === 'ENOENT'
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
