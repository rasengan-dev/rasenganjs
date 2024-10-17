import mdxPlugin from "./plugin.js";
import polyfill from "./polyfill.js";

const plugin = () => [mdxPlugin(), polyfill()];

export { plugin };
