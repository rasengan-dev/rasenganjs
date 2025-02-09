import { useContext } from "react";
import ThemeContext from "../contexts/themes.js";

/**
 * A React hook that provides access to the current theme, the actual theme being used, and a function to set the theme.
 * 
 * @returns An object with the following properties:
 * - `theme`: The current theme.
 * - `actualTheme`: The actual theme being used, which may differ from the current theme if a theme is being loaded.
 * - `setTheme`: A function to set the current theme.
 */
export default function useTheme() {
	const { theme, actualTheme, setTheme, isDark } = useContext(ThemeContext);

  return {
    theme,
    actualTheme,
    isDark,
    setTheme,
  };
}