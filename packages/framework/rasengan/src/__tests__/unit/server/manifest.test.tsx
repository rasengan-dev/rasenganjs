import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ManifestManager } from '../../../server/build/manifest.js';

let dir: string;
let manifestPath: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'rasengan-manifest-'));
  manifestPath = join(dir, 'manifest.json');
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function writeManifest(content: object) {
  writeFileSync(manifestPath, JSON.stringify(content));
}

describe('ManifestManager', () => {
  it('logs an error and falls back to an empty manifest when the file cannot be read', () => {
    const manager = new ManifestManager(join(dir, 'missing.json'));
    expect(manager.resolveAssets('')).toEqual({ scripts: [], styles: [] });
  });

  it('resolves the entry script from a minimal manifest', () => {
    writeManifest({
      'src/index.js': { name: 'src/index', file: 'assets/index-abc.js' },
    });

    const manager = new ManifestManager(manifestPath);
    expect(manager.resolveAssets('')).toEqual({
      scripts: ['assets/index-abc.js'],
      styles: [],
    });
  });

  it('collects CSS for the entry and recursively for its static imports', () => {
    writeManifest({
      'src/index.js': {
        name: 'src/index',
        file: 'assets/index-abc.js',
        css: ['assets/index.css'],
        imports: ['src/shared.js'],
      },
      'src/shared.js': {
        name: 'src/shared',
        file: 'assets/shared-def.js',
        css: ['assets/shared.css'],
      },
    });

    const manager = new ManifestManager(manifestPath);
    const assets = manager.resolveAssets('');

    expect(assets.scripts).toEqual([
      'assets/index-abc.js',
      'assets/shared-def.js',
    ]);
    expect(assets.styles).toEqual(['assets/index.css', 'assets/shared.css']);
  });

  it('only pulls in a dynamic import chunk whose src matches the requested page source', () => {
    writeManifest({
      'src/index.js': {
        name: 'src/index',
        file: 'assets/index-abc.js',
        dynamicImports: ['src/app/_routes/home/page.tsx'],
      },
      'src/app/_routes/home/page.tsx': {
        name: 'home-page',
        file: 'assets/home-ghi.js',
        src: 'src/app/_routes/home/page.tsx',
      },
    });

    const manager = new ManifestManager(manifestPath);

    expect(manager.resolveAssets('home/page.tsx').scripts).toContain(
      'assets/home-ghi.js'
    );
    expect(manager.resolveAssets('other/page.tsx').scripts).not.toContain(
      'assets/home-ghi.js'
    );
  });

  it('avoids infinite recursion / duplicate entries on a circular import graph', () => {
    writeManifest({
      'src/index.js': {
        name: 'src/index',
        file: 'assets/index-abc.js',
        imports: ['src/a.js'],
      },
      'src/a.js': {
        name: 'src/a',
        file: 'assets/a.js',
        imports: ['src/index.js'],
      },
    });

    const manager = new ManifestManager(manifestPath);
    expect(() => manager.resolveAssets('')).not.toThrow();
    expect(manager.resolveAssets('').scripts).toEqual([
      'assets/index-abc.js',
      'assets/a.js',
    ]);
  });

  it('generateMetaTags renders module <script> and stylesheet <link> tags rooted at "/"', () => {
    writeManifest({
      'src/index.js': {
        name: 'src/index',
        file: 'assets/index-abc.js',
        css: ['assets/index.css'],
      },
    });

    const manager = new ManifestManager(manifestPath);
    const tags = manager.generateMetaTags('');
    const html = renderToStaticMarkup(<>{tags}</>);

    expect(html).toContain('<script type="module" src="/assets/index-abc.js">');
    expect(html).toContain('<link rel="stylesheet" href="/assets/index.css"');
  });

  it('findEntry() looks up a manifest entry by its exact key', () => {
    writeManifest({
      'src/index.js': { name: 'src/index', file: 'assets/index-abc.js' },
    });

    const manager = new ManifestManager(manifestPath);
    expect(manager.findEntry('src/index.js')?.file).toBe('assets/index-abc.js');
    expect(manager.findEntry('does/not/exist.js')).toBeUndefined();
  });
});
