import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  buildFixture,
  fixtureDir,
  rawGet,
  startServer,
  type RunningServer,
} from './helpers';

let server: RunningServer;
let baseUrl: string;

const html = (url: string) =>
  fetch(`${baseUrl}${url}`, { headers: { Accept: 'text/html' } });

beforeAll(async () => {
  buildFixture({ prerender: true });
  server = await startServer('static');
  baseUrl = server.baseUrl;
});

afterAll(() => server?.stop());

describe('rasengan-serve, prerendered build', () => {
  it('builds the pages this suite relies on', () => {
    for (const file of [
      'index.html',
      'docs/intro/index.html',
      'data/index.html',
      'spa-fallback.html',
    ]) {
      expect(fs.existsSync(path.join(fixtureDir, 'static', file))).toBe(true);
    }
  });

  it('serves the prerendered home page', async () => {
    const res = await html('/');

    expect(res.status).toBe(200);
    expect(await res.text()).toContain('<h1>Fixture home page</h1>');
  });

  // The site's own links have no trailing slash: these used to fall
  // through to the SSR handler, which has no server bundle to load in a
  // prerendered build, and answered 500.
  it.each(['/docs/intro', '/docs/intro/'])(
    'serves the prerendered page for %s',
    async (url) => {
      const res = await html(url);

      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toContain('text/html');
      expect(await res.text()).toContain('<h1>Fixture docs intro</h1>');
    }
  );

  it('serves loader output that was rendered at build time', async () => {
    const res = await html('/data');

    expect(res.status).toBe(200);
    expect(await res.text()).toContain('loaded on the server');
  });

  it('serves the SPA shell for a path with no prerendered page', async () => {
    const res = await html('/not-prerendered');
    const shell = fs.readFileSync(
      path.join(fixtureDir, 'static', 'spa-fallback.html'),
      'utf8'
    );

    // Routes left out of prerender.routes are rendered by the client
    // router from this shell.
    expect(res.status).toBe(200);
    expect(await res.text()).toBe(shell);
    expect(server.output()).not.toContain('Cannot find module');
  });

  it('applies config redirects to their exact source only', async () => {
    const redirected = await fetch(`${baseUrl}/docs`, { redirect: 'manual' });
    expect(redirected.status).toBe(301);
    expect(new URL(redirected.headers.get('location')!, baseUrl).pathname).toBe(
      '/docs/intro'
    );

    // The destination contains the source: a substring match looped here.
    const destination = await fetch(`${baseUrl}/docs/intro`, {
      redirect: 'manual',
      headers: { Accept: 'text/html' },
    });
    expect(destination.status).toBe(200);
  });

  it('serves hashed assets', async () => {
    const page = await (await html('/')).text();
    const asset = page.match(/\/assets\/[^"]+\.js/)?.[0];
    expect(asset).toBeDefined();

    const res = await fetch(`${baseUrl}${asset}`);
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toContain('immutable');
  });

  it('never resolves a page outside the build directory', async () => {
    const res = await rawGet(baseUrl, '/%2e%2e/%2e%2e/package.json');

    expect(res.body).not.toContain('rasengan-serve-test-fixture');
  });
});
