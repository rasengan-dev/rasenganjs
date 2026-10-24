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
  redirects?: Array<{
    source: string;
    destination: string;
    permanent: boolean;
  }>;
  api?: { prefix: string };
};

function write(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/** Lays out what `rasengan build` leaves behind for the given mode. */
function fakeBuild(config: BuildConfig, extra: Record<string, string> = {}) {
  const full = { redirects: [], ...config };
  const configJson = JSON.stringify(full);

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

  for (const [file, content] of Object.entries(extra)) write(file, content);
}

const out = (...parts: string[]) => path.join('.vercel/output', ...parts);
const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));
const prepare = () => configure({}).prepare();

beforeEach(() => {
  projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rasengan-vercel-'));
  process.chdir(projectDir);
  vi.mocked(execa).mockClear();
});

afterEach(() => {
  process.chdir(originalCwd);
  fs.rmSync(projectDir, { recursive: true, force: true });
});

describe('@rasenganjs/vercel, SSR build', () => {
  beforeEach(() =>
    fakeBuild({
      ssr: true,
      prerender: false,
      redirects: [{ source: '/old', destination: '/new', permanent: true }],
      api: { prefix: '/v1' },
    })
  );

  it('writes a Build Output API v3 config with redirects before the filesystem and SSR fallback', async () => {
    await prepare();

    const config = readJson(out('config.json'));
    expect(config.version).toBe(3);
    expect(config.routes).toEqual([
      { src: '/old', dest: '/new', status: 301 },
      { handle: 'filesystem' },
      { src: '/(.*)', dest: '/' },
    ]);
  });

  it('copies the client build to the static directory', async () => {
    await prepare();

    expect(fs.readFileSync(out('static/assets/app.js'), 'utf8')).toBe(
      'console.log("client")'
    );
  });

  it('copies the server and client builds next to the function', async () => {
    await prepare();

    expect(
      fs.existsSync(out('functions/index.func/server/entry.server.js'))
    ).toBe(true);
    expect(
      fs.existsSync(out('functions/index.func/client/assets/app.js'))
    ).toBe(true);
  });

  it('configures a Node.js function without request body pre-parsing', async () => {
    await prepare();

    expect(readJson(out('functions/index.func/.vc-config.json'))).toMatchObject(
      {
        runtime: 'nodejs22.x',
        handler: 'index.js',
        launcherType: 'Nodejs',
        // true makes Vercel drain the request body before our handler reads it.
        shouldAddHelpers: false,
      }
    );
  });

  it('generates a syntactically valid ESM handler using the configured API prefix', async () => {
    await prepare();

    const handlerPath = out('functions/index.func/index.js');
    const handler = fs.readFileSync(handlerPath, 'utf8');
    expect(handler).toContain('prefix: "/v1"');
    expect(handler).toContain(
      'export default async function handler(req, res)'
    );

    // The function's package.json is "type": "module", so this parses as ESM.
    expect(() =>
      execFileSync(process.execPath, ['--check', handlerPath])
    ).not.toThrow();
  });

  it('writes the function package.json from the project dependencies and installs them', async () => {
    await prepare();

    expect(readJson(out('functions/index.func/package.json'))).toEqual({
      type: 'module',
      dependencies: { rasengan: '^2.0.0' },
    });
    expect(execa).toHaveBeenCalledWith(
      'npm',
      ['install', '--legacy-peer-deps'],
      {
        cwd: '.vercel/output/functions/index.func',
      }
    );
  });

  it('replaces a previous .vercel/output instead of merging into it', async () => {
    write(out('static/stale.txt'), 'from a previous deploy');

    await prepare();

    expect(fs.existsSync(out('static/stale.txt'))).toBe(false);
  });
});

describe('@rasenganjs/vercel, SPA build', () => {
  beforeEach(() => fakeBuild({ ssr: false, prerender: false }));

  it('serves everything statically and falls back to index.html', async () => {
    await prepare();

    expect(readJson(out('config.json')).routes.at(-1)).toEqual({
      src: '/(.*)',
      dest: '/index.html',
    });
    expect(fs.existsSync(out('static/index.html'))).toBe(true);
    expect(fs.existsSync(out('functions'))).toBe(false);
    expect(execa).not.toHaveBeenCalled();
  });
});

describe('@rasenganjs/vercel, prerendered build', () => {
  it('ships the prerendered static/ output and no function', async () => {
    fakeBuild({ ssr: true, prerender: true });

    await prepare();

    expect(fs.readFileSync(out('static/index.html'), 'utf8')).toBe(
      '<h1>prerendered</h1>'
    );
    expect(fs.existsSync(out('functions'))).toBe(false);
    expect(execa).not.toHaveBeenCalled();
  });

  it('falls back to spa-fallback.html when a prerendered SPA ships one', async () => {
    fakeBuild(
      { ssr: false, prerender: true },
      { 'static/spa-fallback.html': '<div id="root"></div>' }
    );

    await prepare();

    expect(readJson(out('config.json')).routes.at(-1)).toEqual({
      src: '/(.*)',
      dest: '/spa-fallback.html',
    });
  });
});

describe('@rasenganjs/vercel, missing build', () => {
  it('fails with a clear error when no config.json exists', async () => {
    await expect(prepare()).rejects.toThrow('No config.json file found');
  });
});
