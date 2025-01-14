import { createContext } from "react";
import { ThemeContext } from "../types";

/**
 * Provides a React context for managing the application's theme.
 * The context includes the current theme, the actual theme being used (which may differ from the current theme),
 * the default theme, and a function to set the theme.
 */
export default createContext<ThemeContext>({
  theme: null,
  actualTheme: null,
  isDark: false,
  setTheme: () => {},
});