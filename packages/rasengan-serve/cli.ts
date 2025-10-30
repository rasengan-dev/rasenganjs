#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import url from 'node:url';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import sourceMapSupport from 'source-map-support';
import getPort from 'get-port';
import { createRequestHandler, resolveBuildOptions } from 'rasengan/server';

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

  let app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(
    morgan(
      '[:date[web]]: :method :url :status :res[content-length] - :response-time ms'
    )
  );
  // ssr assets
  app.use(
    path.posix.join('/assets'),
    express.static(
      path.posix.join(
        buildOptions.buildDirectory,
        buildOptions.clientPathDirectory,
        buildOptions.assetPathDirectory
      ),
      {
        immutable: true,
        maxAge: '1y',
      }
    )
  );
  // spa assets
  app.use(
    path.posix.join('/assets'),
    express.static(
      path.posix.join(
        buildOptions.buildDirectory,
        buildOptions.assetPathDirectory
      ),
      {
        immutable: true,
        maxAge: '1y',
      }
    )
  );
  // ssr client
  app.use(
    '/',
    express.static(
      path.posix.join(
        buildOptions.buildDirectory,
        buildOptions.clientPathDirectory
      ),
      { maxAge: '1h' }
    )
  );
  // spa client
  app.use(
    '/',
    express.static(path.posix.join(buildOptions.buildDirectory), {
      maxAge: '1h',
    })
  );
  app.use(express.static('public', { maxAge: '1h' }));

  app.all('*', (req, res) => {
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
    const config = JSON.parse(configData);

    if (config.ssr) {
      const requestHandler = createRequestHandler({
        build: buildOptions,
      });

      return requestHandler(req, res);
    } else {
      return res.sendFile(
        path.posix.join(buildOptions.buildDirectory, 'index.html')
      );
    }
  });

  let server = process.env.HOST
    ? app.listen(port, process.env.HOST, onListen)
    : app.listen(port, onListen);

  ['SIGTERM', 'SIGINT'].forEach((signal) => {
    process.once(signal, () => server?.close(console.error));
  });
}
