import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { render } from '../../entries/server/entry.server.js';
import type { BuildOptions } from '../../server/build/index.js';

// entry.server.tsx's `render()` dynamically imports the app's main.js/
// template.js — either from `${process.cwd()}/src/{main,template}` (dev
// mode, no buildOptions) or from a `buildOptions`-relative path (prod
// mode). We use the prod/buildOptions branch here with real temp fixture
// files (no mocking of the module loader), resolving a real absolute path
// to the workspace's own "react" install so the fixtures can use
// React.createElement without a node_modules tree of their own.
let dir: string;
let buildOptions: BuildOptions;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'rasengan-entry-server-'));
  mkdirSync(join(dir, 'dist/server'), { recursive: true });
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }));

  writeFileSync(
    join(dir, 'dist/server/main.js'),
    `
    export default function App({ Component, children }) {
      return Component({ children });
    }
    `
  );

  const reactPath = import.meta.resolve('react');
  writeFileSync(
    join(dir, 'dist/server/template.js'),
    `
    import React from '${reactPath}';
    export default function Template({ Head, Body, Script }) {
      return React.createElement(
        'html',
        null,
        React.createElement(Head, { key: 'head' }),
        React.createElement(Body, { key: 'body' }),
        React.createElement(Script, { key: 'script' })
      );
    }
    `
  );

  buildOptions = {
    buildDirectory: join(dir, 'dist'),
    staticDirectory: 'static',
    manifestPathDirectory: '.vite',
    assetPathDirectory: 'assets',
    clientPathDirectory: 'client',
    serverPathDirectory: 'server',
    entryServerPath: 'entry.server.js',
  };
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

const metadata = {
  page: { title: 'Test Page', description: '' },
  layout: {},
};

describe('render (entry.server.tsx)', () => {
  it('stream=true returns a streamed Response with the requested status code', async () => {
    const response = await render(
      <p>routed</p>,
      { metadata, buildOptions, statusCode: 201 },
      true
    );

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(201);

    const body = await response.text();
    expect(body).toContain('Test Page');
  });

  it('stream=false returns a fully-rendered HTML Response', async () => {
    const response = await render(
      <p>routed</p>,
      { metadata, buildOptions, statusCode: 200 },
      false
    );

    const body = await response.text();
    expect(body.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(body).toContain('Test Page');
  });

  it('forwards custom response headers', async () => {
    const response = await render(
      <p>routed</p>,
      {
        metadata,
        buildOptions,
        statusCode: 200,
        responseHeaders: { 'x-custom': 'yes' },
      },
      false
    );

    expect(response.headers.get('x-custom')).toBe('yes');
  });
});
