/**
 * @module Adapters
 *
 * Built-in schema library adapters.
 *
 * Currently shipped:
 * - `zodAdapter` — wraps Zod schemas (requires `zod` as peer dependency)
 *
 * To write your own adapter, implement the `SchemaAdapter` interface
 * from `@rasenganjs/validation`.
 */

export { zodAdapter } from './zod.js';
export type { SchemaAdapter } from './type.js';
