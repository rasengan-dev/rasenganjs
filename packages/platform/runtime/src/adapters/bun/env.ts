/**
 * Bun environment file loader.
 *
 * Reads `.env` / `.env.local` / `.env.{mode}` / `.env.{mode}.local`
 * from the project root using `Bun.file()` and merges them in
 * priority order (later files win).
 *
 * Also assigns every merged key into `process.env` (Bun aliases
 * `Bun.env` to the same underlying object), skipping any key already
 * set there (RFC-0010) — a real environment variable (shell, CI, a
 * platform-injected secret) always wins over a `.env*` file's value.
 * This is what makes the standard `process.env.X` idiom work for app
 * code and third-party libraries alike; the returned map is still fed
 * into `Futon.loadEnv()` by callers for the portable
 * `app.env`/`ctx.runtime.env` access path.
 *
 * @example
 * ```ts
 * const env = await loadBunEnvFiles(process.cwd(), 'development');
 * // env = { PORT: '3000', HOST: 'localhost', ... }
 * // process.env.PORT === '3000' unless already set
 * ```
 */

import { parseEnv, getEnvFileNames } from '../../env.js';
import type { EnvironmentMap } from '../../env.js';

/**
 * Load environment variables from .env files using the standard
 * dotenv priority order, and apply them to `process.env`.
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

  for (const [key, value] of Object.entries(merged)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return merged;
}

/**
 * List which of the standard `.env*` files actually exist in `rootDir`,
 * in the same priority order `loadBunEnvFiles` reads them (RFC-0010).
 *
 * Display-only — a separate existence check rather than a return value
 * of `loadBunEnvFiles` itself, so callers that only need the merged map
 * (the vast majority) aren't forced to destructure a wrapper object.
 * Startup-only cost (at most 4 existence checks).
 *
 * @param rootDir - Project root directory containing .env files.
 * @param mode    - Current environment (`development` or `production`).
 * @returns Filenames that exist, in load-priority order.
 */
export async function getLoadedEnvFiles(
  rootDir: string,
  mode: 'development' | 'production'
): Promise<string[]> {
  const names = getEnvFileNames(mode);
  const found: string[] = [];

  for (const name of names) {
    try {
      if (await Bun.file(`${rootDir}/${name}`).exists()) {
        found.push(name);
      }
    } catch {
      // File not found — skip
    }
  }

  return found;
}
