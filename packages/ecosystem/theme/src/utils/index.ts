/**
 * The localStorage key theme preference is persisted under. Shared between
 * `loadSavedTheme`/`saveTheme` (read by `Provider` after hydration) and
 * `ThemeScript` (read before hydration, to avoid a flash of the wrong theme)
 * so both always agree on where the saved value lives.
 */
export const THEME_STORAGE_KEY = 'rasengan-theme';

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
export const getPreferredColorScheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const loadSavedTheme = () => {
  return localStorage.getItem(THEME_STORAGE_KEY) || null;
};

export const saveTheme = (theme: string) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
