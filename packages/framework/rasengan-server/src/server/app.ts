import {
  Futon,
  type Middleware,
  type Router as RuntimeRouter,
  cors,
  logger,
  bodyParser,
  text,
} from '@rasenganjs/futon';

import {
  Container,
  type ContainerView,
  type ProviderDefinition,
  type ProviderLike,
} from '../di/container.js';
import { Router } from '../router/index.js';
import type { ModuleConfig } from './module.js';
import { Context } from '@rasenganjs/futon';
import { serverLogger } from '../logger/index.js';
import { WebSocketRegistry } from '../websocket/registry.js';
import type { WebSocketHandlers } from '../websocket/types.js';
import type { ModulePlugin } from '../plugin/index.js';

import {
  type ValidationConfig,
  defaultErrorHandler,
  zodAdapter,
} from '@rasenganjs/validators';

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
 * Per-module compile summary — routes, providers, and plugin-declared
 * classes (e.g. `@rasenganjs/ws` gateways), grouped exactly the way a
 * user declared them. `pluginGroups` is keyed by the module's extension
 * key (e.g. `"gateways"`) rather than a hardcoded concept, so core stays
 * decoupled from what any given plugin represents.
 */
export interface ModuleSummary {
  name: string;
  prefix?: string;
  routes: Array<{ method: string; path: string }>;
  providers: string[];
  pluginGroups: Record<string, string[]>;
  middlewareCount: number;
}

/** Result of the most recent `compile()` — consumed by the CLI's build/boot summary printer. */
export interface BuildSummary {
  modules: ModuleSummary[];
  durationMs: number;
}

/**
 * Core application class for Rasengan Server.
 *
 * Orchestrates module registration, middleware layering, dependency injection,
 * validation, and compilation into a runtime \`Futon\`.
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

  /** DI container created during compile(), used for lifecycle management. */
  private container: Container | null = null;

  /** Compiled Futon instance (set during compile()). */
  private futon: Futon | null = null;

  /** App-level init handlers, forwarded to Futon during compile(). */
  private initHandlers: Array<() => void | Promise<void>> = [];

  /** App-level destroy handlers, forwarded to Futon during compile(). */
  private destroyHandlers: Array<() => void | Promise<void>> = [];

  /**
   * WebSocket routes registered via `.websocket()`, staged until compile()
   * builds them into a `WebSocketRegistry`. See RFC-0001 — this registry is
   * owned by `rasengan-server`, not Futon, since Futon stays HTTP-only.
   */
  private websocketRoutes: Array<{
    path: string;
    handlers: WebSocketHandlers;
  }> = [];

  /** WebSocket registry built during compile(), consumed by runtime adapters. */
  private websocketRegistry: WebSocketRegistry | null = null;

  /** Route/provider/gateway summary + timing from the most recent compile(). */
  private buildSummary: BuildSummary | null = null;

  /** Module-extension plugins registered via `.registerPlugin()`, keyed by their claimed `ModuleConfig` field. */
  private plugins = new Map<string, ModulePlugin>();

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
   * Register a `ModulePlugin`, claiming one `ModuleConfig` extension key
   * (e.g. `'gateways'`). During `compile()`, every flattened module that
   * declares a value at that key gets forwarded to `plugin.register()`.
   *
   * Order relative to `registerModule()` doesn't matter — both just need
   * to happen before `compile()`.
   *
   * @example
   * ```ts
   * app.registerPlugin(createWsPlugin());
   * app.registerModule(appModule); // may declare `gateways: [ChatGateway]`
   * ```
   */
  registerPlugin(plugin: ModulePlugin): void {
    const existing = this.plugins.get(plugin.key);
    if (existing) {
      throw new Error(
        `[rasengan-server] A plugin is already registered for module key "${plugin.key}".`
      );
    }
    this.plugins.set(plugin.key, plugin);
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
   * Register a WebSocket route (RFC-0001, phase 1: core abstraction only).
   *
   * Staged here and built into a `WebSocketRegistry` during `compile()`.
   * No runtime adapter consumes this registry yet — that wiring (Node's
   * `server.on('upgrade')`, Bun's `server.upgrade()`, ...) is a later phase.
   *
   * Only static paths are supported in this slice (no `/chat/:room`
   * dynamic segments yet).
   *
   * @example
   * ```ts
   * app.websocket('/chat', {
   *   open(ctx) {},
   *   message(ctx, data) {},
   *   close(ctx) {},
   * });
   * ```
   */
  websocket(path: string, handlers: WebSocketHandlers): void {
    this.websocketRoutes.push({ path, handlers });
  }

  /**
   * The `WebSocketRegistry` built during `compile()`, or `null` if
   * `compile()` hasn't run yet. Runtime adapters will read this once
   * upgrade handling is wired up (RFC-0001, later phase).
   */
  getWebSocketRegistry(): WebSocketRegistry | null {
    return this.websocketRegistry;
  }

  /**
   * Routes/providers/plugin-declared classes grouped by module, plus
   * `compile()`'s wall-clock duration — `null` until `compile()` has run.
   * Consumed by the CLI (`utils/print-build-summary.ts`) for the
   * build/boot summary.
   */
  getBuildSummary(): BuildSummary | null {
    return this.buildSummary;
  }

  /**
   * Register a handler that runs once before the server starts
   * accepting requests. Forwarded to the underlying Futon instance
   * during compile().
   */
  onInit(handler: () => void | Promise<void>): void {
    this.initHandlers.push(handler);
  }

  /**
   * Register a handler that runs during graceful shutdown.
   * Forwarded to the underlying Futon instance during compile().
   */
  onDestroy(handler: () => void | Promise<void>): void {
    this.destroyHandlers.push(handler);
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
   * Compile the application into a runtime \`Futon\` instance.
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
   * @returns The compiled runtime \`Futon\`, ready to be served.
   */
  compile(): Futon {
    const compileStart = performance.now();
    const app = new Futon();
    this.futon = app;

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
    this.container = container;

    // Merge each module's explicit `providers` with provider tokens any
    // registered `ModulePlugin` extracts from its extension key via
    // `asProviders()` (e.g. `@rasenganjs/ws` gateways) — computed once so
    // registration, visibility, and eager resolution all see the same
    // set. Explicit `providers` entries win on token collisions.
    const moduleProviders = new Map<
      ModuleConfig,
      (ProviderLike | ProviderDefinition)[]
    >();
    for (const mod of flatModules) {
      moduleProviders.set(mod, this.mergedProviders(mod));
    }

    // ── RFC-0003: register providers with their owning module ────────
    for (const mod of flatModules) {
      const providers = moduleProviders.get(mod)!;
      validateExports(mod, providers);
      for (const provider of providers) {
        container.register(provider, mod);
      }
    }

    // Visible set per module: own providers + imports' exports + the
    // exports of every `global: true` module.
    const globalExports: any[] = flatModules
      .filter((mod) => mod.global)
      .flatMap((mod) => mod.exports ?? []);
    for (const mod of flatModules) {
      const visible = new Set<any>();
      for (const provider of moduleProviders.get(mod)!) {
        visible.add(providerToken(provider));
      }
      for (const imported of mod.imports || []) {
        for (const token of imported.exports ?? []) {
          visible.add(token);
        }
      }
      for (const token of globalExports) {
        visible.add(token);
      }
      container.setScope(mod, visible);
    }

    // Controllers and plugins resolve through module-scoped views.
    // Each module's summary (routes/providers/plugin groups) is built
    // alongside registration for the CLI's build/boot summary.
    const moduleSummaries: ModuleSummary[] = [];
    for (const mod of flatModules) {
      const summary = this.buildModuleSummary(mod);
      this.registerControllers(app, container.forModule(mod), mod, summary);
      moduleSummaries.push(summary);
    }

    for (const mod of flatModules) {
      this.dispatchPlugins(container.forModule(mod), mod);
    }

    // ── RFC-0003: eager resolution ────────────────────────────────────
    // Every declared provider is constructed at boot — onInit() fires
    // even for providers nothing injects (schedulers, warmers), and any
    // wiring mistake fails here instead of on the first request. Runs
    // after dispatchPlugins so plugin-populated handles (e.g.
    // `gateway.server` from @rasenganjs/ws) are set before any onInit().
    // Plugin-derived providers (e.g. gateways) are almost always already
    // cached by this point since `dispatchPlugins` resolved them above —
    // this loop is then a cheap no-op for them and the real guarantee
    // for providers nothing else touched.
    for (const mod of flatModules) {
      const scoped = container.forModule(mod);
      for (const provider of moduleProviders.get(mod)!) {
        scoped.resolve(providerToken(provider));
      }
    }

    // Forward app-level lifecycle handlers to the Futon instance
    for (const handler of this.initHandlers) {
      app.onInit(handler);
    }
    for (const handler of this.destroyHandlers) {
      app.onDestroy(handler);
    }

    // Fire DI container init hooks after everything is wired up
    container.initAll().catch((err) => {
      console.error(`[rasengan-server] Provider onInit() failed: ${err}`);
    });

    // Build the WebSocket registry from routes staged via .websocket().
    // Kept separate from the Futon instance above (see RFC-0001).
    const wsRegistry = new WebSocketRegistry();
    for (const { path, handlers } of this.websocketRoutes) {
      wsRegistry.register(path, handlers);
    }
    this.websocketRegistry = wsRegistry;

    this.buildSummary = {
      modules: moduleSummaries,
      durationMs: performance.now() - compileStart,
    };

    return app;
  }

  /**
   * Gracefully shut down the application.
   *
   * Calls `onDestroy()` on all resolved providers in reverse
   * registration order, then releases the container reference.
   */
  async close(): Promise<void> {
    // Fire app-level destroy handlers (forwarded to Futon)
    if (this.futon) {
      await this.futon.destroy();
      this.futon = null;
    }

    // Fire DI provider destroy hooks
    if (this.container) {
      await this.container.destroyAll();
      this.container = null;
    }
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
    app: Futon,
    container: ContainerView,
    mod: ModuleConfig,
    summary: ModuleSummary
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

      const recordRoutes = (serverRouter: Router) => {
        for (const route of serverRouter.consumeRegisteredRoutes()) {
          summary.routes.push({
            method: route.method,
            path: joinPath(mod.prefix, route.path),
          });
        }
      };

      const registerCtrlRoutes = (targetRouter: RuntimeRouter) => {
        if (ctrlMws.length > 0) {
          targetRouter.group({ middlewares: ctrlMws }, (ctrlRouter) => {
            const serverRouter = new Router(
              ctrlRouter,
              this.validationConfig,
              instance.schemas
            );
            instance.routes(serverRouter);
            recordRoutes(serverRouter);
          });
        } else {
          const serverRouter = new Router(
            targetRouter,
            this.validationConfig,
            instance.schemas
          );
          instance.routes(serverRouter);
          recordRoutes(serverRouter);
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

  /**
   * Merge a module's explicit `providers` with provider tokens any
   * registered `ModulePlugin` extracts from its extension key via
   * `asProviders()` (e.g. `@rasenganjs/ws` returns its `gateways` array
   * unchanged, since `Gateway extends Provider`).
   *
   * A token already declared in the module's own `providers` is left
   * alone — an explicit declaration (e.g. a test's `useValue` override)
   * always wins over the plugin-derived one, and is never duplicated.
   */
  private mergedProviders(
    mod: ModuleConfig
  ): (ProviderLike | ProviderDefinition)[] {
    const own = mod.providers || [];
    const seen = new Set(own.map(providerToken));
    const merged = [...own];

    for (const [key, plugin] of this.plugins) {
      if (!plugin.asProviders) continue;
      const value = mod[key];
      if (value === undefined) continue;

      for (const provider of plugin.asProviders(value)) {
        const token = providerToken(provider);
        if (seen.has(token)) continue;
        seen.add(token);
        merged.push(provider);
      }
    }

    return merged;
  }

  /**
   * Seed a module's build/boot summary — name, prefix, its OWN
   * `providers` (display purposes only: deliberately NOT the merged
   * list `mergedProviders()` produces, so plugin-declared classes show
   * up under their own extension key instead of lumped into
   * "Providers"), one group per active plugin key (e.g. `gateways`),
   * and the module-level middleware count. `routes` starts empty —
   * `registerControllers()` fills it in as controllers register.
   */
  private buildModuleSummary(mod: ModuleConfig): ModuleSummary {
    const displayName = (token: any): string =>
      typeof token === 'function' ? token.name : String(token);

    const providers = (mod.providers || []).map((p) =>
      displayName(providerToken(p))
    );

    const pluginGroups: Record<string, string[]> = {};
    for (const key of this.plugins.keys()) {
      const value = mod[key];
      if (value === undefined || !Array.isArray(value)) continue;
      pluginGroups[key] = value.map(displayName);
    }

    return {
      name: mod.name ?? '(unnamed module)',
      prefix: mod.prefix,
      routes: [],
      providers,
      pluginGroups,
      middlewareCount: (mod.middlewares || []).length,
    };
  }

  /**
   * Forward a module's extension-key values (anything beyond `prefix`,
   * `middlewares`, `imports`, `controllers`, `providers`) to the
   * `ModulePlugin` that claimed that key.
   *
   * Throws if a module declares a key with no matching registered
   * plugin — a silent no-op here would mean e.g. `gateways: [...]`
   * quietly does nothing because `app.registerPlugin(createWsPlugin())`
   * was never called.
   */
  private dispatchPlugins(container: ContainerView, mod: ModuleConfig): void {
    for (const key of Object.keys(mod)) {
      if (RESERVED_MODULE_KEYS.has(key)) continue;

      const value = mod[key];
      if (value === undefined) continue;

      const plugin = this.plugins.get(key);
      if (!plugin) {
        throw new Error(
          `[rasengan-server] Module declares unknown key "${key}" with no ` +
            `matching plugin. If this is meant to be handled by an ecosystem ` +
            `package (e.g. \`@rasenganjs/ws\` for "gateways"), call ` +
            `\`app.registerPlugin(...)\` into \`bootstrap()\`.`
        );
      }

      plugin.register(this, container, mod, value);
    }
  }
}

/** `ModuleConfig` fields `dispatchPlugins()` never forwards to a plugin. */
const RESERVED_MODULE_KEYS = new Set([
  'name',
  'prefix',
  'middlewares',
  'imports',
  'controllers',
  'providers',
  'exports',
  'global',
]);

/** The injection token a `providers` entry registers under. */
function providerToken(provider: ProviderLike | ProviderDefinition): any {
  return typeof provider === 'function' ? provider : provider.provide;
}

/**
 * Join a module prefix and a route path for display in the build/boot
 * summary — strips a trailing slash from the prefix so `"/chat/"` +
 * `"/rooms"` reads as `/chat/rooms`, not `/chat//rooms`.
 */
function joinPath(prefix: string | undefined, path: string): string {
  if (!prefix) return path;
  return prefix.replace(/\/+$/, '') + path;
}

/**
 * RFC-0003: every exported token must be declared in the same module's
 * `providers` (or resolve via a plugin's `asProviders()`, e.g. a
 * gateway) — exporting something you don't own is always a mistake.
 */
function validateExports(
  mod: ModuleConfig,
  providers: (ProviderLike | ProviderDefinition)[]
): void {
  if (!mod.exports?.length) return;
  const own = new Set(providers.map(providerToken));
  for (const token of mod.exports) {
    if (!own.has(token)) {
      const name = typeof token === 'function' ? token.name : `"${token}"`;
      throw new Error(
        `[rasengan-server] ${mod.name ? `Module "${mod.name}"` : 'A module'} ` +
          `exports ${name} but does not declare it in \`providers\`. ` +
          `Only a module's own providers can be exported.`
      );
    }
  }
}

/**
 * Flatten the module graph into a linear array, depth-first, each module
 * appearing once (diamond imports are deduped by object identity, and
 * cyclic imports terminate instead of recursing forever).
 */
function flattenModules(modules: ModuleConfig[]): ModuleConfig[] {
  const result: ModuleConfig[] = [];
  const seen = new Set<ModuleConfig>();
  const walk = (mods: ModuleConfig[]) => {
    for (const mod of mods) {
      if (seen.has(mod)) continue;
      seen.add(mod);
      result.push(mod);
      if (mod.imports) walk(mod.imports);
    }
  };
  walk(modules);
  return result;
}
