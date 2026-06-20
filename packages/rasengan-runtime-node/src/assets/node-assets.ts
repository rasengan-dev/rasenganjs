/**
 * NodeAssets — local filesystem implementation of the assets API.
 *
 * All paths are resolved relative to `rootDir` (defaults to
 * process.cwd()).  Directory separators are normalized to '/'.
 *
 * @example
 * ```ts
 * const assets = new NodeAssets('/path/to/project');
 *
 * const buf = await assets.get('public/logo.png');
 * await assets.write('dist/output.txt', new TextEncoder().encode('hello'));
 * await assets.delete('tmp/cache.json');
 * const files = await assets.list('src/');
 * ```
 */

import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  unlink,
  stat,
} from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';

export class NodeAssets {
  constructor(private rootDir: string = process.cwd()) {}

  /**
   * Read a file from the local filesystem.
   * Returns `null` if the file does not exist or is a directory.
   */
  async get(path: string): Promise<Uint8Array | null> {
    const fullPath = this.resolvePath(path);

    try {
      const stats = await stat(fullPath);
      if (!stats.isFile()) return null;
      return await readFile(fullPath);
    } catch (error: unknown) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }

  /**
   * Write a file to the local filesystem.
   * Creates parent directories if they do not exist.
   */
  async write(path: string, data: Uint8Array): Promise<void> {
    const fullPath = this.resolvePath(path);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, data);
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

  private resolvePath(path: string): string {
    // Normalise — strip leading / and replace \ with /
    const cleaned = path.replace(/\\/g, '/').replace(/^\//, '');
    // Prevent directory traversal
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
    (error as NodeJS.ErrnoException).code === 'ENOENT'
  );
}
