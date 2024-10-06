import { type CreateSignalOptionType } from "./types.js";
import {
	type ActionType,
	type AsyncActionType,
	type OperationType,
} from "../contexts/types.js";
import { Builder } from "../interfaces/builder.js";

/**
 * Create a signal with a state and actions for managing this state
 * @param options
 * @returns
 */
const createSignal = <T>(options: CreateSignalOptionType<T>) => {
	const actions: Array<ActionType<T, any>> = [];
	const operations: Array<OperationType<T, any>> = [];
	const asyncActions: Array<AsyncActionType<T>> = [];

	// Convert the actions object to an array
	const actionsTable = Object.entries(options.actions || {});

	for (const action of actionsTable) {
		actions.push({
			type: `${options.name}/${action[0]}`,
			handler: action[1],
		});
	}

	// Convert the operations object to an array
	const operationsTable = Object.entries(options.operations || {});

	for (const operation of operationsTable) {
		operations.push({
			type: `${options.name}/${operation[0]}`,
			handler: operation[1],
		});
	}

	// Convert the async Actions object to an array
	const builder = new Builder<T>();

	const asyncActionsTable = Object.entries(
		options.asyncActions ? options.asyncActions(builder) : {}
	);

	for (const action of asyncActionsTable) {
		asyncActions.push({
			type: `${options.name}/${action[0]}`,
			steps: action[1],
		});
	}

	// Create a signal
	const signal = {
		name: options.name,
		state: options.state,
		actions,
		operations,
		asyncActions,
	};

	return signal;
};

export default createSignal;
