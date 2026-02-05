import { resolveBuildOptions } from 'rasengan/server';
import { AdapterConfig, AdapterOptions, Adapters } from 'rasengan/plugin';
import { OptimizedAppConfig } from 'rasengan';
import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import { execa } from 'execa';

interface VercelBuildOptions {
  buildDirectory: string;
  staticDirectory: string;
  functionsDirectory: string;
  serverDirectory: string;
  clientDirectory: string;
  configFile: string;
  serverlessConfigFile: string;
  serverlessHandler: string;
}

const getVercelBuildOptions = (): VercelBuildOptions => {
  const vercelBuildOptions: VercelBuildOptions = {
    buildDirectory: '.vercel/output',
    staticDirectory: '/static',
    functionsDirectory: '/functions/index.func',
    serverDirectory: '/server',
    clientDirectory: '/client',
    configFile: 'config.json',
    serverlessConfigFile: '.vc-config.json',
    serverlessHandler: 'index.js',
  };

  return vercelBuildOptions;
};

const checkVercelDirectory = async (vercelBuildOptions: VercelBuildOptions) => {
  try {
    await fs.access(vercelBuildOptions.buildDirectory);
    return true;
  } catch (error) {
    return false;
  }
};

const generateVercelDirectory = async (config: OptimizedAppConfig) => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Check if the .vercel directory exists
  const directoryExists = await checkVercelDirectory(vercelBuildOptions);

  if (directoryExists) {
    // Remove the existing .vercel directory
    await fs.rm(vercelBuildOptions.buildDirectory, { recursive: true });
  }

  // Create a new .vercel/output directory
  await fs.mkdir(vercelBuildOptions.buildDirectory, { recursive: true });

  // Create a new .vercel/static directory
  await fs.mkdir(
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.staticDirectory
    ),
    { recursive: true }
  );

  // We only need serverless functions if SSR is enabled and prerendering is disabled
  if (config.ssr && !config.prerender) {
    // Create a new .vercel/output/functions directory
    await fs.mkdir(
      path.posix.join(
        vercelBuildOptions.buildDirectory,
        vercelBuildOptions.functionsDirectory
      ),
      { recursive: true }
    );

    // Create a new .vercel/output/functions/index.func/server directory
    await fs.mkdir(
      path.posix.join(
        vercelBuildOptions.buildDirectory,
        vercelBuildOptions.functionsDirectory,
        vercelBuildOptions.serverDirectory
      ),
      { recursive: true }
    );

    // Create a new .vercel/output/functions/index.func/client directory
    await fs.mkdir(
      path.posix.join(
        vercelBuildOptions.buildDirectory,
        vercelBuildOptions.functionsDirectory,
        vercelBuildOptions.clientDirectory
      ),
      { recursive: true }
    );
  }
};

const generateVercelConfigFile = async (config: OptimizedAppConfig) => {
  const vercelBuildOptions = getVercelBuildOptions();
  const buildOptions = resolveBuildOptions({});

  // Check if spa-fallback.html exists
  let isSpaFallbackExists = false;

  if (config.prerender) {
    isSpaFallbackExists = fsSync.existsSync(
      path.posix.join(buildOptions.staticDirectory, 'spa-fallback.html')
    );
  }

  // Redirections coming from rasengan.config.js file
  const customRedirects = config.redirects.map((r) => ({
    src: r.source,
    dest: r.destination,
  }));

  // Default Vercel configuration
  const vercelConfig = {
    version: 3,
    framework: {
      name: 'rasengan',
      version: '1.2.0',
    },
    routes: [
      {
        src: '/favicon.ico',
        dest: '/favicon.ico',
      },
      {
        src: '/assets/(.*)',
        dest: '/assets/$1',
      },
      {
        src: '/(.*)',
        dest: '/$1',
      },

      // Custom redirects coming from the rasengan.config.js file
      // We define them just before the final route definitation
      ...customRedirects,

      {
        src: '/(.*)',
        dest: config.ssr
          ? '/'
          : isSpaFallbackExists
            ? '/spa-fallback.html'
            : '/index.html',
      },
    ],
  };

  // Write the configuration to the .vercel/output/config.json file
  await fs.writeFile(
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.configFile
    ),
    JSON.stringify(vercelConfig, null, 2)
  );
};

const generateServerlessConfigFile = async () => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Default Vercel configuration
  const serverlessConfig = {
    runtime: 'nodejs22.x',
    handler: 'index.js',
    maxDuration: 10,
    launcherType: 'Nodejs',
    shouldAddHelpers: true,
    shouldAddSourcemapSupport: true,
  };

  // Write the configuration to the .vercel/output/.vc-config.json file
  await fs.writeFile(
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.functionsDirectory,
      vercelBuildOptions.serverlessConfigFile
    ),
    JSON.stringify(serverlessConfig, null, 2)
  );
};

const generatePackageJson = async () => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Load the package.json from the project root
  const packageJsonPath = path.resolve('package.json');
  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
  const packageJsonData = JSON.parse(packageJsonContent);

  // Default Vercel package.json
  const packageJson = {
    type: 'module',
    dependencies: {
      ...packageJsonData.dependencies,
    },
  };

  // Write the package.json to the .vercel/output/functions/index.func/package.json file
  await fs.writeFile(
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.functionsDirectory,
      'package.json'
    ),
    JSON.stringify(packageJson, null, 2)
  );
};

const runInstall = async () => {
  try {
    const vercelBuildOptions = getVercelBuildOptions();

    console.log('Running npm install for serverless function...');

    // Run npm install in the .vercel/output/functions/index.func directory
    execa('npm', ['install', '--legacy-peer-deps'], {
      cwd: path.posix.join(
        vercelBuildOptions.buildDirectory,
        vercelBuildOptions.functionsDirectory
      ),
    });
  } catch (error) {
    console.error(error);
  }
};

const generateServerlessHandler = async () => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Default Vercel handler
  const serverlessHandler = `
  import { createRequestHandler, resolveBuildOptions, express, compression } from 'rasengan/server';
  import path from 'node:path';

  // Create an Express app
  const app = express();

  // Resolve the build options (e.g., using the current working directory)
  const buildOptions = resolveBuildOptions({
    buildDirectory: process.cwd(),
  });

  // Create the Rasengan request handler with the build options
  const requestHandler = createRequestHandler({
    build: buildOptions,
  });

  app.disable('x-powered-by');
  app.use(compression());
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

  // Forward all requests to the Rasengan handler
  app.all('*', async (req, res, next) => {
    try {
      await requestHandler(req, res);
    } catch (err) {
      next(err);
    }
  });

  // Export the Express app wrapped as a serverless function
  export default app;
  `;

  // Write the handler to the .vercel/output/functions/index.js file
  await fs.writeFile(
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.functionsDirectory,
      vercelBuildOptions.serverlessHandler
    ),
    serverlessHandler
  );
};

const copyNodeModules = async () => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Copy the node_modules folder from the project root to .vercel/output/functions/index.func/server/node_modules
  await fs.cp(
    path.posix.join(process.cwd(), 'node_modules'),
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.functionsDirectory,
      'node_modules'
    ),
    { recursive: true }
  );
};

const copyStaticFiles = async (config: OptimizedAppConfig) => {
  const vercelBuildOptions = getVercelBuildOptions();
  const buildOptions = resolveBuildOptions({});

  // Copy folders and files from dist/client (or dist in spa mode) (or static in ssg mode) to .vercel/output/static
  await fs.cp(
    path.posix.join(
      config.prerender
        ? buildOptions.staticDirectory
        : config.ssr
          ? path.posix.join(
              buildOptions.buildDirectory,
              buildOptions.clientPathDirectory
            )
          : buildOptions.buildDirectory
    ),
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.staticDirectory
    ),
    { recursive: true }
  );
};

const copyServerFiles = async () => {
  const vercelBuildOptions = getVercelBuildOptions();
  const buildOptions = resolveBuildOptions({});

  // Copy folders and files from dist/server to .vercel/output/functions/index.func/server
  await fs.cp(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.serverPathDirectory
    ),
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.functionsDirectory,
      vercelBuildOptions.serverDirectory
    ),
    { recursive: true }
  );

  // Copy folders and files from dist/client to .vercel/output/functions/index.func/client
  await fs.cp(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.clientPathDirectory
    ),
    path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.functionsDirectory,
      vercelBuildOptions.clientDirectory
    ),
    { recursive: true }
  );
};

const loadRasenganConfig = async () => {
  const buildOptions = resolveBuildOptions({});

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
    fsSync.existsSync(path)
  );

  if (!configPath) {
    throw new Error(
      'No config.json file found in dist/client/assets or dist/assets'
    );
  }

  // Load the Rasengan configuration file
  const configData = await fs.readFile(configPath, 'utf8');

  // Return the configuration
  return JSON.parse(configData) as OptimizedAppConfig;
};

const prepare = async (options: AdapterOptions) => {
  // Load the Rasengan configuration file
  const config = await loadRasenganConfig();

  // Prepare the Vercel directory
  await generateVercelDirectory(config);

  // Prepare the Vercel configuration file
  await generateVercelConfigFile(config);

  // Copy static files to the Vercel directory
  await copyStaticFiles(config);

  if (config.ssr && !config.prerender) {
    // Copy server files to the Vercel directory
    await copyServerFiles();

    // Prepare the serverless configuration file
    await generateServerlessConfigFile();

    // Prepare the serverless handler
    await generateServerlessHandler();

    // Generate the package.json
    await generatePackageJson();

    // Run install
    await runInstall();

    // Copy the node_modules folder to the Vercel directory
    // await copyNodeModules();
  }
};

export const configure = (options: AdapterOptions): AdapterConfig => {
  return {
    name: Adapters.VERCEL,
    prepare: async () => {
      await prepare(options);
    },
  };
};
