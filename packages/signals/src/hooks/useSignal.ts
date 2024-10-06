import { useContext, useMemo } from "react";
import Context from "../contexts/index.js";

const useSignal = <T = any>(signalName: string) => {
	const { signals } = useContext(Context);
	const memoizedSignals = useMemo(() => signals, [signals]);

	/**
	 * Get state of a signal base on its name
	 * @param signalName
	 * @returns
	 */
	const handleGetSignalState = (signalName: string): T => {
		const signal = memoizedSignals.find((signal) => signal.name === signalName);

		if (signal) {
			return signal.state;
		}

		// Throw error if signal not found
		throw new Error(`Signal ${signalName} not found`);
	};

	return handleGetSignalState(signalName);
};

export default useSignal;
