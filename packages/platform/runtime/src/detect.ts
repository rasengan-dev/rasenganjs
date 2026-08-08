/**
 * Convenience re-exports for runtime detection.
 *
 * Usage:
 * ```ts
 * import { detectRuntime } from '@rasenganjs/runtime';
 * const runtime = detectRuntime(); // 'node' | 'bun' | 'workerd' | 'unknown'
 * ```
 */

export type { Runtime } from './types.js';
export { detectRuntime } from './env.js';
