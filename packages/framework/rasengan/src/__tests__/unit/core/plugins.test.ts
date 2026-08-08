import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { plugins } from '../../../core/plugins/index.js';

// Only `plugins` (loadRasenganGlobal, flatRoutesPlugin,
// flatApiRoutesPlugin — see core/plugins/index.ts's own `plugins[]`
// array) is exported from this module and none of their hooks read
// Vite's plugin `this` context, so they're callable directly as plain
// functions. The main `rasengan()` orchestrator plugin (config
// resolution, buildStart/generateBundle/closeBundle, SSG/adapter
// dispatch) relies on `this.environment`/`this.emitFile`/`this.getFileName`
// and the full Vite build lifecycle, and `rasenganConfigPlugin` /
// `buildOutputInformation` / `fixCPathPlugin` aren't exported at all —
// none of that is reachable from a unit test without either a real Vite
// build or a source change, so it's left to the existing manual/
// playground verification (already exercised extensively during the
// Vite 8 migration work).
const [loadRasenganGlobalPlugin, flatRoutesPlugin, flatApiRoutesPlugin] =
  plugins;

let dir: string;
let originalCwd: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'rasengan-plugins-'));
  originalCwd = process.cwd();
  process.chdir(dir);
});

afterEach(() => {
  process.chdir(originalCwd);
  rmSync(dir, { recursive: true, force: true });
});

describe('loadRasenganGlobal plugin', () => {
  it('defines an empty version when node_modules/rasengan/package.json is absent', async () => {
    const result: any = await (loadRasenganGlobalPlugin.config as Function)();
    const rasenganDefine = JSON.parse(result.define['Rasengan']);

    expect(rasenganDefine.version).toBe('');
    expect(rasenganDefine.ssr).toBe(true);
  });

  it('reads the real version from node_modules/rasengan/package.json when present', async () => {
    mkdirSync(join(dir, 'node_modules/rasengan'), { recursive: true });
    writeFileSync(
      join(dir, 'node_modules/rasengan/package.json'),
      JSON.stringify({ version: '9.9.9' })
    );

    const result: any = await (loadRasenganGlobalPlugin.config as Function)();
    const rasenganDefine = JSON.parse(result.define['Rasengan']);

    expect(rasenganDefine.version).toBe('9.9.9');
  });
});

describe('flatRoutesPlugin', () => {
  it('resolves its own virtual module id to the internal \\0-prefixed id', () => {
    const resolved = (flatRoutesPlugin.resolveId as Function)(
      'virtual:rasengan/router'
    );
    expect(resolved).toBe('\0virtual:rasengan/router');
  });

  it('returns undefined for an unrelated module id', () => {
    const resolved = (flatRoutesPlugin.resolveId as Function)('some/other/id');
    expect(resolved).toBeUndefined();
  });

  it('loads generated source that calls flatRoutes() over the _routes glob', async () => {
    const code: string = await (flatRoutesPlugin.load as Function)(
      '\0virtual:rasengan/router'
    );
    expect(code).toContain("from 'rasengan'");
    expect(code).toContain('flatRoutes(');
    expect(code).toContain('/src/app/_routes/**/layout.{js,ts,jsx,tsx}');
  });

  it('returns undefined when loading an unrelated id', async () => {
    const code = await (flatRoutesPlugin.load as Function)('some/other/id');
    expect(code).toBeUndefined();
  });
});

describe('flatApiRoutesPlugin', () => {
  it('defaults the API prefix to "/api" when there is no rasengan.config.js', async () => {
    const code: string = await (flatApiRoutesPlugin.load as Function)(
      '\0virtual:rasengan/api-router'
    );
    expect(code).toContain('flatApiRoutes(');
    expect(code).toContain('{ prefix: "/api" }');
  });

  it('reads a custom API prefix from a real rasengan.config.js when present', async () => {
    // Forces ESM interpretation for the plain .js config file the plugin
    // dynamically imports by that literal name.
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({ type: 'module' })
    );
    writeFileSync(
      join(dir, 'rasengan.config.js'),
      `export default async () => ({ api: { prefix: '/v1' } });`
    );

    const code: string = await (flatApiRoutesPlugin.load as Function)(
      '\0virtual:rasengan/api-router'
    );
    expect(code).toContain('{ prefix: "/v1" }');
  });

  it('resolves its own virtual module id', () => {
    const resolved = (flatApiRoutesPlugin.resolveId as Function)(
      'virtual:rasengan/api-router'
    );
    expect(resolved).toBe('\0virtual:rasengan/api-router');
  });
});
