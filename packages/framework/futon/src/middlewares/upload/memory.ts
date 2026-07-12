import type { FileInfo, StorageEngine, UploadedFile } from './types.js';

/**
 * Default storage engine — keeps file contents in memory as a
 * `Uint8Array` on `file.buffer`. Works on every runtime (including
 * workerd), which is why it is the default. Persisting the bytes is
 * the handler's job.
 */
export class MemoryStorage implements StorageEngine {
  async handleFile(
    _ctx: unknown,
    file: File,
    _info: FileInfo
  ): Promise<Partial<UploadedFile>> {
    return { buffer: new Uint8Array(await file.arrayBuffer()) };
  }

  async removeFile(_file: UploadedFile): Promise<void> {
    // Nothing to undo — the buffer is garbage-collected with the request.
  }
}
