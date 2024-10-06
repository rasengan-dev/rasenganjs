import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { type AsyncActions } from "./types.js";
import Context from "../contexts/index.js";
import { type AsyncActionType } from "../contexts/types.js";
import { AsyncActionStatuses } from "../helpers/types.js";
import { BuilderCase } from "../interfaces/builderCase.js";

const useAsyncActions = <P = AsyncActions<any>>(
	signalName: string,
	...actions: string[]
) => {
	if (!signalName || typeof signalName !== "string") {
		throw new Error(
			"Provide a signalName as first argument of useAsyncActions"
		);
	}

	// Get Global Context
	const { signals, asyncDispatch } = useContext(Context);

	// Get state from signals
	// Extract type from P generic type
	type StateType = P extends AsyncActions<infer U> ? U : any;

	const state = useMemo<StateType>(() => {
		const signal = signals.find((signal) => signal.name === signalName);

		if (signal) return signal.state;
		else throw new Error(`Signal ${signalName} not found`);
	}, [signals]);

	// Refs
	// Define a ref to block the execution of async action callback twice
	const isAsyncActionCallbackRunning = useRef<{ [key: string]: Boolean }>({});

	// Async action callback
	const asyncActionCallback = useRef(
		async (action: AsyncActionType<StateType>, payload?: any) => {
			// Prevent the execution of async action callback twice
			if (isAsyncActionCallbackRunning.current[action.type])
				return new Promise((resolve) => {
					resolve({
						status: AsyncActionStatuses.PENDING,
						state,
						error: null,
						data: null,
					});
				});

			// Set the ref to true
			isAsyncActionCallbackRunning.current[action.type] = true;

			// Dispatch pending action
			asyncDispatch({
				type: action.type,
				isAsync: true,
				status: AsyncActionStatuses.PENDING,
			});

			try {
				// Execute async action
				const response = await (
					action.steps as BuilderCase<any>
				).asyncAction.handler(payload);

				// Dispatch fulfilled action
				const data = asyncDispatch({
					type: action.type,
					isAsync: true,
					status: AsyncActionStatuses.FULFILLED,
					payload: response,
				});

				return {
					state: data,
					data: response,
					error: null,
					status: AsyncActionStatuses.FULFILLED,
				};
			} catch (error) {
				// Dispatch rejected action
				const data = asyncDispatch({
					type: action.type,
					isAsync: true,
					status: AsyncActionStatuses.REJECTED,
					payload: error,
				});

				return {
					state: data,
					data: null,
					error: new Error(error),
					status: AsyncActionStatuses.REJECTED,
				};
			} finally {
				// Set the ref to false
				isAsyncActionCallbackRunning.current[action.type] = false;
			}
		}
	);

	// Some handlers

	/**
	 * Get async actions of a signal
	 * @param signalName
	 * @returns
	 */
	const handleGetAsyncActions = (signalName: string) => {
		const signal = signals.find((signal) => signal.name === signalName);

		if (signal) {
			if (!actions || actions.length === 0) return signal.asyncActions || [];

			const filteredActions: Array<AsyncActionType<StateType>> = [];

			for (const action of actions) {
				const actionName = `${signalName}/${action}`;

				const retrievedAction = signal.asyncActions.find(
					(act) => act.type === actionName
				);

				if (retrievedAction) filteredActions.push(retrievedAction);
				else throw new Error(`Async Action ${actionName} not found`);
			}

			return filteredActions;
		} else throw new Error(`Signal ${signalName} not found`);
	};

	/**
	 * Format async actions
	 * @returns
	 */
	const handleFormatAsyncActions = (): P => {
		// Get actions
		const nonFormattedActions = handleGetAsyncActions(signalName);

		// Formatted actions
		const formattedActions = nonFormattedActions.map((action) => {
			// Get action name
			const actionName = action.type.split("/")[1];

			return [
				actionName,
				async (payload?: any) => {
					return asyncActionCallback.current(action, payload);
				},
			];
		});

		return Object.fromEntries(formattedActions);
	};

	return handleFormatAsyncActions();
};

export default useAsyncActions;
