import type { CreateStateFn } from '../type.js';
import { persist } from '../utils';

/**
 * The middleware object contains various middleware functions for state management
 */
export const middleware = {
  /**
   * 🪵 Logger Middleware
   * Logs state before and after every update
   */
  logger:
    <T>(createStateFn: CreateStateFn<T>): CreateStateFn<T> =>
    (set, get) =>
      createStateFn((partial) => {
        const prevState = get();
        set(partial);
        const nextState = get();

        console.log('%c[Kurama Logger]', 'color: #00BFFF; font-weight: bold;', {
          prevState,
          nextState,
        });
      }, get),

  /**
   * 🪵 Persist Middleware
   * Persists state to localStorage or sessionStorage
   */
  persist: ({
    name,
    storage = 'local',
  }: {
    name: string;
    storage?: 'local' | 'session';
  }) => {
    return <T>(createStateFn: CreateStateFn<T>): CreateStateFn<T> =>
      persist(createStateFn, { name, storage });
  },

  /**
   * Compose multiple middlewares
   */
  compose:
    (...middlewares: Function[]) =>
    <T>(createStateFn: CreateStateFn<T>): CreateStateFn<T> =>
      middlewares.reduceRight((acc, mw) => mw(acc), createStateFn),
};
