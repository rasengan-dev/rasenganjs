import { createContext } from "react";
import { type ContextType } from "./types.js";

const SignalContext = createContext<ContextType>({
	signals: [],
	dispatch: () => {},
	asyncDispatch: () => {},
});

export default SignalContext;
