import { type SignalType } from "../contexts/types.js";
import { type Builder } from "../interfaces/builder.js";
import type IBuilderCase from "../interfaces/builderCase.js";

/**
 * Type of the create signal option function
 */
export interface CreateSignalOptionType<T> {
	// Name of the signal
	name: string;

	// State of the signal
	state: T;

	// Actions of the signal
	actions?: Action<T>;

	// Operations of the signal
	operations?: Operation<T>;

	// Async actions of the signal
	asyncActions?: AsyncAction<T>;
}

/**
 * Type of the returned data of create store function
 */
export interface CreateStoreType {
	// Function that return the list of signals
	getSignals: () => SignalType[];
}

/**
 * Type of Action
 */
export type Action<T> = Record<string, (state: T, payload: any) => T>;

/**
 * Type of Operation
 */
export type Operation<T> = Record<string, (state: T, payload?: any) => any>;

/**
 * Type of Async Action
 */
export type AsyncAction<T> = (
	builder: Builder<T>
) => Record<string, IBuilderCase<T>>;

export type CreateAsyncActionProp = (payload?: any) => Promise<any>;

export interface CreateAsyncActionReturnType {
	pending: AsyncActionStatusesType;
	fulfilled: AsyncActionStatusesType;
	rejected: AsyncActionStatusesType;
	handler: CreateAsyncActionProp;
}

export type AsyncActionResponse<P = any, T = null> = Promise<{
	state: P;
	data: T;
	error: Error | null;
	status: AsyncActionStatusesType;
}>;

export const AsyncActionStatuses = {
	PENDING: "PENDING",
	FULFILLED: "FULFILLED",
	REJECTED: "REJECTED",
} as const;

export type AsyncActionStatusesType =
	(typeof AsyncActionStatuses)[keyof typeof AsyncActionStatuses];
