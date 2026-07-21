import type { QueueClass } from './types.js';

/**
 * `rasengan-server`'s `ModuleConfig` only knows about `queues` as an
 * opaque `unknown` extension key (see `ModulePlugin`) — it never imports
 * this package. This declaration merge adds a properly-typed `queues`
 * field to `ModuleConfig` for any project that imports `@rasenganjs/queue`,
 * so `defineModule({ queues: [EmailQueue] })` gets real type-checking and
 * autocomplete without `rasengan-server` needing to know `Queue` exists.
 */
declare module '@rasenganjs/server' {
  interface ModuleConfig {
    /** Queue classes to register — forwarded to `createQueuePlugin()`. */
    queues?: QueueClass[];
  }
}
