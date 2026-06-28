#!/usr/bin/env bun

import { BunDevAdapter } from '@rasenganjs/runtime-bun';
import app from './app.mjs';

const adapter = new BunDevAdapter({ port: 5330 });

console.log(`\n  🟢 Rasengan Runtime Bun Demo`);
console.log(`  ─────────────────────────────`);
console.log(`  http://localhost:5330`);
console.log(`  http://localhost:5330/hello/Rasengan\n`);

adapter.serve(app, {
    watch: {
        path: "./server",
        callback: () => {
            console.log("File changed");
        }
    }
});
