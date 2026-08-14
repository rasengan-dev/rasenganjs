import { resolveBuildOptions } from 'rasengan/server';
import { AdapterConfig, AdapterOptions, Adapters } from 'rasengan/plugin';
import { OptimizedAppConfig } from 'rasengan';
import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import { createRequire } from 'node:module';
import * as esbuild from 'esbuild';

/* -------------------------------------------------------------------------- */
/*                        CLOUDFLARE BUILD OPTIONS                            */
/* -------------------------------------------------------------------------- */

interface CloudflareBuildOptions {
  baseDirectory: string; // .cloudflare
  assetsDirectory: string; // .cloudflare/assets
  workerEntrySource: string; // .cloudflare/worker-entry.mjs
  workerBundleOutput: string; // .cloudflare/worker.js
  wranglerConfigFile: string; // wrangler.toml
}

const getCloudflareBuildOptions = (): CloudflareBuildOptions => ({
  baseDirectory: '.cloudflare',
  assetsDirectory: '.cloudflare/assets',
  workerEntrySource: '.cloudflare/worker-entry.mjs',
  workerBundleOutput: '.cloudflare/worker.js',
  wranglerConfigFile: 'wrangler.toml',
});

const checkCloudflareDirectory = async (opts: CloudflareBuildOptions) => {
  try {
    await fs.access(opts.baseDirectory);
    return true;
  } catch {
    return false;
  }
};

/**
 * Same check `@rasenganjs/vercel`/`@rasenganjs/netlify` already use:
 * `dist/server/**` only exists when the `ssr` environment itself gets
 * built, which never happens when `prerender` is enabled. SPA/SSG
 * deploys are pure static hosting through Workers Assets — no Worker
 * script at all (RFC-0009 Goals).
 */
const needsWorker = (config: OptimizedAppConfig) =>
  Boolean(config.ssr) && !config.prerender;

/* -------------------------------------------------------------------------- */
/*                            DIRECTORY GENERATION                            */
/* -------------------------------------------------------------------------- */

const generateCloudflareDirectory = async (opts: CloudflareBuildOptions) => {
  if (await checkCloudflareDirectory(opts)) {
    await fs.rm(opts.baseDirectory, { recursive: true });
  }

  await fs.mkdir(opts.assetsDirectory, { recursive: true });
};

/* -------------------------------------------------------------------------- */
/*                           STATIC FILES COPY                                */
/* -------------------------------------------------------------------------- */

/**
 * Same directory-selection logic `@rasenganjs/vercel`'s/`@rasenganjs/netlify`'s
 * `copyStaticFiles()` already implement — served directly by Cloudflare's
 * edge CDN through the `[assets]` binding, never touching the Worker at
 * all for a matched path.
 */
const copyStaticFiles = async (
  config: OptimizedAppConfig,
  opts: CloudflareBuildOptions
) => {
  const buildOptions = resolveBuildOptions({});

  const sourceDir = config.prerender
    ? buildOptions.staticDirectory
    : config.ssr
      ? path.posix.join(
          buildOptions.buildDirectory,
          buildOptions.clientPathDirectory
        )
      : buildOptions.buildDirectory;

  await fs.cp(sourceDir, opts.assetsDirectory, { recursive: true });
};

/* -------------------------------------------------------------------------- */
/*             RESOLVE rasengan's OWN TRANSITIVE DEPENDENCIES                 */
/* -------------------------------------------------------------------------- */

/**
 * The generated Worker entry imports `@rasenganjs/futon` and
 * `@rasenganjs/runtime/adapters/workerd` directly — transitive
 * dependencies of `rasengan` itself, not of the consuming app. Under
 * pnpm's strict `node_modules` isolation those bare specifiers aren't
 * resolvable from a file sitting at the app's own root (same problem
 * `@rasenganjs/netlify`'s `generatePackageJson()`/`runInstall()` solve
 * differently — a self-contained `npm install`, which works there
 * because Netlify's zip-based function packaging tolerates a second
 * package manager; there's no equivalent step here since everything
 * gets bundled into one file before `wrangler deploy` ever runs).
 *
 * Resolved here instead: `createRequire`, anchored at the app's own
 * installed `rasengan` package, walks Node's CJS resolution algorithm
 * from *there* — exactly as if this code were `rasengan` itself
 * resolving its own dependency — and finds `@rasenganjs/futon`/
 * `@rasenganjs/runtime` correctly regardless of the app's own
 * dependency list. The generated entry then imports these by their
 * resolved absolute path instead of the bare specifier, so esbuild's
 * default resolution (no custom plugin needed) just follows a real path.
 */
const resolveRasenganTransitiveDep = (cwd: string, specifier: string) => {
  const rasenganPackageJson = path.join(
    cwd,
    'node_modules',
    'rasengan',
    'package.json'
  );
  const requireFromRasengan = createRequire(rasenganPackageJson);
  return requireFromRasengan.resolve(specifier);
};

/* -------------------------------------------------------------------------- */
/*                       GENERATED WORKER ENTRY SOURCE                        */
/* -------------------------------------------------------------------------- */

/** POSIX-style relative import specifier from `fromFile`'s directory to `toFile`. */
const relImport = (fromFile: string, toFile: string) => {
  const rel = path.posix.relative(path.posix.dirname(fromFile), toFile);
  return rel.startsWith('.') ? rel : `./${rel}`;
};

const generateWorkerEntrySource = async (
  cwd: string,
  config: OptimizedAppConfig,
  opts: CloudflareBuildOptions
) => {
  const buildOptions = resolveBuildOptions({});
  const entryPath = path.resolve(cwd, opts.workerEntrySource);

  const distServerDir = path.resolve(
    cwd,
    buildOptions.buildDirectory,
    buildOptions.serverPathDirectory
  );
  const configJsonPath = path.resolve(
    cwd,
    buildOptions.buildDirectory,
    buildOptions.clientPathDirectory,
    buildOptions.assetPathDirectory,
    'config.json'
  );
  const manifestJsonPath = path.resolve(
    cwd,
    buildOptions.buildDirectory,
    buildOptions.clientPathDirectory,
    buildOptions.manifestPathDirectory,
    'manifest.json'
  );
  const apiRouterPath = path.join(distServerDir, 'api-router.js');
  const hasApiRouter = fsSync.existsSync(apiRouterPath);

  const futonEntry = resolveRasenganTransitiveDep(cwd, '@rasenganjs/futon');
  const workerdAdapterEntry = resolveRasenganTransitiveDep(
    cwd,
    '@rasenganjs/runtime/adapters/workerd'
  );

  const source = `
import * as entryServer from '${relImport(entryPath, path.join(distServerDir, buildOptions.entryServerPath))}';
import appRouter from '${relImport(entryPath, path.join(distServerDir, 'app.router.js'))}';
import app from '${relImport(entryPath, path.join(distServerDir, 'main.js'))}';
import template from '${relImport(entryPath, path.join(distServerDir, 'template.js'))}';
${hasApiRouter ? `import apiRouter from '${relImport(entryPath, apiRouterPath)}';` : ''}
import config from '${relImport(entryPath, configJsonPath)}';
import manifest from '${relImport(entryPath, manifestJsonPath)}';
import {
  createRequestHandler,
  createMatchRoutesGuard,
  createApiRouterMiddleware,
} from 'rasengan/server';
import { Futon, compress } from '${relImport(entryPath, futonEntry)}';
import { WorkerdProdAdapter } from '${relImport(entryPath, workerdAdapterEntry)}';

// Every directory field is unused: every caller below receives
// pre-loaded \`modules\`, which short-circuits every fs read and
// dynamic import() this shape would otherwise trigger (RFC-0009).
const build = {
  buildDirectory: '',
  serverPathDirectory: '',
  clientPathDirectory: '',
  staticDirectory: '',
  manifestPathDirectory: '',
  assetPathDirectory: '',
  entryServerPath: '',
};

// File-based routing's app.router.js exports the (async) flatRoutes()
// call result directly, so the default export is a
// Promise<RouterComponent> rather than a RouterComponent — same await
// pre-render.tsx does. Config-based routing's default export is
// already a plain RouterComponent, and awaiting a non-Promise value is
// a safe no-op, so this is unconditionally correct either way.
const resolvedAppRouter = await appRouter;

const modules = {
  entryServer,
  appRouter: resolvedAppRouter,
  config,
  manifest,
  app,
  template,
};

const app_ = new Futon();
const adapter = new WorkerdProdAdapter({ passthrough: true });

app_.use(compress());
// No staticFiles() fallback here (unlike @rasenganjs/vercel/netlify's
// generated handlers): Cloudflare's [assets] binding already serves
// every static path directly off the edge CDN, never invoking the
// Worker at all for a match — nothing for a fallback to catch.
app_.use(
  createApiRouterMiddleware({
    build,
    prefix: config.api?.prefix,
    modules: { apiRouter: ${hasApiRouter ? 'apiRouter' : 'undefined'} },
  })
);

const requestHandler = createRequestHandler({ build, modules });
const matchRoutesGuard = createMatchRoutesGuard({
  build,
  modules: { appRouter: resolvedAppRouter },
});

app_.fallback((ctx) => matchRoutesGuard(ctx, () => requestHandler(ctx)));
app_.onError((error) => {
  console.error(error);
  return new Response('Internal Server Error', { status: 500 });
});

await adapter.serve(app_);
export default { fetch: adapter.fetchHandler };
`.trimStart();

  await fs.mkdir(path.dirname(entryPath), { recursive: true });
  await fs.writeFile(entryPath, source, 'utf-8');
};

/* -------------------------------------------------------------------------- */
/*                          BUNDLE THE WORKER ENTRY                           */
/* -------------------------------------------------------------------------- */

const bundleWorkerEntry = async (cwd: string, opts: CloudflareBuildOptions) => {
  await esbuild.build({
    entryPoints: [path.resolve(cwd, opts.workerEntrySource)],
    outfile: path.resolve(cwd, opts.workerBundleOutput),
    bundle: true,
    format: 'esm',
    // Not actually Node, but the closest of esbuild's two resolution
    // modes: `node:`-prefixed and bare builtin specifiers (`node:path`,
    // `fs/promises`, `open`'s own transitive `node:child_process` use,
    // ...) get treated as externally available rather than failing to
    // resolve — real code paths reachable through `modules` never call
    // into them, and Workers' `nodejs_compat` flag (already set in the
    // generated wrangler.toml for SSR builds) provides real
    // implementations for whichever ones the bundle does touch.
    platform: 'node',
    target: 'es2022',
    conditions: ['workerd', 'worker', 'edge-light'],
    logLevel: 'warning',
  });
};

/* -------------------------------------------------------------------------- */
/*                         wrangler.toml GENERATION                           */
/* -------------------------------------------------------------------------- */

const generateWranglerConfig = async (
  cwd: string,
  config: OptimizedAppConfig,
  opts: CloudflareBuildOptions
) => {
  const hasWorker = needsWorker(config);

  const packageJsonPath = path.resolve(cwd, 'package.json');
  const appName = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    .name as string;

  const lines = [
    `name = "${appName}"`,
    ...(hasWorker ? [`main = "${opts.workerBundleOutput}"`] : []),
    `compatibility_date = "${new Date().toISOString().slice(0, 10)}"`,
    ...(hasWorker ? [`compatibility_flags = ["nodejs_compat"]`] : []),
    '',
    '[assets]',
    `directory = "${opts.assetsDirectory}"`,
    '',
  ];

  await fs.writeFile(
    path.resolve(cwd, opts.wranglerConfigFile),
    lines.join('\n'),
    'utf-8'
  );
};

/* -------------------------------------------------------------------------- */
/*                         LOAD RASENGAN CONFIG.JSON                          */
/* -------------------------------------------------------------------------- */

const loadRasenganConfig = async (cwd: string): Promise<OptimizedAppConfig> => {
  const buildOptions = resolveBuildOptions({});

  const spa = path.posix.join(
    buildOptions.buildDirectory,
    buildOptions.assetPathDirectory,
    'config.json'
  );
  const ssr = path.posix.join(
    buildOptions.buildDirectory,
    buildOptions.clientPathDirectory,
    buildOptions.assetPathDirectory,
    'config.json'
  );

  const found = [spa, ssr]
    .map((p) => path.resolve(cwd, p))
    .find((p) => fsSync.existsSync(p));

  if (!found)
    throw new Error('Rasengan config.json not found in build output.');

  return JSON.parse(await fs.readFile(found, 'utf-8'));
};

/* -------------------------------------------------------------------------- */
/*                             PREPARE BUILD                                  */
/* -------------------------------------------------------------------------- */

const prepare = async (_options: AdapterOptions) => {
  const cwd = process.cwd();
  const opts = getCloudflareBuildOptions();
  const config = await loadRasenganConfig(cwd);

  await generateCloudflareDirectory(opts);
  await copyStaticFiles(config, opts);

  if (needsWorker(config)) {
    await generateWorkerEntrySource(cwd, config, opts);
    await bundleWorkerEntry(cwd, opts);
  }

  await generateWranglerConfig(cwd, config, opts);
};

/* -------------------------------------------------------------------------- */
/*                              EXPORT ADAPTER                                */
/* -------------------------------------------------------------------------- */

export const configure = (options: AdapterOptions = {}): AdapterConfig => {
  return {
    name: Adapters.CLOUDFLARE,
    prepare: async () => {
      await prepare(options);
    },
  };
};
