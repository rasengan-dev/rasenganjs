/**
 * Fastify server entry.
 *
 * Run with either:
 *   node --import tsx servers/fastify.ts
 *   bun servers/fastify.ts    (via Bun's node:http compat layer)
 */

import { createApp } from '../frameworks/fastify.js';

const port = Number(process.env.PORT ?? 3210);
const host = '127.0.0.1';

const app = createApp();

await app.listen({ port, host });
console.log(`[fastify] listening on http://${host}:${port}`);
