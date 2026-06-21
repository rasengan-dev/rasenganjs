import { mkdir, readdir, unlink, stat } from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import { join, dirname, relative, resolve } from 'node:path';

export class BunAssets {
  constructor(private rootDir: string = process.cwd()) {}

  async get(path: string): Promise<Uint8Array | null> {
    const fullPath = this.resolvePath(path);
    const file = Bun.file(fullPath);

    if (!(await file.exists())) return null;

    const buf = await file.arrayBuffer();
    return new Uint8Array(buf);
  }

  async load(path: string): Promise<string | null> {
    const fullPath = this.resolvePath(path);
    const file = Bun.file(fullPath);

    if (!(await file.exists())) return null;

    return file.text();
  }

  async write(path: string, data: Uint8Array): Promise<void> {
    const fullPath = this.resolvePath(path);
    await mkdir(dirname(fullPath), { recursive: true });
    await Bun.write(fullPath, data);
  }

  async delete(path: string): Promise<void> {
    const fullPath = this.resolvePath(path);

    try {
      await unlink(fullPath);
    } catch (error: unknown) {
      if (isNotFoundError(error)) return;
      throw error;
    }
  }

  async list(prefix: string): Promise<string[]> {
    const fullPath = this.resolvePath(prefix);

    try {
      const stats = await stat(fullPath);
      if (!stats.isDirectory()) return [];
    } catch (error: unknown) {
      if (isNotFoundError(error)) return [];
      throw error;
    }

    const results: string[] = [];
    await this.walk(fullPath, results);
    return results;
  }

  private resolvePath(path: string): string {
    const cleaned = path.replace(/\\/g, '/').replace(/^\//, '');
    const resolved = resolve(join(this.rootDir, cleaned));
    if (!resolved.startsWith(resolve(this.rootDir))) {
      throw new Error(`Path traversal detected: ${path}`);
    }
    return resolved;
  }

  private async walk(dir: string, results: string[]): Promise<void> {
    let entries: Dirent[];
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
        const rel = relative(this.rootDir, full).replace(/\\/g, '/');
        results.push(rel);
      }
    }
  }
}

function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: unknown }).code === 'ENOENT'
  );
}
