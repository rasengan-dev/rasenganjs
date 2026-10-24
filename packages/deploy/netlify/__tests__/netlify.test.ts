import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

vi.mock('execa', () => ({ execa: vi.fn(() => Promise.resolve({})) }));

const { execa } = await import('execa');
const { configure } = await import('../index');

const originalCwd = process.cwd();
let projectDir: string;

type BuildConfig = {
  ssr: boolean;
  prerender: boolean;
  api?: { prefix: string };
};

function write(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/** Lays out what `rasengan build` leaves behind for the given mode. */
function fakeBuild(config: BuildConfig) {
  const configJson = JSON.stringify({ redirects: [], ...config });

  write(
    'package.json',
    JSON.stringify({ dependencies: { rasengan: '^2.0.0' } })
  );

  if (config.ssr && !config.prerender) {
    write('dist/client/assets/config.json', configJson);
    write('dist/client/assets/app.js', 'console.log("client")');
    write('dist/server/entry.server.js', 'export const render = () => {};');
  } else if (config.prerender) {
    write('dist/client/assets/config.json', configJson);
    write('static/index.html', '<h1>prerendered</h1>');
  } else {
    write('dist/assets/config.json', configJson);
    write('dist/index.html', '<div id="root"></div>');
  }
}

const v1 = (...parts: string[]) => path.join('.netlify/v1', ...parts);
const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));
const prepare = () => configure({}).prepare();

beforeEach(() => {
  projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rasengan-netlify-'));
  process.chdir(projectDir);
  vi.mocked(execa).mockClear();
});

afterEach(() => {
  process.chdir(originalCwd);
  fs.rmSync(projectDir, { recursive: true, force: true });
});

describe('@rasenganjs/netlify, SSR build', () => {
  beforeEach(() =>
    fakeBuild({ ssr: true, prerender: false, api: { prefix: '/v1' } })
  );

  it('routes assets to the static directory and everything else to the SSR function', async () => {
    await prepare();

    const config = readJson(v1('config.json'));
    expect(config.version).toBe(1);
    expect(config.redirects).toEqual([
      {
        from: '/assets/*',
        to: '/.netlify/v1/static/assets/:splat',
        status: 200,
      },
      { from: '/*', to: '/.netlify/functions/rasengan-ssr', status: 200 },
    ]);
  });

  it('declares included_files relative to the project root', async () => {
    await prepare();

    // Bare 'ssr-server/**' globs silently matched nothing in production:
    // Netlify resolves them from the project root, not functions.directory.
    expect(readJson(v1('config.json')).functions).toEqual({
      directory: '.netlify/v1/functions',
      included_files: [
        '.netlify/v1/functions/ssr-server/**',
        '.netlify/v1/functions/ssr-client/**',
        '.netlify/v1/functions/node_modules/**',
        '.netlify/v1/functions/package.json',
      ],
    });
  });

  it('copies the client build to static and the server/client builds next to the function', async () => {
    await prepare();

    expect(fs.existsSync(v1('static/assets/app.js'))).toBe(true);
    expect(fs.existsSync(v1('functions/ssr-server/entry.server.js'))).toBe(
      true
    );
    expect(fs.existsSync(v1('functions/ssr-client/assets/app.js'))).toBe(true);
  });

  it('generates a syntactically valid ESM handler using the configured API prefix', async () => {
    await prepare();

    const handlerPath = v1('functions/rasengan-ssr.mjs');
    const handler = fs.readFileSync(handlerPath, 'utf8');
    expect(handler).toContain('prefix: "/v1"');
    expect(handler).toContain('export default async (request) =>');

    expect(() =>
      execFileSync(process.execPath, ['--check', handlerPath])
    ).not.toThrow();
  });

  it('writes the function package.json from the project dependencies and installs them', async () => {
    await prepare();

    expect(readJson(v1('functions/package.json'))).toEqual({
      type: 'module',
      dependencies: { rasengan: '^2.0.0' },
    });
    expect(execa).toHaveBeenCalledWith(
      'npm',
      ['install', '--legacy-peer-deps'],
      {
        cwd: '.netlify/v1/functions',
      }
    );
  });

  it('replaces a previous .netlify directory instead of merging into it', async () => {
    write(v1('static/stale.txt'), 'from a previous deploy');

    await prepare();

    expect(fs.existsSync(v1('static/stale.txt'))).toBe(false);
  });
});

describe('@rasenganjs/netlify, SPA build', () => {
  it('serves everything statically and declares no function', async () => {
    fakeBuild({ ssr: false, prerender: false });

    await prepare();

    const config = readJson(v1('config.json'));
    expect(config.functions).toBeUndefined();
    expect(config.redirects.at(-1)).toEqual({
      from: '/*',
      to: '/.netlify/v1/static/index.html',
      status: 200,
    });
    expect(fs.existsSync(v1('static/index.html'))).toBe(true);
    expect(fs.existsSync(v1('functions'))).toBe(false);
    expect(execa).not.toHaveBeenCalled();
  });
});

describe('@rasenganjs/netlify, prerendered build', () => {
  it('ships the prerendered static/ output and no function', async () => {
    fakeBuild({ ssr: true, prerender: true });

    await prepare();

    expect(fs.readFileSync(v1('static/index.html'), 'utf8')).toBe(
      '<h1>prerendered</h1>'
    );
    expect(readJson(v1('config.json')).functions).toBeUndefined();
    expect(fs.existsSync(v1('functions'))).toBe(false);
    expect(execa).not.toHaveBeenCalled();
  });
});

describe('@rasenganjs/netlify, missing build', () => {
  it('fails with a clear error when no config.json exists', async () => {
    await expect(prepare()).rejects.toThrow('config.json not found');
  });
});
