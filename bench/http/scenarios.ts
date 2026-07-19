/**
 * Shared scenario definitions for the HTTP framework benchmark.
 *
 * Every framework adapter (frameworks/*.ts) must register the exact
 * same route table and behave identically for each scenario, so both
 * the in-process (mitata) and HTTP (autocannon) benchmarks compare
 * framework overhead — not application differences.
 */

// ── Route table ─────────────────────────────────────────────────
//
// A realistic mid-sized API surface: static + dynamic routes.
// The `routing` scenario targets a dynamic route registered late
// in the table so linear-ish routers pay their worst-case cost.

export interface RouteDef {
  method: 'GET' | 'POST';
  pattern: string; // `:param` syntax — shared by futon and Hono
}

export const MIDDLEWARE_COUNT = 8;

export function buildRouteTable(): RouteDef[] {
  const routes: RouteDef[] = [];

  // 20 static resource routes
  for (let i = 0; i < 20; i++) {
    routes.push({ method: 'GET', pattern: `/api/resource-${i}` });
  }

  // 20 dynamic routes across a few shapes
  for (let i = 0; i < 10; i++) {
    routes.push({ method: 'GET', pattern: `/api/items-${i}/:id` });
    routes.push({ method: 'GET', pattern: `/api/shops-${i}/:shopId/products` });
  }

  // The routing-scenario target, registered near the end
  routes.push({ method: 'GET', pattern: '/users/:id/posts/:postId' });

  return routes;
}

// ── Scenarios ───────────────────────────────────────────────────

export interface Scenario {
  id: string;
  description: string;
  method: 'GET' | 'POST';
  path: string;
  body?: string;
  headers?: Record<string, string>;
  /** Sanity check before benchmarking — guards against timing a 404. */
  expect: { status: number; bodyIncludes: string };
}

export const POST_PAYLOAD = JSON.stringify({
  name: 'Naruto Uzumaki',
  village: 'Konoha',
  rank: 'Hokage',
});

export const scenarios: Scenario[] = [
  {
    id: 'hello',
    description: 'Hello world — single GET returning small JSON',
    method: 'GET',
    path: '/',
    expect: { status: 200, bodyIncludes: '"message":"ok"' },
  },
  {
    id: 'routing',
    description: `Dynamic route lookup in a ${buildRouteTable().length}-route table`,
    method: 'GET',
    path: '/users/42/posts/777',
    expect: { status: 200, bodyIncludes: '"postId":"777"' },
  },
  {
    id: 'middleware',
    description: `Route behind ${MIDDLEWARE_COUNT} pass-through middlewares`,
    method: 'GET',
    path: '/mw',
    expect: { status: 200, bodyIncludes: '"mw":true' },
  },
  {
    id: 'post-json',
    description: 'POST JSON body — parse and echo one field back',
    method: 'POST',
    path: '/echo',
    body: POST_PAYLOAD,
    headers: { 'content-type': 'application/json' },
    expect: { status: 200, bodyIncludes: '"name":"Naruto Uzumaki"' },
  },
];

// ── Request factory (in-process benches) ────────────────────────

export function makeRequest(
  scenario: Scenario,
  origin = 'http://localhost'
): Request {
  return new Request(origin + scenario.path, {
    method: scenario.method,
    headers: scenario.headers,
    body: scenario.body,
  });
}
