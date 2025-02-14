import mdxPlugin from './plugin.js';
import polyfill from './polyfill.js';
// import { generateNavigation } from './generate-navigation.js';

const plugin = () => [mdxPlugin(), polyfill()];

export { plugin };
