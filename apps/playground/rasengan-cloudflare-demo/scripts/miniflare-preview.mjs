// Simulates the Cloudflare build locally via Miniflare (the same
// workerd-based simulator wrangler dev uses internally), driven
// directly off the artifacts @rasenganjs/cloudflare's prepare() step
// already generates — no wrangler CLI involved.
//
// Run `pnpm run build` first, then `node scripts/miniflare-preview.mjs`.

import { Miniflare } from 'miniflare';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cwd = path.resolve(fileURLToPath(import.meta.url), '../..');

const workerPath = path.join(cwd, '.cloudflare/worker.js');
const assetsPath = path.join(cwd, '.cloudflare/assets');

const scriptExists = await readFile(workerPath, 'utf-8').catch(() => null);
if (!scriptExists) {
  console.error(
    `[miniflare-preview] ${workerPath} not found. Run \`pnpm run build\` first.`
  );
  process.exit(1);
}

const wranglerToml = await readFile(
  path.join(cwd, 'wrangler.toml'),
  'utf-8'
).catch(() => null);
const declaredDate = wranglerToml?.match(
  /compatibility_date\s*=\s*"(\d{4}-\d{2}-\d{2})"/
)?.[1];

function buildOptions(compatibilityDate) {
  return {
    scriptPath: workerPath,
    modules: true,
    compatibilityDate,
    compatibilityFlags: ['nodejs_compat'],
    assets: {
      directory: assetsPath,
      binding: 'ASSETS',
      assetOptions: { not_found_handling: 'none' },
    },
  };
}

async function start(compatibilityDate) {
  const mf = new Miniflare(buildOptions(compatibilityDate));
  await mf.ready;
  return mf;
}

let mf;
try {
  mf = await start(declaredDate ?? '2026-01-01');
} catch (err) {
  // The pinned local workerd binary lags behind wrangler.toml's
  // (today-dated) compatibility_date — expected, since Miniflare/workerd
  // ship on their own release cadence. Not a bug in the generated
  // wrangler.toml itself: a real `wrangler deploy` runs against
  // Cloudflare's own up-to-date edge runtime, not this local binary.
  const supportedDate = String(err?.message ?? '').match(
    /newest date supported by this server binary is "(\d{4}-\d{2}-\d{2})"/
  )?.[1];

  if (!supportedDate) throw err;

  console.warn(
    `[miniflare-preview] Local workerd binary only supports compatibility_date up to ${supportedDate} ` +
      `(wrangler.toml declares ${declaredDate}). Falling back to ${supportedDate} for this local preview only.`
  );
  mf = await start(supportedDate);
}

const url = await mf.ready;
console.log(`[miniflare-preview] Worker + assets running at ${url}`);
console.log('[miniflare-preview] Ctrl+C to stop.');

process.on('SIGINT', async () => {
  await mf.dispose();
  process.exit(0);
});
