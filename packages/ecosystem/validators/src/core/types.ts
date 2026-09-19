import type { Context } from '@rasenganjs/futon';

/**
 * Single validation error with a human-readable message
 * and a JSON pointer–style path to the offending field.
 */
export interface ValidationError {
  /** Field path, e.g. `["address", "city"]` */
  path: (string | number)[];
  /** Human-readable error message */
  message: string;
  /** Machine-readable error code (adapter-specific) */
  code?: string;
}

/**
 * Adapter interface — any schema library (Zod, Valibot, ArkType, …)
 * can be used by implementing this interface.
 *
 * @typeParam TSchema — The schema type (e.g. `ZodTypeAny`)
 * @typeParam TOutput  — The inferred output type
 */
export interface SchemaAdapter<TSchema = any, TOutput = any> {
  /**
   * Parse (and coerce) data against the schema.
   *
   * Must return either:
   * - `{ success: true, data: TOutput }` on success
   * - `{ success: false, errors: ValidationError[] }` on failure
   */
  parse<O = TOutput>(
    schema: TSchema,
    data: unknown
  ): { success: true; data: O } | { success: false; errors: ValidationError[] };

  /**
   * Return the inferred output type of a schema.
   * Only used for TypeScript type inference (no runtime effect).
   */
  infer<T>(schema: T): unknown;
}

/**
 * Schema definitions for a single route — each field is optional.
 * Passed as the last argument to `router.get/post/…`.
 *
 * Generic type params `B`, `P`, `Q` preserve the raw schema types
 * so the Router overloads can extract inferred output types via
 * `InferBody` / `InferParams` / `InferQuery`.
 *
 * @example
 * ```ts
 * router.post('/users', handler, {
 *   body: z.object({ name: z.string() }),
 *   params: z.object({ id: z.string() }),
 *   query: z.object({ page: z.string().optional() }),
 * });
 * ```
 *
 * @typeParam B — Body schema type (e.g. `ZodObject<…>`)
 * @typeParam P — Params schema type
 * @typeParam Q — Query schema type
 */
export interface SchemaDefinition<B = any, P = any, Q = any> {
  /** Schema for the request body */
  body?: B;
  /** Schema for URL path parameters */
  params?: P;
  /** Schema for query string parameters */
  query?: Q;
  /**
   * Per-route error handler override.
   * If omitted, the global `ValidationConfig.onError` is used.
   */
  onError?: ValidationErrorHandler;
}

/**
 * Handler for validation errors — returns a Response.
 */
export type ValidationErrorHandler = (
  errors: ValidationError[],
  ctx: Context
) => Response | Promise<Response>;

/**
 * Global validation configuration set on `ServerApp`.
 *
 * @example
 * ```ts
 * app.configureValidation({
 *   adapter: zodAdapter,
 *   onError: (errors, ctx) =>
 *     Response.json({ code: 'VALIDATION_ERROR', errors }, { status: 422 }),
 * });
 * ```
 */
export interface ValidationConfig {
  /**
   * Schema adapter to use for parsing.
   * Defaults to the built-in Zod adapter if Zod is installed.
   */
  adapter?: SchemaAdapter;
  /**
   * Default error handler for validation failures.
   * Returns a 400 JSON response with `{ errors: […] }` by default.
   */
  onError?: ValidationErrorHandler;
}

/**
 * Default validation error handler.
 * Returns a 400 JSON response with structured errors.
 */
export function defaultErrorHandler(
  errors: ValidationError[],
  _ctx: Context
): Response {
  return Response.json({ errors }, { status: 400 });
}

/**
 * Extract the inferred output type for the `body` field of a
 * `SchemaDefinition`.
 *
 * - When `body` is a Zod schema, extracts the inner `TOutput` via
 *   `ZodType<infer T>` → drops Zod wrapper, keeps the user-facing type.
 * - When `body` is omitted (undefined) → fall back to `any`.
 * - For non-Zod schemas → fall back to `any` (no generic inference).
 *
 * Used by the Router overloads to type `ctx.body` on the handler.
 *
 * @example
 * ```ts
 * type B = InferBody<{ body: typeof z.object({ name: z.string() }) }>;
 * // B = { name: string }
 * ```
 */
export type InferBody<S extends SchemaDefinition> =
  S['body'] extends ZodType<infer T>
    ? T
    : S['body'] extends undefined
      ? any
      : any;

/**
 * Extract the inferred output type for the `params` field.
 *
 * When omitted → fall back to `Record<string, string>`.
 */
export type InferParams<S extends SchemaDefinition> =
  S['params'] extends ZodType<infer T>
    ? T
    : S['params'] extends undefined
      ? Record<string, string>
      : Record<string, string>;

/**
 * Extract the inferred output type for the `query` field.
 *
 * When omitted → fall back to `Record<string, string>`.
 */
export type InferQuery<S extends SchemaDefinition> =
  S['query'] extends ZodType<infer T>
    ? T
    : S['query'] extends undefined
      ? Record<string, string>
      : Record<string, string>;

// Lazy Zod import so the package works without Zod installed.
// `InferBody` / `InferParams` / `InferQuery` only reference
// `ZodType` if the user's TypeScript can see it.
// Consumers who don't use Zod get `any` fallback — no compile errors.
import type { ZodType } from 'zod';
