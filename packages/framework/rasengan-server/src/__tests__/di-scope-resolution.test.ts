import { describe, it, expect } from 'vitest';
import { ServerApp } from '../server/app.js';
import { defineModule } from '../server/module.js';
import { Controller } from '../controller/index.js';
import { Provider } from '../di/provider.js';
import type { Router } from '../router/index.js';

/**
 * RFC-0003 — additional module-scope resolution coverage beyond
 * scoped-di.test.ts: multi-level import chains, provider-definition
 * variants (`useValue`/`useClass`/`deps`) combined with scoping, and
 * `global` + explicit `imports` used together.
 */

function compileApp(...modules: ReturnType<typeof defineModule>[]): ServerApp {
  const app = new ServerApp();
  for (const mod of modules) app.registerModule(mod);
  app.compile();
  return app;
}

describe('DI scope — multi-level import chains', () => {
  it('a grandparent module CANNOT see a grandchild export without the middle module re-exporting it', () => {
    // A imports B imports C. RFC-0003 has no re-export forwarding
    // (explicitly deferred) — B seeing C's export does not transitively
    // grant A anything.
    class DeepService extends Provider {}
    const cModule = defineModule({
      name: 'CModule',
      providers: [DeepService],
      exports: [DeepService],
    });
    const bModule = defineModule({
      name: 'BModule',
      imports: [cModule], // B can use DeepService itself, but doesn't re-export it
    });

    class TopController extends Controller {
      constructor(deepService: any) {
        super();
        void deepService;
      }
      routes(_router: Router) {}
    }

    expect(() =>
      compileApp(
        defineModule({
          name: 'AModule',
          imports: [bModule],
          controllers: [TopController],
        })
      )
    ).toThrow(/not visible/);
  });

  it('a three-level chain resolves correctly via a facade provider (the legitimate way to forward visibility)', () => {
    // There is no re-export forwarding, and re-declaring the SAME class
    // as a provider in two modules is rejected as a duplicate-ownership
    // hazard (di-wrong-cases.test.ts) — the correct pattern for "B wants
    // to expose something from C" is a facade B owns and exports, whose
    // OWN dependency on C's export is perfectly normal (B imports C).
    class DeepService extends Provider {
      who() {
        return 'deep';
      }
    }
    const cModule = defineModule({
      name: 'CModule',
      providers: [DeepService],
      exports: [DeepService],
    });
    class BFacade extends Provider {
      constructor(public deepService: DeepService) {
        super();
      }
    }
    const bModule = defineModule({
      name: 'BModule',
      imports: [cModule],
      providers: [BFacade],
      exports: [BFacade],
    });

    let injected: any;
    class TopController extends Controller {
      constructor(bFacade: any) {
        super();
        injected = bFacade;
      }
      routes(_router: Router) {}
    }

    compileApp(
      defineModule({
        name: 'AModule',
        imports: [bModule],
        controllers: [TopController],
      })
    );
    expect(injected).toBeInstanceOf(BFacade);
    expect(injected.deepService).toBeInstanceOf(DeepService);
    expect(injected.deepService.who()).toBe('deep');
  });
});

describe('DI scope — provider definition variants', () => {
  it('useValue returns the exact given instance, not a new construction', () => {
    class Config extends Provider {
      loaded = true;
    }
    const preBuilt = new Config();
    preBuilt.loaded = false; // distinguishable from a fresh `new Config()`

    let injected: any;
    class ConsumerController extends Controller {
      constructor(config: any) {
        super();
        injected = config;
      }
      routes(_router: Router) {}
    }

    compileApp(
      defineModule({
        name: 'M',
        providers: [{ provide: Config, useValue: preBuilt }],
        controllers: [ConsumerController],
      })
    );
    expect(injected).toBe(preBuilt);
    expect(injected.loaded).toBe(false);
  });

  it('useClass aliasing resolves to an instance of the aliased class', () => {
    abstract class Logger extends Provider {
      abstract log(msg: string): void;
    }
    class ConsoleLogger extends Logger {
      log() {}
    }

    let injected: any;
    class ConsumerController extends Controller {
      constructor(logger: any) {
        super();
        injected = logger;
      }
      routes(_router: Router) {}
    }

    compileApp(
      defineModule({
        name: 'M',
        providers: [{ provide: Logger, useClass: ConsoleLogger }],
        controllers: [ConsumerController],
      })
    );
    expect(injected).toBeInstanceOf(ConsoleLogger);
  });

  it("explicit `deps` resolves each dependency in the PROVIDER's owning scope, not the requester's", () => {
    class PrivateRepo extends Provider {
      data = 'private-to-M';
    }
    class ServiceWithExplicitDeps extends Provider {
      constructor(public repo: PrivateRepo) {
        super();
      }
    }

    const mModule = defineModule({
      name: 'M',
      providers: [
        PrivateRepo, // never exported
        {
          provide: ServiceWithExplicitDeps,
          useClass: ServiceWithExplicitDeps,
          deps: [PrivateRepo],
        },
      ],
      exports: [ServiceWithExplicitDeps],
    });

    let injected: any;
    class ConsumerController extends Controller {
      constructor(serviceWithExplicitDeps: any) {
        super();
        injected = serviceWithExplicitDeps;
      }
      routes(_router: Router) {}
    }

    compileApp(
      defineModule({
        name: 'AppModule',
        imports: [mModule],
        controllers: [ConsumerController],
      })
    );
    expect(injected).toBeInstanceOf(ServiceWithExplicitDeps);
    expect(injected.repo).toBeInstanceOf(PrivateRepo);
    expect(injected.repo.data).toBe('private-to-M');
  });
});

describe('DI scope — global modules combined with explicit imports', () => {
  it('a global module can ALSO be explicitly imported without breaking singleton identity', () => {
    class ConfigService extends Provider {}
    const configModule = defineModule({
      name: 'ConfigModule',
      global: true,
      providers: [ConfigService],
      exports: [ConfigService],
    });

    let seenViaImport: any;
    let seenViaGlobal: any;
    class ImportingController extends Controller {
      constructor(configService: any) {
        super();
        seenViaImport = configService;
      }
      routes(_router: Router) {}
    }
    class GlobalOnlyController extends Controller {
      constructor(configService: any) {
        super();
        seenViaGlobal = configService;
      }
      routes(_router: Router) {}
    }

    compileApp(
      configModule,
      defineModule({
        name: 'ImportingModule',
        imports: [configModule], // redundant alongside `global: true`, must be harmless
        controllers: [ImportingController],
      }),
      defineModule({
        name: 'GlobalOnlyModule',
        controllers: [GlobalOnlyController], // no imports — relies on `global` alone
      })
    );

    expect(seenViaImport).toBeInstanceOf(ConfigService);
    expect(seenViaGlobal).toBeInstanceOf(ConfigService);
    expect(seenViaImport).toBe(seenViaGlobal);
  });
});
