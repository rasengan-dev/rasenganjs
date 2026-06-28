/**
 * @module Zod adapter
 *
 * Wraps any Zod schema into the generic `SchemaAdapter` interface.
 *
 * @example
 * ```ts
 * import { z } from 'zod';
 * import { zodAdapter } from '@rasenganjs/validation/adapters/zod';
 *
 * const schema = z.object({ name: z.string() });
 * const result = zodAdapter.parse(schema, { name: 'Alice' });
 * // { success: true, data: { name: 'Alice' } }
 * ```
 */

import type { SchemaAdapter } from '../types.js';
import { formatZodError } from '../errors.js';

/**
 * Zod adapter singleton.
 *
 * Uses `schema.safeParse(data)` for safe parsing without try/catch
 * and maps Zod errors to our standard `ValidationError[]` format.
 */
export const zodAdapter: SchemaAdapter = {
  parse(schema: any, data: unknown) {
    const result = schema.safeParse(data);

    if (result.success) {
      return { success: true as const, data: result.data };
    }

    return {
      success: false as const,
      errors: formatZodError(result.error),
    };
  },

  infer(schema: any): unknown {
    // `infer` is a type-level construct only — no runtime behaviour.
    // This method exists so the adapter interface is uniform.
    return undefined;
  },
};
