/**
 * `DiskStorage` — filesystem storage engine for `fileUpload()` (RFC-0002).
 *
 * Lives behind the `@rasenganjs/futon/upload/disk` subpath export ON
 * PURPOSE: this is the only futon module that imports `node:` builtins,
 * and keeping it out of the main entry keeps workerd/WinterCG bundles
 * clean. `node:fs` is natively available on Node, Bun and Deno, so one
 * engine covers every runtime that has a disk.
 *
 * ```ts
 * import { fileUpload } from '@rasenganjs/futon';
 * import { diskStorage } from '@rasenganjs/futon/upload/disk';
 *
 * const upload = fileUpload({
 *   storage: diskStorage({
 *     destination: 'uploads/',
 *     // filename: (ctx, info) => `${Date.now()}-${sanitize(info.originalname)}`,
 *   }),
 * });
 * ```
 */

import { createWriteStream } from 'node:fs';
import { mkdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

import type { Context } from '../context/types.js';
import type {
  FileInfo,
  StorageEngine,
  UploadedFile,
} from '../middlewares/upload/types.js';

type Resolver =
  string | ((ctx: Context, info: FileInfo) => string | Promise<string>);

export interface DiskStorageOptions {
  /** Directory to write into — a path, or a per-file callback. Created recursively. */
  destination: Resolver;
  /**
   * Name of the file inside `destination`. Defaults to random hex plus
   * the sanitized extension of `originalname`. `originalname` is
   * user-controlled — only trust it here deliberately.
   */
  filename?: (ctx: Context, info: FileInfo) => string | Promise<string>;
}

export function diskStorage(options: DiskStorageOptions): StorageEngine {
  return new DiskStorage(options);
}

class DiskStorage implements StorageEngine {
  constructor(private options: DiskStorageOptions) {}

  async handleFile(
    ctx: Context,
    file: File,
    info: FileInfo
  ): Promise<Partial<UploadedFile>> {
    const destination =
      typeof this.options.destination === 'string'
        ? this.options.destination
        : await this.options.destination(ctx, info);
    await mkdir(destination, { recursive: true });

    const filename = this.options.filename
      ? await this.options.filename(ctx, info)
      : defaultFilename(info.originalname);
    const path = join(destination, filename);

    try {
      // No extra in-memory copy: stream the blob's bytes straight to disk.
      await pipeline(
        Readable.fromWeb(file.stream() as never),
        createWriteStream(path, { flags: 'wx' })
      );
    } catch (error) {
      // Never leave a partial file behind.
      await unlink(path).catch(() => {});
      throw error;
    }

    return { destination, filename, path };
  }

  async removeFile(file: UploadedFile): Promise<void> {
    if (typeof file.path === 'string') {
      await unlink(file.path).catch(() => {});
    }
  }
}

/**
 * Collision-safe default name. Only the extension of the client name is
 * kept, and only when it is plain alphanumeric — the client name itself
 * never becomes part of a path (classic `filename="../../x"` traversal).
 */
function defaultFilename(originalname: string): string {
  const extension = /\.([A-Za-z0-9]{1,10})$/.exec(originalname)?.[1];
  const random = crypto.randomUUID().replace(/-/g, '');
  return extension ? `${random}.${extension.toLowerCase()}` : random;
}
