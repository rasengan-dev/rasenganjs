import path from 'node:path';

/**
 * Adapts the provided file path to a valid URL format based on the operating system.
 *
 * @param path - The file path to be adapted.
 * @returns The adapted file path in a valid URL format.
 */
export const resolvePath = (pathValue: string) => {
  // Check the OS
  const isWindows = process.platform === 'win32';

  // Adapt the path
  if (isWindows) {
    return `file:///${path.normalize(pathValue)}`;
  }

  return path.resolve(path.normalize(pathValue));
};
