/**
 * Framework registry — the single place to add a framework to
 * the benchmark suite.
 *
 * To add one (e.g. Koa):
 *   1. Create frameworks/<name>.ts building the shared scenarios
 *      (see scenarios.ts for the contract).
 *   2. Create servers/<name>.ts starting a real HTTP server on
 *      process.env.PORT.
 *   3. Register it below. `createFetch` is optional — frameworks
 *      without a WinterCG fetch API (Koa, Express) are skipped by
 *      the in-process bench and only measured over HTTP.
 */

import { createFetch as futonFetch } from './futon.js';
import { createFetch as honoFetch } from './hono.js';

export type BenchRuntime = 'node' | 'bun';

export interface BenchFramework {
  name: string;
  /** In-process WinterCG dispatch; omit for non-fetch frameworks. */
  createFetch?: () => (req: Request) => Promise<Response>;
  /** Server entry spawned by load.ts, relative to bench/http/. */
  serverEntry: string;
  /** Runtimes the server entry supports. */
  runtimes: BenchRuntime[];
}

export const frameworks: BenchFramework[] = [
  {
    name: 'futon',
    createFetch: futonFetch,
    serverEntry: 'servers/futon.ts',
    runtimes: ['node', 'bun'],
  },
  {
    name: 'hono',
    createFetch: honoFetch,
    serverEntry: 'servers/hono.ts',
    runtimes: ['node', 'bun'],
  },
  {
    // No createFetch — Express isn't fetch-based, so it only
    // appears in the HTTP benchmark, and only on Node.
    name: 'express',
    serverEntry: 'servers/express.ts',
    runtimes: ['node'],
  },
  {
    // HTTP-only; on Bun it runs through the node:http compat layer
    name: 'koa',
    serverEntry: 'servers/koa.ts',
    runtimes: ['node', 'bun'],
  },
  {
    // HTTP-only; on Bun it runs through the node:http compat layer
    name: 'fastify',
    serverEntry: 'servers/fastify.ts',
    runtimes: ['node', 'bun'],
  },
];
