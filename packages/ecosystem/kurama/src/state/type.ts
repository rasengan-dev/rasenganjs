/*
 * Type definition for the state update function
 */
export type SetState<T> = (
  newStateOrFn: Partial<T> | ((prevState: T) => Partial<T>)
) => void;

/*
 * Type definition for the create state function
 */
export type CreateStateFn<T> = (setState: SetState<T>, getState: () => T) => T;

/*
 * Type definition for the store
 */
export interface Store<T> {
  getState(): T;
  setState: SetState<T>;
  initialState: T;
  subscribe(listener: () => void): () => void;
}
