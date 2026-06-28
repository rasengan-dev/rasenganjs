/**
 * Bun environment file loader.
 *
 * Reads `.env` / `.env.local` / `.env.{mode}` / `.env.{mode}.local`
 * from the project root in priority order and returns the merged
 * result.
 */

import { parseEnv, getEnvFileNames } from '@rasenganjs/runtime';
import type { EnvironmentMap } from '@rasenganjs/runtime';

/**
 * Load environment variables from .env files using the
 * standard dotenv priority order.
 *
 * Later files override earlier ones.
 * Missing files are silently skipped.
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
      // File not found — skip
    }
  }

  return merged;
}
