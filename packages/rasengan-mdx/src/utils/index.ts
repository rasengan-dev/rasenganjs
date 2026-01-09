import mdxPlugin, { loadMDXComponentsPlugin } from './plugin.js';

const plugin = () => [mdxPlugin(), loadMDXComponentsPlugin()];

export default plugin;
