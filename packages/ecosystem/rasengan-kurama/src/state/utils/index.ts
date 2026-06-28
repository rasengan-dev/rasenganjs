import { useSyncExternalStore } from 'react';
import type { CreateStateFn, Store, SetState } from '../type.js';

/**
 * The createStore function is used to create a store based on the provided create state function
 * @param createStateFn
 * @returns
 */
function createStore<T>(createStateFn: CreateStateFn<T>): Store<T> {
  // Store the state and the initial state
  let state: T;
  let initialState: T;

  // Store the listeners
  const listeners = new Set<() => void>();

  // Get the state
  const getState = () => state;

  // Set the state
  const setState: SetState<T> = (newStateOrFn) => {
    state =
      typeof newStateOrFn === 'function'
        ? { ...state, ...newStateOrFn(state) }
        : { ...state, ...newStateOrFn };
    listeners.forEach((listener) => listener());
  };

  // Subscribe to the store
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // Create the initial state
  initialState = createStateFn(setState, getState);
  state = initialState;

  // Return the store
  return { getState, setState, subscribe, initialState };
}

/**
 * The identity function is the default selector function
 * @param arg
 * @returns
 */
const identity: (arg: any) => any = (s) => s;

/**
 * The create function is used to create a store based on the provided create state function
 * @param createStateFn
 * @returns
 */
export function create<T>(createStateFn: CreateStateFn<T>) {
  // Here we create the store using the createStore function
  // It will be responsible for managing the state
  const store = createStore<T>(createStateFn);

  // Return the useStore function
  return function useStore<U = T>(selector: (state: T) => U = identity): U {
    // Here we use the useSyncExternalStore hook from React
    // It will be responsible for synchronizing the state with the store
    return useSyncExternalStore(
      store.subscribe,
      () => selector(store.getState()),
      () => selector(store.initialState)
    );
  };
}

/**
 * The persist function wraps a createStateFn to enable state persistence
 * It saves and restores the store state using the provided storage
 * @param createStateFn - The store initializer function
 * @param options - The persistence options (name and storage)
 */
export function persist<T>(
  createStateFn: CreateStateFn<T>,
  options: { name: string; storage: 'local' | 'session' }
): CreateStateFn<T> {
  return (set, get) => {
    if (typeof window === 'undefined') return createStateFn(set, get);

    // Get the storage
    const storage = getStorage(options.storage);

    // Load initial state from storage if available
    try {
      const storedValue = storage.getItem(options.name);

      if (storedValue) {
        const parsed = JSON.parse(storedValue);

        // Initialize store with persisted data
        const state = createStateFn((partial) => {
          const nextState =
            typeof partial === 'function' ? partial(get()) : partial;
          set(nextState);

          // Persist new state
          storage.setItem(options.name, JSON.stringify(get()));
        }, get);

        // Merge the stored state with the new one
        return { ...state, ...parsed };
      }
    } catch (error) {
      console.warn(
        `[Kurama persist] Failed to load state for ${options.name}`,
        error
      );
    }

    // Default behavior if nothing is stored
    const state = createStateFn((partial) => {
      const nextState =
        typeof partial === 'function' ? partial(get()) : partial;
      set(nextState);

      // Save to storage
      try {
        storage.setItem(options.name, JSON.stringify(get()));
      } catch (error) {
        console.warn(
          `[Kurama persist] Failed to save state for ${options.name}`,
          error
        );
      }
    }, get);

    return state;
  };
}

/**
 * The getStorage function returns the appropriate storage object based on the provided type
 * @param storage - The type of storage (local or session)
 * @returns The storage object (localStorage or sessionStorage)
 */
function getStorage(storage: 'local' | 'session') {
  return storage === 'local' ? localStorage : sessionStorage;
}
