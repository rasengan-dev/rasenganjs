import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import type { ZodTypeAny } from 'zod';

export type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface RouteDoc {
  summary: string;
  description?: string;
  tags?: string[];
  /** OpenAPI security requirement objects, e.g. `[{ session: [] }]`. */
  security?: Array<Record<string, string[]>>;
  responses: Record<number, { description: string; schema?: ZodTypeAny }>;
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
    method,
    path,
    summary: doc.summary,
    description: doc.description,
    tags: doc.tags,
    security: doc.security,
    request: schema
      ? {
          body: schema.body
            ? { content: { 'application/json': { schema: schema.body } } }
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
            ? { 'application/json': { schema: r.schema } }
            : undefined,
        },
      ])
    ),
  };
}
