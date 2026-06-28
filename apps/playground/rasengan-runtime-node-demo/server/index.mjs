#!/usr/bin/env node

/**
 * @rasenganjs/runtime-node — Demo server using NodeDevAdapter
 *
 * Run:   node server/index.mjs
 *        pnpm start
 */

import { NodeDevAdapter } from '@rasenganjs/runtime-node';

import app from './app.mjs';

const adapter = new NodeDevAdapter({ port: 5330 });

console.log(`\n  🟢 Rasengan Runtime Node Demo`);
console.log(`  ─────────────────────────────`);
console.log(`  http://localhost:5330`);
console.log(`  http://localhost:5330/hello/Rasengan\n`);

adapter.serve(app);


