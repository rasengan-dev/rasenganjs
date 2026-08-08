import { describe, it, expect } from 'vitest';
import { ServerApp } from '../server/app.js';
import { defineModule, type ModuleConfig } from '../server/module.js';
import { Controller } from '../controller/index.js';
import { Provider } from '../di/provider.js';
import type { Router } from '../router/index.js';

/**
 * RFC-0003 — module-scoped DI + eager resolution, exercised through the
 * real compile() pipeline (not the bare container), across the module
 * topologies the RFC calls out.
 */

function compileApp(...modules: ModuleConfig[]): ServerApp {
  const app = new ServerApp();
  for (const mod of modules) app.registerModule(mod);
  app.compile();
  return app;
}

/** A controller that records what got injected into it. */
function probeController(): {
  ctrl: new (...args: any[]) => Controller;
  seen: () => any;
} {
  let injected: any;
  class ProbeController extends Controller {
    constructor(userService: any) {
      super();
      injected = userService;
    }
    routes(_router: Router) {}
  }
  return { ctrl: ProbeController, seen: () => injected };
}

class UserService extends Provider {
  who() {
    return 'users';
  }
}

class UserRepository extends Provider {}

describe('RFC-0003 — visibility', () => {
  it('a controller resolves its own module providers', () => {
    const { ctrl, seen } = probeController();
    compileApp(
      defineModule({
        name: 'UserModule',
        providers: [UserService],
        controllers: [ctrl],
      })
    );
    expect(seen()).toBeInstanceOf(UserService);
  });

  it('an exported provider is visible through imports', () => {
    const { ctrl, seen } = probeController();
    const userModule = defineModule({
      name: 'UserModule',
      providers: [UserService],
      exports: [UserService],
    });
    compileApp(
      defineModule({
        name: 'AppModule',
        imports: [userModule],
        controllers: [ctrl],
      })
    );
    expect(seen()).toBeInstanceOf(UserService);
  });

  it('a non-exported provider is INVISIBLE through imports', () => {
    const { ctrl } = probeController();
    const userModule = defineModule({
      name: 'UserModule',
      providers: [UserService], // not exported
    });
    expect(() =>
      compileApp(
        defineModule({
          name: 'AppModule',
          imports: [userModule],
          controllers: [ctrl],
        })
      )
    ).toThrow(/not visible|Cannot resolve/);
  });

  it('an exported provider is invisible WITHOUT the import', () => {
    const { ctrl } = probeController();
    // Both modules registered at the root — no imports relationship.
    const userModule = defineModule({
      name: 'UserModule',
      providers: [UserService],
      exports: [UserService],
    });
    expect(() =>
      compileApp(
        userModule,
        defineModule({ name: 'AppModule', controllers: [ctrl] })
      )
    ).toThrow(/not visible/);
  });

  it('the visibility error names the owner and the fix', () => {
    const { ctrl } = probeController();
    const userModule = defineModule({
      name: 'UserModule',
      providers: [UserService],
    });
    try {
      compileApp(
        userModule,
        defineModule({ name: 'AppModule', controllers: [ctrl] })
      );
      expect.unreachable('compile() should have thrown');
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toContain('AppModule');
      expect(message).toContain('UserModule');
      expect(message).toContain('exports');
      expect(message).toContain('imports');
    }
  });

  it('global modules are visible everywhere without imports', () => {
    const { ctrl, seen } = probeController();
    class ConfigHolder extends Provider {}
    // The probe injects a param literally named `userService` — reuse it.
    const globalModule = defineModule({
      name: 'ConfigModule',
      global: true,
      providers: [{ provide: UserService, useValue: new UserService() }],
      exports: [UserService],
    });
    compileApp(
      globalModule,
      defineModule({ name: 'AppModule', controllers: [ctrl] })
    );
    expect(seen()).toBeInstanceOf(UserService);
    void ConfigHolder;
  });

  it('exporting an undeclared token fails at boot', () => {
    expect(() =>
      compileApp(
        defineModule({
          name: 'BadModule',
          providers: [],
          exports: [UserService],
        })
      )
    ).toThrow(/does not declare it in `providers`/);
  });
});

describe('RFC-0003 — singletons across module topologies', () => {
  it('diamond imports share ONE instance', () => {
    const constructed: UserService[] = [];
    class TrackedService extends Provider {
      constructor() {
        super();
        constructed.push(this as any);
      }
    }

    let a: any, b: any;
    class AController extends Controller {
      constructor(trackedService: any) {
        super();
        a = trackedService;
      }
      routes() {}
    }
    class BController extends Controller {
      constructor(trackedService: any) {
        super();
        b = trackedService;
      }
      routes() {}
    }

    const shared = defineModule({
      name: 'SharedModule',
      providers: [TrackedService],
      exports: [TrackedService],
    });
    compileApp(
      defineModule({
        name: 'AModule',
        imports: [shared],
        controllers: [AController],
      }),
      defineModule({
        name: 'BModule',
        imports: [shared],
        controllers: [BController],
      })
    );

    expect(a).toBe(b);
    expect(constructed).toHaveLength(1);
  });

  it('sibling modules can own same-named private providers without colliding', () => {
    const instances: string[] = [];
    // Two distinct classes with the SAME name, one per module — the exact
    // silent-collision hazard the RFC fixes.
    const makeConfigService = (tag: string) => {
      class ConfigService extends Provider {
        tag = tag;
        constructor() {
          super();
          instances.push(tag);
        }
      }
      return ConfigService;
    };
    const AConfig = makeConfigService('a');
    const BConfig = makeConfigService('b');

    let aSeen: any, bSeen: any;
    class AController extends Controller {
      constructor(configService: any) {
        super();
        aSeen = configService;
      }
      routes() {}
    }
    class BController extends Controller {
      constructor(configService: any) {
        super();
        bSeen = configService;
      }
      routes() {}
    }

    compileApp(
      defineModule({
        name: 'AModule',
        providers: [AConfig],
        controllers: [AController],
      }),
      defineModule({
        name: 'BModule',
        providers: [BConfig],
        controllers: [BController],
      })
    );

    expect(aSeen.tag).toBe('a');
    expect(bSeen.tag).toBe('b');
    expect(aSeen).not.toBe(bSeen);
  });

  it("a provider's own deps resolve in its OWNING module scope", () => {
    // UserService privately injects UserRepository; the consumer module
    // never sees the repository, yet triggering resolution from there
    // must still construct the full chain.
    class RepoUser extends Provider {
      constructor(public userRepository: UserRepository) {
        super();
      }
    }

    let seen: any;
    class ConsumerController extends Controller {
      constructor(repoUser: any) {
        super();
        seen = repoUser;
      }
      routes() {}
    }

    const userModule = defineModule({
      name: 'UserModule',
      providers: [RepoUser, UserRepository], // repository NOT exported
      exports: [RepoUser],
    });
    compileApp(
      defineModule({
        name: 'AppModule',
        imports: [userModule],
        controllers: [ConsumerController],
      })
    );

    expect(seen).toBeInstanceOf(RepoUser);
    expect(seen.userRepository).toBeInstanceOf(UserRepository);
  });

  it('cyclic module imports terminate', () => {
    const a: ModuleConfig = defineModule({ name: 'A', providers: [] });
    const b: ModuleConfig = defineModule({
      name: 'B',
      imports: [a],
      providers: [],
    });
    a.imports = [b];
    expect(() => compileApp(a)).not.toThrow();
  });
});

describe('RFC-0003 — eager resolution', () => {
  it('onInit fires for a provider NOTHING injects', async () => {
    let initialized = false;
    class LoneScheduler extends Provider {
      async onInit() {
        initialized = true;
      }
    }

    compileApp(
      defineModule({ name: 'JobsModule', providers: [LoneScheduler] })
    );
    // initAll() is fired (not awaited) by compile(); yield a tick.
    await new Promise((r) => setTimeout(r, 10));
    expect(initialized).toBe(true);
  });

  it('a broken dependency fails at compile, not first request', () => {
    class Broken extends Provider {
      constructor(public doesNotExist: unknown) {
        super();
      }
    }
    expect(() =>
      compileApp(defineModule({ name: 'M', providers: [Broken] }))
    ).toThrow(/doesNotExist/);
  });

  it('onDestroy runs in reverse resolution order on close()', async () => {
    const order: string[] = [];
    class First extends Provider {
      async onDestroy() {
        order.push('first');
      }
    }
    class Second extends Provider {
      async onDestroy() {
        order.push('second');
      }
    }

    const app = compileApp(
      defineModule({ name: 'M', providers: [First, Second] })
    );
    await app.close();
    expect(order).toEqual(['second', 'first']);
  });
});
