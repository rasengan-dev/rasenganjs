/// <reference types="vite/client" />
/// <reference types="../lib/types/index.d.ts" />

// Markdown files

declare module '*.mdx' {
  import { type MDXPageComponent } from "../lib/esm/index.js";

  let MDXComponent: MDXPageComponent

  export default MDXComponent;
}

declare module '*.md' {
  import { type MDXPageComponent } from "../lib/esm/index.js";

  let MDXComponent: MDXPageComponent

  export default MDXComponent;
}