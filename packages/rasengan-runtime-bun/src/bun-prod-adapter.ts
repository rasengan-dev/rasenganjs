import type {
  Application,
  RuntimeAdapter,
  ServeOptions,
} from '@rasenganjs/runtime';

import { startBunServer, type BunServerHandle } from './serve/bun-server.js';
import { loadBunEnvFiles } from './env/index.js';
import { join, resolve, relative } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import type { Dirent } from 'node:fs';

export interface BunProdAdapterOptions {
  port?: number;
  host?: string;
  rootDir?: string;
}

export class BunProdAdapter implements RuntimeAdapter {
  readonly assets: {
    get(path: string): Promise<Uint8Array | null>;
    load(path: string): Promise<string | null>;
    write(path: string, data: Uint8Array): Promise<void>;
    delete(path: string): Promise<void>;
    list(prefix: string): Promise<string[]>;
  };

  private serverHandle: BunServerHandle | null = null;

  constructor(private options: BunProdAdapterOptions = {}) {
    const rootDir = options.rootDir ?? process.cwd();

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

      write: async (_path: string, _data: Uint8Array) => {},

      delete: async (_path: string) => {},

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

  async serve(app: Application, options?: ServeOptions): Promise<void> {
    const rootDir = this.options.rootDir ?? process.cwd();

    app.configureServer({
      preset: 'bun',
      mode: 'production',
      port: this.options.port ?? 5200,
      host: this.options.host ?? '0.0.0.0',
      rootDir,
    });

    app.loadEnv(await loadBunEnvFiles(rootDir, 'production'));

    this.serverHandle = startBunServer(app, {
      port: this.options.port,
      host: this.options.host,
      onListening: options?.onListening,
    });

    return this.serverHandle.ready;
  }

  close(): void {
    this.serverHandle?.close();
    this.serverHandle = null;
  }
}

function resolvePath(root: string, path: string): string {
  const cleaned = path.replace(/\\/g, '/').replace(/^\//, '');
  const resolved = resolve(join(root, cleaned));
  if (!resolved.startsWith(resolve(root))) {
    throw new Error(`Path traversal detected: ${path}`);
  }
  return resolved;
}

function isNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: unknown }).code === 'ENOENT'
  );
}

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
