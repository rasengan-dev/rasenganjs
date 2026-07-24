/**
 * HTTP load benchmark — autocannon.
 *
 * For each registered framework:
 *   1. Spawns its server entry as a separate child process
 *      (fair JIT isolation) on the chosen runtime
 *   2. Waits for readiness + verifies every scenario over HTTP
 *   3. Warms up, then runs autocannon per scenario
 *   4. Kills the server before moving to the next framework
 *
 * Usage:
 *   pnpm bench:http                        # Node servers
 *   pnpm bench:http:bun                    # Bun servers (driver stays Node)
 *   tsx http/load.ts --runtime node --duration 5 --connections 50
 *   tsx http/load.ts --frameworks futon,hono
 */

import { spawn, type ChildProcess } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autocannon from 'autocannon';

import { frameworks, type BenchRuntime } from './frameworks/index.js';
import { scenarios, type Scenario } from './scenarios.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BASE_PORT = 3210;

// ── CLI args ────────────────────────────────────────────────────

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const runtime = arg('runtime', 'node') as BenchRuntime;
const duration = Number(arg('duration', '10'));
const warmupDuration = Number(arg('warmup', '2'));
const connections = Number(arg('connections', '100'));
const only = arg('frameworks', '').split(',').filter(Boolean);

if (runtime !== 'node' && runtime !== 'bun') {
  console.error(`Unknown runtime "${runtime}" — expected node|bun`);
  process.exit(1);
}

const selected = frameworks.filter(
  (fw) =>
    fw.runtimes.includes(runtime) &&
    (only.length === 0 || only.includes(fw.name))
);

if (selected.length === 0) {
  console.error('No frameworks match the given --frameworks/--runtime filters');
  process.exit(1);
}

// ── Server lifecycle ────────────────────────────────────────────

function startServer(entry: string, port: number): ChildProcess {
  const entryPath = path.join(HERE, entry);
  const env = { ...process.env, PORT: String(port), NODE_ENV: 'production' };

  const child =
    runtime === 'bun'
      ? spawn('bun', [entryPath], {
          env,
          stdio: ['ignore', 'ignore', 'inherit'],
        })
      : spawn(process.execPath, ['--import', 'tsx', entryPath], {
          cwd: path.dirname(HERE), // bench/ — so `tsx` resolves from bench/node_modules
          env,
          stdio: ['ignore', 'ignore', 'inherit'],
        });

  child.on('error', (err) => {
    console.error(`Failed to start server (${entry}):`, err.message);
    process.exit(1);
  });

  return child;
}

async function waitReady(base: string, timeoutMs = 20_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(base + '/');
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`Server at ${base} did not become ready in ${timeoutMs}ms`);
}

async function stopServer(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null) return;
  const exited = new Promise<void>((resolve) =>
    child.once('exit', () => resolve())
  );
  child.kill('SIGTERM');
  const timeout = new Promise<void>((resolve) =>
    setTimeout(() => {
      child.kill('SIGKILL');
      resolve();
    }, 3_000)
  );
  await Promise.race([exited, timeout]);
}

// ── Measurement ─────────────────────────────────────────────────

interface ScenarioResult {
  scenario: string;
  reqPerSec: number;
  latencyAvgMs: number;
  latencyP50Ms: number;
  latencyP99Ms: number;
  non2xx: number;
  errors: number;
}

async function verifyScenario(base: string, scenario: Scenario): Promise<void> {
  const res = await fetch(base + scenario.path, {
    method: scenario.method,
    headers: scenario.headers,
    body: scenario.body,
  });
  const body = await res.text();
  if (
    res.status !== scenario.expect.status ||
    !body.includes(scenario.expect.bodyIncludes)
  ) {
    throw new Error(
      `Sanity check failed for "${scenario.id}": status=${res.status} body=${body.slice(0, 200)}`
    );
  }
}

async function cannon(
  base: string,
  scenario: Scenario,
  seconds: number
): Promise<autocannon.Result> {
  return autocannon({
    url: base + scenario.path,
    method: scenario.method,
    headers: scenario.headers,
    body: scenario.body,
    connections,
    pipelining: 1,
    duration: seconds,
  });
}

async function benchFramework(
  name: string,
  entry: string,
  port: number
): Promise<ScenarioResult[]> {
  const base = `http://127.0.0.1:${port}`;
  console.log(`\n▸ ${name} (${runtime}) — starting ${entry} on :${port}`);

  const child = startServer(entry, port);
  try {
    await waitReady(base);
    for (const scenario of scenarios) await verifyScenario(base, scenario);
    console.log(`  ✓ ready, all scenarios verified`);

    const results: ScenarioResult[] = [];
    for (const scenario of scenarios) {
      await cannon(base, scenario, warmupDuration); // warmup, discarded
      const r = await cannon(base, scenario, duration);

      results.push({
        scenario: scenario.id,
        reqPerSec: Math.round(r.requests.average),
        latencyAvgMs: r.latency.average,
        latencyP50Ms: r.latency.p50,
        latencyP99Ms: r.latency.p99,
        non2xx: r.non2xx,
        errors: r.errors,
      });
      console.log(
        `  ${scenario.id.padEnd(12)} ${Math.round(r.requests.average).toLocaleString()} req/s`
      );
    }
    return results;
  } finally {
    await stopServer(child);
  }
}

// ── Run ─────────────────────────────────────────────────────────

console.log('══════════════════════════════════════════════════════════');
console.log(`  HTTP Benchmark — runtime: ${runtime}`);
console.log(`  ${duration}s per scenario, ${connections} connections`);
console.log('══════════════════════════════════════════════════════════');

const allResults: Record<string, ScenarioResult[]> = {};

for (let i = 0; i < selected.length; i++) {
  const fw = selected[i];
  allResults[fw.name] = await benchFramework(
    fw.name,
    fw.serverEntry,
    BASE_PORT + i
  );
}

// ── Report ──────────────────────────────────────────────────────

function pad(s: string, w: number): string {
  return s.padEnd(w);
}

console.log('\n══════════════════════════════════════════════════════════');
console.log('  Results');
console.log('══════════════════════════════════════════════════════════');

for (const scenario of scenarios) {
  console.log(`\n▸ ${scenario.id} — ${scenario.description}\n`);
  console.log(
    pad('Framework', 14) +
      pad('Req/s', 14) +
      pad('Avg (ms)', 12) +
      pad('p50 (ms)', 12) +
      pad('p99 (ms)', 12) +
      'vs best'
  );
  console.log('─'.repeat(72));

  const rows = selected
    .map((fw) => ({
      name: fw.name,
      r: allResults[fw.name].find((x) => x.scenario === scenario.id)!,
    }))
    .sort((a, b) => b.r.reqPerSec - a.r.reqPerSec);

  const best = rows[0].r.reqPerSec;
  for (const { name, r } of rows) {
    const flag =
      r.non2xx > 0 || r.errors > 0
        ? `  ⚠ non2xx=${r.non2xx} errors=${r.errors}`
        : '';
    console.log(
      pad(name, 14) +
        pad(r.reqPerSec.toLocaleString(), 14) +
        pad(r.latencyAvgMs.toFixed(2), 12) +
        pad(r.latencyP50Ms.toFixed(1), 12) +
        pad(r.latencyP99Ms.toFixed(1), 12) +
        (r.reqPerSec === best
          ? '1.00x'
          : `${(r.reqPerSec / best).toFixed(2)}x`) +
        flag
    );
  }
}

// ── Snapshot ────────────────────────────────────────────────────

const snapshotPath = path.join(HERE, `results-${runtime}.json`);
writeFileSync(
  snapshotPath,
  JSON.stringify(
    {
      date: new Date().toISOString(),
      runtime,
      driver: `node ${process.version}`,
      cpu: os.cpus()[0]?.model ?? 'unknown',
      settings: { duration, connections, pipelining: 1 },
      results: allResults,
    },
    null,
    2
  )
);
console.log(
  `\nSnapshot written to ${path.relative(process.cwd(), snapshotPath)}\n`
);
