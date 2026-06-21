import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { Application, json, text, redirect, bodyParser } from '@rasenganjs/runtime';
import { NodeDevAdapter, NodeProdAdapter, NodeAssets, NodeWatcher } from '@rasenganjs/runtime-node';

// ── NodeAssets ──────────────────────────────────────────────

describe('NodeAssets', () => {
  let tmp;
  let assets;

  before(() => {
    tmp = mkdtempSync(join(tmpdir(), 'rg-assets-'));
    assets = new NodeAssets(tmp);
  });

  it('write and read back a file', async () => {
    const data = new TextEncoder().encode('hello world');
    await assets.write('test.txt', data);

    const result = await assets.get('test.txt');
    assert(result !== null);
    assert.equal(new TextDecoder().decode(result), 'hello world');
  });

  it('returns null for missing files', async () => {
    const result = await assets.get('nope.txt');
    assert.equal(result, null);
  });

  it('creates parent directories on write', async () => {
    await assets.write('a/b/c/deep.txt', new TextEncoder().encode('deep'));
    const result = await assets.get('a/b/c/deep.txt');
    assert(result !== null);
    assert.equal(new TextDecoder().decode(result), 'deep');
  });

  it('delete removes a file', async () => {
    await assets.write('todelete.txt', new TextEncoder().encode('bye'));
    await assets.delete('todelete.txt');
    const result = await assets.get('todelete.txt');
    assert.equal(result, null);
  });

  it('delete is no-op for missing file', async () => {
    await assets.delete('never-existed.txt');
  });

  it('list returns all files recursively', async () => {
    const list = await assets.list('');
    assert(Array.isArray(list));
    assert(list.includes('test.txt'));
    assert(list.includes('a/b/c/deep.txt'));
    assert(!list.includes('a/b/c/'));
  });

  it('list with prefix filters correctly', async () => {
    const list = await assets.list('a/');
    assert(list.includes('a/b/c/deep.txt'));
    assert(!list.includes('test.txt'));
  });

  it('list on missing prefix returns empty array', async () => {
    const list = await assets.list('zzz/');
    assert.deepEqual(list, []);
  });

  it('prevents path traversal', async () => {
    await assert.rejects(() => assets.get('../etc/passwd'));
  });
});

// ── NodeWatcher ─────────────────────────────────────────────

describe('NodeWatcher', () => {
  it('watch fires callback on file change and dispose stops it', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'rg-watch-'));
    const testFile = join(tmp, 'watchme.txt');
    writeFileSync(testFile, 'initial');

    const watcher = new NodeWatcher();
    let callCount = 0;

    const dispose = watcher.watch(testFile, () => { callCount++; });

    writeFileSync(testFile, 'updated');
    await new Promise((r) => setTimeout(r, 200));

    assert(callCount >= 1, 'callback should have fired');

    dispose();
    const beforeCount = callCount;
    writeFileSync(testFile, 'final');
    await new Promise((r) => setTimeout(r, 200));
    assert.equal(callCount, beforeCount, 'callback should not fire after dispose');
  });
});

// ── NodeDevAdapter ──────────────────────────────────────────

describe('NodeDevAdapter', () => {
  let adapter;
  let started;
  const PORT = 15330;

  before(async () => {
    const app = new Application();

    app.get('/hello', () => json({ ok: true }));
    app.get('/hello/:name', (ctx) => json({ name: ctx.params.name }));
    app.post('/echo', async (ctx) => {
      const body = ctx.get('parsedBody');
      return json({ echo: body ?? null });
    });
    app.get('/redirect', () => redirect('/hello'));
    app.get('/stream', () => {
      const stream = new ReadableStream({
        start(c) {
          c.enqueue(new TextEncoder().encode('chunked'));
          c.close();
        },
      });
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain' },
      });
    });
    app.use(bodyParser());
    app.get('/crash', () => { throw new Error('demo crash'); });
    app.onError((err) => text(err.message, { status: 500 }));
    app.notFound(() => text('custom 404', { status: 404 }));

    adapter = new NodeDevAdapter({ port: PORT });
    adapter.serve(app);
    started = true;
    await new Promise((r) => setTimeout(r, 200));
  });

  after(() => {
    if (started) adapter.close();
  });

  async function get(path, init) {
    return globalThis.fetch(`http://localhost:${PORT}${path}`, init);
  }

  it('GET /hello returns 200 JSON', async () => {
    const res = await get('/hello');
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
  });

  it('GET /hello/World extracts params', async () => {
    const res = await get('/hello/World');
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { name: 'World' });
  });

  it('POST /echo echoes JSON body', async () => {
    const res = await get('/echo', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ foo: 'bar' }),
    });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { echo: { foo: 'bar' } });
  });

  it('GET /redirect returns 302', async () => {
    const res = await get('/redirect', { redirect: 'manual' });
    assert.equal(res.status, 302);
    assert.equal(res.headers.get('location'), '/hello');
  });

  it('GET /stream returns chunked response', async () => {
    const res = await get('/stream');
    assert.equal(res.status, 200);
    assert.equal(await res.text(), 'chunked');
  });

  it('unknown route returns custom 404', async () => {
    const res = await get('/nope');
    assert.equal(res.status, 404);
    assert.equal(await res.text(), 'custom 404');
  });

  it('crash route returns 500', async () => {
    const res = await get('/crash');
    assert.equal(res.status, 500);
  });
});

// ── NodeProdAdapter ─────────────────────────────────────────

describe('NodeProdAdapter', () => {
  let adapter;
  let started;
  const PORT = 15331;

  before(async () => {
    const app = new Application();
    app.get('/ping', () => text('pong'));

    adapter = new NodeProdAdapter({ port: PORT });
    adapter.serve(app);
    started = true;
    await new Promise((r) => setTimeout(r, 200));
  });

  after(() => {
    if (started) adapter.close();
  });

  it('serves requests', async () => {
    const res = await globalThis.fetch(`http://localhost:${PORT}/ping`);
    assert.equal(res.status, 200);
    assert.equal(await res.text(), 'pong');
  });

  it('assets.get returns null for non-existent paths', async () => {
    const result = await adapter.assets.get('/nonexistent-file-12345');
    assert.equal(result, null);
  });
});

// ── NodeDevAdapter auto-restart ─────────────────────────────

/**
 * Template for the entry script that the adapter spawns as a child.
 * The script creates an Application and its own HTTP server so the
 * child process is fully self-contained (nodemon-style).
 *
 * `__VERSION__` is replaced at write time with "v0", "v1", etc.
 */
function entryScript(version) {
  return [
    `import http from 'node:http';`,
    `import { Application, text } from '@rasenganjs/runtime';`,
    ``,
    `const app = new Application();`,
    `app.get('/counter', () => text('${version}'));`,
    ``,
    `const server = http.createServer(async (req, res) => {`,
    `  try {`,
    `    const url = new URL(req.url ?? '/', 'http://localhost');`,
    `    const request = new Request(url, {`,
    `      method: req.method,`,
    `      headers: Object.entries(req.headers)`,
    `        .filter(([, v]) => v !== undefined)`,
    `        .map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v]),`,
    `    });`,
    `    const response = await app.fetch(request);`,
    `    const headers = {};`,
    `    response.headers.forEach((v, k) => { headers[k] = v; });`,
    `    res.writeHead(response.status, headers);`,
    `    if (response.body) {`,
    `      const reader = response.body.getReader();`,
    `      (function pump() {`,
    `        reader.read().then(({ done, value }) => {`,
    `          if (done) res.end();`,
    `          else { res.write(value); pump(); }`,
    `        });`,
    `      })();`,
    `    } else {`,
    `      res.end();`,
    `    }`,
    `  } catch (e) {`,
    `    res.writeHead(500);`,
    `    res.end(e.message);`,
    `  }`,
    `});`,
    ``,
    `const port = parseInt(process.env.PORT || '5320', 10);`,
    `server.listen(port);`,
  ].join('\n');
}

describe('NodeDevAdapter auto-restart', () => {
  let adapter;
  let started;
  const PORT = 15332;
  const testDir = join(__dirname, '..', 'tmp-restart-test');
  let entryPath;

  before(async () => {
    rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
    entryPath = join(testDir, 'app.mjs');

    writeFileSync(entryPath, entryScript('v0'));

    adapter = new NodeDevAdapter({ port: PORT });
    adapter.serve(null, {
      watch: { path: testDir },
      autoRestart: { entry: entryPath },
    });
    started = true;
    await new Promise((r) => setTimeout(r, 500));
  });

  after(() => {
    if (started) adapter.close();
    rmSync(testDir, { recursive: true, force: true });
  });

  it('serves initial app', async () => {
    const res = await globalThis.fetch(`http://localhost:${PORT}/counter`);
    assert.equal(res.status, 200);
    assert.equal(await res.text(), 'v0');
  });

  it('restarts on file change with fresh process', async () => {
    writeFileSync(entryPath, entryScript('v1'));
    await new Promise((r) => setTimeout(r, 1000));

    const res = await globalThis.fetch(`http://localhost:${PORT}/counter`);
    // Allow one retry if the child is still starting up
    if (res.status !== 200) {
      await new Promise((r) => setTimeout(r, 500));
      const res2 = await globalThis.fetch(`http://localhost:${PORT}/counter`);
      assert.equal(res2.status, 200);
      assert.equal(await res2.text(), 'v1');
    } else {
      assert.equal(await res.text(), 'v1');
    }
  });

  it('restarts again on subsequent change', async () => {
    writeFileSync(entryPath, entryScript('v2'));
    await new Promise((r) => setTimeout(r, 1000));

    const res = await globalThis.fetch(`http://localhost:${PORT}/counter`);
    if (res.status !== 200) {
      await new Promise((r) => setTimeout(r, 500));
      const res2 = await globalThis.fetch(`http://localhost:${PORT}/counter`);
      assert.equal(res2.status, 200);
      assert.equal(await res2.text(), 'v2');
    } else {
      assert.equal(await res.text(), 'v2');
    }
  });
});
