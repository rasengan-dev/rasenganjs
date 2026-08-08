import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  loadModuleSSR,
  findModulePath,
  getDirname,
} from '../../../core/config/utils/load-modules.js';

describe('getDirname', () => {
  it('returns the directory of a file:// URL', async () => {
    await expect(getDirname('file:///a/b/c.js')).resolves.toBe(
      path.dirname('/a/b/c.js')
    );
  });
});

describe('findModulePath / loadModuleSSR', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rasengan-load-modules-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('findModulePath resolves an extension-less path by probing candidates on disk', async () => {
    const filePath = path.join(tmpDir, 'config.mjs');
    fs.writeFileSync(filePath, 'export default {};', 'utf-8');

    const result = await findModulePath(path.join(tmpDir, 'config'));

    expect(result.path).toBe(filePath);
    expect(result.extension).toBe('.mjs');
  });

  it('findModulePath leaves an already-extensioned path untouched', async () => {
    const filePath = path.join(tmpDir, 'config.ts');

    const result = await findModulePath(filePath);

    expect(result.path).toBe(filePath);
    expect(result.extension).toBe('');
  });

  it('findModulePath rejects when no candidate file exists', async () => {
    await expect(
      findModulePath(path.join(tmpDir, 'does-not-exist'))
    ).rejects.toThrow(/not found/);
  });

  it('loadModuleSSR imports an extension-less path by resolving it first', async () => {
    const filePath = path.join(tmpDir, 'config.mjs');
    fs.writeFileSync(filePath, "export default { greeting: 'hi' };", 'utf-8');

    const mod = await loadModuleSSR(path.join(tmpDir, 'config'));

    expect(mod.default).toEqual({ greeting: 'hi' });
  });

  it('loadModuleSSR imports a path that already has a recognized extension', async () => {
    const filePath = path.join(tmpDir, 'config.mjs');
    fs.writeFileSync(filePath, 'export const value = 42;', 'utf-8');

    const mod = await loadModuleSSR(filePath);

    expect(mod.value).toBe(42);
  });

  it('loadModuleSSR rejects when the target module does not exist', async () => {
    await expect(loadModuleSSR(path.join(tmpDir, 'missing'))).rejects.toThrow();
  });
});
