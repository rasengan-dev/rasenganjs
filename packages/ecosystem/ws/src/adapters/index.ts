/**
 * @module Adapters — pluggable `GatewayAdapter` implementations
 *
 * - `MemoryGatewayAdapter` (default) — single-process, zero config.
 * - `RedisGatewayAdapter` — multi-process, needs `ioredis` clients supplied
 *   by the caller (see `redis.ts` for why this package never imports
 *   `ioredis` itself at runtime).
 */

export { MemoryGatewayAdapter } from './memory.js';
export { RedisGatewayAdapter } from './redis.js';
export type { RedisGatewayAdapterOptions } from './redis.js';
