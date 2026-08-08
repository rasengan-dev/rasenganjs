import { resolveBuildOptions } from 'rasengan/server';
import { AdapterConfig, AdapterOptions, Adapters } from 'rasengan/plugin';
import { OptimizedAppConfig } from 'rasengan';
import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import { execa } from 'execa';

/* -------------------------------------------------------------------------- */
/*                          NETLIFY BUILD OPTIONS                             */
/* -------------------------------------------------------------------------- */

interface NetlifyBuildOptions {
  baseDirectory: string; // .netlify
  versionDirectory: string; // .netlify/v1
  functionsDirectory: string; // .netlify/v1/functions
  edgeFunctionsDirectory: string; // .netlify/v1/edge-functions
  staticDirectory: string; // public/static assets
  configFile: string; // .netlify/v1/config.json
  serverlessHandler: string; // rasengan-ssr.mjs
}

const getNetlifyBuildOptions = (): NetlifyBuildOptions => ({
  baseDirectory: '.netlify',
  versionDirectory: '.netlify/v1',
  functionsDirectory: '.netlify/v1/functions',
  edgeFunctionsDirectory: '.netlify/v1/edge-functions',
  staticDirectory: '.netlify/v1/static',
  configFile: 'config.json',
  serverlessHandler: 'rasengan-ssr.mjs',
});

const checkNetlifyDirectory = async (options: NetlifyBuildOptions) => {
  try {
    await fs.access(options.baseDirectory);
    return true;
  } catch {
    return false;
  }
};

/**
 * Whether this build actually has a live server to run — matches
 * `@rasenganjs/vercel`'s own check: `dist/server/**` (and, for `_api/`
 * routes, `dist/server/api-router.js`) only exist when the `ssr`
 * environment itself gets built, which never happens when `prerender`
 * is enabled (see rasengan's `core/plugins/index.ts`, `builder.buildApp`).
 * SSG/SPA deploys are pure static hosting and never invoke a function.
 */
const needsServerlessFunction = (config: OptimizedAppConfig) =>
  Boolean(config.ssr) && !config.prerender;

/* -------------------------------------------------------------------------- */
/*                            DIRECTORY GENERATION                            */
/* -------------------------------------------------------------------------- */

const generateNetlifyDirectory = async (config: OptimizedAppConfig) => {
  const opts = getNetlifyBuildOptions();

  if (await checkNetlifyDirectory(opts)) {
    await fs.rm(opts.baseDirectory, { recursive: true });
  }

  await fs.mkdir(opts.versionDirectory, { recursive: true });
  await fs.mkdir(opts.staticDirectory, { recursive: true });

  if (needsServerlessFunction(config)) {
    await fs.mkdir(opts.functionsDirectory, { recursive: true });
  }
};

/* -------------------------------------------------------------------------- */
/*                           STATIC FILES COPY                                */
/* -------------------------------------------------------------------------- */

const copyStaticFiles = async (config: OptimizedAppConfig) => {
  const opts = getNetlifyBuildOptions();
  const buildOptions = resolveBuildOptions({});

  const sourceDir = config.prerender
    ? buildOptions.staticDirectory
    : config.ssr
      ? path.posix.join(
          buildOptions.buildDirectory,
          buildOptions.clientPathDirectory
        )
      : buildOptions.buildDirectory;

  await fs.cp(sourceDir, opts.staticDirectory, { recursive: true });
};

/* -------------------------------------------------------------------------- */
/*                         SERVER FILES FOR SSR                               */
/* -------------------------------------------------------------------------- */

const copyServerFiles = async (config: OptimizedAppConfig) => {
  if (!needsServerlessFunction(config)) return;

  const opts = getNetlifyBuildOptions();
  const buildOptions = resolveBuildOptions({});

  // Copy dist/server — needed for SSR handler. Dynamically imported at
  // runtime (entry.server.js, app.router.js, api-router.js, ...), so
  // esbuild's static dependency tracing can't see these files — they're
  // shipped as-is via `included_files` in the Netlify config below.
  await fs.cp(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.serverPathDirectory
    ),
    path.posix.join(opts.functionsDirectory, 'ssr-server'),
    { recursive: true }
  );

  // Copy dist/client — hydration / manifest.
  await fs.cp(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.clientPathDirectory
    ),
    path.posix.join(opts.functionsDirectory, 'ssr-client'),
    { recursive: true }
  );
};

/* -------------------------------------------------------------------------- */
/*                    SELF-CONTAINED DEPENDENCIES FOR THE FUNCTION            */
/* -------------------------------------------------------------------------- */

/**
 * Same problem `@rasenganjs/vercel` solves via `generatePackageJson()` +
 * `runInstall()`: the generated handler imports `@rasenganjs/futon` and
 * `@rasenganjs/runtime` directly — transitive dependencies of `rasengan`
 * itself, not of the user's own site. Under pnpm's strict `node_modules`
 * layout those aren't resolvable from arbitrary code outside `rasengan`'s
 * own package boundary unless the site happens to also depend on them
 * directly. A fresh, isolated `npm install` scoped to the function's own
 * directory resolves `rasengan`'s full dependency tree correctly
 * regardless of the host project's package manager/hoisting, and is what
 * Netlify's own zip-it-and-ship-it packaging expects to find there.
 */
const generatePackageJson = async () => {
  const opts = getNetlifyBuildOptions();

  const packageJsonPath = path.resolve('package.json');
  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
  const packageJsonData = JSON.parse(packageJsonContent);

  const packageJson = {
    type: 'module',
    dependencies: {
      ...packageJsonData.dependencies,
    },
  };

  await fs.writeFile(
    path.posix.join(opts.functionsDirectory, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
};

const runInstall = async () => {
  const opts = getNetlifyBuildOptions();

  console.log('Running npm install for the Netlify function...');

  await execa('npm', ['install', '--legacy-peer-deps'], {
    cwd: opts.functionsDirectory,
  });
};

/* -------------------------------------------------------------------------- */
/*                        NETLIFY SSR FUNCTION HANDLER                        */
/* -------------------------------------------------------------------------- */

const generateSSRHandler = async (config: OptimizedAppConfig) => {
  if (!needsServerlessFunction(config)) return;

  const opts = getNetlifyBuildOptions();
  const apiPrefix = JSON.stringify(config.api?.prefix ?? '/api');

  // Runs on Futon + @rasenganjs/runtime instead of Express (RFC-0007),
  // same shape as @rasenganjs/vercel's and @rasenganjs/serve's
  // production server. Unlike Vercel's Node.js runtime (which calls a
  // function with Node-native `(req, res)`, requiring a request/response
  // shim), Netlify Functions (v2, `.mjs`) call the default export
  // directly with a Web API `Request` and expect a `Response` back —
  // exactly Futon's own `app.fetch()` signature, so no adapter/shim is
  // needed here at all.
  const serverlessHandler = `
import path from 'node:path';
import {
  createRequestHandler,
  createMatchRoutesGuard,
  createApiRouterMiddleware,
  resolveBuildOptions,
} from 'rasengan/server';
import { Futon, compress, staticFiles } from '@rasenganjs/futon';
import { NodeProdAdapter } from '@rasenganjs/runtime/adapters/node';

// The function's own directory once deployed — ssr-server/ and
// ssr-client/ (see copyServerFiles) are copied right next to this file.
const rootDir = import.meta.dirname;

const buildOptions = resolveBuildOptions({
  buildDirectory: rootDir,
  serverPathDirectory: 'ssr-server',
  clientPathDirectory: 'ssr-client',
});

const app = new Futon();

// NodeProdAdapter's filesystem-backed, traversal-protected Assets
// implementation, reused here without calling .serve() (Netlify owns
// the process lifecycle, not us).
const assetsAdapter = new NodeProdAdapter({ rootDir });
app.configureAssets(assetsAdapter.assets);

app.use(compress());

// Mostly a safety net: Netlify's own redirects (see the generated
// config.json) already serve /assets/* straight from .netlify/v1/static
// before this function is ever invoked.
app.use(
  staticFiles({
    root: path.posix.join(
      buildOptions.clientPathDirectory,
      buildOptions.assetPathDirectory
    ),
    prefix: '/assets',
    immutable: true,
    maxAge: 31536000,
  })
);
app.use(staticFiles({ root: buildOptions.clientPathDirectory, maxAge: 3600 }));

// _api/ routes (RFC-0008) — self-contained under their own prefix
// (JSON 404/errors), a no-op passthrough when the app has none.
app.use(
  createApiRouterMiddleware({ build: buildOptions, prefix: ${apiPrefix} })
);

const requestHandler = createRequestHandler({ build: buildOptions });
const matchRoutesGuard = createMatchRoutesGuard({ build: buildOptions });

app.fallback((ctx) => matchRoutesGuard(ctx, () => requestHandler(ctx)));

app.onError((error) => {
  console.error(error);
  return new Response('Internal Server Error', { status: 500 });
});

const ready = app.init();

// Netlify Functions (v2) call the default export directly with a Web
// API Request and expect a Response — matches Futon's fetch() signature
// exactly.
export default async (request) => {
  await ready;
  return app.fetch(request);
};
`;

  await fs.writeFile(
    path.posix.join(opts.functionsDirectory, opts.serverlessHandler),
    serverlessHandler.trimStart()
  );
};

/* -------------------------------------------------------------------------- */
/*                         NETLIFY CONFIG.JSON GENERATION                     */
/* -------------------------------------------------------------------------- */

const generateNetlifyConfigFile = async (config: OptimizedAppConfig) => {
  const opts = getNetlifyBuildOptions();
  const hasFunction = needsServerlessFunction(config);

  const netlifyConfig = {
    version: 1,
    ...(hasFunction && {
      functions: {
        directory: opts.functionsDirectory,
        // ssr-server/ssr-client are loaded via runtime dynamic import()
        // (see copyServerFiles), invisible to esbuild's static tracing.
        // node_modules/package.json (see generatePackageJson +
        // runInstall) is a fresh, self-contained install scoped to this
        // function, resolving rasengan's own @rasenganjs/futon and
        // @rasenganjs/runtime dependencies regardless of the host
        // project's package manager/hoisting — shipped as-is rather
        // than re-bundled.
        //
        // `included_files` globs are resolved relative to the *project
        // root* (where this config.json's own base directory is), not
        // relative to `functions.directory` — confirmed the hard way in
        // production: bare `'ssr-server/**'` silently matched nothing,
        // so the shipped function was missing dist/server entirely
        // (`node_modules/**` still worked, but only because Netlify's
        // own Node function packaging always ships node_modules sitting
        // next to the handler regardless of included_files).
        included_files: [
          path.posix.join(opts.functionsDirectory, 'ssr-server/**'),
          path.posix.join(opts.functionsDirectory, 'ssr-client/**'),
          path.posix.join(opts.functionsDirectory, 'node_modules/**'),
          path.posix.join(opts.functionsDirectory, 'package.json'),
        ],
      },
    }),
    redirects: [
      {
        from: '/assets/*',
        to: '/.netlify/v1/static/assets/:splat',
        status: 200,
      },
      {
        from: '/*',
        to: hasFunction
          ? '/.netlify/functions/rasengan-ssr'
          : '/.netlify/v1/static/index.html',
        status: 200,
      },
    ],
    edge_functions: [],
    preferStatic: true,
    nodeVersion: '22',
  };

  await fs.writeFile(
    path.posix.join(opts.versionDirectory, opts.configFile),
    JSON.stringify(netlifyConfig, null, 2)
  );
};

/* -------------------------------------------------------------------------- */
/*                         LOAD RASENGAN CONFIG.JSON                          */
/* -------------------------------------------------------------------------- */

const loadRasenganConfig = async (): Promise<OptimizedAppConfig> => {
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

  const found = [spa, ssr].find((p) => fsSync.existsSync(p));

  if (!found)
    throw new Error('Rasengan config.json not found in build output.');

  return JSON.parse(await fs.readFile(found, 'utf8'));
};

/* -------------------------------------------------------------------------- */
/*                             PREPARE BUILD                                  */
/* -------------------------------------------------------------------------- */

const prepare = async (options: AdapterOptions) => {
  const config = await loadRasenganConfig();

  await generateNetlifyDirectory(config);
  await copyStaticFiles(config);
  await copyServerFiles(config);
  await generateSSRHandler(config);
  await generateNetlifyConfigFile(config);

  if (needsServerlessFunction(config)) {
    await generatePackageJson();
    await runInstall();
  }
};

/* -------------------------------------------------------------------------- */
/*                              EXPORT ADAPTER                                */
/* -------------------------------------------------------------------------- */

export const configure = (options: AdapterOptions): AdapterConfig => {
  return {
    name: Adapters.NETLIFY,
    prepare: async () => {
      await prepare(options);
    },
  };
};
