import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RasenganServerConfig } from '../config/index.js';

export async function loadConfig(
  overrides: Partial<RasenganServerConfig> = {}
): Promise<RasenganServerConfig> {
  const cwd = process.cwd();
  const defaults: RasenganServerConfig = {
    entry: 'src/main.ts',
    port: 3000,
    host: '0.0.0.0',
    watchDir: 'src/',
    build: {
      outDir: 'dist',
      minify: true,
      formats: ['single-file', 'directory'],
    },
  };

  let fileConfig: RasenganServerConfig = {};

  const jsPath = join(cwd, 'rasengan.server.js');
  const tsPath = join(cwd, 'rasengan.server.ts');

  try {
    readFileSync(jsPath);
    const mod = await import(pathToFileURL(jsPath).href);
    fileConfig = mod.default || mod;
  } catch {
    try {
      readFileSync(tsPath);
      fileConfig = await loadTSConfig(tsPath);
    } catch {
      console.error(
        "[rasengan-server]: No configuration file found. Using default configuration. You can customize it by providing a 'rasengan.server.js' or 'rasengan.server.ts' file in your project root."
      );
    }
  }

  return { ...defaults, ...fileConfig, ...overrides };
}

async function loadTSConfig(tsPath: string): Promise<RasenganServerConfig> {
  const mod = await import(pathToFileURL(tsPath).href);
  return mod.default || mod;
}

export function parseArgs(argv: string[]): Partial<RasenganServerConfig> {
  const overrides: Partial<RasenganServerConfig> = {};

  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--port':
      case '-p':
        overrides.port = Number(argv[++i]);
        break;
      case '--host':
        overrides.host = argv[++i];
        break;
      case '--entry':
      case '-e':
        overrides.entry = argv[++i];
        break;
      case '--preset':
        overrides.preset = argv[++i] as RasenganServerConfig['preset'];
        break;
      case '--watch-dir':
        overrides.watchDir = argv[++i];
        break;
    }
  }

  return overrides;
}
