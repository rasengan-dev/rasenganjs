import { html, json } from '@rasenganjs/futon';
import type { OpenApiRegistry } from '../core/registry.js';
import { scalarHtml } from '../core/scalar.js';
import { swaggerHtml } from '../core/swagger.js';

export interface MountOptions {
  /**
   * Prepended to `specPath`/`scalarUiPath`/`swaggerUiPath` when building
   * each UI's absolute spec URL — NOT applied to `target`'s own routing
   * (a Futon `Router`/`app` mounted under a prefix already handles that
   * itself, e.g. via `app.group(prefix, ...)`).
   */
  prefix?: string;
  /** Default `"/openapi.json"`. */
  specPath?: string;
  /** Scalar UI. Default `"/docs"`. */
  scalarUiPath?: string;
  /** Swagger UI. Default `"/docs/swagger"`. */
  swaggerUiPath?: string;
}

/**
 * Mounts the OpenAPI spec + both docs UIs onto anything shaped
 * `{ get(path, handler): void }` — a Futon `Router`, a Futon `Futon` app
 * instance directly, or (since the shape is structural, not nominal) a
 * Rasengan Server `Router` too. `server/module.ts` reuses this verbatim
 * for `DocsController.routes()` rather than re-implementing it.
 */
export function mountOpenApiDocs(
  target: { get(path: string, handler: (ctx: any) => Promise<Response>): void },
  registry: OpenApiRegistry,
  options: MountOptions = {}
): void {
  const specPath = options.specPath ?? '/openapi.json';
  const scalarUiPath = options.scalarUiPath ?? '/docs';
  const swaggerUiPath = options.swaggerUiPath ?? '/docs/swagger';
  const prefix = options.prefix ?? '';

  target.get(specPath, async () => json(registry.generateDocument()));
  target.get(scalarUiPath, async () =>
    html(scalarHtml({ specUrl: prefix + specPath, title: registry.title }))
  );
  target.get(swaggerUiPath, async () =>
    html(swaggerHtml({ specUrl: prefix + specPath, title: registry.title }))
  );
}
