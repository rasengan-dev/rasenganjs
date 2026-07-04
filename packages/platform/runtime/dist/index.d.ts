import { a as Runtime } from './types-C53UIsik.js';
export { A as Assets, R as RuntimeAdapter, b as RuntimeInfo, S as ServeOptions } from './types-C53UIsik.js';

/**
 * Environment variable utilities.
 *
 * Provides a zero-dependency .env parser (`parseEnv`), standard
 * .env file name generation (`getEnvFileNames`), and runtime
 * environment detection (`detectRuntime`).
 */

/**
 * Key-value map of environment variables.
 */
type EnvironmentMap = Record<string, string>;
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
declare function parseEnv(text: string): EnvironmentMap;
/**
 * Return the standard array of .env file names in load priority order.
 *
 * Later files override earlier ones:
 *   `.env` → `.env.local` → `.env.{mode}` → `.env.{mode}.local`
 *
 * @param mode - The current Node.js environment (`development` or `production`).
 * @returns Ordered list of .env file names.
 */
declare function getEnvFileNames(mode: 'development' | 'production'): string[];
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
declare function detectRuntime(): Runtime;

export { type EnvironmentMap, Runtime, detectRuntime, getEnvFileNames, parseEnv };
