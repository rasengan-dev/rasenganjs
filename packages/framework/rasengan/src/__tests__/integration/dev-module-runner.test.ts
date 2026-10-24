import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer, type ViteDevServer } from 'vite';
import { getDevModuleRunner } from '../../server/dev/module-runner.js';

/**
 * Source of a user module holding module-level state, like an `_api/`
 * in-memory store or a database client created at import time.
 * @param version Exported so a test can tell an edited file from the old one.
 */
const storeSource = (version: number) =>
  `let count = 0;\nexport const next = () => ++count;\nexport const version = ${version};\n`;

/**
 * Imports the store again until it reports `version`, i.e. until Vite's
 * watcher and HMR have invalidated the cached module after an edit.
 * @param server The dev server whose shared runner is used.
 * @param file Absolute path of the store module.
 * @param version The version the edited file exports.
 */
async function waitForVersion(
  server: ViteDevServer,
  file: string,
  version: number
) {
  const deadline = Date.now() + 5000;

  while (Date.now() < deadline) {
    const mod = await getDevModuleRunner(server).import(file);
    if (mod.version === version) return mod;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  throw new Error(`store.js was not re-evaluated with version ${version}`);
}

describe('getDevModuleRunner', () => {
  let root: string;
  let file: string;
  let server: ViteDevServer;

  beforeAll(async () => {
    root = await mkdtemp(join(tmpdir(), 'rasengan-dev-runner-'));
    file = join(root, 'store.js');
    await writeFile(file, storeSource(1));

    server = await createServer({
      root,
      configFile: false,
      logLevel: 'silent',
      server: { middlewareMode: true, ws: false },
    });
  });

  afterAll(async () => {
    await server?.close();
    await rm(root, { recursive: true, force: true });
  });

  it('returns the same runner for every call on one dev server', () => {
    expect(getDevModuleRunner(server)).toBe(getDevModuleRunner(server));
  });

  it('keeps module-level state between imports (one evaluation per session)', async () => {
    const first = await getDevModuleRunner(server).import(file);
    const second = await getDevModuleRunner(server).import(file);

    expect(first.next()).toBe(1);
    expect(second.next()).toBe(2);
  });

  it('re-evaluates a module after its file is edited', async () => {
    await writeFile(file, storeSource(2));

    const edited = await waitForVersion(server, file, 2);

    expect(edited.version).toBe(2);
    expect(edited.next()).toBe(1);
  });
});
