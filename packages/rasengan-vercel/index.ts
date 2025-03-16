import { resolveBuildOptions } from 'rasengan/server';
import { AdapterConfig, AdapterOptions, Adapters } from 'rasengan/plugin';
import { AppConfig } from 'rasengan';
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

const generateVercelDirectory = async (config: { ssr: AppConfig['ssr'] }) => {
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

  if (config.ssr) {
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

const generateVercelConfigFile = async (config: { ssr: AppConfig['ssr'] }) => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Default Vercel configuration
  const vercelConfig = {
    version: 3,
    framework: {
      name: 'rasengan',
      version: '1.0.0',
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
        dest: config.ssr ? '/' : '/index.html',
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

const generateServerlessHandler = async () => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Default Vercel handler
  const serverlessHandler = `
  import express from 'express';
  import { createRequestHandler, resolveBuildOptions } from 'rasengan/server';
  import compression from 'compression';
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
      express: '^4.17.1',
      compression: '^1.7.5',
    },
  };

  // Write the package.json to the .vercel/output/package.json file
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
  const vercelBuildOptions = getVercelBuildOptions();

  console.log('Running npm install for serverless function');

  // Run npm install in the .vercel/output/functions/index.func directory
  execa('npm', ['i', '--force'], {
    cwd: path.posix.join(
      vercelBuildOptions.buildDirectory,
      vercelBuildOptions.functionsDirectory
    ),
  });
};

const copyStaticFiles = async () => {
  const vercelBuildOptions = getVercelBuildOptions();
  const buildOptions = resolveBuildOptions({});

  // Copy folders and files from dist/client to .vercel/output/static
  await fs.cp(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.clientPathDirectory
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

  // Load the Rasengan configuration file
  const configData = await fs.readFile(
    path.posix.join(
      buildOptions.buildDirectory,
      buildOptions.clientPathDirectory,
      buildOptions.assetPathDirectory,
      'config.json'
    ),
    'utf8'
  );
  const config = JSON.parse(configData);

  // Return the configuration
  return config;
};

const prepare = async (options: AdapterOptions) => {
  // Load the Rasengan configuration file
  const config = (await loadRasenganConfig()) as { ssr: AppConfig['ssr'] };

  // Prepare the Vercel directory
  await generateVercelDirectory(config);

  // Prepare the Vercel configuration file
  await generateVercelConfigFile(config);

  // Copy static files to the Vercel directory
  await copyStaticFiles();

  if (config.ssr) {
    // Copy server files to the Vercel directory
    await copyServerFiles();

    // Prepare the serverless configuration file
    await generateServerlessConfigFile();

    // Prepare the serverless handler
    await generateServerlessHandler();

    // Prepare the package.json
    await generatePackageJson();

    // Run npm install
    await runInstall();
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
