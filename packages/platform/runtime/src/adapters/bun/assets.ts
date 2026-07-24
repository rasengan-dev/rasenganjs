/**
 * BunAssets — local filesystem implementation of the Assets API
 * using Bun-native APIs (`Bun.file`, `Bun.write`).
 *
 * Falls back to `node:fs/promises` for operations Bun does not
 * expose a native API for (directory listing, deletion).
 *
 * All paths are resolved relative to `rootDir` (defaults to
 * `process.cwd()`). Path traversal is prevented.
 *
 * @example
 * ```ts
 * const assets = new BunAssets('/path/to/project');
 *
 * const buf = await assets.get('public/logo.png');
 * await assets.write('dist/output.txt', new TextEncoder().encode('hello'));
 * const files = await assets.list('src/');
 * ```
 */

import { mkdir, readdir, unlink, stat } from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import { join, dirname, relative, resolve } from 'node:path';

export class BunAssets {
  constructor(private rootDir: string = process.cwd()) {}

  /**
   * Read a file using `Bun.file()`.
   * Returns `null` if the file does not exist.
   */
  async get(path: string): Promise<Uint8Array | null> {
    const fullPath = this.resolvePath(path);
    const file = Bun.file(fullPath);

    if (!(await file.exists())) return null;

    const buf = await file.arrayBuffer();
    return new Uint8Array(buf);
  }

  /**
   * Read a file and decode its content as UTF-8 text.
   * Returns `null` if the file does not exist.
   */
  async load(path: string): Promise<string | null> {
    const fullPath = this.resolvePath(path);
    const file = Bun.file(fullPath);

    if (!(await file.exists())) return null;

    return file.text();
  }

  /**
   * Write a file using `Bun.write()`.
   * Creates parent directories if they do not exist.
   */
  async write(path: string, data: Uint8Array): Promise<void> {
    const fullPath = this.resolvePath(path);
    await mkdir(dirname(fullPath), { recursive: true });
    await Bun.write(fullPath, data);
  }

  /**
   * Delete a file or empty directory.
   * No-op if the path does not exist.
   */
  async delete(path: string): Promise<void> {
    const fullPath = this.resolvePath(path);

    try {
      await unlink(fullPath);
    } catch (error: unknown) {
      if (isNotFoundError(error)) return;
      throw error;
    }
  }

  /**
   * Recursively list all files under a prefix/directory.
   * Returns paths relative to rootDir with forward slashes.
   */
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

  // ── Private helpers ────────────────────────────────────────

  /**
   * Resolve a user-provided path against rootDir with path traversal
   * protection.
   */
  private resolvePath(path: string): string {
    const cleaned = path.replace(/\\/g, '/').replace(/^\//, '');
    const resolved = resolve(join(this.rootDir, cleaned));
    if (!resolved.startsWith(resolve(this.rootDir))) {
      throw new Error(`Path traversal detected: ${path}`);
    }
    return resolved;
  }

  /**
   * Recursively walk a directory, collecting file paths relative
   * to rootDir.
   */
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

/**
 * Check whether a thrown error is a Node.js `ENOENT` (not found) error.
 */
function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: unknown }).code === 'ENOENT'
  );
}
