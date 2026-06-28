/**
 * @module @rasenganjs/validation
 *
 * Schema validation middleware for `@rasenganjs/runtime`.
 *
 * ## Quick start
 *
 * ```ts
 * import { z } from 'zod';
 * import { createValidationMiddleware, zodAdapter } from '@rasenganjs/validation';
 *
 * const schemas = { body: z.object({ name: z.string() }) };
 * const mw = createValidationMiddleware(schemas, { adapter: zodAdapter });
 * app.post('/users', mw, handler);
 * ```
 *
 * When used with `@rasenganjs/server`, the middleware is injected
 * automatically — you only pass schemas to the Router.
 *
 * ## Available exports
 *
 * | Export | Description |
 * |--------|-------------|
 * | `createValidationMiddleware` | Factory for a runtime Middleware |
 * | `SchemaAdapter` | Interface for schema library adapters |
 * | `SchemaDefinition` | Per-route schema body/params/query (generic) |
 * | `InferBody` | Extract Zod-inferred body type from a SchemaDefinition |
 * | `InferParams` | Extract Zod-inferred params type from a SchemaDefinition |
 * | `InferQuery` | Extract Zod-inferred query type from a SchemaDefinition |
 * | `ValidationConfig` | Global validation configuration |
 * | `ValidationError` | Single field error shape |
 * | `defaultErrorHandler` | Built-in 400 JSON error response |
 * | `zodAdapter` | Zod-specific `SchemaAdapter` implementation |
 */

// ── Core types ─────────────────────────────────────────
export {
  type SchemaAdapter,
  type SchemaDefinition,
  type ValidationConfig,
  type ValidationError,
  type ValidationErrorHandler,
  type InferBody,
  type InferParams,
  type InferQuery,
  defaultErrorHandler,
} from './types.js';

// ── Middleware factory ─────────────────────────────────
export { createValidationMiddleware } from './middleware.js';

// ── Adapters ───────────────────────────────────────────
export { zodAdapter } from './adapters/zod.js';

// ── Error formatting ──────────────────────────────────
export { formatZodError } from './errors.js';
