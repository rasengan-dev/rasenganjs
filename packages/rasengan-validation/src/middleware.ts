/**
 * @module Validation middleware
 *
 * Creates a runtime Middleware that validates `body`, `params`, and/or `query`
 * against the provided schemas and mutates the context in-place with the
 * parsed (coerced, default-filled) data.
 *
 * Execution:
 * 1. Read raw data from `ctx` (body via `ctx.body`, params
 *    via `ctx.params`, query via `ctx.query` properties)
 * 2. Validate each present schema via the configured adapter
 * 3. On success: replace `ctx` values with parsed output
 * 4. On failure: short-circuit with the configured error handler
 *
 * The middleware is created once per route at compilation time and
 * injected into the route-level middleware chain.
 */

import type { Context, Middleware } from '@rasenganjs/runtime';
import {
  type SchemaDefinition,
  type ValidationConfig,
  type ValidationError,
  defaultErrorHandler,
  type SchemaAdapter,
} from './types.js';

type ParseSuccess = { success: true; data: any };
type ParseFailure = { success: false; errors: ValidationError[] };
type ParseResult = ParseSuccess | ParseFailure;

function isSuccess(result: ParseResult): result is ParseSuccess {
  return result.success === true;
}

function isFailure(result: ParseResult): result is ParseFailure {
  return result.success === false;
}

/**
 * Create a validation middleware from a schema definition and global config.
 *
 * @param schemas  — The per-route schema definition (body, params, query)
 * @param config   — Global validation config (adapter, default onError)
 * @returns        A runtime Middleware
 */
export function createValidationMiddleware(
  schemas: SchemaDefinition,
  config: ValidationConfig
): Middleware {
  const adapter: SchemaAdapter = config.adapter!;
  const onError = config.onError ?? defaultErrorHandler;

  return async (
    ctx: Context,
    next: () => Promise<Response>
  ): Promise<Response> => {
    const allErrors: ValidationError[] = [];

    // ── Validate params ──────────────────────────────────────
    if (schemas.params) {
      const result: ParseResult = adapter.parse(schemas.params, ctx.params);
      if (isSuccess(result)) {
        Object.assign(ctx.params, result.data);
      }
      if (isFailure(result)) {
        allErrors.push(...result.errors);
      }
    }

    // ── Validate query ─────────────────────────────────────────
    if (schemas.query) {
      const rawQuery: Record<string, string> = {};
      for (const key of Object.keys(ctx.query as any)) {
        const val: string | undefined = (ctx.query as any)[key];
        if (val !== undefined) {
          rawQuery[key] = val;
        }
      }
      const result: ParseResult = adapter.parse(schemas.query, rawQuery);
      if (isSuccess(result)) {
        ctx.set('validatedQuery', result.data);
      }
      if (isFailure(result)) {
        allErrors.push(...result.errors);
      }
    }

    // ── Validate body ─────────────────────────────────────────
    if (schemas.body) {
      const rawBody = ctx.body;
      const result: ParseResult = adapter.parse(schemas.body, rawBody);
      if (isSuccess(result)) {
        ctx.body = result.data;
        ctx.set('parsedBody', result.data);
      }
      if (isFailure(result)) {
        allErrors.push(...result.errors);
      }
    }

    // ── Short-circuit on validation failure ──────────────────
    if (allErrors.length > 0) {
      const handler = schemas.onError ?? onError;
      return handler(allErrors, ctx);
    }

    return next();
  };
}
