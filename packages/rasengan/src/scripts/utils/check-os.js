import os from "node:os";
/**
 * Check if the current OS is the provided one
 * @param {"aix"| "darwin"| "freebsd"| "linux"| "openbsd"| "sunos"|  "win32"} osname
 * @returns {boolean}
 */
export const checkOsPlateform = (osname) => osname === os.platform();
