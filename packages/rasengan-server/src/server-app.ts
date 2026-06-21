import {
  Application,
  type Context,
  type Middleware,
  cors,
  logger,
  bodyParser,
} from '@rasenganjs/runtime';

import { Container } from './container.js';
import { ServerRouter } from './router.js';
import type { ModuleConfig } from './module.js';

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

    if (this.errorHandler) app.onError(this.errorHandler);
    if (this.notFoundHandler) app.notFound(this.notFoundHandler);

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
        throw new Error(`Controller ${ctrl.name} must implement routes()`);
      }
      if (mod.prefix) {
        app.group(mod.prefix, (router) => {
          instance.routes(new ServerRouter(router));
        });
      } else {
        instance.routes(new ServerRouter(app));
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
