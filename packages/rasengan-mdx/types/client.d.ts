import { type MDXConfigProps } from '../dist/index.js';

declare module 'virtual:rasengan/mdx-components' {
  const config: MDXConfigProps;
  export default config;
}
