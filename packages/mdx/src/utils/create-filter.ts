import micromatch from 'micromatch';

/**
 * Creates a filter function that can be used to filter a list of IDs based on include and exclude patterns.
 *
 * @param include - A string or array of strings representing the patterns to include.
 * @param exclude - A string or array of strings representing the patterns to exclude.
 * @returns A function that takes an ID string and returns `true` if the ID should be included, `false` otherwise.
 */
export default function createFilter(
	include: string,
	exclude?: string
) {
	return function (id: string) {
		if (typeof id !== "string") return false;
		
    const matcher = micromatch.matcher(include);

    if (exclude) {
      const excluder = micromatch.matcher(exclude);
      return matcher(id) && !excluder(id);
    } else {
      return matcher(id);
    }
	};
}
