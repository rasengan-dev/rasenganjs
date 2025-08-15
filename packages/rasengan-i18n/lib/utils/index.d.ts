/**
 * Generates a unique identifier string.
 * @returns {string} A unique 9-character string.
 */
export declare const uniqueId: () => string;
/**
 * Determines the user's preferred color scheme based on their system settings.
 * @returns {"dark" | "light"} The preferred color scheme, either "dark" or "light".
 */
export declare const getPreferredColorScheme: () => 'dark' | 'light';
export declare const loadSavedTheme: () => string;
export declare const saveTheme: (theme: string) => void;
