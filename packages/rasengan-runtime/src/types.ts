import { RuntimeAdapter } from './runtime-adapter/types.js';

/**
 * A FetchHandler is the fundamental request handler primitive.
 * It accepts a Request and a optional Runtime Adapter and
 * returns a Promise<Response>.
 *
 * This is the lowest-level building block — every middleware,
 * route handler, and error handler ultimately conforms to this
 * shape (though middleware additionally calls next()).
 */
export type FetchHandler = (
  request: Request,
  runtime?: RuntimeAdapter
) => Promise<Response>;
