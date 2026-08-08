import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, writeFile, readFile, unlink, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { BunAssets } from '../../../adapters/bun/assets.js';

const describeIfBun = typeof Bun !== 'undefined' ? describe : describe.skip;

describe('BunAssets', () => {
  let rootDir: string;
  let assets: BunAssets;

  beforeEach(async () => {
    rootDir = join(tmpdir(), `rasengan-bun-assets-${randomUUID()}`);
    await mkdir(rootDir, { recursive: true });
    assets = new BunAssets(rootDir);
  });

  afterEach(async () => {
    await unlink(join(rootDir, 'test.txt')).catch(() => {});
    await unlink(join(rootDir, 'nested', 'file.txt')).catch(() => {});
    await rmdir(join(rootDir, 'nested')).catch(() => {});
    await rmdir(rootDir).catch(() => {});
  });

  it('constructor sets rootDir', () => {
    const a = new BunAssets('/custom/path');
    expect(a).toBeInstanceOf(BunAssets);
  });

  it('constructor defaults rootDir to cwd', () => {
    const a = new BunAssets();
    expect(a).toBeInstanceOf(BunAssets);
  });

  describeIfBun('get', () => {
    it('reads an existing file as Uint8Array', async () => {
      await writeFile(join(rootDir, 'test.txt'), 'hello world');
      const result = await assets.get('test.txt');
      expect(result).toBeInstanceOf(Uint8Array);
      expect(new TextDecoder().decode(result!)).toBe('hello world');
    });

    it('returns null for a non-existent file', async () => {
      const result = await assets.get('nonexistent.txt');
      expect(result).toBeNull();
    });
  });

  describeIfBun('load', () => {
    it('reads an existing file as UTF-8 text', async () => {
      await writeFile(join(rootDir, 'test.txt'), 'hello world');
      const result = await assets.load('test.txt');
      expect(result).toBe('hello world');
    });

    it('returns null for non-existent file', async () => {
      const result = await assets.load('nonexistent.txt');
      expect(result).toBeNull();
    });
  });

  describeIfBun('write', () => {
    it('writes a file to disk', async () => {
      const data = new TextEncoder().encode('written content');
      await assets.write('test.txt', data);

      const content = await readFile(join(rootDir, 'test.txt'), 'utf-8');
      expect(content).toBe('written content');
    });

    it('creates parent directories automatically', async () => {
      const data = new TextEncoder().encode('nested content');
      await assets.write('nested/file.txt', data);

      const content = await readFile(
        join(rootDir, 'nested', 'file.txt'),
        'utf-8'
      );
      expect(content).toBe('nested content');
    });
  });

  describeIfBun('delete', () => {
    it('deletes an existing file', async () => {
      await writeFile(join(rootDir, 'test.txt'), 'to delete');
      await assets.delete('test.txt');

      await expect(readFile(join(rootDir, 'test.txt'))).rejects.toThrow();
    });

    it('is no-op for non-existent file', async () => {
      await expect(assets.delete('nonexistent.txt')).resolves.not.toThrow();
    });
  });

  describeIfBun('list', () => {
    it('returns an empty array for an empty directory', async () => {
      const files = await assets.list('');
      expect(files).toEqual([]);
    });

    it('returns file paths relative to root', async () => {
      await writeFile(join(rootDir, 'a.txt'), 'a');
      await mkdir(join(rootDir, 'sub'), { recursive: true });
      await writeFile(join(rootDir, 'sub', 'b.txt'), 'b');

      const files = await assets.list('');
      expect(files.sort()).toEqual(['a.txt', 'sub/b.txt']);
    });

    it('returns an empty array for non-existent prefix', async () => {
      const files = await assets.list('nonexistent');
      expect(files).toEqual([]);
    });
  });

  describe('path traversal protection', () => {
    it('throws when attempting to traverse above root', async () => {
      await expect(assets.get('../etc/passwd')).rejects.toThrow(
        'Path traversal detected'
      );
    });

    it('throws when attempting to write outside root', async () => {
      await expect(
        assets.write('../../outside.txt', new TextEncoder().encode('x'))
      ).rejects.toThrow('Path traversal detected');
    });

    it('throws when deleting outside root', async () => {
      await expect(assets.delete('../outside')).rejects.toThrow(
        'Path traversal detected'
      );
    });
  });
});
