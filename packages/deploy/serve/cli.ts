#!/usr/bin/env node
import { bold, blue, boldBlue } from './ansi.js';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import url from 'node:url';
import sourceMapSupport from 'source-map-support';
import getPort from 'get-port';
import {
  createRequestHandler,
  createMatchRoutesGuard,
  createApiRouterMiddleware,
  resolveBuildOptions,
} from 'rasengan/server';
import { OptimizedAppConfig } from 'rasengan';
import {
  Futon,
  logger,
  compress,
  staticFiles,
  redirect,
} from '@rasenganjs/futon';
import type { Context } from '@rasenganjs/futon';
import type { RuntimeAdapter } from '@rasenganjs/runtime';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'production';

sourceMapSupport.install({
  retrieveSourceMap: function (source) {
    try {
      let match = source.startsWith('file://');

      if (match) {
        let filePath = url.fileURLToPath(source);
        let sourceMapPath = `${filePath}.map`;
        if (fs.existsSync(sourceMapPath)) {
          return {
            url: source,
            map: fs.readFileSync(sourceMapPath, 'utf8'),
          };
        }
      }
      return null;
    } catch (error) {
      console.error({ error });

      throw new Error('An error occured');
    }
  },
});

run();

/**
 * Parse a number from a string
 * @param raw
 * @returns
 */
function parseNumber(raw?: string) {
  if (raw === undefined) return undefined;
  let maybe = Number(raw);
  if (Number.isNaN(maybe)) return undefined;
  return maybe;
}

/**
 * Parse the port from the arguments
 * @param args
 * @returns
 */
function parsePortFromArgs(args: string[]) {
  const portArg = args.find((arg) => arg === '-p' || arg === '--port');
  if (!portArg) return undefined;
  const port = args[args.indexOf(portArg) + 1];
  return parseNumber(port);
}

/**
 * Locate and parse `config.json` (written by the `rasengan` build —
 * `dist/client/assets/config.json` for SSR/prerendered builds,
 * `dist/assets/config.json` for SPA builds).
 * @param buildOptions
 * @returns
 */
function readAppConfig(
  buildOptions: ReturnType<typeof resolveBuildOptions>
): OptimizedAppConfig {
  const configPathSpa = path.posix.join(
    buildOptions.buildDirectory,
    buildOptions.assetPathDirectory,
    'config.json'
  );
  const configPathSsr = path.posix.join(
    buildOptions.buildDirectory,
    buildOptions.clientPathDirectory,
    buildOptions.assetPathDirectory,
    'config.json'
  );

  const configPath = [configPathSpa, configPathSsr].find((p) =>
    fs.existsSync(p)
  );

  if (!configPath) {
    throw new Error(
      'No config.json file found in dist/client/assets or dist/assets'
    );
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

/**
 * Instantiate the `@rasenganjs/runtime` production adapter matching
 * `config.runtime` (`AppConfig.runtime`, see RFC-0007 §5) — dynamically
 * imported so a Node-served app never pulls in Bun-specific module
 * code (and vice versa).
 * @param runtime
 * @param options
 * @returns
 */
async function createProdAdapter(
  runtime: OptimizedAppConfig['runtime'],
  options: { port: number; host?: string; rootDir: string }
): Promise<RuntimeAdapter> {
  if (runtime === 'bun') {
    const { BunProdAdapter } = await import('@rasenganjs/runtime/adapters/bun');
    return new BunProdAdapter(options);
  }

  const { NodeProdAdapter } = await import('@rasenganjs/runtime/adapters/node');
  return new NodeProdAdapter(options);
}

/**
 * Serve a file straight off disk relative to `process.cwd()` — used
 * only for the `public/` mount, which (unlike every other static
 * mount here) is rooted at the CWD rather than the build output
 * directory, so it can't share `NodeProdAdapter`'s build-scoped
 * `ctx.runtime.assets`.
 * @param prefix
 */
function publicFiles(prefix = '/') {
  return async (ctx: Context, next: () => Promise<Response>) => {
    const pathname = decodeURIComponent(new URL(ctx.request.url).pathname);
    const relative = pathname.startsWith(prefix)
      ? pathname.slice(prefix.length)
      : pathname;

    if (relative.split('/').includes('..')) return next();

    const filePath = path.join(process.cwd(), 'public', relative);

    try {
      const data = await fs.promises.readFile(filePath);
      return new Response(data as BodyInit, { status: 200 });
    } catch {
      return next();
    }
  };
}

async function run() {
  let portArg = parsePortFromArgs(process.argv);
  let port =
    portArg ?? parseNumber(process.env.PORT) ?? (await getPort({ port: 4320 }));

  let buildPathArg = process.argv[2];

  if (!buildPathArg) {
    console.error(`
  Usage: rasengan-serve <server-build-path> - e.g. rasengan-serve ./dist`);
    process.exit(1);
  }

  let buildPath = path.resolve(buildPathArg);

  const buildOptions = resolveBuildOptions({
    buildDirectory: buildPath,
  });

  // Read once at startup — reused per-request inside app.fallback(...)
  // below instead of re-reading/re-parsing config.json on every request,
  // and to pick the right runtime adapter before the server even starts.
  const config = readAppConfig(buildOptions);

  let onListen = () => {
    // Getting the package.json file
    const packageJson = fs.readFileSync(
      'node_modules/rasengan/package.json',
      'utf-8'
    );

    // Parsing the package.json file
    const parsedPackageJson = JSON.parse(packageJson);

    let address =
      process.env.HOST ||
      Object.values(os.networkInterfaces())
        .flat()
        .find((ip) => String(ip?.family).includes('4') && !ip?.internal)
        ?.address;

    if (!address) {
      console.log(boldBlue(`Rasengan v${parsedPackageJson['version']}\n`));
      console.log(
        `${bold('- Local:')}    ${blue(`http://localhost:${port}\n`)}`
      );
    } else {
      console.log(boldBlue(`Rasengan v${parsedPackageJson['version']}\n`));
      console.log(`${bold('- Local:')}    ${blue(`http://localhost:${port}`)}`);
      console.log(
        `${bold('- Network:')}  ${blue(`http://${address}:${port}\n`)}`
      );
    }
  };

  const app = new Futon();

  app.use(logger());
  app.use(compress());

  // ssr assets
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
  // spa assets
  app.use(
    staticFiles({
      root: buildOptions.assetPathDirectory,
      prefix: '/assets',
      immutable: true,
      maxAge: 31536000,
    })
  );
  // ssr client
  app.use(
    staticFiles({
      root: buildOptions.clientPathDirectory,
      maxAge: 3600,
    })
  );
  // spa client
  app.use(
    staticFiles({
      root: '',
      maxAge: 3600,
    })
  );
  // public/ — CWD-rooted, not build-output-rooted, see publicFiles().
  app.use(publicFiles());

  // _api/ routes (RFC-0008) — self-contained under their own prefix
  // (JSON 404/errors), a no-op passthrough when the app has none.
  app.use(
    createApiRouterMiddleware({
      build: buildOptions,
      prefix: config.api?.prefix,
    })
  );

  app.fallback(async (ctx) => {
    const request = ctx.request;

    // Handle custom redirections. Mirrors Express's `req.url` (path +
    // query, no origin) — `.includes()`, not an exact match, matching
    // the original behavior.
    const requestUrl = new URL(request.url);
    const requestPath = requestUrl.pathname + requestUrl.search;

    for (const redirectEntry of config.redirects) {
      if (requestPath.includes(redirectEntry.source)) {
        return redirect(
          redirectEntry.destination,
          redirectEntry.permanent ? 301 : 302
        );
      }
    }

    if (config.ssr) {
      const requestHandler = createRequestHandler({
        build: buildOptions,
      });

      // Cheap structural 404 — only meaningful in SSR mode, where the
      // route tree is known server-side. SPA mode intentionally
      // serves the same shell for every path below, letting the
      // client router take over (see RFC-0007 §3).
      const matchRoutesGuard = createMatchRoutesGuard({
        build: buildOptions,
      });

      return matchRoutesGuard(ctx, () => requestHandler(ctx));
    } else {
      // Check if spa-fallback.html exists
      const isSpaFallbackExists = fs.existsSync(
        path.posix.join(buildOptions.buildDirectory, 'spa-fallback.html')
      );

      const fallbackFile = path.posix.join(
        buildOptions.buildDirectory,
        isSpaFallbackExists ? 'spa-fallback.html' : 'index.html'
      );

      const html = await fs.promises.readFile(fallbackFile, 'utf-8');

      return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  });

  app.onError(async (error) => {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  });

  const adapter = await createProdAdapter(config.runtime, {
    port,
    host: process.env.HOST,
    rootDir: buildPath,
  });

  await adapter.serve(app, { onListening: onListen });

  ['SIGTERM', 'SIGINT'].forEach((signal) => {
    process.once(signal, async () => {
      try {
        await adapter.close();
      } catch (error) {
        console.error(error);
      }
    });
  });
}
