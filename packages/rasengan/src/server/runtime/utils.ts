import os from 'node:os';

/**
 * Check if the current OS is the provided one
 */
export const checkOsPlateform = (
  osname: 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32'
) => osname === os.platform();
