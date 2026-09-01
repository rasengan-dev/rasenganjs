import {
  drizzle as toD1,
  type AnyD1Database,
  type DrizzleD1Database,
} from 'drizzle-orm/d1';
import type { DrizzleAdapter } from '../adapter.js';

/**
 * `TConfig` is the D1 binding itself (e.g. `ctx.runtime.env.DB`), not a
 * pool/client to build — `connect()` stays synchronous like every other
 * adapter, the only thing that changes for D1 is what a caller passes
 * in and when (see `futon.ts` / `drizzle.module.ts` for the per-request
 * resolution that makes that possible, D1 does not exist at boot time).
 *
 * Uses `AnyD1Database` from `drizzle-orm/d1` itself (not the ambient
 * `D1Database` global) so this file typechecks without requiring
 * `@cloudflare/workers-types` as a dependency at all.
 */
export function d1Adapter<
  TSchema extends Record<string, unknown>,
>(): DrizzleAdapter<AnyD1Database, TSchema, DrizzleD1Database<TSchema>> {
  return {
    name: 'd1',
    connect(binding, schema) {
      const db = toD1(binding, { schema });
      return {
        db,
        // Cloudflare owns the binding's lifecycle — nothing to close.
        close: async () => {},
        migrate: async () => {
          throw new Error(
            '[drizzle:d1] use `wrangler d1 migrations apply` instead — D1 ' +
              'has no live connection for drizzle-kit to migrate against'
          );
        },
      };
    },
  };
}
