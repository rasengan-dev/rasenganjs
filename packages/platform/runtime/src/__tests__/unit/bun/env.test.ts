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

  describe('process.env side effect (RFC-0010)', () => {
    const keys: string[] = [];

    afterEach(() => {
      for (const key of keys) delete process.env[key];
      keys.length = 0;
    });

    itIfBun('assigns loaded values into process.env', async () => {
      const key = `RASENGAN_TEST_${randomUUID().replace(/-/g, '')}`;
      keys.push(key);

      await writeFile(join(rootDir, '.env'), `${key}=from-file\n`);
      await loadBunEnvFiles(rootDir, 'development');

      expect(process.env[key]).toBe('from-file');
    });

    itIfBun('never overrides a value already set in process.env', async () => {
      const key = `RASENGAN_TEST_${randomUUID().replace(/-/g, '')}`;
      keys.push(key);
      process.env[key] = 'from-real-env';

      await writeFile(join(rootDir, '.env'), `${key}=from-file\n`);
      const result = await loadBunEnvFiles(rootDir, 'development');

      expect(result[key]).toBe('from-file');
      expect(process.env[key]).toBe('from-real-env');
    });
  });
});
