import type IBuilderCase from "../interfaces/builderCase.js";
import { type Action } from "../providers/types.js";

/**
 * Type that represents a signal
 */
export interface SignalType<T = any> {
	// Name of the signal
	name: string;

	// State inside the signal
	state: T;

	// Actions of the signal
	actions?: Array<ActionType<T>>;

	// Operations of the signal
	operations?: Array<OperationType<T>>;

	// Async actions of the signal
	asyncActions?: Array<AsyncActionType<T>>;
}

/**
 * Type that represents Actions
 */
export interface ActionType<T, P = any> {
	// Represent the type of the action
	type: string;

	// The handler function
	handler: (state: T, payload: P) => T;
}

/**
 * Type that represents operations
 */
export interface OperationType<T, P = any, Q = any> {
	// Represent the type of the operation
	type: string;

	// The handle function
	handler: (state: T, payload: P) => Q;
}

/**
 * Type that represents async actions
 */
export interface AsyncActionType<T, P = any> {
	// Represent the type of the operation
	type: string;

	// List of cases
	steps: IBuilderCase<T, P>;
}

/**
 * Type of dispatched action
 */
export interface DispatchedActionType {
	// The type of the action
	type: string;

	// The payload of the action
	payload: any;
}

/**
 * Type of the signals context
 */
export interface ContextType {
	// Signals
	signals: SignalType[];

	// Dispatch
	dispatch: React.Dispatch<Action>;

	// Async Dispatch
	asyncDispatch: (action: Action) => any;
}
