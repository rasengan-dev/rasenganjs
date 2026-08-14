import { ResolvedConfig, type Plugin } from 'vite';
import path, { resolve } from 'path';
import fs from 'fs';
import { loadModuleSSR } from '../config/utils/load-modules.js';
import { AppConfig, AppConfigFunctionAsync } from '../config/type.js';
import { detectDeploymentPlatform, resolveBuildOptions } from '../../server.js';
import { renderIndexHTML } from '../../server/build/rendering.js';
import { createVirtualModule } from '../../server/virtual/index.js';
import { pathToFileURL } from 'url';
import { preRenderApp } from '../../server/node/pre-render.js';

function loadRasenganGlobal(): Plugin {
  return {
    name: 'vite-plugin-rasengan-config',
    async config() {
      let version = '';

      try {
        const rasenganPkgPath = resolve(
          process.cwd(),
          'node_modules/rasengan/package.json'
        );

        if (fs.existsSync(rasenganPkgPath)) {
          const raw = fs.readFileSync(rasenganPkgPath, { encoding: 'utf-8' });
          version = JSON.parse(raw).version || '';
        }
      } catch {}

      const rasenganConfig = {
        version,
        ssr: true,
      };

      return {
        define: {
          ['Rasengan']: JSON.stringify(rasenganConfig),
        },
      };
    },
  };
}

function rasenganConfigPlugin(): Plugin {
  const virtualModuleId = 'virtual:rasengan-config';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-rasengan-config',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // if (command !== "build") return;

        const configPath = resolve(process.cwd(), 'rasengan.config.js');

        if (!fs.existsSync(configPath)) {
          throw new Error(`Configuration file not found at: ${configPath}`);
        }

        const rasenganConfig: AppConfig = await (
          await loadModuleSSR(configPath)
        ).default;

        const partialConfig = {
          server: rasenganConfig.server ?? {},
          redirects: rasenganConfig.redirects
            ? await rasenganConfig.redirects()
            : [],
        };

        return `
          export const __RASENGAN_CONFIG__ = ${JSON.stringify(partialConfig)};
        `;
      }
    },
  };
}

function flatRoutesPlugin(): Plugin {
  const { id: virtualModuleId, resolvedId } = createVirtualModule('router');

  return {
    name: 'vite-plugin-rasengan-router',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedId;
      }
    },
    async load(id: string) {
      if (id === resolvedId) {
        return `
          import { flatRoutes } from 'rasengan';

          const Router = flatRoutes(() => {
            return import.meta.glob(
              [
                '/src/app/_routes/**/layout.{js,ts,jsx,tsx}',
                '/src/app/_routes/**/*.page.{md,mdx,js,ts,jsx,tsx}',
              ],
            );
          });

          export default Router;
        `;
      }
    },
  };
}

function flatApiRoutesPlugin(): Plugin {
  const { id: virtualModuleId, resolvedId } = createVirtualModule('api-router');

  return {
    name: 'vite-plugin-rasengan-api-router',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedId;
      }
    },
    async load(id: string) {
      if (id === resolvedId) {
        // Self-contained read of the user's config, mirroring
        // rasenganConfigPlugin() above — the prefix has to be baked
        // into the router itself (routes are matched against the full
        // incoming pathname), not stripped at dispatch time, so it
        // needs to reach flatApiRoutes() here at router-build time.
        const configPath = resolve(process.cwd(), 'rasengan.config.js');
        let prefix = '/api';

        if (fs.existsSync(configPath)) {
          const rasenganConfigHandler: AppConfigFunctionAsync = await (
            await loadModuleSSR(configPath)
          ).default;
          const rasenganConfig = await rasenganConfigHandler();

          prefix = rasenganConfig.api?.prefix ?? '/api';
        }

        return `
          import { flatApiRoutes } from 'rasengan/server';

          const ApiRouter = flatApiRoutes(() => {
            return import.meta.glob(
              [
                '/src/app/_api/**/middleware.{js,ts}',
                '/src/app/_api/**/*.route.{js,ts}',
              ],
            );
          }, { prefix: ${JSON.stringify(prefix)} });

          export default ApiRouter;
        `;
      }
    },
  };
}

function buildOutputInformation(): Plugin {
  const { id: virtualModuleId, resolvedId } = createVirtualModule('build-info');

  return {
    name: 'vite-plugin-rasengan-build-info',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedId;
      }
    },
    async load(id: string) {
      if (id === resolvedId) {
        return `
          export const resolveBuildOptions = (buildPath) => {
            return {
              buildDirectory: buildPath,
              manifestPathDirectory: 'client/.vite',
              assetPathDirectory: 'client/assets',
              entryServerPath: 'server/entry.server.js',
            };
          };
        `;
      }
    },
  };
}

/**
 * This plugin is responsible for fixing the path of the C drive on Windows.
 */
const fixCPathPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-rasengan-fix-c-path',
    resolveId(source) {
      if (/^c:[\\/]/i.test(source)) {
        const fullPath = path.resolve(source.replace(/^c:/i, 'C:'));
        return pathToFileURL(fullPath).href;
      }
      return null;
    },
    enforce: 'pre',
  };
};

export const Adapters = {
  VERCEL: 'vercel',
  NETLIFY: 'netlify',
  CLOUDFLARE: 'cloudflare',
  DEFAULT: '',
} as const;

export type Adapter = (typeof Adapters)[keyof typeof Adapters];

export interface AdapterOptions {}

export interface AdapterConfig {
  name: Adapter;
  prepare: () => Promise<void>;
}

type RasenganPluginOptions = {
  adapter?: AdapterConfig;
};

/**
 * This plugin is responsible for building the app.
 * @param param0
 * @returns
 */
export function rasengan({
  adapter = { name: Adapters.DEFAULT, prepare: async () => {} },
}: RasenganPluginOptions = {}): Plugin {
  let config: AppConfig;
  let viteConfig: ResolvedConfig;

  // Reference id for the SPA-mode template chunk emitted in
  // `buildStart` and picked up from `bundle` in `generateBundle` —
  // see the comment there for why this replaced a `this.load()` call.
  let templateChunkRef: string | undefined;

  const buildOptions = resolveBuildOptions({});

  return {
    name: 'vite-plugin-rasengan',

    async config(_userConfig, env) {
      // load rasengan.config.js
      const configPath = resolve(process.cwd(), 'rasengan.config.js');

      if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found at: ${configPath}`);
      }

      const rasenganConfigHandler: AppConfigFunctionAsync = await (
        await loadModuleSSR(configPath)
      ).default;

      config = await rasenganConfigHandler();

      // RFC-0008 §9 — build-only: dev always has a live server, so
      // _api/ works there regardless of ssr/prerender. In a build,
      // dist/server/api-router.js (what createApiRouterMiddleware
      // looks for) is only ever produced when the ssr environment
      // itself gets built — exactly `config.ssr && !config.prerender`
      // (see builder.buildApp below). No adapter changes this:
      // @rasenganjs/vercel's prepare() only generates a serverless
      // function under that same exact condition, never for SPA/SSG.
      if (
        env.command === 'build' &&
        fs.existsSync(resolve(process.cwd(), 'src/app/_api')) &&
        !(config.ssr && !config.prerender)
      ) {
        throw new Error(
          `src/app/_api/ was found, but this build has no server to run it on ` +
            `(requires ssr: true with prerender disabled). API routes are ` +
            `built into dist/server/api-router.js, which only exists when the ` +
            `ssr environment itself is built — set ssr: true and remove/disable ` +
            `prerender, or remove src/app/_api/ if you don't need API routes ` +
            `for this build.`
        );
      }
    },

    async load(id: string) {
      if (id === 'virtual:rasengan-config') {
        return `
          export const __RASENGAN_CONFIG__ = ${JSON.stringify(config)};
        `;
      }
    },

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    // Emits `src/template.(j|t)sx` as a real chunk entry so it goes through
    // the full bundling graph (imports resolved, shared deps split into
    // sibling chunks). We used to fetch it via `this.load({id})` in an
    // output-phase hook, but under Rolldown that returns null for a module
    // that was never part of the actual bundle's input graph — `emitFile`
    // is the supported way to add an out-of-band entry.
    async buildStart() {
      templateChunkRef = undefined;

      // Only needed for the client build in SPA mode — SSR/SSG modes
      // compile template.tsx as part of their own server entry graph.
      if (this.environment.name !== 'client') return;
      if (config.ssr || config.prerender) return;

      const modulePaths = ['template.jsx', 'template.tsx'].map((file) => {
        return path.posix.join(process.cwd(), 'src', file);
      });
      const modulePath = modulePaths.find((modulePath) => {
        return fs.existsSync(modulePath);
      });

      if (!modulePath) return;

      templateChunkRef = this.emitFile({
        type: 'chunk',
        id: modulePath,
        // Nothing else in the real client bundle imports this chunk, so
        // without this rolldown treats its top-level exports as unused and
        // strips them — including `export default` — leaving an empty
        // module. This forces it to keep its full export signature.
        preserveSignature: 'strict',
      });
    },

    generateBundle(_, bundle) {
      if (!templateChunkRef) return;

      const fileName = this.getFileName(templateChunkRef);
      const chunk = bundle[fileName];

      if (chunk && chunk.type === 'chunk') {
        // generateBundle runs before rolldown writes the bundle to disk, so
        // the output directory doesn't exist on the filesystem yet.
        const outDir = path.posix.join(
          process.cwd(),
          buildOptions.buildDirectory,
          buildOptions.assetPathDirectory
        );
        fs.mkdirSync(outDir, { recursive: true });

        // Write it under the fixed name closeBundle expects, then drop it
        // from the bundle so it isn't also emitted under its hashed name.
        fs.writeFileSync(
          path.posix.join(outDir, 'template.js'),
          chunk.code,
          'utf-8'
        );

        delete bundle[fileName];
      }
    },

    async closeBundle() {
      // We check here if the environment is client has been built because it's the
      // last environment to be built in the Vite build process
      if (this.environment.name === 'client') {
        // Generate a config.json file into the dist/client/assets or dist/assets
        const minimizedConfig = {
          buildOptions,
          runtime: config.runtime ?? 'node',
          ssr: config.ssr,
          prerender: !!config.prerender,
          // undefined (omitted) when the app has no _api/ folder — lets
          // createApiRouterMiddleware()'s callers skip wiring it in
          // entirely instead of relying on a default prefix that implies
          // a router that doesn't exist (RFC-0008).
          api: fs.existsSync(resolve(process.cwd(), 'src/app/_api'))
            ? { prefix: config.api?.prefix ?? '/api' }
            : undefined,
          redirects: await config.redirects(),
        };

        fs.writeFileSync(
          path.posix.join(
            process.cwd(),
            buildOptions.buildDirectory,
            config.ssr || config.prerender
              ? buildOptions.clientPathDirectory
              : '',
            buildOptions.assetPathDirectory,
            'config.json'
          ),
          JSON.stringify(minimizedConfig),
          'utf-8'
        );

        // Enable the generation of spa-fallback.html during pre-rendering
        // Only if every pages are not generated
        // @default to false - we assume that all pages are not generated
        let enableIndexFallback = false;

        // Handling the prerendering
        if (config.prerender) {
          let routes = [];
          const buildOptions = resolveBuildOptions({
            serverPathDirectory: 'prerender',
          });

          if (typeof config.prerender === 'object') {
            routes = config.prerender.routes || [];
          }

          const outDir = `${process.cwd()}/static`;

          const { isIndexPrerendered } = await preRenderApp({
            build: buildOptions,
            outDir,
            routes,
          });

          enableIndexFallback = isIndexPrerendered;
        }

        // Check if SPA or SSG mode is enabled
        if (!config.ssr || config.prerender) {
          // Load the template.js file
          let templatePath = '';

          if (config.prerender) {
            templatePath = path.posix.join(
              process.cwd(),
              buildOptions.buildDirectory,
              'prerender',
              'template.js'
            );
          } else {
            templatePath = path.posix.join(
              process.cwd(),
              buildOptions.buildDirectory,
              buildOptions.assetPathDirectory,
              'template.js'
            );
          }

          const Template = (await import(templatePath)).default;

          // Render the index.html file
          await renderIndexHTML(Template, {
            rootPath: process.cwd(),
            config,
            enableIndexFallback,
          });
        }

        // Detect deployment platform (Vercel, Netlify, ...) — not the JS runtime
        const platform = detectDeploymentPlatform();
        console.log(`Detected deployment platform: ${platform}`);

        // Cloudflare deploys via a separate `wrangler deploy` step, not a
        // hosted build environment `rasengan build` runs inside of the way
        // Vercel/Netlify's own build runners do — there's no reliable env
        // var to detect at `vite build` time (RFC-0009 Open Questions).
        // The adapter being explicitly configured is signal enough on its
        // own, so it bypasses the platform-detection gate below.
        if (
          adapter.name === Adapters.CLOUDFLARE ||
          (platform !== 'local' && platform !== 'unknown')
        ) {
          // Prepare the app for deployment
          await prepareToDeploy(adapter);
        }
      }
    },

    apply: 'build',
  };
}

const prepareToDeploy = async (adapter: AdapterConfig): Promise<void> => {
  // Preparing app for deployment
  await adapter.prepare();
};

export const plugins: Plugin[] = [
  // fixCPathPlugin(),
  loadRasenganGlobal(),
  flatRoutesPlugin(),
  flatApiRoutesPlugin(),
];
