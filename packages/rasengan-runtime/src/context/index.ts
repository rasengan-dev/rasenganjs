import type { Context, RuntimeContext } from './types.js';

/**
 * Factory that creates a fresh Context for every incoming request.
 *
 * Each context gets its own `state` bag (empty object) and
 * frozen-ish `set`/`get` accessors so middlewares can pass
 * data without polluting the request object.
 */
export function createContext(
  request: Request,
  params: Record<string, string> = {},
  runtime: RuntimeContext = {}
): Context {
  const state: Record<string, unknown> = {};

  const ctx: Context = {
    request,
    params,
    runtime,
    state,

    set<T = unknown>(key: string, value: T): void {
      state[key] = value;
    },

    get<T = unknown>(key: string): T | undefined {
      return state[key] as T | undefined;
    },
  };

  return ctx;
}
