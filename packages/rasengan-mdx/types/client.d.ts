import { type MDXConfigProps } from '../lib/types/index.js';

declare module 'virtual:rasengan/mdx-components' {
  const config: MDXConfigProps;
  export default config;
}
