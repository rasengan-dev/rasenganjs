import { jsx as _jsx } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import ThemeContext from '../contexts/themes.js';
import { Themes } from '../types/index.js';
import { usePreferredColorScheme } from '../hooks/useColorScheme.js';
import { loadSavedTheme, saveTheme } from '../utils/index.js';
export default function Provider({ children }) {
  const [theme, setTheme] = useState({
    value: null,
    actual: null,
    isDark: false,
  });
  // Get prefered colors scheme
  const preferedTheme = usePreferredColorScheme();
  // Effects
  useEffect(() => {
    (() => {
      const savedTheme = loadSavedTheme();
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
    })();
  }, [preferedTheme]);
  // Handlers
  const handleSetTheme = (theme) => {
    setTheme({
      value: theme,
      actual: theme === Themes.system ? preferedTheme : theme,
      isDark: preferedTheme === Themes.dark,
    });
    // Save theme
    saveTheme(theme);
  };
  return _jsx(ThemeContext.Provider, {
    value: {
      theme: theme.value,
      actualTheme: theme.actual,
      isDark: theme.actual === 'dark',
      setTheme: handleSetTheme,
    },
    children: children,
  });
}
//# sourceMappingURL=Provider.js.map
