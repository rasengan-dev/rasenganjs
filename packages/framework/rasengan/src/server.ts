import { createRequestHandler } from './server/node/index.js';
import { createMatchRoutesGuard } from './server/node/match-routes-guard.js';
import { resolveBuildOptions } from './server/build/index.js';
import { detectDeploymentPlatform } from './server/runtime/detect-runtime.js';
import { Futon, logger, compress } from '@rasenganjs/futon';

// `toExpressHandler`/`toWinterCgHandler` are deliberately not
// re-exported here — import them from `@rasenganjs/futon` directly
// if needed (see RFC-0007 §2).
export * from './server/build/manifest.js';
export {
  createRequestHandler,
  createMatchRoutesGuard,
  resolveBuildOptions,
  detectDeploymentPlatform,
  Futon,
  logger,
  compress,
};
