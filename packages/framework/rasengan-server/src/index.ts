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
 * - `WebSocketRegistry` — runtime-agnostic WebSocket route registry
 *   (RFC-0001, core abstraction only — no runtime adapter wiring yet)
 * - `ModulePlugin` — extension point letting ecosystem packages (e.g.
 *   `@rasenganjs/ws`) add their own `defineModule()` fields
 */

// ── Bootstrap ────────────────────────────────────────────────
export { bootstrap } from './bootstrap.js';

// ── ServerApp & Module ──────────────────────────────────────
export { ServerApp } from './server/app.js';
export type {
  ServerHandle,
  ModuleSummary,
  BuildSummary,
} from './server/app.js';
export { defineModule } from './server/module.js';
export type { ModuleConfig } from './server/module.js';

// ── Module plugins ────────────────────────────────────────────
export type { ModulePlugin } from './plugin/index.js';

// ── Router ───────────────────────────────────────────────────
export { Router } from './router/index.js';

// ── WebSocket (RFC-0001, core abstraction — no runtime wiring yet) ──
export { WebSocketRegistry } from './websocket/index.js';
export type {
  WebSocketConnection,
  WebSocketContext,
  WebSocketHandlers,
} from './websocket/index.js';

// ── Controller ────────────────────────────────────────────────
export { Controller } from './controller/index.js';
export type { RouteHandler } from './controller/index.js';

// ── Dependency injection ─────────────────────────────────────
export { Container } from './di/container.js';
export type { ContainerView, ProviderDefinition } from './di/container.js';
export { Provider } from './di/provider.js';

// ── Logger ────────────────────────────────────────────────────
export { serverLogger, serverLoggerMinimal } from './logger/index.js';

// ── Context ──────────────────────────────────────────────────
export type { Context } from '@rasenganjs/futon';

// ── File uploads (RFC-0002) ──────────────────────────────────
// DiskStorage is NOT re-exported: import it from
// '@rasenganjs/futon/upload/disk' so `node:fs` stays out of
// WinterCG bundles.
export {
  fileUpload,
  MemoryStorage,
  UPLOAD_ERROR_CODES,
} from '@rasenganjs/futon';
export type {
  FieldSpec,
  FileFilter,
  FileInfo,
  StorageEngine,
  UploadErrorCode,
  UploadLimits,
  UploadOptions,
  UploadedFile,
  Uploader,
} from '@rasenganjs/futon';

// ── Config ────────────────────────────────────────────────────
export { defineConfig } from './config/index.js';
export { ConfigHolder } from './config/holder.js';
export type { RasenganServerConfig, BuildConfig } from './config/index.js';

// ── Utils ─────────────────────────────────────────────────────
export { logServerInfo } from './utils/log-server-info.js';
