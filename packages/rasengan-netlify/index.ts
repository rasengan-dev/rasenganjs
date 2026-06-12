import { resolveBuildOptions } from 'rasengan/server';
import { AdapterConfig, AdapterOptions, Adapters } from 'rasengan/plugin';
import { OptimizedAppConfig } from 'rasengan';
import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';

/* -------------------------------------------------------------------------- */
/*                          NETLIFY BUILD OPTIONS                             */
/* -------------------------------------------------------------------------- */

interface NetlifyBuildOptions {
  baseDirectory: string; // netlify
  versionDirectory: string; // netlify
  functionsDirectory: string; // netlify/functions
  edgeFunctionsDirectory: string; // netlify/edge-functions
  staticDirectory: string; // public/static assets
  configFile: string; // netlify/config.json
}

const getNetlifyBuildOptions = (): NetlifyBuildOptions => ({
  baseDirectory: 'netlify',
  versionDirectory: 'netlify',
  functionsDirectory: 'netlify/functions',
  edgeFunctionsDirectory: 'netlify/edge-functions',
  staticDirectory: 'netlify/static',
  configFile: 'config.json',
});

const checkNetlifyDirectory = async (options: NetlifyBuildOptions) => {
  try {
    await fs.access(options.baseDirectory);
    return true;
  } catch {
    return false;
  }
};

/* -------------------------------------------------------------------------- */
/*                            DIRECTORY GENERATION                            */
/* -------------------------------------------------------------------------- */

const generateNetlifyDirectory = async (config: OptimizedAppConfig) => {
  const opts = getNetlifyBuildOptions();

  if (await checkNetlifyDirectory(opts)) {
    await fs.rm(opts.baseDirectory, { recursive: true });
  }

  // await fs.mkdir(opts.versionDirectory, { recursive: true });
  await fs.mkdir(opts.functionsDirectory, { recursive: true });
  await fs.mkdir(opts.edgeFunctionsDirectory, { recursive: true });
  await fs.mkdir(opts.staticDirectory, { recursive: true });
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
  if (!config.ssr) return;

  const opts = getNetlifyBuildOptions();
  const buildOptions = resolveBuildOptions({});

  // Copy dist/server — needed for SSR handler
  await fs.cp(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.serverPathDirectory
    ),
    path.posix.join(opts.functionsDirectory, 'ssr-server'),
    { recursive: true }
  );

  // Copy dist/client — hydration / manifest
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
/*                        NETLIFY SSR FUNCTION HANDLER                        */
/* -------------------------------------------------------------------------- */

const generateSSRHandler = async (config: OptimizedAppConfig) => {
  if (!config.ssr) return;

  const opts = getNetlifyBuildOptions();

  const ssrHandler = `
    import { resolveBuildOptions, createRequestHandler } from "rasengan/server";
    import { Readable } from "node:stream";
    import path from "node:path";
    import { EventEmitter } from "node:events";

    const buildOptions = resolveBuildOptions({
      buildDirectory: import.meta.dirname,
      serverPathDirectory: 'ssr-server',
      clientPathDirectory: 'ssr-client',
    });

    const requestHandler = createRequestHandler({
      build: buildOptions,
    });

    export default async (event, context) => {
      try {
        // --- Build mock Express req from Netlify event ---
        const host = event.headers?.['host'] || 'localhost';
        const protocol = event.headers?.['x-forwarded-proto'] || 'https';
        const queryStr = event.rawQuery
          ? '?' + event.rawQuery
          : event.queryStringParameters
            ? '?' + new URLSearchParams(
                Object.entries(event.queryStringParameters).map(([k, v]) => [k, String(v)])
              ).toString()
            : '';
        const pathname = event.path || '/';
        const originalUrl = pathname + queryStr;
        const url = new URL(protocol + '://' + host + pathname + queryStr);

        const req = {
          originalUrl,
          method: event.httpMethod || 'GET',
          protocol: url.protocol.replace(':', ''),
          hostname: url.hostname,
          headers: { ...(event.headers || {}) },
          get(name) {
            const key = name.toLowerCase();
            const val = this.headers[key];
            return Array.isArray(val) ? val.join(', ') : (val ?? undefined);
          },
        };

        // Attach body stream for POST/PUT/PATCH/DELETE
        if (
          event.body &&
          event.httpMethod !== 'GET' &&
          event.httpMethod !== 'HEAD'
        ) {
          const bodyBuffer = Buffer.from(
            event.body,
            event.isBase64Encoded ? 'base64' : 'utf8'
          );
          Object.assign(req, Readable.from([bodyBuffer]));
        }

        // --- Build capturing mock Express res ---
        const chunks = [];
        let statusCode = 200;
        let statusMessage = 'OK';
        const responseHeaders = {};
        let headersSent = false;
        const eventEmitter = new EventEmitter();

        const res = {
          statusCode,
          statusMessage,
          headersSent,

          status(code) {
            statusCode = code;
            this.statusCode = code;
            return this;
          },

          setHeader(key, value) {
            responseHeaders[key] = value;
          },

          getHeader(key) {
            return responseHeaders[key];
          },

          append(key, value) {
            const existing = responseHeaders[key];
            if (existing) {
              responseHeaders[key] = Array.isArray(existing)
                ? [...existing, value]
                : [existing, value];
            } else {
              responseHeaders[key] = value;
            }
          },

          writeHead(status, headers) {
            statusCode = status;
            statusMessage = 'OK';
            this.statusCode = status;
            this.statusMessage = 'OK';
            headersSent = true;
            this.headersSent = true;
            if (headers) {
              for (const [k, v] of Object.entries(headers)) {
                if (v !== undefined) responseHeaders[k] = v;
              }
            }
          },

          write(chunk) {
            chunks.push(
              Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
            );
            return true;
          },

          end(chunk) {
            if (chunk) {
              chunks.push(
                Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
              );
            }
            this.emit('finish');
          },

          destroy(err) {
            if (err) this.emit('error', err);
            this.emit('close');
          },

          flushHeaders() {},

          writable: true,

          on: eventEmitter.on.bind(eventEmitter),
          once: eventEmitter.once.bind(eventEmitter),
          emit: eventEmitter.emit.bind(eventEmitter),
          addListener: eventEmitter.addListener.bind(eventEmitter),
          removeListener: eventEmitter.removeListener.bind(eventEmitter),
        };

        // --- Call request handler and wait for finish ---
        await new Promise((resolve, reject) => {
          res.on('finish', resolve);
          res.on('error', reject);
          requestHandler(req, res).catch(reject);
        });

        // --- Build Netlify response ---
        const flatHeaders = new Headers();
        for (const [k, v] of Object.entries(responseHeaders)) {
          const val = Array.isArray(v) ? v.join(', ') : String(v);
          flatHeaders.set(k, val);
        }

        return new Response(Buffer.concat(chunks).toString('utf-8'), {
          status: statusCode,
          headers: flatHeaders,
        });
      } catch (error) {
        console.error('Rasengan SSR Error:', error);
        return new Response('Internal Server Error', {
          status: 500,
          headers: { 'content-type': 'text/plain' },
        });
      }
    };
  `;

  await fs.writeFile(
    path.posix.join(opts.functionsDirectory, 'rasengan-ssr.js'),
    ssrHandler
  );
};

/* -------------------------------------------------------------------------- */
/*                         NETLIFY CONFIG.JSON GENERATION                     */
/* -------------------------------------------------------------------------- */

const generateNetlifyConfigFile = async (config: OptimizedAppConfig) => {
  const opts = getNetlifyBuildOptions();

  const netlifyConfig = {
    version: 1,
    functions: {
      directory: opts.functionsDirectory,
      included_files: [
        'ssr-server/**',
        'ssr-client/**',
        'node_modules/**',
        'package.json',
      ],
    },
    redirects: [
      {
        from: '/assets/*',
        to: '/.netlify/v1/static/assets/:splat',
        status: 200,
      },
      {
        from: '/*',
        to: config.ssr
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
