#!/usr/bin/env node
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
  },
});

run();

function parseNumber(raw?: string) {
  if (raw === undefined) return undefined;
  let maybe = Number(raw);
  if (Number.isNaN(maybe)) return undefined;
  return maybe;
}

async function run() {
  let port = parseNumber(process.env.PORT) ?? (await getPort({ port: 4320 }));

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
    let address =
      process.env.HOST ||
      Object.values(os.networkInterfaces())
        .flat()
        .find((ip) => String(ip?.family).includes('4') && !ip?.internal)
        ?.address;

    if (!address) {
      console.log(`[Rasengan] http://localhost:${port}`);
    } else {
      console.log(
        `[Rasengan] http://localhost:${port} (http://${address}:${port})`
      );
    }
  };

  let app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('tiny'));
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
  app.use(express.static('public', { maxAge: '1h' }));

  app.all(
    '*',
    createRequestHandler({
      build: buildOptions,
    })
  );

  let server = process.env.HOST
    ? app.listen(port, process.env.HOST, onListen)
    : app.listen(port, onListen);

  ['SIGTERM', 'SIGINT'].forEach((signal) => {
    process.once(signal, () => server?.close(console.error));
  });
}
