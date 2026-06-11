/**
 * Define static paths for a page
 * @param items - List of params
 * @returns
 */
export function defineStaticPaths<T extends Record<string, string>>(
  items: T[]
) {
  return {
    paths: items.map((params) => ({ params })),
  };
}
