import matter from 'gray-matter';
import createFilter from './create-filter.js';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import { extractTOC } from './extract-toc.js';
/**
 * A Vite plugin that transforms MDX files into a format that can be used in a RasenganJs application.
 *
 * The plugin performs the following tasks:
 * - Resolves the Vite configuration and stores it for later use.
 * - Transforms MDX files by applying the `@mdx-js/rollup` transformation.
 * - Extracts frontmatter data from the MDX files and creates a `metadata` object.
 * - Appends the `metadata` object to the transformed MDX content.
 *
 * The transformed MDX content can then be used in the RasenganJs application, with the `metadata` object providing additional information about the content.
 */
export default async function plugin(): Promise<{
  name: string;
  enforce: string;
  config(config: unknown, env: any): void;
  configResolved(resolvedConfig: unknown): void;
  transform(
    code: string,
    id: string
  ): Promise<{
    code: string;
    map: any;
  }>;
}> {
  const mdx = (await import('@mdx-js/rollup')).default;

  let config: unknown;
  const filter = createFilter('**/*.md?(x)');

  const mdxInstance = mdx({
    remarkPlugins: [remarkParse, remarkGfm],
    rehypePlugins: [
      remarkRehype,
      rehypeStringify,
      [
        rehypePrettyCode,
        {
          themes: {
            light: 'one-light',
            dark: 'one-dark-pro',
          },
        },
      ],
    ],
  });

  return {
    name: 'vite-plugin-rasengan-mdx',

    // Apply transformation of the mdx file before other plugins
    enforce: 'pre',

    config(config: unknown, env: any) {
      mdxInstance.config(config, env);
    },

    /**
     * Stores the resolved Vite configuration for later use.
     *
     * @param resolvedConfig - The resolved Vite configuration object.
     */
    configResolved(resolvedConfig: unknown) {
      // store the resolved config
      config = resolvedConfig;
    },

    /**
     * Transforms an MDX file by applying the `@mdx-js/rollup` transformation, extracting frontmatter data, and appending a `metadata` object to the transformed content.
     *
     * @param code - The content of the MDX file.
     * @param id - The ID of the MDX file.
     * @returns An object containing the transformed MDX code and a source map, or `null` if the file is not an MDX file.
     */
    async transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }

      const { content, data: frontmatter } = matter(code);

      // Extract the table of content
      const isTocVisible =
        frontmatter.toc !== undefined ? frontmatter.toc : false;
      const toc = extractTOC(content);

      // Apply transformation of the mdx file
      const result = await mdxInstance.transform(content, id);

      // Extract the file name from the path
      const fileName = id
        .split('/')
        .pop()
        .replace(/.page.mdx?$/, '');

      // TODO: Consider other params of metadata from frontmatter
      const metadata = {
        path: frontmatter.path || `/${fileName}`,
        metadata: frontmatter.metadata || {
          title: fileName,
        },
      };

      let newCode = result.code;

      newCode = newCode.replace(/export default\s+/, 'const MDXContent = ');

      return {
        code: `
          import { MDXRenderer } from "@rasenganjs/mdx";
          import mdxConfig from "virtual:rasengan/mdx-components";

          ${newCode}

          const metadata = ${JSON.stringify(metadata)};
          const toc = ${isTocVisible ? JSON.stringify(toc) : undefined};


          const MDXWrapper = {
            metadata,
            toc,
            type: "MDXPageComponent", // Helps to differentiate PageComponent from MDXPageComponent
            Content: MDXContent, // The content of the MDX file
            Renderer: MDXRenderer, // The renderer component
            config: mdxConfig, // The MDX config coming from mdx-components virtual module
          };


          export default MDXWrapper;
        `,
        map: result.map,
      };
    },
  };
}

export function loadMDXComponentsPlugin() {
  const virtualModuleId = 'virtual:rasengan/mdx-components';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-rasengan-mdx-components',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `
          const modules = import.meta.glob(
            [
              '/mdx-components.{js,jsx,ts,tsx}',
            ],
            { eager: true }
          );
          let config = {};

          const modulesArray = Object.entries(modules);

          if (modulesArray.length > 0) {
            const [filePath, mod] = modulesArray[0];
            config = mod.default;
          }

          export default config;
        `;
      }
    },
  };
}
