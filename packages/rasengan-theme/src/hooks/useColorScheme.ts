import { useState, useEffect } from "react";
import { getPreferredColorScheme } from "../utils/index.js";

/**
 * A React hook that returns the user's preferred color scheme, either "dark" or "light".
 *
 * This hook uses the `prefers-color-scheme` media query to detect the user's preferred color scheme,
 * and updates the state accordingly whenever the user's preference changes.
 *
 * @returns {"dark" | "light"} The user's preferred color scheme, either "dark" or "light".
 */
export const usePreferredColorScheme = (): "dark" | "light" => {
	const [preferredTheme, setPreferredTheme] = useState<"dark" | "light">(
		getPreferredColorScheme()
	);

	useEffect(() => {
		// Check if window is undefined
		if (typeof window === "undefined") {
			return;
		}

		// Listen for the `prefers-color-scheme` media query to update the state.
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e: MediaQueryListEvent) => {
			setPreferredTheme(e.matches ? "dark" : "light");
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return preferredTheme;
};
