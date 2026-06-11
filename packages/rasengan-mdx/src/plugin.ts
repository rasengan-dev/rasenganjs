import {
  plugin as mdxPlugin,
  loadMDXComponentsPlugin,
  type MDXConfig,
} from './utils/plugin.js';

const plugin = (options?: MDXConfig) => [
  mdxPlugin(options),
  loadMDXComponentsPlugin(),
];

export default plugin;
