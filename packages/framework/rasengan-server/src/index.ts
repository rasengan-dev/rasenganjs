/**
 * @module Rasengan Server — production-grade HTTP server framework
 *
 * Build status: v1.0.0
 *
 * ## Quick start
 * ```ts
 * import { bootstrap } from 'rasengan-server';
 *
 * bootstrap((app) => {
 *   app.registerModule(defineModule({
 *     controllers: [MyController],
 *   }));
 * });
 * ```
 *
 * ## Layers
 * - `bootstrap` — programmatic entry point
 * - `ServerApp` — application orchestrator (modules, middleware, DI)
 * - `Router` — route registration with middleware support
 * - `Controller` — route-grouping abstraction
 * - `Container` — lightweight DI container with lifecycle hooks
 * - `defineModule` / `defineConfig` — typed configuration helpers
 */

// ── Bootstrap ────────────────────────────────────────────────
export { bootstrap } from './bootstrap.js';

// ── ServerApp & Module ──────────────────────────────────────
export { ServerApp } from './server/app.js';
export type { ServerHandle } from './server/app.js';
export { defineModule } from './server/module.js';
export type { ModuleConfig } from './server/module.js';

// ── Router ───────────────────────────────────────────────────
export { Router } from './router/index.js';

// ── Controller ────────────────────────────────────────────────
export { Controller } from './controller/index.js';
export type { RouteHandler } from './controller/index.js';

// ── Dependency injection ─────────────────────────────────────
export { Container } from './di/container.js';
export type { ProviderDefinition } from './di/container.js';
export { Provider } from './di/provider.js';

// ── Logger ────────────────────────────────────────────────────
export { serverLogger, serverLoggerMinimal } from './logger/index.js';

// ── Context ──────────────────────────────────────────────────
export type { Context } from '@rasenganjs/futon';

// ── Config ────────────────────────────────────────────────────
export { defineConfig } from './config/index.js';
export { ConfigHolder } from './config/holder.js';
export type { RasenganServerConfig, BuildConfig } from './config/index.js';

// ── Utils ─────────────────────────────────────────────────────
export { logServerInfo } from './utils/log-server-info.js';
