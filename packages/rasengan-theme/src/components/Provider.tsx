import { useEffect, useState } from "react";
import ThemeContext from "../contexts/themes.js";
import { Themes, ThemesType } from "../types/index.js";
import { usePreferredColorScheme } from "../hooks/useColorScheme.js";
import { loadSavedTheme, saveTheme } from "../utils/index.js";

interface Props {
	children: React.ReactNode;
}

export default function Provider({ children }: Props) {
	const [theme, setTheme] = useState<{
		value: ThemesType | null;
		actual: "light" | "dark" | null;
    isDark: boolean;
	}>({
		value: null,
		actual: null,
    isDark: false,
	});

  // Get prefered colors scheme
  const preferedTheme = usePreferredColorScheme();

  // Effects
  useEffect(() => {
    (() => {
      const savedTheme = loadSavedTheme() as ThemesType | null;

      if (savedTheme) {
        setTheme({
          value: savedTheme,
          actual: savedTheme === Themes.system ? preferedTheme : savedTheme,
          isDark: preferedTheme === Themes.dark,
        });
      } else {
        setTheme({
          value: Themes.system,
          actual: preferedTheme,
          isDark: preferedTheme === Themes.dark,
        });
      }
    })()
  }, [preferedTheme]);

	// Handlers
	const handleSetTheme = (theme: ThemesType) => {
		setTheme({
			value: theme,
			actual: theme === Themes.system ? preferedTheme : theme,
      isDark: preferedTheme === Themes.dark,
		});

    // Save theme
    saveTheme(theme);
	};

	return (
		<ThemeContext.Provider
			value={{
				theme: theme.value,
				actualTheme: theme.actual,
        isDark: theme.actual === "dark",
				setTheme: handleSetTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}
