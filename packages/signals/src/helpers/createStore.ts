import { type SignalType } from "../contexts/types.js";
import { type CreateStoreType } from "./types.js";

/**
 * Function that create a store by collection a list of signals
 * @param signals List of signals
 * @returns
 */
const createStore = (signals: SignalType[]): CreateStoreType => {
	return {
		getSignals: () => signals,
	};
};

export default createStore;
