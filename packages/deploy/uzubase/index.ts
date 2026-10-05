import { resolveBuildOptions } from 'rasengan/server';
import { AdapterConfig, AdapterOptions, Adapters } from 'rasengan/plugin';
import { OptimizedAppConfig } from 'rasengan';
import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import { createRequire } from 'node:module';
import * as esbuild from 'esbuild';

/* -------------------------------------------------------------------------- */
/*                          UZUBASE BUILD OPTIONS                             */
/* -------------------------------------------------------------------------- */

interface UzubaseBuildOptions {
  baseDirectory: string; // .uzubase
  assetsDirectory: string; // .uzubase/assets
  workerEntrySource: string; // .uzubase/worker-entry.mjs
  workerBundleOutput: string; // .uzubase/worker.js
  metaFile: string; // .uzubase/meta.json
}

const getUzubaseBuildOptions = (): UzubaseBuildOptions => ({
  baseDirectory: '.uzubase',
  assetsDirectory: '.uzubase/assets',
  workerEntrySource: '.uzubase/worker-entry.mjs',
  workerBundleOutput: '.uzubase/worker.js',
  metaFile: '.uzubase/meta.json',
});

const checkUzubaseDirectory = async (opts: UzubaseBuildOptions) => {
  try {
    await fs.access(opts.baseDirectory);
    return true;
  } catch {
    return false;
  }
};

/**
 * Same check `@rasenganjs/vercel`/`@rasenganjs/netlify`/`@rasenganjs/cloudflare`
 * already use: `dist/server/**` only exists when the `ssr` environment
 * itself gets built, which never happens when `prerender` is enabled.
 * SPA/SSG deploys are pure static hosting — Uzubase's own
 * `static` build adapter is the whole story there, no Worker script.
 */
const needsWorker = (config: OptimizedAppConfig) =>
  Boolean(config.ssr) && !config.prerender;

/* -------------------------------------------------------------------------- */
/*                            DIRECTORY GENERATION                            */
/* -------------------------------------------------------------------------- */

const generateUzubaseDirectory = async (opts: UzubaseBuildOptions) => {
  if (await checkUzubaseDirectory(opts)) {
    await fs.rm(opts.baseDirectory, { recursive: true });
  }

  await fs.mkdir(opts.assetsDirectory, { recursive: true });
};

/* -------------------------------------------------------------------------- */
/*                           STATIC FILES COPY                                */
/* -------------------------------------------------------------------------- */

/**
 * Same directory-selection logic `@rasenganjs/vercel`'s/`@rasenganjs/netlify`'s/
 * `@rasenganjs/cloudflare`'s `copyStaticFiles()` already implement.
 * `@uzubase/build`'s own `rasengan` adapter reads this directory back as
 * the deploy's asset set — same contract its `static` adapter already
 * has for a plain Vite build.
 */
const copyStaticFiles = async (
  config: OptimizedAppConfig,
  opts: UzubaseBuildOptions
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
 * resolvable from a file sitting at the app's own root.
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
  opts: UzubaseBuildOptions
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
import { Futon } from '${relImport(entryPath, futonEntry)}';
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
${
  hasApiRouter
    ? `
// Same shape as app.router.js above: flatApiRoutes() (RFC-0008) is
// also async, so api-router.js's default export is a Promise<Router>,
// not a resolved Router — awaited here for the same reason.
const resolvedApiRouter = await apiRouter;`
    : ''
}

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

// No compress() middleware here: Cloudflare's edge CDN already
// compresses eligible Worker responses automatically (gzip/brotli).
// No staticFiles() fallback here either (unlike @rasenganjs/vercel/netlify's
// generated handlers): Uzubase deploys this alongside Workers Assets,
// which already serves every static path directly off the edge CDN,
// never invoking the Worker at all for a match — nothing for a
// fallback to catch.
app_.use(
  createApiRouterMiddleware({
    build,
    prefix: config.api?.prefix,
    modules: { apiRouter: ${hasApiRouter ? 'resolvedApiRouter' : 'undefined'} },
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
/*        NEUTRALIZE DEAD loadModuleSSR-STYLE DYNAMIC IMPORTS                 */
/* -------------------------------------------------------------------------- */

/**
 * `createRequestHandler`/`createMatchRoutesGuard`/`createApiRouterMiddleware`/
 * `render()` all have a `modules`-provided branch (always taken here) and a
 * fallback branch doing `import(/* @vite-ignore *\/ resolvePath(...))` with a
 * runtime-computed specifier (RFC-0009 §Detailed Design 1, this repo). That
 * fallback branch is genuinely unreachable once `modules` is always
 * supplied, but it's still *present* in the compiled output esbuild
 * bundles — dead code isn't eliminated just because a particular runtime
 * value never takes that branch. Node's native dynamic `import()`
 * tolerates an unresolvable computed specifier that's simply never
 * evaluated, but Miniflare/workerd's stricter module linker resolves
 * every `import()` expression ahead of time, whether reached or not, and
 * fails the whole bundle on the first one it can't statically resolve —
 * the exact same failure `@rasenganjs/cloudflare` found first, fixed the
 * same way here.
 *
 * Fixed here, not in `rasengan` core: every occurrence of this exact
 * `/* @vite-ignore *\/`-marked pattern (the marker is preserved through both
 * Rolldown's and tsup's compilation, verified empirically) is replaced with
 * a rejected Promise before esbuild ever parses the file — functionally
 * identical (this code was never going to run) but with zero remaining
 * `import()` expression for the linker to choke on.
 */
const neutralizeDeadDynamicImports: esbuild.Plugin = {
  name: 'rasengan-neutralize-dead-dynamic-imports',
  setup(build) {
    build.onLoad({ filter: /\.(js|mjs|cjs)$/ }, async (args) => {
      const contents = await fs.readFile(args.path, 'utf-8');

      if (!contents.includes('@vite-ignore')) {
        return null; // Not one of ours — let esbuild load it normally.
      }

      const marker = '/* @vite-ignore */';
      let out = '';
      let cursor = 0;

      while (true) {
        const markerIndex = contents.indexOf(marker, cursor);
        if (markerIndex === -1) {
          out += contents.slice(cursor);
          break;
        }

        // Walk backward from the marker to the `import(` that precedes it.
        const importIndex = contents.lastIndexOf('import(', markerIndex);
        // Walk forward from `import(`'s own `(` to its matching `)`,
        // tracking paren depth so nested calls (resolvePath(path.join(...)))
        // don't terminate the match early.
        let depth = 0;
        let i = importIndex + 'import'.length;
        for (; i < contents.length; i++) {
          if (contents[i] === '(') depth++;
          else if (contents[i] === ')') {
            depth--;
            if (depth === 0) {
              i++; // include the final ')'
              break;
            }
          }
        }

        out += contents.slice(cursor, importIndex);
        out +=
          "(Promise.reject(new Error('loadModuleSSR is unreachable when modules are pre-loaded (Uzubase adapter, RFC-0009 pattern)')))";
        cursor = i;
      }

      return { contents: out, loader: 'js' };
    });
  },
};

/* -------------------------------------------------------------------------- */
/*                          BUNDLE THE WORKER ENTRY                           */
/* -------------------------------------------------------------------------- */

const bundleWorkerEntry = async (cwd: string, opts: UzubaseBuildOptions) => {
  await esbuild.build({
    entryPoints: [path.resolve(cwd, opts.workerEntrySource)],
    outfile: path.resolve(cwd, opts.workerBundleOutput),
    bundle: true,
    format: 'esm',
    plugins: [neutralizeDeadDynamicImports],
    // Not actually Node, but the closest of esbuild's two resolution
    // modes: `node:`-prefixed and bare builtin specifiers get treated as
    // externally available rather than failing to resolve — real code
    // paths reachable through `modules` never call into them, and
    // Cloudflare Workers' `nodejs_compat` flag (set by Uzubase's own
    // deploy path) provides real implementations for whichever ones the
    // bundle does touch.
    platform: 'node',
    target: 'es2022',
    conditions: ['workerd', 'worker', 'edge-light'],
    logLevel: 'warning',
  });
};

/* -------------------------------------------------------------------------- */
/*                    META FILE — WHAT THE UZUBASE ADAPTER READ               */
/* -------------------------------------------------------------------------- */

/**
 * `@uzubase/build`'s own `rasengan` adapter reads this back to know
 * whether a Worker script exists (so it can read `worker.js`) and to
 * pick the right `not_found_handling` default: an SSR build wants
 * unmatched paths to reach the Worker (Cloudflare's own asset-first
 * routing already does this whenever a script is present and
 * `spaFallback` is off); a Worker-less SSG/SPA build defaults to true,
 * the same as Uzubase's `static` adapter.
 */
const generateMetaJson = async (
  opts: UzubaseBuildOptions,
  hasWorker: boolean
) => {
  await fs.writeFile(
    path.resolve(opts.metaFile),
    JSON.stringify({ hasWorker, spaFallback: !hasWorker }, null, 2),
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
  const opts = getUzubaseBuildOptions();
  const config = await loadRasenganConfig(cwd);
  const hasWorker = needsWorker(config);

  await generateUzubaseDirectory(opts);
  await copyStaticFiles(config, opts);

  if (hasWorker) {
    await generateWorkerEntrySource(cwd, config, opts);
    await bundleWorkerEntry(cwd, opts);
  }

  await generateMetaJson(opts, hasWorker);
};

/* -------------------------------------------------------------------------- */
/*                              EXPORT ADAPTER                                */
/* -------------------------------------------------------------------------- */

export const configure = (options: AdapterOptions = {}): AdapterConfig => {
  return {
    name: Adapters.UZUBASE,
    prepare: async () => {
      await prepare(options);
    },
  };
};
