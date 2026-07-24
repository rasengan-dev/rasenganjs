/**
 * Workerd adapter entry point.
 *
 * @example
 * ```ts
 * import { WorkerdProdAdapter } from '@rasenganjs/runtime/adapters/workerd';
 *
 * const adapter = new WorkerdProdAdapter({ passthrough: true });
 * await adapter.serve(app);
 * export default { fetch: adapter.fetchHandler };
 * ```
 */

export { WorkerdProdAdapter } from './prod.js';
export type { WorkerdProdAdapterOptions } from './prod.js';
