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
