#!/usr/bin/env node
/**
 * Direct-invocation smoke test for @rasenganjs/futon.
 *
 * Exercises Futon.fetch() entirely in-process — no HTTP port, no
 * @rasenganjs/runtime adapter. This is the path most futon unit-level
 * changes need to verify (see src/__tests__/integration/application.test.ts
 * for the same pattern used by the real test suite).
 *
 * Imports straight from the built dist/ output via a relative path (not
 * a bare "@rasenganjs/futon" specifier) so this script works no matter
 * where it's invoked from / how pnpm has hoisted node_modules.
 *
 * Usage: node direct-invoke.mjs   (run after `pnpm --filter @rasenganjs/futon build`)
 */

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distIndex = join(__dirname, '../../../dist/index.js');

const { Futon, json, text } = await import(distIndex);

let pass = 0;
let fail = 0;

function check(label, cond, detail) {
  if (cond) {
    pass++;
    console.log(`  PASS  ${label}`);
  } else {
    fail++;
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

console.log('== futon direct-invocation smoke test (in-process, no server) ==\n');

const app = new Futon();

app.get('/hello/:name', (ctx) => json({ message: `Hello, ${ctx.params.name}!` }));
app.get('/boom', () => {
  throw new Error('exploded on purpose');
});
app.onError((err) => json({ error: err.message }, { status: 500 }));
app.notFound(() => text('nope', { status: 404 }));

// 1. Normal route + param extraction
{
  const res = await app.fetch(new Request('http://localhost/hello/Rasengan'));
  const body = await res.json();
  check(
    'GET /hello/:name returns 200 with interpolated param',
    res.status === 200 && body.message === 'Hello, Rasengan!',
    JSON.stringify(body)
  );
}

// 2. onError hook / handler, triggered without ever binding a port
{
  const res = await app.fetch(new Request('http://localhost/boom'));
  const body = await res.json();
  check(
    'GET /boom is caught by onError and returns 500 with message',
    res.status === 500 && body.error === 'exploded on purpose',
    JSON.stringify(body)
  );
}

// 3. Custom notFound handler
{
  const res = await app.fetch(new Request('http://localhost/does-not-exist'));
  const body = await res.text();
  check(
    'GET /does-not-exist hits custom notFound handler',
    res.status === 404 && body === 'nope',
    body
  );
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
