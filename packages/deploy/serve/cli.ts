#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import url from 'node:url';
import sourceMapSupport from 'source-map-support';
import getPort from 'get-port';
import {
  createRequestHandler,
  createMatchRoutesGuard,
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
import { NodeProdAdapter } from '@rasenganjs/runtime/adapters/node';

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
      console.log(
        `${chalk.bold.blue(`Rasengan v${parsedPackageJson['version']}\n`)}`
      );
      console.log(
        `${chalk.bold('- Local:')}    ${chalk.blue(`http://localhost:${port}\n`)}`
      );
    } else {
      console.log(
        `${chalk.bold.blue(`Rasengan v${parsedPackageJson['version']}\n`)}`
      );
      console.log(
        `${chalk.bold('- Local:')}    ${chalk.blue(`http://localhost:${port}`)}`
      );
      console.log(
        `${chalk.bold('- Network:')}  ${chalk.blue(`http://${address}:${port}\n`)}`
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

  app.fallback(async (ctx) => {
    const request = ctx.request;

    // Check if dist/client/assets/config.json exists or dist/assets/config.json exists
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

    const configPath = [configPathSpa, configPathSsr].find((path) =>
      fs.existsSync(path)
    );

    if (!configPath) {
      throw new Error(
        'No config.json file found in dist/client/assets or dist/assets'
      );
    }

    // Read the config.json file
    const configData = fs.readFileSync(configPath, 'utf-8').toString();

    // Parse the config.json file
    const config: OptimizedAppConfig = JSON.parse(configData);

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

  const adapter = new NodeProdAdapter({
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
