/**
 * Function to adapt the path for dev and prod
 * @param {string | Array<string>} paths
 */
export const adaptPath = (paths: string | Array<string>) => {
	// Check if we are in dev mode or prod
	const isProduction = process.env.NODE_ENV === "production";
	const prefix = isProduction ? "./../../" : "";

	// Chech if the path is an array
	const isArray = Array.isArray(paths);

	// If the path is an array
	if (isArray) {
		return paths.map((path) => `${process.cwd()}/${prefix}${path}`);
	}

	// If the path is a string
	return `${process.cwd()}/${prefix}${paths}`;
};

/**
 * Adapts the provided file path to a valid URL format based on the operating system.
 *
 * @param path - The file path to be adapted.
 * @returns The adapted file path in a valid URL format.
 */
export const resolvePath = (path: string) => {
	// Check the OS
	const isWindows = process.platform === "win32";

	// Adapt the path
	if (isWindows) {
		return `file:///${path}`;
	}

	return path;
};
