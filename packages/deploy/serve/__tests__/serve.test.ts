import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import {
  buildFixture,
  cliPath,
  fixtureDir,
  rawGet,
  startServer,
  tsxBin,
  type RunningServer,
} from './helpers';

let server: RunningServer;
let baseUrl: string;

/** Markup inside `<div id="root">`, before the router hydration script. */
function renderedRoot(html: string): string {
  const start = html.indexOf('<div id="root">');
  const end = html.indexOf('<script>window.__staticRouterHydrationData');
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return html.slice(start + '<div id="root">'.length, end);
}

beforeAll(async () => {
  buildFixture({ prerender: false });
  server = await startServer('dist');
  baseUrl = server.baseUrl;
});

afterAll(() => server?.stop());

describe('rasengan-serve, SSR build', () => {
  it('prints the running banner with the served port', () => {
    expect(server.output()).toContain('Rasengan v');
    expect(server.output()).toContain(new URL(baseUrl).port);
  });

  it('renders the layout and the page inside #root', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: { Accept: 'text/html' },
    });

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');

    // A build that bundled its own react-router copy rendered only the
    // hydration script here, with an empty root and no error.
    const root = renderedRoot(await res.text());
    expect(root).toContain('Fixture layout');
    expect(root).toContain('<h1>Fixture home page</h1>');
  });

  it('renders loader props on the server', async () => {
    const res = await fetch(`${baseUrl}/data`, {
      headers: { Accept: 'text/html' },
    });

    expect(res.status).toBe(200);
    expect(renderedRoot(await res.text())).toContain(
      '<p id="loader-message">loaded on the server</p>'
    );
  });

  it('renders a nested route', async () => {
    const res = await fetch(`${baseUrl}/docs/intro`, {
      headers: { Accept: 'text/html' },
    });

    expect(res.status).toBe(200);
    expect(renderedRoot(await res.text())).toContain(
      '<h1>Fixture docs intro</h1>'
    );
  });

  it('answers .data requests with the loader JSON', async () => {
    const res = await fetch(`${baseUrl}/data.data`);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('application/json');
    expect(await res.json()).toMatchObject({
      props: { message: 'loaded on the server' },
      meta: { title: 'Fixture data' },
    });
  });

  it('answers Accept: application/json requests with the loader JSON', async () => {
    const res = await fetch(`${baseUrl}/data`, {
      headers: { Accept: 'application/json' },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      props: { message: 'loaded on the server' },
    });
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

  it('returns 404 for an unknown route', async () => {
    const res = await fetch(`${baseUrl}/does-not-exist`, {
      headers: { Accept: 'text/html' },
    });

    expect(res.status).toBe(404);
  });

  it('serves hashed assets with long-lived caching and revalidates them', async () => {
    const html = await (
      await fetch(`${baseUrl}/`, { headers: { Accept: 'text/html' } })
    ).text();
    const asset = html.match(/\/assets\/[^"]+\.js/)?.[0];
    expect(asset).toBeDefined();

    const res = await fetch(`${baseUrl}${asset}`);
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe(
      'public, max-age=31536000, immutable'
    );
    const etag = res.headers.get('etag');
    expect(etag).toBeTruthy();

    const revalidated = await fetch(`${baseUrl}${asset}`, {
      headers: { 'If-None-Match': etag! },
    });
    expect(revalidated.status).toBe(304);
  });

  it('serves files from public/', async () => {
    const res = await fetch(`${baseUrl}/hello.txt`);

    expect(res.status).toBe(200);
    expect(await res.text()).toBe('hello from public\n');
  });

  it('does not serve files outside public/ through encoded dot segments', async () => {
    const res = await rawGet(baseUrl, '/%2e%2e/package.json');

    expect(res.status).not.toBe(200);
    expect(res.body).not.toContain('rasengan-serve-test-fixture');
  });

  it('compresses document responses when the client accepts gzip', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: { Accept: 'text/html', 'Accept-Encoding': 'gzip' },
    });

    expect(res.headers.get('content-encoding')).toBe('gzip');
  });
});

describe('rasengan-serve, usage errors', () => {
  it('exits with a usage message when no build path is given', () => {
    let error: { status?: number; stderr?: Buffer } | undefined;
    try {
      execFileSync(tsxBin, [cliPath], { cwd: fixtureDir, stdio: 'pipe' });
    } catch (caught) {
      error = caught as typeof error;
    }

    expect(error?.status).toBe(1);
    expect(error?.stderr?.toString()).toContain('Usage: rasengan-serve');
  });
});
