import { resolveBuildOptions } from 'rasengan/server';
import { AdapterConfig, AdapterOptions, Adapters } from 'rasengan/plugin';
import path from 'node:path';
import fs from 'node:fs/promises';
import { execa } from 'execa';

interface VercelBuildOptions {
  buildDirectory: string;
  staticDirectory: string;
  functionsDirectory: string;
  serverDirectory: string;
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

const generateVercelDirectory = async () => {
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
};

const generateVercelConfigFile = async () => {
  const vercelBuildOptions = getVercelBuildOptions();

  // Default Vercel configuration
  const vercelConfig = {
    version: 3,
    framework: {
      name: 'rasengan',
      version: '1.0.0',
    },
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
    maxDuration: 3,
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
  import { createRequestHandler, resolveBuildOptions } from 'rasengan/server';
  import path from 'node:path';

  export default function index(req, res) {
    const buildOptions = resolveBuildOptions({
      buildDirectory: ".vercel/output",
      clientPathDirectory: "static",
      serverPathDirectory: path.posix.join(
        "functions/index.func",
        'server'
      ),
    });

    const requestHandler = createRequestHandler({
      build: buildOptions,
    });

    return requestHandler(req, res);
  }
  `;

  /**
   * const serverlessHandler = `
  const { createRequestHandler, resolveBuildOptions } = require('rasengan/server');
  const path = require('node:path');

  module.exports = (req, res) => {
    const buildOptions = resolveBuildOptions({
      buildDirectory: ".vercel/output",
      clientPathDirectory: "static",
      serverPathDirectory: path.posix.join(
        "functions/index.func",
        'server'
      ),
    });

    const requestHandler = createRequestHandler({
      build: buildOptions,
    });

    return requestHandler(req, res);
  } 
  `;
   */

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

  // Default Vercel package.json
  const packageJson = {
    type: 'module',
    dependencies: {
      rasengan: '1.0.0-beta.51',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
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
  execa('npm', ['i'], {
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
      'server'
    ),
    { recursive: true }
  );
};

const prepare = async (options: AdapterOptions) => {
  // Prepare the Vercel directory
  await generateVercelDirectory();

  // Prepare the Vercel configuration file
  await generateVercelConfigFile();

  // Copy static files to the Vercel directory
  await copyStaticFiles();

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
};

export const configure = (options: AdapterOptions): AdapterConfig => {
  return {
    name: Adapters.VERCEL,
    prepare: async () => {
      await prepare(options);
    },
  };
};
