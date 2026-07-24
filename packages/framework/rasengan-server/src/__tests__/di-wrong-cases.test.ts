import { describe, it, expect } from 'vitest';
import { ServerApp } from '../server/app.js';
import { defineModule } from '../server/module.js';
import { Controller } from '../controller/index.js';
import { Provider } from '../di/provider.js';
import type { Router } from '../router/index.js';

/**
 * RFC-0003 — deliberately WRONG module/DI configurations, all of which
 * the container must reject at compile() with a directed error.
 *
 * The circular-dependency, duplicate-registration, and ambiguous-import
 * cases were found during a 2026-07-20 deep review NOT rejecting
 * correctly (silent hijack / silent first-wins / stack overflow — see
 * memory: project_rfc_0003_scoped_di.md) and were fixed the same day.
 */

function compileApp(...modules: ReturnType<typeof defineModule>[]): ServerApp {
  const app = new ServerApp();
  for (const mod of modules) app.registerModule(mod);
  app.compile();
  return app;
}

describe('DI wrong cases — correctly rejected today', () => {
  it("a provider's own dependency reaching into a non-imported module is rejected", () => {
    // Not just controllers (already covered in scoped-di.test.ts) — a
    // PROVIDER's own constructor deps must be scope-checked too.
    class Isolated extends Provider {}
    const isolatedModule = defineModule({
      name: 'IsolatedModule',
      providers: [Isolated], // not exported
    });

    class NeedsIsolated extends Provider {
      constructor(public isolated: any) {
        super();
      }
    }

    expect(() =>
      compileApp(
        isolatedModule,
        defineModule({ name: 'M', providers: [NeedsIsolated] })
      )
    ).toThrow(/not visible|Cannot resolve/);
  });

  it('explicit `deps` does not bypass visibility — an invisible token still throws', () => {
    class Invisible extends Provider {}
    const invisibleModule = defineModule({
      name: 'InvisibleModule',
      providers: [Invisible], // not exported
    });

    class NeedsExplicitDep extends Provider {
      constructor(public dep: any) {
        super();
      }
    }

    expect(() =>
      compileApp(
        invisibleModule,
        defineModule({
          name: 'M',
          providers: [
            {
              provide: NeedsExplicitDep,
              useClass: NeedsExplicitDep,
              deps: [Invisible],
            },
          ],
        })
      )
    ).toThrow(/not visible/);
  });

  it('a module declaring an unknown extension key with no matching plugin throws', () => {
    expect(() =>
      compileApp(
        defineModule({
          name: 'M',
          somethingNoPluginClaims: [class {}],
        })
      )
    ).toThrow(/unknown key|no.*matching plugin/i);
  });

  it('a controller missing `routes(router)` throws a directed error', () => {
    class BrokenController extends Controller {
      // no routes() method
    }

    expect(() =>
      compileApp(
        defineModule({ name: 'M', controllers: [BrokenController as any] })
      )
    ).toThrow(/missing a `routes\(router\)` method/);
  });

  it('a typo constructor parameter name fails at compile with a directed hint', () => {
    class HasTypo extends Provider {
      constructor(public thisNameDoesNotMatchAnyClass: unknown) {
        super();
      }
    }

    expect(() =>
      compileApp(defineModule({ name: 'M', providers: [HasTypo] }))
    ).toThrow(/thisNameDoesNotMatchAnyClass/);
  });

  it('a circular dependency between two providers throws a directed error naming the cycle', () => {
    class A extends Provider {
      constructor(public b: any) {
        super();
      }
    }
    class B extends Provider {
      constructor(public a: any) {
        super();
      }
    }

    expect(() =>
      compileApp(defineModule({ name: 'M', providers: [A, B] }))
    ).toThrow(/Circular dependency detected: A → B → A/);
  });

  it('registering the same provider class in two different modules is rejected', () => {
    class Shared extends Provider {}

    expect(() =>
      compileApp(
        defineModule({ name: 'AModule', providers: [Shared] }),
        defineModule({ name: 'BModule', providers: [Shared] })
      )
    ).toThrow(/Shared is already registered by module "AModule"/);
  });

  it('re-registering the same provider under the SAME module is idempotent, not an error', () => {
    class Shared extends Provider {}

    expect(() =>
      compileApp(defineModule({ name: 'M', providers: [Shared, Shared] }))
    ).not.toThrow();
  });

  it('two different imported modules exporting a same-named provider are rejected as ambiguous', () => {
    const ConfigA = class Config extends Provider {};
    const ConfigB = class Config extends Provider {};

    const modX = defineModule({
      name: 'ModX',
      providers: [ConfigA],
      exports: [ConfigA],
    });
    const modY = defineModule({
      name: 'ModY',
      providers: [ConfigB],
      exports: [ConfigB],
    });

    class ConsumerController extends Controller {
      constructor(config: any) {
        super();
        void config;
      }
      routes(_router: Router) {}
    }

    expect(() =>
      compileApp(
        defineModule({
          name: 'AppModule',
          imports: [modX, modY],
          controllers: [ConsumerController],
        })
      )
    ).toThrow(/"config" is ambiguous.*ModX.*ModY/s);
  });
});
