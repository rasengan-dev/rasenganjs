/**
 * Node.js adapter entry point.
 *
 * Re-exports all Node-specific runtime adapters and utilities.
 *
 * @example
 * ```ts
 * import {
 *   NodeDevAdapter,
 *   NodeProdAdapter,
 *   NodeAssets,
 *   NodeWatcher,
 *   startNodeServer,
 *   loadNodeEnvFiles,
 * } from '@rasenganjs/runtime/adapters/node';
 * ```
 */

export { NodeDevAdapter } from './dev.js';
export type { NodeDevAdapterOptions } from './dev.js';

export { NodeProdAdapter } from './prod.js';
export type { NodeProdAdapterOptions } from './prod.js';

export { NodeAssets } from './assets.js';

export { NodeWatcher } from './watcher.js';

export { startNodeServer, writeNodeResponse } from './server.js';
export type { NodeServerOptions, NodeServerHandle } from './server.js';

export { incomingToRequest } from './request.js';

export { loadNodeEnvFiles, getLoadedEnvFiles } from './env.js';

// ── WebSocket (RFC-0001) ────────────────────────────────────────
export { createNodeUpgradeHandler } from './websocket.js';
