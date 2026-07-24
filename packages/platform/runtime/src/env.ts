/**
 * Environment variable utilities.
 *
 * Provides a zero-dependency .env parser (`parseEnv`), standard
 * .env file name generation (`getEnvFileNames`), and runtime
 * environment detection (`detectRuntime`).
 */

import type { Runtime } from './types.js';

/**
 * Key-value map of environment variables.
 */
export type EnvironmentMap = Record<string, string>;

/**
 * Parse the text content of a .env file into a key-value map.
 *
 * Supports:
 * - `KEY=VALUE` lines
 * - `#` comments
 * - single/double quoted values
 * - `export` prefix (silently ignored)
 * - blank lines skipped
 *
 * Later keys override earlier ones (within a single file).
 *
 * @example
 * ```ts
 * parseEnv('PORT=3000\nHOST=localhost')
 * // => { PORT: '3000', HOST: 'localhost' }
 * ```
 *
 * @param text - Raw content of a .env file.
 * @returns Parsed key-value pairs.
 */
export function parseEnv(text: string): EnvironmentMap {
  const env: EnvironmentMap = {};

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();

    // Skip blank lines and comments
    if (!line || line.startsWith('#')) continue;

    // Strip optional `export` prefix
    const withoutExport = line.startsWith('export ')
      ? line.slice(7).trimStart()
      : line;

    // Find the first `=` separating key from value
    const eqIdx = withoutExport.indexOf('=');
    if (eqIdx === -1) continue;

    const key = withoutExport.slice(0, eqIdx).trim();
    if (!key) continue;

    let value = withoutExport.slice(eqIdx + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

/**
 * Return the standard array of .env file names in load priority order.
 *
 * Later files override earlier ones:
 *   `.env` → `.env.local` → `.env.{mode}` → `.env.{mode}.local`
 *
 * @param mode - The current Node.js environment (`development` or `production`).
 * @returns Ordered list of .env file names.
 */
export function getEnvFileNames(mode: 'development' | 'production'): string[] {
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
}

/**
 * Detect the current JavaScript runtime environment.
 *
 * Detection order:
 * 1. Bun — via `process.versions.bun`
 * 2. Node.js — via `process.versions.node`
 * 3. Workerd — via `FetchEvent` global
 * 4. Unknown — fallback
 *
 * @returns The detected runtime label.
 */
export function detectRuntime(): Runtime {
  // Bun exposes a `bun` property on `process.versions`
  if (typeof process !== 'undefined' && (process as any).versions?.bun) {
    return 'bun';
  }

  // Node.js exposes a `node` property on `process.versions`
  if (
    typeof process !== 'undefined' &&
    typeof (process as any).versions?.node === 'string'
  ) {
    return 'node';
  }

  // Workerd (Cloudflare Workers) exposes `FetchEvent` as a global
  if (typeof self !== 'undefined' && typeof FetchEvent !== 'undefined') {
    return 'workerd';
  }

  return 'unknown';
}
