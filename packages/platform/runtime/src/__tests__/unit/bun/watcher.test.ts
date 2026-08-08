import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, writeFile, unlink, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { BunWatcher } from '../../../adapters/bun/watcher.js';

describe('BunWatcher', () => {
  let watchDir: string;
  let watcher: BunWatcher;

  beforeEach(async () => {
    watchDir = join(tmpdir(), `rasengan-bun-watcher-${randomUUID()}`);
    await mkdir(watchDir, { recursive: true });
    watcher = new BunWatcher();
  });

  afterEach(async () => {
    await rmdir(watchDir, { recursive: true }).catch(() => {});
  });

  it('returns a dispose function', () => {
    const dispose = watcher.watch(watchDir, () => {});
    expect(typeof dispose).toBe('function');
    dispose();
  });

  it('dispose stops further callbacks', async () => {
    let callCount = 0;
    const dispose = watcher.watch(watchDir, () => {
      callCount++;
    });

    dispose();

    await writeFile(join(watchDir, 'test.txt'), 'content');

    await new Promise((r) => setTimeout(r, 300));
    expect(callCount).toBe(0);
  });

  it('can watch and dispose multiple times', () => {
    const d1 = watcher.watch(watchDir, () => {});
    const d2 = watcher.watch(watchDir, () => {});
    d1();
    d2();
  });

  it('accepts custom debounce duration', () => {
    const dispose = watcher.watch(watchDir, () => {}, 500);
    expect(typeof dispose).toBe('function');
    dispose();
  });
});
