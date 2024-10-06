import { useCallback, useReducer, useTransition } from "react";
import SignalContext from "../contexts/index.js";
import { type Action, type ProviderProps } from "./types.js";
import Reducer from "./reducer.js";
import { type BuilderCase } from "../interfaces/builderCase.js";

/**
 * Provides a React context for managing global signal state using a reducer.
 *
 * The `SignalProvider` component wraps the application and provides a context
 * with methods for dispatching synchronous and asynchronous actions to update
 * the global signal state.
 *
 * The provider uses the `useReducer` hook to manage the global state, and the
 * `useTransition` hook to wrap the dispatch function and provide a smooth
 * user experience during state updates.
 *
 * The provider also exposes an `asyncDispatch` function that can be used to
 * dispatch asynchronous actions, which are handled by updating the state of
 * the corresponding signal.
 *
 * @param {ProviderProps} props - The props for the `SignalProvider` component.
 * @param {React.ReactNode} props.children - The child components to wrap with the provider.
 * @param {any} props.store - The initial store for the signal state.
 * @returns {React.ReactElement} - The `SignalProvider` component.
 */
export default function SignalProvider({ children, store }: ProviderProps) {
	// Global state that manage all signals
	const [signals, dispatch] = useReducer(Reducer, store.getSignals());

	// Wrap your dispatch function with useTransition
	const [, startTransition] = useTransition();

	// Your state management logic using useContext and useReducer
	const syncDispatch = (action: Action) => {
		startTransition(() => {
			dispatch(action);
		});
	};

	// Dispatch async actions
	const asyncDispatch = useCallback((action: Action) => {
		const signalName = action.type.split("/")[0];

		const newState = signals.map(
			({ name, operations, actions, asyncActions, state: prevState }) => {
				let state = prevState;

				// Capture the target signal (a state and a bunch of async actions) from the array of signals.
				// Capture the action from array of async actions (of the target signal).
				// Run the async action and update the signal state.
				if (name === signalName) {
					if (action.isAsync) {
						for (const { type, steps } of asyncActions) {
							if (type === action.type) {
								state = (steps as BuilderCase<any>).cases
									.find((c) => c.status === action.status)
									.handler(state, action.payload);
								break;
							}
						}
					}
				}

				return {
					name,
					operations,
					state,
					actions,
					asyncActions,
				};
			}
		);

		// Find the new state of the target signal
		const signal = newState.find((signal) => signal.name === signalName);

		dispatch({
			type: action.type,
			isAsync: action.isAsync,
			status: action.status,
			payload: signal.state,
		});

		return signal.state;
	}, []);

	// Context value
	const contextValue = {
		signals,
		dispatch: syncDispatch,
		asyncDispatch,
	};

	return (
		<SignalContext.Provider value={contextValue}>
			{children}
		</SignalContext.Provider>
	);
}
