/**
 * @module WebSocket — core abstraction (RFC-0001, phase 1)
 *
 * Exposes the runtime-agnostic WebSocket types and the registry that
 * `ServerApp.websocket()` populates during `compile()`. Runtime adapter
 * wiring (Node upgrade handling, Bun `server.upgrade()`, ...) is a later
 * phase and does not live here yet.
 */

export { WebSocketRegistry } from './registry.js';
export type {
  WebSocketConnection,
  WebSocketContext,
  WebSocketHandlers,
} from './types.js';
