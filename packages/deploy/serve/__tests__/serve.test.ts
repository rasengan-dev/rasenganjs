import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { execFileSync, spawn, type ChildProcess } from 'node:child_process';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtureDir = path.join(here, 'fixture');
const cliPath = path.resolve(here, '..', 'cli.ts');
const repoRoot = path.resolve(here, '..', '..', '..', '..');
const tsxBin = path.join(repoRoot, 'node_modules', '.bin', 'tsx');
const rasenganBin = path.join(fixtureDir, 'node_modules', '.bin', 'rasengan');

let server: ChildProcess;
let output = '';
let baseUrl: string;

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, () => {
      const { port } = probe.address() as net.AddressInfo;
      probe.close(() => resolve(port));
    });
  });
}

/** Starts the CLI from source and resolves once it reports it is listening. */
function startServer(args: string[]): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const child = spawn(tsxBin, [cliPath, ...args], {
      cwd: fixtureDir,
      env: { ...process.env, NODE_ENV: 'production' },
    });

    const onData = (chunk: Buffer) => {
      output += chunk.toString();
      if (output.includes('running')) resolve(child);
    };
    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    child.once('error', reject);
    child.once('exit', (code) =>
      reject(new Error(`rasengan-serve exited early (${code}):\n${output}`))
    );
  });
}

/**
 * GET with the path sent byte for byte. `fetch` normalizes dot segments
 * (including `%2e%2e`) before sending, which would hide traversal attempts.
 */
function rawGet(rawPath: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const { hostname, port } = new URL(baseUrl);
    const req = http.get({ hostname, port, path: rawPath }, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
    });
    req.once('error', reject);
  });
}

/** Markup inside `<div id="root">`, before the router hydration script. */
function renderedRoot(html: string): string {
  const start = html.indexOf('<div id="root">');
  const end = html.indexOf('<script>window.__staticRouterHydrationData');
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return html.slice(start + '<div id="root">'.length, end);
}

beforeAll(async () => {
  execFileSync(rasenganBin, ['build'], { cwd: fixtureDir, stdio: 'pipe' });

  const port = await freePort();
  baseUrl = `http://localhost:${port}`;
  server = await startServer(['dist', '--port', String(port)]);
});

afterAll(async () => {
  if (!server || server.exitCode !== null) return;
  const exited = new Promise((resolve) => server.once('exit', resolve));
  server.kill('SIGTERM');
  await exited;
});

describe('rasengan-serve, SSR build', () => {
  it('prints the running banner with the served port', () => {
    expect(output).toContain('Rasengan v');
    expect(output).toContain(new URL(baseUrl).port);
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
    const res = await rawGet('/%2e%2e/package.json');

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
