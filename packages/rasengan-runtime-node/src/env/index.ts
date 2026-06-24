/**
 * Node.js environment file loader.
 *
 * Reads `.env` / `.env.local` / `.env.{mode}` / `.env.{mode}.local`
 * from the project root in priority order and returns the merged
 * result.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseEnv, getEnvFileNames } from '@rasenganjs/runtime';
import type { EnvironmentMap } from '@rasenganjs/runtime';

/**
 * Load environment variables from .env files using the
 * standard dotenv priority order.
 *
 * Later files override earlier ones.
 * Missing files are silently skipped.
 */
export async function loadNodeEnvFiles(
  rootDir: string,
  mode: 'development' | 'production'
): Promise<EnvironmentMap> {
  const names = getEnvFileNames(mode);
  let merged: EnvironmentMap = {};

  for (const name of names) {
    try {
      const text = await readFile(join(rootDir, name), 'utf-8');
      merged = { ...merged, ...parseEnv(text) };
    } catch {
      // File not found — skip
    }
  }

  return merged;
}
