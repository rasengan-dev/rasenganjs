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
  baseDirectory: string; // .netlify
  versionDirectory: string; // .netlify/v1
  functionsDirectory: string; // .netlify/v1/functions
  edgeFunctionsDirectory: string; // .netlify/v1/edge-functions
  // staticDirectory: string; // public/static assets
  configFile: string; // .netlify/v1/config.json
}

const getNetlifyBuildOptions = (): NetlifyBuildOptions => ({
  baseDirectory: '.netlify',
  versionDirectory: '.netlify/v1',
  functionsDirectory: '.netlify/v1/functions',
  edgeFunctionsDirectory: '.netlify/v1/edge-functions',
  // staticDirectory: '.netlify/v1/static',
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

  await fs.mkdir(opts.versionDirectory, { recursive: true });
  await fs.mkdir(opts.functionsDirectory, { recursive: true });
  await fs.mkdir(opts.edgeFunctionsDirectory, { recursive: true });
  // await fs.mkdir(opts.staticDirectory, { recursive: true });
};

/* -------------------------------------------------------------------------- */
/*                           STATIC FILES COPY                                */
/* -------------------------------------------------------------------------- */

// const copyStaticFiles = async (config: OptimizedAppConfig) => {
//   const opts = getNetlifyBuildOptions();
//   const buildOptions = resolveBuildOptions({});

//   await fs.cp(
//     path.posix.join(
//       buildOptions.buildDirectory,
//       config.ssr ? buildOptions.clientPathDirectory : ''
//     ),
//     opts.staticDirectory,
//     { recursive: true }
//   );
// };

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

    const buildOptions = resolveBuildOptions({
      buildDirectory: path.posix.join(process.cwd(), 'dist'),
    });

    const handler = createRequestHandler({
      build: buildOptions,
    });

    export default async (event, context) => {
      const url = "https://" + event.headers.host + event.rawUrl;

      console.log({ event });

      const req = new Request(url, {
        method: event.httpMethod,
        headers: event.headers,
        body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body,
      });

      console.log({ req });

      const res = await handler(req);

      console.log({ res });

      let body = undefined;

      // Handle streaming HTML
      if (res.body) {
        try {
          // Convert Web ReadableStream → Node.js Readable
          body = Readable.fromWeb(res.body);
        } catch {
          // Fallback for environments without fromWeb()
          const reader = res.body.getReader();
          body = new Readable({
            async read() {
              const { value, done } = await reader.read();
              if (done) return this.push(null);
              this.push(Buffer.from(value));
            },
          });
        }
      }

      return {
        statusCode: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body,
      };
    };

    export const config = {
      path: "/*",
      excludedPath: [
        "/assets/*",
        "/*.@(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|xml|txt)"
      ],
      preferStatic: true,
      
      // Use esbuild to bundle everything into one file
      nodeBundler: "esbuild",
      
      // Include your server directory
      includedFiles: ["dist/server/**", "node_modules/**", "package.json"],

      nodeVersion: "22",
      
      // generator: "rasengan@1.2.0",
      // name: "Rasengan SSR"
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
    functions: {
      directory: opts.functionsDirectory,
      included_files: ['dist/server/**'],
    },
    redirects: [
      {
        from: '/assets/*',
        to: config.ssr ? '/client/assets/:splat' : '/assets/:splat',
        status: 200,
      },
      {
        from: '/*',
        to: config.ssr ? '/.netlify/functions/rasengan-ssr' : '/index.html',
        status: 200,
      },
    ],
    edge_functions: [],
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
  // await copyStaticFiles(config);
  await copyServerFiles(config);
  await generateSSRHandler(config);
  await generateNetlifyConfigFile(config);
};

/* -------------------------------------------------------------------------- */
/*                              EXPORT ADAPTER                                */
/* -------------------------------------------------------------------------- */

export const configure = (options: AdapterOptions): AdapterConfig => {
  return {
    name: Adapters.VERCEL,
    // name: Adapters.NETLIFY,
    prepare: async () => {
      await prepare(options);
    },
  };
};
