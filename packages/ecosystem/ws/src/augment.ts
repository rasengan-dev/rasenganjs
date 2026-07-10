import type { GatewayClass } from './types.js';

/**
 * `rasengan-server`'s `ModuleConfig` only knows about `gateways` as an
 * opaque `unknown` extension key (see `ModulePlugin`) — it never imports
 * this package. This declaration merge adds a properly-typed `gateways`
 * field to `ModuleConfig` for any project that imports `@rasenganjs/ws`,
 * so `defineModule({ gateways: [ChatGateway] })` gets real type-checking
 * and autocomplete without `rasengan-server` needing to know `Gateway`
 * exists.
 */
declare module '@rasenganjs/server' {
  interface ModuleConfig {
    /** Gateway classes to register — forwarded to `createWsPlugin()`. */
    gateways?: GatewayClass[];
  }
}
