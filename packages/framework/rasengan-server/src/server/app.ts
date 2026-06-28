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

import { Container } from '../di/container.js';
import { Router } from '../router/index.js';
import type { ModuleConfig } from './module.js';
import { Context } from '@rasenganjs/runtime';
import { serverLogger } from '../logger/index.js';

import {
  type ValidationConfig,
  type SchemaDefinition,
  createValidationMiddleware,
  defaultErrorHandler,
  zodAdapter,
} from '@rasenganjs/validation';

/**
 * Handle returned by `bootstrap()` that allows external shutdown.
 */
export interface ServerHandle {
  /** Gracefully stop the server. */
  close(): void;
  /** Reference to the configured `ServerApp` instance. */
  app: ServerApp;
}

/**
 * Core application class for Rasengan Server.
 *
 * Orchestrates module registration, middleware layering, dependency injection,
 * validation, and compilation into a runtime `Application`.
 *
 * ### Middleware layering (execution order)
 *
 * 1. **Global middleware** — registered via `.use()`, `.enableCors()`, `.configureBodyParser()`
 * 2. **Module-level** — `ModuleConfig.middlewares`, scoped to that module's prefix
 * 3. **Controller-level** — `Controller.middlewares`, scoped to that controller's routes
 * 4. **Route-level** — passed as arguments to `router.get(path, mw, handler)` etc.
 * 5. **Validation** — injected automatically for routes with schemas (after auth, before handler)
 * 6. **Handler** — the route handler function
 *
 * @example
 * ```ts
 * const app = new ServerApp();
 * app.registerModule(myModule);
 * app.enableCors();
 * app.compile();
 * ```
 */
export class ServerApp {
  /** Registered module configurations. */
  private modules: ModuleConfig[] = [];

  /**
   * Ordered list of global middleware to apply.
   * The default logger middleware is pre-populated.
   */
  private middlewareList: Array<{
    key?: string;
    middleware: Middleware;
    path?: string;
  }> = [
    { key: 'logger', middleware: logger({ log: serverLogger }) },
    { key: 'bodyParser', middleware: bodyParser({ key: 'body' }) },
  ];

  /** CORS configuration (disabled by default). */
  private corsOptions?: Parameters<typeof cors>[0];

  /** Custom error handler (defaults to 500 response). */
  private errorHandler?: (error: Error, ctx: Context) => Promise<Response>;

  /** Custom 404 handler (defaults to plain-text "Not Found"). */
  private notFoundHandler?: (ctx: Context) => Promise<Response>;

  /**
   * Global validation configuration.
   * Defaults to the built-in Zod adapter and a 400 JSON error response.
   */
  private validationConfig: ValidationConfig = {
    adapter: zodAdapter,
    onError: defaultErrorHandler,
  };

  /**
   * Register a module (or module factory) with the application.
   *
   * @param mod - A `ModuleConfig` object or a factory function returning one.
   */
  registerModule(mod: ModuleConfig | (() => ModuleConfig)): void {
    this.modules.push(typeof mod === 'function' ? mod() : mod);
  }

  /**
   * Register global middleware that applies to every request.
   *
   * @param middleware - The middleware function.
   */
  use(middleware: Middleware): void {
    this.middlewareList.push({ middleware });
  }

  /**
   * Enable CORS for all routes with optional configuration.
   * Calling without arguments uses default CORS settings.
   *
   * @param options - CORS configuration options (same as `@rasenganjs/runtime` CORS).
   */
  enableCors(options?: Parameters<typeof cors>[0]): void {
    this.corsOptions = options ?? {};
  }

  /**
   * Configure the built-in body parser.
   * This registers a `bodyParser` middleware internally.
   *
   * @param options - BodyParser options (size limits, content types, etc.).
   */
  // configureBodyParser(options: BodyParserOptions): void {
  //   // Remove the default body parser middleware
  //   const index = this.middlewareList.findIndex((mw) => mw.key === "bodyParser");

  //   if (index !== -1) {
  //     this.middlewareList.splice(index, 1);
  //     this.middlewareList.push({
  //       middleware: bodyParser(options),
  //     });
  //   }
  // }

  /**
   * Set a custom error handler for uncaught exceptions during request processing.
   *
   * @param handler - Async function receiving the error and context,
   *                  must return a `Response`.
   */
  onError(handler: (error: Error, ctx: Context) => Promise<Response>): void {
    this.errorHandler = handler;
  }

  /**
   * Set a custom handler for unmatched routes (404).
   *
   * @param handler - Async function receiving the request context,
   *                  must return a `Response`.
   */
  notFound(handler: (ctx: Context) => Promise<Response>): void {
    this.notFoundHandler = handler;
  }

  /**
   * Configure schema validation globally.
   *
   * Sets the schema adapter (default: Zod) and the default error handler
   * for validation failures.  Per-route `onError` overrides this default.
   *
   * @example
   * ```ts
   * app.configureValidation({
   *   onError: (errors, ctx) =>
   *     Response.json({ code: 'VALIDATION_ERROR', errors }, { status: 422 }),
   * });
   * ```
   *
   * @param config - Partial validation config to merge with defaults.
   */
  configureValidation(config: Partial<ValidationConfig>): void {
    if (config.adapter) {
      this.validationConfig.adapter = config.adapter;
    }
    if (config.onError) {
      this.validationConfig.onError = config.onError;
    }
  }

  /**
   * Compile the application into a runtime `Application` instance.
   *
   * This is called internally by `bootstrap()`. The compilation process:
   * 1. Applies global middleware (user + CORS + body parser).
   * 2. Sets up error and 404 handlers.
   * 3. Flattens the module import tree.
   * 4. Registers all providers in a shared DI container.
   * 5. Registers controllers with three-layer middleware nesting
   *    (module → controller → route), with validation middleware
   *    injected automatically for routes that have schemas.
   *
   * @returns The compiled runtime `Application`, ready to be served.
   */
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

  /**
   * Register all controllers from a module onto the runtime application.
   *
   * For each controller:
   * - The instance is resolved from the DI container.
   * - Controller-level middleware is scoped via `router.group({ middlewares })`.
   * - The whole controller is nested inside the module's prefix and module-level
   *   middleware via an outer `group()` call.
   * - Validation middleware is injected automatically for each handler that has
   *   a schema (either from per-route `SchemaDefinition` argument or from the
   *   controller's `schemas` property by method name).
   *
   * Execution order at runtime:
   *   module middleware → controller middleware → route-level middleware →
   *   validation → handler.
   */
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
            instance.routes(
              new Router(ctrlRouter, this.validationConfig, instance.schemas)
            );
          });
        } else {
          instance.routes(
            new Router(targetRouter, this.validationConfig, instance.schemas)
          );
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

/**
 * Recursively flatten a module tree into a linear array.
 *
 * Sub-modules declared via `imports` are traversed depth-first
 * and appended after their parent module.
 */
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
