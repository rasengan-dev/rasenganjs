/**
 * Bun environment file loader.
 *
 * Reads `.env` / `.env.local` / `.env.{mode}` / `.env.{mode}.local`
 * from the project root using `Bun.file()` and merges them in
 * priority order (later files win).
 *
 * @example
 * ```ts
 * const env = await loadBunEnvFiles(process.cwd(), 'development');
 * // env = { PORT: '3000', HOST: 'localhost', ... }
 * ```
 */

import { parseEnv, getEnvFileNames } from '../../env.js';
import type { EnvironmentMap } from '../../env.js';

/**
 * Load environment variables from .env files using the standard
 * dotenv priority order.
 *
 * @param rootDir - Project root directory containing .env files.
 * @param mode    - Current environment (`development` or `production`).
 * @returns Merged key-value map of all environment variables.
 */
export async function loadBunEnvFiles(
  rootDir: string,
  mode: 'development' | 'production'
): Promise<EnvironmentMap> {
  const names = getEnvFileNames(mode);
  let merged: EnvironmentMap = {};

  for (const name of names) {
    try {
      const file = Bun.file(`${rootDir}/${name}`);
      if (await file.exists()) {
        const text = await file.text();
        merged = { ...merged, ...parseEnv(text) };
      }
    } catch {
      // File not found — skip silently
    }
  }

  return merged;
}
