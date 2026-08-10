import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, writeFile, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { loadNodeEnvFiles } from '../../../adapters/node/env.js';

describe('loadNodeEnvFiles', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = join(tmpdir(), `rasengan-node-env-${randomUUID()}`);
    await mkdir(rootDir, { recursive: true });
  });

  afterEach(async () => {
    await rmdir(rootDir, { recursive: true }).catch(() => {});
  });

  it('returns empty map when no env files exist', async () => {
    const result = await loadNodeEnvFiles(rootDir, 'development');
    expect(result).toEqual({});
  });

  it('loads variables from .env file', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000\nHOST=localhost\n');
    const result = await loadNodeEnvFiles(rootDir, 'development');
    expect(result.PORT).toBe('3000');
    expect(result.HOST).toBe('localhost');
  });

  it('merges files in priority order (later files win)', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000\nHOST=a\n');
    await writeFile(join(rootDir, '.env.local'), 'HOST=b\nKEY=value\n');
    const result = await loadNodeEnvFiles(rootDir, 'development');

    expect(result.PORT).toBe('3000');
    expect(result.HOST).toBe('b');
    expect(result.KEY).toBe('value');
  });

  it('loads mode-specific env files', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000');
    await writeFile(join(rootDir, '.env.development'), 'PORT=4000\nDEBUG=true');
    const result = await loadNodeEnvFiles(rootDir, 'development');

    expect(result.PORT).toBe('4000');
    expect(result.DEBUG).toBe('true');
  });

  it('handles production mode', async () => {
    await writeFile(join(rootDir, '.env'), 'PORT=3000');
    await writeFile(join(rootDir, '.env.production'), 'PORT=5000');
    const result = await loadNodeEnvFiles(rootDir, 'production');

    expect(result.PORT).toBe('5000');
  });

  describe('process.env side effect (RFC-0010)', () => {
    const keys: string[] = [];

    afterEach(() => {
      for (const key of keys) delete process.env[key];
      keys.length = 0;
    });

    it('assigns loaded values into process.env', async () => {
      const key = `RASENGAN_TEST_${randomUUID().replace(/-/g, '')}`;
      keys.push(key);

      await writeFile(join(rootDir, '.env'), `${key}=from-file\n`);
      await loadNodeEnvFiles(rootDir, 'development');

      expect(process.env[key]).toBe('from-file');
    });

    it('never overrides a value already set in process.env', async () => {
      const key = `RASENGAN_TEST_${randomUUID().replace(/-/g, '')}`;
      keys.push(key);
      process.env[key] = 'from-real-env';

      await writeFile(join(rootDir, '.env'), `${key}=from-file\n`);
      const result = await loadNodeEnvFiles(rootDir, 'development');

      // The returned map still reflects the file's value (unchanged
      // behavior for app.env/ctx.runtime.env consumers) — only the
      // process.env write is skipped.
      expect(result[key]).toBe('from-file');
      expect(process.env[key]).toBe('from-real-env');
    });
  });
});
