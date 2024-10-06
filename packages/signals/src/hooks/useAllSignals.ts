import { useContext } from "react";
import Context from "../contexts/index.js";

export default function useAllSignals() {
	// Global state that manage all signals
	const { signals } = useContext(Context);

	return signals;
}
