import { type SignalType } from "../contexts/types.js";
import { type Action } from "./types.js";

/**
 * Reduces an array of signals based on the provided action.
 *
 * @param signals - An array of signal objects.
 * @param action - The action object to apply to the signals.
 * @returns A new array of signal objects with the updated state.
 */
const Reducer = (signals: SignalType[], action: Action): SignalType[] => {
	const signalName = action.type.split("/")[0];

	// Loop through all signals, make updates on targeted states
	// and returns a new array of signals (immutability).
	return signals.map(
		({ name, operations, actions, asyncActions, state: prevState }) => {
			let state = prevState;

			// Capture the target signal (a state and a bunch of actions) from the array of signals.
			// Capture the action from array of actions (of the target signal).
			// Run the action and update the signal state.
			if (name === signalName) {
				if (!action.isAsync) {
					for (const { type, handler } of actions) {
						if (type === action.type) {
							state = handler(prevState, action.payload);
							break;
						}
					}
				} else {
					state = action.payload;
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
};

export default Reducer;
