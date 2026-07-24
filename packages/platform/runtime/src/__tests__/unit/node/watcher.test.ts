import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, writeFile, unlink, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { NodeWatcher } from '../../../adapters/node/watcher.js';

describe('NodeWatcher', () => {
  let watchDir: string;
  let watcher: NodeWatcher;

  beforeEach(async () => {
    watchDir = join(tmpdir(), `rasengan-watcher-test-${randomUUID()}`);
    await mkdir(watchDir, { recursive: true });
    watcher = new NodeWatcher();
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

    // Give the watcher a moment, then verify no callback fired
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
