/**
 * An object that defines the available themes for the application.
 * The keys of this object represent the different theme options, and the values are the corresponding theme names.
 */
export const Themes = {
  dark: "dark",
  light: "light",
  system: "system",
} as const;

/**
 * Defines the available theme options for the application.
 * The `Themes` type represents the valid theme values that can be used in the `ThemeContext`.
 */
export type ThemesType = typeof Themes[keyof typeof Themes];

/**
 * Represents the context for managing the application's theme.
 * This interface provides access to the current theme, the actual theme being used (light or dark),
 * the default theme, and a function to set the current theme.
 */
export interface ThemeContext {
	/**
	 * The currently selected theme for the application.
	 * This can be one of the values defined in the `Themes` object.
	 */
	theme: ThemesType;

	/**
	 * The actual theme currently selected for the application, which can be either "light" or "dark".
	 */
	actualTheme: "light" | "dark";


  /**
   * Indicates whether the current theme is a dark theme or not.
   */
  isDark: boolean;

	/**
	 * Sets the current theme for the application.
	 * @param theme - The new theme to set, which must be one of the values defined in the `Themes` object.
	 */
	setTheme: (theme: ThemesType) => void;
}