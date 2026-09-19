import {
  extendZodWithOpenApi,
  OpenAPIRegistry as ZodOpenApiRegistry,
  OpenApiGeneratorV31,
} from '@asteasolutions/zod-to-openapi';
import type { OpenAPIObject } from 'openapi3-ts/oas31';
import type { SecuritySchemeObject as SecurityScheme } from 'openapi3-ts/oas31';
import { z } from 'zod';
import type { RouteConfig } from './route-config.js';

// Side-effecting: patches ZodType.prototype with `.openapi()`. Must run
// against the SAME zod module instance the app's schemas are built from
// — `zod` is a peerDependency of this package for exactly that reason (a
// second, hoisting-duplicated copy would silently not have `.openapi()`
// on the app's schemas). See the package README's "Known limitations".
extendZodWithOpenApi(z);

export interface DocumentInfo {
  title: string;
  version: string;
  description?: string;
  // OpenAPI's InfoObject allows arbitrary `x-*` extension fields.
  [key: `x-${string}`]: unknown;
}

/**
 * The real OpenAPI security scheme shape (apiKey/http/oauth2/openIdConnect,
 * every field the spec allows) — re-exported straight from `openapi3-ts`
 * rather than a hand-rolled subset, so this package never needs updating
 * just because a consumer wants a scheme type it doesn't happen to use yet.
 */
export type { SecurityScheme };

export interface OpenApiRegistryOptions {
  info: DocumentInfo;
  securitySchemes?: Record<string, SecurityScheme>;
  /**
   * Prepended to every registered route's path in the generated document.
   * Routes are captured exactly as written by the caller (e.g. `/orgs`)
   * — the prefix lives here, one level up, same split of responsibility
   * the Server adapter's `OpenApiModule.forRoot({ prefix })` already had.
   */
  basePath?: string;
}

/**
 * Plain, instantiable class — no `Provider`, no module-level singleton.
 * Each instance owns its own route table and document; nothing here is
 * shared across instances, so multiple registries (multiple Futon apps,
 * multiple `OpenApiModule.forRoot()` calls) coexist in one process
 * without conflict — unlike the process-wide singleton this package's
 * design replaces.
 */
export class OpenApiRegistry {
  private readonly internal = new ZodOpenApiRegistry();
  private readonly basePath: string;

  constructor(private readonly options: OpenApiRegistryOptions) {
    this.basePath = options.basePath ?? '';
    for (const [name, scheme] of Object.entries(
      options.securitySchemes ?? {}
    )) {
      this.internal.registerComponent('securitySchemes', name, scheme);
    }
  }

  /** Read by `mountOpenApiDocs()` so callers don't need to pass `DocumentInfo` twice. */
  get title(): string {
    return this.options.info.title;
  }

  registerRoute(route: RouteConfig): void {
    this.internal.registerPath({
      ...route,
      path: this.basePath + toOpenApiPath(route.path),
    });
  }

  generateDocument(): OpenAPIObject {
    const generator = new OpenApiGeneratorV31(this.internal.definitions);
    return generator.generateDocument({
      openapi: '3.1.0',
      info: this.options.info,
    });
  }
}

/** `:orgId` (Express/Futon style) → `{orgId}` (OpenAPI path template). */
function toOpenApiPath(path: string): string {
  return path.replace(/:([A-Za-z0-9_]+)/g, '{$1}');
}
