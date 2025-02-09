/**
 * Generates a unique identifier string.
 * @returns {string} A unique 9-character string.
 */
export const uniqueId = (): string => {
  return Math.random().toString(36).slice(2, 11);
};

/**
 * Determines the user's preferred color scheme based on their system settings.
 * @returns {"dark" | "light"} The preferred color scheme, either "dark" or "light".
 */
export const getPreferredColorScheme = (): "dark" | "light" => {
	if (typeof window === "undefined") {
		return "light";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

export const loadSavedTheme = () => {
	return localStorage.getItem("rasengan-theme") || null;
};

export const saveTheme = (theme: string) => {
	localStorage.setItem("rasengan-theme", theme);
};