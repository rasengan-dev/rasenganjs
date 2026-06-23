import {
  Application,
  type Middleware,
  cors,
  logger,
  bodyParser,
  text,
} from '@rasenganjs/runtime';

import { Container } from './container.js';
import { Router } from './router.js';
import type { ModuleConfig } from './module.js';
import { RasenganContext } from './context.js';

export interface ServerHandle {
  close(): void;
  app: ServerApp;
}

export class ServerApp {
  private modules: ModuleConfig[] = [];
  private middlewareList: Array<{
    middleware: Middleware;
    path?: string;
  }> = [
    { middleware: logger({ showSize: true }) },
    {
      middleware: bodyParser({
        key: 'body',
      }),
    },
  ];
  private corsOptions?: Parameters<typeof cors>[0];
  private errorHandler?: (
    error: Error,
    ctx: RasenganContext
  ) => Promise<Response>;
  private notFoundHandler?: (ctx: RasenganContext) => Promise<Response>;

  registerModule(mod: ModuleConfig | (() => ModuleConfig)): void {
    this.modules.push(typeof mod === 'function' ? mod() : mod);
  }

  use(middleware: Middleware): void {
    this.middlewareList.push({ middleware });
  }

  enableCors(options?: Parameters<typeof cors>[0]): void {
    this.corsOptions = options ?? {};
  }

  onError(
    handler: (error: Error, ctx: RasenganContext) => Promise<Response>
  ): void {
    this.errorHandler = handler;
  }

  notFound(handler: (ctx: RasenganContext) => Promise<Response>): void {
    this.notFoundHandler = handler;
  }

  compile(): Application {
    const app = new Application();

    for (const { middleware } of this.middlewareList) {
      app.use(middleware);
    }

    if (this.corsOptions !== undefined) {
      app.use(cors(this.corsOptions));
    }

    if (this.errorHandler) {
      app.onError(this.errorHandler);
    } else {
      app.onError(async (error, ctx) => {
        return text(error.message, {
          status: 500,
        });
      });
    }
    if (this.notFoundHandler) {
      app.notFound(this.notFoundHandler);
    } else {
      app.notFound(async () => text('Not Found', { status: 404 }));
    }

    const flatModules = flattenModules(this.modules);
    const container = new Container();

    for (const mod of flatModules) {
      for (const provider of mod.providers || []) {
        container.register(provider);
      }
    }

    for (const mod of flatModules) {
      this.registerControllers(app, container, mod);
    }

    return app;
  }

  private registerControllers(
    app: Application,
    container: Container,
    mod: ModuleConfig
  ): void {
    for (const ctrl of mod.controllers || []) {
      const instance = container.resolve(ctrl);
      if (!instance.routes || typeof instance.routes !== 'function') {
        throw new Error(
          `[rasengan-server] Controller "${ctrl.name}" is missing a \`routes(router)\` method. ` +
            `Every controller must define \`routes(router: ServerRouter): void\` ` +
            `to register its route handlers.`
        );
      }
      if (mod.prefix) {
        app.group(mod.prefix, (router) => {
          instance.routes(new Router(router));
        });
      } else {
        instance.routes(new Router(app));
      }
    }
  }
}

function flattenModules(modules: ModuleConfig[]): ModuleConfig[] {
  const result: ModuleConfig[] = [];
  for (const mod of modules) {
    result.push(mod);
    if (mod.imports) {
      result.push(...flattenModules(mod.imports));
    }
  }
  return result;
}
