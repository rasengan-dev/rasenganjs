/**
 * Generates a unique identifier string.
 * @returns {string} A unique 9-character string.
 */
export const uniqueId = (): string => {
  return Math.random().toString(36).slice(2, 11);
};
