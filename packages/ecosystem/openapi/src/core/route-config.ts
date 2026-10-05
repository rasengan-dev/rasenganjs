import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import type { ZodTypeAny } from 'zod';

export type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface RouteDoc {
  summary: string;
  description?: string;
  tags?: string[];
  /** A unique, stable name for the operation: an anchor for docs, a method name for client generators. */
  operationId?: string;
  deprecated?: boolean;
  /** OpenAPI security requirement objects, e.g. `[{ session: [] }]`. */
  security?: Array<Record<string, string[]>>;
  /** A sample request body, emitted as the body's `application/json` `example`. Ignored without a body schema. */
  bodyExample?: unknown;
  responses: Record<
    number,
    { description: string; schema?: ZodTypeAny; example?: unknown }
  >;
  // OpenAPI's OperationObject allows arbitrary `x-*` extension fields,
  // copied onto the operation as written.
  [key: `x-${string}`]: unknown;
}

/**
 * The only per-route schema shape this package understands for
 * documentation purposes — a structural subset of
 * `@rasenganjs/validators`' `SchemaDefinition` (which also allows
 * `onError` and non-Zod adapters). Neither `DocumentedRouter` variant
 * needs to know about anything beyond these three fields.
 *
 * Fields are typed `any`, not `ZodTypeAny`: `zod-to-openapi`'s own
 * `RouteConfig['request']` pins `params`/`query` to its internal
 * `ZodObjectWithEffect` type, narrower than the public `ZodTypeAny` a
 * caller's schema is typed as. `any` here matches what
 * `@rasenganjs/validators`' bare (non-generic) `SchemaDefinition` already
 * resolves to at this call site — this package never re-validates the
 * schema itself, it only forwards it into `zod-to-openapi`, which does
 * its own runtime introspection regardless of the static type it's
 * handed.
 */
export interface RouteSchema {
  body?: any;
  params?: any;
  query?: any;
}

/**
 * Builds a `zod-to-openapi` `RouteConfig` from a route's schema (if any)
 * and its `RouteDoc`. Pure — knows nothing about which `Router` flavor
 * the route came from, so both `futon/documented-router.ts` and
 * `server/documented-router.ts` call this directly instead of each
 * re-implementing the schema/doc → `RouteConfig` conversion.
 */
export function buildRouteConfig(
  method: HttpMethod,
  path: string,
  schema: RouteSchema | undefined,
  doc: RouteDoc
): RouteConfig {
  return {
    ...extensionsOf(doc),
    method,
    path,
    summary: doc.summary,
    description: doc.description,
    tags: doc.tags,
    operationId: doc.operationId,
    deprecated: doc.deprecated,
    security: doc.security,
    request: schema
      ? {
          body: schema.body
            ? {
                content: {
                  'application/json': withExample(
                    { schema: schema.body },
                    doc.bodyExample
                  ),
                },
              }
            : undefined,
          params: schema.params,
          query: schema.query,
        }
      : undefined,
    responses: Object.fromEntries(
      Object.entries(doc.responses).map(([status, r]) => [
        status,
        {
          description: r.description,
          content: r.schema
            ? {
                'application/json': withExample(
                  { schema: r.schema },
                  r.example
                ),
              }
            : undefined,
        },
      ])
    ),
  };
}

/** The doc's `x-*` fields, and nothing else: an unknown key never reaches the document. */
function extensionsOf(doc: RouteDoc): Record<`x-${string}`, unknown> {
  return Object.fromEntries(
    Object.entries(doc).filter(([key]) => key.startsWith('x-'))
  );
}

/** Adds `example` only when one was given, so a document without examples stays byte-identical. */
function withExample<T extends object>(
  media: T,
  example: unknown
): T & { example?: unknown } {
  return example === undefined ? media : { ...media, example };
}
