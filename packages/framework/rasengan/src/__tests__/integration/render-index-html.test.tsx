import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderIndexHTML } from '../../server/build/rendering.js';
import type { AppConfig } from '../../core/config/type.js';
import type { TemplateProps } from '../../routing/types.js';

// renderIndexHTML resolves its manifest path via resolveBuildOptions({})'s
// hardcoded defaults (a bare "./dist", not joined with rootPath), so the
// manifest lookup is CWD-relative — we chdir into the temp root to make
// that resolve correctly, matching how the real build CLI runs (cwd ===
// project root === rootPath in practice).
let dir: string;
let originalCwd: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'rasengan-render-index-'));
  originalCwd = process.cwd();
  process.chdir(dir);

  mkdirSync(join(dir, 'dist/.vite'), { recursive: true });
  writeFileSync(
    join(dir, 'dist/.vite/manifest.json'),
    JSON.stringify({
      'src/index.js': { name: 'src/index', file: 'assets/index-abc.js' },
    })
  );
});

afterEach(() => {
  process.chdir(originalCwd);
  rmSync(dir, { recursive: true, force: true });
});

const Template = ({ Head, Body }: TemplateProps) => (
  <html>
    <Head />
    <Body />
  </html>
);

describe('renderIndexHTML', () => {
  it('writes index.html into dist/ and deletes the leftover template.js when SSR/prerender are both off', async () => {
    mkdirSync(join(dir, 'dist/assets'), { recursive: true });
    writeFileSync(join(dir, 'dist/assets/template.js'), '// placeholder');

    await renderIndexHTML(Template, {
      rootPath: dir,
      config: {} as AppConfig,
      enableIndexFallback: false,
    });

    const html = readFileSync(join(dir, 'dist/index.html'), 'utf-8');
    expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(html).toContain('<html>');
    expect(existsSync(join(dir, 'dist/assets/template.js'))).toBe(false);
  });

  it('writes spa-fallback.html instead of index.html when enableIndexFallback is true', async () => {
    mkdirSync(join(dir, 'dist/assets'), { recursive: true });
    writeFileSync(join(dir, 'dist/assets/template.js'), '// placeholder');

    await renderIndexHTML(Template, {
      rootPath: dir,
      config: {} as AppConfig,
      enableIndexFallback: true,
    });

    expect(existsSync(join(dir, 'dist/spa-fallback.html'))).toBe(true);
    expect(existsSync(join(dir, 'dist/index.html'))).toBe(false);
  });

  it('writes into static/ instead of dist/ and keeps template.js when prerender is enabled', async () => {
    mkdirSync(join(dir, 'dist/client/.vite'), { recursive: true });
    writeFileSync(
      join(dir, 'dist/client/.vite/manifest.json'),
      JSON.stringify({
        'src/index.js': { name: 'src/index', file: 'assets/index-abc.js' },
      })
    );
    mkdirSync(join(dir, 'dist/assets'), { recursive: true });
    writeFileSync(join(dir, 'dist/assets/template.js'), '// placeholder');
    mkdirSync(join(dir, 'static'), { recursive: true });

    await renderIndexHTML(Template, {
      rootPath: dir,
      config: { prerender: true, ssr: true } as AppConfig,
      enableIndexFallback: false,
    });

    expect(existsSync(join(dir, 'static/index.html'))).toBe(true);
    // config.prerender is truthy, so the template.js cleanup step is skipped.
    expect(existsSync(join(dir, 'dist/assets/template.js'))).toBe(true);
  });
});
