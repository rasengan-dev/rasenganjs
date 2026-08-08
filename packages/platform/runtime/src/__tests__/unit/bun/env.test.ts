import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, writeFile, unlink, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { loadBunEnvFiles } from '../../../adapters/bun/env.js';

const itIfBun = typeof Bun !== 'undefined' ? it : it.skip;

describe('loadBunEnvFiles', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = join(tmpdir(), `rasengan-bun-env-${randomUUID()}`);
    await mkdir(rootDir, { recursive: true });
  });

  afterEach(async () => {
    await rmdir(rootDir, { recursive: true }).catch(() => {});
  });

  itIfBun('returns empty map when no env files exist', async () => {
    const result = await loadBunEnvFiles(rootDir, 'development');
    expect(result).toEqual({});
  });

  itIfBun('loads variables from .env file', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000\nHOST=localhost\n');
    const result = await loadBunEnvFiles(rootDir, 'development');
    expect(result.PORT).toBe('3000');
    expect(result.HOST).toBe('localhost');
  });

  itIfBun('merges files in priority order (later files win)', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000\nHOST=a\n');
    await writeFile(join(rootDir, '.env.local'), 'HOST=b\nKEY=value\n');
    const result = await loadBunEnvFiles(rootDir, 'development');

    expect(result.PORT).toBe('3000');
    expect(result.HOST).toBe('b');
    expect(result.KEY).toBe('value');
  });

  itIfBun('loads mode-specific env files', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000');
    await writeFile(join(rootDir, '.env.development'), 'PORT=4000\nDEBUG=true');
    const result = await loadBunEnvFiles(rootDir, 'development');

    expect(result.PORT).toBe('4000');
    expect(result.DEBUG).toBe('true');
  });

  itIfBun('handles production mode', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000');
    await writeFile(join(rootDir, '.env.production'), 'PORT=5000');
    const result = await loadBunEnvFiles(rootDir, 'production');

    expect(result.PORT).toBe('5000');
  });
});
