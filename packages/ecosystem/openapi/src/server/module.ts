import {
  Controller,
  defineModule,
  type ModuleConfig,
  type Router as ServerRouter,
} from '@rasenganjs/server';
import {
  OpenApiRegistry,
  type DocumentInfo,
  type SecurityScheme,
} from '../core/registry.js';
import { mountOpenApiDocs } from '../futon/mount-docs.js';

export interface OpenApiModuleOptions {
  /**
   * Where `/openapi.json` and both docs UIs mount, AND the prefix applied
   * to every documented route's path in the generated spec (routes are
   * captured exactly as written in each controller's `routes()`, e.g.
   * `"/orgs"` — the module prefix lives one level up).
   */
  prefix?: string;
  info: DocumentInfo;
  securitySchemes?: Record<string, SecurityScheme>;
  /** Default `"/openapi.json"`. */
  specPath?: string;
  /** Scalar UI. Default `"/docs"`. */
  scalarUiPath?: string;
  /** Swagger UI. Default `"/docs/swagger"`. */
  swaggerUiPath?: string;
  /**
   * Defaults `true`, matching `@rasenganjs/drizzle`'s `DrizzleModule` —
   * any module can inject `OpenApiRegistry` without explicitly importing
   * this one.
   */
  global?: boolean;
}

/**
 * Never instantiated — a static-method namespace, same shape as
 * `@rasenganjs/drizzle`'s `DrizzleModule`. Binds an OpenAPI registry +
 * docs UI onto a Rasengan Server module: `imports: [OpenApiModule.forRoot({...})]`,
 * inject `OpenApiRegistry` from anywhere.
 *
 * No module-level singleton, unlike the internal package this generalizes
 * — `registry` and `DocsController` below are plain closure variables
 * scoped to this one `forRoot()` call, so calling `forRoot()` more than
 * once in the same process (two separate `bootstrap()`s in a test file,
 * for example) produces two independent registries instead of throwing.
 * `{ provide: OpenApiRegistry, useValue: registry }` resolves correctly
 * because `ServerApp.compile()` eagerly resolves every declared provider
 * (RFC-0003) regardless of lifecycle-hook tracking — this registry has
 * no resource to close on `onDestroy()`, so it never needed the
 * `Provider`-instance lifecycle tracking RFC-0012 added either.
 */
export class OpenApiModule {
  static forRoot(opts: OpenApiModuleOptions): ModuleConfig {
    const prefix = opts.prefix ?? '';
    const registry = new OpenApiRegistry({
      info: opts.info,
      securitySchemes: opts.securitySchemes,
      basePath: prefix,
    });

    class DocsController extends Controller {
      routes(router: ServerRouter): void {
        // Server's Router satisfies the same `{ get(path, handler): void }`
        // shape mountOpenApiDocs() was written against for Futon.
        mountOpenApiDocs(router, registry, {
          prefix,
          specPath: opts.specPath,
          scalarUiPath: opts.scalarUiPath,
          swaggerUiPath: opts.swaggerUiPath,
        });
      }
    }

    return defineModule({
      name: 'OpenApiModule',
      prefix,
      controllers: [DocsController],
      providers: [{ provide: OpenApiRegistry, useValue: registry }],
      exports: [OpenApiRegistry],
      global: opts.global ?? true,
    });
  }
}
