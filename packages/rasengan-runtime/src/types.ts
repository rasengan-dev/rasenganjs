import type { Context } from './context/types.js';

/**
 * A FetchHandler is the fundamental request handler primitive.
 * It accepts a Context (wrapping a Web-standard Request) and
 * returns a Promise<Response>.
 *
 * This is the lowest-level building block — every middleware,
 * route handler, and error handler ultimately conforms to this
 * shape (though middleware additionally calls next()).
 */
export type FetchHandler = (context: Context) => Promise<Response>;
