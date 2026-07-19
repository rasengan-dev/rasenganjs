/**
 * In-process framework benchmark — mitata.
 *
 * Dispatches Web API Requests straight through each framework's
 * fetch handler (no sockets), measuring pure framework overhead:
 * routing, middleware pipeline, context + Request/Response handling.
 *
 * Usage:
 *   pnpm bench:micro        # Node (tsx)
 *   pnpm bench:micro:bun    # Bun
 */

import { run, bench, group } from 'mitata';
import { frameworks } from './frameworks/index.js';
import { scenarios, makeRequest } from './scenarios.js';

// ── Sanity checks — never benchmark a 404 ───────────────────────

for (const fw of frameworks) {
  if (!fw.createFetch) continue;
  const fetch = fw.createFetch();

  for (const scenario of scenarios) {
    const res = await fetch(makeRequest(scenario));
    const body = await res.text();

    if (
      res.status !== scenario.expect.status ||
      !body.includes(scenario.expect.bodyIncludes)
    ) {
      console.error(
        `✗ ${fw.name} failed sanity check for "${scenario.id}": ` +
          `status=${res.status} body=${body.slice(0, 200)}`
      );
      process.exit(1);
    }
  }
}

console.log('✓ sanity checks passed for all frameworks\n');

// ── Benches ─────────────────────────────────────────────────────
//
// A fresh Request is created per iteration (bodies are single-use),
// so that constant cost is paid equally by every framework.

for (const scenario of scenarios) {
  group(`${scenario.id} — ${scenario.description}`, () => {
    for (const fw of frameworks) {
      const createFetch = fw.createFetch;
      if (!createFetch) continue;
      const fetch = createFetch();

      bench(fw.name, async () => {
        const res = await fetch(makeRequest(scenario));
        // Consume the body so streamed responses are fully realized
        await res.arrayBuffer();
      });
    }
  });
}

await run();
