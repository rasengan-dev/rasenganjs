import { createRequestHandler } from './server/node/index.js';
import { resolveBuildOptions } from './server/build/index.js';
import { detectRuntime } from './server/runtime/detect-runtime.js';
import { Futon, logger, compress } from '@rasenganjs/futon';

// `toExpressHandler`/`toWinterCgHandler` are deliberately not
// re-exported here — import them from `@rasenganjs/futon` directly
// if needed (see RFC-0007 §2).
export * from './server/build/manifest.js';
export {
  createRequestHandler,
  resolveBuildOptions,
  detectRuntime,
  Futon,
  logger,
  compress,
};
