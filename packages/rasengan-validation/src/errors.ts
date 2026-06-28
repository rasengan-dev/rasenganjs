import type { ValidationError } from './types.js';

/**
 * Format Zod errors into our standard `ValidationError[]` shape.
 *
 * Each Zod issue is mapped to a `{ path, message, code }` tuple.
 *
 * @param zodError — The error object thrown by `zod.schema.parse()`
 * @returns Normalised error array
 */
export function formatZodError(zodError: {
  issues?: Array<{ path: (string | number)[]; message: string; code?: string }>;
}): ValidationError[] {
  if (!zodError.issues || !Array.isArray(zodError.issues)) {
    return [
      {
        path: [],
        message: 'Validation failed',
        code: 'UNKNOWN',
      },
    ];
  }

  return zodError.issues.map((issue) => ({
    path: issue.path ?? [],
    message: issue.message,
    code: issue.code,
  }));
}
