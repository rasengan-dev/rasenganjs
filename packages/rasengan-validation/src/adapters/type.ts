/**
 * @module Adapter interface
 *
 * Every schema library adapter must implement `SchemaAdapter`.
 * The interface is minimal — two methods: `parse` and `infer`.
 *
 * See `zod.ts` for a reference implementation.
 */

export type { SchemaAdapter } from '../types.js';
