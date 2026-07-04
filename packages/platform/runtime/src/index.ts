/**
 * @rasenganjs/runtime — Unified runtime abstraction layer for Rasengan.JS.
 *
 * ## Main entry (`@rasenganjs/runtime`)
 *
 * Exports core types, environment utilities, and runtime detection.
 * No adapter classes — those live under sub-path exports to avoid
 * circular dependencies with `@rasenganjs/futon`.
 *
 * ```ts
 * import { RuntimeAdapter, parseEnv, detectRuntime } from '@rasenganjs/runtime';
 * ```
 *
 * ## Adapter entries (separate sub-paths)
 *
 * - `@rasenganjs/runtime/adapters/node` — NodeDevAdapter, NodeProdAdapter, etc.
 * - `@rasenganjs/runtime/adapters/bun`  — BunDevAdapter, BunProdAdapter, etc.
 * - `@rasenganjs/runtime/adapters/workerd` — WorkerdProdAdapter
 *
 * ```ts
 * import { NodeDevAdapter } from '@rasenganjs/runtime/adapters/node';
 * ```
 */

// ── Core types ────────────────────────────────────────────────
export type {
  RuntimeAdapter,
  ServeOptions,
  Assets,
  RuntimeInfo,
  Runtime,
} from './types.js';

// ── Environment utilities ─────────────────────────────────────
export type { EnvironmentMap } from './env.js';
export { parseEnv, getEnvFileNames, detectRuntime } from './env.js';
