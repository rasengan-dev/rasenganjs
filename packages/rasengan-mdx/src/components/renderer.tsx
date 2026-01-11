import React from 'react';
import { MDXRendererProps } from '../types/index.js';
import { CodeBlock } from './codeblock.js';
import { Table } from './table.js';
import { Heading } from './heading.js';
import TableOfContents from './toc.js';
import createHeading from '../utils/create-heading.js';

/**
 * Renders an MDX content component with a custom code block component.
 *
 * @param {MDXRendererProps} props - The props for the MDX renderer.
 * @param {React.ReactNode} props.children - The MDX content to render.
 * @param {string} [props.className] - An optional CSS class name to apply to the rendered section.
 * @returns {React.ReactElement} - The rendered MDX content with the custom code block component.
 */
const MDXRenderer = ({
  children: MDXContent,
  className,
  config,

  // TOC Extracted from the original MDX file
  toc: originalTocData,
}: MDXRendererProps): React.ReactElement => {
  const { components = {}, toc: customTocFunction = undefined } = config;

  return (
    <section
      className={
        originalTocData ? 'rasengan-wrapper-with-toc' : 'rasengan-wrapper'
      }
    >
      <section className={'rasengan-markdown-body ' + className}>
        <MDXContent
          components={{
            ...components,
            code: components.code ? components.code : CodeBlock,
            table: components.table ? components.table : Table,
            h1: components.h1
              ? createHeading(components.h1)
              : Heading({ variant: 'h1' }),
            h2: components.h2
              ? createHeading(components.h2)
              : Heading({ variant: 'h2' }),
            h3: components.h3
              ? createHeading(components.h3)
              : Heading({ variant: 'h3' }),
            h4: components.h4
              ? createHeading(components.h4)
              : Heading({ variant: 'h4' }),
            h5: components.h5
              ? createHeading(components.h5)
              : Heading({ variant: 'h5' }),
            h6: components.h6
              ? createHeading(components.h6)
              : Heading({ variant: 'h6' }),
          }}
        />
      </section>

      {originalTocData &&
        (customTocFunction ? (
          customTocFunction(originalTocData)
        ) : (
          <TableOfContents items={originalTocData} />
        ))}
    </section>
  );
};

export { MDXRenderer };
