import {
  Application,
  type Middleware,
  type Router as RuntimeRouter,
  cors,
  logger,
  bodyParser,
  text,
  BodyParserOptions,
} from '@rasenganjs/runtime';

import { Container } from './container.js';
import { Router } from './router.js';
import type { ModuleConfig } from './module.js';
import { Context } from '@rasenganjs/runtime';
import { serverLogger } from './logger.js';

export interface ServerHandle {
  close(): void;
  app: ServerApp;
}

export class ServerApp {
  private modules: ModuleConfig[] = [];
  private middlewareList: Array<{
    middleware: Middleware;
    path?: string;
  }> = [{ middleware: logger({ log: serverLogger }) }];
  private corsOptions?: Parameters<typeof cors>[0];
  private errorHandler?: (error: Error, ctx: Context) => Promise<Response>;
  private notFoundHandler?: (ctx: Context) => Promise<Response>;

  registerModule(mod: ModuleConfig | (() => ModuleConfig)): void {
    this.modules.push(typeof mod === 'function' ? mod() : mod);
  }

  use(middleware: Middleware): void {
    this.middlewareList.push({ middleware });
  }

  enableCors(options?: Parameters<typeof cors>[0]): void {
    this.corsOptions = options ?? {};
  }

  // configure body parser
  configureBodyParser(options: BodyParserOptions): void {
    this.middlewareList.push({
      middleware: bodyParser(options),
    });
  }

  onError(handler: (error: Error, ctx: Context) => Promise<Response>): void {
    this.errorHandler = handler;
  }

  notFound(handler: (ctx: Context) => Promise<Response>): void {
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
    const runtimeRouter = app.getRouter();
    const modMws: Middleware[] = mod.middlewares || [];

    for (const ctrl of mod.controllers || []) {
      const instance = container.resolve(ctrl);
      if (!instance.routes || typeof instance.routes !== 'function') {
        throw new Error(
          `[rasengan-server] Controller "${ctrl.name}" is missing a \`routes(router)\` method. ` +
            `Every controller must define \`routes(router: ServerRouter): void\` ` +
            `to register its route handlers.`
        );
      }

      const ctrlMws: Middleware[] = instance.middlewares || [];

      const registerCtrlRoutes = (targetRouter: RuntimeRouter) => {
        if (ctrlMws.length > 0) {
          targetRouter.group({ middlewares: ctrlMws }, (ctrlRouter) => {
            instance.routes(new Router(ctrlRouter));
          });
        } else {
          instance.routes(new Router(targetRouter));
        }
      };

      if (mod.prefix || modMws.length > 0) {
        runtimeRouter.group(
          mod.prefix || '',
          modMws.length > 0 ? { middlewares: modMws } : {},
          registerCtrlRoutes
        );
      } else {
        registerCtrlRoutes(runtimeRouter);
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
