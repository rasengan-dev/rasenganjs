import {
	type AsyncActionStatusesType,
	type CreateStoreType,
} from "../helpers/types.js";

/**
 * Props of the  Provider
 */
export interface ProviderProps {
	// Children component of the  Provider
	children: React.ReactNode;

	// Collection of signals
	store: CreateStoreType;
}

/**
 * Type of the actions
 */
export interface Action {
	// Type of the action
	type: string;

	// Nature of the action
	isAsync: boolean;

	status?: AsyncActionStatusesType;

	// Payload of the action
	payload?: any;
}
