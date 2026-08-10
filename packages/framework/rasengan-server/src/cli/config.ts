import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RasenganServerConfig } from '../config/index.js';

/**
 * Default configuration values used when no user config is found.
 */
const DEFAULT_CONFIG: RasenganServerConfig = {
  entry: 'src/main.ts',
  watchDir: 'src/',
  build: {
    outDir: 'dist',
    minify: true,
    formats: ['directory'],
  },
  preset: 'node',
};

/**
 * Load the server configuration from the project root.
 *
 * Resolution order (highest priority last):
 * 1. Built-in defaults
 * 2. `rasengan.server.js` or `rasengan.server.ts` in the current working directory
 * 3. CLI argument overrides
 *
 * @param overrides - Optional overrides parsed from CLI flags.
 * @returns The merged `RasenganServerConfig` object.
 */
export async function loadConfig(
  overrides: Partial<RasenganServerConfig> = {}
): Promise<RasenganServerConfig> {
  const cwd = process.cwd();

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

  return { ...DEFAULT_CONFIG, ...fileConfig, ...overrides };
}

/**
 * Dynamically import a TypeScript config file.
 * Node.js loads `.ts` files via tsx when `--import tsx` is used
 * or when the file has been pre-compiled.
 */
async function loadTSConfig(tsPath: string): Promise<RasenganServerConfig> {
  const mod = await import(pathToFileURL(tsPath).href);
  return mod.default || mod;
}

/**
 * Parse CLI arguments into a partial `RasenganServerConfig`.
 *
 * Supported flags:
 * - `--port, -p`   → port number
 * - `--host`       → host address
 * - `--entry, -e`  → entry file path
 * - `--preset`     → runtime preset (node|bun|workerd)
 * - `--watch-dir`  → directory to watch for changes
 *
 * @param argv - Raw CLI argument array (e.g. `process.argv.slice(3)`).
 * @returns A partial config object with only the explicitly-set fields.
 */
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
