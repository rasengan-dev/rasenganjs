#!/usr/bin/env bun

/**
 * @rasenganjs/runtime — Bun demo server
 *
 * Bun.serve() speaks Web API natively — Request in, Response out.
 * No adapter required since `Futon.fetch()` already returns
 * a standard Response.
 *
 * Run:   bun server/bun.mjs
 *        pnpm start:bun
 */

import demo from "./app.mjs";

const PORT = process.env.PORT || 5322;

Bun.serve({
  port: PORT,
  fetch(request) {
    return demo.fetch(request);
  },
});

console.log(`\n  🟢 Rasengan Runtime Demo (Bun)`);
console.log(`  ────────────────────────────────`);
console.log(`  http://localhost:${PORT}`);
console.log(`  http://localhost:${PORT}/hello/Rasengan`);
console.log(`  http://localhost:${PORT}/api/users`);
console.log(`  http://localhost:${PORT}/stream\n`);
